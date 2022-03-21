<?php
    /*USE FOR FIX CROS POLICY*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");

    try{
        /*CONNECT WITH DATABASE*/
        require_once("./connect_cfd104g4.php");

        // 訂單編號, 訂購時間, 訂購者, 配送資訊, 訂單狀態
        // order_no, order_time, order_buyer_no, order_way, order_shipping

        $sql = "SELECT order_no, order_time, order_buyer_no, mem_name, order_way, order_shipping, order_tp,	order_price_minus, order_real_price, order_place ,order_over_time, order_satisfy FROM orders
        LEFT JOiN mem ON orders.order_buyer_no = mem.mem_no";

        $orders =  $pdo -> query($sql);

        $ordersRows = $orders->fetchAll(PDO::FETCH_ASSOC);

        $order=[];
        if($orders -> rowCount()>0){
            foreach( $ordersRows as $i => $ordersRow){
                array_push($order,$ordersRow);
            }
            echo json_encode($order);
        }
        
 
    }catch(PDOException $e){
        echo $e->getMessage();
    }


?>