<?php 
try {
	require_once("../connect_cfd104g4.php");
	//執行sql指令
	$question_no = $_GET["question_no"];
	$mem_ans = $_GET["mem_ans"];
	$mem_no = $_GET["mem_no"];

    $sql = "INSERT INTO paring_player_ans(question_no,mem_no,paring_ans)
            VALUES({$question_no},{$mem_no},'{$mem_ans}');";
    

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