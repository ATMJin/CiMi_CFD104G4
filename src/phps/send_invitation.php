<?php 
try {
	require_once("connect_cimi.php");
	//執行sql指令
	$player_no = $_GET["player_no"];
	$paring_player_no = $_GET["paring_player_no"];
	$paring_time = $_GET["paring_time"];
    $send_invitation = $_GET["send_invitation"];

    $sql = "INSERT INTO paring_result(player_no,paring_player_no,paring_time,send_invitation)
            VALUES({$player_no},{$paring_player_no},'{$paring_time}','{$send_invitation}');";
    

	if($pdo->exec($sql)){ //exec用於異動資料的時候
		echo "異動成功~";
	}else{
		echo "異動失敗~";
	}


	$sql2 = "INSERT INTO mifriend(mem_no,mi_no) 
	SELECT a.player_no,a.paring_player_no FROM paring_result a JOIN paring_result b on a.player_no = b.paring_player_no AND a.paring_player_no=b.player_no WHERE a.player_no={$player_no} or a.paring_player_no={$player_no};";
	

	if($pdo->exec($sql2)){ //exec用於異動資料的時候
		echo "2異動成功~";
	}else{
		echo "2異動失敗~";
	}

	
}catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
}
 ?>