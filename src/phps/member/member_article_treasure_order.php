<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("../connect.php");  // 開發時使用
  // include_once "member_config.php";  // 建均的

    // 所有資料撈完，一次送出，減少讀檔次數

    // 會員文章
    $sql1 = "SELECT a.article_no, a.article_title, a.article_content, a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_no, m.mem_name, m.mem_head 
    FROM `article` a 
    JOIN `mem` m ON a.mem_no=m.mem_no"; 
    $articles = $pdo->query($sql1);
    $articlesRows = $articles->fetchAll(PDO::FETCH_ASSOC);

    // 會員訂單
    $sql2 = "SELECT *
    FROM `orders` o
    JOIN `mem` m ON o.order_buyer_no=m.mem_no"; 
    $order = $pdo->query($sql2);
    $orderRows = $order->fetchAll(PDO::FETCH_ASSOC);

    // 會員收藏看板
    $sql3 = "SELECT * 
    FROM `mem_billboard` "; 
    $billboard = $pdo->query($sql3);
    $billboardRows = $billboard->fetchAll(PDO::FETCH_ASSOC);

    // 會員收藏文章
    $sql4 = "SELECT * FROM `mem_articles_follow` "; 
    $articlesFollow = $pdo->query($sql4);
    $articlesFollowRows = $articlesFollow->fetchAll(PDO::FETCH_ASSOC);

    // 會員追蹤作者
    $sql5 = "SELECT * 
    FROM `trackwriter` "; 
    $trackwriter = $pdo->query($sql5);
    $trackwriterRows = $trackwriter->fetchAll(PDO::FETCH_ASSOC);


    $allRows=[
      $articlesRows, 
      $orderRows, 
      $billboardRows, 
      $articlesFollowRows, 
      $trackwriterRows
    ];
    echo json_encode($allRows);


  // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>