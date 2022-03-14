window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_integral.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        console.log(member.mem_point);
        // console.log(aaaa);

        let head = document.querySelectorAll('.member_bouns_mycoins span')
        let user = document.querySelectorAll('.points p')
        let coin = document.querySelectorAll('.member_bouns_showcoins p')

        user[0].innerText = member.mem_point;
        coin[0].innerText = member.mem_point;
        head[0].innerHTML = member.mem_head;
        
    }
})