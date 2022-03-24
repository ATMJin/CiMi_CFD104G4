<?php
try {
    // require_once("../connect_cfd104g4.php"); // 上線時使用
    require_once("../connect_cfd104g4.php");  // 開發時使用

    switch ($_POST["case"]) {
            // 最新文章→用建立時間來篩
        case "newArticle":
            $sql = "SELECT a.article_no, a.mem_no, a.publish_date, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_name, count(c.article_comment_no) comment_amount, m.mem_head
			FROM article a 
			JOIN mem m
			on a.mem_no=m.mem_no
			left JOIN article_comment c
			on a.article_no = c.article_no
			GROUP BY a.article_no
			order by a.publish_date desc
            limit 10;";
            $articles = $pdo->prepare($sql);
            $articles->execute(); //執行
            $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($articleRows);
            break;

            //熱門文章→用留言數多來篩
        case "hotArticle":
            $sql = "SELECT a.article_no, a.mem_no, a.publish_date, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_name, count(c.article_comment_no) comment_amount, m.mem_head
			FROM article a 
			JOIN mem m
			on a.mem_no=m.mem_no
			left JOIN article_comment c
			on a.article_no = c.article_no
			GROUP BY a.article_no
			order by count(c.article_comment_no) desc
            limit 10;";
            $articles = $pdo->prepare($sql);
            $articles->execute(); //執行
            $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($articleRows);
            break;

            //推薦文章→用喜歡數多來篩
        case "likedArticle":
            $sql = "SELECT a.article_no, a.mem_no, a.publish_date, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_name, count(c.article_comment_no) comment_amount, m.mem_head
			FROM article a 
			JOIN mem m
			on a.mem_no=m.mem_no
			left JOIN article_comment c
			on a.article_no = c.article_no
			GROUP BY a.article_no
			order by a.article_likes_amount desc
            limit 2;";
            $articles = $pdo->prepare($sql);
            $articles->execute(); //執行
            $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($articleRows);
            break;

            // 抓取留言資訊資料 
        case "find_comment_info":
            $sql = "SELECT c.comment_date, c.comment_content, c.comment_likes_amount, c.article_no, m.mem_name, m.mem_head,m.mem_id
			FROM tibamefe_cfd104g4.article_comment c
			JOIN mem m
			on c.mem_no=m.mem_no
			where c.article_no=:article_no
			order by comment_date desc;
			";
            $article_no = $_POST["article_no"];
            $articles = $pdo->prepare($sql);
            $articles->bindValue(":article_no", $article_no); //給值
            $articles->execute(); //執行
            $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($articleRows);
            break;

            // 寫下留言
        case "get_comment":
            $comment_content = $_POST["comment_content"];
            $comment_date = $_POST["comment_date"];
            $mem_no = $_POST["mem_no"];
            $article_no = $_POST["article_no"];

            $sql = "INSERT INTO article_comment(mem_no, article_no, comment_date, comment_content)
			VALUES(:mem_no,:article_no,:comment_date,:comment_content);";
            $articles = $pdo->prepare($sql);

            $articles->bindValue(":mem_no", $mem_no); //給值
            $articles->bindValue(":article_no", $article_no); //給值
            $articles->bindValue(":comment_date", $comment_date); //給值
            $articles->bindValue(":comment_content", $comment_content); //給值
            if ($articles->execute()) { //執行
                echo "異動成功";
            } else {
                echo "異動失敗";
            }
            break;

        case "add_like":
            // 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
            $sql = "UPDATE article SET article_likes_amount = article_likes_amount + 1 WHERE article_no ={$_POST['article_no']}";

            //執行sql
            //   $pdo->exec($sql);
            if ($pdo->exec($sql)) { //exec用於異動資料的時候
                echo "異動成功~";
            } else {
                echo "異動失敗~";
            }
            break;

        case "remove_like":
            // 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
            $sql = "UPDATE article SET article_likes_amount = article_likes_amount - 1 WHERE article_no ={$_POST['article_no']}";

            //執行sql
            //   $pdo->exec($sql);
            if ($pdo->exec($sql)) { //exec用於異動資料的時候
                echo "異動成功~";
            } else {
                echo "異動失敗~";
            }
            break;

            // 抓取可能會喜歡的文章資訊
        case 3:
            $sql = "select a.article_title, a.article_likes_amount, count(c.article_comment_no) comment_amount, b.billboard_no, a.article_pic, a.article_no
			from article a
			left JOIN article_comment c
			on a.article_no = c.article_no
			JOIN billboard b
			on b.billboard_no = a.billboard_no
			group by a.article_no
			order by a.article_likes_amount desc
			limit 4;
			";
            $articles = $pdo->query($sql);
            $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($articleRows);
            break;
    }

    // PHP執行失敗時執行下面
} catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
}
