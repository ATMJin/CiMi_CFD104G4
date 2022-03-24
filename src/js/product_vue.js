Vue.config.devtools = true;
const vm = new Vue({
  el: "#productApp",
  data: {
    //全部商品
    goods: [],
    //限時商品
    time_goods: [],
    // 上架商品
    new_goods: [],
    //熱門商品
    hot_goods: [],
    //分類商品
    sort_goods: [],
    //留言
    comments: [],

    number: 0,
    // 商品留言數
    count: 0,
    activetab: '1',
    msg: "",
  },
  // 監聽點擊的商品編號改變
  // 若改變則執行countComment函式
  watch: {
    number: "countComment",
  },
  computed: {
    // article() {
    //     if (this.activetab == 1) {
    //         return this.new_articles.find(art => art.article_no == this.a_num) || this.new_articles[
    //             0];
    //     } else if (this.activetab == 2) {
    //         return this.hot_articles.find(art => art.article_no == this.a_num) || this.hot_articles[
    //             0];

    //     }
    // },
  },

  methods: {
    //叉叉功能
    displayNone() {
      let x = document.querySelector(".product_lighbox");
      x.style.display = "none";
    },
    //燈箱出現的跟圖片顯示要樣
    getGoodNumber(goods_no) {
      // console.log(this.number);
      this.number = goods_no;
      // console.log(this.number);

    },
    // 所有商品
    getProductAll() {
      let xhr = new XMLHttpRequest();
      //打開php的我的php檔

      //如果case=allgoods抓所有商品
      xhr.open("get", `phps/product_all.php?case=allgoods`, true);
      xhr.send(null);

      xhr.onload = () => {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);

        this.goods = allgoods
      }
    },
    //熱門商品
    getProductHot() {
      let xhr = new XMLHttpRequest();
      //打開php的我的php檔
      xhr.open("get", `phps/product_hot.php`, true);
      xhr.send(null);

      xhr.onload = () => {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);

        this.hot_goods = allgoods
      }
    },
    //限時商品
    getProductTime() {
      let xhr = new XMLHttpRequest();
      //打開php的我的php檔
      xhr.open("get", `phps/product_time_limit.php`, true);
      xhr.send(null);

      xhr.onload = () => {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);
        this.time_goods = allgoods
      }
    },
    //上架商品
    getProductNew() {
      let xhr = new XMLHttpRequest();
      //打開php的我的php檔
      xhr.open("get", `phps/product_new.php`, true);
      xhr.send(null);

      xhr.onload = () => {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);
        this.new_goods = allgoods
      }
    },
    //分類商品
    getProductSort() {
      let xhr = new XMLHttpRequest();
      //打開php的我的php檔

      //如果case=allgoods抓所有商品
      xhr.open("get", `phps/product_sort_life.php?case=allgoods`, true);
      xhr.send(null);

      xhr.onload = () => {
        // 接收PHP傳來的資料
        allgoods = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allgoods);

        this.sort_goods = allgoods
      }
    },

    //抓所有留言
    getGoodsComments() {
      let xhr = new XMLHttpRequest();
      //如果case=goodscomment抓商品留言數
      xhr.open("get", `phps/product_all.php?case=goodscomment`, true);
      xhr.send(null);

      xhr.onload = () => {
        allcomments = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.table(allcomments);
        this.comments = allcomments
      }
    },
    // 按更多
    more_action() {
      let article_other_img = document.getElementById('article_other_img');
      let impeach = document.getElementById('impeach');
      let article_more = document.getElementById("article_other_function")

      if (article_more.dataset.more == "false") {
        impeach.style.display = 'block';
        article_other_img.src = "assets/images/icon/more.png";
        article_more.dataset.more = "true";

      } else {
        impeach.style.display = 'none';
        article_other_img.src = "assets/images/icon/more_hov.png";
        article_more.dataset.more = "false";

      }
    },
    // 檢舉文章
    send_impeach() {
      if (sessionStorage.getItem('login') == null) {
        swal("登入才能進行操作哦! 立即前往登入頁面??", {
            buttons: {

              catch: {
                text: "否",
                value: "否",
              },
              default: {
                text: "是",
                value: "是",
              },

            },
          })
          .then((value) => {
            switch (value) {

              case "是":
                location.href = "login_new.html"
                break;

              case "否":

                break;
            }
          });
      } else {
        let impeach_txt = document.getElementById("impeach_txt");

        if (impeach_txt.innerText == "檢舉") {
          impeach_txt.innerText = "取消檢舉";
          window.alert('已收到您的檢舉！');
          // 送進資料庫
          let xhr = new XMLHttpRequest();
          xhr.open("get", `phps/product_all.php?article_no=${this.a_num}&case=add_impeach`,
            true);
          xhr.send(null);

          xhr.onload = function () {
            // console.log(xhr.responseText);
          }
        } else {
          impeach_txt.innerText = "檢舉";

          // 送進資料庫
          let xhr = new XMLHttpRequest();
          xhr.open("post", "phps/article_database.php", true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
          xhr.send(`article_no=${this.a_num}&case=remove_impeach`);


          xhr.onload = function () {
            // console.log(xhr.responseText);
          }
        }
      }

    },

    //登入才可留言
    login_confirm() {
      if (sessionStorage.getItem('login') == null) {
        swal("登入才能進行操作哦! 立即前往登入頁面??", {
            buttons: {

              catch: {
                text: "否",
                value: "否",
              },
              default: {
                text: "是",
                value: "是",
              },

            },
          })
          .then((value) => {
            switch (value) {

              case "是":
                location.href = "login_new.html"
                break;

              case "否":

                break;
            }
          });
      }
    },
    //得到留言
    get_comment_info() {
      let xhr = new XMLHttpRequest();
      let thisVue = this;
      xhr.onload = function () {
        thisVue.comment_info = JSON.parse(xhr.responseText);
        // console.log(thisVue.comment_info);

      }

      xhr.open("get", `phps/product_all.php?article_no=${this.number}&case=goodscomment`, true);
      // console.log("a.num", this.number);
      xhr.send(null);
    },

    // 送出留言
    send_comment() {

      // let write_comment = document.getElementById("write_comment_item");
      // // 留言內容
      let comment = `comment_content=${this.msg}`;
      // console.log(comment);
      // write_comment.value = "";

      // 留言日期
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      let comment_date =
        `comment_date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${h}:${m}:${s}`;
      // console.log(comment_date);
      // 留言者
      let mem_no = `mem_no=${sessionStorage.getItem('mem_no')}`;
      // let mem_no = sessionStorage.getItem('mem_no');

      // console.log(mem_no);
      // 所留言的文章編號
      let article_no = `article_no=${this.number}`;
      // console.log(article_no);
      // 送進資料庫
      let xhr = new XMLHttpRequest();

      xhr.onload = () => {
        // console.log(xhr.responseText);
        this.get_comment_info();
        // this.open_lightbox(this.number);


      }
      // xhr.open("post", "phps/article_database.php", true);
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      // xhr.send(`${comment}&${comment_date}&${mem_no}&${article_no}&case=get_comment`);

      xhr.open("get",
        `phps/product_all.php?${comment}&${comment_date}&${mem_no}&${article_no}&case=writecomment`,
        true);
      xhr.send(null);

      this.msg = ""
      this.getGoodsComments()

    },
    // 數這件商品有多少留言
    // newValue這次點的，oldValue上次點的
    countComment(newValue, oldValue) {
      let c = 0;
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].goods_no == newValue) {
          c++
        }
      }
      // console.log(c);
      this.count = c;
    },
    //小圖變大圖功能
    showLarge(e) {
      let small = e.target;
      // console.log(small)
      //   document.getElementById("large").src = small.src ;

      //大圖路徑等於被點擊的小圖
      document.querySelector(".large").src = small.src;

    },
    //加入愛心
    initheart(goods_no) {
      // console.log("ssss")
      let product_heart = document.querySelector(".product_heart")
      let product_num = document.querySelector(".product_num")
      let product_heart_img = document.querySelector(".product_heart img")

      if (product_heart.title == "加入愛心") {
        product_heart_img.src =
          "assets/images/icon/like.png";
        product_heart.title = "取消愛心";
        product_num.innerHTML++;

        let xhr = new XMLHttpRequest();
        //問號之後傳php資料，因為我們的會員資料寫在local storage,需要的會員資料，在問號後面寫入，商品目前不需要
        xhr.open("get", `phps/product_heart_num_add.php?goods_no=${goods_no}&mem_no=${sessionStorage.getItem('mem_no')}`, true);
        xhr.send(null);

        xhr.onload = function () {
          // 接收PHP傳來的資料
          // allgoods = JSON.parse(xhr.responseText);
          // console.log(xhr.responseText);
          // console.table(allgoods);
        }

      } else {
        product_heart_img.src =
          "assets/images/icon/like_hov.png";
        product_heart.title = "加入愛心";
        product_num.innerHTML--;

        let xhr = new XMLHttpRequest();
        xhr.open("get", `phps/product_heart_num_delete.php?goods_no=${goods_no}&mem_no=${sessionStorage.getItem('mem_no')}`, true);
        xhr.send(null);

        xhr.onload = function () {
          // 接收PHP傳來的資料
          allgoods = JSON.parse(xhr.responseText);
          // console.log(xhr.responseText);
          // console.table(allgoods);
        }
      }

    },
    //加入愛心(留言)
    commentheart(goods_no) {
      // console.log("ssss")
      let product_comment_heart = document.querySelector(".product_comment_heart")
      let product_comment_num = document.querySelector(".product_comment_num")
      let product_comment_heart_img = document.querySelector(".product_comment_heart img")

      if (product_comment_heart.title == "加入愛心") {
        product_comment_heart_img.src =
          "assets/images/icon/like.png";
        product_comment_heart.title = "取消愛心";
        product_comment_num.innerHTML++;

        let xhr = new XMLHttpRequest();
        //問號之後傳php資料，因為我們的會員資料寫在local storage,需要的會員資料，在問號後面寫入，商品目前不需要
        xhr.open("get", `phps/product_comment__num_add.php?goods_no=${goods_no}`, true);
        xhr.send(null);

        xhr.onload = function () {
          // 接收PHP傳來的資料
          // allgoods = JSON.parse(xhr.responseText);
          // console.log(xhr.responseText);
          // console.table(allgoods);
        }

      } else {
        product_comment_heart_img.src =
          "assets/images/icon/like_hov.png";
        product_comment_heart.title = "加入愛心";
        product_comment_num.innerHTML--;

        let xhr = new XMLHttpRequest();
        xhr.open("get", `phps/product_comment_num_delete.php?goods_no=${goods_no}`, true);
        xhr.send(null);

        xhr.onload = function () {
          // 接收PHP傳來的資料
          // allgoods = JSON.parse(xhr.responseText);
          // console.log(xhr.responseText);
          // console.table(allgoods);
        }
      }

    },
    // 打開購物車
    openShoppingCart() {
      document.querySelector(".shopping_cart_light_box").style.display = "block"
    },
    // 加入購物車
    addShoppingCart() {
      let goods_no = sessionStorage.getItem("ShoppingCart_goods_no")
      if (!goods_no) {
        sessionStorage.setItem("ShoppingCart_goods_no", this.number)
        // console.log(sessionStorage.getItem("ShoppingCart_goods_no"));
      } else {
        if (!(goods_no.split(",").includes(`${this.number}`))) {
          goods_no += `,${this.number}`
          sessionStorage.setItem("ShoppingCart_goods_no", goods_no)
        }
        // console.log(sessionStorage.getItem("ShoppingCart_goods_no"));
      }
      // FIXME 反註解
      alert("成功加入購物車")
    },
  },

  beforeCreate() {

  },
  created() {

  },
  //要顯現的功能
  // 將Vue的東西第一次出現在網頁上
  mounted() {
    // 全部
    this.getProductAll()
    // 熱門
    this.getProductHot()
    // 限時
    this.getProductTime()
    //上架
    this.getProductNew()
    //留言
    this.getGoodsComments()
    //分類
    this.getProductSort()
  },
  //筆記!!因為愛心第一次沒出現在網頁上所以寫在mounted會抓不到。
  // 用Vue改變網頁，如:v-if
  updated() {
    //----------------------加入愛心 或 取消愛心--------------

    //----------------------加入收藏 或 取消收藏--------------
    let product_save = document.querySelector(".product_save");

    function switchFavorite() {
      if (product_save.title == "加入收藏") {
        product_save_img.src =
          "assets/images/icon/save.png";
        product_save.title = "取消收藏";
      } else {
        product_save_img.src =
          "assets/images/icon/save_hov.png";
        product_save.title = "加入收藏";
      }
    }
    //function工具在這這邊
    function initsave() {
      //設定[加入收藏 或 取消收藏]的點按事件
      product_save = document.querySelector(".product_save")
      // 變數名稱
      product_save_img = document.querySelector(".product_save img")
      product_save.onclick = switchFavorite;
    } //initsave

    //代表使用這個工具
    initsave()

    //----------------------小圖變大圖--------------

  },

})