<?php
  $dbname = "tibamefe_cfd104g4";
  $user = "root";
  $password = "Cfd10430";  

	$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
  $pdo = new PDO($dsn, $user, $password, $options);
?>