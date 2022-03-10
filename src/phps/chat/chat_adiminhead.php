<?php

session_start();

//引入連線工作的檔案
include_once "../config.php";


/*------------------------------------拿到ADMIN HEADER----------------------------------------*/

$sql="SELECT * from mem where mem_no = 195052890";  //195052890 => Admin 的 mem_no
$admin = $pdo->query($sql);

//取回所有的資料, 放在2維陣列中 fetchAll
$adminRows = $admin->fetchAll(PDO::FETCH_ASSOC);

$adminhead='';

if ($admin -> rowCount() > 0){
    foreach($adminRows as $i => $adminRow){
        // print_r($usersRow);	

        $adminhead.= '
        <i class="fa-solid fa-arrow-left black" id="back"></i>
        <img src="./assets/images/blue_ball.png" alt="">
        <div class="details">
            <span>'.$adminRow['mem_name'].'</span>
            <p>this is cimi Admin</p>
        </div>
        <input type="checkbox" name="" id="switch_btn">
            <div class="switch dark_icon">
            <label for="switch_btn" class="btnn"></label>

    ';
        
        
    };
    // echo $adminhead;
}else{
    echo "No friends to chat";
}


/*------------------------------------拿到ADMIN CHAT----------------------------------------*/

//拿到表單送出的資料
$outgoing_id = $_SESSION['mem_no'];   //傳訊者
$incoming_id = 195052890 ; //ADMIN

// var_dump($outgoing_id, $incoming_id) ;

$output = "";
$rowcount = 0;
$sql = "SELECT * FROM messages 
        JOIN mem ON mem.mem_no = messages.outgoing_msg_id
        
        WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) 
        OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";

$msg = $pdo->query($sql);

if($msg -> rowCount() > 0){
        $rowcount = $msg -> rowCount();
        while($msgRows = $msg->fetch(PDO::FETCH_ASSOC)){    
                // print_r($msgRows);
                
                if($msgRows["outgoing_msg_id"] == $outgoing_id)  {
                        $output .=' <div class="chat outgoing">
                                        <div class="details">
                                        <p>' . $msgRows['msg'] . '</p>
                                        </div>
                                </div>';
                        // print_r($msgRows['outgoing_msg_id']);
                        // print_r($msgRows['msg']);
                }else{
                        $output .=' <div class="chat incoming">
                                        <img src="./assets/images/blue_ball.png" alt="">
                                         <div class="details">
                                         <p>' . $msgRows['msg'] . '</p>
                                         </div>
                                    </div>';
                         
                }

                // echo gettype($msgRows["outgoing_msg_id"]);
                // echo gettype($outgoing_id);

        }

}
 $php_array = array ('output' => $output, 'rowcount' => $rowcount, 'adminhead' => $adminhead);
 echo json_encode($php_array);



// ?>