let boards = document.querySelectorAll('.billboard_text li a')
let hot_boards = document.querySelectorAll('.hot_article_txt H2')
console.log(hot_boards)

// GET
let case_no = 1;
let xhr = new XMLHttpRequest();
xhr.open("get", `phps/getbillboard.php?case=${case_no}`, true);
xhr.send(null);

xhr.onload = function () {
  // 接收PHP傳來的資料
  billboard = JSON.parse(xhr.responseText);
  console.log(billboard[0].billboard_name);
//   boards[0].innerText = billboard[0].billboard_name;
for (let i = 0; i < boards.length; i++) {
  console.log(billboard[i].billboard_name);
  boards[i].innerText = billboard[i].billboard_name;
    // const element = array[i];
    }
}
