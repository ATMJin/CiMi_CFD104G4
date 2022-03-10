/*-------- CHAT ROOM Version II -------*/

/*-------------------------------------*/
//1.一開始進入畫面的時候, 版務小天使在最上面
//=>userList 要先顯示板務小天使資訊,　chatBox 要先顯示與該人對話消息 , 並且scroll bottom

//2. render 該會員其他好友列表(append 在版務小天使後面), chatBox 要先顯示與該人對話消息 , 並且scroll bottom

//3. 輸入消息與接收消息, 需要寫2支 PHP insertchat.php & getchat.php

//4. 輸入消息與接收消息, 均需要scroll bottom
/*------------------------------------ */

/*-------------------------------------*/
//userList    => setinterval
//getChat     => setinterval
//insertChat  => setinterval
//scrollBottom  => 利用rowCount去判斷
/*-------------------------------------*/

/*-------------------------------------*/
// Q1. 啥時要呼叫insert.php & getchat.php
// textarea 發生 keyup 和 click時  
/*------------------------------------ */

/*-------------------------------------*/
//GLOBAL VARIABLE
/*------------------------------------ */
let searchBar = document.querySelector('.users .search input');
let searchBtn = document.querySelector('.users .search button');

let userList = document.querySelector('.users_list');
let chatBox = document.querySelector('.chat_box')
let header = document.getElementById('header')
let form = document.querySelector('.typing_area');
let sendBtn = document.querySelector('.typing_area button');

let chatPerson = document.getElementById('chatPerson')
let rowCount = 0;

form.onsubmit = (e) => { //取消form表單的submit事件
    e.preventDefault();
}

/********************************************************* */
//1.拿到版務小天使資訊

function getAdmin() {
    let xhr = new XMLHttpRequest(); //建立XHR物件
    xhr.onload = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let res = JSON.parse(xhr.response)

                //將 admin 資料寫入 chatBox & header
                chatBox.innerHTML = res.output
                header.innerHTML = res.adminhead
                addDarkmodeWidget()
            }
        }
    }
    xhr.open('get', 'phps/chat/chat_adiminhead.php', true);
    xhr.send(null);
}

/********************************************************* */
//2.獲取好友列表

function getUsers() {
    let xhr = new XMLHttpRequest(); //建立XHR物件
    xhr.onload = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let res = xhr.response
                // console.log(res);
                //將好友寫入userList
                userList.innerHTML = res
                let users = document.querySelectorAll('.users_list .friends');
                console.log(users);
                for (let i = 0; i < users.length; i++) {
                    console.log(users[i]);
                    users[i].addEventListener('click', changeStyle) // line 81
                    users[i].addEventListener('click', getChat) // line 105
                }

            }
        }
    }
    xhr.open('get', 'phps/chat/chat_userlist.php', true);
    xhr.send(null);
}

/********************************************************* */
//2.1換顏色的函式

function changeStyle(e) {
    let child = $(e.currentTarget).siblings('span')
    let item = Array.from(child);
    for (i = 0; i < item.length; i++) {
        item[i].style.backgroundColor = 'white'
    }
    e.currentTarget.style.backgroundColor = '#EAF3FF';

    let users = document.querySelector('.users')
    let chat_area = document.querySelector('.chat_area')

    let w = $(window).width(); // FOR RWD
    if (w < 768) {
        chat_area.style.display = 'block'
        chat_area.style.border = 'none'
        users.style.display = 'none'
    }
}

/********************************************************* */
//2.2拿到當前點擊之使用者的聊天視窗

function getChat(e) {
    let user_id = e.currentTarget.lastElementChild.innerText //使用者id
    let xhr = new XMLHttpRequest(); //建立XHR物件
    xhr.onload = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let res = JSON.parse(xhr.response)
                header.innerHTML = res.header;
                chatBox.innerHTML = res.output;
                chatPerson.innerText = user_id
                addDarkmodeWidget()


                /********************************************************* */
                // FUNCTION FOR BACK ICON (ONLY ON MOBILE)

                let back = document.getElementById('back')
                back.onclick = () => {
                    let users = document.querySelector('.users')
                    let chat_area = document.querySelector('.chat_area')
                    users.style.display = 'block'
                    chat_area.style.display = 'none'

                }

                if (res.rowcount > rowcount) {
                    chatBox.innerHTML = res.output;
                    chatBox.scrollTop = chatBox.scrollHeight;
                    rowcount = res.rowcount
                }

            }
        }
    }
    xhr.open('POST', 'phps/chat/chat_getchat.php', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`id=${user_id}`);
}

/********************************************************* */
//3. 聊天室發送消息以及獲取消息

//3.1 聊天室發送消息
function sendMsg() {
    let user_id = chatPerson.innerText
    console.log(user_id);
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
    xhr.open('post', 'phps/chat/chat_insertchat.php', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`user_id=${user_id}&msg=${msg}`);
    newChat()
}


//3.2 聊天室獲取最新消息

function newChat() {
    let user_id = chatPerson.innerText
    let xhr = new XMLHttpRequest(); //建立XHR物件
    xhr.onload = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let res = JSON.parse(xhr.response)
                if (res.rowcount > rowcount) {
                    chatBox.innerHTML = res.output;
                    chatBox.scrollTop = chatBox.scrollHeight;
                    rowcount = res.rowcount
                }

            }
        }
    }
    xhr.open("POST", 'phps/chat/chat_newchat.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`user_id=${user_id}`);
}



/********************************************************* */
//FUNCTION FOR INIT
function init() {

    getAdmin()
    getUsers()
    // setInterval(newChat, 500)

    let inputArea = document.querySelector('.emojionearea-editor')
    sendBtn.onclick = () => {
        sendMsg()
        // newChat()
        setInterval(newChat, 500)
        inputArea.innerHTML = ''
    }

    inputArea.onkeyup = (e) => {
        if (e.keyCode == 13) {
            sendMsg()
            setInterval(newChat, 500)
            inputArea.innerHTML = ''
        }
    }


    searchBtn.onclick = () => {
        searchBar.classList.toggle('active');
        searchBar.focus();
        searchBtn.classList.toggle('active');
        searchBar.value = "";
    }

}

window.addEventListener('load', init)


/********************************************************* */
//FUNCTION FOR CHATROOM RWD
$(document).ready(function () {
    let chat_area = document.querySelector('.chat_area')
    let users = document.querySelector('.users')
    $(window).resize(function () {
        let RWD_W = $(window).width();
        if (RWD_W > 768) {
            users.style.display = 'block'
            chat_area.style.display = 'block'
        } else {
            chat_area.style.display = 'none'
            users.style.display = 'block'
        }
    });
});