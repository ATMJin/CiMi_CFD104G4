<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect_suan.php");  // 開發時使用
  
  $case_no= $_GET["case"]
  if ($case_no==1) {
  // SQL指令
  $sql = "SELECT billboard_name FROM billboard ORDER BY billboard_post"; 
  $boards = $pdo -> query($sql);
  // 執行
  $boardsRows = $boards->fetchAll(PDO::FETCH_ASSOC);

  // 將取得的資料轉成陣列形式
  // $memberRows = $member->fetch(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($boardsRows);
  // print_r($boardsRoews);
  
  }else if($case_no==2)
    // SQL指令
    $sql = "SELECT billboard_name FROM billboard"; 
    $boards = $pdo -> query($sql);
    // 執行
    $boardsRows = $boards->fetchAll(PDO::FETCH_ASSOC);
  
    // 將取得的資料轉成陣列形式
    // $memberRows = $member->fetch(PDO::FETCH_ASSOC);
    
    // 將陣列轉成json格式後傳出去
    echo json_encode($boardsRows);
    // print_r($boardsRoews);

  // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>