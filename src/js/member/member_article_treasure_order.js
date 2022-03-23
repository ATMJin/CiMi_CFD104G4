let vm = new Vue({
    el: "#membersApp",
    data: {
        articles: [],
        orders: [],
        ordergoods: [
            [],
            [],
            [],
            [],
            []
        ],
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

                for (let i = 0; i < res[1].length; i++) {
                    switch (res[1][i].order_shipping) {
                        case "0":
                            this.ordergoods[0].push(res[1][i])
                            break;
                        case "1":
                            this.ordergoods[1].push(res[1][i])
                            break;
                        case "2":
                            this.ordergoods[2].push(res[1][i])
                            break;
                        case "3":
                            this.ordergoods[3].push(res[1][i])
                            break;
                        case "4":
                            this.ordergoods[4].push(res[1][i])
                            break;
                        default:
                            break;
                    }
                }

                this.billboards = res[2]
                this.articlesFollows = res[3]
                this.trackwriters = res[4]
                this.orders = res[5]

            })
            .catch(err => console.log(err))

    },
})