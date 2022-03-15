<?php
  include_once "connect.php";

// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
  $sql = "SELECT * FROM goods order by goods_like desc LIMIT 4 ";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>