
<?php

date_default_timezone_set("PRC");
/*
  处理  blog/message 文件路径信息，放置 list.json
*/
const NAME = "name";

function gyclog($p){
  $dub = 1;
  if ($dub == 1) {
    # code...
    printf('<br>'.$p); // echo
  }
}

// 对filearry 按照 filetime 倒序排列
function myfilesort($a,$b){
  if (strtotime($a['filetime']) > strtotime($b['filetime']) ) {
    return -1;
  }else {
    return 1;
  }
}

/**********************
一个简单的目录递归函数
第一种实现办法：用dir返回对象
***********************/
function tree($directory){
// 文件数组
  $filearr = array();
	$mydir = $directory;
  // 将文件 列表
  $filesname = scandir($mydir);
  gyclog($filesname);
  foreach ($filesname as $name) {
    # code...
    if (is_dir("$directory/$name")) {
      # code... 文件夹
      gyclog("<br />".$name.'is folder');
    }else {
      // 真正的文件
      gyclog( '<br />'.$name."is real file");
      $path = substr($directory,4);
      $filemtime = filemtime("$directory/$name");
      $filemtime = date("Y-m-d H:i:s",$filemtime);
      // php 没有 纯字典 ， 用数组来 映射字典
    
      $filearr[] = ["filename"=>"$name",
                    "filepath"=>"$path/$name",
                    "filetime"=>"$filemtime",
                    ];
    }
  }
  // 将 文件数组 json 字符串
  gyclog($filearr);
  usort($filearr,'myfilesort'); //  排序
  $json_string = json_encode($filearr);
  gyclog("\n".$json_string);
  $dirsub = substr($directory,0,9);
// 覆盖，没有创建
  if ($fp = fopen("$dirsub/list.json","w+")) {
    # code...
    if (fwrite($fp,$json_string)) {
      # code...
    }
    fclose($fp);
  }
}
// 方法二  也是可行的
// 	$mydir = dir($directory);
// echo "<ul>";
// 	while($file = $mydir->read())
// 	{
//
// 		if((is_dir("$directory/$file")) AND ($file!=".") AND ($file!=".."))
// 		{
//       // 文件夹
// 			echo "<li><font color=\"#ff00cc\"><b>$file</b></font></li>\n";
// 			tree("$directory/$file");
// 		}
// 		else if ($file != '.' AND $file != '..'){
//       // 不是隐藏 文件的 真实文件s
//       echo "<li>$file</li>\n";
//     }
// 	}
// 	echo "</ul>\n";
// $mydir->close();

// HTTP_HOST
// HTTP_USER_AGENT
// HTTP_ACCEPT
// HTTP_ACCEPT_LANGUAGE
// HTTP_ACCEPT_ENCODING
// HTTP_DNT
// HTTP_REFERER
// HTTP_CONNECTION
// HTTP_CACHE_CONTROL
// PATH
// SERVER_SIGNATURE
// SERVER_SOFTWARE
// SERVER_NAME
// SERVER_ADDR
// SERVER_PORT
// REMOTE_ADDR
// DOCUMENT_ROOT
// REQUEST_SCHEME
// CONTEXT_PREFIX
// CONTEXT_DOCUMENT_ROOT
// SERVER_ADMIN
// SCRIPT_FILENAME
// REMOTE_PORT
// GATEWAY_INTERFACE
// SERVER_PROTOCOL
// REQUEST_METHOD
// QUERY_STRING
// REQUEST_URI
// SCRIPT_NAME
// PHP_SELF
// REQUEST_TIME_FLOAT
// REQUEST_TIME
// argv
// argc
//
// foreach ($_SERVER as $k => $v) {
//   # code...
//   // echo  $k."  ".$v.'<br />';
// }

// 对请求参数 进行直接处理
if ($_REQUEST[NAME] === 'gyc') {
  # code...
  tree("./../blog/message");
}

?>
