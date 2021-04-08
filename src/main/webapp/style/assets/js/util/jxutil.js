"use strict"


/**
 * JX js工具类
 */
var JXUtil = function(){};

/**
 * 初始加载
 */
JXUtil.prototype.init = function(){
	var self = this;
	self.setBodyWidth();
	self.setScreenHeight();
};

/**
* 阻止回车事件
*/
JXUtil.prototype.stopEventClick = function(thisA){
	$(thisA).on('keydown', function(e){ 
        if(e.keyCode == 13) return false;
    }); 
};

/**
 * 检测浏览器
 */
JXUtil.prototype.detectBrowser = function(){
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
 * 获取当前窗口相关信息 
 */
JXUtil.prototype.getWindowInfo = function(){
	return {
		clientWidth: document.body.clientWidth,//网页可见区域宽
		clientHeight: document.body.clientHeight,//网页可见区域高
		offsetWidth: document.body.offsetWidth,//网页可见区域宽(包括边线的宽)
		offsetHeight: document.body.offsetHeight,//网页可见区域高(包括边线的高)
		scrollWidth: document.body.scrollWidth,//网页正文全文宽
		scrollHeight: document.body.scrollHeight,//网页正文全文高
		scrollTop: document.body.scrollTop,//网页被卷去的高
		scrollLeft: document.body.scrollLeft,//网页被卷去的左
		screenTop:  window.screenTop,//网页正文部分上
		screenLeft:  window.screenLeft,//网页正文部分左
		height: window.screen.height,//屏幕分辨率的高
		width: window.screen.width,//屏幕分辨率的宽
		availHeight: window.screen.availHeight,//屏幕可用工作区高度
		availWidth: window.screen.availWidth//屏幕可用工作区宽度
	};
};

/**
 * 2016-07-06
 * 由于系统头部图片较大，导致在IE下回出现拖拽，
 * 因此限制不同浏览下图片的宽度，
 * 头部宽度 = 屏幕宽度 - 滚动条的宽度
 * @param head
 */
JXUtil.prototype.setBodyWidth = function(head){
	var self = this;
	var browser = self.detectBrowser();
	var $window = self.getWindowInfo();
	
	var width = $window.width - scrollBar.getScrollBar().width;
	
    if(browser.ie){//若是IE则宽度增加4
    	width += 4;
    }
    document.body.style.width = width+'px';

    //限制系统图片宽度
    $('.jx-head img').css('width', width+'px'); 
};

/**
 * 设置绩效中屏幕高度
 * @param screen
 */
JXUtil.prototype.setScreenHeight = function(){
	var self = this;
	var window = self.getWindowInfo();
	$('#jx_screen').css('height', window.height+'px');
};

/**
* 设置数据区域，左侧与右侧同高
*/
JXUtil.prototype.setContentHeight = function(){
	if($('#jx_mainL').length && $('#jx_mainR').length){
		var $left = document.getElementById('jx_mainL');
		var $right = document.getElementById('jx_mainR');
		$left.style.height = $right.offsetHeight + 'px';
	}
};

/**
* 显示数据提示信息
* @param $el提示对象
* @param $pos提示信息位置
* @param $text提示内容
*/
JXUtil.prototype.getDataTips = function(opts){
	if(!opts) return;
	var $el = opts.tip;
	var $pos = opts.position;
	var $text = opts.content;

	$el.tooltip({    
        position: $pos,    
        content: function(){
            var $this = $(this);
            var $content = $text.length != 0 
            ? $text 
            : ( $this.attr('data-tips') 
                ? $this.attr('data-tips') 
                : $this.prop('data-tips')
            );
            $content = $content.replace(new RegExp('\r\n', 'gm'), '<br/>');

            if ($content) {
                return '<span style="color:#fff">'+ $content +'</span>'
            }
        },    
        onShow: function(){    
            $(this).tooltip('tip').css({  
                'backgroundColor': '#666',  
                'borderColor': '#666',
                'borderRadius': '3px',
                'padding': '8px'
            });  
        },
        onPosition: function(){
            $(this).tooltip('tip').css({
                'left': $(this).offset().left,
                'max-width': '240px'
            });
            $(this).tooltip('arrow').css('left', 20);
        }       
    });    
};

/**
* 双日期选择
* *@param opts时间输入框配置
*/
JXUtil.prototype.selectDates = function(opts, dateOpts){
    if(!opts) return;
    
    var $start = opts.start;
    var $startfunc = opts.start_func;

    var $end = opts.end;
    var $endfunc = opts.end_func;
    
    var cfg = $.extend({}, {
        format: 'yyyy-mm-dd',
        disableDblClickSelection: true,
        autoShow: true,
        language: 'zh-CN'
    }, dateOpts);

    var self = this;
    var $startDate = $start.fdatepicker(cfg).on('changeDate', function (ev) {
        var $span = $start.next('span');
        if ($span.length) {
            $span.hide();
        }

        if (ev.date.valueOf() > $endDate.date.valueOf()) {
            var $date = ev.date+'';
            var newDate;
            var flag = self.isContainzChn($date);
            if (flag) {
                newDate = ($date).toDateEx();
            } else {
                newDate = new Date($date);
            }
            
            newDate.setDate(newDate.getDate());
            $endDate.update(newDate);
        }
        $startDate.hide();
        $end[0].focus();
        if ($startfunc) {
            $startfunc();
        }
    }).data('datepicker');

    var endCfg = $.extend({}, cfg, {});
    endCfg.onRender = function(date) {
        return date.valueOf() < $startDate.date.valueOf() ? 'disabled' : '';
    }

    var $endDate = $end.fdatepicker(endCfg).on('changeDate', function (ev) {
        var $span = $end.next('span');
        if ($span.length) {
            $span.hide();
        }

        $endDate.hide();
        if ($endfunc) {
            $endfunc();
        }
    }).data('datepicker');
};

/**
* 选择单个时间
* @param opts时间选择框参数
* @param dateOpts日期插件配置
*/
JXUtil.prototype.selectDate = function(opts, dateOpts){
    if(!opts) return;

    var self = this;
    var $select = opts.select;
    var $selectfunc = opts.select_func;

    var cfg = $.extend({}, {
        format: 'yyyy-mm-dd',
        disableDblClickSelection: true,
        language: 'zh-CN'
    }, dateOpts);

    // 过滤数据大于某一初始值
    if (dateOpts && 'start_date' in dateOpts) {
        var $date = dateOpts.start_date+'';
        var newDate;
        var flag = self.isContainzChn($date);
        if (flag) {
            newDate = ($date).toDateEx();
        } else {
            newDate = new Date($date);
        }

        cfg.onRender = function(date) {
            return date.valueOf() <= newDate.valueOf() ? 'disabled' : '';
        }
    }
    
    var $selectDate = $select.fdatepicker(cfg).on('changeDate', function (ev) {
        var $span = $select.next('span');
        if($span.length){
            $span.hide();
        }

        $selectDate.hide();

        if($selectfunc){
            $selectfunc();
        }
    }).data('datepicker');
};


/**
* 判断字符是否包含中文
*/
JXUtil.prototype.isContainzChn = function(str){
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;  
    if( !patrn.exec(str) )
        return false;  
    else
        return true;  
};

/**
* 初始easyui输入框宽度
*/
JXUtil.prototype.initStyle = function(opts){
    if(!opts) return;
    var $elems = opts.elems;
    var $width = opts.width;
    for(var i = 0; i < $elems.length; i++){
        $elems[i].css({
            'width': $width+'px'
        });
    }
};

/**
* 选择双时间，引用第三方双时间选择控件
*/
JXUtil.prototype.selectRangeDate = function(opts) {
    if (!opts) return;

    var date_id = opts.date_id;
    var date_width = opts.date_width;
    var date_start = opts.date_start;
    var date_end = opts.date_end;
    var date_range = opts.date_range;

    var $el = $('#'+date_id);
    $el.daterangepicker({
        presetRanges: [{
            text: '今天',
            dateStart: function() { return moment() },
            dateEnd: function() { return moment() }
        }, {
            text: '明天',
            dateStart: function() { return moment().add('days', 1) },
            dateEnd: function() { return moment().add('days', 1) }
        }],
        initialText: '请选择起止时间',
        dateFormat: 'yy-mm-dd',
        altFormat: 'yy-mm-dd',
        rangeSplitter: '至',
        applyButtonText: '确定',
        cancelButtonText: '取消',
        clearButtonText: '清空',
        applyOnMenuSelect: false,
        datepickerOptions: {
            numberOfMonths: 2,
            minDate: 0,
            maxDate: null
        },
        change: function(event, data) { 
            var range = $el.daterangepicker('getRange');

            var fmt = 'yyyy-MM-dd';
            var $beginDate = new Date(range.start).format(fmt);
            var $endDate = new Date(range.end).format(fmt);

            $('#'+date_start).val($beginDate);
            $('#'+date_end).val($endDate);

            JXTask.calculateTaskDays(opts);
        }
    });
   
    $el.next().css('width', date_width);

    if (date_range) {
        $el.daterangepicker('setRange', {
            start: new Date(date_range.start), 
            end: new Date(date_range.end)
        });
    }
}

/**
 * 滚动条 
 * 用于加载弹出框时，去除右侧滚动条，
 * 使用透明border替代关闭弹窗时不会系统页面闪动加载滚动条
 */
var scrollBar = {
	getScrollBar: function(){
		if (this.scrollBarHW) {
	        return this.scrollBarHW;
	    }
	    var div = document.createElement('div');
	    div.style.overflow = 'scroll';
	    div.style.visibility = 'hidden';
	    div.style.position = 'absolute';
	    div.style.width = '100px';
	    div.style.height = '100px';
	    document.body.appendChild(div);

	    this.scrollBarHW = {
	        width : div.offsetWidth - div.clientWidth,
	        height : div.offsetHeight - div.clientHeight
	    };
	    div.parentNode.removeChild(div);
	    return this.scrollBarHW;
    },
    showHideScrollBar: function(type){
    	var windowLen = $('.window-mask').length;
    	var $html = $(document.body).parent();
		var $body = $(document.body);
		var bodyWidth = $body.width();
		var barWidth = this.getScrollBar().width;
		if(windowLen === 0){
			if(type === 'hide'){
				$body.css('width','');
				$html.css('overflow', 'hidden');
				$('.jx-container-fluid:eq(0)').css('border-right', barWidth+'px solid transparent');
			}else{
				$body.css('width',bodyWidth-barWidth);
				$html.css('overflow', '');
				$('.jx-container-fluid:eq(0)').css('border-right', '');
			}
		}
    }
};

/**
 * 绩效级联操作
 */
var JXSelect = {
	//部门岗位
	deptPost: function(opts){
		if(!opts) return;
		var deptId = opts.deptId;
		var postId = opts.postId;
		var post = opts.post; 
		var param = {
			DEPTID: deptId,
			method: 'post',
			NOMASK: 1
		};
		var url = 'common/qorguserpostdata.do';
		jx_ajax_json(url, param, function(data, status) {
			post.combobox({
				valueField: 'ID',
				textField: 'TITILE',
				data: data
			});
			if(postId){
				post.combobox('setValue', postId);
			}else{
				post.combobox('setValue', '');
				post.combobox('setText', '--请选择--');
			}
		});
	},
    deptPost2: function(opts){
        if(!opts) return;
        var deptId = opts.deptId;
        var postId = opts.postId;
        var post = opts.post;
        var param = {
            DEPTID: deptId,
            method: 'post',
            NOMASK: 1
        };
        var url = 'common/qorguserpostdata.do';
        jx_ajax_json(url, param, function(data, status) {
            post.combobox({
                valueField: 'POSTID',
                textField: 'TITILE',
                data: data
            });
            if(postId){
                post.combobox('setValue', postId);
            }else{
                post.combobox('setValue', '');
                post.combobox('setText', '--请选择--');
            }
        });
    },
	//部门人员
	deptUser: function(opts){
		if(!opts) return;
		var deptId = opts.deptId;
		var userId = opts.userId;
		var user = opts.user; 
		var loadData = opts.load;
		var param = {
			DEPTID: deptId,
			method: 'user',
			NOMASK: 1
		};
		var url = 'common/qorguserpostdata.do';
		jx_ajax_json(url, param, function(data, status) {
			user.combobox({
				valueField: 'ID',
				textField: 'NAME',
				data: data
			});
			if(userId){
				user.combobox('setValue', userId);
			} else {
				if(data.length){
                    user.combobox('select', data[0].ID);
				} else {
					user.combobox('setValue', '');
					user.combobox('setText', '');

                    opts.integral != undefined ? opts.refresh('') : '';
				}
			}
		});

		if(loadData){
			loadData();
		}
	}
}


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

/**
* 用户属性
*/
var JXUProp = {
	id: '',//用户id
	name: '',//用户名称
	role: '',//用户角色id
	did: '',//用户部门id
	dname: '',//用户部门名称
	pdid: '',//用户部门父级id
	pdname: ''//用户部门父级名称
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
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({
                position: 'relative', 
                zoom: '1',
                border: 'none',
                background: 'none',
                padding: 'none', 
                margin: 'none',
                'display': 'inline'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({
                position: 'absolute', 
                left: pos.left, 
                top: pos.top,
                height: h, 
                'font-size': '14px',
                'line-height': h+'px', 
                'padding-left': '6px', 
                color: '#a9a9a9'}).appendTo(self.parent());
            self.focusin(function(e) {
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
* 附件上传
* IE10以下浏览器通过点击新增文件选择框方式增加附件(后期需优化此操作)
*/
var JXUpload = {
    /**
    * 删除附件
    */
    delFile: function(el){
        var self= this;
        jx_common_confirm('提示','您确认删除吗？',function(r){
            if(r){
                $(el).parent().remove();
            }
        });
    },
    /**
    * IE版本小于10附件上传
    */
    ieUpload: function(){
        var self = this;
        var $li = $("<li class='ptb4'><a type='text' class='jx-comm-btn jx-file-btn'><i class='fa fa-cloud-upload jx-btn-ricon'></i>添加文件<input type='file' name='jxFile'/></a></li>");
        $li.appendTo($('#jxFileUploadTab'));
        var $del = $("<a href='javascript:'>删除</a>");
        $del.bind('click', function(){
            self.delFile(this);
        }).appendTo($li);

        var $file = $li.find(':file').first();
        $file.change(function(){
            $li.find('.js-file').remove();
            var fileName = $file.val().split('\\').pop();
            var $span = '<a class="js-file" href="javascript:">'+fileName+'</a>';
            $del.before($span);
        });
    },
    /**
    * 其它浏览器附件上传
    */
    otherUpload: function(){
        var self = this;
        var $li = $("<li><input class='hide' type='file' name='jxFile'/></li>");
       
        var $del = $("<a href='javascript:'>删除</a>");
        $del.bind('click', function(){
            self.delFile(this);
        }).appendTo($li);

        var $file = $li.find(':file').first();
        $file.change(function(){
            var fileName = $file.val().split('\\').pop();
            var $span = '<a href="javascript:">'+fileName+'</a>';
            $file.after($span);
            $li.appendTo($('#jxFileUploadTab'));
        });
        $file.click();
    },
    /**
    * 加载附件上传模板
    */
    loadTemp: function(){
        var self = this;
        var temp = $('<div></div>');
        temp.insertBefore($('.jx-file-group'));
        var browser = new JXUtil().detectBrowser();
        
        if(browser.ie && parseInt(browser.ie) < 10) {
            var ieUpload = $('<a type="text" class="jx-comm-btn jx-file-btn marT10"><i class="fa fa-plus jx-btn-ricon"></i>增加附件上传</a>');
            ieUpload.bind('click', function(){
                self.ieUpload();
            }).appendTo(temp);
        } else {
            var othUpload = $('<button type="button" class="jx-comm-btn jx-file-btn"><i class="fa fa-cloud-upload jx-btn-ricon"></i>添加文件</button>');
            othUpload.bind('click', function(){
               self.otherUpload();
            }).appendTo(temp);
        }
    }
};


/**
* 新版列表
*/
var JXTabToggle = {
    init: function() {
        this.diySelect();
        this.tableTab();
    },
    diySelect: function() {//每页显示条目选择
        $('.open-wrap').click(function() {
            $('.select-wrap .group').toggle();
        })
        $('.select-wrap .group span').click(function() {
            $('.open-wrap span').text($(this).text());
            $('.select-wrap .group').hide();
        })
    },
    tableTab: function() {//展开积分要求详情
        $('.table-wrap .open-ctrl').click(function() {
            $(this).toggleClass('active');
            $('.table-wrap .detail').eq($(this).index('.open-ctrl')).toggle();
        })
    }
}

/**
* 部门层级结构选择
* @param el 选择对象
* @param multiple_flag是否多选
*/
var JXDeptCombobox = {
    select: function(el, multiple_flag) {
        var self = JXDeptCombobox;
        el.combobox({
            onSelect: function(rec) {
                if (multiple_flag) {
                    self.setMultiValue(el);
                } else {
                    self.setSingleValue(el, rec.text);
                }
            },
            onUnselect: function() {
                if (multiple_flag) {
                    self.setMultiValue(el);
                }
            }
        });
    },
    setMultiValue: function(el) {
        var text = el.combobox('getText');
        var text_str = $.trim(text).replace(/&nbsp;/g, '').replace(',', '');
        el.combobox('setText', text_str);
    },
    setSingleValue: function(el, text) {
        var text_str = $.trim(text).replace(/&nbsp;/g, '');
        el.combobox('setText', text_str);
    }
};

/**
* 菜单
*/
var JXMenu = {
    init: function() {
        JXMenu.menuClick();
    },
    menuClick: function() {
        $('#sidebar').on('click', 'a', function(e) {
            var $this = $(this);
            var $li = $this.parent();

            if ($this.attr('data-level')) {
                var data_level = $this.attr('data-level');

                if (('1' == data_level || '9' == data_level) && $li.hasClass('open'))  {
                    var item_inner = $this.find('.item-inner');
                    var data_url = item_inner.attr('data-url');
                    var sub_nav_id = item_inner.attr('data-subid');
                    var sub_nav = $('#sidebar').find('a[data-id="sub'+sub_nav_id+'"]');

                    if (!sub_nav.length && data_url.indexOf('.do') != -1) {
                        jx_sub_nav(data_url);
                    } else {
                        data_url = sub_nav.attr('data-url');
                        if (data_url) {
                            sub_nav.parent().siblings().removeClass();
                            sub_nav.parent().addClass('active');
                            jx_sub_nav(data_url);
                        }
                    }
                }

                if ('2' == data_level || '10' == data_level)  {
                    $this.parent().siblings().removeClass();
                    $this.parent().addClass('active');
                    jx_sub_nav($this.attr('data-url'));
                }
            }
        });

        //导航 span点击事件
		$('.navbar-right a').unbind().bind('click',function(e){
			e.preventDefault();

			var $this = $(this);
			var dataType = $this.attr('data-type');
			var url = '';
			switch(dataType){
            case 'setBg':
                console.log('2222222222');
                break;
			case 'logout':
				jx_common_confirm('提示','您确认退出本系统？',function(r){
					if(r){
						window.location.href = 'logout.jsp';
					}
				});
				break;
			case 'pwd':
				url = 'common/schangepassworddlg.do';
				jx_common_window('修改密码', 500, 310, 100, url, {}, null);
				break;
            case 'help':
                var url = window.location.href;
                var arr = url.split('/');
                window.open('http://'+arr[2]+'/jifenhelp/index.html');
                break;
            case 'mobile':
                var url = window.location.href;
                var arr = url.split('/');
                window.open('http://'+arr[2]+'/jifenpublic/index.html');
                break;
			}

			new JXUtil().stopEventClick(this);
		});

        //更换头像
        var userIcon = $('.navbar-right .portrait');
        if(userIcon){
            userIcon.unbind().bind('click',function(e){
                e.stopPropagation();
                e.preventDefault();

                jx_common_window('更改头像', 700, 500, 100, 'common/sicondlg.do', {}, null);
            });

            new JXUtil().stopEventClick(this);
        }
    },
    wfNavClick: function(){
        $('.jx-wf-nav .jx-menu-items a').unbind().bind('click',function(){
            var $this = $(this);
            var dataId = $this.attr('id');
            if(dataId){
                var dataUrl = $this.attr('data-url');
                if(dataUrl){
                    var data_pid = $this.attr('data-pid');

                    var curr_li = $('.main-navigation-menu li.open').not('.active');
                    curr_li.find('.sub-menu').hide();
                    curr_li.removeClass('open');

                    var inner_item = $('.main-navigation-menu li').find('.item-inner[data-id="'+data_pid+'"]');

                    var new_li = inner_item.parent().parent().parent();
                    new_li.addClass('open');

                    var sub_menu = new_li.find('.sub-menu');
                    sub_menu.show();
                    sub_menu.find('li').removeClass('active');

                    sub_menu.find('a[data-id="sub'+dataId+'"]').parent().addClass('active');

                    jx_sub_nav(dataUrl);
                }
            }
        });
    }
};

/**
 * 任务
 */
var JXTask = {
    /**
    * 初始任务时间
    */
    initTaskDate: function(){
        var self = this;

        new JXUtil().selectDates({
            start: $('#BEGINDATE'),
            end: $('#ENDDATE'),
            start_func: function(){
                self.calculateTaskDays();
            },
            end_func: function(){
                self.calculateTaskDays();
            }
        });
    },
    /**
    * 计算任务天数
    */
    calculateTaskDays: function(opts){
        if (!opts) return;
        var startDate = $("#"+opts.date_start).val();
        var endDate = $("#"+opts.date_end).val();
        if (startDate && endDate) {
            var sd = new Date(startDate);
            var ed = new Date(endDate);
            var days = (ed - sd) / (1000 * 60 * 60 * 24);
            if (days == 0) 
                days = 1;
            else 
                days += 1;
            
            $('#'+opts.date_day).val(days);
        }
    },
    /**
    * 设置任务时间为今天
    */
    setTaskToday: function(){
        var today = new Date();
        $("#BEGINDATE").val(today.format("yyyy-MM-dd"));
        $("#ENDDATE").val(today.format("yyyy-MM-dd"));
        $('#DAYS').numberbox('setValue', 1);
    },
    /**
    * 清空任务时间
    */
    clearTaskDate: function(){
        $('#BEGINDATE').val('');
        $('#ENDDATE').val('');
    },
    closeWin: function(thisA, id) {
        //销毁时间选择插件
        $("#"+id).daterangepicker("close");

        jx_common_closewindow(thisA);
    },
    /**
    * 初始页面下拉框样式
    */
    initStyle: function(){
        $('.js-taskReport .easyui-timespinner,.js-taskReport .easyui-combobox')
        .css({
            'width': '80px',
            'height': '30px',
            'font-size': '14px'
        });
    }
};