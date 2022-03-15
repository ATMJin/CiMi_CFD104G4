<?php 

try {
	require_once("connect_cimi.php");
	//require=>沒有回傳值
	//執行sql指令並取得pdoStatement
    $date = date("w");
    $question_no = [$date*3,$date*3+1,$date*3+2];
    // echo($date);
    // print_r($question_no);
    // echo($question_no[1]);

	$sql = "select * from mempairdata m join paring_player_ans p on m.mem_no=p.mem_no 
            where question_no ={$question_no[0]}=(select  ";

    // mem_job, mem_school, mem_sign, mem_interests, mem_lovecountry, mem_exchange, mem_try
	$paring_info = $pdo->query($sql);

	$paring_mates = $paring_info->fetchAll(PDO::FETCH_ASSOC);
	//變為陣列型態

	// shuffle($ques_row);

	echo json_encode($paring_mates);
	//轉成json

} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	//echo "系統暫時不能正常運行，請稍後再試<br>";	
}
?>
