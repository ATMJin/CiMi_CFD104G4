    /*功能一 : searchBar點擊輸入搜索欄位*/
    const searchBar = document.querySelector('.users .search input');
    const searchBtn = document.querySelector('.users .search button');
    const userList = document.querySelector('.users .users_list');
    const users = document.querySelector('.users')
    const chat_area = document.querySelector('.chat_area')





    searchBtn.onclick = () => {
        searchBar.classList.toggle('active');
        searchBar.focus();
        searchBtn.classList.toggle('active');
        searchBar.value = "";
    }

    /*功能二 : 從好友列表中撈資料寫入userList*/

    // setInterval(() => {
    //執行ajax
    xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                // console.log(data);
                userList.innerHTML = data;
            }
        }
    }
    xhr.open('GET', 'phps/users.php', true)
    xhr.send(null);
    // }, 500);

    /*滾動到底部*/
    let $chat = $('.chat_area'),
        $printer = $('.chat_box', $chat),
        $textArea = $('textarea', $chat),
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

    // function do First ========================================W
    /*功能三: 左邊的人點擊之後要換成他的頭像和名字和聊天視窗 */

    function doFirst() {
        const users = document.querySelectorAll('.users_list .friends');
        console.log(users);

        for (let i = 0; i < users.length; i++) {
            users[i].addEventListener('click', function (e) {
                rowcount = 0
                //點當前的人要換背景 => background-color: #EAF3FF;
                scrollBottom(); // DO IMMEDIATELY
                changeStyle(e)
                let user_id = e.currentTarget.lastElementChild.innerText //使用者id
                let userInfo = document.querySelector('.chat_area header') //右側聊天室header

                //執行ajax
                xhr = new XMLHttpRequest()

                xhr.onload = () => {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            let data = xhr.responseText;
                            userInfo.innerHTML = data;
                            let back = document.getElementById('back')
                            back.onclick = () => {
                                const users = document.querySelector('.users')
                                const chat_area = document.querySelector('.chat_area')
                                users.style.display = 'block'
                                chat_area.style.display = 'none'

                            }
                        }
                        back
                    }
                }
                xhr.open('POST', 'phps/getusers.php', true)
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(`id=${user_id}`);
            })
        }
    }
    // ==============================================================================

    //換顏色的函式
    function changeStyle(e) {
        scrollBottom()
        let child = $(e.currentTarget).siblings('span')
        let item = Array.from(child);
        console.log(item);
        for (i = 0; i < item.length; i++) {
            item[i].style.backgroundColor = 'white'
        }
        e.currentTarget.style.backgroundColor = '#EAF3FF';

        let users = document.querySelector('.users')
        let chat_area = document.querySelector('.chat_area')

        let w = $(window).width();
        if (w < 768) {
            chat_area.style.display = 'block'
            chat_area.style.border = 'none'
            users.style.display = 'none'
        }


    }
    $(document).ready(function () {
        $(window).resize(function () {
            let w = $(window).width();
            if (w > 768) {
                users.style.display = 'block'
                chat_area.style.display = 'block'
            } else {
                chat_area.style.display = 'none'
                users.style.display = 'block'


            }
        });
    });
    // DarkMode.js Code
    

    window.addEventListener('load', doFirst)