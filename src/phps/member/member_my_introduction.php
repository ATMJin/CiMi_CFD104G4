<?php
  include_once "member_config.php";


$sql = 
"SELECT mem_birth,mem_sex,mem_sexuality,mem_relationship,mem_job,
mem_school,mem_sign,mem_interests,mem_lovecountry,mem_exchange,
mem_try ,mem.mem_name,mem.mem_head
FROM mem join mempairdata on mempairdata.mem_no = mem.mem_no 
where mem.mem_no= {$_GET['mem_no']}";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetch(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>