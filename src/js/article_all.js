new Vue({
    el: '#app',
    data: {
        activetab: '1',
        lightbox: null,
        close: null,
        article_box: null,
        new_articles: [],
        hot_articles: [],
        like_articles: [],
        comment_info: [],
        board_info: [],
        a_num: 1,
        boardNo: 1,
        collect_arr: [],
        c_num:1,
        // article_comment_info:[],

        // article_temp: this.article,
    },
    computed: {
        article() {
            if (this.activetab == 1) {
                return this.new_articles.find(art => art.article_no == this.a_num) || this.new_articles[
                    0];
            } else if (this.activetab == 2) {
                return this.hot_articles.find(art => art.article_no == this.a_num) || this.hot_articles[
                    0];

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
            this.close = document.querySelectorAll(".close_icon");
            this.article_box = document.getElementsByClassName("article_box");

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
            this.a_num = a_num;
            // this.setCollect(a_num);
            this.get_comment_info();
            this.backto_top();
        },
        backto_top(){
            let article_view_box=document.getElementsByClassName("article_view_container");
            article_view_box[0].scrollTo(0, 0);
        },

        // setCollect(num) {
        //     let arr = [1, 2, 7, 12];
        //     if (arr.indexOf(num) > -1) {

        //     };
        // },
        get_new_article() {

            let boardNo = `boardNo=${location.search.substring(1).split("=")[1]}`;
            let xhr = new XMLHttpRequest();
            let thisVue = this;

            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.new_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.new_articles);
                thisVue.init();
            }
            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${boardNo}&case=1`);
            console.log(boardNo);

        },
        get_hot_article() {
            let boardNo = `boardNo=${location.search.substring(1).split("=")[1]}`;
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.hot_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.hot_articles);
            }

            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${boardNo}&case=2`);
            console.log(boardNo);
        },
         // ???????????????
         click_follow_btn() {
            let boardNo = `boardNo=${location.search.substring(1).split("=")[1]}`;
            // ?????????
            let mem_no = `mem_no=${sessionStorage.getItem('mem_no')}`;
            if (sessionStorage.getItem('login') == null) {
                swal("???????????????????????????! ??????????????????????????", {
                        buttons: {

                            catch: {
                                text: "???",
                                value: "???",
                            },
                            default: {
                                text: "???",
                                value: "???",
                            },

                        },
                    })
                    .then((value) => {
                        switch (value) {

                            case "???":
                                location.href = "login_new.html"
                                break;

                            case "???":

                                break;
                        }
                    });
            } else {
                let board_follow_btn = document.getElementById('board_follow_btn');

                if (board_follow_btn.value == "??????") {
                    board_follow_btn.value = "?????????"
                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`${boardNo}&${mem_no}&case=add_follow`);

                    xhr.onload = ()=>{
                        console.log(xhr.responseText);
                    }



                } else {
                    board_follow_btn.value = "??????"
                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`${boardNo}&${mem_no}&case=remove_follow`);

                    xhr.onload = ()=>{
                        console.log(xhr.responseText);
                    }

                }
            }
        },

        get_like_article() {
            let boardNo = `boardNo=${location.search.substring(1).split("=")[1]}`;
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                thisVue.like_articles = JSON.parse(xhr.responseText);
                // console.log(thisVue.like_articles);
            }

            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${boardNo}&case=3`);

        },
        
        get_comment_info() {
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                thisVue.comment_info = JSON.parse(xhr.responseText);
                console.log(thisVue.comment_info);

            }

            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            console.log("a.num", this.a_num);
            xhr.send(`article_no=${this.a_num}&case=find_comment_info`);
        },
        get_board_info() {
            let boardNo = `boardNo=${location.search.substring(1).split("=")[1]}`;
            let xhr = new XMLHttpRequest();
            let thisVue = this;
            xhr.onload = function () {
                // console.log(xhr.responseText);
                thisVue.board_info = JSON.parse(xhr.responseText);
                // console.log(thisVue.hot_articles);
            }

            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${boardNo}&case=5`);
        },
        // ??????
        add_like() {
            if (sessionStorage.getItem('login') == null) {
                swal("???????????????????????????! ??????????????????????????", {
                        buttons: {

                            catch: {
                                text: "???",
                                value: "???",
                            },
                            default: {
                                text: "???",
                                value: "???",
                            },

                        },
                    })
                    .then((value) => {
                        switch (value) {

                            case "???":
                                location.href = "login_new.html"
                                break;

                            case "???":

                                break;
                        }
                    });
            } else {
                let article_like_img = document.getElementById('article_like_img');
                let article_like = document.getElementById("article_like")

                if (article_like.dataset.like == "false") {
                    article_like_img.src = "assets/images/icon/like.png";
                    article_like.dataset.like = "true"
                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_like`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }



                } else {
                    article_like_img.src = "assets/images/icon/like_hov.png";
                    article_like.dataset.like = "false"
                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=remove_like`);
                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }

                }
            }
        },

        // ?????????
        add_collect() {
            if (sessionStorage.getItem('login') == null) {
                swal("???????????????????????????! ??????????????????????????", {
                        buttons: {

                            catch: {
                                text: "???",
                                value: "???",
                            },
                            default: {
                                text: "???",
                                value: "???",
                            },

                        },
                    })
                    .then((value) => {
                        switch (value) {

                            case "???":
                                location.href = "login_new.html"
                                break;

                            case "???":

                                break;
                        }
                    });
            } else {

                let article_collect_img = document.getElementById('article_collect_img');
                let article_collect = document.getElementById("article_collect")

                if (article_collect.dataset.collect == "false") {
                    article_collect_img.src = "assets/images/icon/save.png";
                    article_collect.dataset.collect = "true";

                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_collect`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                } else {
                    article_collect_img.src = "assets/images/icon/save_hov.png";
                    article_collect.dataset.collect = "false";

                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=remove_collect`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                }
            }


        },
        // ?????????
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
        // ????????????
        send_comment() {

            let write_comment = document.getElementById("write_comment_item");
            // ????????????
            let comment = `comment_content=${write_comment.value}`;
            console.log(comment);
            write_comment.value = "";

            // ????????????
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();
            let comment_date =
                `comment_date=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${h}:${m}:${s}`;
            console.log(comment_date);
            // ?????????
            let mem_no = `mem_no=${sessionStorage.getItem('mem_no')}`;
            // let mem_no = sessionStorage.getItem('mem_no');

            console.log(mem_no);
            // ????????????????????????
            let article_no = `article_no=${this.a_num}`;
            console.log(article_no);
            // ???????????????
            let xhr = new XMLHttpRequest();

            xhr.onload =  ()=> {
                console.log(xhr.responseText);
                this.get_comment_info();
   
                // this.open_lightbox(this.a_num);


            }
            xhr.open("post", "phps/article_database.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(`${comment}&${comment_date}&${mem_no}&${article_no}&case=get_comment`);

            





        },
        // ????????????
        send_impeach() {
            if (sessionStorage.getItem('login') == null) {
                swal("???????????????????????????! ??????????????????????????", {
                        buttons: {

                            catch: {
                                text: "???",
                                value: "???",
                            },
                            default: {
                                text: "???",
                                value: "???",
                            },

                        },
                    })
                    .then((value) => {
                        switch (value) {

                            case "???":
                                location.href = "login_new.html"
                                break;

                            case "???":

                                break;
                        }
                    });
            } else {
                let impeach_txt = document.getElementById("impeach_txt");

                if (impeach_txt.innerText == "??????") {
                    impeach_txt.innerText = "????????????";
                    window.alert('????????????????????????');
                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.send(`article_no=${this.a_num}&case=add_impeach`);

                    xhr.onload = function () {
                        console.log(xhr.responseText);
                    }
                } else {
                    impeach_txt.innerText = "??????";

                    // ???????????????
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "phps/article_database.php", true);
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
                swal("???????????????????????????! ??????????????????????????", {
                        buttons: {

                            catch: {
                                text: "???",
                                value: "???",
                            },
                            default: {
                                text: "???",
                                value: "???",
                            },

                        },
                    })
                    .then((value) => {
                        switch (value) {

                            case "???":
                                location.href = "login_new.html"
                                break;

                            case "???":

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
        this.get_like_article();
        this.get_comment_info();
        this.get_board_info()
    },

})