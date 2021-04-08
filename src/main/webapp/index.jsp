<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>




<!DOCTYPE html>
<!--[if IE 8]><html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en">
	<!--<![endif]-->
	

<!-- start: HEAD -->

<head>
	<title>积分制管理系统</title>
	<!-- start: META -->
	<!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
	<base href="http://jixiaobao.com:80/jifen/" target="_self">
	<meta charset="utf-8" />
	<meta name="renderer" content="webkit" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta http-equiv="keywords" content="积分制管理">
    <meta http-equiv="description" content="中企点击积分制管理软件，为打造世界级积分制管理软件和咨询服务而不断努力">
    <link href="./style/bg/jx.ico" rel="shortcut icon">
	<!-- end: META -->

	<!-- start: MAIN CSS -->
	<link rel="stylesheet" type="text/css" href="./style/vendor/bootstrap/css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/themify-icons/themify-icons.min.css"/>
	<!-- <link rel="stylesheet" type="text/css" href="./style/assets/fonts/iconfont.css"> -->
	<link rel="stylesheet" type="text/css" href="./style/assets/iconfont.css">

	<link rel="stylesheet" type="text/css" href="./style/assets/css/styles.css"/>
	<link rel="stylesheet" type="text/css" href="./style/assets/css/plugins.css"/>
	<link rel="stylesheet" type="text/css" href="./style/assets/css/themes/theme-2.css" id="skin_color"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/perfect-scrollbar/perfect-scrollbar.min.css" media="screen"/>
	<link rel="stylesheet" type="text/css" href="./style/assets/fonts/fontAwsome/font-awesome.min.css"/>

	<link rel="stylesheet" type="text/css" href="./style/vendor/easyui/themes/gray/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/easyui/themes/icon.css"/>	

	<link rel="stylesheet" type="text/css" href="./style/vendor/fullcalendar/lib/cupertino/jquery-ui.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/fullcalendar/fullcalendar.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/fullcalendar/fullcalendar.print.css" media="print"/>

	<link rel="stylesheet" type="text/css" href="./style/vendor/datepicker/css/foundation-datepicker.css"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/daterangepicker/daterangepicker.css"/>

	<link rel="stylesheet" type="text/css" href="./style/assets/css/jx.css"/>

	<link rel="stylesheet" type="text/css" href="./style/assets/css/jx_old.css"/>
	<link rel="stylesheet" type="text/css" href="./style/vendor/dialog/css/dialog.css"/>

	<link rel="stylesheet" type="text/css" href="./style/assets/css/welfare/style.css"/>

	<script type="text/javascript" src="./style/vendor/vue/vue.js" charset="UTF-8"></script>
    <script type="text/javascript" src="./style/vendor/vue/vue-validator.js" charset="UTF-8"></script>

	<!-- 引入样式 -->
    <link rel="stylesheet" type="text/css" href="./style/assets/css/upload.css"/>
    <!-- end: MAIN CSS -->
</head>
<!-- end: HEAD -->
	<body>
		<div id="app" class="app-navbar-fixed app-sidebar-fixed app-footer-fixed app-sidebar-closed">
			

<!-- start sidebar -->
<div class="sidebar app-aside" id="sidebar">
	<div class="sidebar-container perfect-scrollbar">
		<nav>
			<!-- start: MAIN NAVIGATION MENU -->
			<ul class="main-navigation-menu">
				
					
						
							
								
							
							
								
							
						
					
				
				
					<li  class="open">
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-folder"></i>
								</div>
								<div class="item-inner" data-id="1223875" data-subid="1223884"
								data-url="/">
									
									<span class="title">首页待办</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu"  style="display: block;">
							    
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223884" data-url="analyze/sshowLeaderjsp.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">首页</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223885" data-url="index/sshowintegralwfnav.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">系统导航</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-ruler-alt"></i>
								</div>
								<div class="item-inner" data-id="1223879" data-subid="1223903"
								data-url="/">
									
									<span class="title">事件积分</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223903" data-url="reward/sshowRewardBaseList.do?REWARD_TYPE=integral" data-level="2">
											<span>●</span>
											
											
											<span class="title">事件库</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223904" data-url="reward/sshowRewardScoreList.do?REWARD_TYPE=integral" data-level="2">
											<span>●</span>
											
											
											<span class="title">事件填报</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223905" data-url="reward/sshowRewardScoreQueryList.do?REWARD_TYPE=integral" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分查询</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223906" data-url="reward/sshowRewardStatis.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">统计查询</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223907" data-url="reward/sshowRewardAppeal.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">事件积分申诉</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-heart"></i>
								</div>
								<div class="item-inner" data-id="1223877" data-subid="1223892"
								data-url="/">
									
									<span class="title">工作积分</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223892" data-url="integral/sshowintegralbaselist.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分库</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223893" data-url="integral/sshowintegraloperateuser.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分上报关系</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223894" data-url="integral/sshowintegralissued.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分下发</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223895" data-url="integral/sshowintegralreport.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分上报</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223897" data-url="integral/sshowintegralanalysisindex.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分查询</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223898" data-url="integral/sshowIntegralScore.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分评价</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-files"></i>
								</div>
								<div class="item-inner" data-id="1223876" data-subid="1223886"
								data-url="/">
									
									<span class="title">任务积分</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223886" data-url="task/sshowtaskbasepage.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">循环任务库</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223887" data-url="task/sshowtaskoperationuser.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">汇报配置</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223888" data-url="task/sshowtaskmanager.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">任务管理</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223889" data-url="task/smonitornew.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">任务监控</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223890" data-url="analyze/sshowTaskAnalysis.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">任务分析</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223891" data-url="common/sshowweeksetlist.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">任务周配置</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-ticket"></i>
								</div>
								<div class="item-inner" data-id="1223878" data-subid="1223902"
								data-url="/">
									
									<span class="title">固定积分</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li >
										<a href="javascript:" data-id="sub1223899" data-url="integral/sshowFixedIntegralRuleList.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">规则</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223900" data-url="integral/sshowFixedIntegralSetList.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">设置</span>

										</a>
										
									</li>
									
								
									
								
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223902" data-url="integral/sshowFixedIntegralQueryList.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">查询</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-medall-alt"></i>
								</div>
								<div class="item-inner" data-id="1223881" data-subid="1223919"
								data-url="/">
									
									<span class="title">积分福利</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li >
										<a href="javascript:" data-id="sub1223917" data-url="welfare/sshowIntegralWelfare.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">商品库</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223918" data-url="welfare/sshowIntegralWelfareExchange.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">福利兑换</span>

										</a>
										
									</li>
									
								
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223919" data-url="welfare/sshowFlCentent.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">我的福利</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-bar-chart"></i>
								</div>
								<div class="item-inner" data-id="1223880" data-subid="1223908"
								data-url="/">
									
									<span class="title">统计分析</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223908" data-url="analyze/sshowEmployjsp.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">综合查询</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-user"></i>
								</div>
								<div class="item-inner" data-id="1223882" data-subid="1223911"
								data-url="/">
									
									<span class="title">组织机构</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li >
										<a href="javascript:" data-id="sub1223909" data-url="common/sorgdept.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">部门管理</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223910" data-url="common/sorgpost.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">岗位管理</span>

										</a>
										
									</li>
									
								
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223911" data-url="common/sorguser.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">人员管理</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223912" data-url="common/sorgrole.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">角色管理</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223896" data-url="integral/sshowDeptChargeList.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">分管部门</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223913" data-url="common/sshowuserloginlog.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">登录日志</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
					<li >
						<a href="javascript:" data-level="1">
							<div class="item-content">
								<div class="item-media">
									<i class="ti-settings"></i>
								</div>
								<div class="item-inner" data-id="1223883" data-subid="1223915"
								data-url="/">
									
									<span class="title">系统配置</span><i class="icon-arrow"></i>
								</div>
							</div>
						</a>
						
							<ul class="sub-menu" >
							    
									
										<li >
										<a href="javascript:" data-id="sub1223914" data-url="workflow/s.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">流程配置</span>

										</a>
										
									</li>
									
								
									
										<li  class="active">
										<a href="javascript:" data-id="sub1223915" data-url="common/qtypeinfomanager.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">数据字典</span>

										</a>
										
									</li>
									
								
									
										<li >
										<a href="javascript:" data-id="sub1223916" data-url="integral/sshowFixedIntegralTypeList.do" data-level="2">
											<span>●</span>
											
											
											<span class="title">积分字典</span>

										</a>
										
									</li>
									
								
							</ul>
						
					</li>
				
			</ul>
			<!-- end: MAIN NAVIGATION MENU -->
		</nav>
	</div>
</div>
<!-- end sidebar -->
			<div class="app-content">
				



<!-- start: TOP NAVBAR -->
<header class="navbar navbar-default navbar-static-top">
	<!-- start: NAVBAR HEADER -->
	<div class="navbar-header" style="border: none;">
		<a href="#" class="sidebar-mobile-toggler pull-left hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app" data-toggle-click-outside="#sidebar">
			<i class="ti-align-justify"></i>
		</a>
		<a class="navbar-brand" href="javascript:">
			<img src="style/assets/img/logo.png" alt="纵横八方集团公司" style="display:none;"/>
			<b style="font-size: 26px">&nbsp;积&nbsp;分&nbsp;制&nbsp;系&nbsp;统</b>
		</a>
		<a href="#" class="sidebar-toggler pull-right visible-md visible-lg" data-toggle-class="app-sidebar-closed" data-toggle-target="#app">
			<i class="ti-align-justify"></i>
		</a>
		<a class="pull-right menu-toggler visible-xs-block" id="menu-toggler" data-toggle="collapse" href=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<i class="ti-view-grid"></i>
		</a>
	</div>
	<!-- end: NAVBAR HEADER -->

	<!-- start: NAVBAR COLLAPSE -->
	<div class="navbar-collapse collapse">
		<ul class="nav navbar-left y-nav">
			<ul class="nav navbar-right mar-r-0">
				<li class="current-user help">
					<a href="javascript:" data-type="mobile">
						<span class="username"><i class="fa fa-mobile" aria-hidden="true"></i></span>
						<span class="username">手机端</span>
					</a>
					<a href="javascript:" data-type="help">
						<span class="username"><i class="iconfont ic-help"></i></span>
						<span class="username">帮助</span>
					</a>
				</li>
				<li class="dropdown current-user">
					<a href class="dropdown-toggle" data-toggle="dropdown">
						<img class="portrait" src="style/icon/default_icon.jpg" alt="成功">
						<span class="username">成功</span>
						
						
						<span class="username" style="margin-top: 6px;"><i class="ti-settings"></i></span>
					</a>
					<ul class="dropdown-menu index-con-user">
						<li>
							<a href="javascript:" data-type="setBg">
								<i class="fa fa-gear"></i>设置主题
								<button ct-toggle="toggle" data-toggle-class="active" data-toggle-target="#settings" class="btn btn-default" style="opacity: 0;width: 123px;position: absolute;left: 0;">
									<i class="fa fa-spin fa-gear"></i>
								</button>
							</a>
						</li>
						<li>
							<a href="javascript:" data-type="pwd">
								<i class="iconfont ic-pencil"></i>设置账号
							</a>
						</li>
						<li>
							<a href="javascript:" data-type="logout">
								<i class="iconfont ic-sign-out"></i>注销
							</a>
						</li>
					</ul>
				</li>
				<!-- end: USER OPTIONS DROPDOWN -->
			</ul>
		</ul>
		<!-- start: MENU TOGGLER FOR MOBILE DEVICES -->
		<div class="close-handle visible-xs-block menu-toggler" data-toggle="collapse" href=".navbar-collapse">
			<div class="arrow-left"></div>
			<div class="arrow-right"></div>
		</div>
		<!-- end: MENU TOGGLER FOR MOBILE DEVICES -->
	</div>
	<!-- end: NAVBAR COLLAPSE -->
</header>
<!-- end: TOP NAVBAR -->
				<div class="main-content">
					<div class="wrap-content container" id="jx_content" style="margin-top: 10px">
					<!-- 首页结束 -->
					</div>
				</div>
			</div>
			
<!-- start: SETTINGS -->
<div class="settings panel panel-default hidden-xs hidden-sm" id="settings" style="top: 66px;">
	
		
	
	<div class="panel-heading">
		设置主题
		<button ct-toggle="toggle" data-toggle-class="active" data-toggle-target="#settings" class="btn btn-default" style="padding: 0;float: right;border: none;background: none;">
			<i class="fa  fa-gear"></i>
		</button>
	</div>
	<div class="panel-body">
		<!-- start: THEME SWITCHER -->
		<div class="colors-row setting-box">
			<div class="color-theme theme-1">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-1">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
			<div class="color-theme theme-2">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-2">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
		</div>
		<div class="colors-row setting-box">
			<div class="color-theme theme-3">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-3">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
			<div class="color-theme theme-4">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-4">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
		</div>
		<div class="colors-row setting-box">
			<div class="color-theme theme-5">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-5">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
			<div class="color-theme theme-6">
				<div class="color-layout">
					<label>
						<input type="radio" name="setting-theme" value="theme-6">
						<span class="ti-check"></span>
						<span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
						<span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
					</label>
				</div>
			</div>
		</div>
		<!-- end: THEME SWITCHER -->
	</div>
</div>
<!-- end: SETTINGS -->
		</div>
		<div>
			<input type="hidden" id="jx_first_page" value="1223884"/>
			<input type="hidden" id="jx_common_urole" value="0"/>
			<input type="hidden" id="jx_common_uid" value="5842" />
			<input type="hidden" id="jx_common_uname" value="成功"/>
			<input type="hidden" id="jx_common_deptid" value="3440"/>
			<input type="hidden" id="jx_common_deptname" value="行政部"/>
			<input type="hidden" id="jx_common_pdeptid" value="3439"/>
			<input type="hidden" id="jx_common_pdeptname" value="纵横八方集团公司"/>
			
			<input type="hidden" id="jx_pageSize" value=30000"/>
			<input type="hidden" id="jx_default_page" value="analyze/sshowLeaderjsp.do"/>
	    </div>
		


<!-- start: MAIN JAVASCRIPTS -->
<script type="text/javascript" src="./style/vendor/jquery/jquery.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/bootstrap/js/bootstrap.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/jquery/jquery.ui.core.js" charset="UTF-8"></script> 

<script type="text/javascript" src="./style/vendor/jquery-cookie/jquery.cookie.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/perfect-scrollbar/perfect-scrollbar.min.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/easyui/jquery.easyui.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/easyui/locale/easyui-lang-zh_CN.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/fullcalendar/lib/moment.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/fullcalendar/fullcalendar.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/fullcalendar/lang-all.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/colorPicker.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/echarts/dist/echarts.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/ajaxfileupload.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/base/main.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/base/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/base/jx.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/index/index.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/util/jxutil.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/assets/js/util/page.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/assets/js/util/tree.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/switchery/switchery.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/dialog/js/dialog.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/ueditor/ueditor.config.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/ueditor/ueditor.all.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/ueditor/lang/zh-cn/zh-cn.js" charset="UTF-8"></script>

<script type="text/javascript" src="./style/vendor/datepicker/js/foundation-datepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/datepicker/js/locale/foundation-datepicker.zh-CN.js"></script>

<script type="text/javascript" src="./style/vendor/daterangepicker/moment.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="./style/vendor/daterangepicker/daterangepicker.js" charset="UTF-8"></script>        

<!-- 头像 -->

	<script type="text/javascript" src="./style/vendor/fullAvatarEditor/swfobject.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./style/vendor/fullAvatarEditor/fullAvatarEditor.js" charset="UTF-8"></script>

<!-- end: MAIN JAVASCRIPTS -->
		<script>
			jQuery(document).ready(function() {
				Main.init();
				JXMenu.init();

				jx_sub_nav($('#jx_default_page').val());
			});
		</script>
	</body>
</html>