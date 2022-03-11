<?php
//0. 引入連線工作的檔案
include_once "config.php";


//1. 定義變數接收form表單POST的值
$mem_id = $_POST['mem_id'];

//2.判斷當前使用者帳號是否存在
$sql =  "SELECT mem_id FROM mem WHERE mem_id = '{$mem_id}'";
$id = $pdo->query($sql);
$idRows = $id->fetchAll(PDO::FETCH_ASSOC);

if($id -> rowCount() > 0){ //當前使用者存在
    echo 0;
}else{  //當前使用者不存在
    echo 1;
}
?>