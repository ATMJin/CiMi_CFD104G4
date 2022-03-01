function doFirst() {
    const form = document.querySelector('.typing_area');
    const sendBtn = document.querySelector('.typing_area button');
    const chatBox = document.querySelector('.chat_box')
    const inputArea = document.querySelector('.emojionearea-editor')
    console.log(inputArea);


    form.onsubmit = (e) => { //取消form表單的submit事件
        e.preventDefault();
    }


    function $id(id) { //更快拿到id的函式
        return document.getElementById(id);
    }

    function clear() { //清掉輸入框的消
        inputArea.innerHTML = ''
        inputArea.value = ''
    }

    /*滾動到底部*/
    let $chat = $('.chat_area'),
        $printer = $('.chat_box'),
        printerH = $printer.innerHeight(),
        preventNewScroll = false;

    //// SCROLL BOTTOM  
    function scrollBottom() {
        if (!preventNewScroll) { // if mouse is not over printer
            $printer.stop().animate({
                scrollTop: $printer[0].scrollHeight - printerH
            }, 600); // SET SCROLLER TO BOTTOM
        }
    }
    scrollBottom(); // DO IMMEDIATELY



    // //// PREVENT SCROLL TO BOTTOM WHILE READING OLD MESSAGES
    // $printer.hover(function (e) {
    //     preventNewScroll = e.type == 'mouseenter' ? true : false;
    //     if (!preventNewScroll) {
    //         scrollBottom();
    //     } // On mouseleave go to bottom
    // });


    /*功能一 : 送出傳訊者輸入的消息到後端PHP*/
    function sendMsg(e) {
        if (e.type == 'click' || (e.which == 13 && !e.shiftKey)) {
            e.preventDefault();
            let msg = $id('emojionearea1').value;
            let xhr = new XMLHttpRequest(); //建立XHR物件
            xhr.onload = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let data = xhr.responseText;

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
        clear()
    }
    inputArea.onkeyup = (e) => {
        sendMsg(e)
    }




    /*功能二 : 從後端PHP拿到傳訊者輸入的消息, 寫入chat_box*/
    setInterval(() => {
        let xhr = new XMLHttpRequest(); //建立XHR物件
        xhr.onload = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    chatBox.innerHTML = xhr.response;
                    chatBox.scrollTop = chatBox.scrollHeight;
                    chatBox.onmouseover = (e) => {

                        preventNewScroll = e.type == 'mouseover' ? true : false;

                        console.log(e.type)
                        if (!preventNewScroll) {
                            scrollBottom();
                        } // On mouseleave go to bottom

                    }
                }
            }
        }
        xhr.open("POST", 'phps/getchat.php', true);
        let formData = new FormData(form); //創建formData物件
        xhr.send(formData); //送表單資料到php/getChat.php
    }, 500)

    /*功能三: 送出傳訊者上船的圖片到後端PHP*/
    document.getElementById('theFile').onchange = fileChange

}

function fileChange() {
    //抓到file檔案
    let file = document.getElementById('thePic').files[0]


    /*-------------------------------------------------- */

    let readImage = new FileReader();
    readImage.readAsDataURL(file);

    // $.ajax({
    //     type: 'POST',
    //     url: 'php/insertimg.php',
    //     data: {
    //         mem_img: $('#mem_id').val(),
    //         memPwd: $('#mem_pwd').val(),
    //     },
    //     success: function (data) {
    //         if (data.login) {
    //             window.location.href = 'index.html';
    //         } else {
    //             alert(data.msg);
    //         }
    //     },
    //     error: function () {
    //         console.log('error');
    //     }
    // });
    console.log(readImage.result);

    //注意:內嵌外部內容會發生load事件
    readImage.addEventListener('load', function () {

        console.log(readImage.result);
    })



}
window.addEventListener('load', doFirst)