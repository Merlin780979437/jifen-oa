package com.jifen.oa.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jifen.oa.entity.User;

public interface UserMapper {
	/**
	 * 用户登录
	 * @param loginname
	 * @return
	 */
    public List<User> login(String loginname);

}