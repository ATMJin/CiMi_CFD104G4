<?php 
try {
	require_once("../connect_cfd104g4.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
    $mem_no=$_GET["mem_no"];
	$mem_point_add = $_GET["mem_point_add"];
	$check_date = $_GET["check_date"];
	$sql = "update mem set mem_point = mem_point + {$mem_point_add}, mem_lastsign = '{$check_date}', mem_stacksign = mem_stacksign + 1 where mem_no={$mem_no};";

	//變為陣列型態


	
	if($pdo->exec($sql)){ //exec用於異動資料的時候
		echo "異動成功~";
	}else{
		echo "異動失敗~";
	}

}catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
}

?>
