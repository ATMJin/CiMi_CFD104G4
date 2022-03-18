window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_sidebar.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);

        let head = document.querySelectorAll('.member_head_img img')
        let child = document.querySelectorAll('.my_integral p')
        let user = document.querySelectorAll('.member_head p')


        head[0].src = member.mem_head;
        user[0].innerText = member.mem_name;
        child[0].innerText = member.mem_point;
    }

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

    // check();
})