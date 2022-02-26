<?php
session_start();
//引入連線工作的檔案
include_once "config.php";
$outgoing_id = $_SESSION['unique_id'];
$incoming_id = $_POST['id'];
$_SESSION['chatPerson'] = $incoming_id;

$sql = "SELECT * FROM users where unique_id = $incoming_id";
$userInfo = $pdo->query($sql);
$user = $userInfo->fetch(PDO::FETCH_ASSOC);

$output="";

if(isset($_POST['id']) == true){ 
    $output .= '
        <a href="#" class="back_icon"><i class="fa-solid fa-ellipsis-vertical"></i></a>
        <img src="https://picsum.photos/id/684/600/400" alt="">
        <div class="details">
            <span>'.$user['fname'].'</span>
            <p>this is my info area</p>
        </div>

    ';
    echo $output;
}else{ //尚未登入
    echo "{}";
}
