<?php

 //引入連線工作的檔案
 include_once "../config.php";
 
$mem_no = $_POST['id'];
echo $mem_no;

// sql 指令
$sql = "DELETE FROM messages WHERE (incoming_msg_id = $mem_no)";

// 執行 sql
$pdo->query($sql);

?>