/** 
 * 通用组织机构人员对话框。type：0部门，1人员。stype:1单选，2多选。callback回调。
 * 统一返回JSON数组，形如：[{name:部门1,val:1},{name:部门2,val:2}]
 * choose为已选择的项，格式为[{"id":"13","name":"综合管理部"},。。。。。。]
 */
function jx_org_person_dlg(type, stype, callback, rdata, opts) {
	scrollBar.showHideScrollBar('hide');
	
	var showdiv = null;
	if ($("#jx_common_orgpersonwindow").length > 0) {
		//showdiv = $("#jx_common_orgpersonwindow");
		//销毁重新创建
		$("#jx_common_orgpersonwindow").window("destroy");
	} 
	showdiv = $("<div class='nobd' id='jx_common_orgpersonwindow'></div>");

	var param = {
		type: type,
		stype: stype
	};

	param = $.extend({}, param, opts);
	var width = 600;
	//选择人员增加宽度
	if(type == 1 || type == 10){
		width = 750;
	}
	var height = 660;

	var documentHeight = document.documentElement.clientHeight;
    if(height >= documentHeight){
    	height = documentHeight;
	}
	//alert(height)
	var dlgTop = ($(document).scrollTop())+(documentHeight/2)-(height/2);
	
	//600
	$(showdiv).window({
		title: '组织机构人员对话框',
		width: width,
		height: height,
		shadow: false,
		closed: false,
		top: dlgTop,
		cache: false,
		maximizable: false,
		minimizable: false,
		modal: true,
		rdata: rdata,		
		callback: callback,
		draggable: false,
		onClose: function() {
			var parent1 = $(this).parentsUntil(".panel window:eq(0)");
			var parentNext1 = $(parent1).next();
			var parentNext2 = $(parentNext1).next();
			$(parentNext1).prev().remove();
			$(parentNext2).remove();
			$(parentNext1).remove();
			scrollBar.showHideScrollBar('show');
		}
	});
	jx_ajax('common/sorgpserson.do', param, function(data, status) {
		$('#jx_common_orgpersonwindow').parent().css('top',dlgTop);
		$(showdiv).html(data);
		$.parser.parse($(showdiv));
		$(showdiv).window('open');
	});
}

// 通用组织机构人员对话框双击事件
function jx_left_select(e, single) {	
	var $value = $(e).find("option:selected").val();
	var $text = $(e).find("option:selected").text();
	var $deptid=$(e).find("option:selected").attr("deptid");
	var $userno=$(e).find("option:selected").attr("userno");
	if(typeof($value) == 'undefined'){
		return;
	}
	var $rightselect = $(e).parent().parent().children().last().children();
	if (single > 1) {
		var $exist = $rightselect.find("[value='" + $value + "']");
		if (!$exist.length) {
			$rightselect.append("<option value='" + $value + "' deptid="+$deptid+"  userno='"+$userno+"'>" + $text
					+ "</option>");
		}
	} else {
		$rightselect.empty();
		$rightselect.append("<option value='" + $value + "'>" + $text
				+ "</option>");
	}
}
function jx_right_select(e) {
	var $r = $(e).find("option:selected");
	$r.remove();
}

function jx_delete_select_all(e) {
	var $rightselect = $(e).parent().parent().children().last().children();
	$rightselect.empty();
}

function jx_add_select_all(e) {
	var $leftselect = $(e).parent().parent().children().first().children();
	var $rightselect = $(e).parent().parent().children().last().children();
	if($(e).parent().prev().prev().length>0){
		$leftselect = $(e).parent().parent().find("td:eq(1)").children();
	}
	$leftselect.children().each(
        function() {
            var $value = $(this).val();
            var $text = $(this).text();
            var $deptid=$(this).attr("deptid");
            var $userno=$(this).attr("userno");
            var $exist = $rightselect.find("[value='" + $value + "']");
            if (!$exist.length) {
                $rightselect.append("<option value='" + $value + "' deptid="+$deptid+"  userno='"+$userno+"'>"
                        + $text + "</option>");
            }
        });

}

function jx_add_select_one(e, single) {
	var $leftselect = $(e).parent().parent().children().first().children();
	if($(e).parent().prev().prev().length>0){
		$leftselect = $(e).parent().parent().find("td:eq(1)").children();
	}

	var $rightselect = $(e).parent().parent().children().last().children();
	var $selects = $leftselect.find("option:selected");
	if (single > 1) {
		$selects.each(function() {
			var $value = $(this).val();
			var $text = $(this).text();
			var $deptid=$(this).attr("deptid");
			var $userno=$(this).attr("userno");
			var $exist = $rightselect.find("[value='" + $value + "']");
			if (!$exist.length) {
				$rightselect.append("<option value='" + $value + "' deptid="+$deptid+"  userno='"+$userno+"'>" + $text
						+ "</option>");
			}
		});
	} else {
		$rightselect.empty();
		$selects.first().each(
				function() {
					var $value = $(this).val();
					var $text = $(this).text();
					var $exist = $rightselect.find("[value='" + $value + "']");
					if (!$exist.length) {
						$rightselect.append("<option value='" + $value + "'>"
								+ $text + "</option>");
					}
				});
	}
}

function jx_delete_select_one(e) {
	var $rightselect = $(e).parent().parent().children().last().children();
	var $r = $rightselect.find("option:selected");
	$r.remove();
}

function jx_moveup_select(e) {
	var $rightselect = $(e).parent().parent().children().last().children();
	var $r = $rightselect.find("option:selected");
	var $before = $r.prev('option').last();

	var first = 0;
	$r.each(function() {
		if ($(this).val() == $before.val()) {
			first = 1;
		}
	});
	if (first == 1) {
		return;
	}
	$r.each(function() {
		$(this).insertBefore($before);
	});
}

function jx_movedown_select(e) {
	var $rightselect = $(e).parent().parent().children().last().children();
	var $r = $rightselect.find("option:selected");
	var $next = $r.next('option').last();

	var last = 0;
	$r.each(function() {
		if ($(this).val() == $next.val()) {
			last = 1;
		}
	});

	if (last == 1) {
		return;
	}

	$($r.toArray().reverse()).each(function() {
		$(this).insertAfter($next);
	});
}

// tab标签切换样式
$(document).delegate(".jx_tab div:gt(0)", "click", function() {
	$(".jx_tab div:gt(0)").attr("class", "");
	$(this).attr("class", "tab_selected");
});

// 计划监控多条件隐藏
function jx_mult_condition1(thisA) {
	$('.MB_search01').slideToggle();
	if ($(thisA).hasClass('xz_jiantouB')) {
		$(thisA).removeClass('xz_jiantouB');
		$(thisA).addClass('xz_jiantouT');
	} else {
		$(thisA).removeClass('xz_jiantouT');
		$(thisA).addClass('xz_jiantouB');
	}
}


// 分页表格通用删除
function jx_page_common_del(thisA) {
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			var $ID = $(thisA).parent().parent().attr("tid");
			var param = {};
			param.ID = $ID;
			jx_ajax_json($(thisA).attr('action'), param, function(data, status) {
				if (data.num == 1) {
					jx_message_show('操作提示','操作成功！');
					jx_com_page_refresh_function();
				}
			});
		}
	});
}


// 根据数据状态，显示审批状态信息。
function jx_plan_PLANSTATE(i) {
	var eid = parseInt(i);
	var str = '未知状态';
	switch (eid) {
	case 0:
		str = '待提交';
		break;
	case 1:
		str = '审批中';
		break;
	case 2:
		str = '已回退';
		break;
	case 9:
		str = '已审批';
		break;
	default:
		str = '未知状态';
		break;
	}
	return str;
}

// 根据数据状态，显示紧急状态信息。
function jx_plan_EMERGENCY(i) {
	var eid = parseInt(i);
	var str = '未知状态';
	switch (eid) {
	case 1:
		str = '紧急而重要';
		break;
	case 2:
		str = '重要但不紧急';
		break;
	case 3:
		str = '紧急但不重要';
		break;
	case 4:
		str = '不重要也不紧急';
		break;
	default:
		str = '未知状态';
		break;
	}
	return str;
}

// 根据数据状态，显示变更验收等审批通过信息。
function jx_plan_APPROVE(i) {
	var eid = parseInt(i);
	var str = '未知状态';
	switch (eid) {
	case 0:
		str = '批复中';
		break;
	case 1:
		str = '通过';
		break;
	case 2:
		str = '未通过';
		break;
	default:
		str = '未知状态';
		break;
	}
	return str;
}

// 根据数据状态，显示变更验收等审批通过信息。
function jx_plan_changeflag(i) {
	var eid = parseInt(i);
	var str = '未知状态';
	switch (eid) {
	case 0:
		str = '申请延期';
		break;
	case 1:
		str = '申请取消';
		break;
	default:
		str = '未知';
		break;
	}
	return str;
}

/*
* 设置是否需要字段必填项
*/
function jx_common_combobox_validEnable(id, type){
	var $this = $('#'+id);
	if(type === 0){
		$this.combobox({
			required: false,
			validType: '' 
		});
	}else{
		$this.combobox({
			required: true,
			validType: 'selectValueRequired'
		});
	}
}

// 显示任务库详细
function jx_taskbase_showDetail(id) {
	jx_common_window('任务库详细', 760, 540, 100, 'task/sshowtaskbasedetail.do', {
		ID : id
	}, null);
}

// 显示任务新增
function jx_task_showadd(isindex,isxiafa) {
	var param = {};

	if(isindex) param.isindex = isindex;
	
	if (isxiafa) {
		param.isxiafa = 2;
		jx_common_window('制定任务', 762, 620, 50, 'task/sshowtaskadd.do', param, null);
	} else {
        var url = 'task/qqueryTaskIsExistUnfinishTask.do';
        var task_param = {
            TASK_UID: $('#jx_common_uid').val()
        };
        jx_ajax_json(url, task_param, function(data, status){
        	if (!data.ret) {
                jx_common_window('制定任务', 762, 620, 50, 'task/sshowtaskadd.do', param, null);
        	} else {
        		jx_message_show('提示', data.ret);
        	}
        });
	}
}

/**
 * 修改任务信息
 * ISMONITOR为8时则是首页过来的页面
 * @param id
 */
function jx_task_showUpdate(id,ISMONITOR) {
	jx_common_window('编辑任务', 762, 620, 60, 'task/sshowtaskupdate.do', {
		ID : id,ISMONITOR:ISMONITOR
	}, null);
}

// 选择任务库
function  jx_common_select_taskbase(parm,callbak) {
	jx_common_window('选择任务', 760, 580, 100, 'task/sshowselecttaskbase.do', parm, callbak);
}

/**
 * 显示個人任务评价
 */
function jx_showtaskassessofweekanduser() {
	jx_common_window('任务评价', 915, 530, 100, 'task/sshowtaskinfoofuserandweek.do', $(
			"#JX_TASK_ASSESS_FORM").serialize(), null);
}

// 任务删除
function jx_task_del(id) {
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			jx_ajax("task/sdeltask.do", {
				ID : id
			}, function(date, status) {
				jx_message_show('提示','操作成功。');
				//从首页删除任务
				if($('#isusertaskindex').val()){
					jx_reload_page();
				}else{
					JXTaskManager.loadTaskData();
				}
			});
		}
	});
}

//任务上报
function jx_task_report(task) {
	
	if(!jx_task_check_is_setuser(JXUProp.id, 8)){
		return;
	}

	var task_id = task.ID;
	var dept_name = task.TASK_APPROVER_DEPTNAME;
	var user_name = task.TASK_APPROVER;
	
	var callback = arguments[1];
	jx_common_confirm('提示','您确认上报给'+ dept_name + user_name +'吗？',function(r){
		if(r){
			jx_ajax("task/supdatetaskstate.do", {
				ID: task_id,
				STATE: 11
			}, function(date, status) {
				jx_message_show('提示','操作成功。');
				
			    if (callback) {
					callback();
				} else {
					JXTaskManager.loadTaskData();
				}
			});
		}
	});
}

// 任务退回
function jx_task_return(id) {
	jx_common_confirm('提示','您确认退回吗？',function(r){
		if(r){
			jx_ajax("task/supdatetaskstate.do", {
				ID : id,
				STATE : 20
			}, function(date, status) {
				jx_message_show('提示','操作成功。');
				JXTaskManager.loadTaskData();
			});
		}
	});
}

/**
 * 接收任务信息
 * 
 * @param id
 */
function jx_task_showrecevie(thisA,type) {
	var param = {};
	param.ID = $(thisA).attr('ID');
	param.TYPE = type;
	jx_common_window('接收任务', 762, 665, 100, 'task/sshowtaskreceive.do',param, null);
}

// 任务审批通过
function jx_task_pass(thisA,type) {
	jx_common_confirm('提示','您确认通过吗？',function(r){
		if(r){
			jx_ajax("task/supdatetaskstate.do", {
				ID : $(thisA).attr('ID'),
				STATE : 85
			}, function(date, status) {
				jx_message_show('提示','操作成功。');
				switch(type){
				case 'index':
					new JXTodo().init();
					break;
				case 'task':
					JXTaskManager.loadTaskData();
					break;
				case 'hand':
					jx_common_closewindow(thisA);
					new JXTodo().init();
					break;
				}
			});
		}
	});
}

/**
 * 时间：2015-06-10
 * 描述：任务退回时操作，退回理由必填
 */
function jx_task_back(thisA,type) {
	 jx_common_prompt('请输入退回原因', '', '退回原因必填！',function(r){
		 if(r){
			 //退回操作确定并填写了退回理由
			 jx_ajax("task/supdatetaskstate.do", {
			     ID: $(thisA).attr('ID'),
				 STATE: 12,
				 BACKSOURCE: r
			 }, function(date, status) {
				jx_message_show('提示','操作成功。');
				switch(type){
				case 'task':
					JXTaskManager.loadTaskData();
					break;
				case 'hand':
					jx_common_closewindow(thisA);
					new JXTodo().init();
					break;
				}
			});
    	 }
     });
}

/**
*时间：2015-06-10
*创建人：zgs
*描述：退回待接收的任务，确认退回时需要填写退回原因
*
*/
function jx_task_return_this(thisA,type){
	jx_common_prompt('请输入退回原因', '', '退回原因必填！',function(r){
         if (r){
        	 var taskID = $(thisA).attr('ID');
        	 var toUser = $(thisA).attr('TO_USER');
        	 var param = {};
        	 param.ID = taskID;
        	 param.STATE = 12;
        	 param.BACKSOURCE = r;
        	 
        	 if(type !== 'index2'){
        		 //下发退回
        		 param.USERID = toUser;//退回到用户ID
	 			 param.isxiafa = 1;
        	 }
        	 //退回操作确定并填写了退回理由
        	 jx_ajax("task/supdatetaskstate.do", param, function(date, status) {
 				jx_message_show('提示','操作成功！');
 				switch(type){
 				case 'index':
 				case 'index2':
					new JXTodo().init();
					break;
 				case 'task':
 					JXTaskManager.loadTaskData();
 					break;
 				case 'hand':
 					jx_common_closewindow(thisA);
 					var todoID = $(thisA).attr('TODO_ID');
					new JXTodo().delTodoByHand(todoID);
 					break;
 				}
 			});
         }
     });
}


/*
* 任务沟通信息填出对话跨过。超链接上需要绑定属性tid，表示任务ID。
* model：1 汇报, 2 沟通, 3 验收, 4 变更, 5 评论, 6 预警, 7 督办
*/
function jx_task_communication_dlg(thisA, model) {
	model = model;
	var param = {};
	param.ID = $(thisA).attr('tid');
	if($(thisA).attr('canAdd') != undefined){
		param.canAdd = $(thisA).attr('canAdd');
	}else{
		param.canAdd = 'true';
	}
	/*任务创建人*/
	if($(thisA).attr('taskUser') != undefined){
		param.TASKUSER =  $(thisA).attr('taskUser')
	}
	param.model = model;
	try{
		param.jx_task_monitornew_hideoperation = $("#jx_task_monitornew_hideoperation").val();
	}catch(e){
		param.jx_task_monitornew_hideoperation = 0;
	}
	jx_common_window('任务沟通信息', 1000, 500, 100, 'task/qtaskcommunication.do', param,null);
}
/**
 * 时间：2015-09-21
 * 创建人：zgs
 * 描述：加载任务变更详细信息
 */
function jx_task_takchangedetail(id){
	var param = {};
	param.ID = id;
	jx_common_window('任务变更详细信息', 650, 570, 100, 'task/sshowtaskchangedetail.do', param,null);
}

/**
 * easyui校验扩展
 */
var validateReg = {
    mobileReg: /^(\+?0?86\-?)?1[345789]\d{9}$/,
    phoneReg: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    pwdReg: /(?!^\d+$)(?!^[a-zA-Z]+$)([0-9a-zA-Z]){6,30}/
};
$.extend($.fn.validatebox.defaults.rules, {
	selectValueRequired : {
		validator : function(value, param) {
			if (value == "" || value.indexOf('选择') >= 0
					|| value.indexOf('全部') >= 0) {
				return false;
			} else {
				return true;
			}
		},
		message : '该下拉框为必选项'
	},
	equalTo: {//两字段值是否相等
    	validator: function (value, param) { 
    		return $(param[0]).val() == value;
        }, 
        message: '字段不匹配' 
    },
    phone: {//电话号码
	    validator: function(value){
		    var rex = validateReg.mobileReg;
		    var reg2 = validateReg.phoneReg;
		    if(rex.test(value) || rex2.test(value)){
		        return true;
		    }else{
		        return false;
		    }
	    },
	    message: '请输入正确电话或手机格式'
	},
	mobile: {//手机号
	    validator: function(value){
	        var reg = validateReg.mobileReg;
	        return reg.test(value);
	    },
	    message: '手机号格式不正确！'
	},
	password: {
		validator: function(value){
	        var reg = validateReg.pwdReg;
	        return reg.test(value);
	    },
	    message: '不能纯数字纯字母，长度6-30'
	}
});

// 显示任务详细页面
function jx_show_task_detail(thisA) {
	var param = {};
	param.ID = $(thisA).attr('tid');
	jx_common_window('任务详细信息', 762, 665, 50, 'task/staskdetaildlg.do', param, null);
}

// 显示任务详细页面
function jx_show_task_detail_id(id) {
	var param = {};
	param.ID = id;
	jx_common_window('任务详细信息', 762, 650, 50, 'task/staskdetaildlg.do', param, null);
}


// 通用下载附件方法
function jx_down(id) {
	var $iframe = $('<iframe src="common/download.do?ID='+id+'" style="display:none"/>');
	$('body').append($iframe);
}


// 通用删除附件
function jx_common_del_att(thisA) {
	var param = {};
	param.ID = $(thisA).attr('tid');
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			jx_ajax_json('common/udelattach.do', param, function(data, status) {
				if (data.num == 1) {
					jx_message_show('提示','操作成功。');
					$(thisA).parent().remove();
				}
			});
		}
	});
}

// 汇报状态显示信息。
function jx_plan_report_exestate(i) {
	var eid = parseInt(i);
	var str = '未知状态';
	switch (eid) {
	case 0:
		str = '进度正常';
		break;
	case 1:
		str = '进度提前';
		break;
	case 2:
		str = '进度延后';
		break;
	case 3:
		str = '严重延期';
		break;
	case 4:
		str = '工作暂停';
		break;
	default:
		str = '未知状态';
		break;
	}
	return str;
}

// 切换显示
function jx_toggle_content_headbar(thisA) {
	$(thisA).next().toggle();
}

// 变换用户头像
function jx_uicon_change(icon_url){
	$('.navbar-right .portrait').attr('src', icon_url);
}
// 表格样式重置
function common_table_css_reset(tableId){
	$('#'+tableId).find("tr").removeClass();
	$('#'+tableId).find("tr:even").addClass('line');
	$('#'+tableId).find("tr:even").addClass('list_hui');
	$('#'+tableId).find("tr:odd").addClass('line');
	$('#'+tableId).find("tr:odd").addClass('list_bai');
	$('#'+tableId).children().first().children().first().removeClass();
}

// 根据任务状态显示相应图标
function jx_state_img(state) {
	var str = 'state1.png';
	var eid = parseInt(state);
	switch (eid) {
	case 85:
		str = 'state1.png';//进行中
		break;
	case 84:
		str = 'state2.png';//已取消
		break;
	case 99:
		str = 'state3.png';//已完成(审批通过)
		break;
	case 80:
		str = 'state4.png';//未完成
		break;
	case 82:
		str = 'state5.png';//已延迟
		break;
	default:
		str = 'state1.png';
		break;
	}
	return str;
}

// 根据任务状态显示相应图标
function jx_state_string(state) {
	var str = '未知状态';
	var eid = parseInt(state);
	switch (eid) {
	case 10:
		str = '未提交';
		break;
	case 11:
		str = '已提交';
		break;
	case 12:
		str = '退回';
		break;
	case 21 : 
		str = '待接收';
		break;
	case 51:
		str = '已审批';
		break;
	case 85:
		str = '进行中';
		break;
	case 84:
		str = '已取消';
		break;
	case 88:
		str = '进行中';
		break;
	case 80:
		str = '未完成';
		break;
	case 82:
		str = '已延迟';
		break;
	case 99:
		str = '已完成';
		break;
	default:
		str = '未知状态';
		break;
	}
	return str;
}

// 从json对象中根据属性和值获取对象
function jx_getObjByJsonObj(arrPerson, objPropery, objValue) {
    return $.grep(arrPerson, function(cur, i) {
        return cur[objPropery] == objValue;
    });
}

//根据两个参与从json对象中获取相符的集合
function jx_getObjByJsonObjTwo(arrList, objPropery1, objValue1, objPropery2, objValue2) {
    return $.grep(arrList, function(cur, i) {
        return (cur[objPropery1] == objValue1) && (cur[objPropery2] == objValue2);
    });
}

//打开预警设置对话框
function jx_taskbase_open_warning_dlg(formID,callback) {
	jx_common_window('提醒配置', 800, 420, 100, 'common/swarningdlg.do', $("#" + formID).serialize(), callback);
}

//任务库预警对话框回调
function jx_taskbase_warning_data(data) {
	$('#JX_WARN_MSG').html(data.MSGSHOW);
	$('#JX_WARN_MSG').attr('title', data.MSGSHOW);
	$('#JX_WARNING_DATA').val(JSON.stringify(data));
}

//切换预警类型:1,定时;2,周期。
function jx_warning_toggle_type(type) {
	if ('1' == type) {
		$('#JX_WARNING_TYPE2').hide();
		$('#JX_WARNING_TYPE1').show();
	} else if ('2' == type) {
		$('#JX_WARNING_TYPE1').hide();
		$('#JX_WARNING_TYPE2').show();
	}
}
//切换预警周期:1,每天;2,每周;3,每月;4,每季度;5,每年。
function jx_warning_toggle_cycle_type(type) {
	if ('1' == type) {
		$('#JX_WARNING_CYCLE_TYPE1').show();
		$('#JX_WARNING_CYCLE_TYPE2').hide();
		$('#JX_WARNING_CYCLE_TYPE3').hide();
		$('#JX_WARNING_CYCLE_TYPE4').hide();
		$('#JX_WARNING_CYCLE_TYPE5').hide();
	} else if ('2' == type) {
		$('#JX_WARNING_CYCLE_TYPE1').hide();
		$('#JX_WARNING_CYCLE_TYPE2').show();
		$('#JX_WARNING_CYCLE_TYPE3').hide();
		$('#JX_WARNING_CYCLE_TYPE4').hide();
		$('#JX_WARNING_CYCLE_TYPE5').hide();
	} else if ('3' == type) {
		$('#JX_WARNING_CYCLE_TYPE1').hide();
		$('#JX_WARNING_CYCLE_TYPE2').hide();
		$('#JX_WARNING_CYCLE_TYPE3').show();
		$('#JX_WARNING_CYCLE_TYPE4').hide();
		$('#JX_WARNING_CYCLE_TYPE5').hide();
	} else if ('4' == type) {
		$('#JX_WARNING_CYCLE_TYPE1').hide();
		$('#JX_WARNING_CYCLE_TYPE2').hide();
		$('#JX_WARNING_CYCLE_TYPE3').hide();
		$('#JX_WARNING_CYCLE_TYPE4').show();
		$('#JX_WARNING_CYCLE_TYPE5').hide();
	} else if ('5' == type) {
		$('#JX_WARNING_CYCLE_TYPE1').hide();
		$('#JX_WARNING_CYCLE_TYPE2').hide();
		$('#JX_WARNING_CYCLE_TYPE3').hide();
		$('#JX_WARNING_CYCLE_TYPE4').hide();
		$('#JX_WARNING_CYCLE_TYPE5').show();
	}
}

//生成预警提醒信息
function jx_warning_generate_msg(data,jd,model){
	var msg = '"#1#"#2#(#3#)';
	if('1' == model){
		msg = msg.replace('#2#',"任务上报");
	}else if('2' == model){
		msg = msg.replace('#2#',"任务汇报");
	}
	if (data.WTYPE == 1) {
		//定时预警
		data.WTIME = jd.WTIME;
		data.MSG = msg.replace("#3#",jd.WTIME);
	} else if (data.WTYPE == 2) {
		//循环预警
		data.CYCLETYPE = jd.CYCLETYPE;
		if (data.CYCLETYPE == 1) {
			//每天
			data.CYCLE = jd.C11;
			data.MSG = msg.replace("#3#","每天" + jd.C11);
		} else if (data.CYCLETYPE == 2) {
			//每周
			data.CYCLE = jd.C21;
			data.MSG = msg.replace("#3#","每周" + jd.C21);
		} else if (data.CYCLETYPE == 3) {
			//每月
			data.CYCLE = jd.C31;
			data.MSG = msg.replace("#3#","每月" + jd.C31);
		} else if (data.CYCLETYPE == 4) {
			//每季度
			data.CYCLE = jd.C41;
			data.MSG = msg.replace("#3#"+"每季度");
		} else if (data.CYCLETYPE == 5) {
			//每年
			data.CYCLE = jd.C51 + '#' + jd.C52;
			data.MSG = msg.replace("#3#","每年" + jd.C51 + "月" + jd.C52 + "日");
		}
	}		
}

//任务周志查看
function jx_week_note_view(thisA){
	var param = {};
	param.ID = $(thisA).attr('tid');
	if($(thisA).attr('state') == '2'){
		jx_common_window('查看周志', 1000, 530, 100, 'task/sweeknoteview.do', param, jx_week_note_shenpi_refresh);
	}else if($(thisA).attr('state') == '9'){
		jx_common_window('查看周志', 1000, 530, 100, 'task/sweeknoteview.do', param, jx_week_note_shenpi_refresh);
	}else{
		jx_common_window('查看周志', 915, 530, 100, 'task/sweeknoteview.do', param, jx_week_note_refresh);
	}		
}
//刷新页面
function jx_week_note_shenpi_refresh(){	
	jx_sub_nav('task/sshowtaskappraise.do?MONTH='+$('#CUR_MONTH').val()+'&WNUM='+$('#WNUM').val()+'&YEAR='+$('#CUR_YEAR').val());
}

//刷新页面
function jx_week_note_refresh(){
	jx_sub_nav('task/sweeknote.do?MONTH='+$('#CUR_MONTH').val());
}


//取有效位
var JX_Digit = {};
JX_Digit.round = function(digit, length) {
    length = length ? parseInt(length) : 0;
    if (length <= 0) return Math.round(digit);
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
    return digit;
};

 //增加字典
 function jx_add_type_info(MODELFLAG,parentid,callback,isOutUse) {
	 	var param = {}; 
	 	var pid=0;
	 	if(parentid){
	 		pid=parentid;
	 	}
	 	var windowheight=400;
		if(isOutUse){
			param.isOutUse = isOutUse;
			windowheight=300;
		}
		
	 	param.MODELFLAG = MODELFLAG;
	 	param.PARENTID = pid;
		jx_common_window('字典添加', 500, windowheight, 100, 'common/stypeinfodetail.do',param,callback);
}
 
 //增加字典
 function jx_edit_type_info(param,callback,isOutUse) {
	   var windowheight=400;
	   if(isOutUse){
	       param.isOutUse = isOutUse;
	       windowheight=300;
	    }
		jx_common_window('字典添加', 500, windowheight, 100, 'common/stypeinfodetail.do', param,callback);
	}
 
 //删除字典
function jx_del_type_info(id,callback) {
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			jx_ajax('common/utypeinfodel.do', {ID:id},function(data, status) {
				callback();
				jx_message_show('提示','操作成功。');
			});
		}
	});
}
 
 //根据日期获取周几
 function jx_getweek(date){
	 var newdate = new Date(Date.parse(date.replace(/-/g,"/")));
	 return newdate.format('EE');
 }
 
/******************************** String扩展 BEGIN ***************************/
 // 表示空字符串('')
 String.empty = '';
 
 // String.format, 类似.NET中的String.Format
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

 
 // 判断字符串是否为null或空格字符
 String.isNullOrWhiteSpace = function(str) {
     if (typeof str != 'string')
         throw TypeError('the argument "str" must be a type of String');

     return str ? str.replace(/\s/gi, String.empty) ? false : true : true;
 };

 
 // 判断字符串是否为null或String.empty
 String.isNullOrEmpty = function(str) {
     if (str == undefined || str == null ) 
         return true;
     if (typeof str != 'string')
         throw TypeError('the argument "str" must be a type of String');

     return str ? str.replace(/(^\s*)|(\s*$)/g, String.empty) ? false : true : true;
 }
 
 
 /******************************** String扩展 END ***************************/

 
 
 /***************************** Array扩展 BEGIN *****************************/
 Array.prototype.forEach = function( action ) {
	 if( typeof action != 'function' ) {
		 throw new TypeError( 'argument "action" is not a function' );
	 }
	 for (var i = 0; i < this.length; i++) {
		action( this[i], i );
	 }
	 return this;
 };
 
 Array.prototype.firstOrDefault = function(){
	 if( this.length < 1) { return null; }
	 return this[0];
 };
 
 Array.prototype.where =  Array.prototype.find;
 
 Array.prototype.find = function( predicate ) {
	 if( typeof predicate != 'function' ) {
		 throw new TypeError( 'argument "predicate" is not a function' );
	 }
	 var retArray = new Array();
	 
	 for (var i = 0; i < this.length; i++) {
		if( predicate(this[i]) ) { retArray.push(this[i]); }
	}
	return retArray;
 };
 
 Array.prototype.where =  Array.prototype.find;
 
 Array.prototype.select = function( func ){
	 if( typeof func != 'function' ) {
		 throw new TypeError( 'argument "func" is not a function' );
	 }
	 var retArray = new Array();
	 
	 for (var i = 0; i < this.length; i++) {
		retArray.push( func(this[i]) );
	}
	 return retArray;
 };
 
 Array.prototype.orderByAsc = function (func) {
     var m = {};
     for (var i = 0; i < this.length; i++) {
         for (var k = 0; k < this.length; k++) {
             if (func(this[i]) < func(this[k])) {
                 m = this[k];
                 this[k] = this[i];
                 this[i] = m;
             }
         }
     }
     return this;
 };
 
 Array.prototype.orderByDesc = function (func) {
     var m = {};
     for (var i = 0; i < this.length; i++) {
         for (var k = 0; k < this.length; k++) {
             if (func(this[i]) > func(this[k])) {
                 m = this[k];
                 this[k] = this[i];
                 this[i] = m;
             }
         }
     }
     return this;
 };
 
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
	    if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
	if (index > -1) {
	    this.splice(index, 1);
	}
};
 /****************************** Array扩展 END ******************************/

 /****************************** Date扩展 BEGIN ****************************/
 /**
  * 判断闰年 
  */
Date.prototype.isLeapYear = function(year) {   
	var year = year || this.getFullYear();
	return (year % 4) == 0 && (((Year % 100) != 0) || ((Year % 400) == 0))
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

/**
 * 求两个时间的天数差 日期格式为 YYYY-MM-dd  
 */
function daysBetween(DateOne,DateTwo) {   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  

/**
 * 日期计算  
 * @param strInterval
 * @param Number
 * @returns {Date}
 */ 
Date.prototype.dateAdd = function(strInterval, Number) {   
    var dtTmp = this;  

    var millis_per_second = 1000;
    var millis_per_minute = millis_per_second * 60;
    var millis_per_hour = millis_per_minute * 60;
    var millis_per_day = millis_per_hour * 24;
    var millis_per_week = millis_per_day * 7;
    var date_time = Date.parse(dtTmp);
    var year = dtTmp.getFullYear();
    var month = dtTmp.getMonth();
    var day = dtTmp.getDate();
    var hour = dtTmp.getHours();
    var minute = dtTmp.getMinutes();
    var second = dtTmp.getSeconds();
    switch (strInterval) {   
    	case 's' :return new Date(date_time + (millis_per_second * Number));  
        case 'n' :return new Date(date_time + (millis_per_minute * Number));  
        case 'h' :return new Date(date_time + (millis_per_hour * Number));  
        case 'd' :return new Date(date_time + (millis_per_day * Number));  
        case 'w' :return new Date(date_time + (millis_per_week * Number));  
        case 'q' :return new Date(year, (month + Number*3), day, hour, minute, second);  
        case 'm' :return new Date(year, (month + Number), day, hour, minute, second);  
        case 'y' :return new Date((year + Number), month, day, hour, minute, second);  
    }  
}  

/**
 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 */
Date.prototype.dateDiff = function(strInterval, dtEnd) {   
	var dtStart = this;  
	var millis_per_second = 1000;
    var millis_per_minute = millis_per_second * 60;
    var millis_per_hour = millis_per_minute * 60;
    var millis_per_day = millis_per_hour * 24;
    var millis_per_week = millis_per_day * 7;

    //如果是字符串转换为日期型  
    if (typeof dtEnd == 'string' ) dtEnd = StringToDate(dtEnd);  

    switch (strInterval) {   
      case 's' :return parseInt((dtEnd - dtStart) / millis_per_second);  
      case 'n' :return parseInt((dtEnd - dtStart) / millis_per_minute);  
      case 'h' :return parseInt((dtEnd - dtStart) / millis_per_hour);  
      case 'd' :return parseInt((dtEnd - dtStart) / millis_per_day);  
      case 'w' :return parseInt((dtEnd - dtStart) / millis_per_week);  
      case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
      case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  


/**
 * 日期输出字符串，重载了系统的toString方法  
 */
Date.prototype.toString = function(showWeek) {
    var myDate = this;
	//var str = myDate.toLocaleDateString(); 
    var str = myDate.getFullYear();
    str += '/' + myDate.getMonth()+1;
    str += '/' + myDate.getDate();
    if (showWeek)
    {
        var Week = ['日','一','二','三','四','五','六'];
        str += ' 星期' + Week[myDate.getDay()];
    }
    return str;
}

/**
 * 日期合法性验证  
 * 格式为：YYYY-MM-DD或YYYY/MM/DD  
 */
function isValidDate(DateStr) {   
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;   
    if(sDate == '') return true;   
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
    if (s == '') {
    //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
        var t = new Date(sDate.replace(/\-/g,'/'));   
        var ar = sDate.split(/[-/:]/);   
        if(ar[0] != t.getYear() 
        		|| ar[1] != t.getMonth()+1 
        		|| ar[2] != t.getDate()) {   
            return false;   
        }   
    } else {   
        return false;   
    }   
    return true;   
}   

/**
 * 日期时间检查  
 * 格式为：YYYY-MM-DD HH:MM:SS  
 */
function checkDateTime(str) {  
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r == null) return false;   
    r[2] = r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear() != r[1]) return false;   
    if(d.getMonth() != r[2]) return false;   
    if(d.getDate() != r[3]) return false;   
    if(d.getHours() != r[4]) return false;   
    if(d.getMinutes() != r[5]) return false;   
    if(d.getSeconds() != r[6]) return false;   
    return true;   
}   

/**
 * 把日期分割成数组
 */
Date.prototype.toArray = function() {   
	var myDate = this;  
    var myArray = [];  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth() + 1;  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
}  
 
/**
 * 取得日期数据信息  
 * 参数 interval 表示数据类型  
 * y 年 m月 d日 w星期 ww周 h时 n分 s秒  
 */
Date.prototype.datePart = function(interval) {   
    var myDate = this;  
    var partStr = '';  
    var Week = ['日','一','二','三','四','五','六'];  
    switch (interval) {   
        case 'y' : partStr = myDate.getFullYear();break;  
        case 'm' : partStr = myDate.getMonth()+1;break;  
        case 'd' : partStr = myDate.getDate();break;  
        case 'w' : partStr = Week[myDate.getDay()];break;  
        case 'ww': partStr = myDate.WeekNumOfYear();break;  
        case 'h' : partStr = myDate.getHours();break;  
        case 'n' : partStr = myDate.getMinutes();break;  
        case 's' : partStr = myDate.getSeconds();break;  
    }  
    return partStr;  
}  

/**
 * 取得当前日期所在月的最大天数  
 */
Date.prototype.maxDayOfDate = function() {   
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1]+1,1));  
    var date2 = date1.dateAdd('m',1); 
    var result = date1.dateDiff('d', date2)  + 1;
    return result;  
}  

 
/**
 * 取得当前日期所在周是一年中的第几周  
 */
Date.prototype.weekNumOfYear = function() {   
    var myDate = this;  
    var ary = myDate.toArray();  
    var year = ary[0];  
    var month = ary[1]+1;  
    var day = ary[2];  
    return result;  
}  
 
/**
 * 字符串转成日期类型   
 * 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
 */
function StringToDate(DateStr) {   
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate)) {   
        var separator = DateStr.indexOf('/') != -1 ? '/' : '-';  
        var arys= DateStr.split(separator); 
        var year = arys[0];
        var month = parseInt(arys[1]) - 1;
        var day = parseInt(arys[2])
        myDate = new Date(year, month, day);  
    }  
    return myDate;  
}  

/****************************** Date扩展 END ****************************/

//编辑计划
function jx_plan_edit(thisA,from) {
	var $ID = $(thisA).parent().parent().attr('tid');
	jx_sub_nav('plan/splandetail.do?ID=' + $ID+'&FROM='+from);
}

//tab标签切换，更换箭头样式
function jx_tab_click_changestyle(thisA){
	var $lastA = $(thisA).find(".jx_arrow");
	if($lastA){
		var cls = $lastA.attr("class");
		if(cls){
			if(cls.indexOf("xz_jiantouB") != -1){
				$lastA.attr("class","xz_jiantouT jx_arrow");
			}else{
				$lastA.attr("class","xz_jiantouB jx_arrow");
			}
		}
	}
}
/**
 * 
 * 时间：2015-06-08
 * 创建人：zgs
 * 描述：用于调整左边区域块高度随右边区域一起变化
 * @param leftDivId 左边区域ID
 * @param rightDivId 右边区域ID
 */
function jx_common_page_heightAuto(leftDivId,rightDivId){
	var w,e,s,el,
		n = 85,
		w = Math.max(Math.max(document.documentElement.offsetHeight,document.documentElement.clientHeight),document.documentElement.scrollHeight);
	    s = setInterval(function(){
			e = document.getElementById(rightDivId);
			el = document.getElementById(leftDivId);
			if(el != null){
				el.style.height = w - n +'px';
				clearInterval(s);
			}
		},20);
		//随页面滚动在改变高度
		window.onscroll = function(){
			if(el != null){
				var off = Math.min(e.offsetHeight,e.clientHeight);
				if(off >= parseInt(e.scrollHeight)){
				   el.style.height = off +'px';
				}else{
				  el.style.height = parseInt(e.scrollHeight) +'px';
				};
			}
		}
		window.onresize = function(){					
			if(el != null){
				var off = Math.min(document.documentElement.offsetHeight,document.documentElement.clientHeight);
				if(off >= parseInt(e.scrollHeight)){
				   el.style.height = off +'px';
				}else{
				  el.style.height = parseInt(e.scrollHeight) +'px';
				};
			}
		}
}

/**
 * 时间：2015-06-18
 * 创建人：zgs
 * 描述：任务日程查看不同级别的任务用不同颜色给予区分
 */
function jx_index_taskCalendarColor(important){
	//任务中重要程度
	var $importantv = parseInt(important);
	//任务颜色
	var $taskColor = '#009A47';
	switch($importantv){
	     case 1:
		     $taskColor = '#EB6876';
		     break;
	     case 2:
		     $taskColor = '#1AD0DD';
		     break;
	     case 3:
		     $taskColor = '#F4BA00';
		     break;
	     case 4:
		     $taskColor = '#009A47';
		     break;
	}
	return $taskColor;
}

/**
 * 时间：2015-06-26
 * 创建人：zgs
 * 描述：获取任务评价得分
 */
function jx_task_weeknote_getscore(score){
	var result="未知"
	switch(score){
		case "1":
			result="A+";
		break;
		case "2":
			result="A";
		break;
		case "3":
			result="B";
		break;
		case "4":
			result="C";
		break;
		case "5":
			result="D";
		break;
	}
	return result;
}

/**
 * 时间：2015-08-12
 * 创建人：zgs
 * 描述：公用导出数据方法
 * @param exportURL 导出action
 * @param param 参数
 */
function jx_common_export(exportURL,param){
	//组装查询参数
	var dataParam = [];
	for (p in param){  
		dataParam.push('&'+p+'='+param[p]);
	}
	var data = dataParam.join('');
	try{
		jx_show_mask();
		var $iframe = $('<iframe src="'+exportURL+data+'" style="display:none"/>');
		$('body').append($iframe);
	}catch(ex){
		jx_remove_mask();
	}
	setTimeout(jx_remove_mask, 1000);
}

/**
 * 时间：2016-01-19
 * 创建人：zgs
 * 描述：公用导出excel导入模板
 * @param type模板类型
 */
function jx_common_excelTemplate_export(){
	var param = {};
    param.EXCELMODULE = $('#IMPORTTYPE').val();
    var url = "common/downloadexportplan.do?MARK=excelinfo";
    jx_common_export(url, param);
}

//检查任务汇报是否设置了相应处理人员
function jx_task_check_is_setuser(TASKUSER,MODULARFLAG){
	var checkstate = false;
	var param = {
	    TASKUSER: TASKUSER,
	    MODULARFLAG: MODULARFLAG
	};	
	var url = 'task/squeryTaskOperationuserByUserIDAndModel.do';
	jx_ajax_json(url, param, function(d,s){
		if(d.touserid != -1){
			checkstate = true;
		}else{
			jx_message_show('操作提示','未设置相应的处理人员，请联系管理员配置！');
		}
	},0);
	
	return checkstate;
}

/**
*时间：2015-09-08
*创建人：zgs
*描述：拼装年
*/
function jx_timer_timerconfig_gettimeryear(timerYear){
	var timerYearStr = '';
	if(timerYear){
		if(parseInt(timerYear) === 0){
			timerYearStr = '每年';
		}else{
			timerYearStr = timerYear+'年';
		}
	}	
	return timerYearStr;
}
/**
*时间：2015-09-08
*创建人：zgs
*描述：拼装月
*/
function jx_timer_timerconfig_gettimermonth(timerMonth){
	var timerMonthStr = '';
	if(timerMonth){
		if(parseInt(timerMonth) === 0){
			timerMonthStr = '每月';
		}else{
			timerMonthStr = timerMonth+'月';
		}
	}
	return timerMonthStr;
}
/**
*时间：2015-09-08
*创建人：zgs
*描述：拼装日
*/
function jx_timer_timerconfig_gettimerday(timerDay){
	var timerDayStr = '';
	if(timerDay){
		if(parseInt(timerDay) === 0){
			timerDayStr = '每日';
		}else{
			timerDayStr = timerDay+'日';
		}
	}
	return timerDayStr;
}
/**
*时间：2015-09-08
*创建人：zgs
*描述：拼装时
*/
function jx_timer_timerconfig_gettimertime(timerTime){
	var timerTimeStr = '';
	if(timerTime){
		timerTimeStr = timerTime+ ':00';
	}
	if(timerTime==25){
		timerTimeStr="每时";
	}
	return timerTimeStr;
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外       
function forbidBackSpace(e) {            
    var ev = e || window.event; //获取event对象          
	var obj = ev.target || ev.srcElement; //获取事件源             
	var t = obj.type || obj.getAttribute('type'); 
	//获取事件源类型            
	//获取作为判断条件的事件类型          
	var vReadOnly = obj.readOnly;            
	var vDisabled = obj.disabled;            
	//处理undefined值情况            
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;          
	vDisabled = (vDisabled == undefined) ? true : vDisabled;            
	//当敲Backspace键时，事件源类型为密码或单行、多行文本的，             
	//并且readOnly属性为true或disabled属性为true的，则退格键失效            
	var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);            
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效           
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";           
	//判断           
	if (flag2 || flag1) return false;      
}              
//禁止后退键  作用于IE、Chrome       
document.onkeydown = forbidBackSpace;
document.onkeypress = forbidBackSpace;

//点击浏览器后退按钮时返回到原来的页面
//window.history.forward(1);

/*----------------------首页js start------------------------*/

/**
 * 移除选择域的值
 */
function jx_index_moveoption(e1, e2){  
    for(var i=0,len=e1.options.length;i<e1.options.length;i++){  
        if(e1.options[i].selected){  
            var e = e1.options[i];  
            if(e.value !== '-1' && e.value !== '-2'){
            	var _option = $('<option value="'+e.value+'" data-count="10">'+e.text+'</option>');
            	$(e2).append(_option); 
                e1.remove(i);  
                i = i-1;  
            }
        }  
    } 
}  

/**
 * 向上移动
 */ 
function jx_index_moveup(selectObj){ 
    var theObjOptions = selectObj.options; 
    for(var i=1;i<theObjOptions.length;i++) { 
        if( theObjOptions[i].selected && !theObjOptions[i-1].selected ) { 
        	 var e1 = theObjOptions[i];
        	 var e2 = theObjOptions[i-1];
        	 var v1 = parseInt(e1.value);
        	 var v2 = parseInt(e2.value);
        	 if(v1 !== -1 && v1 !== -2 && v2 !== -1){
                 jx_index_swapoption(theObjOptions[i],theObjOptions[i-1]); 
        	 }
        } 
    } 
} 
/**
 * 向下移动
 */ 
function jx_index_movedown(selectObj){ 
    var theObjOptions=selectObj.options; 
    for(var i=theObjOptions.length-2;i>-1;i--) { 
        if( theObjOptions[i].selected && !theObjOptions[i+1].selected ) { 
        	 var e1 = theObjOptions[i];
        	 var e2 = theObjOptions[i+1];
        	 var v1 = parseInt(e1.value);
        	 if(v1 !== -1 && v1 !== -2){
                 jx_index_swapoption(theObjOptions[i],theObjOptions[i+1]); 
        	 }
        } 
    } 
} 
/**
 *  交换两列 
 */ 
function jx_index_swapoption(option1,option2){ 
    //option1.swapNode(option2); 
    var tempStr=option1.value;	
    option1.value=option2.value;	
    option2.value=tempStr; 

	var tempValSource=option1.valSource;// 
	option1.valSource=option2.valSource;// 
	option2.valSource=tempValSource;// 
    tempStr=option1.text; 
    option1.text=option2.text; 
    option2.text=tempStr; 
    tempStr=option1.selected; 
    option1.selected=option2.selected; 
    option2.selected=tempStr; 
    var _count1=$(option1).attr('data-count');
    var _count2=$(option2).attr('data-count');
    $(option1).attr('data-count',_count2);
    $(option2).attr('data-count',_count1);
} 
/*----------------------首页js end------------------------*/

/**
*选择奖励库数据
*/
function jx_reward_selectbase(rewadType,modelflag,callbackfun,rewardMark,deptid){
	var param={};
	param.REWARDTYPE = rewadType;
	param.STATE = 1;
	param.MODELFLAG = modelflag;
    param.SP_DEPT = deptid;
	
	var windowsName = '选择事件库';
	if(27 === modelflag){
		windowsName = '选择考核细则';
	}
	if(rewardMark){
		param.REWARD_TYPE = rewardMark;
	}
	jx_common_window(windowsName, 870, 585, 60, 'reward/sshowRewardSelectBase.do',param,callbackfun);
}

/***待办短信****/
//选择短信接收人员
function jx_common_message_selectuser(){
	jx_org_person_dlg(1,2,function(val){
		$(val).each(function(i, dd) {
			var _length = $("#MESSAGE_USERS input[type='checkbox'][value='"+dd.val+"']").length;
			if(!_length){
				var html = "<div class='reward-dept'>";
				html += "<input type='checkbox' name='USERID' value='"
						+ dd.val
						+ "' onclick='jx_common_message_removeuser(this)' checked='checked' />"
						+ dd.name;
				html += "</div>";
				$("#MESSAGE_USERS").append(html);
			}
		});
	},{});
}
//移除短信接收人员
function jx_common_message_removeuser(thisA){
	$(thisA).parent().remove();
}

/*点击事件项目列查看事件信息*/
function jx_reward_baselistjsp_showbaseinfo(id){
	var param = {
	    ID: id,
	    REWARD_TYPE: $('#REWARD_TYPE').val()
	};
	jx_common_window('查看事件库信息', 700, 540, 50, 'reward/sshowRewardBaseDetail.do', param, null);
}

//查看事件库信息
function jx_reward_team_showbaseinfo(id,type){
	var param={
		ID : id,
		REWARD_TYPE : type
	};
	jx_common_window('查看事件信息', 700, 540, 50, 'reward/sshowRewardBaseDetail.do', param, null);
}

/**
* 数据分析无数据时，公用提示
* @param title数据分析标题
*/
function jx_analyze_nodata_tips(title){
    var $div  = $('<div></div>');
    $div.css({
        'width': '100%',
        'height': '244px',
        'background': '#FBFBFB'
    });

    var $tab = $('<table></table>');
    $tab.appendTo($div);
    $tab.css({
        'width': '100%',
        'height': '70%',
        'text-align': 'center'
    });

    for(var i = 0; i < 2; i++){
        var $tr = $('<tr></tr>');
        $tr.appendTo($tab);
        var $td = $('<td></td>');
        $td.appendTo($tr);
        if(i === 0){
            $td.css({
            	'font-size': '15px',
            	'font-weight': 'normal'
            });
            $td.html(title);
        }else{
        	$td.css({'font-weight': 'normal' });
            $td.html('暂无数据');
        }
    }

    return  $div;
}

/**
* 数据列表无数据提示
*/
function jx_common_table_nodata(opts){
    if(!opts) return;

    var tab = opts.table;//数据列表
    var tdLen = opts.colspan;//合并多少个单元格
    var text = opts.text || '暂无数据';//无数据提示信息

    var $tr = $('<tr class="line list_bai"></tr>');
    $tr.appendTo(tab);

    var $td = $('<td class="alignC" colspan='+tdLen+'>'+text+'</td>');
    $td.appendTo($tr);
}


/**************************************去空 start**************************************/
String.prototype.trim = function(){ 
	return Trim(this);
};
function LTrim(str){
    var i;
    for(i=0,len=str.lenth;i<len;i++){
	    if(str.charAt(i)!=" " && str.charAt(i)!=" ")break;
    }
    str=str.substring(i,str.length);
    return str;
}
function RTrim(str){
    var i;
    for(i=str.length-1;i>=0;i--){
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(0,i+1);
    return str;
}
function Trim(str){
    return LTrim(RTrim(str));
}
/**
* 中文日期转换为英文日期
*/
String.prototype.toDateEx = function() {
    var data = { y: 0, M: 0, d: 0, h: 0, m: 0, s: 0, ms: 0 };
    var cn = { "年": "y", "月": "M", "日": "d", "时": "h", "分": "m", "秒": "s", "毫秒": "ms" };

    var result = this.match(/\d+((ms)|[yMdhms年月日时分秒]|(毫秒))/ig);
    for (var i = 0; i < result.length; i++) {
        RegExp(/(\d+)([yMdhms年月日时分秒]|(毫秒))/).test(result[i]);
        if (data[RegExp.$2] == undefined) {
           data[cn[RegExp.$2]] = RegExp.$1;
        } else {
           data[RegExp.$2] = RegExp.$1;
        }
    }
    return new Date(data.y, data.M - 1, data.d, data.h, data.m, data.s, data.ms);
}
/**************************************去空 end**************************************/

/*积分库*/
//积分库新增
function jx_integral_integralbase_add(type){
	var param = {
		FROM_TYPE : type
	}
    if($("#DEPT_ID").length){
		param.DEPT_ID = $("#DEPT_ID").val();
		param.DEPT_NAME = $("#DEPT_NAME").val();
	}
    if($("#POST_ID").length){
    	param.POST_ID = $("#POST_ID").val();
		param.POST_NAME = $("#POST_NAME").val();
	}
	jx_common_window('新增积分库', 760, 540, 100, 'integral/sshowintegralbaseadd.do', param, null);
}
//积分库编辑
function jx_integral_integralbase_update(id,is_public){
	jx_common_window('编辑积分库', 760, 540, 100, 'integral/sshowintegralbaseedit.do', {BASE_ID:id,IS_PUBLIC:is_public}, null);
}
//删除积分库
function jx_interal_integralbase_del(id){
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			jx_ajax("integral/sintegralbasedel.do", {
				BASE_ID : id
			}, function(data,status){
				jx_message_show('提示','操作成功！');
				jx_integral_integralbase_listinit();
			});
		}
	});
}
//积分库详情
function jx_integral_integralbase_detail(id){
	jx_common_window('积分库详情', 760, 540, 100, 'integral/sshowintegralbasedetail.do', {BASE_ID:id}, null);
}
//自动获取积分库基准分(基础工时*数量)
var jx_integral_getBaseScore = function(thisA){
	var _baseTime = $('input[name="BASETIME"]').val();
	var _taskNum = $(thisA).val();
	if(_baseTime && _taskNum){
		var _baseScore = (parseFloat(_baseTime)*parseFloat(_taskNum)).toFixed(2);
		$('#BASESCORE').numberbox('setValue',_baseScore);
	}
}
//部门选择回调
function jx_integral_integralbase_selectdeptcallback(r){
	$('#TASKDEPTNAME').val(r[0].name);
	$('#TASKDEPTID').val(r[0].val);
	
	//岗位数据清空
	$('#TASKPOSTNAME').val('');
	$('#TASKPOSTID').val('');
}
//岗位选择
function jx_integral_integralbase_selectpost(){
	jx_org_person_dlg(8,1,jx_integral_integralbase_selectpostcallback,{}
	,{POSTTARGETDEPTID:$('#TASKDEPTID').val()})
}
//岗位选择回调
function jx_integral_integralbase_selectpostcallback(r){
	$('#TASKPOSTNAME').val(r[0].name);
	$('#TASKPOSTID').val(r[0].val);
}
/**
* 积分库保存
* @param thisA当前按钮对象
* @param type操作类型 1：保存继续 0：保存关闭
* @param form表单
* @param url数据保存链接
*/
function jx_integral_integralBase_saveIntegral(thisA, type, form, url){
	var _fromType = $('#FROM_TYPE').val();
	if ($("#"+form).form("validate")) {
		jx_ajax_json(url, $("#"+form).serialize(), function(data,status){
			jx_message_show('提示','操作成功！');
			
			if('base' === _fromType){
				jx_integral_integralbase_listinit();
			} else if("report" === _fromType){
				//积分上报时候 负责人是当前人 默认权重 为1
				var obj = {
					BASE_ID: data.data,
					TASK_NUM: 1,
					INTEGRAL_TITLE: $("#TITILE").val(),
					BASE_SCORE: $("#BASESCORE").val(),
					USER_DEFAULT:'default',
				};
				var _integralAry = [];
				_integralAry.push(obj);
				var _infoJson = JSON.stringify(_integralAry);
				jx_ajax("integral/sintegralreportedit.do", {
					INTEGRAL_INFO: _infoJson,
					INTEGRAL_FLAG: 1,
					SUBMIT_DATE: $('.js-integralIssued-submitDate').val(),
					TYPE : 'batch'
				}, function(data,status){
					jx_integral_integralReport_init();
				});
			}else {
				//下发的时候新增的
				var obj = {
					BASE_ID: data.data,
				    TASK_NUM: 1,
				    INTEGRAL_TITLE: $("#TITILE").val(),
					BASE_SCORE: $("#BASESCORE").val()
				};
				var _integralAry = [];
				_integralAry.push(obj);
				var _infoJson = JSON.stringify(_integralAry);
				jx_ajax("integral/sintegralreportedit.do", {
					INTEGRAL_INFO: _infoJson,
					INTEGRAL_FLAG: 0,
					SUBMIT_DATE: $('.js-integralIssued-submitDate').val(),
					TYPE : 'batch'
				}, function(data,status){
					jx_integral_integralManage_listjsp_loaddata();
				});
			}

			if(type === 0){
				jx_common_closewindow(thisA);
			}else{
				//积分库新增保存继续操作
				if(form === 'jx_integralbaseadd_form'){
					$('.easyui-validatebox[name=TASK_TITLE]').val('');
					$('#BASESCORE').numberbox('setValue', '');
					$('#TASKTYPE').combobox('setValue', '');
					$('#FINISHSTANDARD').val('');
				}
			}
		});
	} else {
		jx_message_show('提示','请注意必填项');
	}
}
/**
 * 复选框选择公用选择方法
 */
function jx_common_selectall_ckb() {
	var head_ckb = $('.js-tab-list tr:first :checkbox');
	if(!head_ckb.length) return;
	head_ckb.prop('checked',false);
	
	var ckb_child_ary = $('.js-tab-list tr:gt(0) :checkbox').not(':checkbox[disabled]');
	head_ckb.click(function(){
		var ckb_flag = head_ckb.prop('checked');
		ckb_child_ary.each(function(i,data){
			$(data).prop('checked',ckb_flag);
		});
	});
	
	var ckb_child_size = ckb_child_ary.length;
	ckb_child_ary.click(function(){
		var checked_size = $('.js-tab-list tr:gt(0)')
                               .find(':checkbox:checked').length;
		ckb_child_size === checked_size ? head_ckb.prop('checked',true) : head_ckb.prop('checked',false);
	});
}

//评价完返回
function jx_integral_integralManage_issuedBack(from){
	var url = '';
	switch(from){
		case 'todo':
		    url = 'index/sshowIndex.do';
		break;
		case 'issued':
		    url = 'integral/sshowintegralissued.do';
		break;
		case 'report':
		    url = 'integral/sshowintegralreport.do';
		break;
		case 'query':
		    url = 'integral/sshowintegralanalysisindex.do';
		break;
		case 'myIntegral':
		    url = 'integral/sshowmyintegral.do';
		break;
		case 'taskDetail':
		    url = 'analyze/sshowintegraltaskdetail.do?FROM=staffIntegral';
		break;
		case 'dayDetail':
		    url = 'analyze/sshowintegraldaydetail.do?FROM=staffIntegral';
		break;
		case 'score':
		default:
		    url = 'integral/sshowIntegralScore.do?FROM='+from;
		break;
	}
	jx_sub_nav(url);
}

//获取积分下发状态
function jx_integral_integralManage_getState(state){
	var _stateStr = '';
	switch(parseInt(state)){
	case 0:
		_stateStr = '待下发';
		break;
	case 1:
		_stateStr = '待评价';
		break;
	case 2:
		_stateStr = '已评价';
		break;
	}
	return _stateStr;
}

/**
* 积分信息编辑
*/
function jx_integral_integralManage_issuedEdit(id){
	jx_sub_nav('integral/sshowintegralissuededit.do?INTEGRAL_ID='+id);
}

/**
* 积分信息删除
*/
function jx_integral_integralManage_issuedDel(id){
	jx_common_confirm('提示','您确认删除吗？',function(r){
		if(r){
			jx_ajax("integral/sintegralissueddel.do", {
				INTEGRAL_ID : id
			}, function(data,status){
				jx_message_show('提示','操作成功！');
				jx_integral_integralManage_listjsp_loaddata();
			});
		}
	});
}

/**
* 积分信息下发
*/
function jx_integral_integralManage_issued(id,thisA){
	jx_common_confirm('提示','您确认下发吗？',function(r){
		if(r){
			var $temp = $(thisA).parent().parent().find("input:checkbox:eq(0)");
			var tr_ary = $('#jx_integralIssued_tab').find('tr[data_id='+id+']');
			var user_ary = [];
			$(tr_ary).each(function(idx, tr){
				var td_ary = $(tr).find('td');
				$(td_ary).each(function(j, td){
					var $td = $(td);
					if ($td.attr('user_id')) {
                        user_ary.push($td.attr('user_id'));
					}
				});
			});
			jx_ajax("integral/sintegralissued.do", {
				INTEGRAL_ID: id,
				TYPE: 'issued',
				INTEGRAL_TITLE: $temp.attr("data_title"),
				USER_NAME: $temp.attr("data_username"),
				USER_IDS: user_ary.join(',')
			}, function(data,status){
				jx_message_show('提示','操作成功！');
				jx_integral_integralManage_listjsp_loaddata();
			});
		}
	});
}
//积分评价页面
function jx_integral_integralManage_appraise(thisA){
	var $this = $(thisA);
	var param = {
		INTEGRAL_ID: $this.attr('data-id'),
		FROM: $this.attr('data-from'),
		BACKURL: 'integral/sshowIntegralScore.do'
	}
	jx_sub_nav('integral/sshowintegralissuedapprsise.do',param);
}

/**
* 积分批量下发
*/
function jx_integral_integralManage_batchIssued(){
   jx_common_confirm("提示", "您确认下发？",function(r){
		if(r){
            var integralAry = [],
	            integralSetAry = [];
			var baseList = $("#jx_integralIssued_tab tr:gt(0) input[type=checkbox]:checked");
			if (!baseList.length) {
				jx_message_show('提示','请至少选择一项！');
				return;
			}
			$(baseList).each(function(i,data){
				var $this = $(data);
				var tid = $this.val();
				var state = $this.attr('data_state');
				var isset = $this.attr('data_isset');
				var integralTitle = $this.attr('data_title');
				var userName = $this.attr('data_username');

                var tr_ary = $('#jx_integralIssued_tab').find('tr[data_id='+tid+']');
				var user_ary = [];
				$(tr_ary).each(function(idx, tr){
					var td_ary = $(tr).find('td');
					$(td_ary).each(function(j, td){
						var $td = $(td);
						if ($td.attr('user_id')) {
	                        user_ary.push($td.attr('user_id'));
						}
					});
				});

				if(state == 0 && isset != 0){
					var obj = {
						INTEGRAL_ID: tid,
						INTEGRAL_TITLE: integralTitle,
						USER_NAME: userName,
						USER_IDS: user_ary.join(','),
                        INTEGRAL_FLAG: 0
					};
					integralAry.push(obj);
				}
				
				if(isset == 0){
					var obj = {
						INTEGRAL_ID: tid
					};
					integralSetAry.push(obj);
				}
			});
			
			if(integralSetAry.length){
				jx_message_show('提示', '您有积分没有设置负责人！');
				return;
			}
			
			if(integralAry.length != baseList.length){
				jx_message_show('提示', '积分中有不需要下发的积分！');
				return;
			}
			
			var infoJson = JSON.stringify(integralAry);
			jx_ajax("integral/sintegralissued.do", {
				ISSUED_INFO: infoJson,
				TYPE: 'batch'
			}, function(data,status){
				jx_message_show('提示','操作成功！');
				jx_integral_integralManage_listjsp_loaddata();
			});	
		}
	});
}

/**
* 批量评价
*/
function jx_integral_integralManage_batchAppraise(){
	var integralAry = [];
	var baseList = $("#jx_integralIssued_tab tr:gt(0) input[type=checkbox]:checked");
	if (!baseList.length) {
		jx_message_show('提示','请至少选择一项！')
		return;
	}

	$(baseList).each(function(i,data){
		var $this = $(data);
		var tid = $this.val();
		var state = $this.attr('data_state');
		if(state == 1){
			var obj = {
				INTEGRAL_ID: tid
			};
			integralAry.push(obj);
		}
	});
	
	if(!integralAry.length){
		jx_message_show('提示','没有需要评价的积分！')
		return;
	}
	var infoJson = JSON.stringify(integralAry);
	jx_ajax("integral/sintegralappraisescore.do", {
		APPRAISE_INFO: infoJson,
		TYPE: 'batch'
	}, function(data,status){
		jx_message_show('提示','操作成功！');
		jx_integral_integralManage_listjsp_loaddata();
	});
}

/**
* 组装积分操作
*/
function jx_integral_integralManage_getAction(state,id,isset){
	var issuedAction = '<a href="javascript:" onclick="jx_integral_integralManage_issued('+id+',this)">下发</a>';
	//var _appraiseAction = '&nbsp;<a href="javascript:" onclick="jx_integral_integralManage_appraise('+id+',\''+backUrl+'\')">评价</a>';
	var editAction = '<a href="javascript:" onclick="jx_integral_integralManage_issuedEdit('+id+')">编辑</a>';
	var delAction = '<a href="javascript:" onclick="jx_integral_integralManage_issuedDel('+id+')">删除</a>';
	var actionHtml = '';
	switch(parseInt(state)){
	    case 0:
		    actionHtml = isset !== '0' 
		    	? editAction + delAction + issuedAction
		    	: editAction + delAction;
		    break;
	    case 1:
	    	actionHtml = '--';
		    break;
		case 4:
            actionHtml = isset !== '0'
                ? editAction + delAction + issuedAction
                : editAction + delAction;
            break;
		default:
			actionHtml = '--';
	}
	return actionHtml;
}

//从积分库引入
function jx_integral_integralManage_import(){
	jx_common_window('选择任务', 760, 580, 100, 'integral/sshowintegralissuedbase.do', '',
			jx_integral_integralManage_import_callback);
}
function jx_toggle_content_headbar2(thisA) {
	$(thisA).parent().next().toggle();
}

function jx_tab_click_changestyle2(thisD){
	var $lastA=$(thisD);
	if($lastA.attr("class").indexOf("xz_jiantouB")!=-1){
		$lastA.attr("class","xz_jiantouT jx_arrow");
	}else{
		$lastA.attr("class","xz_jiantouB jx_arrow");
	}
}
//移除积分信息
function jx_integral_integralManage_issuedContent_del(thisA){
	$(thisA).parent().next().remove();
	$(thisA).parent().remove();
}

//积分库引入成功后回调
function jx_integral_integralManage_import_callback(rec){
	var _tmpHtml = '';
	var _newObj = jx_integral_integralManage_judgeIntegral(rec);
	$(_newObj).each(function(i,data){
		var _id = data.ID;
		var _title = data.TITLE;
		var _totalScore = '(总工时：'+data.TOTALSCORE+')';
		_tmpHtml += '<div class="xz_title barhand" id="'+_id+'" > '
	             + _title+_totalScore+'<a class="xz_jiantouB jx_arrow" href="javascript:" '
	             + 'onclick="jx_toggle_content_headbar2(this);jx_tab_click_changestyle2(this)"></a>'
	             + '<a class="jx-comm-btn jx-btn-del integral-del" href="javascript:" '
	             + ' onclick="jx_integral_integralManage_issuedContent_del(this)">移除</a> '
	             + '</div> '
	             + '<div class="integral-content"><input type="hidden" name="taskscore" value="'+data.TOTALSCORE+'"/>'
	             + '<div class="survey-option" > '
	             + '<p>负责人</p> '
	             + '<ul class="personnel"> '
	             + '<li>人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员：<input type="text" class="easyui-validatebox" data-options="required:true"'
	             + 'onclick="jx_integral_integralManage_selectUser('+_id+',1,this)" readonly/> '
	             + '<input type="hidden" name="userid"/> </li> '
	             + '<li>权&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：<input type="text" name="weight" class="easyui-numberbox" '
	             + ' data-options="required:true,missingMessage:\'只能输入数字,值为0至1之间\',precision:2,min:0,max:1"/> </li> '
	             + '</ul> '
	             + '</div> '
	             + '<div class="survey-option" > '
	             + '<div class="integral-assist-user"> '
	             + '<label class="col-sm-2-3 integral-assistuser">辅助人员</label> '
	             + '<label class="control-label"> '
	             + '<a href="javascript:;" class="jx-comm-btn jx-btn-add integral-assistbtn" '
	             +' onclick="jx_integral_integralManage_selectUser('+_id+',2,this)" >选择辅助人员</a> '
	             + '</label> '
	             + '</div> '
	             + '</div> '
	             + '</div>';
	})
	$('#integralManageMain').append(_tmpHtml);
	$.parser.parse($('#integralManageMain'));
}

/**
* 选择辅助人员
*/
function jx_integral_integralManage_selectUser(id,type,thisA){
	if(type === 2) {
		var $assistUser = $('#'+id).next().find('.integral-assist-user');
		var tmpHtml = '';
		jx_org_person_dlg(10,2,function(r){
			$(r).each(function(i, dd) {
				var $id = dd.val;
				var $name = dd.name;
				if(!jx_integral_integralManage_judgeUser(id, $id)){
				    tmpHtml += '<ul class="assistuser"> '
				            + '<li>人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员：<input type="text" value="'+$name+'" '
				            + ' class="easyui-validatebox" data-options="required:true" readonly/> '
		                    + '<input type="hidden" name="userid" value="'+$id+'"/> </li> '
		                    + '<li>权&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：<input type="text" name="weight" class="easyui-numberbox" '
		                    + ' data-options="required:true,missingMessage:\'只能输入数字,值为0至1之间\',precision:2,min:0,max:1"/></li> '
		                    + '<li><a href="javascript:void(0);" class="jx-comm-btn jx-btn-del" '
		                    + 'onclick="jx_integral_integralManage_delAssistuser(this)" >移除</a></li> '
	                        + '</ul>';
				}else{
					jx_message_show('提示', $name+'已存在此积分人员中');
				}
			});
			$assistUser.append(tmpHtml);
			$.parser.parse($assistUser);
		},{},{DEPTID:$('#DEPT_ID').val()})
	} else if(type === 1)  {
		jx_org_person_dlg(10,1,function(r){
			var $id = r[0].val;
			var $name = r[0].name;
			if(!jx_integral_integralManage_judgeUser(id, $id)){
				$(thisA).val($name);
				$(thisA).next().val($id);
			}else{
				jx_message_show('提示', $name+'已存在此积分人员中');
			}
		},{},{DEPTID:$('#DEPT_ID').val()})
	}
}

//移除当前行的辅助人员
function jx_integral_integralManage_delAssistuser(thisA){
	$(thisA).parent().parent().remove();
}

/**
* 过滤重复分积分库
*/
function jx_integral_integralManage_judgeIntegral(ary){
	var existIdAry = [];
	$('.barhand').each(function(i,data){
		existIdAry.push($(data)[0].id)
	});
	
	$(ary).each(function(i,data){
		var $id = data.ID;
		if(jx_common_inArray(existIdAry, $id)){
			ary.splice(i, 1);
		}
	});

	return ary;
}

//过滤每一积分中的人员
function jx_integral_integralManage_judgeUser(id, uid){
	var userAry = [];
    var $temp = $('#'+id).next();

	//负责人
	var mainUser = $temp.find('.personnel').find('input[name="userid"]').val();
	userAry.push(mainUser);
	
	//辅助人员
	var assistUser = $temp.find('.assistuser').find('input[name="userid"]');
	$(assistUser).each(function(i, data){
		userAry.push($(data)[0].value);
	});

	if(jx_common_inArray(userAry, uid)){
		return true;
	}
	return false;
}

/**
 * 时间：2016-03-01
 * 创建人：zgs
 * 描述：判断元素是否在数组中
 */
function jx_common_inArray(ary,v){  
    for(var i in ary){  
        if(v == ary[i]){  
            return true;  
        }  
    }  
    return false;  
}

/**
* 判断每一积分下的人员权重之和不能超过1
*/
function jx_integral_integralManage_judgeWeight(){
	var flag = true;
	var totalWeight = 0;
	
	var $integralTitle = $('.js-msgTitle').html();
	
    var $temp = $('.integral-content');
	//负责人权重
	var mainWeight = $temp.find('.personnel').find('input[name="weight"]').val();
	totalWeight += parseFloat(mainWeight);

	//辅助人员权重
	var assistWeight = $temp.find('.assistuser').find('input[name="weight"]');
	for(var i = 0, len = assistWeight.length; i < len; i++){
		var uweight = $(assistWeight[i]).val();
		totalWeight += parseFloat(uweight);
	}

	if(totalWeight > 1){
		jx_message_show('提示','【'+$integralTitle+'】下的人员权重之和不能超过1，请您协调人员权重');
		flag = false;
	}
	
	return flag;
}

//积分下发新增保存
function jx_integral_integralManage_isueedSave(thisA,form,url){
	if($("#"+form).form("validate")){
		var _dataID = $('#INTEGRAL_ID').val();
		var _infoAry = [];
		if(jx_integral_integralManage_judgeWeight()){
			if(!$.trim($('#integralManageMain').html()).length){
				jx_message_show('提示','请从积分库中引入积分。');
				return;
			}
			$('.barhand').each(function(i,data){
				var _integralID = $(data)[0].id;
				//总基准分(总工时)
				var  _totalScore = $('#'+_integralID).next().find('input[name="taskscore"]').val();
				//负责人、负责人权重
				var _mainUser = $('#'+_integralID).next().find('.personnel').find('input[name="userid"]').val();
				var _mainWeight = $('#'+_integralID).next().find('.personnel').find('input[name="weight"]').val();
				//辅助人、辅助人员权重
				var _assistUser = $('#'+_integralID).next().find('.assistuser').find('input[name="userid"]');
				var _assistWeight = $('#'+_integralID).next().find('.assistuser').find('input[name="weight"]');
				var _assistAry = [];
				for(var i=0,len=_assistUser.length;i<len;i++){
					var _uid = $(_assistUser[i]).val();
					var _uweight = $(_assistWeight[i]).val();
					var _assistObj = {
						USERID : _uid,
						WEIGHT : _uweight
					}; 
					_assistAry.push(_assistObj);
				}
				var _integralObj = {
					BASEID : _integralID,
					USERID : _mainUser,
					WEIGHT : _mainWeight,
					ASSISTUSER : _assistAry,
					TOTALSCORE : _totalScore
				}
				if(_dataID){
					_integralObj.INTEGRALID = _dataID;
				}
				_infoAry.push(_integralObj);
			});
			var _infoJson = JSON.stringify(_infoAry);
			var param = {};
			param.ISSUEDINFO = _infoJson;
			param.INTEGRALFLAG = 0;
			jx_ajax(url,param,function(data, status) {
				jx_message_show("提示", "操作成功！");
				jx_integral_integralManage_issuedBack();
			});
		}
	}else{
		jx_message_show('提示','请注意必填项！');
	}
}

//判断积分数量只能是数值并最低为1，最高1000
function jx_integeral_judgeTaskNum(thisA){
	var _reg = /^(\d)*$/;
	var _thisv = $(thisA).val();
	if(_reg.test(_thisv)){
		if(!_thisv || parseInt(_thisv) < 1){
			_thisv = 1;
		}else if(parseInt(_thisv) > 1000){
			_thisv = 1000;
		}
	}else{
		_thisv = 1;
	}
	$(thisA).val(_thisv);
}
//返回积分上报主页面
function jx_integral_integralReport_back(){
	if($("#jx_integral_detail_backurl").val()){
		jx_sub_nav($("#jx_integral_detail_backurl").val());
	}else{
	    jx_sub_nav('integral/sshowintegralreport.do');
	}
}

//处理积分统计查询中维度维度切换时时间不对应修改
function jx_common_monthlyFormat(text){
	var _number = '';
	if(text.indexOf('月份') != -1){
		var _formatText = $.trim(text).replace('月份','');
		switch(_formatText){
		case '一':
			_number = '01';
			break;
		case '二':
			_number = '02';
			break;
		case '三':
			_number = '03';
			break;
		case '四':
			_number = '04';
			break;
		case '五':
			_number = '05';
			break;
		case '六':
			_number = '06';
			break;
		case '七':
			_number = '07';
			break;
		case '八':
			_number = '08';
			break;
		case '九':
			_number = '09';
			break;
		case '十':
			_number = '10';
			break;
		case '十一':
			_number = '11';
			break;
		case '十二':
			_number = '12';
			break;
		}
	}
	return _number;
}
/*2016-05-19  处理页面年度、月度下拉框数据被重置问题*/
function jx_integral_dateReset($year, $month){
    var yearText = $year.combobox('getText');
	var year = $.trim(yearText).replace('年','');
	$year.combobox('setValue', year);

	var monthText = $month.combobox('getText');
	var month = jx_common_monthlyFormat(monthText);
	$month.combobox('setValue', month);
}


/*2016-05-20 获取不同积分不同时间维度总得分*/
function jx_integral_diffIntegralScore(param){
	var taskScore = $('.js-integral-taskscore');
	var integralScore = $('.js-integral-score');
	var rewardScore = $('.js-integral-rewardscore');
	var fixedScore = $('.js-integral-fixedscore');

	if (taskScore) taskScore.html('0');	

	if (integralScore) integralScore.html('0');	
	
	if (rewardScore) rewardScore.html('0');	

	if (fixedScore) fixedScore.html('0');	
	
	jx_ajax_json('analyze/squerydiffintegralscore.do', param, function(data, status){
		var scoreInfo = data.SCOREINFO;
		if (scoreInfo) {
			if(taskScore) taskScore.html(scoreInfo.TASK_SCORE);	
			
			if(integralScore) integralScore.html(scoreInfo.ACCUMULA_SCORE);	
			
			if(rewardScore) rewardScore.html(scoreInfo.REWARD_SCORE);	

			if(fixedScore) fixedScore.html(scoreInfo.FIXED_SCORE);	
		}
	});
}
/***********************************************积分 end*****************************************************/

/**
 * 通用导入数据方法
 * improt_type:导入类型(excel导入模板编码)
 * other_param:附加参数（可无）
 */
function jx_common_import_data(improt_type,other_param,callback){
	var param = {
	    JX_IMPORT_TYPE: improt_type,
	    JX_IMPROT_OTHER_PARAM: JSON.stringify(other_param)
	};
	var reg = new RegExp('"',"g");
	param.JX_IMPROT_OTHER_PARAM = param.JX_IMPROT_OTHER_PARAM.replace(reg,'\'');
	jx_common_window('导入数据', 460, 250, 50, 'common/sshowImportData.do', param, callback);
}

/**
 * 退出系统
 */
function jx_sys_logout(){
	jx_common_confirm('提示','您确认退出本系统？',function(r){
		if(r){
			window.location.href = 'logout.jsp';
		}
	});
}
/**
 * 时间：2016-04-08
 * 创建人：zgs
 * 描述：封装新版弹出确认框
 * @param title 标题
 * @param content 内容
 * @param fun 执行操作
 */
function jx_common_confirm(title,content,fun){
	var dialog = jDialog.confirm({
		    content : content,
		    acceptButton : {
			    handler : function(button,dialog) {
				    dialog.close();
				    if(fun){
				        fun(true);
				    	return false;
				    }
			    }
		    },
		    cancelButton:{
				handler : function(button,dialog) {
					dialog.close();
					if(fun){
				        fun(false);
				    	return false;
				    }
				}
			},
		    title : title,
			buttonAlign : 'right'
		}
	);
}
/**
 * 时间：2016-04-08
 * 创建人：zgs
 * 描述：封装新版弹出提示框
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
 * 时间：2016-04-08
 * 创建人：zgs
 * 描述：封装新版弹出提示框
 * @param title 标题
 * @param content 内容
 * @param fun 执行操作
 */
function jx_common_alert(title,content,fun){
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
 * 设置请求链接参数
 */
function jx_common_setUrlParam(url, key, value){
	return url.indexOf('?') != -1 ? (url + '&'+key+'='+value) 
			                      : (url + '?'+key+'='+value);
}

// 计划监控多条件隐藏
function jx_mult_condition1(thisA) {
	$('.MB_search01').slideToggle();
	if ($(thisA).hasClass('xz_jiantouB')) {
		$(thisA).removeClass('xz_jiantouB');
		$(thisA).addClass('xz_jiantouT');
	} else {
		$(thisA).removeClass('xz_jiantouT');
		$(thisA).addClass('xz_jiantouB');
	}
}

//任务辅助人员选择
function jx_task_selectAssistUser(form_id, thisA) {

	var aissist_area = $(thisA).parent().parent();
	var $form = $('#' + form_id);
	var tmpHtml = '';

	jx_org_person_dlg(1,2,function(r){
		$(r).each(function(i, dd) {
			var u_id = dd.val;
			var u_name = dd.name;
			if(!jx_task_judgeUser($form, u_id)){
                tmpHtml += '<tr class="assistuser">'
	            	+'<td class="xz_font" align="right" valign="middle"></td>'
	            	+'<td class="xz_font" align="left" valign="middle">'
	            		+'<input type="text" data-options="required:flase" style="width:240px"' 
	            		+'readonly="readonly" value="'+u_name+'"/> '
						+'<input type="hidden" name="ASSIST_USER" value="'+u_id+'"/> '
						+'<input type="text" name="ASSIST_WEIGHT" class="easyui-numberbox" style="width:240px"'
                        +'data-options="required:true,missingMessage:\'只能输入数字,值为0至1之间\',precision:2,min:0,max:1" placeholder="请设置权重" /> '
                        +'<a href="javascript:void(0);" class="jx-comm-btn jx-btn-add"' 
			            +'onclick="jx_integral_integralManage_delAssistuser(this)">移除</a>'
	            	+'</td>'
	            +'</tr>';
			}else{
				jx_message_show('提示', u_name+'已存在此辅助人员中');
			}
		});

		aissist_area.after(tmpHtml);
		$.parser.parse($('.assistuser'));

	},{}, {DEPTID: $('#jx_common_deptid').val()})
}

//过滤人员
function jx_task_judgeUser(area, uid){
	var userAry = [];

	//辅助人员
	var assistUser = area.find('.assistuser').find('input[name="ASSIST_USER"]');
	$(assistUser).each(function(i, data){
		userAry.push($(data)[0].value);
	});

	if(jx_common_inArray(userAry, uid)){
		return true;
	}
	return false;
}