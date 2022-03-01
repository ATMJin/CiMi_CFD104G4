<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>

<?php
	echo "帳號:", $_GET["memId"], "<br>"; 
	echo "密碼:", $_GET["memPsw"], "<br>"; 
	echo "說啥?", $_GET["note"], "<hr>"; //使用者輸入的enter不會換列
	//可用nl2br() : new line to br 將換列符號轉成<br>
	echo "說啥?(跳列版)", nl2br($_GET["note"], "<br>"); 

	// post
	//echo "帳號:", $_POST["memId"], "<br>"; 
	//echo "密碼:", $_POST["memPsw"], "<br>";
?>

</body>