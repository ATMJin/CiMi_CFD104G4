<?php
session_start();

 //引入連線工作的檔案
 include_once "config.php";

 //拿到表單送出的資料
 $outgoing_id = $_SESSION['unique_id'];   //傳訊者
 $incoming_id =  $_SESSION['chatPerson']; //收訊者
 $message = $_POST['message'];            //消息

// echo  $outgoing_id, $incoming_id, $message;

// 將 $outgoing_id, $incoming_id, $message 寫入資料庫

$sql = "INSERT INTO messages (incoming_msg_id,outgoing_msg_id, msg)
VALUE ({$incoming_id}, '{$outgoing_id}', '{$message}')";

//執行sql語句
if(!empty($message)){
    $pdo->query($sql);

}else{
    die();  //如果message沒有消息就不執行sql語句
}
?>