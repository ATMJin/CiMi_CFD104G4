<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect_suan.php");  // 開發時使用
  
  switch($_GET["case"]){
    case "chartsname":
        // SQL指令
        $sql = "SELECT mem_name FROM mem"; 
        // 執行
        $charts_mem = $pdo -> query($sql);
        // // 將取得的資料轉成陣列形式
        $charts_memRows = $charts_mem->fetchAll(PDO::FETCH_ASSOC);
        // // 將陣列轉成json格式後傳出去
        echo json_encode($charts_memRows);
        break;

    case 2:

        break;
  }
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
  
?>