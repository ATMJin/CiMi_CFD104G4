<?php
    /*USE FOR FIX CROS POLICY*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");

    try{
        /*CONNECT WITH DATABASE*/
        require_once("./connect_cfd104g4.php");

        $sql = "SELECT goods_no, goods_name, goods_st, goods_pic1, goods_i, goods_price, goods_firm, goods_class FROM goods ";

        

        $goods =  $pdo -> query($sql);
        $goodsRows = $goods->fetchAll(PDO::FETCH_ASSOC);

        $sql1 = "SELECT goods_pic1 from goods";
        $img = $pdo -> query($sql1);
        $imgRows = $img->fetchAll(PDO::FETCH_ASSOC);


        $good=[];

        if($goods -> rowCount()>0){
            foreach( $goodsRows as $i => $goodsRow){
                array_push($good,$goodsRow);
            }
            $arr = array ('img' => $imgRows, 'goods' => $goodsRows);
            echo json_encode($arr);
        }
        
 
    }catch(PDOException $e){
        echo $e->getMessage();
    }


?>