<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect_suan.php");  // 開發時使用
  
  switch($_GET["case"]){
    case 1: // 發文數
        // SQL指令
        $sql = "SELECT mem_id, mem_name,mem_head,COUNT(a.mem_no) AS mem_post
        FROM mem m 
        JOIN article a 
        ON a.mem_no = m.mem_no
        WHERE a.article_no IS NOT NULL
        GROUP BY a.mem_no
        ORDER BY mem_post DESC
        LIMIT 5"; 
        // 執行
        $charts_account = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $charts_accountRows = $charts_account->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($charts_accountRows);
        break;

    case 2: //喜歡數
      // SQL指令
      $sql = "SELECT mem_id, mem_name,mem_head,article_likes_amount
      FROM mem m 
      JOIN article a 
      ON a.mem_no = m.mem_no
      WHERE a.article_likes_amount IS NOT NULL
      ORDER BY a.article_likes_amount DESC
      LIMIT 5"; 
      // 執行
      $charts_account = $pdo -> query($sql);
      // // 將取得的資料轉成陣列形式
      $charts_accountRows = $charts_account->fetchAll(PDO::FETCH_ASSOC);
      // // 將陣列轉成json格式後傳出去
      echo json_encode($charts_accountRows);
      break;

    case 3: //收藏數
        // SQL指令
        $sql = "SELECT mem_id, mem_name,mem_head,article_collect_amount
        FROM mem m 
        JOIN article a 
        ON a.mem_no = m.mem_no
        WHERE a.article_collect_amount IS NOT NULL
        ORDER BY a.article_collect_amount DESC
        LIMIT 5"; 
        // 執行
        $charts_account = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $charts_accountRows = $charts_account->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($charts_accountRows);
        break;

    case 4: //追蹤數
        // SQL指令
        $sql = "SELECT mem_id, mem_name,mem_head,writer_no
        FROM trackwriter t
        JOIN mem m 
        ON t.writer_no = m.mem_no
        WHERE t.writer_no IS NOT NULL
        GROUP BY t.writer_no
        ORDER BY t.writer_no DESC
        LIMIT 5"; 
        // 執行
        $charts_account = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $charts_accountRows = $charts_account->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($charts_accountRows);
        break;

    case "insertFollow":
        // $sql = "INSERT INTO `trackwriter` (`mem_no`, `writer_no`) VALUES ({$_GET['mem_no']}, {$_GET['writer_no']})"; 
        $sql = "INSERT INTO `trackwriter` (`mem_no`, `writer_no`) VALUES (8, 6)"; 
        // 執行
        $charts_account = $pdo -> exec($sql);
        break;

    case "deleteFollow":
          // $sql="DELETE FROM `trackwriter` WHERE `trackwriter`.`mem_no` = 8 AND `trackwriter`.`writer_no` = 6"
        // 執行
        // $charts_account = $pdo -> query($sql);
        echo 'hi';
        break;
  }
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
  
?>