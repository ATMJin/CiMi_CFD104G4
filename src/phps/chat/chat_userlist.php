<?php
session_start();
//引入連線工作的檔案
include_once "../config.php";


/*------------------------------------拿到好友列表----------------------------------------*/

//執行sql指令並取得pdoStatement

$sql = "SELECT * FROM mem WHERE mem_no != {$_SESSION['mem_no']}"; //使用者登入會將mem_no寫入session, 以此判斷該用戶之好友

// SELECT * FROM `messages` 
// LEFT JOIN mem.mem_no !=

// 482990574

$users = $pdo->query($sql);

//取回所有的資料, 放在2維陣列中 fetchAll
$usersRows = $users->fetchAll(PDO::FETCH_ASSOC);

$friends='';

if ($users -> rowCount() > 0){
    foreach($usersRows as $i => $usersRow){
        // print_r($usersRow);	

        $friends.= '
            <span class="friends">
                <div class="content">
                    <img src="./assets/images/blue_ball.png" alt="">
                    <div class="details">
                        <span>'.$usersRow['mem_name'].'</span>
                        <p>'.$usersRow['mem_no'].'</p>
                    </div>
                </div>
                <div class="status_dot"><i class="fas fa-circle"></i></div>
                <span style="display:none;">'.$usersRow['mem_no'].'</span>
            </span>
        
        ';
    };
    echo $friends;
}else{
    echo "No friends to chat";
}



?>