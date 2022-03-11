<?php
session_start();

 //引入連線工作的檔案
 include_once "../config.php";

 //拿到表單送出的資料
 $outgoing_id = $_SESSION['mem_no'];   //傳訊者
 $incoming_id =  $_POST['user_id']; //收訊者
 $msg = $_POST['msg'];            //消息


// echo $outgoing_id, $incoming_id, $msg; //寫入資料庫

$sql = "INSERT INTO messages (incoming_msg_id,outgoing_msg_id, msg, msg_date)
VALUE ({$incoming_id}, {$outgoing_id}, '{$msg}',  now())";

//執行sql語句
if(!empty($msg)){
    $pdo->query($sql);

}else{
    die();  //如果message沒有消息就不執行sql語句
}
?>


