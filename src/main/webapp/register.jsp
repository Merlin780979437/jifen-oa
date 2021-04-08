<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if IE]><html class="ie"><![endif]-->
<!--[if !IE]><!-->
<html class="">
<!--<![endif]-->
<html class="">
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=9">
<head>
<base href="http://jixiaobao.com:80/jifen/">
<title>积分管理信息系统-注册</title>
<meta http-equiv="keywords" content="积分制管理">
<meta http-equiv="description" content="中企点击积分制管理软件，为打造世界级积分制管理软件和咨询服务而不断努力">
<link href="./style/bg/jx.ico" rel="shortcut icon">
<link href="./style/assets/css/login.css" rel="stylesheet" type="text/css" >
<link href="./style/assets/fonts/fontAwsome/font-awesome.min.css" rel="stylesheet" type="text/css" >
<link href="./style/vendor/iealert/css/style.css" rel="stylesheet" type="text/css" >
<script src="./style/vendor/jquery/jquery.min.js" type="text/javascript"></script>
<script src="./style/vendor/iealert/iealert.js" type="text/javascript"></script>
<script src="./style/assets/js/base/login.js" type="text/javascript"></script>
</head>
<body>
	<div>
		<div class="sign-head" style="height: 65px !important; background: #0683b1;color:  #fff; padding-left:  28px;line-height: 65px;">
			<b style="font-size: 30px;">&nbsp;积&nbsp;分&nbsp;制&nbsp;系&nbsp;统</b>
			
		</div>
	    <div class="sign-container js-sign-main">
	    	
	    	<div class="sign-main">
		    	<div class="sign-error js-sign-error">
					<span>&nbsp;</span>
				</div>
	    	    <div class="demo_head">
			        <h2 class="h2">完善以下信息，您将获取产品的试用</h2>
			        <p class="tit">请填写真实信息，以便我们的顾问能及时联系到您</p>
				</div>
				<div class="js-sign-form" data-type="email-sign">
					<form class="application-form" action="common/usignup.do?signType=mobile" method="post" 
					autocomplete="off">  
					    <input type="hidden" name="TOKEN" value="0b6ece5451581eac16a29c1c45d2deeb"/>
						<div class="sign-content">
							<div class="form-container">
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>姓名</label>
									<div class="col-sm-3">
										<input class="form-control sign-input" type="text" 
										name="APPLICANT_NAME" placeholder="请填写姓名" 
										data-options="required:true,msg:'姓名不能为空'" maxlength="50"/>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>手机</label>
									<div class="col-sm-3">
										<input class="form-control sign-input" type="tel" 
										name="MOBILE" placeholder="用于服务人员与您联系" 
										data-options="required:true,msg:'请输入有效手机号'" maxlength="11"/>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>验证码</label>
									<div class="col-sm-3">
										<input class="form-control-half sign-input" type="text" maxlength="6"
										name="MOBILE_VERIFY" placeholder="填写验证码" 
										data-options="required:true,msg:'验证码不能为空'"/>
										<div class="btn-getcode">
				                            <button type="button" class="timer-btn js-getVerifyCode">免费获取短信验证码</button>
				                        </div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>邮箱</label>
									<div class="col-sm-3">
										<input class="form-control sign-input" type="email" maxlength="50"
										name="EMAIL" placeholder="用于接收演示信息" 
										data-options="required:true,msg:'邮箱不能为空'"/>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>公司名称</label>
									<div class="col-sm-3">
										<input class="form-control sign-input" type="text" 
										name="COMPANY_NAME" placeholder="便于我们的顾问与您联系" 
										data-options="required:true,msg:'公司名称不能为空'" maxlength="100"/>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>公司规模</label>
									<div class="col-sm-3">
										<select class="form-select" name="COMPANY_SIZE" placeholder="请选择公司规模"
										data-options="required:true,msg:'公司规模不能为空'">
							                <option value="">--</option>
							                <option value="5人以下">5人以下</option>
							                <option value="6-10人">6-10人</option>
							                <option value="11-30人">11-30人</option>
							                <option value="31-50人">31-50人</option>
							                <option value="51-100人">51-100人</option>
							                <option value="100-200人">100-200人</option>
							                <option value="200人以下">200人以下</option>
							                <option value="200-300人">200-300人</option>
							                <option value="301-400人">301-400人</option>
							                <option value="401-500人">401-500人</option>
							                <option value="501-1000人">501-1000人</option>
							                <option value="1000人以上">1000人以上</option>
							            </select>
									</div>
								</div>
								<div class="form-group-textarea">
									<label class="col-sm-2 control-label">
										<b class="orange_font">*</b>需求描述</label>
									<div class="col-sm-3">
										<textarea class="col-sm-textarea sign-input ptb0" type="text" 
										name="REQUIREMENTS" placeholder="便于向您推荐哪些功能模块适合贵公司" 
										data-options="required:true,msg:'姓名不能为空'" maxlength="200"></textarea>
									</div>
								</div>
							</div>
							<div class="sign-btn-wrapper">
								<a href="javascript:" class="common-btn sign-btn" onclick="JXSignup.doApplication(this)">申请</a>
							</div>
						</div>
					</form>
			    </div>
	    	</div>
		</div>
		<div class="sign-footer"></div>
	</div>
</body>
<script>
$(document).ready(function(){
	if(!$('body').iealert()){
		JXSignup.init();
	}
});
</script>
</html>