<?php
include_once "../connect_cimi.php";
header('Content-Type: application/json; charset=utf-8');
    //接收xhr送過來的資料 像是性向 / 自我介紹等等...
    $mem_no = $_POST['mem_no'];
    $mem_birth = $_POST['birth'];
    $mem_sex = $_POST['sex'];
    $mem_sexuality = $_POST['sexuality'];
    $mem_relation = $_POST['relationship'];
    $mem_job = $_POST['job'];
    $mem_school = $_POST['school'];
    $mem_try = $_POST['try'];
    $mem_interests = $_POST['interests'];
    $mem_lovecountry = $_POST['lovecountry'];
    $mem_exchange = $_POST['exchange'];
    $mem_mem_sign = $_POST['sign'];


    //update

    $sql = "UPDATE mempairdata SET mem_birth = '{$mem_birth}', mem_sex = '{$mem_sex}',  mem_sexuality = '{$mem_sexuality}',  mem_relationship = '{$mem_relation}', mem_job = '{$mem_job}', mem_school = '{$mem_school}', mem_try = '{$mem_try}',mem_interests = '{$mem_interests}',mem_lovecountry = '{$mem_lovecountry}',mem_exchange = '{$mem_exchange}', mem_sign = '{$mem_mem_sign}' WHERE mem_no = {$mem_no}";
    
    
    //執行sql

    $pdo->query($sql);


?>