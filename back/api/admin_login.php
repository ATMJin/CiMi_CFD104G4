<?php


// /*USE FOR FIX CROS POLICY*/
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT");
// header("Access-Control-Allow-Headers: Content-Type");


// /*要接收 JSON 字符串，
// 我們可以使用“php://input”和函數file_get_contents()，
// 它可以幫助我們將 JSON 數據作為文件接收並將其讀入字符串。
// 稍後，我們可以使用json_decode()函數對 JSON 字符串進行解碼。*/

$request = json_decode(file_get_contents("php://input"));



try{
    /*CONNECT WITH DATABASE*/
    require_once("./connect_cfd104g4.php");
    $sql = "select * from admin where admin_id=:admin_id and admin_pwd=:admin_pwd"; 
  
    $admin= $pdo -> prepare($sql);
    $admin -> bindValue(":admin_id", $request->email);
    $admin -> bindValue(":admin_pwd", $request->password);
  
    $admin -> execute();
  
    if( $admin->rowCount()==0){ //查無此人
        $php_array1 = array ('noPerson' => "帳號或密碼有誤, 請重新輸入");
        echo json_encode($php_array1);

    }else{ //登入成功
  
      //自資料庫中取回資料
      $adminRows = $admin->fetch(PDO::FETCH_ASSOC);
      
      $php_array = array (
        'output' => "success",
      );
      echo json_encode($php_array);

    }

  
  }catch(PDOException $e){
    echo "錯誤行號 : ", $e->getLine(), "<br>";
	  echo "錯誤原因 : ", $e->getMessage(), "<br>";
  }
