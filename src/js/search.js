const vm = new Vue({
  el: "#searchapp",
  data: {
    lightbox: null,
    billboards: [],
    articles: [],
    goods: [],
    writers: [],
    like_articles: [],
    comment_info: [],
    comments: [],
    a_num: 1,
  },
  computed: {
    search() {
      return decodeURI(location.href.split("=")[1])
    },
    article() {
      return this.articles.find(art => art.article_no == this.a_num) || this.articles[
        0];
    },
  },
  methods: {
    getSearchData() {
      let value = decodeURI(location.href.split("=")[1]);
      document.querySelector(".search_bar input[type='search']").value = value

      fetch(`phps/search.php?search=${value}`)
        .then(res => res.json())
        .then(res => {
          // console.table(res)
          this.billboards = res[0]
          this.articles = res[1]
          this.goods = res[2]
          this.writers = res[3]
          // console.log(this.writers);
        })
        .catch(err => console.log(err));
    },
    setTargets() {
      this.lightbox = document.querySelectorAll(".lightbox");
      // console.log(this.lightbox);
      this.close = document.querySelectorAll(".close_icon");
      this.article_box = document.getElementsByClassName("article_box");
      // let article_like = document.getElementById('article_like');
      // let article_collect = document.getElementById('article_like');
    },

    close_lightbox() {
      this.lightbox[0].style.display = "none";
      let html = document.getElementsByTagName('html')[0];
      html.style = "overflow:hidden scroll";

    },
    open_lightbox(a_num) {
      this.lightbox[0].style.display = "block";
      let html = document.getElementsByTagName('html')[0];
      // console.log(html);
      html.style = "overflow:hidden";
      console.log(a_num);
      this.a_num = a_num;
      this.setCollect(a_num);
      this.get_comment_info();
      // console.log(this.no);
    },
    usePostXhr(xhr, send) {
      xhr.open("post", "phps/article_database.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.send(send);
    },
    // 送出留言
    send_comment() {

      let write_comment = document.getElementById("write_comment_item");
      // 留言內容
      let comment = `comment_content=${write_comment.value}`;
      console.log(comment);
      write_comment.value = "";

      // 留言日期
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      let comment_date =
        `comment_date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${h}:${m}:${s}`;
      console.log(comment_date);
      // 留言者
      let mem_no = `mem_no=${sessionStorage.getItem('mem_no')}`;
      // let mem_no = sessionStorage.getItem('mem_no');

      console.log(mem_no);
      // 所留言的文章編號
      let article_no = `article_no=${this.a_num}`;
      console.log(article_no);
      // 送進資料庫
      let xhr = new XMLHttpRequest();
      this.usePostXhr(xhr, `${comment}&${comment_date}&${mem_no}&${article_no}&case=get_comment`)

      xhr.onload = () => {
        console.log(xhr.responseText);
      }
      this.open_lightbox(this.a_num);
    },
    get_like_article() {
      let xhr = new XMLHttpRequest();
      this.usePostXhr(xhr, "case=3")

      xhr.onload = () => {
        this.like_articles = JSON.parse(xhr.responseText);
        // console.log(this.like_articles);
      }
    },
    get_comment_info() {
      let xhr = new XMLHttpRequest();
      this.usePostXhr(xhr, `article_no=${this.a_num}&case=find_comment_info`)

      xhr.onload = () => {
        this.comment_info = JSON.parse(xhr.responseText);
        // console.log(this.hot_articles);
        // thisVue.article_comment_info=thisVue.comment_info;
        // console.log(thisVue.comment_info);

      }
    },
    loginAlert() {
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
    },
    login_confirm() {
      if (sessionStorage.getItem('login') == null) {
        this.loginAlert()
      }
    },
    add_like() {
      if (sessionStorage.getItem('login') == null) {
        this.loginAlert()
      } else {
        let article_like_img = document.getElementById('article_like_img');
        let article_like = document.getElementById("article_like")

        if (article_like.dataset.like == "false") {
          article_like_img.src = "assets/images/icon/like.png";
          article_like.dataset.like = "true"
          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=add_like`)

          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        } else {
          article_like_img.src = "assets/images/icon/like_hov.png";
          article_like.dataset.like = "false"
          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=remove_like`)


          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        }
      }
    },
    add_collect() {
      if (sessionStorage.getItem('login') == null) {
        this.loginAlert()
      } else {

        let article_collect_img = document.getElementById('article_collect_img');
        let article_collect = document.getElementById("article_collect")

        if (article_collect.dataset.collect == "false") {
          article_collect_img.src = "assets/images/icon/save.png";
          article_collect.dataset.collect = "true";

          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=add_collect`)

          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        } else {
          article_collect_img.src = "assets/images/icon/save_hov.png";
          article_collect.dataset.collect = "false";

          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=remove_collect`)

          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        }
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
    send_impeach() {
      if (sessionStorage.getItem('login') == null) {
        this.loginAlert()
      } else {
        let impeach_txt = document.getElementById("impeach_txt");

        if (impeach_txt.innerText == "檢舉") {
          impeach_txt.innerText = "取消檢舉";
          window.alert('已收到您的檢舉！');
          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=add_impeach`)

          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        } else {
          impeach_txt.innerText = "檢舉";

          // 送進資料庫
          let xhr = new XMLHttpRequest();
          this.usePostXhr(xhr, `article_no=${this.a_num}&case=remove_impeach`)

          xhr.onload = function () {
            console.log(xhr.responseText);
          }
        }
      }

    },
    setCollect(num) {
      let arr = [1, 2, 7, 12];
      if (arr.indexOf(num) > -1) {};
    },
    login_confirm() {
      if (sessionStorage.getItem('login') == null) {
        this.loginAlert()
      }
    },

    //燈箱出現的跟圖片顯示要樣
    getGoodNumber(goods_no) {
      // console.log(this.number);
      this.number = goods_no;
      // console.log(this.number);
    },
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
    displayNone() {
      let x = document.querySelector(".product_lighbox");
      x.style.display = "none";
    },
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
        xhr.open("get", `phps/product_heart_num_add.php?goods_no=${goods_no}`, true);
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
        xhr.open("get", `phps/product_heart_num_delete.php?goods_no=${goods_no}`, true);
        xhr.send(null);

        xhr.onload = function () {
          // 接收PHP傳來的資料
          // allgoods = JSON.parse(xhr.responseText);
          // console.log(xhr.responseText);
          // console.table(allgoods);
        }
      }

    }
  },
  created() {
    this.getSearchData()
    this.get_like_article();
    this.get_comment_info();
    this.getGoodsComments()
  },
  mounted() {
    this.setTargets()
  },
})