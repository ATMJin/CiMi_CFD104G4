<?php 
try {
	require_once("../connect_cfd104g4.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
    $mem_no=$_GET["mem_no"];
	$sql = "select mem_no, mem_lastsign from mem where mem_no={$mem_no}";
	$attendence = $pdo->query($sql);

	$attendence_row= $attendence->fetchAll(PDO::FETCH_ASSOC);
	//變為陣列型態


	echo json_encode($attendence_row);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
