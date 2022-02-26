function init() {

    const form = document.querySelector('.typing_area');
    const sendBtn = document.querySelector('.typing_area button');
    const chatBox = document.querySelector('.chat_box')
    const inputArea = document.getElementById('emojionearea1');
    console.log(inputArea);

    function clear(){
        inputArea.value=""
    }




    /*功能一 : 送出傳訊者輸入的消息*/

    //取消form表單的submit事件
    form.onsubmit = (e) => {
        e.preventDefault();
    }

    //sendBtn , click 執行getChat.php
    sendBtn.onclick = () => {
       
        let xhr = new XMLHttpRequest(); //建立XML物件
        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let data = xhr.response;
                    console.log(data);
                }
            }
        }
        xhr.open('POST', 'phps/insertchat.php', true)
        let formData = new FormData(form); //創建formData物件
        xhr.send(formData); //送表單資料到php/getChat.php
        clear();



    }

    /*功能二 : 拿到傳訊者輸入的消息, 寫入chat_box*/
    setInterval(() => {
        //執行ajax
        let xhr = new XMLHttpRequest() //產生XML物件
        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('want', xhr.response);
                    chatBox.innerHTML = xhr.response;
                }
            }
        }
        xhr.open("POST", 'phps/getchat.php', true);
        let formData = new FormData(form); //創建formData物件
        xhr.send(formData); //送表單資料到php/insertChat.php

        scrollBottom();

    }, 500)

    function scrollBottom(){
        //將聊天室視窗滾動到最底部
        let lastMsg = ($('.chat_box').children('div:last-child')[0])

        // let position = ($('.chat_box').children('div:last-child')[0]).offset;
        // console.log(position);

        if (lastMsg != null) {
            setTimeout(function () {
                lastMsg.scrollIntoView();
            })
            var flag = false;

        $(".chat_box").scroll(function () {

            if (flag) {
                //数据加载中
                return false;
            }

            var divHeight = $(this).height();
            var nScrollHeight = $(this)[0].scrollHeight;
            var nScrollTop = $(this)[0].scrollTop;
            console.log(divHeight, nScrollHeight, nScrollTop);
            
            
        });
        }

        
    }
    






    /*功能三 : 
    - 1 FOR RWD 左邊好友列表點擊後, 左側users欄位消失 , 顯示右側chat_room欄位
    - 2 右側chat_room 點擊back icon 後消失, 回到左側
    */

    const users = document.querySelectorAll('.users_list a')
    console.log(users);

    for (let i = 0; i < users.length; i++) {
        users[i].addEventListener('click', showChat)

    }

    function showChat() {
        const usersArea = document.querySelector('.users')
        const chatArea = document.querySelector('.chat_area')
        // alert(chatArea);
        chatArea.style.display = "block";
        usersArea.style.display = "none";
        return false; //好像可以取消a連結的跳轉是事件?
    }

    /*功能四: 聊天室有新訊息傳入或是輸出, 就讓chat_box視窗滾到最下面去*/




}

window.addEventListener('load', init);