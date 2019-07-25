function rgb(){//rgb颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';
}
function color16(){//十六进制颜色随机, 8.toString(16)结果是8，不是08，因此要改一下
    var r = Math.floor(Math.random()*240 + 16);
    var g = Math.floor(Math.random()*240 + 16);
    var b = Math.floor(Math.random()*240 + 16);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    return color;
}
$(".tagcloud a").each(function (index, element) {
    $(element).css("background", rgb())
});