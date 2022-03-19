<?php
  include_once "member_config.php";


  $sql = 
  "SELECT 	mi_no, m.mem_no, mem_id, mem_name, mem_head, mem_tel, m.mem_mail, p.mem_birth, p.mem_sex, p.mem_sexuality, p.mem_relationship, p.mem_job, p.mem_school, p.mem_try, p.mem_lovecountry, p.mem_exchange, p.mem_interests, p.mem_sign
  FROM `mifriend` mi 
  JOIN `mem` m ON mi.mi_no = m.mem_no 
  LEFT JOIN `mempairdata` p ON mi.mi_no = p.mem_no
  WHERE mi.mem_no = {$_GET['mem_no']}";
    
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>