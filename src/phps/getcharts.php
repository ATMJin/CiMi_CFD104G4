<?php
require_once("config.php");

switch ($_POST["case"]) {
    case "null":
        //發文
        $sql1 = "SELECT mem_id, mem_name,mem_head,COUNT(a.mem_no) AS mem_post
FROM mem m 
JOIN article a 
ON a.mem_no = m.mem_no
WHERE a.article_no IS NOT NULL
GROUP BY a.mem_no
ORDER BY mem_post DESC";

        $post = $pdo->query($sql1);
        $postRows = $post->fetchAll(PDO::FETCH_ASSOC);

        //喜歡
        $sql2 = "SELECT mem_id, mem_name,mem_head,article_likes_amount
FROM mem m 
JOIN article a 
ON a.mem_no = m.mem_no
WHERE a.article_likes_amount IS NOT NULL
ORDER BY a.article_likes_amount DESC
LIMIT 5";

        $like = $pdo->query($sql2);
        $likeRows = $like->fetchAll(PDO::FETCH_ASSOC);

        //收藏
        $sql3 = "SELECT mem_id, mem_name,mem_head,article_collect_amount
FROM mem m 
JOIN article a 
ON a.mem_no = m.mem_no
WHERE a.article_collect_amount IS NOT NULL
ORDER BY a.article_collect_amount DESC
LIMIT 5";

        $fav = $pdo->query($sql3);
        $favRows = $fav->fetchAll(PDO::FETCH_ASSOC);


        //追蹤
        $sql4 = "SELECT mem_id, mem_name,mem_head,writer_no
FROM trackwriter t
JOIN mem m 
ON t.writer_no = m.mem_no
WHERE t.writer_no IS NOT NULL
GROUP BY t.writer_no
ORDER BY t.writer_no DESC
LIMIT 5";
        $follow = $pdo->query($sql4);
        $followRows = $follow->fetchAll(PDO::FETCH_ASSOC);

        $php_array = array('post' => $postRows, 'like' => $likeRows, 'fav' => $favRows, 'follow' => $followRows, 'track' => []);
        echo json_encode($php_array);
        break;

    case "success":
        //發文
        $sql1 = "SELECT mem_id, mem_name,mem_head,COUNT(a.mem_no) AS mem_post, m.mem_no
        FROM mem m 
        JOIN article a 
        ON a.mem_no = m.mem_no
        WHERE a.article_no IS NOT NULL
        GROUP BY a.mem_no
        ORDER BY mem_post DESC";

        $post = $pdo->query($sql1);
        $postRows = $post->fetchAll(PDO::FETCH_ASSOC);

        //喜歡
        $sql2 = "SELECT mem_id, mem_name,mem_head,article_likes_amount,  m.mem_no
        FROM mem m 
        JOIN article a 
        ON a.mem_no = m.mem_no
        WHERE a.article_likes_amount IS NOT NULL
        ORDER BY a.article_likes_amount DESC
        LIMIT 5";

        $like = $pdo->query($sql2);
        $likeRows = $like->fetchAll(PDO::FETCH_ASSOC);

        //收藏
        $sql3 = "SELECT mem_id, mem_name,mem_head,article_collect_amount,  m.mem_no
        FROM mem m 
        JOIN article a 
        ON a.mem_no = m.mem_no
        WHERE a.article_collect_amount IS NOT NULL
        ORDER BY a.article_collect_amount DESC
        LIMIT 5";

        $fav = $pdo->query($sql3);
        $favRows = $fav->fetchAll(PDO::FETCH_ASSOC);


        //追蹤
        $sql4 = "SELECT mem_id, mem_name,mem_head,writer_no, m.mem_no
        FROM trackwriter t
        JOIN mem m 
        ON t.writer_no = m.mem_no
        WHERE t.writer_no IS NOT NULL
        GROUP BY t.writer_no
        ORDER BY t.writer_no DESC
        LIMIT 5";
        $follow = $pdo->query($sql4);
        $followRows = $follow->fetchAll(PDO::FETCH_ASSOC);

       

        //追縱過的創作者

        $mem_no = $_POST['mem_no'];

        $sql5="SELECT writer_no, mem_name, mem.mem_no FROM trackwriter 
        JOIN mem on mem.mem_no = trackwriter.writer_no
        WHERE trackwriter.mem_no = {$mem_no}";
       
        $track = $pdo->query($sql5);
        $trackRows = $track->fetchAll(PDO::FETCH_ASSOC);

        $php_array = array('post' => $postRows, 'like' => $likeRows, 'fav' => $favRows, 'follow' => $followRows, 'track' => $trackRows);
        
        echo json_encode($php_array);

        break;

        case "deleteFollow":
             // SQL指令
             $sql = "DELETE FROM `trackwriter` WHERE `trackwriter`.`mem_no` = {$_POST['mem_no']} AND `trackwriter`.`writer_no` = {$_POST['writer_no']}";
             $pdo->exec($sql);
            break;

        case "insertFollow":

              // SQL指令
              $sql = "INSERT INTO `trackwriter` (`mem_no`, `writer_no`) VALUES ('{$_POST['mem_no']}', '{$_POST['writer_no']}')";
              $pdo->exec($sql);
  
              break;

}
