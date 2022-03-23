
<?php
//全部商品
  include_once "connect.php";

// switch可以不用分開在寫一支php
switch ($_GET["case"]) {

  case 'allgoods':
  // 撈所有的商品
  $sql = "SELECT * FROM goods";
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

  //如果不是allgoods就跑底下的的
    break;
    case 'goodscomment':  
        // 所有的商品留言
        $sql = "SELECT `goods_comment_no`, g.mem_no, `goods_no`, `comment_date`, `comment_content`, `comment_likes_amount`, `mem_id`, `mem_name`, `mem_head` FROM `goods_comment` g JOIN `mem` m ON g.mem_no=m.mem_no";
        $comment = $pdo -> query($sql);
        $commentRows = $comment->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($commentRows);
        break;  
  
    case "writecomment":
      $comment_content=$_GET["comment_content"];
			$comment_date=$_GET["comment_date"];
			$mem_no=$_GET["mem_no"];
			$article_no=$_GET["article_no"];

			$sql = "INSERT INTO goods_comment(mem_no, goods_no, comment_date, comment_content)
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
  default:
    # code...
    break;
}


?>