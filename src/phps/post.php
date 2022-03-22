<?php
// 資料庫連線檔
include('config.php');

switch ($_POST["case"]) {

    case "getData":

        $mem_no = $_POST['mem_no'];

        $sql = "SELECT mem_name, mem_head FROM mem WHERE mem_no = $mem_no";

        $mem = $pdo->query($sql);

        $memRow = $mem->fetch(PDO::FETCH_ASSOC);

        $sql1 = "SELECT billboard_name, billboard_no  FROM billboard";

        $board = $pdo->query($sql1);

        $boardRow = $board->fetchAll(PDO::FETCH_ASSOC);

        $php_array = array('mem' => $memRow, 'board' => $boardRow);

        echo json_encode($php_array);

        break;

    case "checkFile":

        if (isset($_FILES['file'])) {
            $img_name = $_FILES['file']['name'];
            $img_type = $_FILES['file']['type'];
            $tmp_name = $_FILES['file']['tmp_name'];

            $img_explode = explode('.', $img_name);
            $img_ext = end($img_explode);

            $extensions = ['png', 'jpeg', 'jpg'];


            if (in_array($img_ext, $extensions) === true) {
                echo "true";
            } else {
                echo "請選擇 'png', 'jpeg', 'jpg' 檔案格式 !";
            }
        } else {
            echo "請選擇一張欲上傳之文章首圖 !";
        }
        break;

    case "insertData":

        $mem_no = $_POST['mem_no'];
        $billboard_no = $_POST['billboard_no'];
        $article_title = $_POST['article_title'];
        $article_content = $_POST['article_content'];

        // // echo $mem_no, $billboard_no, $article_title, $article_content; //寫入資料庫

        if (isset($_FILES['file'])) {
            $img_name = $_FILES['file']['name'];
            $img_type = $_FILES['file']['type'];
            $tmp_name = $_FILES['file']['tmp_name'];

            $img_explode = explode('.', $img_name);
            $img_ext = end($img_explode);

            $extensions = ['png', 'jpeg', 'jpg'];

            if (in_array($img_ext, $extensions) === true) {

                $time = time();

                $new_img_name = $time . $img_name;

                $path = "../assets/images/posts/" . $new_img_name;

                $savePath = "assets/images/posts/" . $new_img_name;

                move_uploaded_file($tmp_name, $path);

                $sql = "INSERT INTO article (mem_no, billboard_no , publish_date, last_edit_date, article_title, article_content, article_pic)
                    VALUE ($mem_no, $billboard_no, now(), now(), '{$article_title}', '{$article_content}', '{$savePath}')";

                $pdo->query($sql);
                echo "文章上傳成功 ! ";
            } else {
                echo "請選擇 'png', 'jpeg', 'jpg' 檔案格式 !";
            }
        } else {
            echo "請選擇一張欲上傳之文章首圖 !";
        }

２ㄉ

        break;
}
