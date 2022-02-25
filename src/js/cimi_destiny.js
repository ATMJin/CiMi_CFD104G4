

let selectVideo = document.querySelector('video');
let start = document.querySelector('.start');

let playButtons = document.querySelectorAll('.toggle');
let questions = document.getElementsByClassName("question");


let answer_frame = document.getElementsByClassName("answer_frame");
let question_frame = document.getElementsByClassName("question_frame");

let button_check = document.getElementById("button_check");


let ball_color = document.querySelector('.st0');
let pink = document.querySelector('.pink');
let yellow = document.querySelector('.yellow');
let purple = document.querySelector('.purple');

let flag = [false,false,false];
// let pauseTime = [2,28,46];
let pauseTime = [11,19,28,30];
let options =[
    ["第一題選項x","第一題選項y","第一題選項z","第一題選項q"],
    ["第二題選項f","第二題選項g","第二題選項h","第二題選項i"],
    ["第三題選項m","第三題選項n","第三題選項o","第三題選項p"]
];

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
    
};

function playToggle() {
    
    start.classList.add("start_bitton_anime");
    setTimeout(function(){start.style="display:none;"}, .5*1000);
    
    // start.style="display:none";

    document.getElementById("start").style ="visibility:hidden";

    
    document.getElementById("ball_svg").style="display:block";
    pink.style="display:none";
    yellow.style="display:none";
    purple.style="display:none";
    
    

    
    
    if (!selectVideo.paused && !selectVideo.ended) {
        playButtons.forEach(btn => {
        btn.style ="visibility: visible";});
        
        
       
    } else {
        timer = setInterval(function () {
                    console.log(selectVideo.currentTime);
                    videoPause();
                    }, 100);
                    
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
            

            for(j=0; j<4; j++){
                playButtons[j].innerText= options[i][j];
            };
           

        } else if(selectVideo.currentTime > 32){
            document.getElementById("waiting_lightbox").style ="display:block";
        };
    };
    
};

window.addEventListener('keydown', keyboardFunction);

let tl_control =new TimelineMax();

tl_control.to('#ball', {
        y: -70,
        repeat: 1,
        yoyo: true,
        //rotation : 360,
        duration: 0.3,
        // ease: "elastic.out(1, 0.3)"
    }).to('#ball', { y: 0,});
 tl_control.reversed(true);

function keyboardFunction(e) {

    if (e.keyCode == 32) {
        tl_control.reversed(!tl_control.reversed());
    } 
    
};

window.addEventListener('load', doFirst);