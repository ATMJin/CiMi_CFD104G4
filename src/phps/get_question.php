<?php 
try {
	require_once("connect_cimi.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
	$sql = "select * from paring_question";
	$questions = $pdo->query($sql);

	$ques_row = $questions->fetchAll(PDO::FETCH_ASSOC);
	//變為陣列型態

	// shuffle($ques_row);

	echo json_encode($ques_row);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
