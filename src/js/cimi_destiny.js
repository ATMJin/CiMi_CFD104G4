

//遊戲開始鍵
let button_check = document.getElementById("button_check");

//影片、影片播放鍵
let selectVideo = document.querySelector('video');
let start = document.querySelector('.start');


let playButtons = document.querySelectorAll('.toggle');


//對話框
let answer_frame = document.getElementsByClassName("answer_frame");
let question_frame = document.getElementsByClassName("question_frame");

//問題文字
let questions = document.getElementsByClassName("question");


//客製化顏色
let ball_color = document.querySelector('.st0');
let pink = document.querySelector('.pink');
let yellow = document.querySelector('.yellow');
let purple = document.querySelector('.purple');


//偵測影片時間
let  timer = setInterval(function () {
    console.log(selectVideo.currentTime);
    videoPause();
    }, 100);

let flag1 = false;

//影片暫停
let flag = [false,false,false];
let pauseTime = [7.8,14.6,25];
let options =[
    ["A. 酒精","B. 放大鏡","C. 汽油"],
    ["A. 電話響起","B. 有門鈴聲","C. 你的手機響了"],
    ["A. 小杯的烈酒","B. 色彩豊富的調酒","C. 啤酒"]
];


//洞裡面
let destiny_botton = document.getElementById("destiny_botton");
let waiting_lightbox = document.getElementById("waiting_lightbox");



function doFirst() {
    
    waiting_lightbox.style="display:none";
    start.addEventListener('click',playToggle);
    pink.addEventListener('click', go_pink);
    yellow.addEventListener('click', go_yellow);
    purple.addEventListener('click', go_purple);
    button_check.addEventListener('click', check_play);
    playButtons.forEach(btn => {
        btn.addEventListener('click',playToggle);
    });
};

function go_pink(){
    ball_color.style = "fill:#F09296;";
};

function go_yellow(){
    ball_color.style = "fill:#F5BA79;";
};

function go_purple(){
    ball_color.style = "fill:#97B2FF;";
    document.getElementsByClassName("st2").style= "fill:transparent;";
};


//點按check後，遊戲說明燈箱消失
function check_play(){
    document.getElementById("instrction_lightbox").style ="display:none";
    document.getElementById("start").style="visibility:visible";
    
    document.getElementById("animated-title").classList.add("start_text_animation");
    document.getElementById("choose_text").classList.add("choose_text_animation");

};

function playToggle() {
    
    start.classList.add("start_bitton_anime");
    setTimeout(function(){start.style="display:none;"}, .5*1000);
    


    document.getElementById("start").style ="display:none";
    document.querySelector(".trees").style="display:none";
    
    document.getElementById("ball_svg").style="display:block";
    pink.style="display:none";
    yellow.style="display:none";
    purple.style="display:none";
    
    

    
    
    if (!selectVideo.paused && !selectVideo.ended) {
        playButtons.forEach(btn => {
        btn.style ="visibility: visible";});
        
        
       
    } else {
       
                    
        selectVideo.play();
        question_frame[0].style = "visibility:hidden";
        answer_frame[0].style = "visibility:hidden";

        for(i=0; i<3; i++){
            questions[i].style ="visibility:hidden"};
            
            
        for(j=0; j<4; j++){
            playButtons[j].style ="visibility: hidden";
        };
         
    };
};


function videoPause() {

    for(i=0; i<3; i++){
        
        if (selectVideo.currentTime > pauseTime[i] && flag[i] ==false) {
            selectVideo.pause();
            flag[i]=true;
            question_frame[0].style = "visibility: visible";
            answer_frame[0].style = "visibility: visible";
            
            playButtons.forEach(btn => {
            btn.style ="visibility: visible";});
            
            
            questions[i].style ="visibility:visible";
            

            for(j=0; j<5; j++){
                playButtons[j].innerText= options[i][j];
            };
        } 
    };
    
    if(selectVideo.currentTime > 28){

        clearInterval(timer);
        
        let typer = document.getElementById("typewriter-contain");

        
        typer.innerHTML='<div class="dynamic-text-wrapper"><div class="dynamic-text">屬於你的Destiny</div><div class="dynamic-text">即將於午夜12:00出現</div></div>';

        let countdown = document.getElementById("countdown");
        setTimeout(function(){countdown.innerHTML='<div class="countdown_time">倒計時03:20:04</div>'}, 10*1000);
        ;
        
        setTimeout(function(){destiny_botton.innerHTML='<a href="cards.html"><button id="My_destiny_button">我的destiny</button></a>'}, 10*1000);
        ;

    }else if(selectVideo.currentTime > 2.5 && flag1 == false){

        selectVideo.pause();
        document.getElementById("space").style="visibility:visible";
        
        window.addEventListener('keydown', space_instruct);
        function space_instruct(e) {

            if (e.keyCode == 32 && flag1 == false) {
                selectVideo.play();
                
                document.getElementById("space").style="visibility:hidden";
                flag1=true;
            } ;
        };

    };
    
};

window.addEventListener('keydown', keyboardFunction);

let tl_control =new TimelineMax();

tl_control.to('#ball', {
        y: -70,
        repeat: 1,
        yoyo: true,
        duration: 0.3,
    }).to('#ball', { y: 0,});
 tl_control.reversed(true);

function keyboardFunction(e) {

    if (e.keyCode == 32) {
        tl_control.reversed(!tl_control.reversed());
        
    } 
    
};

window.addEventListener('load', doFirst);