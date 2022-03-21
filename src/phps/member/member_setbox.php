<?php 
  include_once "member_config.php";
  header('Content-Type: application/json; charset=utf-8');
        $mem_no = $_POST['mem_no'];
        $mem_name = $_POST['mem_name'];
        $mem_mail = $_POST['mem_mail'];
        $mem_psw = $_POST['mem_psw'];
        $mem_tel = $_POST['mem_tel'];
        $mem_local = $_POST['mem_local'];

        $sql1 = "UPDATE mem
                SET mem_name = '{$mem_name}',mem_mail = '{$mem_mail}',mem.mem_tel = '{$mem_tel}',
                    mem_psw ='{$mem_psw}'
                WHERE mem_no = {$mem_no}";
        $sql2 = "UPDATE mempairdata
                SET mem_local = '{$mem_local}'
                WHERE mem_no = {$mem_no} ";

        $pdo -> query($sql1);
        $pdo -> query($sql2);
?>