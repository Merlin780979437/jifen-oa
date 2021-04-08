'use strict';

jQuery.prototype.serializeObject = function(){  
    var serializeObj = {};  
    var ary = this.serializeArray();  
    $(ary).each(function() {  
        if (serializeObj[this.name]) {  
            if ($.isArray(serializeObj[this.name])) {  
                serializeObj[this.name].push(this.value);  
            } else {  
                serializeObj[this.name] = [serializeObj[this.name], this.value];  
            }  
        } else {  
            serializeObj[this.name] = this.value;   
        }  
    });  
    return serializeObj;  
};

/**
* 退出系统
*/
function jx_sys_logout(){
	jx_common_confirm('提示', '您确认退出本系统？', function(r){
		if(r){
			window.location.href = 'logout.jsp';
		}
	});
}

/**
* 清楚easyui创建的多余的div，释放内存
*/
function jx_clear_easyui_div() {
	$(document).find('.combo-p,.tooltip,.datepicker-dropdown,.easyui-menu').remove();
}

/**
* 二级菜单功能函数
* @param url 跳转链接
* @param param 页面传递参数
*/
function jx_sub_nav(url, param) {
	var action = '' + url;
	if (!action.length) return;
	
	if(!param) param = {};
	
	jx_clear_easyui_div();
	jx_ajax(action, param, function(data, status) {
		$('#jx_content').html('');
		$('#jx_content').html(data);
		
		// 记录请求地址以便刷新使用
		$("#jx_content").append("<input type='hidden' id='jx_hid_action' value='"+action+"'/>");
		$.parser.parse($('#jx_content'));
	});

	//页面链接、参数缓存数据
	JXCookie.setCookie('jxUrlParam', param, 24);
    $('html').css({
        'overflow': 'hidden'
    });
	$('body').css({
        'min-width': (document.body.offsetWidth - scrollBar.getScrollBar().width)+'px',
        'overflow': 'auto',
		'padding-right':'0 !important'
    });

    window.onload = function(){
        $('#jx_content').css({
            'height': (document.body.offsetHeight-94)+'px',
        });
        $('.jx-container').css({
            'height': (document.body.offsetHeight-94)+'px',
        });
        $('.jx_content').css({
            'height': (document.body.offsetHeight-94)+'px',
        });
        // document.getElementsByClassName("main-navigation-menu")[0].children[5].children[0].click();
        //document.getElementsByClassName("main-navigation-menu")[0].children[0].children[0].click();
        //document.getElementsByClassName("sub-menu")[0].children[0].className = 'active';
	}


}

/**
* 刷新页面
*/
function jx_reload_page() {
	var url = $('#jx_hid_action').val();
	jx_sub_nav(url);
}

/*
* Ajax遮罩层
*/
var mask_num = 0;
function jx_show_mask() {
	
	mask_num ++;
	if(mask_num > 1) return;

	var $mask = $("<div class='jx-mask'></div>");
	$mask.css({
		display: 'block',
		height: document.body.scrollHeight+'px'
	}).appendTo('body');

	var $maskMsg = $("<div class='jx-mask-msg'></div>");
	var $loadImg = $("<img src='style/assets/images/load/load.gif' width='100'>").appendTo($maskMsg);

	$maskMsg.appendTo('body').css({
		display: 'block',
		left: (document.body.offsetWidth - $loadImg.width())/2+'px',
		top: (document.body.offsetHeight/2)+'px'
	});
}

/**
* 释放遮罩层
*/
function jx_remove_mask() {
	mask_num--;

	if(mask_num < 1) 
		$(".jx-mask,.jx-mask-msg").remove();
}

/**
* 绩效系统AJAX登陆检查，重定向到登录页面
*/
function jx_check_redirect(data) {	
	var str = '#!#LOGIN#!#';
	if (data.substr(0,str.length) != str) {
		return 0;
	}
	if (data.indexOf('#!#LOGIN#!#') < 0) {
		return 0;
	} else {		
		location.href = 'login.jsp';
		return 1;
	}
}

/**
 * 通用Ajax处理函数。
 * @param action 请求方法
 * @param formdata 请求参数
 * @param successFunc 回调方法
 * @param async:true异步，false同步，空也是异步
 */
function jx_ajax(action, formdata, successFunc, async) {
    if (formdata == null || formdata == '') {
    	formdata = {};
    } 

    if (formdata instanceof Object) formdata.TIMESTAMP = new Date().getTime();

	var _async = async == false ? false : true;

	if (!formdata.NO_MASK) jx_show_mask();
	
	var settings = {
		type: 'POST',
		url: action,
		async: _async,
		data: formdata,
		error: function(XHR, textStatus, errorThrown) {
			jx_message_show('异常提示', errorThrown);
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
	$.ajax(settings);
}

/**
* 通用Ajax处理函数(含返回值)
* @param action 请求方法
* @param formdata 请求参数
* @param successFunc 回调方法
* @param async:true异步，false同步，空也是异步
*/
function jx_ajax_json(action, formdata, successFunc, async) {
	if (formdata == null) {
		formdata = {};
	}
	if (formdata instanceof Object) formdata.TIMESTAMP = new Date().getTime();
    if(!formdata.NO_MASK) jx_show_mask();
    
    var _async = async == false ? false : true;

	var settings = {
		type: 'POST',
		url: action,
		data: formdata,
		dataType: 'json',
		async: _async,
		error: function(XHR, textStatus, errorThrown) {
			jx_message_show('操作提示', errorThrown);
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
	$.ajax(settings);
}

/**
* 页面重新刷新
*/
function jx_reload_page() {
	var url = $("#jx_hid_action").val();
	jx_sub_nav(url);
}

/**
 * 公共弹出window
 * @param title 显示标题
 * @param width 宽度
 * @param height 高度
 * @param top 弹出框距离顶部的距离（center:居中）
 * @param url 请求地址
 * @param formData 参数,格式{xx:xx,zz:zz}
 * @param callback 回调函数
 */
function jx_common_window(title, width, height, top, url, formData, callback) {
	var rdDivId = "jx_common_div"+Math.random();
	rdDivId = rdDivId.replace(".","");
	var showDiv = $("<div id='"+rdDivId+"'></div>");
	if(!formData){
		formData = {};
	}
	formData.WINDOWID = rdDivId;
	formData.NOMASK = 1;
	var documentHeight = document.documentElement.clientHeight;
    if(height >= documentHeight){
    	height = documentHeight-10;
	}
	/*居中处理 */
	top = ($(document).scrollTop())+(documentHeight/2)-(height/2); 
	$(showDiv).window({
		title: title,
		width: width,
		height: height,
		closed: false,
		cache: false,
		modal: true,
		shadow: false,
		resizable: true,
		maximizable: false,
		minimizable: false,
		overflow: true,
		callback: callback,
		top: top, 
		collapsible: false,
		draggable: true,
		//onOpen : callback,
		onClose: function() {
			//window窗体
			var parent1 = $(this).parentsUntil(".panel window:eq(0)");
			//遮罩层
			var parentNext1 = $(parent1).next();
			$(parentNext1).prev().remove();
			$(parentNext1).remove();
		},
		onMove: function (left, top) {//限制弹出框拖动范围  
			var $this = $(this);

            var width = $this.panel('options').width;
            var height = $this.panel('options').height;
            var parentWidth = $('body').width();
            var parentHeight = $('body').height();
            var scrollLeft = document.body.scrollLeft;
            var scrollTop = document.body.scrollTop;

            // 当弹出框尺寸大于浏览器大小时，弹出框自动缩小为浏览器当前尺寸  
           if (width > parentWidth) {
                $this.window('resize', {  
                    width: parentWidth - 1
                });  
            }
            if (height > parentHeight) {
                $this.window('resize', {  
                    height: parentHeight - 1
                });
            }

            // 当弹出框被拖动到浏览器外时，将弹出框定位至浏览器边缘  
            if (left < scrollLeft) {  
                $this.window('move', {  
                    left: scrollLeft  
                });  
            }  
            if (top < scrollTop) {
                $this.window('move', {  
                    top: scrollTop  
                });  
            }  
            if (left > scrollLeft && left > parentWidth - width + scrollLeft) {  
                $this.window('move', {  
                    left: parentWidth - width + scrollLeft  
                });  
            }  
            if (top > scrollTop && top > parentHeight - height + scrollTop) {  
                $this.window('move', {  
                    top: parentHeight - height + scrollTop  
                });  
            }  
        }
	});
	jx_ajax(url, formData, function(data, status) {
		//这里可以处理通用的错误
		$('#'+rdDivId).parent().css('top', top);
		$(showDiv).html(data);
		$.parser.parse($(showDiv));
		$(showDiv).window('open');
	});
}

/**
* 关闭弹出框obj：要关闭的window中任意一对象
*/
function jx_common_closewindow(obj, isreload) {
	var parent1 = $(obj).parentsUntil(".panel window:eq(0)");
	var parentNext1 = $(parent1).next();
	$(parentNext1).prev().remove();
	$(parentNext1).remove();
	if (isreload) {
		jx_reload_page();
	}
}

/**
 * 调用通用弹出框里的回调方法。
 * @param thisA为弹窗里任意一个元素节点。
 * @param param为回调函数的参数，可以为空。
 */ 
function jx_common_window_callback(thisA, param) {
	var common_window = $(thisA).parentsUntil('.window').last();
	if(common_window.window('options')['callback']) {
        common_window.window('options')['callback'](param);
    }
}

/**
* 消息提示
*/
function jx_message_show(title, message) {
	$.messager.show({
		title : title,
		msg : message,
		showType : 'show'
	});
}

/**
* 选择附件
*/
function jx_add_uploadfile(thisA, type) {
	var file_area = $(thisA).parent().next().find('ul');

	var $tr = $("<li><input class='hide' type='file' name='jxFile' />"+
			"<div><a href='javascript:' onclick='jx_del_uploadfile(this)'>删除</a></div></li>")
	var $file = $tr.find(':file').first();
	var $span = '';
	$file.change(function() {
		var _index = $file.val().lastIndexOf('\\');
		var _file = $file.val();
		var _fileName = _file.substring(_index+1,_file.length);
		$span = '<div class="jx-hid"><a href="javascript:" title="'+_fileName+'">'+_fileName+'</a></div>';
		$file.after($span);

		if (type == 'single') file_area.empty();
		file_area.append($tr);
	});

	$file.click();
}

/**
 * 时间：2015-08-27
 * 创建人：zgs
 * 描述：部门目标中上传附件
 * @param id 放置附件名称区域ID
 */
function jx_add_uploadfile2(id) {
	var $tr = $("<table><tr><td><input type='file' name='jxFile' class='input' style='display:none'/></td></tr></table>");
	var $file = $tr.find(':file').first();
	$file.change(function() {
		var index = $file.val().lastIndexOf('\\');
		var file = $file.val();
		var fileName = file.substring(index+1,file.length);
		$("#"+id).val(fileName);
		$("#"+id).after($tr);
	});
	$tr.find(':file').first().click();
}

/**
 * 用于删除附件时给予确认删除提示
 * @param thisA 附件
 */
function jx_del_uploadfile(thisA){
	jx_common_confirm('提示', '您确认删除吗？', function(r){
		if(r){
			$(thisA).parent().parent().remove();
		}
	});
}

/**
* 通用附件上传方法
* @param action 请求方法
* @param form form表单
* @param callback 回调方法
*/
function jx_upload_file(action, form, callback) {
	jx_show_mask();
	
	$.ajaxFileUpload({
		url: action,
		type: 'post',
		secureuri: false,
		fileElementId: 'jxFile',
		oldForm: form,
		dataType: 'text',
		success: function(data, status) {	
			jx_remove_mask();
			if (jx_check_redirect(data)) {
				return '{}';
			}
			callback(data, status);
		},
		error: function(data, status, error) {
			jx_remove_mask();
			jx_message_show('操作提示', error);
		}
	});
	return false;
}

/**
* 下载附件
*/
function jx_att_download(att_id) {
	var $iframe = $('<iframe src="common/download.do?ID='+att_id+'" style="display:none"/>');
	$('body').append($iframe);
}

/**
* 删除附件
*/
function jx_att_del(thisA, isTable) {
	var $this = $(thisA);
	var param = {
        ID: $this.attr('tid')
	};
	jx_common_confirm('提示', '您确认删除吗？', function(r){
		if(r){
			jx_ajax_json('common/udelattach.do', param, function(data, status) {
				if (data.num == 1) {
					jx_message_show('提示','操作成功。');
					if (isTable) {//存在表格中
                        $this.parent().parent().remove();
					} else {
                        $this.parent().remove();
					}
				}
			});
		}
	});
}

/**
 * 流程处理
 */
function jx_workflow_hand(param) {
	if(!param.DATAID || (!param.MODULEFLAG && param.MODULEFLAG != '0')){
		jx_message_show('操作提示', '缺少必要参数！');
		return;
	}
	var callbackfunc = param.CALLBACKFUNC;
	param.CALLBACKFUNC = null;

	//判断是否有流程
	var check_url = 'workflow/scheckworkflowisexist.do';
	jx_ajax_json(check_url, param, function(data, status){
		if (data.errorData.length) {
			var error_data = data.errorData;
			jx_message_show('操作提示', error_data);
		} else {
			var wf_url = 'workflow/sshowworkflowhand.do';
			jx_common_window('流程处理', 600, 500, 100, wf_url, param, callbackfunc);
		}
	});
}

/** 
* 流程批量处理
*/
function jx_wf_multiHand(opts) {
	var wf_flag = opts.WF_FLAG;
	var data_list = opts.DATA_ID_LIST;
	var dept_id = opts.DEPT_ID;
	var param = {
		MODULEFLAG: wf_flag,
		DEPT_ID: dept_id
	};

	var callBackFunc = opts.CALLBACKFUNC;
	opts.CALLBACKFUNC = null;

    var check_url = 'workflow/scheckworkflowisexist.do';
	jx_ajax_json(check_url, param, function(data, status) {
		if (data.errorData.length) {
			jx_message_show('提示', data.errorData);
			return;
		} else {
			var param = {
				DATAIDLIST: JSON.stringify(data_list),
				MODULEFLAG: wf_flag,
				DEPT_ID: dept_id
			};
			var wf_url = 'workflow/sshowmultiplehandworkflow.do';
			jx_common_window('流程处理', 600, 480, 100, wf_url, param, callBackFunc);
		}
	});
}

/**
 * 查看流程记录
 */
function jx_show_wfhistory(data_id, module_flag, wf_id) {
	var param = {
		DATAID: data_id,
	};

	if (module_flag) param.MODULEFLAG = module_flag;
	
	if(wf_id) param.WF_ID = wf_id;
	
	var wf_url = 'workflow/sshowhistory.do';
	jx_common_window('流程记录', 735, 550, 100, wf_url, param, null);
}

/**
* 流程配置唯一性校验
*/
function jx_workflow_uniqueCheck(wfModuleID){
	var _flag = false;
	$('#workflowDiv div').each(function(i,data){
		var _thisv = $(data).attr('wfmodule');
		if(wfModuleID == _thisv){
			jx_message_show('提示','此流程已配置，您可以编辑原来的流程或删除后再新增！');
			_flag = true;
		}
	})
	return _flag;
}


/**
 * 封装新版弹出确认框
 * @param title 标题
 * @param content 内容
 * @param fun 执行操作
 */
function jx_common_confirm(title, content, fun){
	var dialog = jDialog.confirm({
		    content: content,
		    acceptButton: {
			    handler: function(button, dialog) {
				    dialog.close();
				    if(fun){
				        fun(true);
				    	return false;
				    }
			    }
		    },
		    cancelButton: {
				handler: function(button, dialog) {
					dialog.close();
					if(fun){
				        fun(false);
				    	return false;
				    }
				}
			},
		    title: title,
			buttonAlign: 'right'
		}
	);
	//聚焦到取消上面
	if($(".j-dialog-btn:eq(1)").length > 0 && $(".j-dialog-btn:eq(1)").val()=='取消'){
		$(".j-dialog-btn:eq(1)").focus();
	}
}
/**
 * 封装新版弹出提示框
 * @param title 标题
 * @param content 内容
 * @param tips 必填提示信息 
 * @param fun 执行操作
 */
function jx_common_prompt(title, content, tips, fun){
	var _message = '<textarea class="msg-prompt">'+content+'</textarea>';
	var dialog = jDialog.confirm({
		    content: _message ,
		    acceptButton: {
			    handler: function(button,dialog) {
			    	var message = $('.msg-prompt').val();
				    if(fun){
				    	if(message){
				    		dialog.close();
				    		fun(message);
				    	}else{
				    		if(tips){
				    			jx_common_message('提示', tips);
				    		}
				    	}
				    	return false;
				    }
			    }
		    },
		    cancelButton: {
				handler: function(button,dialog) {
					dialog.close();
					if(fun){
				        fun(false);
				    	return false;
				    }
				}
			},
			padding: '0 10px',
		    title: title,
			buttonAlign: 'right'
		}
	);
}

/**
 * 封装新版弹出提示框
 * @param title 标题
 * @param content 内容
 * @param fun 执行操作
 */
function jx_common_alert(title, content, fun){
	var dialog = jDialog.alert({
			content: content,
			acceptButton: {
				    handler: function(button,dialog) {
			    	dialog.close();
				    if(fun){
				        fun(true);
				    	return false;
				    }
			    }
		    },
		    cancelButton: {
				handler: function(button,dialog) {
					dialog.close();
					if(fun){
				        fun(false);
				    	return false;
				    }
				}
			},
			title: title,
			showButton: false,
			showShadow: false,
			buttonAlign: 'center'
  		}
  	);
}

/**
* 消息提示框
* @param title标题
* @param content提示信息
*/
function jx_common_message(title, content){
    var dialog = jDialog.message({
    	title: title,
		content: content,
		autoClose : 3000, 
		width: 220, 
		modal: false,
		bottom: 10,
		right: 10,
		autoMiddle: false
	});
}

/**
* 数据列表无数据提示
*/
function jx_common_tab_nodata(opts){
    if(!opts) return;

    var tab = opts.table;//数据列表
    var tdLen = opts.colspan;//合并多少个单元格
    var text = opts.text || '暂无数据';//无数据提示信息

    var $tr = $('<tr></tr>');
    $tr.appendTo(tab);

    var $td = $('<td colspan='+tdLen+'>'+text+'</td>');
    $td.appendTo($tr);
}

/**
* 字符串格式化
*/
String.format = function() {
    if (!arguments.length)
        return String.empty;

    if (typeof arguments[0] != 'string')
        throw new TypeError('the first argument must the type of String.');

    if (arguments.length == 1)
        return arguments[0];

    var str = arguments[0];

    for (var i = 0; i < arguments.length; i++) {
        str = str.replace('{' + i + '}', arguments[i + 1]);
    }
    return str;
};

/**
 * 日期格式化  
 * @param formatStr
 * @returns
 */
Date.prototype.format = function(fmt) {   
    var o = {           
	    "M+" : this.getMonth()+1, //月份           
	    "d+" : this.getDate(), //日           
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
	    "H+" : this.getHours(), //小时           
	    "m+" : this.getMinutes(), //分           
	    "s+" : this.getSeconds(), //秒           
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
	    "S"  : this.getMilliseconds() //毫秒           
    };           
    var week = {           
	    "0" : "日",           
	    "1" : "一",           
	    "2" : "二",           
	    "3" : "三",           
	    "4" : "四",           
	    "5" : "五",           
	    "6" : "六"          
    };           
    if(/(y+)/.test(fmt)) {           
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
    }           
    if(/(E+)/.test(fmt)) {           
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);           
    }           
    for(var k in o) {           
        if(new RegExp("("+ k +")").test(fmt)){           
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
        }           
    }           
    return fmt;         
}

// 从json对象中根据属性和值获取对象
function jx_getObjByJsonObj(arrList, objPropery, objValue) {
    return $.grep(arrList, function(cur, i) {
        return cur[objPropery] == objValue;
    });
}

//根据两个参与从json对象中获取相符的集合
function jx_getObjByJsonObjTwo(arrList, objPropery1, objValue1, objPropery2, objValue2) {
    return $.grep(arrList, function(cur, i) {
        return (cur[objPropery1] == objValue1) && (cur[objPropery2] == objValue2);
    });
}

/**
* 数据字典
*/
function jx_type_add(model_flag, parent_id, callback) {
 	var pid = 0;
 	if (parent_id) pid = parent_id;

 	var param = {
 		MODELFLAG: model_flag,
 		PARENTID: pid
 	}; 

	jx_common_window('', 600, 400, 100, 'type/sshowTypeEdit.do',param,callback);
}
 
function jx_type_edit(param, callback) {
	jx_common_window('', 600, 400, 100, 'type/sshowTypeEdit.do', param,callback);
}
 
function jx_type_del(id, callback) {
	jx_common_confirm('提示', '您确认删除吗？', function(r){
		if(r){
			jx_ajax('type/udelTypeInfo.do', 
				{
					TYPE_ID: id
				},
				function(data, status) {
					callback();
					jx_message_show('提示', '操作成功。');
				}
			);
		}
	});
}

/**
* Easyui 校验规则扩展
*/
$.extend($.fn.validatebox.defaults.rules, {
    radio: {  
        validator: function(value, param){  
            var input = $(param[0]),status = false;
            input.off('.radio').on('click.radio',function(){
                $(this).focus();
                try{ cntObj.tooltip('hide'); }catch(e){}
            });
            var firstObj = $(input[0]),cntObj = firstObj.parent(),initCount = cntObj.attr('initCount') || 0;
            cntObj.off('mouseover mouseout').on('mouseover mouseout', function(event){
                var bool = input.validatebox('isValid');
                if(event.type == 'mouseover'){
                    if(bool) try{ cntObj.tooltip('hide'); }catch(e){}
                    else try{ cntObj.tooltip('show');}catch(e){}
                }else if(event.type == 'mouseout') try{ cntObj.tooltip('hide'); }catch(e){}
            });

            var tipMsg = firstObj.validatebox.defaults.missingMessage || firstObj.validatebox.defaults.rules.checkbox.message;
            if(initCount-1<0){
                firstObj.parent().tooltip({
                    position: 'right',
                    content: '<span style="color:#fff">'+tipMsg+'</span>',
                    onShow: function(){
                        $(this).tooltip('tip').css({
                            backgroundColor: '#666',
                            borderColor: '#666'
                        });
                    }
                }).tooltip('hide');
                initCount = initCount - 0 + 1;
                cntObj.attr("initCount",initCount);
            }

            status = $(param[0] + ':checked').val() != undefined;
                
            return status;
        },  
        message: 'Please choose option for {1}.' 
    },
    checkbox: {
        validator: function (value, param) {
            var inputs = $(param[0]), maxNum = param[1], checkNum = 0,status = false;
            inputs.each(function () { 
                if (this.checked) checkNum++;
            });
            inputs.off('.checkbox').on('click.checkbox',function(){
                $(this).focus();
                var bool = inputs.validatebox('isValid');
                if(bool) $(this).parent().parent().parent().tooltip('destroy');
                else {
                    var tipMsg = $(this).validatebox.defaults.missingMessage || $(this).validatebox.defaults.rules.checkbox.message;
                    $(this).parent().parent().parent().tooltip({
                        position: 'right',
                        content: '<span style="color:#000">'+tipMsg+'</span>',
                        onShow: function(){
                            $(this).tooltip('tip').css({
                                backgroundColor: 'rgb(255,255,204)',
								borderColor: 'rgb(204,153,51)',
								color: '#000'
                            });
                        }
                    }).tooltip('show');
                }
            });
            status = checkNum > 0;

            return status;
        },
        message: 'Please choose options !'
    }
});