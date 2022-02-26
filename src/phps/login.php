<?php
session_start();
try{
  include_once "config.php";
  
  $sql = "select * from users where email=:memId and password=:memPsw"; 

  $member = $pdo -> prepare($sql);
  $member -> bindValue(":memId", $_POST["email"]);
  $member -> bindValue(":memPsw", $_POST["password"]);

  $member -> execute();

  if( $member->rowCount()==0){ //查無此人
	  echo "exist";
  }else{ //登入成功

    //自資料庫中取回資料
    $memberRows = $member->fetch(PDO::FETCH_ASSOC);
    $_SESSION["memId"] = $memberRows["email"];
    $_SESSION["memPsw"] = $memberRows["password"];
    $_SESSION["unique_id"] = $memberRows["unique_id"];

    echo "success";
  }

}catch(PDOException $e){
  echo $e->getMessage();
}
?>