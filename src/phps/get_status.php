<?php 
try {
	require_once("../connect_cfd104g4.php");
	//require=>沒有回傳值
	$today = date("Y-m-d H:i:s");   
	$paring_time = substr($today,0,10);
	

    $mem_no = $_GET["mem_no"];
	//執行sql指令並取得pdoStatement
	$sql = "select * from paring_result where player_no={$mem_no} AND paring_time like'{$paring_time}%'";
	$status_m= $pdo->query($sql);

	$status = $status_m->fetchAll(PDO::FETCH_ASSOC);
	//變為陣列型態

	// shuffle($ques_row);
	
	echo json_encode($status);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
