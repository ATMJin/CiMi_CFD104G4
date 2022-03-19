let vm = new Vue({
    el: "#membersApp",
    data: {
        articles: [],
        orders: [],
        billboards: [],
        articlesFollows: [],
        trackwriters: [],
        activetab: '1',
    },
    methods: {

    },
    mounted() {
        fetch(`phps/member/member_article_treasure_order.php?mem_no=${sessionStorage.getItem("mem_no")}`)
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(res => {
                this.articles = res[0]
                this.orders = res[1]
                this.billboards = res[2]
                this.articlesFollows = res[3]
                this.trackwriters = res[4]
                console.log(this.billboards);
            })
            .catch(err => console.log(err))

    },
})