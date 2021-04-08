(function($){
	/**
	* 提示信息
	* @param $obj提示框显示位置
	* @param title提示标题
	* @param text 提示内容
	*/
	function initialize($obj, title, text, tips){
		var $basePath = $(document).find('base').attr('href');
		var $container = $('<div class="ie-alert-container"></div>').appendTo($obj);

		var docHeight = $(document).height();

		var $overlay = $('<div class="ie-alert-overlay"></div>').appendTo($container);
		$overlay.css({
			'height': docHeight+'px'
		});

		var $panel = $('<div class="ie-alert-panel"></div>').appendTo($container);
		var $title = $('<div class="title"><strong>'+ title +'</strong></div>').appendTo($panel);
		var $text = $('<div class="text"><p style="margin-bottom:6px;">'+ text +'</p><p style="line-height:16px;margin-top:0px;margin-bottom:0px;color:red;">'+ tips +'</p></div>').appendTo($panel);
		var $browser = $('<div class="browser">'+
						'<ul>'+
						'<li><a class="chrome" href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html" title="谷歌浏览器" target="_blank"></a></li>'+
                        '<li><a class="firefox" href="http://www.firefox.com.cn/download/" title="火狐浏览器" target="_blank"></a></li>'+
                        '<li><a class="ie" href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx" title="IE浏览器" target="_blank"></a></li>'+
                        '<li><a class="b360" href="http://se.360.cn/" title="360浏览器" target="_blank"></a></li>'+
                        '</ul>'+
						'</div>').appendTo($panel);
    }; 
    
    /**
    * 判断浏览器
    */
    var detectBrowser = function(){
    	var browser = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
        return browser;
    };

    /**
    * IE低版本校验
    */
	$.fn.iealert = function(options) {
		var flag = false;
		var defaults = { 
			title: "\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
			text: "您正在使用的浏览器内核版本过低，为确保您能够体验到最佳的操作效果，我们推荐您选择使用下列浏览器：",
			tips: "(&nbsp;备注：IE浏览器请使用9+版本，360浏览器请使用极速模式&nbsp;)"
		};
		
		var option = $.extend(defaults, options);

		var broswer = detectBrowser();
	    this.each(function(){

	    	var $ie = broswer.ie;
			if ( $ie && parseInt($ie, 10) < 9) {
				flag = true;
				var $this = $(this);  
				initialize($this, option.title, option.text, option.tips);
			}
		});	
		 
		return flag;
	};
})(jQuery);