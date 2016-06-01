
function showAnimate(){
  var classNameOfIndex = document.getElementById('index').className;
  if (classNameOfIndex.indexOf('moveindex') == -1){
    document.getElementById('index').className = classNameOfIndex + ' '+'moveindex';
  }else {
    console.log('已经更改了class');
  }
  // $('#index').animate({width:"100px"});
}


function showHome(){
  window.location.reload();
}



// // 统计次数
// function getcount(filepath,) {
//
// }

// 保存文件
function savefile(filename,content)
{
//   myWindow=window.open('','','left=200,top=100');
// myWindow.document.write("This is 'myWindow'");
// myWindow.execCommand
    // window.open('','','top=10,left=10');
    // win.document.write(content);
    // win.document.execCommand('SaveAs','',filename);
    // win.close();
}


function test(a,b,c) {
  alert('a = '+ a+' b='+b+' c='+c);
}

/*
// innerstr = innerstr + "<li class='bloglistitem'> \
//           <div class='bloglistitemcontain'>  \
//               <p class='blogtitleinfo'>"
//               +
//                 filename
//               	+
//               '</p>	'
//               +
//                 '<span class="blogtitletime">'	+
//                 filedate
//                 +'</span>'+
//               '<hr />	\
//               <p class="blogdesinfo">'+
//                 filedes+
//               '</p>	\
//               <button  class="blogMore" type="button" name="button"> \
//                  阅读更多	\
//                </button>		\
//           </div>		\
//         </li>'
// successcount+=1;
// if (successcount == myobj.length) {
//   //全部请求成功
//   //console.log('innerstr is ' + innerstr);
//   $('bloglist').innerHTML = innerstr;
// }
},i);
*/
// 先创建 li node
function createNode(filename,filedate,filedes) {
  var linode = document.createElement('li');
  linode.setAttribute("filedate",filedate);
  linode.setAttribute('class','bloglistitem')
    var div = document.createElement('div');
    div.setAttribute('class','bloglistitemcontain');
      var p = document.createElement('p');
      p.setAttribute('class','blogtitleinfo');
      var text = document.createTextNode(filename);
      p.appendChild(text);
    div.appendChild(p);
      var span = document.createElement('span');
      span.setAttribute('class',"blogtitletime");
      var text = document.createTextNode(filedate);
      span.appendChild(text);
    div.appendChild(span);
      var hr = document.createElement('hr');
    div.appendChild(hr);
      var p = document.createElement('p');
      p.setAttribute('class','blogdesinfo');
      p.innerHTML = filedes;
      var text = document.createTextNode(filedes); //这样对文档中的标签就不识别了
      p.appendChild(text);
    div.appendChild(p);
      var button = document.createElement('button');
      button.setAttribute('class','blogMore');
      button.setAttribute('type','button');
      button.setAttribute('name','button');
      var text = document.createTextNode('阅读更多');
      button.appendChild(text);
      button.onclick = function(){
        // alert(filename);
        // 这里的这个this 就是 button node
        // //console.log(this.getAttribute('class'));
        openNew(filename);
      };
    div.appendChild(button);
    //   var hr = document.createElement('hr');
    //   hr.setAttribute('style','{  border-top-width: 1px; \
    //      border-top-style: solid;\
    //      border-top-color: #fefefe;\
    //      width: 50%;\
    //      position: relative;\
    //      left: 25%;}');
    //   hr.setAttribute('width','50%');
    // div.appendChild(hr);
  linode.appendChild(div);

  return linode;
}

function sideBlog(){

  // 1、可以用jQuery代替
  // 引用jQuery后，使用$(".ClassName")等方法获取元素。
  // ie8 http://www.xuebuyuan.com/2139615.html
  // if (!window.console || !console.firebug){
  //     var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
  //
  //     window.console = {};
  //     for (var i = 0; i < names.length; ++i)
  //         window.console[names[i]] = function() {}
  // }
  //
  // // ie8 classname http://www.songker.com/index.php/post/55.html
  // //解决IE8之类不支持getElementsByClassName
  // if (!document.getElementsByClassName) {
  //     document.getElementsByClassName = function (className, element) {
  //         var children = (element || document).getElementsByTagName('*');
  //         var elements = new Array();
  //         for (var i = 0; i < children.length; i++) {
  //             var child = children[i];
  //             var classNames = child.className.split(' ');
  //             for (var j = 0; j < classNames.length; j++) {
  //                 if (classNames[j] == className) {
  //                     elements.push(child);
  //                     break;
  //                 }
  //             }
  //         }
  //         return elements;
  //     };
  // }

  if (!document.getElementsByClassName || !window.console){
    alert('请使用浏览器 极速模式 访问页面');
  }

  var p =  "./blog/list.json"; // 这里的path 路径，难道是调用此函数的 index.html 为当前路径 .
  //console.log('$$$$$$');
  loadRequest(p,function(result){
    var myobj =  eval(result); // 转化为 json 对象了
    var innerstr = '';

    var filename,
        filedate,
        filepath,
        filedes;
    var successcount = 0;
    //console.log(myobj);
    for(var i=0;i<myobj.length;i++){
      filepath = myobj[i].filepath;
      filename = myobj[i].filename;
      filepath = '.'+filepath;// 使用相对路径
      //console.log(filename);
      loadRequest(filepath,function(result,index){
        //console.log(myobj , index,result);
        filename = myobj[index].filename;
        filedate = myobj[index].filetime;
        filepath = myobj[index].filepath;

        // file name 去除后缀
        var fileinf = filename.split('.');
        filename = fileinf[0];
        // //console.log(filename);
        filedes = result.substring(0,100) + '...';

        // 第 index 个 按照 0 － n 排序
        var ulnode = document.getElementsByClassName('bloglist')[0];
        var ulChildNodes = ulnode.childNodes;

        var currentNode =  createNode(filename,filedate,filedes);
        var objnode;

        if (!ulChildNodes.length) {
          ulnode.appendChild(currentNode);
        }else {
          var objtime;
          for (var i = 0;i<ulChildNodes.length;i++) {
            objnode = null;
            var linode = ulChildNodes[i];
            objtime = linode.getAttribute('filedate');
             var o = Date.parse(objtime);
             var c = Date.parse(filedate);
             if (c >= o) {
               objnode = linode;
               break;
             }
          }
          if (!objnode) {
            ulnode.appendChild(currentNode);
          }else {
            ulnode.insertBefore(currentNode,objnode);
          }
        }

      },i);
    }
    });

  // web storage  (string) 这是本地brower 缓存的数据，这里简单使用本地文件

  if (window.localStorage){
    if (localStorage.pagecount) {
      localStorage.pagecount = Number( localStorage.pagecount ) + 1;
    }else {
      localStorage.pagecount = 1;
    }
    $('#visitedcount').html("嘿, 这是第<b> " +  localStorage.pagecount + " </b>次访问!");
  }
  // savefile('aa.txt','hello');
};
