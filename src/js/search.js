const vm = new Vue({
  el: "#searchapp",
  data: {
    billboards: [],
    articles: [],
    goods: [],
    writers: [],
    like_articles: [],
    comment_info: [],
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
      fetch(`phps/search.php?search=${value}`)
        .then(res => res.json())
        .then(res => {
          // console.table(res)
          this.billboards = res[0]
          this.articles = res[1]
          console.log(this.articles);
          this.goods = res[2]
          this.writers = res[3]
        })
        .catch(err => console.log(err));
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
      xhr.onload = function () {
        console.log(xhr.responseText);
      }
      xhr.open("post", "phps/article_database.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.send(`${comment}&${comment_date}&${mem_no}&${article_no}&case=get_comment`);
      this.open_lightbox(this.a_num);
    },
    get_like_article() {
      let xhr = new XMLHttpRequest();
      let thisVue = this;
      xhr.onload = function () {
        thisVue.like_articles = JSON.parse(xhr.responseText);
        // console.log(thisVue.like_articles);
      }

      xhr.open("post", "phps/article_database.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.send("case=3");
    },
    get_comment_info() {
      let xhr = new XMLHttpRequest();
      let thisVue = this;
      xhr.onload = function () {
        thisVue.comment_info = JSON.parse(xhr.responseText);
        // console.log(thisVue.hot_articles);
        // thisVue.article_comment_info=thisVue.comment_info;
        // console.log(thisVue.comment_info);

      }

      xhr.open("post", "phps/article_database.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      // console.log("a.num", this.a_num);
      xhr.send(`article_no=${this.a_num}&case=find_comment_info`);
    },
  },
  created() {
    this.getSearchData()
    this.get_like_article();
    this.get_comment_info();
  },
  mounted() {},
})