new Vue({
    el: '#app',
    data: {
        activetab: '1',
        lightbox: null,
        close: null,
        article_box: null,
        new_articles: [],
        hot_articles: [],
        liked_articles: [],
        like_articles: [],
        comment_info: [],
        board_info: [],
        a_num: 1,
    },
    computed: {
        article() {
            if (this.activetab == 1) {
                return this.new_articles.find(art => art.article_no == this.a_num) || this.new_articles[0];
            } else if (this.activetab == 2) {
                return this.hot_articles.find(art => art.article_no == this.a_num) || this.hot_articles[0];
            }
        },
    },

    watch: {
        activetab() {
            this.$nextTick(this.init);
        },
    },

    methods: {
        setTargets() {
            this.lightbox = document.querySelectorAll(".lightbox");
            console.log(this.lightbox)
            this.close = document.querySelectorAll(".close_icon");
            this.article_box = document.getElementsByClassName("article_box");
            // console.log(this.lightbox);
            // console.log(this.close);
            // console.log(this.article_box);
        },

        close_lightbox() {
            this.lightbox[1].style.display = "none";
            let html = document.getElementsByTagName('html')[0];
            html.style = "overflow:hidden scroll";

        },
        open_lightbox(a_num) {
            this.lightbox[1].style.display = "block";
            let html = document.getElementsByTagName('html')[0];
            // console.log(html);
            html.style = "overflow:hidden";
            console.log(a_num);
            this.a_num = a_num;
            this.setCollect(a_num);
            this.get_comment_info();
            // console.log(this.no);
        },
        get_new_article() {

            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.new_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.new_articles);
                thisVue.init();
            }
            xhr.open("post", "phps/homepage_article.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send("case=newArticle");
        },
        get_hot_article() {
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.hot_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.hot_articles);
            }

            xhr.open("post", "phps/homepage_article.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send("case=hotArticle");
        },

        get_liked_article() { //篩文章被喜歡數多的文章
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.liked_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.liked_articles);
            }
            xhr.open("post", "phps/homepage_article.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send("case=likedArticle");
        },

        get_like_article() { //獲取文章被喜歡數
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                thisVue.like_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.like_articles);
            }

            xhr.open("post", "phps/homepage_article.php", true);
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
                console.log(thisVue.comment_info);

            }

            xhr.open("post", "phps/homepage_article.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            console.log("a.num", this.a_num);
            xhr.send(`article_no=${this.a_num}&case=find_comment_info`);
        },

        // 按讚
        add_like() {
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
                let article_like_img = document.getElementById('article_like_img');
                let article_like = document.getElementById("article_like")

                if (article_like.dataset.like == "false") {
                    article_like_img.src = "assets/images/icon/like.png";
                    article_like.dataset.like = "true"
                    // 送進資料庫
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_like`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }



                } else {
                    article_like_img.src = "assets/images/icon/like_hov.png";
                    article_like.dataset.like = "false"
                    // 送進資料庫
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=remove_like`);
                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }

                }
            }
        },

        // 按收藏
        add_collect() {
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

                let article_collect_img = document.getElementById('article_collect_img');
                let article_collect = document.getElementById("article_collect")

                if (article_collect.dataset.collect == "false") {
                    article_collect_img.src = "assets/images/icon/save.png";
                    article_collect.dataset.collect = "true";

                    // 送進資料庫
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_collect`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                } else {
                    article_collect_img.src = "assets/images/icon/save_hov.png";
                    article_collect.dataset.collect = "false";

                    // 送進資料庫
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=remove_collect`);

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
                // window.location.reload();
                // console.log(this.a_num);

                // window.alert('已收到您的！');

            }
            xhr.open("post", "phps/homepage_article.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${comment}&${comment_date}&${mem_no}&${article_no}&case=get_comment`);
            this.open_lightbox(this.a_num);





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
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_impeach`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                } else {
                    impeach_txt.innerText = "檢舉";

                    // 送進資料庫
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/homepage_article.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=remove_impeach`);


                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                }
            }

        },
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

        init() {
            this.setTargets();
        },


    },
    mounted() {
        this.get_new_article();
        this.get_hot_article();
        this.get_liked_article();
        this.get_like_article();
        this.get_comment_info();
        this.get_board_info()
    },

})