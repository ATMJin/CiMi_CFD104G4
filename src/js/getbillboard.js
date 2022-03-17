//熱門看板
function hotBoard() {

  let hot_boards = document.querySelectorAll('.hot_article_txt H2');
  // console.log(hot_boards)

  // GET
  let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=2`, true);
  xhr.send(null);

  xhr.onload = function () {
    // 接收PHP傳來的資料
    hot_billboard = JSON.parse(xhr.responseText);
    // console.log(hot_billboard)

    let data = []
    for (let i = 0; i < hot_billboard.length; i++) {
      data.push(hot_billboard[i].billboard_name);
    }

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
                                src="assets/images/bilboard_pic_relation.jpg"></a>
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
                                src="assets/images/bilboard_pic-makeup.jpg"></a>
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
                                src="assets/images/billboard_pic_car.jpg"></a>
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
                                src="assets/images/bilboar_pic_music.jpg"></a>
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
                                src="assets/images/bilboard_pic_sport.jpg"></a>
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
                                src="assets/images/bilboard_pic_clothing.jpg"></a>
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

// 收藏看版

function saveBoard() {
  let save_boards = document.querySelectorAll('.billboard_text li a');

  // GET
  let xhr = new XMLHttpRequest();
  xhr.open("get", `phps/getbillboard.php?case=1`, true);
  xhr.send(null);

  xhr.onload = function () {
    // 接收PHP傳來的資料
    save_billboard = JSON.parse(xhr.responseText);
    save_boards[0].innerText = save_billboard[0].billboard_name;
    for (let i = 0; i < save_boards.length; i++) {
      // console.log(save_billboard[i].billboard_name);
      save_boards[i].innerText = save_billboard[i].billboard_name;
    }
  }
}

function doFirst() {
  hotBoard();
  saveBoard();
}

window.addEventListener('load', doFirst)