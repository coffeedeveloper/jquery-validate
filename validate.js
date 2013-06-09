$.fn.validate = function(options){
	var defaults = {
		//prefix: 'validate'
		sucClass: 'suc',
		errClass: 'err',
		success: $.noop,
		error: $.noop
	}
	var opts = $.extend(defaults, options);

	var $self = $(this),
		errArr = [];

	var CheckVal = function(type, val){
		switch(type.toLowerCase()){
			case 'url':
				console.log('url');
				break;
			case 'email':
				console.log('email');
				break;
			case 'integer':
				console.log('integer');
				break;
			default:
				break;
		}
	}

	//var require = 'data-' + opts.prefix + 'require';
	$self.find('input[data-validate-require]').each(function(){
		if(!$(this).val()){
			errArr.push({
				item:$(this).addClass(opts.sucClass).removeClass(opts.errClass),
				msg: $(this).data('validate-msg');
			});
		}else{
			$(this).addClass(opts.errClass).removeClass(opts.sucClass);
		}
	});

	if(errArr.length == 0){
		if(typeof opts.success == 'function'){
			opts.success();
		}
	}else{
		if(typeof opts.error == function(){
			opts.error(errArr);
		}
	}
}
