<?php
session_start();

try {
  // require_once("../connect_cfd104g4.php"); // 上線時使用
  require_once("connect.php");  // 開發時使用

  $search=$_GET["search"];

  // 看板
  $sql = "SELECT * FROM `billboard`
  WHERE `billboard_name` LIKE '%{$search}%'";
  $billboards = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  // 文章
  $sql = "SELECT a.article_no, a.article_title, a.article_content, a.article_pic, a.article_likes_amount, a.article_collect_amount, m.mem_no, m.mem_name, m.mem_head 
  FROM `article` a 
  JOIN `mem` m ON a.mem_no=m.mem_no
  WHERE `article_title` LIKE '%{$search}%' OR `article_content` LIKE '%{$search}%' ";
  $articles = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  // 商品
  $sql = "SELECT * FROM `goods` 
  WHERE `goods_name` LIKE '%{$search}%'";
  $goods = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  // 作者
  $sql = "SELECT * FROM `mem` 
  WHERE `mem_name` LIKE '%{$search}%'";
  $writers = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

  $allrows=[$billboards, $articles, $goods, $writers];
  echo json_encode($allrows);


} catch (PDOException $e) {
  echo "錯誤原因 : ", $e->getMessage(), "<br>";
  echo "錯誤行號 : ", $e->getLine(), "<br>";
}
