/*
  js 自定义拓展
  author gyc
*/

// $(string id)
var $ = function(id){
  return document.getElementById(id);
}


// style 只能获取內联样式表，所以要用currentStyle属性，而currentStyle在FireFox下
// 不支持
function getJsStyle(id,styleName){
  var p = $(id);
  if (p.currentStyle) {
    console.log('ie');
      return  $(id).currentStyle[styleName]
  }else {
    // ff
    console.log('ff');
    var $arr =$(id).ownerDocument.defaultView.getComputedStyle($(id),null);
    return $arr[styleName];
  }
}

// 更新类名
function updateClass(id,classname){
  $(id).className = classname;
}



/*
pagenae：
about 关于
filename 博客相关
*/
function openNew(pagename) {
  // window 打开一个新窗口，
  // 现在一般浏览器 默认都会打开一个新的标签页来取代 新窗口
  var p = 'pagename='+pagename;
  p = escape(p); // escape 编码
  window.open("../about/module.html"+'?'+p);
}
