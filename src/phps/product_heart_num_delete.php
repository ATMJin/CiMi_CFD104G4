<?php
  include_once "connect.php";

// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
  $sql = "UPDATE `goods` SET `goods_like` = `goods_like`-1 WHERE `goods`.`goods_no` ={$_GET['goods_no']}";
  
  //執行sql
//   $pdo->exec($sql);
  if($pdo->exec($sql)){ //exec用於異動資料的時候
    echo "異動成功~";
}else{
    echo "異動失敗~";
}

?>