window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_setup.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        console.log(member.mem_job);

        let user = document.querySelectorAll('.member_cardmain p')

        user[0].innerText = member.mem_name;
        user[1].innerText = member.mem_mail;
        user[2].innerText = member.mem_job;
        user[3].innerText = member.mem_tel;
        user[4].innerText = member.mem_local;

    }
})