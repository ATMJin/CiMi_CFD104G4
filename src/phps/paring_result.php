<?php 
try {
	require_once("connect_cimi.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
	$sql = "select * from mem join mempairdata on mem.mem_no = mempairdata.mem_no where mempairdata.mem_no in (1,2,3);";
	$infos = $pdo->query($sql);
    
	$info_row = $infos->fetchAll(PDO::FETCH_ASSOC);
	//變為陣列型態

	echo json_encode($info_row);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
