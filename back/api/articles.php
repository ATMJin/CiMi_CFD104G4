<?php
    /*USE FOR FIX CROS POLICY*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Content-Type");

    try{
        /*CONNECT WITH DATABASE*/
        require_once("./connect_cfd104g4.php");

        $sql = "SELECT article.billboard_no, article_no, article_content, article_title, publish_date, mem_name, article_state, billboard_icon FROM article 
        left join mem on article.mem_no = mem.mem_no
        left join billboard on billboard.billboard_no = article.billboard_no";

        $articles =  $pdo -> query($sql);

        $articleRows = $articles->fetchAll(PDO::FETCH_ASSOC);

        $article=[];
        if($articles -> rowCount()>0){
            foreach( $articleRows as $i => $articleRow){
                array_push($article,$articleRow);
            }
            echo json_encode($article);
        }
        
 
    }catch(PDOException $e){
        echo $e->getMessage();
    }


?>