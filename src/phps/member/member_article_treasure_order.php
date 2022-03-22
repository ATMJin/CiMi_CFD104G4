<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("../connect.php");  // 開發時使用
  // include_once "member_config.php";  // 建均的

    // 所有資料撈完，一次送出，減少讀檔次數
    $mem_no=$_GET['mem_no'];
    // 會員文章
    $sql1 = "SELECT a.article_no, a.article_title, a.article_content, a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_no, m.mem_name, m.mem_head 
    FROM `article` a 
    JOIN `mem` m ON a.mem_no=m.mem_no
    WHERE a.mem_no={$mem_no}"; 
    $articles = $pdo->query($sql1);
    $articlesRows = $articles->fetchAll(PDO::FETCH_ASSOC);

    // 會員訂單
    $sql2 = "SELECT o.*
    FROM `orders` o
    JOIN `mem` m ON o.order_buyer_no = m.mem_no
    WHERE o.order_buyer_no={$mem_no};"; 
    $order = $pdo->query($sql2);
    $orderRows = $order->fetchAll(PDO::FETCH_ASSOC);

    // 會員訂單商品
    $sql2_1 = "SELECT o.*, p.product_total, p.goods_order_price, g.goods_no, g.goods_name, g.goods_pic1
    FROM `orders` o
    JOIN `product` p ON o.order_no = p.order_no
    JOIN `goods` g ON p.goods_no = g.goods_no
    WHERE o.order_buyer_no={$mem_no};"; 
    $ordergoods = $pdo->query($sql2_1);
    $ordergoodsRows = $ordergoods->fetchAll(PDO::FETCH_ASSOC);

    // 會員收藏看板
    $sql3 = "SELECT * 
    FROM `mem_billboard` mb
    JOIN `billboard` b ON mb.mem_billboard_no = b.billboard_no
    WHERE mb.mem_no={$mem_no}"; 
    $billboard = $pdo->query($sql3);
    $billboardRows = $billboard->fetchAll(PDO::FETCH_ASSOC);

    // 會員收藏文章
    $sql4 = "SELECT ma.article_no, a.article_title, a.article_content, a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_no, m.mem_name, m.mem_head 
    FROM `mem_articles_follow` ma
    JOIN `article` a ON ma.article_no = a.article_no
    JOIN `mem` m ON a.mem_no=m.mem_no
    WHERE ma.mem_no={$mem_no}"; 
    $articlesFollow = $pdo->query($sql4);
    $articlesFollowRows = $articlesFollow->fetchAll(PDO::FETCH_ASSOC);

    // 會員追蹤作者
    $sql5 = "SELECT t.mem_no, t.writer_no, m.mem_id, m.mem_head, m.mem_name 
    FROM `trackwriter` t
    JOIN `mem` m ON t.writer_no = m.mem_no
    WHERE t.mem_no={$mem_no}"; 
    $trackwriter = $pdo->query($sql5);
    $trackwriterRows = $trackwriter->fetchAll(PDO::FETCH_ASSOC);


    $allRows=[
      $articlesRows, 
      $ordergoodsRows,
      $billboardRows, 
      $articlesFollowRows, 
      $trackwriterRows,
      $orderRows
    ];
    echo json_encode($allRows);


  // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>