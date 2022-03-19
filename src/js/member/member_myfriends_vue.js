new Vue({
  el: "#mifriendApp",
  data: {
    friends: [],
    number: 0,
  },
  computed: {
    imgrandom() {
      let r = Math.floor(Math.random() * 10)
      return `https://picsum.photos/1000/300/?random=${r}`;
    },
  },
  methods: {
    showFriend(no) {
      this.number = no;
      document.querySelector(".friend_lightbox").style.display = "block"
    },
    hiddenFriend() {
      document.querySelector(".friend_lightbox").style.display = "none"
    }
  },
  mounted() {
    fetch(`phps/member/member_myfriends.php?mem_no=${sessionStorage.getItem('mem_no')}`)
      // fetch(`phps/member/member_myfriends.php?mem_no=${sessionStorage.getItem('mem_no')}`)
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => this.friends = res)
      .catch(err => console.log(err))
  },
})

Vue.config.devtools = true;