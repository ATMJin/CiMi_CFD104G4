<?php

require_once("connect_suan.php");

$mem_no = $_POST['mem_no'];

//發文
$sql1 = "SELECT mem_id, mem_name,mem_head,COUNT(a.mem_no) AS mem_post
    FROM mem m 
    JOIN article a 
    ON a.mem_no = m.mem_no
    WHERE a.article_no IS NOT NULL
    GROUP BY a.mem_no
    ORDER BY mem_post DESC
    LIMIT 5";

$post = $pdo->query($sql1);
//將取得的資料轉成陣列形式
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
//將取得的資料轉成陣列形式
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
//將取得的資料轉成陣列形式
$favRows = $fav->fetchAll(PDO::FETCH_ASSOC);


//追蹤
$sql4 = "SELECT mem_id, mem_name,mem_head,COUNT(t.writer_no) follow
FROM trackwriter t
JOIN mem m 
ON t.writer_no = m.mem_no
WHERE t.writer_no IS NOT NULL
GROUP BY t.writer_no
ORDER BY t.writer_no
LIMIT 5";
$follow = $pdo->query($sql4);
//將取得的資料轉成陣列形式
$followRows = $follow->fetchAll(PDO::FETCH_ASSOC);




//追縱過的創作者
$sql = "SELECT writer_no FROM trackwriter WHERE mem_no = {$mem_no}";
$track = $pdo->query($sql4);
//將取得的資料轉成陣列形式
$trackRows = $track->fetchAll(PDO::FETCH_ASSOC);


$php_array = array('post' => $postRows, 'like' => $likeRows, 'fav' => $favRows, 'follow' => $followRows, 'track' => $trackRows);
echo json_encode($php_array);
