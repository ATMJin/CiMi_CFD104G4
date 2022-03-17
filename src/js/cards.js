let checkbox = document.querySelector('.switch__checkbox');
let switcher =  document.querySelector('.switch__slider');
var body =  document.querySelector("body");
var audio = new Audio('https://www.freesound.org/data/previews/88/88659_392324-lq.mp3');


let center = document.querySelector('.center');
let section = document.getElementsByTagName('section');
let question_no_array = [];
let background = document.getElementById('bg_box');

//邀請送出時間
let now = new Date();

let year = now.getFullYear();
let month = now.getMonth() + 1;

(function monthchange() {
  month = (month < 10 ? '0' : '') + month;
})();

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let timestamp = `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;


//check status
let check_day = `${year}-${month}-${date}`;


//好友蒐集bar
let collection = document.getElementById("collect");
let red_button =document.getElementById("red_button");
let blue_button =document.getElementById("blue_button");
let yellow_button =document.getElementById("yellow_button");


//傳送配對邀起需要變數
let paring_no=[];
let paring_time;


checkbox.addEventListener('change', function change_scene() {
  let typer = document.getElementById("typewriter-contain");
  switcher.classList.add("glow");

  setTimeout(function () {
    center.style="display:none";
    section[0].style = "visibility:visible";
    background.style = "visibility:visible";
  typer.innerHTML='<div class="dynamic-text-wrapper"><div class="dynamic-text">有些緣分，稍縱即逝</div><div class="dynamic-text">錯過了，將永遠消失</div><div class="dynamic-text">午夜之前，按下按鈕，送出邀請吧!</div></div>';
  }, 500);
  body.classList.add("light-bg");
  audio.pause();
  audio.play();
  
});

// XML 從資料庫抓出三個人放於畫面上面
//////////////////////////////////////
function getquestion(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let infos = JSON.parse(xhr.responseText);
      // console.log(xhr.responseText);
      let i = 0;
      document.getElementById("school_name_red").innerText = infos[i].mem_job;
      document.getElementById("interests_red").innerText = infos[i].mem_interests;
      document.getElementById("country_red").innerText = infos[i].mem_lovecountry;
      document.getElementById("exchange_red").innerText = infos[i].mem_exchange;
      document.getElementById("try_red").innerText = infos[i].mem_try;
      
      document.getElementById("school_name_blue").innerText = infos[i + 1].mem_job;
      document.getElementById("interests_blue").innerText = infos[i + 1].mem_interests;
      document.getElementById("country_blue").innerText = infos[i + 1].mem_lovecountry;
      document.getElementById("exchange_blue").innerText = infos[i + 1].mem_exchange;
      document.getElementById("try_blue").innerText = infos[i + 1].mem_try;

      document.getElementById("school_name_yellow").innerText = infos[i + 2].mem_job;
      document.getElementById("interests_yellow").innerText = infos[i + 2].mem_interests;
      document.getElementById("country_yellow").innerText = infos[i + 2].mem_lovecountry;
      document.getElementById("exchange_yellow").innerText = infos[i + 2].mem_exchange;
      document.getElementById("try_yellow").innerText = infos[i + 2].mem_try;

      
      paring_no = [infos[i].mem_no, infos[i + 1].mem_no, infos[i + 2].mem_no];
      console.log(paring_no);
    }
    xhr.open("get", "phps/paring_result.php", true);
    xhr.send(null);
}
//////////////////////////////////////

// XML 從資料庫抓出邀請狀態
//////////////////////////////////////
function getstatus_info() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      let status = JSON.parse(xhr.responseText);
      console.log(xhr.responseText);

      //找出陣列中是否有紅色人的編號/藍色人的編號/黃色人的編號
      let already_sent_red = $.map(status, function(item, index) {
      return item.paring_player_no;
      }).indexOf(paring_no[0]+1);

      let already_sent_blue = $.map(status, function(item, index) {
      return item.paring_player_no;
      }).indexOf(paring_no[1]+1);

      let already_sent_yellow = $.map(status, function(item, index) {
      return item.paring_player_no;
      }).indexOf(paring_no[2] + 1);
      
      //判斷陣列中有沒有物件，如有，判斷紅色藍色黃色分別是否有邀請
      if (xhr.responseText !== '') {

            if (already_sent_red) {
            red_button.innerText = ('已邀請');
            let red_ball = document.createElement("div");
            red_ball.classList.add("ball_collect_red");
            collection.appendChild(red_ball);
          } else{
            
          };

          if (already_sent_blue) {
            blue_button.innerText = ('已邀請');
            let blue_ball = document.createElement("div");
            blue_ball.classList.add("ball_collect_blue");
            collection.appendChild(blue_ball);
          }else{
            
          };
          if (already_sent_yellow) {
            yellow_button.innerText = ('已邀請');
            let yellow_ball = document.createElement("div");
            yellow_ball.classList.add("ball_collect_yellow");
            collection.appendChild(yellow_ball);
          }else{
            
          };
        
      } else {
        
      };

      
    }
    xhr.open("get",`phps/get_status.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    xhr.send(null);
}

//////////////////////////////////////

getquestion(getstatus_info);

//紅色球
let flag_ball_red=false;
function collective_red(){
  if(red_button.innerText=='送出邀請'&& flag_ball_red==false){

    let red_ball = document.createElement("div");
    red_ball.classList.add("ball_collect_red");
    collection.appendChild(red_ball);

    red_button.style.backgroundColor="transparent";
		red_button.style.color="white";
		red_button.innerText=('已邀請');
   
  
    $.ajax({
          url: 'phps/send_invitation.php',
          //player_no,paring_player_no,paring_time,send_invitation
          data:{player_no:sessionStorage.getItem('mem_no'),paring_player_no:paring_no[0],paring_time:timestamp,send_invitation:'是'},
          type: 'GET',
          success(res) {
              alert('邀請提交成功');
            console.log(res);
            
          },

    });
    
		 flag_ball_red=true;
 
  } else {
    red_button.innerText=('已邀請');


  }

}


//藍色球
let flag_ball_blue=false;
function collective_blue(){
  if(blue_button.innerText=='送出邀請'&& flag_ball_blue == false){

    let blue_ball = document.createElement("div");
    blue_ball.classList.add("ball_collect_blue");
    collection.appendChild(blue_ball);

    blue_button.style.backgroundColor="transparent";
		blue_button.style.color="white";
    blue_button.innerText = ('已邀請');
    
  
    

    $.ajax({
          url: 'phps/send_invitation.php',
          //player_no,paring_player_no,paring_time,send_invitation
          data:{player_no:sessionStorage.getItem('mem_no'),paring_player_no:paring_no[1],paring_time:timestamp,send_invitation:'是'},
          type: 'GET',
          success(res) {
              alert('邀請提交成功');
              console.log(res);
          },

      });

    flag_ball_blue=true;
  
  } else {
    blue_button.innerText=('已邀請');

  }

}


//黃色球
let flag_ball_yellow = false;
function collective_yellow(){
  if(yellow_button.innerText=='送出邀請'&& flag_ball_yellow == false){

    let yellow_ball = document.createElement("div");
    yellow_ball.classList.add("ball_collect_yellow");
    collection.appendChild(yellow_ball);

    yellow_button.style.backgroundColor="transparent";
		yellow_button.style.color="white";
    yellow_button.innerText = ('已邀請');
    
    
    $.ajax({
          url: 'phps/send_invitation.php',
          //player_no,paring_player_no,paring_time,send_invitation
          data:{player_no:sessionStorage.getItem('mem_no'),paring_player_no:paring_no[2],paring_time:timestamp,send_invitation:'是'},
          type: 'GET',
          success(res) {
              alert('邀請提交成功');
              console.log(res);
          },

      });
    
    flag_ball_yellow=true;
  
  } else {
    yellow_button.innerText=('已邀請');

  // }else if(yellow_button.innerText =='取消邀請' && flag_ball_yellow == true){
  //   yellow_button.innerText=('送出邀請');
  //   let yellow_ball = document.querySelector('.ball_collect_yellow');
  //   yellow_ball.remove();
  //   flag_ball_yellow=false;
  }

}

// 



function doFirst(){
  getquestion();
  red_button.addEventListener('click',collective_red);
  blue_button.addEventListener('click',collective_blue);
  yellow_button.addEventListener('click',collective_yellow);
 
  getstatus_info();

}


window.addEventListener('load', doFirst);