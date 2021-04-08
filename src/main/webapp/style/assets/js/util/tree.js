'use strict';

/**
* 加载机构树
*/
function jx_common_load_orgtree(tree_click, tree_cls, opts) {
	var treeCName = '.jx_org_tree';
	if (tree_cls) treeCName = tree_cls;
    //节点ID
    var $nodeId = '';
    if (opts && opts.nodeId) {
    	$nodeId = opts.nodeId
    }

    //树类型
    var $treeType = '';
    if (opts && opts.treeType) {
    	$treeType = opts.treeType
    }

    var treeList = $(treeCName);
    var treeParam = {};
    if (opts && opts.integral_base) {
    	treeParam.integral_base = 1;
    }
	if (treeList.length) {
		for (var i = 0 ; i < treeList.length; i++) {
			if($(treeList[i]).find("ul").length > 0){
				//continue;
			}
			//默认选择
			var tree_val = $(treeList[i]).attr("tree_val");
			if (!tree_val) tree_val = "";
			
			$(treeList[i]).empty();
			var tmp = $("<ul value='"+tree_val+"'></ul>");
			$(treeList[i]).append(tmp);
			
			var isShowUser = $(treeList[i]).attr("isshowuser");
			if (isShowUser == undefined) isShowUser = 0;
			treeParam.isShowUser = isShowUser;

			var isTeam = $(treeList[i]).attr("isTeam");
			if (isTeam == undefined) isTeam = 0;
			treeParam.isTeam = isTeam;

			var deptId = $(treeList[i]).attr("dept_id");
			if (!deptId) deptId = '';
			treeParam.DEPT_ID = deptId;

            // 分管领导
			var isContrlRole = $(treeList[i]).attr("isContrlRole");
			if (!isContrlRole) isContrlRole = '';
			treeParam.isContrlRole = isContrlRole;

			//new 分管领导
            var dept_charge = $(treeList[i]).attr("dept_charge");
            if (!dept_charge) dept_charge = '';
            treeParam.DEPT_CHARGE = dept_charge;

            // 一人多岗
			var userPost = $(treeList[i]).attr("user_post");
			if (!userPost) userPost = '';
			treeParam.USER_POST = userPost;

			jx_ajax_json("common/qqueryOrgTree.do", treeParam, function(data,s){
                $(tmp).tree({
					data: data,
					lines: true,
					onClick: function(node) {
						tree_click(node);
					},
					onLoadSuccess: function(node,data){
						jx_orgtree_selected(treeCName, $nodeId, $treeType);
					}
				});
			});
		}
	}
}

/**
 * 加载当前部门在机构树是已选择状态
 * @param treeCName树class
 * @param nodeId节点ID
 * @param treeType树类型
 */
function jx_orgtree_selected(treeCName, nodeId, treeType){
	var $tree = $(treeCName+' ul:eq(0)');
	if(nodeId){//单位积分
		var $node = $tree.tree('find', nodeId);
		if(nodeId == 0){
			var $node = $(treeCName).find("ul:eq(0)").tree('getRoot');
		}
		if($node){
			$tree.tree('select', $node.target);
			jx_orgtree_selected_load(treeType);
		}else{
			jx_orgtree_unselected_load($tree, treeType);
		}
	}else{
		jx_orgtree_unselected_load($tree, treeType);
	}
}

/**
 * 加载树数据(树已未选择)
 * @param type树类型
 */
function jx_orgtree_selected_load(type){
	if(type){
		switch(type){
			case 'deptIntegral':
				jx_integral_deptIntegral_load();
				break;
			default:
				break;
		}
	}
}

/**
 * 加载特殊处理树数据(树还未选择)
 * @param $tree树
 * @param type树类型
 */
function jx_orgtree_unselected_load($tree, type){
	if(type){
		switch(type){
			case 'integralLeader'://领导分析——月度积分对比
				var treeChilds = $tree.tree('getChildren');
				if(treeChilds){
					var child = treeChilds[1];
					var childID = child.id;
					var childName = child.text;
					$tree.tree('select', child.target);
					$('#DEPTID').val(childID);
					$('#DEPTNAME').val(childName);
					$('.integralDeptName').html(childName);
					jx_integral_integralStatis_leaderAnalysis_loadData();
				}
				break;
			case 'integralLeaderDept'://领导分析——班组积分对比
				var treeChilds = $tree.tree('getChildren');
				if(treeChilds){
					var child = treeChilds[1];
					var childID = child.id;
					var childName = child.text;
					$tree.tree('select', child.target);
					$('#DEPTID').val(childID);
					$('#DEPTNAME').val(childName);
					$('.integralDeptName').html(childName);
					jx_integral_integralStatis_deptCompare_loaddata();
				}
				break;
			case 'integralRankLeader'://领导分析——积分得分排名分析
				var treeRoot = $tree.tree('getRoot');
				$tree.tree('select', treeRoot.target);
				jx_integral_scorerank_init();
				break;
			case 'deptIntegral'://单位积分
				var treeChilds = $tree.tree('getChildren');
				if(treeChilds){
					var child = treeChilds[1];
					var childID = child.id;
					var childName = child.text;
					$tree.tree('select', child.target);
					$('#DEPTID').val(childID);
					$('#DEPTNAME').val(childName);
					jx_integral_deptIntegral_load();
				}
				break;
			default:
				break;
		}
	}
}

/**
* 加载人员树
*/
function jx_common_load_usertree(tree_click, tree_cls, opts) {
    var treeCName = '.jx_org_post_user_tree';
	if (tree_cls) treeCName = tree_cls;
	var tree = $(treeCName);
    var param = {}
    if (opts && opts.DEPT_CHARGE) {
            param.DEPT_CHARGE = opts.DEPT_CHARGE;
    }
	if (tree.length > 0) {
		tree.empty();
		var tmp = $("<ul></ul>");
		tree.append(tmp);

		jx_ajax_json("common/qqueryUserPostTree.do",param, function(data,s){
            $(tmp).tree({
				data: data,
				lines: true,
				onClick: function(node) {
					tree_click(node);
				},
				onLoadSuccess: function(node,data){  
					//初始化加载岗位树完后根节点为已选择状态
					var userRoot = tree.find("ul:eq(0)").tree('getRoot');
					tree.find("ul:eq(0)").tree("select", userRoot.target); 

					//设置公司信息
					$('#jx_user_select_condition_company').val(userRoot.id)
					.prop('data-name', userRoot.text);
				}
			});
		});
	}
}

/**
* 岗位树
*/
function jx_common_load_posttree(tree_click, tree_cls, opts, isSelected) {
	var treeCName = '.jx_org_orgpost_tree';
	if (tree_cls) treeCName = tree_cls;
	
	var tree = $(treeCName);
	
	if (tree.length) {
		tree.empty();
		var tmp = $("<ul></ul>");
		tree.append(tmp);

		jx_ajax_json("common/qqueryOrgPostTree.do", {}, function(data,s){
			$(tmp).tree({
				data: data,
				lines: true,
				onClick: function(node) {
					tree_click(node);
				},
				onLoadSuccess:function(node,data){  
					//初始化加载岗位树完后根节点为已选择状态
					if(isSelected){
						var postCondition = $('#jx_post_conditions').val();
						var postTree = $('.jx_org_orgpost_tree ul:eq(0)');
						if(!postCondition){
							var postRoot = postTree.tree('getRoot');
							postTree.tree('select', postRoot.target); 
						}else{
							var node = postTree.tree('find', postCondition);
							if(node){
								postTree.tree('select', node.target);
								postTree.tree('expand', node.target);	
							}
						}
					}
				}
			});
		});
	}
}

/**
 * 加载兼职岗位数据
 */
function jx_common_load_deputyPostTree($treeCls, $values) {
    var _treeCls = '.jx_common_orgpost_tree';

	if ($treeCls) _treeCls = $treeCls;

    var postTree = $(_treeCls);
	if (postTree.length) {

		postTree.empty();
		postTree.combotree({
			url: 'post/qqueryPostTree.do',
			onBeforeSelect: function(node) {
                return false;
			},
			onLoadSuccess: function(node, data) {
				//展开所有节点 
		        for (var i = 0; i < data.length; i++) {
		            var node = postTree.combotree('tree').tree('find', data[i].id);            
		            postTree.combotree('tree').tree('expandAll', node.target);
		        }

		        //给岗位树赋值
				if ($values) {
                    postTree.combotree('setValues', $values.split(','));
				}
	        },
            onlyLeafCheck: true,//子叶子节点才显示复选框
			multiple: true,
			panelHeight: '300',
			lines: true
		});
	}
}

/**
* 加载数据字典
*/
function jx_common_load_typetree(tree_click, tree_cls, opts, tree_menu) {
    var treeCName = '.jx_type_tree';
	if (tree_cls) treeCName = tree_cls;
	
	var treeList = $(treeCName);

	if (treeList.length > 0) {
		
		for(var i = 0; i < treeList.length; i++){
			//默认选择
			var tree_val = $(treeList[i]).attr("tree_val");
			if (!tree_val) tree_val = "";
			
			//id
			var tree_id = $(treeList[i]).attr("tree_id");
			
			//是否显示右键菜单
			var show_menu = $(treeList[i]).attr("show_menu");
			$(treeList[i]).empty();
			
			//创建树
			var tmp = $("<ul value='"+tree_val+"' id='"+tree_id+"'></ul>");
			$(treeList[i]).append(tmp);
			//分类标示
			var modelflag = $(treeList[i]).attr("modelflag");
			
			var param = {
				MODELFLAG: modelflag
			};
			if($(treeList[i]).attr("rootName")){
			    param.ROOTNAME = $(treeList[i]).attr("rootName");
			}

			jx_ajax_json("common/qquerytree.do", param, function(data,s){
				$(tmp).tree({
					data: data,
					onClick: function(node) {
						tree_click(node);
					},
					lines: true,
					animate: true,
					onContextMenu:function(e,node){
						if(show_menu == 1){
							tree_menu(e, node, $(this));
						}
					}
				});
			});
		}
	}
}

/**
* 组织机构 comboxtree
* 1、在输入框中进行组织机构选择
* tree_click：点击选择事件
* opts：条件(class val is_multi)
*/
function jx_common_load_orgBoxTree(tree_click, opts) {
    var _treeCls = '.jx_common_orgBoxTree';

	if (opts.tree_cls) _treeCls = opts.tree_cls;

    // 是否显示复选框
	var ckb_flag = false;
	if (opts.is_multi) ckb_flag = true;

    // 是否可下拉选择
	var disabled_flag = false;
	if (opts.disabled) disabled_flag = opts.disabled;

	var param = {
		box_tree: 1
	};

	if (opts.dept_id) {
		param.DEPT_ID = opts.dept_id;
		param.SHOW_USER = 1;
	}

	if (opts.dept_type) param.DEPT_TYPE = opts.dept_type;

    var tree = $(_treeCls);
	if (tree.length) {

		tree.empty();
		tree.combotree({
			url: 'common/qqueryOrgTree.do?'+$.param(param),
			onBeforeSelect: function(node) {
                return false;
			},
			disabled: disabled_flag,
			onLoadSuccess: function () {
				if (opts.vals) {
					if (ckb_flag) {
                        tree.combotree('setValues', opts.vals.split(','));
					} else {
						tree.combotree('setValue', opts.vals);
					}
				} else {
					tree.combotree('setText', '--请选择--');
				}

				if (opts.success_func) {
					opts.success_func();
				}
            },
            onBeforeExpand: function(){},
            onBeforeCollapse: function(row, param) {},
	        onClick: function(node) {
				tree_click(node);
			},
			panelHeight: '300',
			panelWidth: '230',
			multiple: ckb_flag,
			lines: true
		});
	}
}