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
        // let card = document.querySelector('.member_bouns_card')

        // let hello = 
        // `
        // <div class="member_bouns_card_image">
        // <img src="assets/images/attendance_coins_item.svg" alt="">
        // </div>

        // <div class="member_bouns_card_text">
        // <p>每日登入</p> <br>
        // </div>

        // <div class="member_bouns_card_takecoin">
        // <p>+1</p>
        // </div>
        // `
        // card.innerHTML = hello;

        $(function () {
            for (i = 0; i < member.mem_stacksign; i++) {
                $(".member_bouns_card:first-of-type").clone().appendTo($(".member_bouns_cardbox"));
                // $(".member_bouns_cardbox").appendTo($(".member_bouns_card:first-of-type"));
                // console.log(member.mem_stacksign)
            }
        })
    }
})

// new Vue({
//     el: '#integral',
//     data: {
//         member: [],
//         card:member.mem_stacksign,
//     },
//     mounted() {
//         let xhr = new XMLHttpRequest();
//         xhr.open("get", `phps/member/member_integral.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
//         xhr.send(null);
//         let vm = this
//         xhr.onload = function () {
//             // 接收PHP傳來的資料
//             vm.member = JSON.parse(xhr.responseText)
//         }
//     },
//     methods:{
//         show_sign(){
//             for(i=0;this.i<member.mem_stacksign;i++){

//             }
//         }
//     },
// })