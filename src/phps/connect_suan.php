<?php
  $dbname = "tibamefe_cfd104g4"; //資料庫名稱
  $user = "root"; //帳號
  $password = "cfd10429"; //自己的密碼  

	$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8mb4";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
  $pdo = new PDO($dsn, $user, $password, $options);
?>