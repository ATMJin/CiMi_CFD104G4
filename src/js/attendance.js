let attendances = document.querySelectorAll(".attendance_item", ".attendance_7days_item");
let attendances_7days = document.querySelectorAll(".attendance_7days_item");
let coins_bonus= document.querySelectorAll(".coins_bonus_item");
let coins = document.querySelectorAll(".coins_item");
let txt_box = document.querySelectorAll(".txt_box");
let checks = document.getElementsByClassName("check_item");
let txt = document.getElementsByClassName("txt_box");
let coins_content = document.getElementsByClassName("coins_content");
let close = document.querySelector(".close_icon");
let lightbox = document.querySelectorAll(".lightbox");
let day_list = ['日', '一', '二', '三', '四', '五', '六'];
let day = new Date().getDay();
let mem_point_add = 0;
let mem_last_sign;


let current_date = new Date();

let year_a = current_date.getFullYear();
let month_a = current_date.getMonth() + 1;
let date_a = current_date.getDate();

(function monthchange() {
  month_a = (month < 10 ? '0' : '') + month_a;
})();

(function datechange() {
  date_a = (date < 10 ? '0' : '') + date_a;
})();

let check_date = `${year_a}-${month_a}-${date_a}`;




function getsign_date(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        let memsign = JSON.parse(xhr.responseText);
        // console.log(questions[0].optionA);
   
    if (memsign[0].mem_lastsign == check_date) {
        lightbox[0].style.display = "none";
    } else {
        lightbox[0].style.display = "block";
    }
 }
    xhr.open("get", `phps/attendence.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);
};


function close_lightbox(){
    lightbox[0].style.display= "none";
}


document.write('Today is 星期' + day_list[day]);

function weekdays_click() {
    if (mem_no == null) {
        alert("登入或註冊，即可簽到累積點數喔!")
        window.location.href = "login_new.html";
    }else {
        
        coins[day - 1].style.display = "none";
        txt_box[day].style.display = "none";
        checks[day - 1].style.display = "block";
        mem_point_add = mem_point_add + 1;

        // coins_bonus[0].style.display = "none";
        // txt_box[6].style.display = "none";
        // checks[6].style.display = "block";

          $.ajax({
            url: 'phps/attendence_addpoint.php',
            data: {mem_no,mem_point_add,check_date},
            
            type: 'GET',
            success(res) {
                alert(`累積點數!+${mem_point_add}`);
                
            },

        
        });
    }
};

function passed_days() {
    for (let i = 0; i < day - 1; i++) {
        coins_content[i].style = " background-color: #a3a3a3;"
    }
}


function init(){
    passed_days();
    getsign_date();
    attendances[day - 1].addEventListener("click", weekdays_click);

    if (day == 0) {
         attendances_7days[0].addEventListener("click", weekdays_click);
        };
    
    close.onclick = close_lightbox;
}
window.addEventListener("load", init, false);