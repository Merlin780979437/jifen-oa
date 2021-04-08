package com.jifen.oa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.jifen.oa.dao.UserMapper;
import com.jifen.oa.entity.User;
import com.jifen.oa.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public User login(String loginname) {
		//通过用户名查询用户信息集合
		List<User> userList = userMapper.login(loginname);
		
		if (CollectionUtils.isEmpty(userList)) {
			return null;
		} else {
			return userList.get(0);
		}
	}

}
