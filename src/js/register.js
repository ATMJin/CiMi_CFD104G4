function doFirst(){
    
const form = document.querySelector('.signup form') //form表單
const continueBtn = document.getElementById('register') // 註冊按鈕
const errorText = document.querySelector('.error-txt')  // 錯誤訊息
// console.log(form);


form.onsubmit = (e) =>{
    e.preventDefault(); //preventing form from submitting
    
}

continueBtn.onclick = () => {
    // Ajax Start
    let xhr = new XMLHttpRequest(); // creating XML Object
    xhr.open("POST", "phps/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response
                console.log(data);
                // if(data == "success"){
                //     location.href = "users.php";
                // }else{
                //     errorText.style.display = "block";
                //     errorText.textContent = data;
                // }
            }
        }
    }

    //we have to send the form data through ajax to php 
    let formData = new FormData(form); //creating new formData Object
    xhr.send(formData); //sending the form data to signup.php
}
}
window.addEventListener('load', doFirst)


