/*登入*/
const form = document.querySelector('.form form')
const loginBtn = document.getElementById('login');

form.onsubmit = (e) => { //取消form表單預設事件
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
                    // location.href = "index.html";

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
        //執行ajax
    console.log(memInfo);


    }
    

//     /*取消*/
//     const accountField = document.querySelector('.form input[type="text"]');
//     const cancelBtn = document.getElementById('cancel');
//     // console.log(accountField);
//     cancelBtn.onclick = () => {
//         accountField.value = "";
//         pswField.value = "";
//         accountField.focus();
//     }
}
window.addEventListener('load', init)

