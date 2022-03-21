<?php
session_start();

//引入連線工作的檔案
include_once "../config.php";

//拿到表單送出的資料
$outgoing_id = $_SESSION['mem_no'];      //傳訊者
$incoming_id =  $_SESSION['chatPerson']; //收訊者

//  $msg_img = $_FILES['file'];            //圖片

if (isset($_FILES['file'])) {
    $img_name = $_FILES['file']['name'];
    $img_type = $_FILES['file']['type'];
    $tmp_name = $_FILES['file']['tmp_name'];

    $img_explode = explode('.', $img_name);
    $img_ext = end($img_explode);

    $extensions = ['png', 'jpeg', 'jpg'];


    if (in_array($img_ext, $extensions) === true) {
        $time = time();

        $new_img_name = $time . '.' .$img_ext;

        $path = "../../assets/images/msg_img/" . $new_img_name;

        $rightPath = "./assets/images/msg_img/" . $new_img_name;

         copy($tmp_name, $path);

        $sql = "INSERT INTO messages (incoming_msg_id,outgoing_msg_id, msg, msg_date, msg_img)
        VALUE ({$incoming_id}, {$outgoing_id}, '', now(), '{$rightPath}')";

        // $sql = "INSERT INTO article (mem_no, billboard_no , publish_date, last_edit_date, article_title, article_content, article_pic)
        // VALUE ($mem_no, $billboard_no, now(), now(), '{$article_title}', '{$article_content}', )";

        $pdo->query($sql);
    } else {
        echo "請選擇 'png', 'jpeg', 'jpg' 檔案格式 !";
    }
}

 
// echo  $outgoing_id, $incoming_id, $message;

// 將 $outgoing_id, $incoming_id, $message 寫入資料庫

// $sql = "INSERT INTO messages (incoming_msg_id,outgoing_msg_id, msg_img, msg_date)
// VALUE ({$incoming_id}, '{$outgoing_id}', '{$msg_img}',  now())";

// //執行sql語句
// if(!empty($message)){
//     $pdo->query($sql);
//     echo $msg_img;

// }else{
//     die();  //如果message沒有消息就不執行sql語句
// }
