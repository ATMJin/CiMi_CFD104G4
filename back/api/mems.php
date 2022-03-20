<?php
    /*USE FOR FIX CROS POLICY*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");

    try{
        /*CONNECT WITH DATABASE*/
        require_once("./connect_cfd104g4.php");

        $sql = "SELECT mem_no ,mem_id ,mem_name ,mem_power, mem_state FROM mem where mem_no != 195052890";

        $mems =  $pdo -> query($sql);

        $memRows = $mems->fetchAll(PDO::FETCH_ASSOC);

        $mem=[];
        if($mems -> rowCount()>0){
            foreach( $memRows as $i => $memRow){
                array_push($mem,$memRow);
            }
            echo json_encode($mem);
        }
        
 
    }catch(PDOException $e){
        echo $e->getMessage();
    }


?>