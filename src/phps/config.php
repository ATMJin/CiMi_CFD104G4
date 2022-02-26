<?php
$dbname = "chat";
$user = "root";
$password = "Aa0979025607";

$dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";

$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);

//connected with MySql
$conn = mysqli_connect("localhost", "root", "Aa0979025607", "chat");
if(!$conn){
    echo "Database connected" . mysqli_connect_error();
}
	
//建立pdo物件
$pdo = new PDO($dsn, $user, $password, $options);	

?>