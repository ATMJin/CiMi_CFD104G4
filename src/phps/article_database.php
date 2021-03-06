<?php
try{
    require_once("../connect_cfd104g4.php"); // 上線時使用
    // require_once("connect.php");  // 開發時使用
  

    $article_case=$_POST["case"];
    switch ($article_case) {
		// 最新文章
        case 1:
			$billboard_no = $_POST["boardNo"];	
			// $billboard_no=1;
			$sql = "SELECT a.article_no, a.mem_no, a.publish_date, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_name, count(c.article_comment_no) comment_amount, b.billboard_name ,b.billboard_main_icon, m.mem_head,b.billboard_no
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
			$billboard_no = $_POST["boardNo"];	
			// $billboard_no=1;
			$sql = "SELECT a.article_no, a.mem_no, a.last_edit_date, a.article_title, a.article_content,  a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_name, count(c.article_comment_no) comment_amount, b.billboard_name ,b.billboard_main_icon, m.mem_head,b.billboard_no
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
			$billboard_no = $_POST["boardNo"];

			$sql = "select a.article_title, a.article_likes_amount, count(c.article_comment_no) comment_amount, b.billboard_no, a.article_pic, a.article_no
			from article a
			left JOIN article_comment c
			on a.article_no = c.article_no
			JOIN billboard b
			on b.billboard_no = a.billboard_no
			where b.billboard_no =?
			group by a.article_no
			order by a.article_likes_amount desc
			limit 4;
			";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(1, $billboard_no);//給值
			$articles->execute();//執行
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

			echo json_encode($articleRows);    
		break;

		// 抓取留言資訊資料 
		case "find_comment_info":

			$sql = "SELECT c.article_comment_no,c.comment_date, c.comment_content, c.comment_likes_amount, c.article_no, m.mem_name, m.mem_head,m.mem_id
			FROM tibamefe_cfd104g4.article_comment c
			JOIN mem m
			on c.mem_no=m.mem_no
			where c.article_no=:article_no
			order by comment_date desc;
			";
			$article_no = $_POST["article_no"];
			$articles = $pdo->prepare($sql);
			$articles->bindValue(":article_no", $article_no);//給值
			$articles->execute();//執行
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);
			
			
			

			echo json_encode($articleRows);    
		break;


		case 5:
			$billboard_no = $_POST["boardNo"];	
			// $billboard_no=1;
			$sql = "SELECT billboard_name, billboard_main_icon, billboard_no,billboard_banner
			FROM billboard
			WHERE billboard_no=?;";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(1, $billboard_no);//給值
			$articles->execute();//執行
			$articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

			echo json_encode($articleRows);   
		break;

		// 加入追蹤
		case "add_follow":
			$billboard_no = $_POST["boardNo"];
			$mem_no=$_POST["mem_no"];	
			// $billboard_no=1;
			$sql = "INSERT INTO mem_billboard(mem_no, mem_billboard_no)	VALUES (:mem_no,:mem_board_no);";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(":mem_no", $mem_no);//給值
			$articles->bindValue(":mem_board_no", $billboard_no);//給值
			if($articles->execute()){//執行
				echo"異動成功";
			}else{
				echo"異動失敗";
			}

		break;

		// 取消追蹤
		case "remove_follow":
			$billboard_no = $_POST["boardNo"];
			$mem_no=$_POST["mem_no"];
			// $billboard_no=1;
			$sql = "DELETE FROM mem_billboard
			WHERE mem_no=:mem_no and mem_billboard_no=:mem_board_no;";
			$articles = $pdo->prepare($sql);
			$articles->bindValue(":mem_no", $mem_no);//給值
			$articles->bindValue(":mem_board_no", $billboard_no);//給值
			if($articles->execute()){//執行
				echo"異動成功";
			}else{
				echo"異動失敗";
			}

		break;


		case "remove_comment_like":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article_comment
			SET comment_likes_amount = comment_likes_amount - 1 
			WHERE article_comment_no ={$_POST['article_comment_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		// 寫下留言
		case "get_comment":
			$comment_content=$_POST["comment_content"];
			$comment_date=$_POST["comment_date"];
			$mem_no=$_POST["mem_no"];
			$article_no=$_POST["article_no"];

			$sql = "INSERT INTO article_comment(mem_no, article_no, comment_date, comment_content)
			VALUES(:mem_no,:article_no,:comment_date,:comment_content);";
			$articles = $pdo->prepare($sql);

			// $articles->bindValue(":mem_no", 2);//給值
			// $articles->bindValue(":article_no", 5);//給值
			// $articles->bindValue(":comment_date", "2022-03-21");//給值
			// $articles->bindValue(":comment_content", "NICE!!");//給值

			$articles->bindValue(":mem_no", $mem_no);//給值
			$articles->bindValue(":article_no", $article_no);//給值
			$articles->bindValue(":comment_date", $comment_date);//給值
			$articles->bindValue(":comment_content", $comment_content);//給值
			if($articles->execute()){//執行
				echo"異動成功";
			}else{
				echo"異動失敗";
			}

		break;

		
		case "add_like":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_likes_amount = article_likes_amount + 1 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		case "remove_like":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_likes_amount = article_likes_amount - 1 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		case "add_collect":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_collect_amount = article_collect_amount + 1 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		case "remove_collect":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_collect_amount = article_collect_amount - 1 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		case "add_impeach":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_impeach = 1 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		case "remove_impeach":
			// 撈所有商品   來自goods表格 依據被喜歡數排序 前4筆資料
			$sql = "UPDATE article SET article_impeach = 0 WHERE article_no ={$_POST['article_no']}";
		
			//執行sql
			//   $pdo->exec($sql);
			if($pdo->exec($sql)){ //exec用於異動資料的時候
				echo "異動成功~";
			}else{
				echo "異動失敗~";
			}
	 	break;

		
	}	

 	
   // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
 ?>