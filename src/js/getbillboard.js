//熱門看板
function hotBoard() {

  let hot_boards = document.querySelectorAll('.hot_article_txt H2'); //熱門看板名稱
  let hot_boards_img = document.querySelectorAll('.hot_article_pic img'); //熱門看板圖片
  let boards_btn = document.querySelectorAll('.hot_article_wrap button'); //追蹤按鈕

  console.log(boards_btn)

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
                        <a href="article_all.html"><img
                                src="${img[0]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[0]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="hot_article_wrap">
                    <div class="hot_article_pic">
                        <a href="article_all.html"><img
                                src="${img[1]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[1]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="hot_article_wrap">
                    <div class="hot_article_pic">
                        <a href="article_all.html"><img
                                src="${img[2]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[2]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="hot_article_wrap">
                    <div class="hot_article_pic">
                        <a href="article_all.html"><img
                                src="${img[3]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[3]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="hot_article_wrap">
                    <div class="hot_article_pic">
                        <a href="article_all.html"><img
                                src="${img[4]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[4]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="hot_article_wrap">
                    <div class="hot_article_pic">
                        <a href="article_all.html"><img
                                src="${img[5]}"></a>
                    </div>
                    <div class="hot_article_txt">
                        <h2>${data[5]}</h2>
                    </div>
                    <button class="btn-secondary">追蹤</button>
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

    // document.getElementsByClassName("btn-secondary")[4].onclick = followBtn;
    console.log(document.getElementsByClassName("btn-secondary"))
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
}

//熱門看板，追蹤按鈕

function followBtn(e) {

  if (sessionStorage.getItem('login') == null) {
    alert("請先登入")
  } else if (sessionStorage.getItem('login') == 'success') {
    if (e.target.innerText == "已追蹤") {
      e.target.innerText = "追蹤";
      this.cancelFollow()
    } else if (e.target.innerText == "追蹤") {
      e.target.innerText = "已追蹤";
      this.getFollow()
    }
  }
  getFollow() {
    let mem_no = sessionStorage.getItem("mem_no")
    let xhr = new XMLHttpRequest();
    xhr.open("get",
      `phps/getbillboard.php?case=getbillboardfollow&mem_no=${mem_no}&mem_billboard_no=${mem_billboard_no}`,
      true);
    xhr.send(null);
  }
  cancelFollow() {
    let mem_no = sessionStorage.getItem("mem_no")
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/getbillboard.php?case=cancelbillboardfollow&mem_no=${mem_no}&mem_billboard_no=${mem_billboard_no}`,
      true);
    xhr.send(null);
  }
}


// 收藏看版
function saveBoard() {
  let save_boards = document.querySelectorAll('.billboard_text li a'); //收藏看板下方文字
  let save_boards_img = document.querySelectorAll('.pic_box img'); //收藏看板圖
  let save_boards_H2 = document.querySelectorAll('.billboard_txt H2'); //收藏看板圖

  let mem_no = sessionStorage.getItem("mem_no")
  // console.log(save_boards_H2)

  // GET
  let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=billboardFollow&mem_no=${mem_no}`, true);
  xhr.send(null);

  xhr.onload = function () {
    // 接收PHP傳來的資料
    save_billboard = JSON.parse(xhr.responseText);
    // console.log(save_billboard)
    for (let i = 0; i < save_boards.length; i++) {
      // console.log(save_billboard[i]);
      save_boards[i].innerText = save_billboard[i].billboard_name;
    }
    save_boards_H2[0].innerText = save_billboard[4].billboard_name;
    save_boards_H2[1].innerText = save_billboard[5].billboard_name;
    save_boards_img[0].src = save_billboard[4].billboard_square_img;
    save_boards_img[1].src = save_billboard[5].billboard_square_img;
  }
}

function doFirst() {
  // document.getElementsByClassName("btn-secondary").onclick = followBtn;
  // console.log(document.getElementsByClassName("btn-secondary"))
  hotBoard();
  // followBtn();
  saveBoard();
  getFollow();
  cancelFollow();
}

window.addEventListener('load', doFirst)