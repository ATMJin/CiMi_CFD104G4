const vm = new Vue({
  el: "#searchapp",
  data: {
    billboards: [],
    articles: [],
    goods: [],
    writers: [],
  },
  computed: {
    search() {
      return decodeURI(location.href.split("=")[1])
    },
  },
  methods: {
    getSearchData() {
      let value = decodeURI(location.href.split("=")[1]);
      fetch(`phps/search.php?search=${value}`)
        .then(res => res.json())
        .then(res => {
          console.table(res)
          this.billboards = res[0]
          this.articles = res[1]
          this.goods = res[2]
          this.writers = res[3]
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getSearchData()
  },
  mounted() {},
})