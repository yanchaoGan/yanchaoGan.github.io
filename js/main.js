
function showAnimate(){
  // var px =  parseInt('78px')
  // console.log(px);
  var classNameOfIndex = document.getElementById('index').className;
  if (classNameOfIndex.indexOf('moveindex') == -1){
    document.getElementById('index').className = classNameOfIndex + ' '+'moveindex';
  }else {
    console.log('已经更改了class');
  }
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

//blog
function blogShowContent() {

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
//   console.log('innerstr is ' + innerstr);
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
      // var text = document.createTextNode(filedes); 这样对文档中的标签就不识别了
      // p.appendChild(text);
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
        // console.log(this.getAttribute('class'));
        openNew(filename);
      };
    div.appendChild(button);

  linode.appendChild(div);

  return linode;
}

function sideBlog(){
  var p =  "blog/list.json";
  loadRequest(p,function(result){
    var myobj =  eval(result); // 转化为 json 对象了
    var innerstr = '';

    var filename,
        filedate,
        filepath,
        filedes;
    var successcount = 0;
    console.log(myobj);
    for(var i=0;i<myobj.length;i++){
      filepath = myobj[i].filepath;
      filename = myobj[i].filename;

      console.log(filename);
      loadRequest(filepath,function(result,index){
        console.log(myobj , index,result);
        filename = myobj[index].filename;
        filedate = myobj[index].filetime;
        filepath = myobj[index].filepath;

        // file name 去除后缀
        var fileinf = filename.split('.');
        filename = fileinf[0];
        // console.log(filename);
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
    $('visitedcount').innerHTML = "嘿, 这是第<b> " +  localStorage.pagecount + " </b>次访问!";
  }
  // savefile('aa.txt','hello');
};
