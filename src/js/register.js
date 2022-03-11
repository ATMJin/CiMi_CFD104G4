

/*功能一 : 使用者註冊*/
function memRegister() {
    // Ajax Start
    let xhr = new XMLHttpRequest(); // creating XML Object
    xhr.open("POST", "phps/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
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
    let formData = new FormData(registerForm); 
    xhr.send(formData);
}


function init(){

}


window.addEventListener('load', init)