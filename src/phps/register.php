<?php
//0. 引入連線工作的檔案

include_once "config.php";

//1. 定義變數接收form表單POST的值
$mem_no = rand(time(), 10000000);
$mem_id = $_POST['mem_id'];
$mem_psw = $_POST['mem_psw'];
$mem_name = $_POST['mem_name'];
$mem_birth = $_POST['mem_birth'];
$mem_mail = $_POST['mem_mail'];
$mem_sex = $_POST['gender'];
$mem_sexuality = $_POST['sex'];
$mem_local = $_POST['location'];
$board1 = $_POST['board1'];
$board2 = $_POST['board2'];
$board3 = $_POST['board3'];

//2.判斷所有欄位都有填寫以及勾選

if(!empty($mem_id) && !empty($mem_psw) && !empty($mem_name) && !empty($mem_birth) && !empty($mem_mail) && !empty($mem_sex) && !empty($mem_sexuality) && !empty($mem_local) && !empty($board1) && !empty($board2) && !empty($board2)){

    //3.驗證帳號是否已經註冊過 => 尚未完成 , 因為 Uncaught Error: Object of class PDOStatement could not be converted to string 

    // $sql0 = "SELECT mem_id FROM mem WHERE mem_id = {$mem_id}";
    // $id = $pdo->query($sql0);
    // if($id -> rowCount() > 0){
    //     echo "$id - 該帳號已被註冊過";
    // }else{


        //4.驗證信箱是否已經註冊過
        if(filter_var($mem_mail, FILTER_VALIDATE_EMAIL)){
            $sql1 = "SELECT mem_mail FROM mem WHERE mem_mail = '{$mem_mail}'";
            $email = $pdo->query($sql1);
            if($email -> rowCount() > 0){
                echo "$mem_mail - 該信箱已被註冊過";
            }else{
                // echo "$mem_mail - 該信箱可以使用";

                //sql for mem 表格
                $sql2 = "INSERT INTO mem (mem_no, mem_id, mem_psw, mem_name,  mem_mail) 
                VALUES ({$mem_no}, '{$mem_id}', '{$mem_psw}', '{$mem_name}', '{$mem_mail}')";

                $pdo->query($sql2);


                //sql for mempairdata 表格
                $sql3 = "INSERT INTO mempairdata (mem_no, mem_birth, mem_local, mem_sex, mem_sexuality) 
                VALUES ({$mem_no}, '{$mem_birth}', '{$mem_local}', '{$mem_sex}', '{$mem_sexuality}')";
    
                $pdo->query($sql3);


                //sql for mem_billboard 表格  => 尚未完成 , 因為還未建立billboard資料表

                //  $sql4 = "INSERT INTO mempairdata (mem_no, mem_birth, mem_local, mem_sex, mem_sexuality) 
                //  VALUES ({$mem_no}, '{$mem_birth}', '{$mem_local}', '{$mem_sex}', '{$mem_sexuality}')";
    
                //  $pdo->query($sql3);
            }
        }else{
            echo "$mem_mail - 信箱格式有誤!";
        }   

    // }
    
}else{
    echo '所有欄位都必須要填寫';
}
