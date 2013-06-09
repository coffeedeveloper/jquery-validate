$.fn.valida = function(options){
	var defaults = {
		prefix: 'validate'
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

	var require = 'data-' + opts.prefix + 'require';
	$self.find('input[' + require + ']').each(function(){
		if(!$(this).val()){
			errArr.push($(this).addClass(opts.sucClass).removeClass(opts.errClass));
		}else{
			errArr.push($(this).addClass(opts.errClass).removeClass(opts.sucClass));
		}
	});
}
