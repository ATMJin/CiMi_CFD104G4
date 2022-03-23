let hot_billboard
let save_billboard
let followBottom = document.getElementsByClassName("btn-secondary");

console.log(followBottom)
// 換熱門看板名稱圖片
function hotBoard() {
  let hot_boards = document.querySelectorAll('.hot_article_txt H2'); //熱門看板名稱
  let hot_boards_img = document.querySelectorAll('.hot_article_pic img'); //熱門看板圖片

  // GET
  let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=billboardHot`, true);
  xhr.send(null);


  xhr.onload = function () {
    // 接收PHP傳來的資料
    hot_billboard = JSON.parse(xhr.responseText);
    // console.log(hot_billboard)

    let data = []
    for (let i = 0; i < hot_billboard.length; i++) {
      data.push(hot_billboard[i].billboard_name);
    }
    let img = []
    for (let i = 0; i < hot_billboard.length; i++) {
      img.push(hot_billboard[i].billboard_img);
    }
    let billno = []
    for (let i = 0; i < hot_billboard.length; i++) {
      billno.push(hot_billboard[i].billboard_no);
    }
    //-----------------------
    let mem_no = sessionStorage.getItem("mem_no");
    let url = "phps/getbillboard.php?case=followed"; //get my favorite
    if (mem_no != null) {
      url += "&mem_no=" + mem_no;
    }
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = function () {
      let collect_arr = JSON.parse(xhr2.responseText);

      // let arr = [false, false, false, false, false, false];
      // for (let i = 1; i < 7; i++) {
      // if (collect_arr.indexOf(i) > -1) {
      //   arr[i - 1] = true;
      // }

      let arr = [false, false, false, false, false, false];
      for (let i = 0; i < collect_arr.length; i++) {
        arr[collect_arr[i].mem_billboard_no - 1] = true;
      }

      // console.table(data);
      // console.table(img);

      let hot = document.querySelector('.hot_billboard')
      // console.log(hot)

      let template = `
      <h2>熱門看版排行</h2>
      <div class="swiper_container">
      <div class="swiper mySwiper">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                          <a href="article_all.html?boardNo=${billno[0]}"><img src="${img[0]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[0]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[0]}'>${arr[0] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                      <a href="article_all.html?boardNo=${billno[1]}"><img src="${img[1]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[1]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[1]}'>${arr[1] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                      <a href="article_all.html?boardNo=${billno[2]}"><img src="${img[2]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[2]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[2]}'>${arr[2] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                      <a href="article_all.html?boardNo=${billno[3]}"><img src="${img[3]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[3]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[3]}'>${arr[3] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                      <a href="article_all.html?boardNo=${billno[4]}"><img src="${img[4]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[4]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[4]}'>${arr[4] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
              <div class="swiper-slide">
                  <div class="hot_article_wrap">
                      <div class="hot_article_pic">
                      <a href="article_all.html?boardNo='${billno[5]}"><img src="${img[5]}"></a>
                      </div>
                      <div class="hot_article_txt">
                          <h2>${data[5]}</h2>
                      </div>
                      <button class="btn-secondary" data-no='${billno[5]}'>${arr[5] ? '已追蹤' : '追蹤'}</button>
                  </div>
              </div>
  
          </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
      </div>
      
      `
      hot.innerHTML = template;

      // 追蹤按鈕，註冊事件
      // console.log(document.getElementsByClassName("btn-secondary"))
      let btn = document.getElementsByClassName("btn-secondary")
      for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", followBtn)
      }


      let myLoad = function () {
        //判斷螢幕寬度
        var winWide = window.innerWidth; //獲取當前螢幕解析度
        // alert(winWide);
        var wideScreen = false;
        if (winWide >= 768) { //最小寬度 
          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 4, //輪播顯示項目數量
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        } else {
          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        }
      }
      myLoad();
      window.onresize = function () {
        //判斷螢幕寬度
        var winWide = window.innerWidth; //獲取當前螢幕解析度
        // alert(winWide);
        var wideScreen = false;
        if (winWide >= 768) {
          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 4,
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        } else {
          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        }
      }
    }
    xhr2.open("get", url, true);
    xhr2.send(null);
  }
}


//熱門看板，追蹤按鈕

function followBtn(e) {
  // console.log(e.target.dataset.no)
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
  saveBoard();
}

window.addEventListener('load', doFirst)