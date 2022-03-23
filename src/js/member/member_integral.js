window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_integral.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.log(member.mem_point);
        // console.log(aaaa);

        let user = document.querySelectorAll('.points p')
        let head = document.querySelectorAll('.member_bouns_mycoins img')
        let coin = document.querySelectorAll('.member_bouns_showcoins p')
        user[0].innerText = member.mem_point;
        coin[0].innerText = member.mem_point;
        head[0].src = member.mem_head;
        // sign[0].innerText = member.mem_stacksign;

        $(function () {
            for (i = 0; i <= member.mem_stacksign; i++) {
                $(".member_bouns_cardbox").append($(".member_bouns_card:first-of-type").clone());
            }
        })
    }




})