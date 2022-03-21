<?php
//0. 引入連線工作的檔案

include_once "config.php";

//1. 定義變數接收form表單POST的值
$mem_no = rand(time(), 10000000);
$mem_id = $_POST['mem_id'];
$mem_psw = $_POST['mem_psw'];
$mem_name = $_POST['mem_name'];
$mem_head = './assets/images/blue_ball.png';
$mem_birth = $_POST['mem_birth'];
$mem_mail = $_POST['mem_mail'];
$board1 = $_POST['board1'];
$board2 = $_POST['board2'];
$board3 = $_POST['board3'];

//打印看看
// echo$mem_no, 
// $mem_id,
// $mem_psw,
// $mem_name ,
// $mem_head ,
// $mem_birth ,
// $mem_mail ,
// $board1 ,
// $board2,
// $board3;

// echo gettype($board1);
// echo gettype((int)$board1);


//2.判斷所有欄位都有值以及勾選

if (isset($mem_id) && isset($mem_psw) && isset($mem_name) && isset($mem_birth) && isset($mem_mail) && isset($board1) && isset($board2) && isset($board2)) {

    //sql for mem 表格
    $sql1 = "INSERT INTO mem (mem_no, mem_id, mem_psw, mem_name, mem_head, mem_mail) 
         VALUES ({$mem_no}, '{$mem_id}', '{$mem_psw}', '{$mem_name}', '{$mem_head}', '{$mem_mail}')";

    $pdo->query($sql1);


    //sql for mempairdata 表格
    $sql2 = "INSERT INTO mempairdata (mem_no, mem_birth) 
         VALUES ({$mem_no}, '{$mem_birth}')";

    $pdo->query($sql2);


    //sql for mem_billboard 表格

    $board1_num = (int)$board1;
    $board2_num = (int)$board2;
    $board3_num = (int)$board3;

    $sql3 = "INSERT INTO mem_billboard (mem_no, mem_billboard_no) 
         VALUES ({$mem_no}, {$board1_num})";
    $pdo->query($sql3);

    $sql4 = "INSERT INTO mem_billboard (mem_no, mem_billboard_no) 
         VALUES ({$mem_no}, '{$board2_num}')";
    $pdo->query($sql4);

    $sql5 = "INSERT INTO mem_billboard (mem_no, mem_billboard_no) 
         VALUES ({$mem_no}, '{$board3_num}')";
    $pdo->query($sql5);

    //sql for mifriend 表格

    $sql6 = "INSERT INTO mifriend (mem_no, mi_no) 
         VALUES ($mem_no, 195052890)";
    $pdo->query($sql6 );



    //註冊成功 讓他跳轉回登入畫面
    session_start();
    echo '
    <script language=javascript>
    alert("註冊成功, 立即前往登入");
    window.location.href="../login_new.html"
    </script>';
    
} else {
    echo '所有欄位都必須要填寫';
}
