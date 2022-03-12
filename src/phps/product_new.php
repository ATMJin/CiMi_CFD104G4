 
<?php
  include_once "connect.php";

// 撈所有商品 來自goods表格 依據(創建時間)排序goods_creat
  $sql = "SELECT * FROM goods order by goods_creat desc limit 4 ";
  
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

?>