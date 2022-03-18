window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_myfriends.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.log(member.mem_job);

        // let user = document.querySelectorAll('.member_headimage p')
        // let head = document.querySelectorAll('.member_headimage span')
        // let child = document.querySelectorAll('.gap p')
        // let friend = member.mem_no
        // let mi = member.mi_no

        // console.log(mi);

        // head[0].innerHTML = member.mem_head;
        // user[0].innerText = member.mem_name;


        // child[0].innerText = member.mem_birth;
        // child[1].innerText = member.mem_sex;
        // child[2].innerText = member.mem_sexuality;
        // child[3].innerText = member.mem_relationship;
        // child[4].innerText = member.mem_job;
        // child[5].innerText = member.mem_school;
        // child[6].innerText = member.mem_try;
        // child[7].innerText = member.mem_interests;
        // child[8].innerText = member.mem_lovecountry;
        // child[9].innerText = member.mem_exchange;
        // child[10].innerText = member.mem_sign;



        $(function () {
            $('.member_friends_card').click(function(){
                $('.friend_lightbox').css('display','block');

            })




        })

    }
})