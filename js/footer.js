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
  console.log("version click");
  window.location.assign('../about/module.html'+'?'+'pagename=version');
}

// 处理音频
function dealAudio() {
  var audio = document.getElementById("audio");
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
      document.write('<title>'+pagename+'</title>');
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
    filepath = '../blog/message/'+modulePageName+'.txt';
  }
  loadRequest(filepath,function(result){
     $('moduleContent').innerHTML = result;
  });
}
