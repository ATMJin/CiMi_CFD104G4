<?php
session_start();
//引入連線工作的檔案
include_once "../config.php";

$outgoing_id = $_SESSION['mem_no'];   //傳訊者
$incoming_id =  $_POST['id']; //收訊者

$_SESSION['chatPerson'] = $incoming_id;


// var_dump($outgoing_id, $incoming_id, $_SESSION['chatPerson']) ; //打印資料看一下

/**********************************************************/
//1. 獲取聊天室好友資訊
$header = "";
$sql = "SELECT * FROM mem 
        JOIN mempairdata on mempairdata.mem_no = mem.mem_no
        where mem.mem_no = $incoming_id
        ";  //195052890 => Admin 的 mem_no
$user = $pdo->query($sql);
$userRows = $user->fetchAll(PDO::FETCH_ASSOC);

if ($user->rowCount() > 0) {
        foreach ($userRows as $i => $userRow) {
                // print_r($usersRow);	

                $header .= '
            <i class="fa-solid fa-arrow-left black" id="back"></i>
            <img src="./assets/images/blue_ball.png" alt="">
            <div class="details">
                <span>' . $userRow['mem_name'] . '</span>
                <p>' . $userRow['mem_sign'] . '</p>
            </div>
            <input type="checkbox" name="" id="switch_btn">
                <div class="switch dark_icon">
                <label for="switch_btn" class="btnn"></label>
                <span class="material-icons delete_icon" id="delete_icon" onclick="confirmDelete()">
                delete
                </span>
    
        ';
        };
} else {
        echo "No friends to chat";
}

/**********************************************************/
//2. 獲取聊天視窗消息
$output = "";
$rowcount = 0;
$sql1 = "SELECT * FROM messages 
        JOIN mem ON mem.mem_no = messages.outgoing_msg_id
        
        WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) 
        OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";

$msg = $pdo->query($sql1);

if ($msg->rowCount() > 0) {
        $rowcount = $msg->rowCount();
        while ($msgRows = $msg->fetch(PDO::FETCH_ASSOC)) {
                // print_r($msgRows);

                if ($msgRows['msg'] != "") { //聊天訊息不為空
                        if ($msgRows["outgoing_msg_id"] == $outgoing_id) {


                                $output .= ' <div class="chat outgoing">
                                                <div class="details">
                                                <p>' . $msgRows['msg'] . '</p>
                                                </div>
                                        </div>';
                                // print_r($msgRows['outgoing_msg_id']);
                                // print_r($msgRows['msg']);
                        } else {
                                $output .= ' <div class="chat incoming">
                                                <img src="./assets/images/blue_ball.png" alt="">
                                                 <div class="details">
                                                 <p>' . $msgRows['msg'] . '</p>
                                                 </div>
                                            </div>';
                        }
                } else { //聊天訊息為空 => 表示該訊息為圖片
                        if ($msgRows["outgoing_msg_id"] == $outgoing_id) {


                                $output .= " <div class='chat outgoing'>
                                                 <div class='details'>
                                                
                                                 <img src=". $msgRows['msg_img']. " alt='' class='user_img'>
                                                 </div>
                                            </div>";
                                // print_r($msgRows['outgoing_msg_id']);
                                // print_r($msgRows['msg_img']);
                        } else {
                                $output .= " <div class='chat incoming'>
                                                <img src='./assets/images/blue_ball.png' alt=''>
                                                 <div class='details'>
                                                
                                                 <img src=". $msgRows['msg_img']. " alt='' class='user_img'>
                                                 </div>
                                            </div>";
                        }
                }



                // echo gettype($msgRows["outgoing_msg_id"]);
                // echo gettype($outgoing_id);

        }
}
$php_array = array('header' => $header, 'output' => $output, 'rowcount' => $rowcount);
echo json_encode($php_array);
