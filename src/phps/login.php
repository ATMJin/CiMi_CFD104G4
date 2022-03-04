<?php
session_start();
try{
  include_once "config.php";
  
  $sql = "select * from mem where mem_id=:mem_id and mem_psw=:mem_psw"; 

  $member = $pdo -> prepare($sql);
  $member -> bindValue(":mem_id", $_POST["mem_id"]);
  $member -> bindValue(":mem_psw", $_POST["mem_psw"]);

  $member -> execute();

  if( $member->rowCount()==0){ //查無此人
	  $php_array1 = array ('noPerson' => "帳號或密碼有誤, 請重新輸入");
    echo json_encode($php_array1);
  }else{ //登入成功

    //自資料庫中取回資料
    $memberRows = $member->fetch(PDO::FETCH_ASSOC);
    $_SESSION["mem_id"] = $memberRows["mem_id"];
    $_SESSION["mem_psw"] = $memberRows["mem_psw"];
    $_SESSION["mem_no"] = $memberRows["mem_no"];
    $_SESSION["mem_head"] = $memberRows["mem_head"];
    
    $php_array = array (
      'output' => "success", 
      'mem_id' => $_SESSION["mem_id"], 
      'mem_psw' => $_SESSION["mem_psw"], 
      'mem_no' => $_SESSION["mem_no"],
      'mem_head' => $_SESSION["mem_head"], 
    );
    echo json_encode($php_array);
  }

}catch(PDOException $e){
  echo $e->getMessage();
}
?>