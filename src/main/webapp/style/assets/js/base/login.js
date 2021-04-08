"use strict"

/**
* form serialize to object
*/
jQuery.prototype.serializeObject = function(){  
    var a,o,h,i,e;  
    a = this.serializeArray();  
    o = {};  
    h = o.hasOwnProperty;  
    for(i = 0; i < a.length; i++){  
        e = a[i];  
        if( !h.call(o, e.name) ){  
            o[e.name] = $.trim(e.value);  
        }  
    }  
    return o;  
};  


/**
* 遮罩层
*/
function jx_show_mask() {
	var $mask = $("<div class='jx-mask'></div>");
	$mask.css({
		display: "block"
	}).appendTo("body");
    //.html("正在处理，请稍候……")
	var $maskMsg = $("<div class='jx-mask-msg'><img src='style/assets/images/load/load.gif'></div>");
	$maskMsg.appendTo("body").css({
		display: "block",
		left: (document.body.offsetWidth - $maskMsg.outerWidth())/2+'px'
	});
};

/**
* 释放遮罩层
*/
function jx_remove_mask(){
	$(".jx-mask,.jx-mask-msg").remove();
};

/**
* 绩效系统AJAX登陆检查，重定向到登录页面。
*/
function jx_check_redirect(data) {	
	var str = '#!#LOGIN#!#';
	var datStr = data.substr(0,str.length);
	var idx = data.indexOf('#!#LOGIN#!#');
	if(datStr != str){
		return 0;
	}
	if(idx < 0){
		return 0;
	}else{		
		location.href = 'login.jsp';
		return 1;
	}
};

/**
* ajax请求
* @param action请求链接
* @param formdata请求参数
* @param successFuncq请求成功回调函数
* @param async是异步请求
*/
function jx_ajax(action, formdata, successFunc, async) {
    formdata = formdata || {};	
    var timeStamp = new Date().getTime();

    if(typeof formdata === 'object')
        formdata.TIMESTAMP = timeStamp;
    else
    	formdata += '&TIMESTAMP='+timeStamp;

    //ajax mask
    if(!formdata.NOMASK){
    	jx_show_mask();
    }
   
	var asy = true;
	if(async == 0){
		asy = false;
	}

	var settings = {
		type: 'POST',
		url: action,
		data: formdata,
		async: asy,
		error: function(XHR, textStatus, errorThrown) {
			throw new Error(errorThrown);
		},
		complete: function(XHR, TS){			
			jx_remove_mask();			
		},
		dataFilter: function(data, type) {
			if (jx_check_redirect(data)) {
				return '{}';
			}
			return data;
		},
		success: function(data, status) {
			successFunc(data, status);
		},
		headers: {
			'X-Requested-With': 'wpt_ajax'
		}
	};

    //ajax dataType
	if(formdata.ISJSON){
    	settings.dataType = 'json';
    }
	$.ajax(settings);
};

/**
 * 时间：2015-10-27
 * 创建人：zgs
 * 描述：处理在IE浏览器中placeholder属性无效
 */
var JPlaceHolder = {
	//检测
	_check: function(){
	    return 'placeholder' in document.createElement('input');
	},
	//初始化
	init: function(){
	    if(!this._check()){
	        this.fix();
	    }
	},
	//修复
	fix: function(){
		var $inputs = $(':input[placeholder]');
	    $inputs.each(function(index, element) {
	        var self = $(element), txt = self.attr('placeholder');
	        
	        var h = self.outerHeight();
	        var $lineh = self.css('line-height');
	        var $height = self.height();
	        
	        if($lineh === 'normal' && $height === 0){
	        	h += 16;
	        }
	    
        	self.val('').wrap($('<div></div>').css({
        		'position': 'relative', 
        		'zoom': '1',
        		'border': 'none',
        		'background': 'none',
        		'padding': 'none', 
        		'margin': 'none',
        		'display': 'inline'}));
        	var pos = self.position();
        	var holder = $('<span></span>').text(txt).css({
        		'position': 'absolute', 
        		'left': pos.left+'px', 
        		'height': h+'px', 
        		'font-size': '14px',
        		'line-height': h+'px', 
        		'padding-left': '4px', 
        		'color': '#A9A9A9'
        	}).appendTo(self.parent());

        	if(pos.top){
        		holder.css({
        			'top': pos.top+'px'
        		});
        	}
        	self.focus(function(e) {
        		holder.hide();
        	}).focusout(function(e) {
        		if(!self.val()){
        			holder.show();
        		}
        	});
        	holder.click(function(e) {
        		holder.hide();
        		self.focus();
        	});
	    });
	}
};

/**
* 正则校验
*/
var validateReg = {
	 emailReg: /^([a-zA-Z0-9]+[_|\-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
	 mobileReg: /^(\+?0?86\-?)?1[345789]\d{9}$/,
	 ///(?!^\d+$)(?!^[a-zA-Z]+$)([0-9a-zA-Z]|[._]){6,20}/
	 pwdReg: /(?!^\d+$)(?!^[a-zA-Z]+$)([0-9a-zA-Z]){6,20}/
}

/**
* 表单校验
*
*/
var JXFormValidate = function($form, $msg){
	if($form){
		this.form = $form;
	}
	
	if($msg){
		this.message = $msg;
	}
};

/**
* 获取校验表单中input校验信息
*/
JXFormValidate.prototype.validate = function(){
	var self = this;

	var fieldAry = self.form.find('input');;
	var flag = true;
    
    if(fieldAry){
    	for(var i = 0, len = fieldAry.length; i < len; i++){
			var $field = $(fieldAry[i]);
			flag = self._getField(flag, $field);
		}
    }

    return flag;
};

/**
* 校验某一输入框
*/
JXFormValidate.prototype._getField = function(flag, elem){
	var self = this;
    
	var dataOptions = elem.attr('data-options');
	if(dataOptions){
		var optsAry = dataOptions.split(',');
		var fieldObj = {};
		for(var j = 0, jlen = optsAry.length; j < jlen; j++){
			var opts = optsAry[j].split(':');
			fieldObj[opts[0]] = opts[1];
		}
		if(flag){
			flag = self._validateField(elem, fieldObj);
		}else{
			return flag;
		}
	}
	return flag;
}

/**
* 校验input
*/
JXFormValidate.prototype._validateField = function(field, fieldObj){
	var $msg = this.message;

	if(fieldObj.required &&
		fieldObj.required === 'true'){
		var fieldv = $.trim(field.val());
		var type = field.attr('type');
		var msg =  fieldObj.msg;
		var msgText = '';
        if(msg){
        	msgText = (msg.indexOf("'") != -1 ?msg.replace(/'/g, "") : msg 
        		       && msg.indexOf('"') != -1 ? msg.replace(/"/g, '') : msg );
        }else{
            msgText = '不能为空！';
        }

		if(!fieldv){
			$msg.html(msgText).css('opacity', '1');
			field.addClass('error-bd');
            return false;
		}
        switch(type){
			case 'email':
				if(!validateReg.emailReg.test(fieldv)){
					$msg.html('邮箱格式错误！').css('opacity', '1');
					field.addClass('error-bd');
					return false;
				}
			break;
			case 'tel':
				if(!validateReg.mobileReg.test(fieldv)){
					$msg.html('手机号码格式错误！').css('opacity', '1');
					field.addClass('error-bd');
					return false;
				}
			break;
			case 'password':
				if(!validateReg.pwdReg.test(fieldv)){
					$msg.html('密码格式错误！').css('opacity', '1');
					field.addClass('error-bd');
					return false;
				}
			break;
		}

		if(fieldObj.equalTo){
			var $equal = $.trim($('#'+fieldObj.equalTo).val());
			if(fieldv != $equal){
				$msg.html('密码不一致！').css('opacity', '1');
				field.addClass('error-bd');
				return false;
			}
		}
		return true;
	}

	return true;
};

/**
* 登录
*/
var JXLogin = {
	init: function(){

        JPlaceHolder.init();

        var $msg = $('.js-login-main .login-error');

		var $input = $('.js-login-main input');
		$input.on({
			foucs: function(){
                $msg.html('&nbsp;').css('opacity', '0');
			},
			blur: function(){
                $msg.html('&nbsp;').css('opacity', '0');
			}
		});

		document.onkeydown = function(e){ 
		    var ev = document.all ? window.event : e;
		    if(ev.keyCode == 13) {
		    	JXLogin.doLogin();
		        return false;
		    }
		};
	},
	/**
	* 登录
	* @param $form登录表单
	* @param $msg错误信息
	*/
	doLogin: function(){
		var self = this;
		var $form = $('.js-login-main #loginform');
		var $msg = $('.js-login-main .login-error');
		var flag = new JXFormValidate($form, $msg).validate();
		if(flag){
			var remember_me = $('input[name="REMEMBER_ME"]');
            if (remember_me.is(':checked')) {
                var curTime = new Date().getTime();
                var params = {user_name: $('input[name="LOGINNAME"]').val(),user_passw: $('input[name="PASS"]').val(),time:curTime};
                localStorage.setItem('param', JSON.stringify(params));
            } else {
                localStorage.clear('param');
            }
			var pass_input = $('input[name="PASS"]');
			var sha1_pwd = $.sha1($('input[name="PASS"]').val());
            pass_input.val(sha1_pwd);
            $msg.css('opacity', '0');
            $form.submit();
			return false;
		}
	}
};


/**
* 注册
*/
var JXSignup = {
	init: function(){
		var self = this;
        JPlaceHolder.init();

        var $msg = $('.js-sign-main .js-sign-error');

		var $input = $('.js-sign-main input');
		$input.on({
			'focus': function(){
				self.removeTips($msg, $input);
		    },
		    'blur': function(){
		    	self.removeTips($msg, $input);
		    	var $this = $(this);
		    	new JXFormValidate('', $msg)._getField(true, $this);
		    }
		});

		self.selectForm();

		self.getImgCode($('.sign-verify'));
		if ( $('.js-verifyCode').length ) {
            $('.js-verifyCode')[0].click();
		}

		self.doSendCode('mobileSign');

		self.bindAccount();
	},
	removeTips: function($msg, $input){
		this.removeMsg($msg);
		$input.removeClass('error-bd');
	},
	removeMsg: function($msg){
		$msg.css('opacity', '0');
	},
	/**
	* 跳转到注册页面
	*/
	toSignup: function(){
        //window.location.href = 'common/utosignup.do';
        window.location.href = 'common/uapplication.do';
        this.enterKeyClick(self.doEmailSign);
	},
    /**
    * 回车事件
    */
	enterKeyClick: function($click){
		document.onkeydown = function(e){ 
		    var ev = document.all ? window.event : e;
		    if(ev.keyCode == 13) {
		    	$click();
		        return false;
		    }
		};
	},
	/**
	 * 选择注册类型
	 */
	selectForm: function(){
		var $signNavli = $('.js-sign-nav li');
        var $signNava = $('.js-sign-nav a');
        var $msg = $('.js-sign-main .js-sign-error');
        var self = this;

        if($signNava){
        	$signNava.bind('click', function(){
        		var $this = $(this);
                
                var $input = $('.js-sign-main input');
        		self.removeTips($msg, $input);

				$('.js-sign-main .js-sign-form').hide();

				$signNavli.removeClass('active');
				$this.parent().addClass('active');

				var dataType = $this.attr('data-type');
				$('.js-sign-main .js-sign-form[data-type="'+dataType+'"]').show();

				switch(dataType){
					case 'email-sign':
					    self.enterKeyClick(self.doEmailSign);
					break;
					case 'mobile-sign':
					    self.enterKeyClick(self.doMobileVerify);
					break;
				}
			});
        }
	},
	/**
	* 切换图形验证码
	*/
	getImgCode: function(elem){
		if(elem){
			var $basePath = $(document).find('base').attr('href');
			$('.js-verifyCode').unbind('click').bind('click', function(){        
			    var $times = new Date().getTime();
			    elem.attr('src', $basePath+'common/getVerifyCode.do?d=' + $times);
			});
		}
	},
	/**
	* 手机号码注册是否绑定原有账号
	*/
	bindAccount: function(){
		var $bind = $('.js-sign-bind');
		if($bind){
			$('.js-sign-bind').bind('click', function(){
			    var $this = $(this);
			    var dataType = $this.attr('data-type');

			    var $input = $('.js-sign-main input');
        		self.removeTips($msg, $input);

			    $('.mobile-form .js-sign-fill').hide();
			    $('.mobile-form .js-sign-fill[data-type="'+dataType+'"]').show();
			});
		}
	},
	/**
	* 邮箱注册
	* @param thisA注册按钮
	* @param $form注册表单
	* @param $msg错误信息
	* @param $back返回登录
	*/
	doEmailSign: function(thisA){
		var self = this;
        var $this = $(thisA);
        var $form = $('.js-sign-main .email-form');
		var $msg = $('.js-sign-main .js-sign-error');
		var $back = $('.js-sign-main .sign-back');

		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
		if(flag){
        	self.removeMsg($msg);
			$back.hide();
            
			var url = 'common/uvalidatesignup.do';
			var param = $form.serializeObject();
			param.ISJSON = 1;
			param.signType = 'email';
			jx_ajax(url, param, function(data,status){
				if(data.result.status != 1000){
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
				}else{
					$this.text('注册中。。。');
					$this.addClass('disabled');
					$this.unbind();
					$form.submit();
					return false;
				}
			});
		}
	},
	/**
	* 产品申请
	* @param thisA注册按钮
	* @param $form注册表单
	* @param $msg错误信息
	* @param $back返回登录
	*/
	doApplication: function(thisA){
		var self = JXSignup;
        var $this = $(thisA);
        var $form = $('.js-sign-main .application-form');
		var $msg = $('.js-sign-main .js-sign-error');
		var $back = $('.js-sign-main .sign-back');

		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
		if (flag) {
        	self.removeMsg($msg);
			$back.hide();
            
			var url = 'common/uvalidatesignup.do';
			var param = $form.serializeObject();
			param.ISJSON = 1;
			param.signType = 'application';
			jx_ajax(url, param, function(data, status){
				if (data.result.status != 1000) {
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
				} else {
					$this.text('申请中。。。');
					$this.addClass('disabled');
					$this.unbind();
					$form.submit();
					return false;
				}
			});
		}
	},
	/**
	* 重发注册验证邮件
	*/
	resendEmail: function(thisA){
		var self = this;
		var $this = $(thisA)
		var $msg = $('.js-sign-main .sign-error');
		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

	    var $email = $this.attr('data-email');

		//倒计时 60s
		new TimeDown().init({
		    btn: $('#signRemail'),
		    times: 60,
		    text: '重发验证邮件'
		});

		var url = 'common/uresendverifyemail.do';
		var param = {
			EMAIL: $email,
			ISJSON: 1
		};
		jx_ajax(url, param, function(data,status){
			$msg.html(data.result).css('opacity', '1');
		});
	},
	/**
	* 获取短信验证码
	*/
    doSendCode: function(type){
        var self = this;

    	var $verifyCode = $('.js-getVerifyCode');
    	if($verifyCode.length){
    		$('.js-getVerifyCode').bind('click', function(){
                var $formName = '.application-form';
                if(type === 'mobileForget'){
                    $formName = '.forget-form';
                }

	            var $form = $('.js-sign-main '+$formName);
				var $msg = $('.js-sign-main .js-sign-error');
                
                var $mobile = $('.js-sign-main '+$formName+' input[name="MOBILE"]');
                var $mobilev = $mobile.val();

                if (!$mobilev && !validateReg.mobileReg.test($mobilev)) {
                	$msg.css('opacity', '1');
					$msg.html('请输入有效手机号');
					$mobile.addClass('error-bd');
					return false;
                }

                new TimeDown().init({
				    btn: $(this),
				    times: 60,
				    text: '重新获取'
				});

	        	var url = 'common/ugetSMSCode.do';
	        	var $mobile = $('.js-sign-main '+$formName+' input[name="MOBILE"]').val();
				var param = {
					MOBILE: $mobile,
					ISJSON: 1,
					DATA_TYPE: type
				};

				jx_ajax(url, param, function(data, status){
					if (data.result.msg.length) {
						$msg.css('opacity', '1');
						$msg.html(data.result.msg);
					}
				});
	    	});
    	}
    },
    /**
    * 手机号码注册下一步
    */
    toMobileSign: function(thisA){
    	var self = this;
    	var $verify = $('.js-sign-main .mobile-form input[name="MOBILE_VERIFY"]');
    	$verify.attr('data-options', 'required:true,msg:"短信验证码不能为空"');
    	var $this = $(thisA);

        var $form = $('.js-sign-main .mobile-form');
		var $msg = $('.js-sign-main .js-sign-error');
		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

		var flag = new JXFormValidate($form, $msg).validate();
        if(flag){
            self.removeMsg($msg);
       
        	var url = 'common/uvalidatesignup.do';
			var param = $form.serializeObject();
			param.ISJSON = 1;
			param.signType = 'mobile';
			jx_ajax(url, param, function(data,status){ 
				if(data.result.status != 1000){
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
				}else{
					$this.text('提交中。。。');
					$this.addClass('disabled');
					$this.unbind();
					$form.submit();
					return false;
				}
	        });
        }
    },
    /**
    * 手机注册
    */
    doMobileSign: function(thisA){
    	var self = this;
    	var $this = $(thisA);

        var $form = $('.js-sign-main .mobile-bind-form');
		var $msg = $('.js-sign-main .js-sign-error');
		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

        var $fillForm = $('.js-sign-main .mobile-bind-form .js-sign-fill[data-type="fill-form"]');
		var flag = new JXFormValidate($fillForm, $msg).validate();
		
        if(flag){
            self.removeMsg($msg);

        	$this.text('注册中。。。');
			$this.addClass('disabled');
			$form.submit();
			return false;
        }
    },
    /**
    * 手机注册绑定原有账号
    */
    doBindAccount: function(thisA){
    	var $this = $(thisA);
    	var $form = $('.js-sign-main .mobile-bind-form');
		var $msg = $('.js-sign-main .js-sign-error');

        var $bindForm = $('.js-sign-main .mobile-bind-form .js-sign-fill[data-type="bind-form"]');
		var flag = new JXFormValidate($bindForm, $msg).validate();
		if(flag){
			var url = 'common/ubindaccount.do';
			var param = $form.serializeObject();

			$this.text('绑定中。。。');
			$this.addClass('disabled');

            jx_ajax(url, param, function(){
            	if(data.result.status != 1000){
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
					$this.text('绑定');
			        $this.removeClass('disabled');
				}
            });  
		}
    },
	/**
	* 完善信息
	*/
	signFill: function(thisA){
		var self = this;
		var $this = $(thisA);

		var $form = $('.js-sign-main #setDeptInfoForm');
		var $msg = $('.js-sign-main .js-sign-error');
		var $back = $('.js-sign-main .sign-back');
		var $input = $('.js-sign-main input');
        self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
		if(flag){
        	self.removeMsg($msg);
			$back.hide();

            $this.text('提交中。。。');
			$this.addClass('disabled');
			$this.unbind();
			$form.submit();
			return false;
		}
	}	
};

/**
* 找回密码
*/
var JXForget = {
	init: function(){
		JPlaceHolder.init();

        var $msg = $('.js-sign-main .js-sign-error');
        var $self = JXSignup;
        var $input = $('.js-sign-main input');
		$input.on({
			'focus': function(){
				$self.removeTips($msg, $input);
		    },
		    'blur': function(){
		    	$self.removeTips($msg, $input);
		    	var $this = $(this);
		    	new JXFormValidate('', $msg)._getField(true, $this);
		    }
		});

		$self.selectForm();

		$self.getImgCode($('.sign-verify'));
		if ( $('.js-verifyCode').length ) {
            $('.js-verifyCode')[0].click();
		}

		$self.doSendCode('mobileForget');
	},
	/**
	* 找回密码（邮箱/手机号码）
	*/
	forget: function(thisA){
		var $self = JXSignup;
        var $this = $(thisA);
		var $type = $this.attr('data-type');
		var $form = $('.js-sign-main .forget-form[data-type="'+$type+'"]');
		var $msg = $('.js-sign-main .js-sign-error');
		var $input = $('.js-sign-main input');
        $self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
        if(flag){
        	$self.removeMsg($msg);

        	var url = 'common/uforgetverify.do';
	        var param = $form.serializeObject();
			param.ISJSON = 1;
			param.DATA_TYPE = $type;

			jx_ajax(url, param, function(data, status){
				if(data.result.status != 1000){
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
				}else{
					$this.text('提交中。。。');
					$this.addClass('disabled');
					$this.unbind();
					$form.submit();
					return false;
				}
			});
        }
	},
	/**
	* 跳转到手机号密码重置页面
	*/
	toMobileReset: function(thisA){
        var $verify = $('.js-sign-main .forget-form input[name="MOBILE_VERIFY"]');
    	$verify.attr('data-options', 'required:true,msg:"短信验证码不能为空"');

        var $self = JXSignup;
		var $this = $(thisA);
		var $form = $('.js-sign-main .forget-form');
		var $msg = $('.js-sign-main .js-sign-error');
		var $input = $('.js-sign-main input');
        $self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
        if(flag){
        	$self.removeMsg($msg);

        	var url = 'common/uvalidatesignup.do';
			var param = $form.serializeObject();
			param.ISJSON = 1;
			param.signType = 'forget';
			jx_ajax(url, param, function(data,status){ 
				if(data.result.status != 1000){
					$msg.css('opacity', '1');
					$msg.html(data.result.msg);
				}else{
					$this.text('提交中。。。');
					$this.addClass('disabled');
					$this.unbind();
					$form.submit();
					return false;
				}
	        });
        }
	},
	/**
	* 重置密码
	*/
	resetPwd: function(thisA){
		var $self = JXSignup;
		var $this = $(thisA);
		var $form = $('.js-sign-main #resetpwdForm');
		var $msg = $('.js-sign-main .js-sign-error');
		var $input = $('.js-sign-main input');
        $self.removeTips($msg, $input);

        var flag = new JXFormValidate($form, $msg).validate();
        if(flag){
        	$self.removeMsg($msg);

        	$this.text('提交中。。。');
			$this.addClass('disabled');
			$this.unbind();
			$form.submit();
			return false;
        }
	}
};

/**
* 倒计时
*/
var TimeDown = function(){};

TimeDown.prototype = {
	init: function(cfg){
		if(!cfg) return;
		var self = this;

        self.btn = cfg.btn;
        self.times = cfg.times;
        self.text = cfg.text;

        self._handler();
	},
	_handler: function(){
    	var $btn = this.btn;
        this._doClick();
    },
    _doClick: function(){
    	var $btn = this.btn;
        var $time = this.times;
        var $text = this.text;
        $btn.attr({
                'disabled': 'disabled'
            }).html($time + 's后重新操作');

        var clickTime = new Date().getTime();
        var Timer = setInterval(function(){
            var nowTime = new Date().getTime();
            var seconds = Math.ceil( $time - ( nowTime - clickTime )/1000 );
            if(seconds > 0){
                $btn.html(seconds + 's后重新操作');
            }else{
                clearInterval(Timer);
                $btn.html($text)
                    .removeAttr('disabled');
            }
        }, 1000);
    }
};

/**
* cookie
*/
var JXCookie = {
	/**
	* 设置cookie
	* @param name名称
	* @param value值
	* @param hours有效时限
	*/
	setCookie: function(name, value, hours) {
		var cookiev = value;
		if(typeof value === 'object'){
            cookiev = JSON.stringify(value);
		}
		var str = name + "=" + escape(cookiev);
	    if(hours > 0){//为时不设定过期时间，浏览器关闭时cookie自动消失
	        var date = new Date();
	        var ms = hours * 3600 * 1000;
	        date.setTime(date.getTime() + ms);
	        str += "; expires=" + date.toGMTString();
	    }
	    document.cookie = str;
	},
	/**
	* 获取cookie
	* @param name名称
	*/
	getCookie: function(name) {
        if (document.cookie.length) {
           var $start = document.cookie.indexOf(name + "=");
		    if ($start != -1) { 
		        $start += (name.length + 1);
		        var $end = document.cookie.indexOf(";", $start);
		        if ($end == -1) 
		        	$end = document.cookie.length;
		        return unescape(document.cookie.substring($start,$end))
		    } 
		}
		return '';
    },
    /**
	* 校验cookie是否存在
	* @param name名称
	*/
    checkCookie: function(name) {
		var $name = getCookie(name);
		if ($name) {
			return true;
		} 
		return false;
	},
	/**
	* 销毁cookie
	* @param name名称
	*/
	delCookie: function(name) {  
        JXCookie.setCookie(name, '', -1);  
    }
};