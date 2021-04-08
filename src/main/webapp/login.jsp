<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>







<!DOCTYPE>
<!--[if IE]><html class="ie"><![endif]-->
<!--[if !IE]><!-->
<html class="">
<!--<![endif]-->
<head>

<base href="http://jixiaobao.com:80/jifen/">
<title>积分制管理系统</title>
<meta content="webkit" name="renderer" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache,no-store,max-age=0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="edge">
<meta http-equiv="keywords" content="积分制管理">
<meta http-equiv="description" content="中企点击积分制管理软件，为打造世界级积分制管理软件和咨询服务而不断努力">
<link href="./style/bg/jx.ico" rel="shortcut icon">
<link href="./style/assets/css/login.css" rel="stylesheet" type="text/css" >
<link href="./style/vendor/iealert/css/style.css" rel="stylesheet" type="text/css" >
</head>
<body>
    <div class="js-login-main">
		<form id="loginform" name="loginform" method="post" action="common/ulogin.do" autocomplete="off">	
			<div class="login-main">
				<div class="login-header">积分制管理系统<span style="font-size: 5px ;color: grey"><i> 2020V3.0</i></span></div>
				<div class="login-content">
					<div class="login-con" style="background: url(./style/bg/jifenlogin.jpg) no-repeat center;">
						<div class="login-box">
	                        <div class="login-portrait"><img src="./style/assets/images/login/portrait.jpg" /></div>
						    
						        
						        
							        <div class="login-username">
										<span class="login-icon">
											<i></i>
										</span>
										<input type="text" name="LOGINNAME" autocomplete="off" placeholder="电子邮件/手机号码"
										data-options="required:true,msg:'登录账号不能为空'"/> 
									</div>
									<div class="login-pass">
										<span class="login-icon">
											<i></i>
										</span>
										<input type="password" autocomplete="off" name="PASS" placeholder="密码"
										onpaste="return false" oncontextmenu="return false" oncopy="return false" 
										oncut="return false" data-options="required:true,msg:'登录密码不能为空'"
										onfocus="this.type='password'"/>
									</div>
									<div class="login-forget">
				                        <div class="jx-ckb">
											<label>
												<input type="checkbox" name="REMEMBER_ME"/><span></span>
											</label>
										</div>记住我
									    <a href="common/uforget.do">忘记密码？</a> 
								    </div>
									<div class="login-btn">
										<input type="button" value="登 录" onclick="JXLogin.doLogin()"/>
										<input type="button" value="注 册" onclick="JXSignup.toSignup()"/>
									</div>
						        
						    
						    <div class="login-error" id="err_msg"></div>
						</div>
					</div>
				</div>
			</div>
		</form>
	<div>
</body>
<script src="./style/vendor/jquery/jquery.min.js" type="text/javascript"></script>
<script src="./style/vendor/iealert/iealert.js" type="text/javascript"></script>
<script src="./style/assets/js/base/login.js" type="text/javascript"></script>
<script src="./style/vendor/sha1.js" type="text/javascript"></script>
<script>
    $(document).ready(function(){
        if(!$('body').iealert()){
            JXLogin.init();
            $("#err_msg").text(decodeURIComponent(decodeURIComponent('')));
            var remember_me = localStorage.getItem('param');
            if (remember_me) {
                var dataObj = JSON.parse(remember_me);
                if (new Date().getTime() - dataObj.time > 86400000*7) { //用户名密码保存 7天
                    localStorage.clear('param');
                }else{
                    $('input[name="REMEMBER_ME"]').attr("checked", true);
                    $('input[name="LOGINNAME"]').val(dataObj.user_name);
                    $('input[name="PASS"]').val(dataObj.user_passw);
                }
            }
        }
    });
</script>
</html>