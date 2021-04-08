package com.jifen.oa.pojo;

import java.io.Serializable;
import java.util.List;

public class PageResult implements Serializable {

	private static final long serialVersionUID = -9110655686191584922L;
	private Integer total;
	private List rows;
	
	public PageResult() {
		super();
	}
	
	public PageResult(Integer total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}
	
}
