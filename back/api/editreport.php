<?php

/*CONNECT WITH DATABASE*/
require_once("./connect_cfd104g4.php");

/*USE FOR FIX CROS POLICY*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");


switch ($_POST["phpState"]) {
    case "deleteArticle":
        $article_report_no = $_POST['article_report_no'];

        // sql 指令
        $sql = "DELETE FROM article_report WHERE (article_report_no = $article_report_no)";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "articleRenew":

        $article_report_no = (int)$_POST['article_report_no'];
        $report_report = (int)$_POST['report_report'];
        $report_state = (int)$_POST['report_state'];

        // sql 指令
        $sql = "UPDATE article_report SET report_report = $report_report, 
         report_state = $report_state WHERE article_report_no = $article_report_no ";

        /// 執行 sql
        $pdo->query($sql);

        break;

    case "deleteComment":
        $comment_report_no = $_POST['comment_report_no'];

        // sql 指令
        $sql = "DELETE FROM article_comment_report WHERE (comment_report_no = $comment_report_no)";

        // 執行 sql
        $pdo->query($sql);

        break;


    case "commentRenew":

        $comment_report_no = (int)$_POST['comment_report_no'];
        $report_report = (int)$_POST['report_report'];
        $report_state = (int)$_POST['report_state'];

        // sql 指令
        $sql = "UPDATE goods_comment_report SET report_report = $report_report, 
         report_state = $report_state, report_report_time = now()  WHERE comment_report_no = $comment_report_no ";

        // // 執行 sql
        $pdo->query($sql);

        break;

        
    case "deleteGood":
        $comment_report_no = $_POST['comment_report_no'];

        // sql 指令
        $sql = "DELETE FROM goods_comment_report WHERE (comment_report_no = $comment_report_no)";

        // 執行 sql
        $pdo->query($sql);

        break;


    case "goodRenew":

        $comment_report_no = (int)$_POST['comment_report_no'];
        $report_report = (int)$_POST['report_report'];
        $report_state = (int)$_POST['report_state'];

        // sql 指令
        $sql = "UPDATE goods_comment_report SET report_report = $report_report, 
             report_state = $report_state, report_report_time = now()  WHERE comment_report_no = $comment_report_no ";

        // // 執行 sql
        $pdo->query($sql);

        break;
}
