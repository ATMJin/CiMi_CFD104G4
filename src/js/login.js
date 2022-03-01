/*功能一 : 點擊小眼睛, 顯示使用者輸入之密碼*/
const pswField = document.querySelector('.form input[type="password"]');
const toogleBtn = document.querySelector('.form .field i');

toogleBtn.onclick = () => {
    if (pswField.type == 'password') {
        pswField.type = 'text';
        toogleBtn.classList.add('active');
    } else {
        pswField.type = 'password';
        toogleBtn.classList.remove('active');
    }
}

/*功能二 : 使用者登入*/

	

/*登入*/
const form = document.querySelector('.form form')
const loginBtn = document.getElementById('login');
console.log(loginBtn);

form.onsubmit = (e) => { //取消form表單預設事件
    e.preventDefault();

}

function $id(id){
	return document.getElementById(id);
}

loginBtn.onclick = () => {
    //執行ajax
    let xhr = new XMLHttpRequest() //產生XML物件
    
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data);
                if (data === "success") { //帳密正確
                    location.href = "chat.html";
                } else { //帳號密碼錯誤/欄位有空
                    alert(data);
                }
            }
        }
    }

    xhr.open('POST', 'phps/login.php', true)
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    let data_info = `mem_id=${$id('mem_id').value}&mem_psw=${$id('mem_psw').value}`
    // let formData = new FormData(form); //創建formData物件
    xhr.send(data_info); //送表單資料到phps/login.php
}



/*取消*/
const accountField = document.querySelector('.form input[type="text"]');
const cancelBtn = document.getElementById('cancel');
console.log(accountField);
cancelBtn.onclick = () => {
    accountField.value = "";
    pswField.value = "";
    accountField.focus();
}

/*功能三 : 使用者點立即註冊後切到register表單*/


