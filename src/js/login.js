/*登入*/
const loginForm = document.querySelector('.login form') // 登入form表單
const loginBtn = document.getElementById('login'); // 登入按鈕


loginForm.onsubmit = (e) => { //取消form表單預設事件
    e.preventDefault();

}

function $id(id) {
    return document.getElementById(id);
}


let member={};


/*功能一 : 使用者登入*/
function getMemInfo() {
    let xhr = new XMLHttpRequest() //產生XHR物件

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.response)
                console.log(res);
                
                if (res.output === "success") { //帳密正確

                    //登入的時候把頭像換掉
                    let mem_head = document.querySelector("img[alt='會員']");
                    mem_head.src = res.mem_head 

                    //把後端PHP資料寫回memInfo
                    memInfo = res

                    //跳轉回首頁
                    sessionStorage.setItem('login', 'success')
                    sessionStorage.setItem('mem_no', res.mem_no)
                    sessionStorage.setItem('mem_head', res.mem_head)
                    location.href = "homepage.html";

                } else { //帳號密碼錯誤/欄位有空
                    alert(res.noPerson);
                }
            }
        }
    }

    xhr.open('POST', 'phps/login.php', true)
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    let data_info = `mem_id=${$id('mem_id').value}&mem_psw=${$id('mem_psw').value}`
    xhr.send(data_info); //送表單資料到phps/login.php
}



function init() {

    loginBtn.onclick = () => {
        getMemInfo()
    }
}
window.addEventListener('load', init)

