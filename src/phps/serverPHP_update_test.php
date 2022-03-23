<?php
  $dbname = "tibamefe_cfd104g4"; //資料庫名稱
  $user = "tibamefe_since2021"; //帳號
  $password = "vwRBSb.j&K#E"; //密碼  

	$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8mb4";
	$options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION );
  $pdo = new PDO($dsn, $user, $password, $options);

  $sql = "INSERT INTO `article_comment_report` (`comment_report_no`, `mem_no`, `comment_no`, `report_date`, `report_reason`, `report_state`, `admin_no`, `report_report`, `report_report_time`) VALUES (NULL, '1', '1', '2022-03-05 14:36:12', '此內容涉及人身攻擊', '0', '2', '0', NULL)"; 
    $goods = $pdo->exec($sql);
    

?>


