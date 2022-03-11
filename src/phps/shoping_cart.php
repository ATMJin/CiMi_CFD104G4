<?php
session_start();
try{
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect.php");  // 開發時使用
  
$shopcase=$_GET["case"];
  
switch ($shopcase) {
  case "getGoodsInfo":
    $sql = "SELECT goods_no,goods_name,goods_price,goods_pic1 FROM goods;"; 
    $goods = $pdo->query($sql);
    $goodsRows = $goods->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($goodsRows);
    break;

  case "addLoveGoods":
    $mem_no = $_GET["mem_no"];
    $goods_no = $_GET["goods_no"];
    $sql = "INSERT INTO `mem_goods_like` (`mem_no`, `goods_no`) VALUES ({$mem_no},{$goods_no});"; 
    $goods = $pdo->exec($sql);
    break;
  
  case "getLoveGoods":
    $mem_no = $_GET["mem_no"];
    $sql = "SELECT goods_no FROM mem_goods_like WHERE mem_no=$mem_no;"; 
    $sql = "SELECT goods_no,goods_name,goods_price,goods_pic1 FROM goods WHERE goods_no IN (
    SELECT goods_no FROM mem_goods_like WHERE mem_no=$mem_no);"; 
    $goods = $pdo->query($sql);
    $goodsRows = $goods->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($goodsRows);
    break;


  default:
    # code...
    break;
}

  


  // PHP執行失敗時執行下面
}catch(PDOException $e){
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
}
?>