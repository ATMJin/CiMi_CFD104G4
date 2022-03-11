// GET
let xhr = new XMLHttpRequest();
xhr.open("get", "phps/connect.php", true);
xhr.send(null);

xhr.onload = function () {
  // 接收PHP傳來的資料
  member = JSON.parse(xhr.responseText);
  console.log(member);
}


// POST
let xhr = new XMLHttpRequest();
xhr.open("post", "phps/connect.php", true);
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
// 傳資料給PHP
let col = `col=mem_no`
xhr.send(col);

xhr.onload = function () {
  member = JSON.parse(xhr.responseText);
  console.log(member);
}