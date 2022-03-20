<?php
  $dbname = "tibamefe_cfd104g4"; //資料庫名稱
  $user = "tibamefe_since2021"; //帳號
  $password = "vwRBSb.j&K#E"; //密碼  

	$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8mb4";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
  $pdo = new PDO($dsn, $user, $password, $options);

  $sql = "INSERT INTO `trackwriter` (`mem_no`, `writer_no`) VALUES ('1', '12'), ('1', '1503996945'), ('1', '11'), ('1', '24'), ('1', '22'), ('1', '23'), ('11', '4'), ('5', '3'), ('8', '11'), ('8', '10'), ('8', '6'), ('22', '25') "; 
    $goods = $pdo->exec($sql);
    

?>


