<?php
/*USE FOR FIX CROS POLICY*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once("./connect_cfd104g4.php");


switch ($_POST["case"]) {
    case "article":
        //SQL FOR 文章檢舉
        $sql = "SELECT report_reason, article_report.article_no, mem.mem_name, report_date, article.article_title, report_state, report_report, article_content, article_report_no FROM article_report
        LEFT JOIN mem on mem.mem_no = article_report.mem_no   
        LEFT JOIN article on article.article_no = article_report.article_no   
       ";
        // 執行
        $articleReport = $pdo->query($sql);

        $articleReportRows = $articleReport->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($articleReportRows);
        break;

    case "comment":
        $sql = "SELECT report_reason, article_comment_report.comment_no, mem.mem_name, report_date, article_comment.comment_content, report_state, report_report, comment_report_no FROM article_comment_report
        LEFT JOIN mem on mem.mem_no = article_comment_report.mem_no   
        LEFT JOIN article_comment on article_comment.article_comment_no  = article_comment_report.comment_no    
       ";

        // 執行
        $commentReport = $pdo->query($sql);

        $commentReportRows = $commentReport->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($commentReportRows);
        break;

    case "good":
        $sql = "SELECT report_reason, goods_comment_report.comment_no, mem.mem_name, report_date, goods_comment.comment_content, report_state, report_report, comment_report_no FROM goods_comment_report
        LEFT JOIN mem on mem.mem_no = goods_comment_report.mem_no   
        LEFT JOIN goods_comment on goods_comment.goods_comment_no  = goods_comment_report.comment_no    
       ";

        // 執行
        $goodReport = $pdo->query($sql);

        $goodReportRows = $goodReport->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($goodReportRows);
        break;
}

?>