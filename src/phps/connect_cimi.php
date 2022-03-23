<?php
    $dbname = "tibamefe_cfd104g4";
    $user = "root";
    $password = "Cfd10430";

    $dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";

    $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
    //PDO::ATTR_ERRMODE：錯誤報告。
    //PDO::ERRMODE_EXCEPTION: 拋出 exceptions 異常。
    //PDO::ATTR_CASE：強制列名為指定的大小寫。
    //PDO::CASE_NATURAL：保留數據庫驅動返回的列名。
    
    //建立pdo物件
    $pdo = new PDO($dsn, $user, $password, $options);	
?>