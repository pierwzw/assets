//目录结构
$(function () {
    if ($(".article-detail").length > 0){
        $(".log-no").show()
    } else {
        $(".log-no").hide()
    }
})

$(".log-button").click(function () {
    $(".log-prompt").fadeToggle(300);
    if(!$('.log-prompt').is(':hidden')){
        $("#nav-cata").navScrollSpy({
            navContainer: '#nav-cata',
            current:"current",
            scrollSpeed: 50
        });
    }
})

/*$('.log-button').click(function(){//点击a标签
    if($('.log-prompt').is(':hidden')){//如果当前隐藏
        $('.log-prompt').show();//那么就显示div
    }else{//否则
        $('.log-prompt').hide();//就隐藏div
    }
})*/

//回到顶部
$(".scroll-h").click(function() {
    $("html,body").animate({scrollTop:0}, 200);
});
//去底部
$(".scroll-b").click(function() {
    $("html,body").animate({scrollTop:document.body.clientHeight + 'px'}, 200);
});
$(document).scroll(function(){
    var scroll_top =  $(document).scrollTop();
    if(scroll_top > 500){
        $(".layui-fixbar-top").show();
        $(".layui-fixbar-bottom").hide();
        /*$(".layui-fixbar-top").fadeIn(500)*/
    }else{
        $(".layui-fixbar-top").hide();
        $(".layui-fixbar-bottom").show();
        /*$(".layui-fixbar-top").fadeOut(500)*/
    }
});

$(".wxonline").hover(function () {
    $(".wx-prompt").show()
}, function () {
    $(".wx-prompt").hide()
})

// 反馈建议
layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

    //触发事件
    var active = {
        offset: function(othis){
            var type = othis.data('type'),text = othis.text();
            layer.open({
                type: 1,
                title: "反馈/建议",
                offset: type, //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                id: 'layerDemo'+type, //防止重复弹出
                content:
                    '<div class="dialog-body">' +
                        '<div class="dialog-box">' +
                            '<div class="fd-item clearfix">' +
                                '<label class="fd-lable f1">反馈类型 </label>' +
                                '<div class="item-content f1 ">' +
                                    '<ul class="clearfix">' +
                                        '<li id="feed" class="type-item fl active" onclick="changea(this)">功能建议</li>' +
                                        '<li id="bug" class="type-item fl noactive" onclick="changea(this)">bug反馈</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<div class="fd-item clearfix">' +
                                '<label class="fd-lable fl">' + "标题" + '</label>' +
                                '<div class="item-content fl">' +
                                    '<input id="fd-title" type="text" placeholder="请输入标题" class="input input-name">' +
                                '</div>' +
                            '</div>' +
                            '<div class="clearfix">' +
                                '<label class="fd-lable fl">' + "内容" + '</label>' +
                                '<div class="item-content fl">' +
                                    '<textarea rows="4" placeholder="请输入提交内容..." class="input textarea fd-content" oninput="checksum(100)"></textarea>' +
                                '</div>' +
                                '<div class="input_can" style="float: right;">' +

                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>',
                btn: ['提交', '取消'],
                btnAlign: 'r', //按钮居中
                shade: 0, //不显示遮罩
                yes: function(){
                    var title = $("#fd-title").val()
                    var content = $(".fd-content").val()
                    if (title.length === 0){
                        layer.msg('标题不能为空！');
                        return;
                    }
                    if (content.length === 0){
                        layer.msg('内容不能为空！');
                        return;
                    }
                    layer.closeAll();
                    layer.msg('感谢您的反馈和建议！', {
                        icon: 16,
                        shade: 0.01
                    });
                    var type = $(".active").attr("id")
                    $.get("/feedback", {type:type, title:title, content:content});
                },
                btn2: function(){
                    layer.closeAll();
                }
            });
        }
    };

    $(".scroll-fd").click(function(){
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
});
/* 一定要用到onthis */
function changea(onthis) {
    var $active = $(".active");
    if ($(onthis).attr("class") === "type-item fl noactive"){
        $(onthis).attr("class", "type-item fl active");
        $active.attr("class", "type-item fl noactive");
    }
}

function checksum(sum) {
    var inputedNum = $(".fd-content").val().length;     //这里可以用input,也可以keyup,总之就是事件监听
    var canInputNum = parseInt(sum - inputedNum);           //剩余可输入字数

    if (canInputNum > 0) {
        $(".input_can").html("你还可以输入" + canInputNum + "字");
    } else {
        $(".input_can").html("你还可以输入0字");
        $(".fd-content").val($(".fd-content").val().substring(0, sum));    //当输入500字后 无法再输入
    }
}

/*layui.use('util', function() {
        var util = layui.util;
        util.fixbar({
            top: true,
            css: {right: 15, bottom: 35},
            bgcolor: '#2a96ff !important;display:block;',
            showHeight: 100,
            click: function (/!*type*!/) {
                var type = $(".layui-fixbar-top").attr('lay-type');
                if (type === 'top') {
                    $(".layui-body").animate({//主要代码
                        scrollTop: 0
                    }, 200);
                }
            }
        });
    });*/