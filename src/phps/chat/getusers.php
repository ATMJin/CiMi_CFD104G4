<?php
session_start();
//引入連線工作的檔案
include_once "config.php";
$outgoing_id = $_SESSION['mem_no'];
$incoming_id = $_POST['id'];
$_SESSION['chatPerson'] = $incoming_id;

$sql = "SELECT * FROM mem 
        JOIN mempairdata on mempairdata.mem_no = mem.mem_no
        where mem.mem_no = $incoming_id
        ";
$userInfo = $pdo->query($sql);
$user = $userInfo->fetch(PDO::FETCH_ASSOC);

$output="";

if(isset($_POST['id']) == true){ 
    $output .= '
    <i class="fa-solid fa-arrow-left black" id="back"></i>
        <img src='. $user['mem_head'] .' alt="">
        <div class="details">
            <span>'.$user['mem_name'].'</span>
            <p>'.$user['mem_sign'].'</p>
        </div>
        <input type="checkbox" name="" id="switch_btn" onclick="addDarkmodeWidget()">
                <div class="switch dark_icon">
                    <label for="switch_btn" class="btnn"></label>
                    <span class="material-icons">
                    person_remove
                    </span>

    ';
    echo $output;
}else{ //尚未登入
    echo "{}";
}
