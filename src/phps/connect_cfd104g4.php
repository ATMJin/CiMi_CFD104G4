<?php
  // $dbname = "tibamefe_班別組別"; //資料庫名稱
  // $user = "tibamefe_since2021"; //帳號
  // $password = "vwRBSb.j&K#E"; //密碼  

  $dbname = "tibamefe_cfd104g4"; //資料庫名稱
  $user = "cfd104@tibamef2e.com"; //帳號
  $password = "Wy5B^U~oZ*zb"; //密碼  

	$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";
	// $user = "root";
	// $password = "root";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
  $pdo = new PDO($dsn, $user, $password, $options);
?>