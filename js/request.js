
//  request 相关

// xml request
// getfilepath 文件地址
// call 函数参数
// ［index］ 第几个调用  可选
function loadRequest() {
  // if (!xmlhttp) {
  // }
  var getfilepath = arguments[0]||null;
  var call = arguments[1]||null;
  var index = arguments[2];
  console.log('*****'+index);
  loadData(getfilepath,call,index);
}
function loadData(getfilepath,call,index) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     var result =  xmlhttp.responseText;
     if (index != undefined) {
       call(result,index);
     }else {
       call(result);
     }
    }
 };
 xmlhttp.open("GET",getfilepath,true); // false同步 性能较低  ; true 异步
 xmlhttp.send();
}
