<?php 
try {
	require_once("connect_cimi.php");
	//執行sql指令
	$playdate = $_GET["playdate"];

    $sql = "update mempairdata set mem_last_play='{$playdate}' where mem_no=1;";
    

	if($pdo->exec($sql)){ //exec用於異動資料的時候
		echo "異動成功~";
	}else{
		echo "異動失敗~";
	}
	
} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
}
 ?>