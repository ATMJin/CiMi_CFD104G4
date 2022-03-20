// ---------------------------------------------撈資料---------------------------------------------
// 注意class名稱寫詳細不然會當!!!!!!!!!!

// 最新上架
window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    //問號之後傳php資料，因為我們的會員資料寫在local storage,需要的會員資料，在問號後面寫入，商品目前不需要
    xhr.open("get", `phps/product_new.php`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);
        //撈照片
        let img = document.querySelectorAll(".new_goods_information .item_new_product .ag-container-shops .ag-shop-card_body .js-card-bg")
        //撈產品
        let txt = document.querySelectorAll(".new_goods_information .item_new_product .ag-container-shops .ag-shop-card_footer span:first-child")
        //撈價格
        let pri = document.querySelectorAll(".new_goods_information .item_new_product .ag-container-shops .ag-shop-card_footer span:nth-child(2)")
        // 跑迴圈
        for (let i = 0; i < txt.length; i++) {
            // i從第幾個開始
            //照片
            // style="background-image: url("assets/images/goods/goods_all_citt.jpg"); transform: translateX(1152.69px);"
            img[i].style.backgroundImage = `url("${allgoods[i + 2].goods_pic1.replaceAll("\\","/")}")` 

            //名稱
            txt[i].innerText = allgoods[i + 2].goods_name
            //價格
            // pri[i].innerText="NT$ "+allgoods[i + 2].goods_price
            pri[i].innerText=`NT. ${allgoods[i + 2].goods_price}`
        }

    }
})

//熱門商品
// window.addEventListener("load", () => {
//     let xhr = new XMLHttpRequest();
//     //問號之後傳php資料，因為我們的會員資料寫在local storage,需要的會員資料，在問號後面寫入，商品目前不需要
//     xhr.open("get", `phps/product_hot.php`, true);
//     xhr.send(null);

//     xhr.onload = function () {
//         // 接收PHP傳來的資料
//         allgoods = JSON.parse(xhr.responseText);
//         // console.log(xhr.responseText);
//         // console.table(allgoods);
//         //撈照片
//         let img = document.querySelectorAll("hot .item .img_box img")
//         //撈產品//撈價格
//         let txt = document.querySelectorAll("hot .item .txt_box p")
//         // 跑迴圈
//         for (let i = 0; i < txt.length; i++) {
//             // i從第幾個開始
//             //照片
//             img[i].src = allgoods[i + 2].goods_pic1
//             //名稱
//             txt[i].innerText = allgoods[i + 2].goods_name
//         }
//     }
// })

//全部商品
// window.addEventListener("load", () => {
//     let xhr = new XMLHttpRequest();
//     //打開php的我的php檔
//     xhr.open("get", `phps/product_all.php`, true);
//     xhr.send(null);

//     xhr.onload = function () {
//         // 接收PHP傳來的資料
//         allgoods = JSON.parse(xhr.responseText);
//         // console.log(xhr.responseText);
//         // console.table(allgoods);
//         //撈照片
//         let img = document.querySelectorAll(".main_product .all .item .img_box img")
//         // 撈產品                                          
//         let txt = document.querySelectorAll(".main_product .all .item .txt_box p:first-of-type")
//         //撈價格 
//         let pri = document.querySelectorAll(".main_product .all .item .txt_box p:last-of-type")
//         // 跑迴圈
//         for (let i = 0; i < allgoods.length-2; i++) {
//             // i從第幾個開始
//             //名稱
//             txt[i].innerText = allgoods[i + 2].goods_name
//             // txt[i].innerText = "ALL"
//             //照片
//             img[i].src = allgoods[i + 2].goods_pic1
//             //價格
//             pri[i].innerText="NT."+allgoods[i + 2].goods_price

//         }




//     }
// })

//分類頁(質感生活)
// window.addEventListener("load", () => {
//     let xhr = new XMLHttpRequest();
//     //打開php的我的php檔
//     xhr.open("get", `phps/product_sort_life.php`, true);
//     xhr.send(null);

//     xhr.onload = function () {
//         // 接收PHP傳來的資料
//         allgoods = JSON.parse(xhr.responseText);
//         // console.log(xhr.responseText);
//         // console.table(allgoods);
//         //撈照片
//         let img = document.querySelectorAll(".sort_product .all .item .img_box img")
//         //撈產品
//         let txt = document.querySelectorAll(".sort_product .all .item .txt_box p:nth-child(1)")
//         //撈價格
//         let pri = document.querySelectorAll(".sort_product .all .item .txt_box p:nth-child(2)")
//         // 跑迴圈
//         for (let i = 0; i < txt.length; i++) {
//             // i從第幾個開始
//             //照片
//             img[i].src = allgoods[i + 2].goods_pic1
//             //名稱
//             txt[i].innerText = allgoods[i + 2].goods_name
//             //價格
//             pri[i].innerText="NT."+allgoods[i + 2].goods_price
//         }
//     }
// })

//廣告頁(星座)
// window.addEventListener("load", () => {
//     let xhr = new XMLHttpRequest();
//     //打開php的我的php檔
//     xhr.open("get", `phps/product_ad_page.php`, true);
//     xhr.send(null);

//     xhr.onload = function () {
//         // 接收PHP傳來的資料
//         adgoods = JSON.parse(xhr.responseText);
//         // console.log(xhr.responseText);
//         // console.table(adgoods);
//         //撈照片
//         let img = document.querySelectorAll(".main_product_ad_page .all .item .img_box img")
//         //撈產品
//         let txt = document.querySelectorAll(".main_product_ad_page .all .item .txt_box p:nth-child(1)")
//         //撈價格
//         let pri = document.querySelectorAll(".main_product_ad_page .all .item .txt_box p:nth-child(2)")
//         // 跑迴圈
//         for (let i = 0; i < txt.length; i++) {
//             // i從第幾個開始
//             //照片
//             img[i].src = adgoods[i + 2].goods_pic1
//             //名稱
//             txt[i].innerText = adgoods[i + 2].goods_name
//             //價格
//             pri[i].innerText=`NT.${allgoods[i + 2].goods_price}`
//         }
//     }
// })

//廣告輪播(要跟商品頁一樣)
// 先取得商品標號!