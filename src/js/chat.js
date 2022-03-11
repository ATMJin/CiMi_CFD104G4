
function scrollBottom() {
    console.log(`object`);
    if (!preventNewScroll) { // if mouse is not over printer
        $printer.stop().animate({
            scrollTop: $printer[0].scrollHeight - printerH
        }, 600); // SET SCROLLER TO BOTTOM
    }
}






function doFirst() {
    let form = document.querySelector('.typing_area');
    let sendBtn = document.querySelector('.typing_area button');
    let chatBox = document.querySelector('.chat_box')
    let inputArea = document.querySelector('.emojionearea-editor')

    form.onsubmit = (e) => { //取消form表單的submit事件
        e.preventDefault();
    }


    function $id(id) { //更快拿到id的函式
        return document.getElementById(id);
    }

    function clear() { //清掉輸入框的消
        inputArea.innerHTML = ''
        inputArea.innerText = ''
    }

    /*滾動到底部*/
    let $chat = $('.chat_area'),
        $printer = $('.chat_box'),
        printerH = $printer.innerHeight(),
        preventNewScroll = false;

    
    scrollBottom(); // DO IMMEDIATELY

    /*功能一 : 送出傳訊者輸入的消息到後端PHP*/
    function sendMsg(e) {
        if (e.type == 'click' || (e.which == 13 && !e.shiftKey)) {
            e.preventDefault();
            let msg = document.querySelector('.emojionearea-editor').innerHTML
            let xhr = new XMLHttpRequest(); //建立XHR物件
            xhr.onload = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let data = xhr.response;
                        console.log(data);
                    }
                }
            }
            xhr.open('POST', 'phps/insertchat.php', true)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`msg=${msg}`);
        }
    }
   
    sendBtn.onclick = (e) => {
        sendMsg(e)
        keyin = setInterval(getChat, 500)
        console.log(document.querySelector('.emojionearea-editor').innerText);
        clear()
    }
    inputArea.onkeyup = (e) => {
        if (e.which == 13) {
            sendMsg(e)
            keyin = setInterval(getChat, 500)
            clear()

        }

    }

    /*功能二 : 從後端PHP拿到傳訊者輸入的消息, 寫入chat_box*/
    let keyin = setInterval(getChat, 500)
}

 function getChat() {
        let xhr = new XMLHttpRequest(); //建立XHR物件
        xhr.onload = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let res = JSON.parse(xhr.response)
                   
                    console.log(res.rowcount);
                    // addDarkmodeWidget()
                    
                    if (res.rowcount > rowcount) {
                        chatBox.innerHTML = res.output;
                        chatBox.scrollTop = chatBox.scrollHeight;
                        chatBox.onmouseover = (e) => {
                            clearInterval(keyin)
                        }
                        rowcount = res.rowcount
                    }

                }
            }
        }
        xhr.open("POST", 'phps/getchat.php', true);
        let formData = new FormData(form); //創建formData物件
        xhr.send(formData); //送表單資料到php/getChat.php
    }

window.addEventListener('load', doFirst)