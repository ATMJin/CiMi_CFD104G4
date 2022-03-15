<?php
  include_once "connect.php";

// 撈所有的商品 來自goods表格 依條件商品名稱為="質感生活"
  $sql = "SELECT * FROM goods where goods_class='質感生活'";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>