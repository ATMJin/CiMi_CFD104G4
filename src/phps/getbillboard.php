<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect_suan.php");  // 開發時使用
  
  switch($_GET["case"]){
    case 1:
        // SQL指令
        $sql = "SELECT billboard_name FROM billboard ORDER BY billboard_post"; 
        // 執行
        $save_boards = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $save_boardsRows = $save_boards->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($save_boardsRows);
        break;

    case 2:
        // SQL指令
        $sql = "SELECT billboard_name FROM billboard ORDER BY billboard_post"; 
        // 執行
        $hot_boards = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $hot_boardsRows = $hot_boards->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($hot_boardsRows);
        break;
  }
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
  
?>