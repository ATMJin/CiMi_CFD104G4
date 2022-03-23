window.addEventListener("load", () => {

    logout = document.getElementsByClassName('my_logout')
    // console.log(logout);
    logout[0].addEventListener('click', function () {
        sessionStorage.removeItem("login");
        var button = document.querySelector('.my_logout');

        function logout() {
            alert('確認要登出嗎');
            if (confirm('確認要登出嗎') == true) {
                location.href = "homepage.html";
            } else {

            }
        }
        button.addEventListener('click', logout);
        location.href = "homepage.html"
    })

})

new Vue({
    el: '#sidebar',
    data: {
        member: []
    },
    mounted() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", `phps/member/member_sidebar.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
        xhr.send(null);

        let vm = this
        xhr.onload = function () {
            // 接收PHP傳來的資料
            vm.member = JSON.parse(xhr.responseText)
        }
    },
    methods: {

    },
})
// $('.my_integral').hover(function(){
//         $('my_integral').append("<p>{{member.mem_point}}</p>")
// })