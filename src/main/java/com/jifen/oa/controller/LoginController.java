package com.jifen.oa.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jifen.oa.entity.User;
import com.jifen.oa.pojo.Result;
import com.jifen.oa.service.UserService;

@Controller
public class LoginController {

	@Autowired
	private UserService userSerivce;
	
	@RequestMapping("/login")
	@ResponseBody
	public Result login(String loginname, String password, HttpServletRequest request) {
		//1、判断当前用户是否存在
		User user = userSerivce.login(loginname);
		if (user == null) {
			return new Result(false, "当前用户不存在！");
		} else {
			if (user.getPwd().equals(password)) {
				
				request.getSession().setAttribute("user", user);
				return new Result(true, "登录成功！");
			} else {
				return new Result(false, "密码错误！");
			}
		}
		
	}
	
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request) {
		request.getSession().setAttribute("user", "");
		return "login";
	}
	
}
