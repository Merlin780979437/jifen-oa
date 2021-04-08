'use strict';
/**
* 系统列表组件
*/
var JXTable = function(){
    var self = this;
    self.cfg = {
        list_tab: 'jx_list_table',//数据列表表格ID
        list_tr: 'jx_tr',//数据列表tr ID
        page_tab: 'jx_page_table',//数据列表分页ID
        page_size: 'jx_page_pagesize',//数据列表每页显示记录数ID
        page_psize: parseInt($('#jx_pageSize').val()),//默认每页记录数
        visible_color: true//是否隔行换色
    };
};

/**
* 初始加载
* @param data列表数据
* @param pageparm列表配置
*/
JXTable.prototype.init = function(data, pageparm) {
    var self = this;
    var cfg = $.extend({}, self.cfg, pageparm);
    
    var tabId = cfg.list_tab;
    var $tab = $('#'+tabId);
    
    var trId = cfg.list_tr;
    var trlen = $tab.find('tr:gt(0)').length;
    var pageSize = data.page.psize;
    if(pageparm){
        $("#"+pageparm.list_tab).nextAll("#errorCons").remove();
        $("#"+pageparm.list_tab).find("#errorCons").remove();
        $("#"+tabId).nextAll("#errorCons").remove();
    }else{
        $("#errorCons").remove();
    }
    if(data.page.count == 0){
        //pageSize = 10;
        $tab.after('<div id="errorCons" style="padding: 15px;text-align: center;">暂无数据</div>')
    }
    if(trlen > pageSize){
        $tab.find('tr:gt('+pageSize+')').remove();
    }
    
    for ( var i = trlen; i < pageSize; i++) {

        var $tr = $('#'+trId).clone();
        $tr.removeAttr('id');
        $tr.css('display', '');

        if (i % 2 == 0) {
            if(cfg.visible_color)
                $tr.addClass('list_hui');
        } else {
            $tr.addClass('list_bai');
        }
        if(i < data.page.count){
            $tab.append($tr);
        }
    }
};

/**
* 加载表格数据
* @param url请求链接
* @param opts请求参数
* @param $fill列表数据填充方法
* @param popts列表分页参数
*/
JXTable.prototype.loadData = function(url, opts, $fill, popts){
    var self = this;
    var cfg =  $.extend({}, self.cfg, popts);

    var tabId = cfg.list_tab;;  
    var $tab = $('#'+tabId);
    var psizeId = cfg.page_size;//每页显示记录数选择ID
    var $psize = $('#'+psizeId);

    var psize = cfg.page_psize;//每页显示记录数
    if($psize.length)
        psize = parseInt($.trim($psize.html()));
    
    opts.S_PSIZE = psize;

    var trlen = $tab.find('tr').length - 1;

    jx_ajax_json(url, opts, function(data, status) {
        var dataPsize = data.page.psize;
        if (trlen != data.page.count) {
            self.init(data, popts);
        }
        
        var $tr = $tab.find('tr:eq(0)');
        $tr = $tr.next();
        var num = 0;
        $(data.list).each(function(i, ddd) {
            num = i + 1;
            $fill($tr, ddd);
            $tr = $tr.next();
        });
        if (num < dataPsize) {
            $tab.find('tr:gt(' + num + ')').children().empty();
            $tab.find('tr:gt(' + num + ')').remove();
        }

        var pageOpts = {
            visiblePages: 4,
            currentPage: data.page.cur,
            pageSize: psize,
            totalCounts: data.page.count,
        };
        pageOpts = $.extend({}, pageOpts, popts);

        new JXPage($tab, pageOpts);
    });
};


/**
* 系统分页组件
*/
var JXPage = function (el, options) {
    if(options.pageSize>options.totalCounts){
        el.siblings('.jx-pagenav').remove();
        return false;
    }
    if(!(this instanceof JXPage)){
        return new JXPage(el, options);
    }

    var self = this;

    el.siblings('.jx-pagenav').remove();
    var $page = $('<div class="jx-pagenav tr pa-r-10"><ul class="jx-page pagination-sm pagination" style="margin:10px 0;"></ul></div>');
    $page.insertAfter(el);

    self.$container = $page.find('.jx-page');

    self.$container.data('JXPage', self);

    /**
    * 组件默认配置
    */
    self.defaultOptions = {
    	bg: '',
        wrapper: '',
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        last: '<li class="last"><a href="javascript:;">尾页</a></li>',
        page: '<li class="pagebox"><a href="javascript:;">{{page}}</a></li>',
        pageTotal: '<span>共有{{totalCounts}}条数据</span>',
        /*pageJump: '<li class="pagejump-box">'+
                  '<span class="pagejump">'+
                  '<label>'+
                  '<input type="text" name="custompage" size="3" title="输入页码，按回车快速跳转" value="{{currentPage}}">'+
                  '<span title="共{{totalPages}}页"> /{{totalPages}} 页</span>'+
                  '</label>'+
                  '</span>'+
                  '</li>',
        pageSelect: '<li class="pagesize-box">'+
                    '<div class="page-dropdown" tabindex="1">'+
					'<span id="jx_page_pagesize">20</span>'+
					'<ul class="dropdown">'+
					'<li>10</li>'+
					'<li>20</li>'+
					'<li>30</li>'+
					'<li>40</li>'+
					'</ul>'+
				    '</div>'+
				    '</li>',*/
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 1,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
    };

    /**
    * 初始化加载
    */
    self.init = function() {
        if (options.first || options.prev || options.next || options.last || options.page) {
            options = $.extend({}, {
                first: '',
                prev: '',
                next: '',
                last: '',
                page: ''
            }, options);
        }

        self.options = $.extend({}, self.defaultOptions, options);

        var $pagenav = el.next('.jx-pagenav');
        var $pagebg = self.options.bg;
        if($pagebg){
        	$pagenav.addClass($pagebg);
        }

        self.extendJquery();
        self.verify();
        self.render();
        self.fireEvent(this.options.currentPage, 'init');
    };

    /**
    * 校验数据
    */
    self.verify = function () {
        var opts = self.options;
        
        if (opts.totalCounts && opts.pageSize) {
            opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
        }

       /* if (!self.isNumber(opts.totalPages)) {
            throw new Error('[JXPage] type error: totalPages');
        }

        if (!self.isNumber(opts.totalCounts)) {
            throw new Error('[JXPage] type error: totalCounts');
        }

        if (!self.isNumber(opts.pageSize)) {
            throw new Error('[JXPage] type error: pageSize');
        }

        if (!self.isNumber(opts.currentPage)) {
            throw new Error('[JXPage] type error: currentPage');
        }

        if (!self.isNumber(opts.visiblePages)) {
            throw new Error('[JXPage] type error: visiblePages');
        }

        if (!opts.totalPages && !opts.totalCounts) {
            throw new Error('[JXPage] totalCounts or totalPages is required');
        }

        if (!opts.totalPages && !opts.totalCounts) {
            throw new Error('[JXPage] totalCounts or totalPages is required');
        }

        if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
            throw new Error('[JXPage] pageSize is required');
        }

        if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
            throw new Error('[JXPage] currentPage is incorrect');
        }

        if (opts.totalPages < 1) {
            throw new Error('[JXPage] totalPages cannot be less currentPage');
        }*/
    };

    /**
    * 获取分页组件中每一元素html
    */
    self.extendJquery = function () {
        $.fn.jxPageHTML = function (s) {
            return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
        };
    };


    /**
    * 加载组件元素html、是否显示、绑定点击事件
    */
    self.render = function () {
        self.renderHtml();
        self.setStatus();
        self.bindEvents();
    };

    /**
    * 加载分页组件中相应元素
    */
    self.renderHtml = function () {
        var html = [];

        var pages = self.getPages();
        for (var i = 0, j = pages.length; i < j; i++) {
            html.push(self.buildItem('page', pages[i]));
        }
        
        self.isEnable('prev') && html.unshift(self.buildItem('prev', self.options.currentPage - 1));
        self.isEnable('first') && html.unshift(self.buildItem('first', 1));
        self.isEnable('pageNum') && html.unshift(self.buildItem('pageNum'));
        self.isEnable('pageTotal') && html.unshift(self.buildItem('pageTotal'));
        self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
        self.isEnable('pageJump') && html.push(self.buildItem('pageJump'));
        self.isEnable('next') && html.push(self.buildItem('next', self.options.currentPage + 1));
        self.isEnable('last') && html.push(self.buildItem('last', self.options.totalPages));
        self.isEnable('pageSelect') && html.push(self.buildItem('pageSelect'));

        if (self.options.wrapper) {
            self.$container.html($(self.options.wrapper).html(html.join('')).jxPageHTML());
        } else {
            self.$container.html(html.join(''));
        }
    };

    /**
    * 获取分页组件元素HTML
    */
    self.buildItem = function (type, pageData) {
        var html = self.options[type]
            .replace(/{{page}}/g, pageData)
            .replace(/{{totalPages}}/g, self.options.totalPages)
            .replace(/{{totalCounts}}/g, self.options.totalCounts)
            .replace(/{{currentPage}}/g, self.options.currentPage);

        switch(type){
           case 'pageSelect':
                var $html = $(html);
                var $pageSize = self.options.pageSize;
                var $dropdown = $html.find('.page-dropdown');
                $dropdown.children('span').html($pageSize);
                
                var $items = $dropdown.find('ul.dropdown > li');
                for(var i = 0, len = $items.length; i < len; i++){
                	var $item = $($items[i]);
                	var $text = $.trim($item.text());
                	if($pageSize == $text){
                        $item.addClass('current');
                	}
                }
                return $html[0].outerHTML;;  
            break;
            case 'pageTotal':
            case 'pageJump':
            case 'pageNum':
                return html;  
            break;
            default:
                return $(html).attr({
                    'data-role': type,
                    'data-num': pageData
                }).jxPageHTML();
            break;
        }
    };

     /**
    * 设置分页组件元素状态(显示、影藏)
    */
    self.setStatus = function () {
        var options = self.options;

        if (!self.isEnable('first') || options.currentPage === 1 || !options.currentPage) {
            $('[data-role=first]', self.$container).addClass(options.disableClass);
        }
        if (!self.isEnable('prev') || options.currentPage === 1 || !options.currentPage) {
            $('[data-role=prev]', self.$container).addClass(options.disableClass);
        }
        if (!self.isEnable('next') || options.currentPage >= options.totalPages) {
            $('[data-role=next]', self.$container).addClass(options.disableClass);
        }
        if (!self.isEnable('last') || options.currentPage >= options.totalPages) {
            $('[data-role=last]', self.$container).addClass(options.disableClass);
        }

        $('[data-role=page]', self.$container).removeClass(options.activeClass);
        $('[data-role=page][data-num=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
    };

     /**
    * 获取分页组件相关数值
    */
    self.getPages = function () {
        var pages = [],
            visiblePages = self.options.visiblePages,
            currentPage = self.options.currentPage,
            totalPages = self.options.totalPages;

        if (visiblePages > totalPages) {
            visiblePages = totalPages;
        }

        var half = Math.floor(visiblePages / 2);
        var start = currentPage - half + 1 - visiblePages % 2;
        var end = currentPage + half;

        if (start < 1) {
            start = 1;
            end = visiblePages;
        }
        if (end > totalPages) {
            end = totalPages;
            start = 1 + totalPages - visiblePages;
        }

        var itPage = start;
        while (itPage <= end) {
            pages.push(itPage);
            itPage++;
        }

        return pages;
    };

    self.isNumber = function (value) {
        var type = typeof value;
        return type === 'number' || type === 'undefined';
    };

    self.isEnable = function (type) {
        return self.options[type] && typeof self.options[type] === 'string';
    };

    /**
    * 切换页码数据
    */
    self.switchPage = function (pageIndex) {
    	jx_com_page_cur = pageIndex;

        var opts = self.options;
        if (opts.refresh) {//页面列表数据刷新
            opts.refresh();
        } else {
        	jx_com_page_refresh_function();
        }
    };

    self.fireEvent = function (pageIndex, type) {
        return (typeof self.options.onPageChange !== 'function') 
        || (self.options.onPageChange(pageIndex, type) !== false);
    };

    self.callMethod = function (method, options) {
        switch (method) {
            case 'option':
                self.options = $.extend({}, self.options, options);
                self.verify();
                self.render();
                break;
            case 'destroy':
                self.$container.empty();
                self.$container.removeData('JXPage');
                break;
            default :
                throw new Error('[JXPage] method "' + method + '" does not exist');
        }

        return self.$container;
    };

    self.bindEvents = function () {
        var opts = self.options;

        self.$container.off();

        //页码点击
        self.$container.on('click', '[data-role]', function () {
            var $el = $(this);
            if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                return;
            }

            var pageIndex = +$el.attr('data-num');
            if (self.fireEvent(pageIndex, 'change')) {
                self.switchPage(pageIndex);
            }
        });
        
        //页码跳转
        self.$container.on('keyup', 'input', function () {
            var $el = $(this);
            var minPages = 1;
            var maxPages = self.options.totalPages;
            var event = window.event || arguments.callee.caller.arguments[0];  
            if (event.keyCode == 13) {  
                var $value = $el.val();

                if(!self.isNumber($value) && $value < 1){
                    $el.val(minPages);
                }

                if(!self.isNumber($value) && $value > maxPages){
                    $el.val(maxPages);
                }

                var pageIndex = $el.val();

                if (self.fireEvent(pageIndex, 'init')) {
                    self.switchPage(pageIndex);
                }
            }  
        });

        //每页显示记录数
        $('.pagesize-box').on('click', function(){
        	var $dropdown = $('.page-dropdown');
        	var $span = $dropdown.children('span');
        	var $items = $dropdown.find('ul.dropdown > li');

        	$dropdown.toggleClass('active');
        	$items.on('click', function(){
        		var $this = $(this);
        		$span.text($.trim($this.text()));
        		
        		$dropdown.toggleClass('active');
        		self.switchPage(self.options.currentPage);
        	});
        });
    };

    self.init();

    return self.$container;
};