<?php 
try {
	require_once("connect_cimi.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
	$mem_no = $_GET["mem_no"];
	// $sql = "select * from mem join mempairdata on mem.mem_no = mempairdata.mem_no where mempairdata.mem_no in (1,2,3);";

	$sql = 
	"select * from mem 
	join mempairdata on mem.mem_no = mempairdata.mem_no 
	where mem_ans_pack = (select mem_ans_pack from mempairdata m where m.mem_no={$mem_no}) 
		AND mempairdata.mem_no <> {$mem_no} 
		AND (mempairdata.mem_sexuality='M,F' 
			OR(mempairdata.mem_sex in (select mem_sexuality from mempairdata m where m.mem_no={$mem_no})
				AND mempairdata.mem_sexuality = (select mem_sex from mempairdata m where m.mem_no={$mem_no})));";

		//  and mem_sex = (select mem_sex from mempairdata m where mem_no={$mem_no))

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
