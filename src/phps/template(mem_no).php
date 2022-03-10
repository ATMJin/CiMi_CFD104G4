

<?php
  include_once "config.php";


  $sql = "SELECT mem_no FROM mem where mem_no={$_GET['mem_no']}";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetch(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>
