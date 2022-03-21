<?php

/*CONNECT WITH DATABASE*/
require_once("./connect_cfd104g4.php");

 /*USE FOR FIX CROS POLICY*/
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, PUT");
 header("Access-Control-Allow-Headers: Content-Type");




switch($_POST["state"]){
    case "delete":
        $mem_no = $_POST['mem_no'];
        // SQL指令
        $sql = "DELETE FROM mem WHERE mem_no = $mem_no";
        // 執行
        $pdo -> query($sql);
        break;
    case "renew":
        $mem_no = $_POST['mem_no'];
        $mem_power = $_POST['mem_power'];
        $mem_state = $_POST['mem_state'];
        $sql = "UPDATE mem  SET mem_state = $mem_state, mem_power = $mem_power WHERE mem.mem_no = $mem_no";
        $pdo -> query($sql);
        break;
  }

?>