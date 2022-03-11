let attendances = document.querySelectorAll(".attendance_item", ".attendance_7days_item");
let attendances_7days = document.querySelectorAll(".attendance_7days_item");
let coins_bonus= document.querySelectorAll(".coins_bonus_item");
let coins = document.querySelectorAll(".coins_item");
let txt_box = document.querySelectorAll(".txt_box");
let checks = document.getElementsByClassName("check_item");
let txt =document.getElementsByClassName("txt_box");
let close = document.querySelectorAll(".close_icon");
let lightbox = document.querySelectorAll(".lightbox");
let day_list = ['日', '一', '二', '三', '四', '五', '六'];
let day  = new Date().getDay();

// console.log('close');

function close_lightbox(){
    lightbox[0].style.display= "none";
}




document.write('Today is 星期' + day_list[day]);



function init(){

    for(let i = 0; i<attendances.length; i++){
        attendances[i].onclick = function(){
            coins[i].style.display = "none";
            txt_box[i].style.display = "none";
            checks[i].style.display = "block";
        };
    }
    attendances_7days[0].onclick = function(){
        coins_bonus[0].style.display = "none";
        txt_box[6].style.display = "none";
        checks[6].style.display = "block";
    }

    close[0].onclick=close_lightbox;
}
window.addEventListener("load", init, false);