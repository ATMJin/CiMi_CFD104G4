<?php
// 資料庫連線檔
include('../connect_cimi.php');

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

       $mem_no = $_POST['mem_no'];
        if (isset($_FILES['file'])) {
            $img_name = $_FILES['file']['name'];
            $img_type = $_FILES['file']['type'];
            $tmp_name = $_FILES['file']['tmp_name'];

            $img_explode = explode('.', $img_name);
            $img_ext = end($img_explode);

            $extensions = ['png', 'jpeg', 'jpg'];

            if (in_array($img_ext, $extensions) === true) {

                // $time = time();
                $cut_point = strrpos($img_name,".");
                $jpg=substr($img_name,$cut_point);
                // $new_img_name = $time . $img_name;
                $new_img_name ="member_head_{$mem_no}{$jpg}";

                $path = "assets/images/" . $new_img_name;

                move_uploaded_file($tmp_name, "../../{$path}");

                $sql = "Update mem set mem_head='{$path}' where mem_no={$mem_no}";

                $pdo->query($sql);
                echo "照片上傳成功 ! ";
            } else {
                echo "請選擇 'png', 'jpeg', 'jpg' 檔案格式 !";
            }
        } else {
            echo "請選擇一張欲上傳之文章首圖 !";
        }

