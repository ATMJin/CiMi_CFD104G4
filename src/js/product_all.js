// ------------------------------廣告輪播----------
var options = {
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    setGallerySize: false,
    arrowShape: {
        x0: 10,
        x1: 60,
        y1: 50,
        x2: 60,
        y2: 45,
        x3: 15
    }
};

var carousel = document.querySelector('[data-carousel]');
var slides = document.getElementsByClassName('carousel-cell');
var flkty = new Flickity(carousel, options);

flkty.on('scroll', function () {
    flkty.slides.forEach(function (slide, i) {
        var image = slides[i];
        var x = (slide.target + flkty.x) * -1 / 3;
        image.style.backgroundPosition = x + 'px';
    });
});

// ------------------------------輪播(上架商品)----------
(function ($) {
    $(function () {

        var agSlideFlickity = $('.js-flickity-slider').flickity({
            autoPlay: 2000,
            imagesLoaded: true,
            percentPosition: false,
            prevNextButtons: false,
            initialIndex: 5,
            pageDots: false,
            groupCells: 1
        });

        var agCard = agSlideFlickity.find('.js-carousel-cell .js-card-bg'),
            agTransform = 'string' == typeof document.documentElement.style.transform ?
            'transform' : 'WebkitTransform',
            agSlide = agSlideFlickity.data('flickity');

        agSlideFlickity.on('scroll.flickity', function () {
            agSlide.slides.forEach(function (t, e) {
                var n = agCard[e],
                    i = -1 * (t.target + agSlide.x) / 3;

                n.style[agTransform] = 'translateX(' + i + 'px)';
            });
        });

        agSlideFlickity.on('dragStart.flickity', function (t, e) {
            document.ontouchmove = function (t) {
                t.preventDefault();
            }
        });

        agSlideFlickity.on('dragEnd.flickity', function (t, e) {
            document.ontouchmove = function (t) {
                return true;
            }
        });

    });
})(jQuery);

// ------------------------------倒數計時器----------

// <!-- 设置秒殺结束时間
var endTime = new Date("2022-03-31 00:00:00");
//把年月日时分秒的时间转换成为毫秒数 -->
endSeconds = endTime.getTime(); // 结束时间的毫秒数
//定义变量 天数 小时 分钟 秒数 
var d = h = m = s = 0;
//设置定时器  实现一个秒杀效果
var timer = setInterval(qiang, 1000);

// ------------------------------倒數計時器----------
function qiang() {
    // 获取当前系统时间
    var nowTime = new Date();
    // 获取当前时间差---nowTime.getTime()现在时间的毫秒数
    var remain = parseInt((endSeconds - nowTime.getTime()) / 1000);
    //判断秒杀是否过期
    if (remain > 0) {
        //1.计算剩余天数  （除以60*60*24  取整数  获取剩余天数）
        d = parseInt(remain / 86400)
        //2.计算剩余小时（除以60*60 转换成为小时了  与24进行取模   获取剩余小时）
        h = parseInt((remain / 3600) % 24);
        //3.计算剩余分钟（除以60  转换成为分钟了  与60进行取模   获取剩余分钟）
        m = parseInt((remain / 60) % 60);
        //4.计算剩余秒数（与60进行取模   获取剩余秒数）
        s = parseInt((remain) % 60);

        //统一利用两位数 表示 剩余的天、小时、分钟、秒
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

    } else {
        // 秒杀过期  取消定时器
        clearInterval(timer);
        d = h = m = s = '00'
    }
    //将剩余的天数、小时、分钟、秒  小时到指定网页中去
    document.getElementById("d").innerHTML = d + '天';
    document.getElementById("h").innerHTML = h + '時';
    document.getElementById("m").innerHTML = m + '分';
    document.getElementById("s").innerHTML = s + '秒';
}
window.addEventListener("load", qiang, false);

//------------------------------收藏save----------


// // ---------------------------------------- 愛心heart/點讚效果----------


// ---------------------------------------- 燈箱 ----------
function init() {
    let small_img = document.querySelectorAll(".ligh_box_jump")
    small_img[0].addEventListener("click", myFunction)

    let cross = document.querySelector(".cross")
    cross.addEventListener("click", displayNone)
}
window.addEventListener("load", init)

function displayNone() {
    let x = document.querySelector(".product_lighbox");
    x.style.display = "none";
}

function myFunction() {
    let x = document.querySelector(".product_lighbox");
    x.style.display = "block";
}

// ---------------------------------------- 小圖變大圖 ----------
function showLarge(e) {
    //   let small = e.target;
    //   document.getElementById("large").src = small.src ;
    document.getElementById("large").src = e.target.src;
}

function init_img() {
    let smalls = document.querySelectorAll(".product_small img"); /*query-查詢*/
    for (let i = 0; i < smalls.length; i++) {
        smalls[i].onclick = showLarge;
    }
}

window.addEventListener("load", init_img, false);