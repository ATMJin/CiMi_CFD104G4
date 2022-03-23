<?php
session_start();

try {
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect.php");  // 開發時使用

  switch ($_GET["case"]) {
    case "followed":
      if (isset($_GET["mem_no"])) { 
        $sql = "SELECT mem_billboard_no FROM mem_billboard where mem_no={$_GET["mem_no"]}";
        $mem_billboard = $pdo->query($sql);
        $rows = $mem_billboard->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
      } else {
      }

      break;
    case "billboardHot": //熱門看版
      // SQL指令
      $sql = "SELECT billboard_no,billboard_name,billboard_img
      FROM billboard 
      ORDER BY billboard_post DESC
      LIMIT 6";
      // 執行
      $hot_boards = $pdo->query($sql);
      // // 將取得的資料轉成陣列形式
      $hot_boardsRows = $hot_boards->fetchAll(PDO::FETCH_ASSOC);
      // // 將陣列轉成json格式後傳出去
      echo json_encode($hot_boardsRows);
      break;

    case "billboardFollow": //收藏看版

      // SQL指令
      $sql = "SELECT billboard_no,b.billboard_name,b.billboard_square_img
      FROM mem_billboard m
      JOIN billboard b
      ON m.mem_billboard_no = b.billboard_no
      where m.mem_no = {$_GET['mem_no']}";
      // 執行
      $save_boards = $pdo->query($sql);
      // // 將取得的資料轉成陣列形式
      $save_boardsRows = $save_boards->fetchAll(PDO::FETCH_ASSOC);
      // // 將陣列轉成json格式後傳出去
      echo json_encode($save_boardsRows);
      break;

    case "getbillboardfollow": //追蹤寫入資料庫
      // SQL指令
      $sql = "INSERT INTO `mem_billboard` (`mem_no`, `mem_billboard_no`) VALUES ('{$_GET['mem_no']}', '{$_GET['mem_billboard_no']}')";
      $pdo->exec($sql);
      break;

    case "cancelbillboardfollow": //砍掉資料庫的追蹤資料
      // SQL指令
      $sql = "DELETE FROM `mem_billboard` WHERE `mem_billboard`.`mem_no` = {$_GET['mem_no']} AND `mem_billboard`.`mem_billboard_no` = {$_GET['mem_billboard_no']}";
      $pdo->exec($sql);
      break;
  }
} catch (PDOException $e) {
  echo "錯誤原因 : ", $e->getMessage(), "<br>";
  echo "錯誤行號 : ", $e->getLine(), "<br>";
}
