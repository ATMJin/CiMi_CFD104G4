<?php

/*CONNECT WITH DATABASE*/
require_once("./connect_cfd104g4.php");

/*USE FOR FIX CROS POLICY*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");


switch ($_POST["phpState"]) {
    case "delete":
        $goods_no = $_POST['goods_no'];
        
        // sql 指令
        $sql = "DELETE FROM goods WHERE (goods_no = $goods_no)";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "renew":
        $goods_class = $_POST['goods_class'];
        $goods_name = $_POST['goods_name'];
        $goods_i = $_POST['goods_i'];
        $goods_price = (int)$_POST['goods_price'];
        $goods_firm = $_POST['goods_firm'];
        $goods_st = (int)$_POST['goods_st'];
        $goods_no = (int)$_POST['goods_no'];

        // sql 指令
        $sql = "UPDATE goods SET goods_class = '{$goods_class}', goods_name = '{$goods_name}', goods_i = '{$goods_i}', goods_price = $goods_price, goods_firm = '{$goods_firm}', goods_st = $goods_st WHERE goods_no = $goods_no";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "createNew":
        $goods_class = $_POST['goods_class'];
        $goods_name = $_POST['goods_name'];
        $goods_i = $_POST['goods_i'];
        $goods_price = (int)$_POST['goods_price'];
        $goods_firm = $_POST['goods_firm'];
        $goods_st = (int)$_POST['goods_st'];


        // sql 指令
        $sql = "INSERT INTO goods (goods_class, goods_name, goods_i, 	        goods_price, goods_firm, goods_st, 	goods_creat) 
        VALUES ('{$goods_class}',  '{$goods_name}', '{$goods_i}',  $goods_price, '{$goods_firm}', $goods_st, now())";

        // 執行 sql
        $pdo->query($sql);

        break;
   
}
