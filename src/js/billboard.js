

// 將所點擊的billboard_no送至url
function goto_board(boardNo) {
    location.href = 'article_all.html?boardNo=' + boardNo;
}
// ----------
let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=billboardHot`, true);
  xhr.send(null);


  xhr.onload = function () {
    // 接收PHP傳來的資料
    hot_billboard = JSON.parse(xhr.responseText);
    // console.log(hot_billboard)

    let billno = []
    for (let i = 0; i < hot_billboard.length; i++) {
      billno.push(hot_billboard[i].billboard_no);
    }
// -------------
let followBottom = document.getElementsByClassName("btn-secondary");




let mem_no = sessionStorage.getItem("mem_no");
let url = "phps/getbillboard.php?case=followed"; 
if (mem_no != null) {
    url += "&mem_no=" + mem_no;
}
let xhr2 = new XMLHttpRequest();
xhr2.onload = function () {
    let collect_arr = JSON.parse(xhr2.responseText);
    console.log(collect_arr)


    let arr = [false, false, false, false, false, false];
    for (let i = 0; i < collect_arr.length; i++) {
    arr[collect_arr[i].mem_billboard_no - 1] = true;
    }
    for(i=0;i<6;i++){
        if(arr[i]=true){
            followBottom[i].innerText="已追蹤"
             
        }else{
            followBottom[i].innerText="追蹤"
        }
    }

    // 追蹤按鈕，註冊事件

    let btn = document.getElementsByClassName("btn-secondary")
    for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", followBtn)
    }


}
xhr2.open("get", url, true);
xhr2.send(null);
  



//熱門看板，追蹤按鈕

let btn = document.getElementsByClassName("btn-secondary")
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", followBtn)
  }
//   

function followBtn(e) {
  console.log(e.target.dataset.no)
  if (sessionStorage.getItem('login') == null) {
    alert("請先登入")
  } else if (sessionStorage.getItem('login') == 'success') {
    if (e.target.innerText == "已追蹤") {
      e.target.innerText = "追蹤";
      cancelFollow(e.target.dataset.no)
    } else if (e.target.innerText == "追蹤") {
      e.target.innerText = "已追蹤";
      getFollow(e.target.dataset.no)
    }
  }

  function getFollow(mem_billboard_no) {
    let mem_no = sessionStorage.getItem("mem_no")
    let xhr = new XMLHttpRequest();
    xhr.open("get",
      `phps/getbillboard.php?case=getbillboardfollow&mem_no=${mem_no}&mem_billboard_no=${mem_billboard_no}`,
      true);
    xhr.send(null);
  }

  function cancelFollow(mem_billboard_no) {
    let mem_no = sessionStorage.getItem("mem_no")
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/getbillboard.php?case=cancelbillboardfollow&mem_no=${mem_no}&mem_billboard_no=${mem_billboard_no}`,
      true);
    xhr.send(null);
  }
}


// 收藏看版
function saveBoard() {
  let save_H2 = document.querySelectorAll('.save_billboard>H2'); //推薦看板
  let save_boards = document.querySelectorAll('.billboard_text li a'); //收藏看板下方文字
  let save_boards_img = document.querySelectorAll('.pic_box img'); //收藏看板圖
  let save_boards_H2 = document.querySelectorAll('.billboard_txt H2'); //收藏看板圖

  let mem_no = sessionStorage.getItem("mem_no")
  // console.log(save_H2)

  // GET
  let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=billboardFollow&mem_no=${mem_no}`, true);
  xhr.send(null);

  xhr.onload = function () {
    // 接收PHP傳來的資料
    save_billboard = JSON.parse(xhr.responseText);
    // console.log(save_billboard)
    for (let i = 0; i < save_boards.length; i++) {
      // console.log(save_billboard);
      save_boards[i].innerText = save_billboard[i].billboard_name;
    }
    if (save_billboard[5] && save_billboard[5].billboard_name) {
      save_boards_H2[0].innerText = save_billboard[4].billboard_name;
      save_boards_H2[1].innerText = save_billboard[5].billboard_name;
      save_boards_img[0].src = save_billboard[4].billboard_square_img;
      save_boards_img[1].src = save_billboard[5].billboard_square_img
    }
    // console.log(save_H2)
    save_H2[0].innerText = "收藏的看版";

  }
}


function doFirst() {
  hotBoard();
  window.event? window.event.cancelBubble = true : e.stopPropagation();

}

window.addEventListener('load', doFirst)


