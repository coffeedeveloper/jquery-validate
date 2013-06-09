$.fn.validate = function(options){
	var defaults = {
		sucClass: 'suc',
		errClass: 'err',
		success: $.noop,
		error: $.noop,
		autoFocus: false,
		validateType: 'blur'
	}
	var opts = $.extend(defaults, options);

	var $self = $(this),
		errArr = [];

	var CheckVal = function(type, val, item){
		switch(type.toLowerCase()){
			case 'url':
				break;
			case 'email':
				break;
			case 'integer':
				break;
			case 'range':
				var r = $(item).data('validateRange').split(',');
				if (val.length < r[0] || val.length > r[1]) {
					return false;
				}
				break;
			case 'reguar':
				var reg = $(item).data('validateReguar');
				if (!reg.test(val)) {
					return false;
				}
			default:
				break;
		}
		return true;
	}

	var Status = function(item, status, type){
		if (status) {
			item.addClass(opts.sucClass).removeClass(opts.errClass);
		}else{
			$this.addClass(opts.errClass).removeClass(opts.sucClass);
			errArr.push({
				item: item,
				type: type,
				msg: $this.data('validateMsg')
			});
		}
		return status;
	}

	var checked = false;
	$self.find('input[data-validate-required], input[data-validate-type]').each(function(i, v){
		var $this = $(this);
		if ($this.data('validateRequired')) {
			checked = Status($this, $this.val() ? true : false, 'required');
		}
		if ($this.data('validateType') && checked) {
			Status($this, !CheckVal($this.data('validateType'), $this.val(), $this), $this.data('validateType'));
		}
	});

	if(errArr.length == 0){
		if(typeof opts.success == 'function'){
			opts.success();
		}
	}else{
		if(opts.autoFocus){
			errArr[0].item.focus();
		}
		if(typeof opts.error == 'function'){
			opts.error(errArr);
		}
	}
}
