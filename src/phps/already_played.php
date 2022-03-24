<?php 
try {
	require_once("../connect_cfd104g4.php");
	//執行sql指令
	$playdate = $_GET["playdate"];
	$mem_no = $_GET["mem_no"];
	$mem_ans_pack = $_GET["ans_pack"];
    $sql = "update mempairdata set mem_last_play='{$playdate}',mem_ans_pack='{$mem_ans_pack}' where mem_no={$mem_no};";
    

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