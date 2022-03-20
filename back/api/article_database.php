<?php
session_start();
try{
  require_once("./connect_cfd104g4.php");
  
  // // SQL指令
  // $sql = "SELECT * FROM billboard where billboard_name=:billboard_name"; 

  // $billbord = $pdo->prepare($sql);
  // $billbord->bindValue(":billboard_name",$_POST["billboard_name"]);
  
  // // 執行
  // $billbord->execute();

  // $Bname = $_POST['billboard_name'];



  // SQL指令
  $article_no=$_POST["article_no"];
  $sql = "SELECT * FROM article where article_no={$article_no};"; 
  // $sql = "SELECT * FROM article ;"; 
  $article = $pdo->query($sql);

  // 將取得的資料轉成陣列形式
  $articleRows = $article->fetch(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($articleRows);


  // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>