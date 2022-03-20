<?php
include_once "../connect_cimi.php";

switch ($_GET["case"]) {
  case 'null':
    $sql = "SELECT * FROM mem join mempairdata on mempairdata.mem_no = mem.mem_no 
            where mem.mem_no= {$_GET['mem_no']}";

    //執行sql
    $member = $pdo->query($sql);

    // 將取得的資料轉成陣列形式
    $memberRows = $member->fetch(PDO::FETCH_ASSOC);

    // 將陣列轉成json格式後傳出去
    echo json_encode($memberRows);
    break;
    
  case "edit":

    //接收xhr送過來的資料 像是性向 / 自我介紹等等...
    $mem_no = $_POST['mem_no'];
    $mem_power = $_POST['mem_power'];
    $mem_state = $_POST['mem_state'];
    //update
    $sql = "UPDATE mem  SET mem_state = $mem_state, mem_power = $mem_power WHERE mem.mem_no = $mem_no";
    //執行sql

    break;
}
