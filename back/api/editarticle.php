<?php

/*CONNECT WITH DATABASE*/
require_once("./connect_cfd104g4.php");

/*USE FOR FIX CROS POLICY*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");


switch ($_POST["phpState"]) {
    case "delete":
        $article_no = $_POST['article_no'];
        
        // sql 指令
        $sql = "DELETE FROM article WHERE (article_no = $article_no)";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "renew":
        $article_no = (int)$_POST['article_no'];
        $article_state = (int)$_POST['article_state'];
        $article_title = $_POST['article_title'];
        $billboard_no = (int)$_POST['billboard_no'];

        // sql 指令
        $sql = "UPDATE article SET article_state = $article_state, article_title = '{$article_title}', billboard_no = $billboard_no WHERE article.article_no = $article_no";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "createNew":
        $article_content = $_POST['article_content'];
        $article_state = $_POST['article_state'];
        $article_title = $_POST['article_title'];
        $billboard_no = $_POST['billboard_no'];

        echo $article_content, $article_state, $article_title, $billboard_no;

        // sql 指令
        $sql = "INSERT INTO article (mem_no, billboard_no, 	publish_date, 	        last_edit_date, article_title, article_content) 
        VALUES (195052890, $billboard_no, now(),  now(), '{$article_title}','{$article_content}')";

        // 執行 sql
        $pdo->query($sql);

        break;
   
}
