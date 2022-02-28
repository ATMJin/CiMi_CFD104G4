<?php
session_start();
//引入連線工作的檔案
include_once "config.php";

//拿到表單送出的資料
$outgoing_id = $_SESSION['unique_id'];   //傳訊者
$incoming_id =  $_SESSION['chatPerson']; //收訊者


// var_dump($outgoing_id, $incoming_id) ;

$output = "";

$sql = "SELECT * FROM messages 
        JOIN users ON users.unique_id = messages.outgoing_msg_id
        
        WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) 
        OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";

$msg = $pdo->query($sql);

if($msg -> rowCount() > 0){
   
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
                                      <img src="https://picsum.photos/id/684/600/400" alt="">
                                         <div class="details">
                                         <p>' . $msgRows['msg'  ] . '</p>
                                         </div>
                                    </div>';
                         
                }

                // echo gettype($msgRows["outgoing_msg_id"]);
                // echo gettype($outgoing_id);

        }

}
echo $output;

?>