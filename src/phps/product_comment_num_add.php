<?php
  include_once "connect.php";

  $sql = "UPDATE `goods` SET `comment_likes_amount` = `comment_likes_amount`+1 WHERE `goods`.`goods_no` ={$_GET['goods_no']}";
  
  //執行sql
//   $pdo->exec($sql);
  if($pdo->exec($sql)){ 
    //exec用於異動資料的時候
    echo "異動成功~";
}else{
    echo "異動失敗~";
}

?>