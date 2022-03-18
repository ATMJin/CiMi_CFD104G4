window.addEventListener("load", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/member/member_myfriends.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        member = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        // console.log(member.mem_job);

        let user = document.querySelectorAll('.member_headimage p')
        let child = document.querySelectorAll('.gap p')
        let head = document.querySelectorAll('.member_headimage img')
        let friendhead = document.querySelectorAll('.member_cardhead img')
        let friendname = document.querySelectorAll('.member_cardtext p')



        //好友
        friendhead[0].src = member.mem_head;
        friendname[0].innerText = member.mem_name;
        //點開好友的配對設定
        head[0].src = member.mem_head;
        user[0].innerText = member.mem_name;
        child[0].innerText = member.mem_birth;
        child[1].innerText = member.mem_sex;
        child[2].innerText = member.mem_sexuality;
        child[3].innerText = member.mem_relationship;
        child[4].innerText = member.mem_job;
        child[5].innerText = member.mem_school;
        child[6].innerText = member.mem_try;
        child[7].innerText = member.mem_interests;
        child[8].innerText = member.mem_lovecountry;
        child[9].innerText = member.mem_exchange;
        child[10].innerText = member.mem_sign;



        $(function () {
            $('.member_friends_card').click(function(){
                $('.friend_lightbox').css('display','block');
            })
            $('.close').click(function(){
                $('.friend_lightbox').css('display','none');
            })

            //動態生成好友筆數
            // for (i = 0; i <= member.mi_no[i].length; i++) {
            //     $(".member_text").append($(".member_friends_card:first-of-type").clone());
            // }
            
        })
        // let friend = member.mem_no
        // let mi = member.mi_no

        // like = {};
            
        // if(friend in like === false){
        //     like[friend]=[]
        // }

        // like[friend].append(mi)

        // total = 0
        // for(friend in like){
        //     total += like[friend].length
        // }
        // for (i=0;i<=12;i++){
        //     total = 0;
        //     if(mem_no = i){
        //         total += 1
        //     }else{

        //     }
        // }
        console.log()
    }
})