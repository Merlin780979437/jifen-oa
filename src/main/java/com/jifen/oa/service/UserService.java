package com.jifen.oa.service;

import java.util.Set;

import com.jifen.oa.entity.User;

public interface UserService {

	/**
	 * 通过用户名查询用户信息
	 * @param usercode
	 * @return
	 */
	public User login(String loginname);

}
