<?php
  include_once "connect.php";

// 撈所有商品   來自goods表格 篩選條件有星座、戀人、石、水晶手鍊 
  $sql = "SELECT * FROM goods where goods_name LIKE '%星座%' or goods_name LIKE '%戀人%' or goods_name LIKE '%項鍊%' or goods_name LIKE '%水晶%'";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>