
<?php
//全部商品
  include_once "connect.php";

// 撈所有的商品
  $sql = "SELECT * FROM goods";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>