"use strict"
var date = new Date();
var year = date.getFullYear(); 
var month = date.getMonth() + 1;
var monthStr = (parseInt(month) < 10 ? '0' : '') + month;
var curDateStr = year +'-' + monthStr;

/**
* 设计思路
* 1）配置不同模块间的标题、数据列表表头、列表数据字段
* 2）加载模块标题数据
* 3）加载数据列表表头数据
* 4）加载数据列表数据
* 5）待办显示数据列、跳转more方法
* 6）待办不同模块跳转处理界面方法
* @param flag是否初始化加载
*/
var JXTodo = function(flag){
	this.deptId = '';
	this.objectName = '';
	this.leftZone = $('#jx_index_leftzone');
	this.rightZone = $('#jx_index_rightzone');

	if(flag){
		this.init();
	}
};

/**
* 构造函数
*/
JXTodo.prototype.constructor = JXTodo;

/**
* 初始加载首页用户配置模块
*/
JXTodo.prototype.init = function(){
	var self = this;
	self.leftZone.html("");
	self.rightZone.html("");
	var url = "index/squeryHomePageData.do";
    var param = {};
	jx_ajax_json(url, param,function(data,status){
		//console.log(data);
        var dd =[];
		for(var i =0;i<data.length;i++){
			//console.log(data[i].MODULENAME)
			//if(data[i].MODULENAME == "任务积分"){
            //    data[i].MODULENAME = '工作积分';
			//}
            //if(data[i].MODULENAME == "累加积分"){
            //   data[i].MODULENAME = '任务积分';
            //}
            //if(data[i].MODULENAME == "事件积分"){
            //    data[i].MODULENAME = '制度积分';
            //}
			//if(data[i].MODULENAME != "固定积分"){
                dd.push(data[i]);
			//}

		}
		// var HTM = [
		// 	{
         //        COMCREATEUSER: 4191,
         //        COMCRETAETIME: 1574855656000,
         //        COMORG: 761,
         //        COMUPDATETIME: 1575786986000,
         //        DATACOUNT: "10",
         //        ID: 5540,
         //        MODULE: "13",
         //        MODULENAME: "任务积分",
         //        MODULETAG: "1",
         //        OBJECTID: 2464,
         //        OBJECTNAME: "人力资源部",
         //        POSITION: "1",
         //        TYPE: "1",
         //        USERID: 4191
		// 	},
		// 	{
         //        COMCREATEUSER: 4191,
         //        COMCRETAETIME: 1574855656000,
         //        COMORG: 761,
         //        COMUPDATETIME: 1575786986000,
         //        DATACOUNT: "10",
         //        ID: 5544,
         //        MODULE: "17",
         //        MODULENAME: "事件积分",
         //        MODULETAG: "2",
         //        POSITION: "1",
         //        TYPE: "1",
         //        USERID: 4191,
		// 	},
		// 	{
         //        COMCREATEUSER: 4191,
         //        COMCRETAETIME: 1574855656000,
         //        COMORG: 761,
         //        COMUPDATETIME: 1575786986000,
         //        DATACOUNT: "10",
         //        ID: 5541,
         //        MODULE: "24",
         //        MODULENAME: "累加积分",
         //        MODULETAG: "1",
         //        POSITION: "2",
         //        TYPE: "1",
         //        USERID: 4191,
		// 	},
		// 	{
         //        COMCREATEUSER: 4191,
         //        COMCRETAETIME: 1574855656000,
         //        COMORG: 761,
         //        COMUPDATETIME: 1575786986000,
         //        DATACOUNT: "10",
         //        ID: 5543,
         //        MODULE: "18",
         //        MODULENAME: "任务积分预警",
         //        MODULETAG: "2",
         //        POSITION: "2",
         //        TYPE: "1",
         //        USERID: 4191,
		// 	}
		// ];
		// var dd = HTM;
		if(dd.length){
			$(dd).each(function(i,data){
				self.deptId = dd[0].OBJECTID;
				self.objectName = dd[0].OBJECTNAME;
				self.setModuleDataConfig(data);

               self.modules = self.getTodoModules();
			});
		}
	});
	
	self.moduleDraggle();
};

/**
 * 首页待办模块拖拽
 */
JXTodo.prototype.moduleDraggle = function(){
	var self = this;

	var todoTab = $('ul.jx-index-sorttab');
	todoTab.sortable({
		connectWith: '.jx-index-sorttab',
		helper: 'clone',
		containment: $('#jx_index_addHomeDefault_form'),//限制拖拽范围
		stop: function (e, ui) {
	    	self.saveModuleInfo();
	    }
	}).disableSelection();
};

/**
 * 保存首页待办不同模块信息
 */
JXTodo.prototype.saveModuleInfo = function(){
	var self = this;
	
	var indexForm = $('#jx_index_addHomeDefault_form');
	var indexType = $('#TYPE').val();
	var curUID = JXUProp.id;
	if (indexForm.form('validate')) {
        var modules = self.getTodoModules();
        var flag = self.compareModuleInfo(modules);

        if(flag){
        	var params = {
	        	LEFTMODULES: modules.lmodules,
	        	RIGHTMODULES: modules.rmodules,
	        	TYPE: indexType,
	        	USERID: curUID
	        };
	        var url = 'index/uupdatemoduleposition.do';
	        
			jx_ajax(url, params, function(data,status){
				jx_message_show('提示','操作成功');
			});
        }
	} else {
	}
};

/**
 * 获取首页待办不同模块信息
 */
JXTodo.prototype.getModuleInfo = function(elems){
	var moduleIdAry = [];
	$(elems).each(function(i,ddd){
		var moduleId = $(ddd).attr('moduleid');
		moduleIdAry.push(moduleId);
	})
	return moduleIdAry.join(',');
};

/**
* 获取首页待办左右区域的模块
*/
JXTodo.prototype.getTodoModules = function(){
	var self = this;
	var lzone = $('#jx_index_leftzone .nav');
    var rzone = $('#jx_index_rightzone .nav');
    var lzoneAry = self.getModuleInfo(lzone);
    var rzoneAry = self.getModuleInfo(rzone);

    return {
    	lmodules: lzoneAry,
    	rmodules: rzoneAry
    };
};


/**
* 比较变更后的模块位置与原来的模块位置，
* 从而确立是否需要更新数据库数据
*/
JXTodo.prototype.compareModuleInfo = function(opts){
	if(!opts) return;

	var self = this;
	var flag = false;
	var oldLModules = self.modules.lmodules;
	var oldRModules = self.modules.rmodules;

	var newLModules = opts.lmodules;
	var newRModules = opts.rmodules;

	if(oldLModules.length !== newLModules.length
		&& oldRModules.length !== newRModules.length){
        flag = true;
	}else{
        flag = self.judgeAryDiff(oldLModules, newLModules);

        if(!flag){
            flag = self.judgeAryDiff(oldRModules, newRModules);
        }
	}

   return flag;
};


/**
* 判断两数组元素是否一致，两数组大小一致
*/
JXTodo.prototype.judgeAryDiff = function(ary1, ary2){
	for(var i = 0, len = ary1.length; i < len; i++){
		var obj1 = ary1[i];
		var obj2 = ary2[i];
		if(obj1 != obj2){
            return true;
		}
    }

    return false;
}

/**
 * 首页用户配置
 */
JXTodo.prototype.moduleSet = function(type){
	var url = '';
	var flag = false;
	var roleId = '';
	
	if(type === 'user'){//用户首页配置
		url = 'index/saddUserDefaultSetting.do';
		jx_common_window('首页配置', 540, 540, 50, url, {}, null); 
	}else{//角色首页配置
		url = 'index/saddRoleDefaultSetting.do';
		
		$('#jx_role_list div').each(function(i,data){
			if($(data).hasClass('current')){
				flag = true;
				roleId = $(data).attr('id');
			}
		});
		
		if(!flag){
			jx_message_show('提示','请选择需首页配置的角色');
			return;
		}
		
		jx_common_window("首页配置", 540, 540, 50, url, {ROLEID: roleId}, null);  
	}
};

/**
* 配置不同用户首页待办模块标题、待办请求链接、
* 待办列表表头、列表数据等配置
*/
JXTodo.prototype.setModuleDataConfig = function(module){
    var self = this;

    var moduleId = parseInt(module.MODULE);
    var dataCount = module.DATACOUNT;

    //标题参数配置格式
    var titleOpts = {
    	id: "",
		dataCount: dataCount,          //记录数
		moduleId: moduleId,            //模块ID
		moduleName: module.MODULENAME, //模块名称
		moduleType: module.TYPE,       //模块类型
		moduleTag: module.MODULETAG,   //模块所属区域
		subTitle: []                   //模块子标题(选项卡)
	};

    //请求链接参数
	var todoURL = {
		url: "index/squeryhomepagemoduledata.do"
	};

	//数据列表参数
	var todoTab = {
	 	head: [
	 	    {name: "", width: "1%"}, 
	 	    {name: "任务名称", width: "60%"}, 
            {name: "创建日期", width: "auto"}
	 	],
	 	columns: [
	 	    {name: ""},
	 	    {name: "TITILE", linkable: 1},
	 	    {name: "CREATETIME"}
	 	]
	};
	switch(moduleId){
		case 1://考核审批
		    todoURL.params = [
		        {PAGENUM: dataCount, MODULEMARK: 26},
		        {PAGENUM: dataCount, MODULEMARK: 4, MODEL: 4},
		        {PAGENUM: dataCount, MODULEMARK: 4, MODEL: 5}
		    ];
		    titleOpts.id = "examineApproval";
		    titleOpts.subTitle = [
		        {name: "部门考核"},
		        {name: "综合测评"},
		        {name: "个人考核"}
		    ];  
		break;
		case 2://约束考核
		    titleOpts.id = "bindTarget";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 25}];
		break;
		case 3://目标审批
		    titleOpts.id = "kpiTarget";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 1}];
		break;
		case 4://考核得分
		    titleOpts.id = "examineScore";
		    titleOpts.subTitle = [
		        {name: "KPI"},
		        {name: "机组竞赛"},
		        {name: "财务考核"}
		    ],
		    todoURL = [
		    { 
	        	url: "index/squeryhomepagemoduledata.do",
	            params: [{
		        	PAGENUM: dataCount, 
		        	CURMONTH: curDateStr, 
		        	EXAMINEYEAR: year, 
		        	OBJECTID: self.deptId, 
		        	EXAMINESTATE: 1
	            }]
	        },
	        { 
	        	url: "analyze/squeryRaceTargetExaScore",
	        	params: [{
		        	PAGENUM: dataCount,
		        	EXAMINE_RANG: curDateStr, 
		        	EXAMINE_YEAR: year 
	            }]
	        },
	        { 
	        	url: "target/squeryfinancetargetcomplexinfo.do",
                params: [{
		        	PAGENUM: dataCount, 
		        	TARGETDATE: curDateStr 
	            }]
	        }];
		    todoTab = {
		 	    head: [
			 	    {name: "", width: "1%"}, 
			 	    {name: "部门", width: "60%"}, 
			 	    {name: "实际得分", width: "auto"}, 
	                {name: "排名", width: "10%"}
		 	    ],
			 	columns: [
			 	    {name: ""},
			 	    {name: "ORGNAME"},
			 	    {name: "SCORE"},
			 	    {name: "RANK"}
			 	]
		 	};
		break;
		case 5://申诉
		    titleOpts.id = "appealArea";
		    todoURL.params = [
                {PAGENUM: dataCount, MODULEMARK: 4, MODEL: 8},
                {PAGENUM: dataCount, MODULEMARK: 29}
		    ];
		break;
		case 6://目标值上报
            todoURL.params = [
                {PAGENUM: dataCount, MODULEMARK: 23, MODEL: 7},
                {PAGENUM: dataCount, MODULEMARK: 23, MODELS: "8,10"}
		    ];
		    titleOpts.id = "targetReport";
		    titleOpts.subTitle = [
		        {name: "计划值上报"},
		        {name: "完成值上报"},
		    ];  
		break;
		case 7://机组竞赛上报
		    todoURL.params = [
                {PAGENUM: dataCount, MODULEMARK: 23, MODEL: 3},
                {PAGENUM: dataCount, MODULEMARK: 23, MODEL: 4}
		    ];

		    titleOpts.id = "machineRace";
		    titleOpts.subTitle = [
		        {name: "计划值上报"},
		        {name: "完成值上报"},
		    ];  
		break;
		case 8://财务考核上报
            todoURL.params = [
                {PAGENUM: dataCount, MODULEMARK: 23, MODEL: 5},
                {PAGENUM: dataCount, MODULEMARK: 23, MODELS: "6,11"}
		    ];

		    titleOpts.id = "financeExamine";
		    titleOpts.subTitle = [
		        {name: "计划值上报"},
		        {name: "完成值上报"},
		    ];  
		break;
		case 9://总经理奖励
		    titleOpts.id = "managerReward";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 24}];
		break;
		case 10://重点指标，待定模块
		    titleOpts.id = "emphasisTarget";
		break;
		case 11://总经理奖励分解
		    titleOpts.id = "managerDistribute";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 28}];
		break;
		case 12://班组考核
		    titleOpts.id = "teamTarget";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 17}];
		break;
		case 13://任务
		    titleOpts.id = "taskArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 3}];
		break;
		case 14://计划
		    titleOpts.id = "planArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 2}];
		break;
		case 15://考勤
		    titleOpts.id = "attendanceArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 6}];
		break;
		case 16://项目督办
		    titleOpts.id = "projectArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARKS: "21,22"}];
		break;
		case 17://事件
		    titleOpts.id = "rewardArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK: 31}];
		    todoTab = {
		 	    head: [
			 	    {name: "", width: "1%"}, 
			 	    {name: "项目名称", width: "60%"}, 
			 	    {name: "创建日期", width: "auto"}
		 	    ],
			 	columns: [
			 	    {name: ""},
			 	    {name: "TITILE", linkable: 1},
			 	    {name: "CREATETIME"}
			 	]
		 	};
		break;
		case 18://预警
		    titleOpts.id = "warningArea";
		    todoURL = {
		    	url: "index/squeryuserwaring.do",
		        params: [{PAGENUM: dataCount}]
		    };
		    todoTab = {
		 	    head: [
			 	    {name: "", width: "1%"}, 
			 	    {name: "预警任务名称", width: "50%"}, 
			 	    {name: "", width: "4%"},
			 	    {name: "创建日期", width: "auto"}
		 	    ],
		 	    columns: [
			 	    {name: ""},
			 	    {name: "SMSG", linkable: 1},
			 	    {name: "DEL"},
			 	    {name: "CRETAETIME"}
			 	]
		 	};
		break;
		case 20://部门目标
		    titleOpts.id = "deptTargetScore";
		    todoURL = {
		    	url: "index/squeryhomedepttargetscore.do",
		        params: [{
		        	PAGENUM: dataCount,
			        TARGETLEVEL: 1,
			        EXAMINESTATE: 1,
			        EXAMINEFLAG: 1,
			        DEPTID: DEPTID
		        }]
		    };
		    todoTab = {
		 	    head: [
			 	    {name: "", width: "1%"}, 
			 	    {name: "指标名称", width: "auto"}, 
			 	    {name: "计划值", width: "10%"}, 
			 	    {name: "争创值", width: "10%"}, 
			 	    {name: "完成值", width: "10%"}, 
			 	    {name: "得分", width: "10%"}
		 	    ],
		 	    columns: [
			 	    {name: ""},
			 	    {name: "TITILE"},
			 	    {name: "PLANVALUE"},
			 	    {name: "STRIVEVALUE"},
			 	    {name: "COMPLETEVALUE"},
			 	    {name: "SCORE"}
			 	]
		 	};
		break;
		case 22://个人任务
		    titleOpts.id = "personalTaskScore";
		    todoURL = {
		    	url: "index/squeryhomepersonaltaskscore.do",
		        params: [{ PAGENUM: dataCount }]
		    };
		    todoTab = {
		 	    head: [
			 	    {name: "", width: "1%"}, 
			 	    {name: "时间(周)", width: "60%"}, 
			 	    {name: "得分", width: "auto"}
		 	    ],
		 	    columns: [
			 	    {name: ""},
			 	    {name: "WEEKNAME"},
			 	    {name: "SCORE"}
			 	]
		 	};
		break;
		case 23://目标数据上报(手工)
		    todoURL.params = [
		        {PAGENUM: dataCount, MODULEMARK: 4, MODELS: 2},
		        {PAGENUM: dataCount, MODULEMARK: 4, MODELS: 1}
		    ];
		    titleOpts.id = "targetReportArea";
		    titleOpts.subTitle = [
		        {name: "部门数据上报"},
		        {name: "个人数据上报"},
		    ]  
		break;
		case 24://累加积分
		    titleOpts.id = "integralArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK:32}];
		break;
		case 25://固定积分
		    titleOpts.id = "fixedIntegralArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARK:35}];
		break;
		case 26://事件申诉
		    titleOpts.id = "rewardAppealArea";
		    todoURL.params = [{PAGENUM: dataCount, MODULEMARKS: "33,34"}];
		break;
	}
	var content = self.loadModuleTitle(titleOpts);
    self.loadModuleContent(moduleId, todoTab, todoURL, content);
};
 

/**
* 加载不同模块标题、子标题
*/
JXTodo.prototype.loadModuleTitle = function(opts){
    if(!opts) return;
    var self = this;

    var titleId = opts.id;
    var moduleId = opts.moduleId;
    var moduleName = opts.moduleName;
    var moduleType = opts.moduleType;
    var moduleTag = opts.moduleTag;
    var dataCount = opts.dataCount;
    var subTitles = opts.subTitle;

	var module = $("<li></li>");
	module.attr({
		"data-count": dataCount,
		"id": titleId
	});
	
	var container = $("<div></div>");
	container.addClass("nav");
	container.attr({"moduleId": moduleId});
	container.appendTo(module);

	var strong = $("<strong></strong>");
	strong.html(moduleName);
	strong.appendTo(container);

    if(subTitles.length){
        $(subTitles).each(function(idx, title){

        	var card = $("<a href='javascript:'></a>");
        	card.appendTo(container);
        	if(idx === 0){
                card.addClass("tabitem hover");
        	}else{
        		card.addClass("tabitem");
        	}
        	card.attr({"data-type": moduleId});
        	card.html(title.name);

        	card.unbind("mouseover").bind("mouseover",function(){
        		self.switchTab($(this), idx);
        	});
        });
    }
	
	var more = $("<a href='javascript:'></a>");
	more.addClass("jx-index-more fn-hide");
	more.attr({
		"url": "#",
		"url-param": "0",
		"ui-model": "1",
		"title": "更多"
	});
	more.html("<img src='style/assets/images/todo/more.png'/>");
	more.appendTo(container);
	
	var setting = $("<a href='javascript:' style='display: none'></a>");
	setting.addClass("jx-index-setting");
	setting.attr({"title": "设置"});
	setting.html("<img src='style/assets/images/todo/setting.png'/>");
	setting.appendTo(container);
	
	var clear = $("<div></div>");
	clear.addClass("clear");
	clear.appendTo(container);
	
	var content = $("<div></div>");
	content.addClass("home-content");
	content.appendTo(module);

	more.unbind("click").bind("click",function(){
		self.gotoMore(this);
	});

	setting.unbind("click").bind("click",function(){
		self.setModuleCount({
			id: moduleId,
			name: moduleName,
			type: moduleType
		});
	});

	self.setModulePosition(moduleTag, module);

	return content;
};


/**
* 加载不同模块待办内容
* @param moduleId待办模块类型
* @param tabOpts待办列表配置
* @param urlOpts待办数据请求配置
* @param content待办内容所属首页模块
*/
JXTodo.prototype.loadModuleContent = function(moduleId, tabOpts, urlOpts, content){
    if(!tabOpts && !urlOpts && !content) return;

    var self = this;
	var urlSize = urlOpts.length;//请求链接个数
	if(urlSize === 1){
        self.setUrlParam(moduleId, tabOpts, urlOpts, content);
	}else{
		$(urlOpts).each(function(idx, opts){
			self.setUrlParam(moduleId, tabOpts, opts, content);
		});
	}
};


/**
* 设置不同待办模块请求链接参数、列表参数
* @param moduleId待办模块类型
* @param tabOpts待办列表
* @param opts待办链接
*/
JXTodo.prototype.setUrlParam = function(moduleId, tabOpts, opts, content){
	if(!opts) return;

    var self = this;
	var url = opts.url;//请求链接
	var urlParam = "";//请求链接参数
    var paramSize = opts.params.length;
    if(paramSize === 1){
    	urlParam = opts.params[0];
    	self.setTabData(moduleId, url, urlParam, tabOpts, 0, content);
    }else{
    	$(opts.params).each(function(idx, p){
			self.setTabData(moduleId, url, p, tabOpts, idx, content);
		});
    }
};

/**
* 加载表格数据
* @param moduleId待办模块类型
* @param ulr请求链接
* @param param请求参数
* @param opts表格配置参数
*/
JXTodo.prototype.setTabData = function(moduleId, url, param, opts, index, content){
    if(!url && !param && !opts) return;

    var self = this;
	var tabHead = opts.head;//表头
    var tabColumn = opts.columns;//列表
    
    param.SHOWPAGE = 1;
	jx_ajax_json(url, param, function(ddd,status){
		//数据列表
		var $table = $("<table></table>");
		$table.addClass("pct100");
		$table.appendTo(content);
		if(index > 0) $table.hide();
		
		//数据列表表头
		var $head = $("<tr class='thead'></tr>");
		$head.appendTo($table);
		$(tabHead).each(function(idx, h){
            var $th = $("<th></th>");
            $th.appendTo($head);
            $th.css({"width":h.width});
            $th.html(h.name);
		});
		switch(moduleId){
			case 18:
			    JXWarn.fill(ddd, $table, tabColumn);
			break;
			default:
			    self.setCommTabData(ddd, $table, tabColumn);
			break;
		}
	});
};


/**
* 数据一致列表
*/
JXTodo.prototype.setCommTabData = function(datas, tab, tabColumn){
	var self = this;
	//数据列表 数据
	$(datas).each(function(i,data){
		var $tr = $("<tr></tr>");
        $tr.appendTo(tab);
        //获取每一单元格数据
        $(tabColumn).each(function(idx, c){
            var tdData = data[c.name];

        	var $td = $("<td></td>");
        	$td.appendTo($tr);
        	if(!c.name){
        		$td.html("");
        	}else{
        		if(c.linkable){
        			var msgTitle = tdData.substring(tdData.indexOf("：")+1,tdData.length);
				    var link = $("<a href='javascript:'></a>");
					link.attr({
						"title": tdData,
						"data-oid": data.OBJECT_ID,//待办所对应模块下的数据ID
						"data-tid": data.ID,//待办ID
						"data-title": msgTitle,//待办标题
						"data-model": data.MODEL,//待办模块
						"data-dmodel": data.DELMODEL,//待办是否删除标识
						"data-umodel": data.UIMODEL,//待办跳转方式
						"data-url": data.URL,//待办跳转页面URL
						"data-urlparam": data.URLPARAM,//待办跳转页面参数
						"data-module": data.MODULEMARK,//待办模块下的子项
						"data-cuser": data.COMCREATEUSER,//待办创建人
						"data-operation": data.OPERATION,//待办跳转页面URL
						"data-opinion": data.HANDOPINION,//待办审批意见
						"data-time": data.CREATETIME//数据时间
					});
					link.bind("click",function(){
						self.gotoPage(this);
					});
					link.html(tdData);
					$td.html(link);
        		}else{
        			$td.html(tdData);
        		}
        	}
        });
	});
};

/**
* 预警
*/
var JXWarn = {
	dataIds: [],//所有预警数据ID
	fill: function(list, tab, tabColumn){//填充预警数据
		$(list).each(function(i,data){
           JXWarn.dataIds.push(data.OBJECT_ID);

			var $tr = $("<tr></tr>");
	        $tr.appendTo(tab);

	        var warnDel = $("<a href='javascript:'></a>");
		    warnDel.attr({
		        "title": "删除任务积分预警",
		        "data-id": data.ID,
		        "data-oid": data.OBJECT_ID
		    });
		    warnDel.bind("click", function(){
		    	JXWarn.del(this);
		    });

		    var delImg = $("<img>");
		    delImg.appendTo(warnDel);
		    delImg.css({
		    	"width": "12px",
		    	"height": "12px",
		    	//"margin-left": "4px",
		    	"vertical-align": "middle"
		    });
		    delImg.attr({
		    	"data-type": "del",
	            "src": "style/assets/images/del_icon.png"
		    });

	        $(tabColumn).each(function(idx, c){
	            var tdData = data[c.name];

	        	var $td = $("<td></td>");
	        	$td.appendTo($tr);
	        	var $tdW = $td.width();
	        	if(!c.name){
	        		$td.html("");
	        	}else{
	        		if (c.name == 'DEL') {
	        			warnDel.appendTo($td);
	        		}
	        		
	        		if(c.linkable){
	        			var msgTitle = tdData.substring(tdData.indexOf("：")+1,tdData.length);
					    var link = $("<a href='javascript:'></a>");
					    link.html(tdData).appendTo($td).attr({
							"data-oid": data.OBJECT_ID,
							"data-id": data.ID,
							"data-model": data.MODEL,
							"title": tdData
						}).bind("click",function(){
							JXWarn.op(this);
						});
	        		}else{
	        			$td.html(tdData);
	        		}
	        	}
	        });
	    });
	},
	op: function(elem){//预警操作
		var self  = $(elem);
		var dataModel = self.attr("data-model");
		var dataId = self.attr("data-id");
        
		switch(dataModel){
			case "TBS":
			    JXWarn.taskAdd(elem);
			break;
			case "TAR":
			    JXWarn.taskReport(elem);
			break;
		}

		JXWarn.read(elem);
	},
	commDel: function(id){//预警公用删除
		var delAry = $('#warningArea').find('a[data-oid="'+ id +'"]');
		var len = delAry.length;
		if ( len ) {
			var delObj = delAry[1];
			
			var ids = JXWarn.dataIds;
			var flag = jx_common_inArray(ids, id);
			if ( flag ) {
				delObj.click();
			}
		}
	},
	del: function(elem){//删除预警
		var self = $(elem);
        var param = {
        	ID: self.attr("data-id")
        };
        var url = "common/uwarningdel.do";
		jx_ajax_json(url, param, function(data, status) {	
			self.parent().parent().remove();
		});
	},
	read: function(elem){//预警已读
		var self = $(elem);
		self.css("color","#000");
	    var param = {
	    	ID: self.attr("data-id")
	    };
	    var url = "common/uwarningread.do";
	    jx_ajax_json(url, param, function(data, status) {});
	},
	taskAdd: function(elem){//任务库提醒新建任务
		var self = $(elem);
		var param = {
			TASKBASEID: self.attr("data-oid")
		};
		var url = "task/sshowtaskadd.do";
		jx_common_window("制定任务", 762, 590, 50, url, param, null);
	},
	taskReport: function(elem){//任务汇报提醒
		var self = $(elem);
		var param = {
			ID: self.attr("data-oid"),
			model: 1
		};
		var url = "task/qtaskcommunication.do";
	    jx_common_window("任务沟通信息", 900, 500, 100, url, param,null);
	}
};

/**
* 设置模块所属区域
* @param tag首页待办左右区域标识
* @param module首页待办模块
*/
JXTodo.prototype.setModulePosition = function(tag, module){
	var self = this;

	if(parseInt(tag) === 1)
		self.leftZone.append(module);
	else
		self.rightZone.append(module);
};

/**
* 切换不同子标题
* @param sub子标题
* @param 子标题所属模块中的下标
*/
JXTodo.prototype.switchTab = function(sub, idx){
	var cards = sub.parent().find(".tabitem");
    var tabs = sub.parent().parent().find("table").not(".ignore");
    cards.removeClass("hover");
    sub.addClass("tabitem hover");
    tabs.hide();
    $(tabs[idx]).show();
};

/**
* 跳转more
*/
JXTodo.prototype.gotoMore = function(thisA){
	var url = $(thisA).attr("url");
	jx_sub_nav(url);
};


/**
* 设置不同模块显示记录数
*/
JXTodo.prototype.setModuleCount =  function(opts){
	if(!opts) return;

	var title = "设置" + opts.name + "记录数";
	var url = "index/ssettingHomePageDataNum.do";
	var param = {
		MODULE: opts.id,
		TYPE: opts.type
	};
	jx_common_window(title, 400, 220, 50, url, param, null);
};


/**
* 不同模块待办跳转url
*/
var todoURL = {
    task: {
        detailUrl: 'task/staskdetaildlg.do',
        editUrl: 'task/sshowtaskupdate.do',
        receiveUrl: 'task/sshowtaskreceive.do'
    },
    plan: {
    	detailUrl: 'plan/splandetaildlg.do'
    },
    project: {
    	communicateUrl: 'project/sshowprojectcommunicatedetail.do',
    	reportUrl: 'project/sshowprojectreportdetail.do',
    	acceptUrl: 'project/sshowprojectaccept.do',
    	submitUrl: 'project/sshowprojectsubmit.do',
    	appraiseUrl: 'project/sshowprojectappraisedetail.do',
    	detailUrl: 'project/sprojectdetailbyid.do'
    },
    target: {
    	collectUrl: 'examine/sdatacollectdetail.do',
    	scoreUrl: 'examine/sshowexaminescore.do'

    },
    vacation: {
    	detailUrl: 'attendance/sshowVacationDetail.do'
    },
    reward: {
    	editUrl: 'reward/sshowRewardScoreEdit.do',
    	detailUrl: 'reward/sshowRewardScoreDetail.do'
    }
};

/**
* 待办链接跳转,
* 备注(暂时只改造了任务、积分、事件，后续绩效整合时再处理其它待办)
*/
JXTodo.prototype.gotoPage = function(thisA){
	var self = this;
	var $this = $(thisA);

	var dataId =$this.attr("data-oid") ;		
    var todoId = $this.attr("data-tid");
    var msgTitle = $this.attr("data-title");
    var model = parseInt($this.attr("data-model"));
    var delModel = parseInt($this.attr("data-dmodel"));
    var uiModel = $this.attr("data-umodel");
    var url = $this.attr("data-url");
    var urlParam = $this.attr("data-urlparam");
    var moduleMark = parseInt($this.attr("data-module"));
    var createUser = $this.attr("data-cuser");
    var operation = parseInt($this.attr("data-operation"));
    var handOpinion = $this.attr("data-opinion");
    var dataTime = $this.attr("data-time");

    var pageUrl = '';
	
	var param = {
		ID: dataId,
		MODEL: model,
		model: model,
		TODOID: todoId,
		GOTOID: todoId,
		MSGTITLE: msgTitle,
		HANDOPINION: handOpinion,
		CREATEUSER: createUser
	};
	
	//删除待办
	if(delModel === 0){
		var obj = {
	        moduleMark: moduleMark,
		    model: model
		};
		if(!self.judgeDeletedTodo(obj)){
			self.delTodo(todoId, delModel, thisA);
		}
	}

	//待办信息跳转
	if(uiModel === '0'){
		param.HAND = 1;
		if (moduleMark == 3 ) {
			if (model == 9) {
				jx_common_window('任务接收', 762, 620, 50, url, param, null);
			} else {
				jx_common_window('待办信息', 1000, 500, 100, url, param, null);
			}
		} else {
		    jx_common_window('待办信息', 1000, 500, 100, url, param, null);
		}
	}else if(uiModel === '1'){
		param.HAND = 1;
		switch(moduleMark){
		case 2://计划管理
			switch(model){
			case 8:
				if(operation === 0){
					param.HAND = '';
					jx_common_window('计划详情', 762, 650, 100, todoURL.plan.detailUrl, param, null);
					self.delTodo(todoId, delModel, thisA);
				}else{
					jx_common_window('计划审批', 762, 650, 100, todoURL.plan.detailUrl, param, null);
				}
				break;
			case 11:
				if(urlParam === '0'){
					jx_sub_nav(url);
				}else{
					jx_sub_nav(url + urlParam);
				}
				break;
			case 14:
				param.HAND = '';
				jx_common_window('督办下发计划详情', 762, 650, 100, todoURL.plan.detailUrl, param, null);
				self.delTodo(todoId, delModel, thisA);
				break;
			case 16:
				if(urlParam === '0'){
					jx_sub_nav(url + '?HAND=1');
				}else{
					jx_sub_nav(url + urlParam + '&HAND=1');
				}
				break;
			}
			break;
		case 3://任务管理
			switch(model){
			case 0:
				jx_common_window('任务重新上报', 762, 620, 60, todoURL.task.editUrl, param, null);
				break;
			case 8:
				jx_common_window('任务审批', 762, 620, 50, todoURL.task.detailUrl, param, null);
				break;
			case 9://任务下发不审批
				param.HAND = '';
				jx_common_window('任务查看', 600, 720, 50, url, param, null);
				break;
			case 10://计划下发分解成任务
				param.TYPE = 'hand';
				jx_common_window('任务接收', 762, 620, 50, todoURL.task.receiveUrl, param, null);
				break; 
			case 12:
				if(urlParam === '0'){
					jx_sub_nav(url);
				}else{
					jx_sub_nav(url + urlParam);
				}
				break;
			case 13:
				param.TYPE = 'hand';
				if(operation === 0){
					param.isxiafa = 1;
					jx_common_window('任务重新下发', 762, 620, 60, todoURL.task.editUrl, param, null);
				}else{
					jx_common_window('任务接收', 762, 620, 50, todoURL.task.receiveUrl, param, null);
				}
				break;
			}
			break;
		case 4:
			switch(model){
			case 1://个人目标上报(手工)
				var param = {
				    ID: dataId,
				    BROWSE: 0,
				    TARGETLEVEL: 0,
					HAND: 1
				};
				jx_common_window('数据上报', 1000, 620, 50, todoURL.target.collectUrl, param, null);
				break;
			case 2://部门目标上报(手工)
				var param = {
				    ID: dataId,
				    BROWSE: 0,
				    TARGETLEVEL: 1,
					HAND: 1
				};
				jx_common_window('数据上报', 1000, 620, 50, todoURL.target.collectUrl, param, null);
				break;
			case 4://综合测评
				var params = {
					ID: dataId,
					BROWSE: 0,
					YEAR: $(thisA).attr('YEAR'),
					HAND: 1
				};
				jx_sub_nav(todoURL.target.scoreUrl, params);
				break;
			case 5://个人考核
				var params = {
					ID : dataId,
					BROWSE : 0,
					YEAR : $(thisA).attr('YEAR'),
					HAND : 1
				};
				jx_sub_nav(todoURL.target.scoreUrl, params);
				break;
			}
			break;
		case 6://考勤管理
			switch(model){
			case 1://考核登记
				var urlParams = '';
				if(urlParam !== '0'){
					urlParams = urlParam + '&HAND=1';
				}else{
					urlParams = '?HAND=1';
				}
				
				jx_sub_nav(url + urlParams);
				self.delTodo(todoId, delModel, thisA);
				break;
			case 2://休假
				var attendState = parseInt($(thisA).attr('STATE'));
				var params = {
					HAND: '1',
					JXVACATIONID: dataId
				};

				if(attendState === 2){
					params.LEVEL = 2;
					params.VACATIONSTATE = $(thisA).attr('NODE');
					jx_common_window('休假审批', 1000, 520, 100, todoURL.vacation.detailUrl, params, '');
					self.delTodo(todoId, delModel, thisA);
				}else{
					params.LEVEL = 3;
					params.VACATIONSTATE = attendState;
					jx_common_window('休假审批', 1000, 520, 100, todoURL.vacation.detailUrl, params, '');
				}
				break;
			}
			break;
		case 21://项目管理
			switch(model){
			case 2:
				var params = {
				    PROJECTREPORT: 1,
				    REPORTID: dataId,
				    proejctRemind: 1
				};
				jx_common_window('督办详情', 700, 500, 100, todoURL.project.communicateUrl, param, null);
				break;
			case 5:
				jx_common_window('汇报详情', 700, 500, 100, todoURL.project.reportUrl, param, null);
				break;
			case 6:
				if(delModel == 4){//项目验收通过或不通过后查看详情
					param.projectApproval = 1;
					param.PROJECTID = dataId;
					param.ID = '';
					jx_common_window('项目验收详情', 600, 500, 100, todoURL.project.communicateUrl, param, null);
					self.delTodo(todoId, 0, thisA);
				}else{
					jx_common_window('项目验收', 560, 350, 100, todoURL.project.acceptUrl, param, null);
				}
				break;
			case 8:
				param.HAND = '';
				jx_common_window('项目详情', 750, 600, 100, todoURL.project.detailUrl, param, null);
				self.delTodo(todoId, delModel, thisA);
				break;
			case 21:
				if(operation === 0){
					param.TYPE = 'list';
					jx_common_window('项目提交', 750, 650, 100, todoURL.project.submitUrl, param, null);
				}else{
					jx_common_window('项目审批', 750, 600, 100, todoURL.project.detailUrl, param, null);
				}
				break;
			}
			break;
		case 22:
			param.APPRAISEID = dataId;
			param.ID = '';
			if(operation === 0){
				param.TYPE = 'again'
				jx_common_window('项目评价', 750, 650, 100, todoURL.project.appraiseUrl, param, null);
			}else{
				if(delModel == 4){//审批结束查看详情
					param.HAND = '';
					jx_common_window('项目评价', 750, 650, 100, todoURL.project.appraiseUrl, param, null);
					self.delTodo(todoId, 0, thisA);
				}else{
					jx_common_window('项目评价', 750, 650, 100, todoURL.project.appraiseUrl, param, null);
				}
			}
			break;
		case 31://事件
		    if (model == '0') {
                var time = dataTime.split("-");
		    	url +="&CREATETIME="+time[0]+"-"+time[1];
		    	jx_sub_nav(url);
		    } else {
				//param.REWARD_TYPE = 'award';
				param.REWARD_TYPE = 'integral';
				param.CREATETIME = dataTime;
				if(operation === 0){
					param.RESUBMIT = 1;
					jx_common_window('事件重新提交', 700, 640, 50, todoURL.reward.editUrl, param, null);
				}else{
					if(delModel == 0){
					    param.HAND = '';
						jx_common_window('事件详情', 700, 640, 50, todoURL.reward.detailUrl, param, null);
						//self.delTodo(todoId, 0, thisA);
					}else{
						jx_common_window('事件审批', 700, 640, 50, todoURL.reward.detailUrl, param, null);
					}
				}
		    }
			break;
		case 32://累加积分
			if(urlParam === '0'){
				url += '?INTEGRAL_ID='+dataId;
			}else{
				url += urlParam;
			}
			url = jx_common_setUrlParam(url, 'FROM', 'todo');

			jx_sub_nav(url);
			break;
		case 35://固定积分
		    var handType = operation === 0 ? 0 : 1;
		    var param = {
		    	integralHand: handType,
		    	integralColId: dataId,
		    	todoTitle: msgTitle
		    };
            jx_sub_nav(url, param);
		break;
		case 33:
		case 34:
		    var param = {
		    	APPEAL_ID: dataId
		    };
	    	if (operation == 1) {
                param.IS_HAND = 1;
	    	}
	    	jx_common_window('事件申诉', 640, 578, 50, url, param, null);
		    break;
		default:
			if(urlParam === '0'){
				jx_sub_nav(url);
			}else{
				jx_sub_nav(url + urlParam);
			}
			break;
		}
	}else{
		jx_message_show('提示',$(thisA).html());
	}

};

/**
* 待办删除
* @param id待办数据ID
* @param model是否可删除标识
*/
JXTodo.prototype.delTodo = function(id, model, thisA){
	if(model !== 0){
		return;
	}

	var param = {
		GOTOID: id,
		NOMASK: 1
	};
	var url = "common/uagentdel.do";
	jx_ajax_json(url, param, function(data,status){
		if(thisA){
			if(data){
				$(thisA).parent().parent().remove();
			}
		}
	});
};

/**
* 待办处理删除待办新数据，并刷新首页数据
*/
JXTodo.prototype.delTodoByHand = function(id){
	var param = {
		GOTOID: id,
		NOMASK: 1
	};
	var url = "common/uagentdel.do";
	jx_ajax_json(url, param, function(data,status){

	});
	this.init();
};


/**
* 过滤掉哪些是待删除标识时，不需要删除的待办
* @param obj待办信息
*/
JXTodo.prototype.judgeDeletedTodo = function(obj){
    var flag =  false;
	var ary = [
	    {moduleMark: 2, model: 8},
	    {moduleMark: 3, model: 13},
	    {moduleMark: 3, model: 0},
	    {moduleMark: 6, model: 2},
	    {moduleMark: 21, model: 21},
	    {moduleMark: 2, model: 1}
	];
	$(ary).each(function(i,data){
	    var moduleMark = data.moduleMark;
	    var model = data.model;

	    if(moduleMark === obj['moduleMark']
	       && model === obj['model']){
	    	flag = true;
	    }
	});
	return flag;
};

/**
* 待办流程梳理
* @param wfmark流程标识
*/
JXTodo.prototype.wfHand = function(thisA, wfmark){//////////////////////////
	var dataId = $(thisA).attr('data-id');
	var msgTitle = $(thisA).attr('data-title');
	jx_common_closewindow(thisA);

	jx_workflow_hand({
		DATAID: dataId,
		MODULEFLAG: wfmark,
		MSGTITLE: msgTitle
	});
};

/**
* 信息变更为已阅读
* @param moduleMark 待办标识
* @param model 待办子模块
* @param dataId 数据ID
*/
JXTodo.prototype.lookTodo = function(moduleMark, model, dataId){
	if(moduleMark != 3){
		return;
	}

    var todoModel = 0;
	if (moduleMark == 3) {
        todoModel = model == 1 ? 6 : model == 2 ? 7 : model == 3 ? 8 : model == 4 ? 9 : model == 7 ? 10 : 0;
	}

	var param = {
		LOOK_TABLE_NUM: todoModel,
		LOOK_DATA_ID: dataId,
		NOMASK: 1
	};
	var url = 'common/uupdateLook.do';
	jx_ajax_json(url, param, function(data,status){});
};