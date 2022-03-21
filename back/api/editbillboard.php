<?php

/*CONNECT WITH DATABASE*/
require_once("./connect_cfd104g4.php");

/*USE FOR FIX CROS POLICY*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");


switch ($_POST["phpState"]) {
    case "delete":
        $billboard_no = $_POST['billboard_no'];

        // sql 指令
        $sql = "DELETE FROM billboard WHERE (billboard_no = $billboard_no)";

        // 執行 sql
        $pdo->query($sql);

        break;

    case "renew":

        $mem_no = (int)$_POST['mem_no'];
        $mem_name = $_POST['mem_name'];
        $billboard_state = (int)$_POST['billboard_state'];
        $billboard_icon = (string)$_POST['billboard_icon'];
        $billboard_no = (int)$_POST['billboard_no'];

        // sql 指令
        $sql = "UPDATE billboard SET mem_no = $mem_no, 
        billboard_state = $billboard_state, billboard_icon = '{$billboard_icon}' WHERE billboard_no = $billboard_no ";

        echo "test";

        // // 執行 sql
        $pdo->query($sql);

        break;

    case "createNew":
        $billboard_name = $_POST['billboard_name'];
        $billboard_icon = $_POST['billboard_icon'];
        $billboard_state = (int)$_POST['billboard_state'];
        $mem_name = $_POST['mem_name'];
        $mem_no = (int)$_POST['mem_no'];

        // sql 指令
        $sql = "INSERT INTO billboard (mem_no, billboard_name, billboard_create, billboard_icon, billboard_state) 
        VALUES ($mem_no, '{$billboard_name}', now(), '{$billboard_icon}', billboard_state)";

        // 執行 sql
        $pdo->query($sql);

        break;
}
