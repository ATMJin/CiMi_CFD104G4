<?php 
try {
	require_once("../connect_cfd104g4.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
	$mem_no=$_GET["mem_no"];
	$sql = "select mem_last_play from mempairdata where mem_no={$mem_no}";
	$mem_last_play = $pdo->query($sql);

	$mem_last_play_row = $mem_last_play->fetch(PDO::FETCH_ASSOC);
	//變為陣列型態


	echo json_encode($mem_last_play_row);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
