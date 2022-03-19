

let cimi_destiny_button = document.getElementById("cimi_destiny");
let mem_no = sessionStorage.getItem('mem_no');
let already_played;

//日期檢查
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

// (function monthchange() {
//   month = (month < 10 ? '0' : '') + month;
// })();

// (function datechange() {
//   date = (date < 10 ? '0' : '') + date;
// })();


let Today=`${year}.${month}.${date}`;

function playtime(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        already_played = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        console.log(already_played.mem_last_play);
        console.log(Today);
        }
    xhr.open("get", `phps/sidebar.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);
}



function linkhref() {
    console.log(already_played.mem_last_play);
    console.log(Today);
    if (mem_no == null) {
        window.location.href = "login_new.html";
    }else{
        if (already_played.mem_last_play == Today) {
              window.location.href = "cards.html";
        }
        else{
            window.location.href = "cimi_destiny.html";
          
        }
    }
    
}

function doFirst() {
    cimi_destiny_button.addEventListener('click', linkhref);
    playtime();
}

window.addEventListener('load', doFirst);