

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
    videoPause();
    movedown();
    }, 100);


let flag1 = false;
let flag_touch = false;
let flag_movedown = false;


//影片暫停
let flag = [false,false,false];
let pauseTime = [7.8,14.6,25];
let options =[];




//洞裡面
let destiny_botton = document.getElementById("destiny_botton");
let waiting_lightbox = document.getElementById("waiting_lightbox");
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document

//點按蒐集答案
let question_no_array = [];
let question_no;
let ans_pack = [];


//返回按鈕
let back_button = document.getElementById("return_button");
let x_button = document.getElementById("button_escape");

//註冊事件聆聽
function doFirst() {
    back_button.addEventListener('click', return_page);
    x_button.addEventListener('click', return_page);
    getquestion();
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    waiting_lightbox.style="display:none";
    start.addEventListener('click',startfilm);
    pink.addEventListener('click', go_pink);
    yellow.addEventListener('click', go_yellow);
    purple.addEventListener('click', go_purple);
    button_check.addEventListener('click', check_play);
    //答案選擇，撥放功能
    playButtons.forEach(btn => {
        btn.addEventListener('click',playToggle);
    });
    window.addEventListener('load', movedown);
    
};


function return_page() {
    window.history.go(-1);
}
// 一、題目&答案從資料庫抓出放於畫面上面
//////////////////////////////////////
function getquestion(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let questions = JSON.parse(xhr.responseText);
        // console.log(questions[0].optionA);
        
        let i= 0;
        let dataObj =new Date();
        let day = dataObj.getDay();
     
        i = day*3;
        question_no_array=[questions[i].question_no,questions[i+1].question_no,questions[i+2].question_no];
        console.log(question_no_array);

        document.getElementById("question1").innerText = questions[i].question;
        document.getElementById("question2").innerText = questions[i+1].question;
        document.getElementById("question3").innerText = questions[i+2].question;

        // for(i = 0;i<3;i++){
        //         options[i] = [`A. ${questions[i].optionA}`,`B. ${questions[i].optionB}`,`C. ${questions[i].optionC}`];
        //     };
      options =[
        [questions[i].optionA,questions[i].optionB,questions[i].optionC],
        [questions[i+1].optionA,questions[i+1].optionB,questions[i+1].optionC],
        [questions[i+2].optionA,questions[i+2].optionB,questions[i+2].optionC]
    ];
        }
    xhr.open("get", "phps/get_question.php", true);
    xhr.send(null);
}


//////////////////////////////////////

//客製化球的顏色
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


//手機影片movedown
function movedown(){
    if(!selectVideo.paused && !selectVideo.ended && flag_movedown == false){
        document.getElementsByClassName('player')[0].classList.add("margin_top");  
        flag_movedown = true; 

    }else if( selectVideo.paused && flag_movedown == true){
        document.getElementsByClassName('player')[0].classList.remove("margin_top"); 
        flag_movedown = false; 
    };
}



//點按check後，遊戲說明燈箱消失
function check_play(){
    document.getElementById("instrction_lightbox").style ="display:none";
    document.getElementById("start").style="visibility:visible";
    
    document.getElementById("animated-title").classList.add("start_text_animation");
    document.getElementById("choose_text").classList.add("choose_text_animation");

};

function startfilm(){
    start.classList.add("start_bitton_anime");
    setTimeout(function(){start.style="display:none;"}, .5*1000);
   
    document.getElementById("start").style ="display:none";
    document.querySelector(".trees").style="display:none";
    document.querySelector(".ball").style="right:43%;top:43%;width:12%;"
    document.getElementById("ball_svg").style="display:block";
    pink.style="display:none";
    yellow.style="display:none";
    purple.style="display:none";
    selectVideo.play();
}

//影片狀態，以及對應的相關動作(非特例)
function playToggle(e) {

    if (!selectVideo.paused && !selectVideo.ended) {
        playButtons.forEach(btn => {
        btn.style ="visibility: visible";});
        
       
    } else { 
        let mem_ans_no = e.target.dataset.ans;
        let mem_ans_q_no = `${question_no_array[question_no]}:${mem_ans_no}`;
        ans_pack.push(mem_ans_q_no);

        // console.log(question_no_array[question_no],mem_ans);
        console.log(ans_pack);
        

//二、傳資料給php，php執行insert會員答案的動作

        $.ajax({
            url: 'phps/response.php',
            data: {mem_no:sessionStorage.getItem('mem_no'),question_no:question_no_array[question_no],mem_ans:mem_ans_q_no},
            
            type: 'GET',
            success(res) {
                alert('答案提交成功');
                
            },

        
        });

        

        ////////////////////////////////

        selectVideo.play();
        question_frame[0].style = "visibility:hidden";
        answer_frame[0].style = "visibility:hidden";

        for(i=0; i<3; i++){
            questions[i].style ="visibility:hidden"};
            
            
        for(j=0; j<3; j++){
            playButtons[j].style ="visibility: hidden";
        };
         
    };
    // FIXME 下面那行開發時加速用
    selectVideo.currentTime +=7
};

//影片暫停的時間，以及每次暫停時要做的事情(特例)
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
          
            question_no = i;

            for(j=0; j<3; j++){
                playButtons[j].innerText= options[i][j];
            };
        } 
    };
    
    if(selectVideo.currentTime > 28){

        clearInterval(timer);
        
        let typer = document.getElementById("typewriter-contain");

        
        typer.innerHTML='<div class="dynamic-text-wrapper"><div class="dynamic-text">屬於你的Destiny</div><div class="dynamic-text">即將於午夜12:00出現</div></div>';

        
        setTimeout(function(){destiny_botton.innerHTML='<a href="cards.html"><button id="My_destiny_button">我的destiny</button></a>'}, 10*1000);

//三、送出玩遊戲時間/答案包至 mempairdata

            let Today = new Date();
            let playdate=`${Today.getFullYear()}.${Today.getMonth()+1}.${Today.getDate()}`;
            
        // ans_pack.toString();
        // console.log(ans_pack);


            $.ajax({
            url: 'phps/already_played.php',
            data: {mem_no:sessionStorage.getItem('mem_no'),playdate,ans_pack:ans_pack.toString()},
            type: 'GET',
            success(res){
                console.log(playdate);
                console.log(res);
                alert('後臺異動成功');
            },
        })

    }
    if(selectVideo.currentTime > 2.5 && flag1 == false){

        selectVideo.pause();
       
        if(document.body.clientWidth < 768){
            document.getElementById("space").innerText="點擊畫面，讓你的球跳躍~";
            document.getElementById("space").style="visibility:visible";
        }else{
            document.getElementById("space").style="visibility:visible";
        }
       
        
        window.addEventListener('keydown', space_instruct);
        function space_instruct(e) {

            if (e.keyCode == 32 && flag1 == false ) {
                selectVideo.play();
                
                document.getElementById("space").style="visibility:hidden";
                flag1 = true;
            } ;
        };

    };
    
    if(selectVideo.currentTime > 25.7){
        document.body.style.background = "#1C1415";

    };
};

//球跳躍控制

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
window.addEventListener('touchstart',touch, false);


function touch(){
    tl_control.reversed(!tl_control.reversed());
    if(selectVideo.currentTime > 2.5 && flag1==false){
        selectVideo.play();
        document.getElementById("space").style="visibility:hidden";
        flag1 = true;
    }

    
};
window.addEventListener('load', doFirst);