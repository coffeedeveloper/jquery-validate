$.fn.validate = function (options) {
	var defaults = {
		sucClass: 'suc',
		errClass: 'err',
		success: $.noop,
		error: $.noop,
		autoFocus: false,
		activeType: 'blur'
	}
	var opts = $.extend(defaults, options);

	var $self = $(this),
		errArr = [],
		isActive = options == undefined;

	var CheckVal = function (type, val, $item) {
		var result = true;
		switch (type.toLowerCase()) {
			case 'url':
				break;
			case 'email':
				break;
			case 'integer':
				break;
			case 'required':
				if (!val) {
					result = false;
				}
				break;
			case 'range':
				var r = $item.data('validateRange').split(',');
				if (val.length < r[0] || val.length > r[1]) {
					result = false;
				}
				break;
			case 'regular':
				var reg = $item.data('validateRegular');
				if (!reg.test(val)) {
					result = false;
				}
			case 'ajax':
				window[$item.data('validateAjax')]($item);
			default:
				break;
		}
		if (!result) {
			MakeErr($item, type);
		}
		return result;
	}

	var MakeErr = function ($item, type) {
		errArr.push({
			item: $item,
			type: type,
			msg: $item.data('validate-' + type + '-msg')
		});
	}

	var Status = function ($item, status, type) {
		if (status) {
			$item.addClass(opts.sucClass).removeClass(opts.errClass);
		} else {
			$item.addClass(opts.errClass).removeClass(opts.sucClass);
		}
		return status;
	}

	var Active = function () {
		var $this = $(this);
		var types = $this.data('validateType').split('|');
		var checked = true;
		errArr = isActive ? errArr : [];
		for (var i = 0; i < types.length && checked; i++) {
			if (!Status($this, CheckVal(types[i], $this.val(), $this), types)) {
				checked = false;
			}
		}
		if (!isActive) {
			if (checked) {
				if (typeof opts.success == 'function') {
					opts.success([$this]);
				}
			} else {
				if (typeof opts.error == 'function') {
					opts.error(errArr);
				}
			}
		}
	}

	if (isActive) {
		var $list = $self.find('input[data-validate-type]');
		$list.each(Active);
		if (errArr.length == 0) {
			if (typeof opts.success == 'function') {
				opts.success($list);
			}
		} else {
			if (opts.autoFocus) {
				errArr[0].item.focus();
			}
			if (typeof opts.error == 'function') {
				console.log(errArr);
				opts.error(errArr);
			}
		}
		return errArr.length == 0;
	} else {
		$self.find('input[data-validate-type]').each(function (i, v) {
			$(this).on(opts.activeType, Active);
		});
	}
}
