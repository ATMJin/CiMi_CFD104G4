<?php
try{
    // require_once("../connect_cfd104g4.php"); // 上線時使用
    require_once("test_connect.php");  // 開發時使用
    
    $article_case=$_GET["case"];
    switch ($article_case) {
		// 最新文章
        case 1:
			$billboard_no=1;
			$sql = "SELECT a.article_no, a.mem_no, a.publish_date, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, m.mem_name, count(c.article_comment_no) comment_amount, b.billboard_name ,b.billboard_main_icon, m.mem_head,b.billboard_no
			FROM article a 
			JOIN mem m
			on a.mem_no=m.mem_no
			left JOIN article_comment c
			on a.article_no = c.article_no
			JOIN billboard b
			on a.billboard_no=b.billboard_no
			WHERE a.billboard_no=? and a.article_state=0
			GROUP BY a.article_no
			order by a.publish_date desc;";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(1, $billboard_no);//給值
			$articles->execute();//執行
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($articleRows);    
        break;
		// 熱門文章
		case 2:
			$billboard_no=1;
			$sql = "SELECT a.article_no, a.mem_no, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, m.mem_name, count(c.article_comment_no) comment_amount, b.billboard_name ,b.billboard_main_icon, m.mem_head,b.billboard_no
			FROM article a 
			JOIN mem m
			on a.mem_no=m.mem_no
			left JOIN article_comment c
			on a.article_no = c.article_no
			JOIN billboard b
			on a.billboard_no=b.billboard_no
			WHERE a.billboard_no=? and a.article_state=0 
			GROUP BY a.article_no
			order by article_likes_amount desc;";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(1, $billboard_no);//給值
			$articles->execute();//執行
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

			echo json_encode($articleRows);    
		break;
		// 抓取可能會喜歡的文章資訊
		case 3:
			$sql = "select a.article_title, a.article_likes_amount, count(c.article_comment_no) comment_amount, b.billboard_no, a.article_pic
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
		// 抓取留言資訊資料 
		case 4:
			$sql = "SELECT c.comment_date, c.comment_content, c.comment_likes_amount, m.mem_name, m.mem_head,c.article_no
			FROM article_comment c
			JOIN mem m
			on c.mem_no=m.mem_no
			order by comment_date desc;
			";
			$articles = $pdo->query($sql);
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

			echo json_encode($articleRows);    
		break;
			
 	}
   // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
 ?>