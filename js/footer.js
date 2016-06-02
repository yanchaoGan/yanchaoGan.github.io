function footer(){
  document.write(' <footer class="footer"> \
        <div class="footercenter">  \
          ©2016 gychao 2016-05-01 <a href="#" onclick="showVersion()">v2.0.0</a>  \
        </div> \
    </footer>'
  )
}

// 在module 页面 点击了 版本。 就在这个页面刷新
function showVersion() {
  //console.log("version click");
  window.location.assign('../about/module.html'+'?'+'pagename=version');
}

// 处理音频
function dealAudio() {
  var audio = document.getElementById('audio');
  if (audio.paused) {
    audio.play();
  }else {
    audio.pause();
  }
}



// 获取当前 url name 参数值
// 要判断返回的数值
function GetQueryString(name)
{
    var url = window.location.search.substr(1);
    var p = unescape(url);// 解码后的参数

     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = p.match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

// 模版pageNmae
// 另外用作 加载文档 名称
var modulePageName;
function getTitle() {

  var pagename = GetQueryString('pagename');
  modulePageName = pagename;
  if (pagename == 'about') {
      document.write('<title>甘延超</title>');
  }else if (pagename == 'version') {
        document.write('<title>更新日志</title>');
  }
  else {
    if (pagename!=null) {
      var spagename = pagename.split('.')[0];
      document.write('<title>'+spagename+'</title>');
    }
  }
}


function loadContent(){
  var filepath;
  if (modulePageName == 'about') {
    filepath = "../log/about.txt"; // 关于
  }else if (modulePageName == 'version') {
    filepath = "../log/version.txt" // 版本
  }else {
    filepath = '../blog/message/'+modulePageName;
  }
  loadRequest(filepath,function(result){
    // console.log(result);
     $('#moduleContent').html(result);
  });
}


// for duoshuo
function duoshuo(){
  if (modulePageName == 'about' || modulePageName == 'version') {
    return;
  }
  document.write('<div class="dsmodule">  \
    <!-- 多说评论框 start -->  \
    <div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID"   \
    data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>  \
    <!-- 多说评论框 end -->  \
  </div>');

  // <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
    var spagename = modulePageName.split('.')[0];
    var id = md5(spagename);
    var title = spagename;
    var url = document.location;
    var ob = document.getElementsByClassName('ds-thread')[0];
    ob.setAttribute('data-thread-key',id);
    ob.setAttribute('data-title',title);
    ob.setAttribute('data-url',url);
    duoshuoQuery = {short_name:"yanchaogan"};
      (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
      })();
  // <!-- 多说公共JS代码 end -->
}
