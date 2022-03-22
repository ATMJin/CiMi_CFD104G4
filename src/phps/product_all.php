
<?php
//全部商品
  include_once "connect.php";

// switch可以不用分開在寫一支php
switch ($_GET["case"]) {

  case 'allgoods':
  // 撈所有的商品
  $sql = "SELECT * FROM goods";
  //執行sql
  $member = $pdo -> query($sql);

  // 將取得的資料轉成陣列形式
  $memberRows = $member->fetchAll(PDO::FETCH_ASSOC);
  
  // 將陣列轉成json格式後傳出去
  echo json_encode($memberRows);

  //如果不是allgoods就跑底下的的
    break;
    case 'goodscomment':  
        // 所有的商品留言
        $sql = "SELECT `goods_comment_no`, g.mem_no, `goods_no`, `comment_last_edit_date`, `comment_content`, `comment_likes_amount`, `mem_id`, `mem_name`, `mem_head` FROM `goods_comment` g JOIN `mem` m ON g.mem_no=m.mem_no";
        $comment = $pdo -> query($sql);
        $commentRows = $comment->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($commentRows);
        break;  
  
  default:
    # code...
    break;
}


?>