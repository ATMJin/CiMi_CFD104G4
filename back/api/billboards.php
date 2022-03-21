<?php
    /*USE FOR FIX CROS POLICY*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");

    try{
        /*CONNECT WITH DATABASE*/
        require_once("./connect_cfd104g4.php");

        //看板
        $sql1 = "SELECT billboard_name, billboard_create, billboard.mem_no, mem_name, billboard_state, billboard_no, billboard_icon FROM mem
        JOIN billboard ON billboard.mem_no = mem.mem_no";

        $boards =  $pdo -> query($sql1);

        $boardsRows = $boards->fetchAll(PDO::FETCH_ASSOC);

        //會員
        $sql2 = "SELECT mem_no, mem_name FROM mem";
        
        $mems =  $pdo -> query($sql2);

        $memsRows = $mems->fetchAll(PDO::FETCH_ASSOC);

        if($boards -> rowCount()>0){

            $php_array = array ('boards' => $boardsRows, 'mems' => $memsRows);
            echo json_encode($php_array);
        }
        
 
    }catch(PDOException $e){
        echo $e->getMessage();
    }


?>