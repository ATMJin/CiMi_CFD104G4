let checkbox = document.querySelector('.switch__checkbox');
let switcher =  document.querySelector('.switch__slider');
var body =  document.querySelector("body");
var audio = new Audio('https://www.freesound.org/data/previews/88/88659_392324-lq.mp3');
let center = document.querySelector('.center');
let section = document.getElementsByTagName('section');
let question_no_array = [];
let background = document.getElementById('bg_box');


Object.prototype.addClass = function(className) {
  this.classList.add(className);
}

Object.prototype.removeClass = function(className) {
  this.classList.remove(className);
}

Object.prototype.toggleClass = function(className){
  this.classList.contains(className) ? this.removeClass(className) : this.addClass(className);
}



checkbox.addEventListener('change', function change_scene() {
  let typer = document.getElementById("typewriter-contain");
  switcher.toggleClass("glow");
  setTimeout(function () {
    center.style="display:none";
    section[0].style = "visibility:visible";
    background.style = "visibility:visible";
  typer.innerHTML='<div class="dynamic-text-wrapper"><div class="dynamic-text">有些緣分，稍縱即逝</div><div class="dynamic-text">錯過了，將永遠消失</div><div class="dynamic-text">午夜之前，按下按鈕，送出邀請吧!</div></div>';
  }, 500);
  body.toggleClass("light-bg");
  audio.pause();
  audio.play();
  
});

//好友蒐集bar
let collection = document.getElementById("collect");

let red_button =document.getElementById("red_button");
let blue_button =document.getElementById("blue_button");
let yellow_button =document.getElementById("yellow_button");



//紅色球
let flag_ball_red=false;
function collective_red(){
  if(red_button.innerText=='送出邀請'&& flag_ball_red==false){

    let red_ball = document.createElement("div");
    red_ball.classList.add("ball_collect_red");
    collection.appendChild(red_ball);

    red_button.style.backgroundColor="transparent";
		red_button.style.color="white";
		red_button.innerText=('取消邀請');
    
    flag_ball_red=true;
  
		
  }else if(red_button.innerText=='取消邀請'&& flag_ball_red==true){
    red_button.innerText=('送出邀請');
    let red_ball = document.querySelector('.ball_collect_red');
    red_ball.remove();
    flag_ball_red=false;

  }else{

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
		blue_button.innerText=('取消邀請');
    
    flag_ball_blue=true;
  
		
  }else if(blue_button.innerText=='取消邀請'&& flag_ball_blue==true){
    blue_button.innerText=('送出邀請');
    let blue_ball = document.querySelector('.ball_collect_blue');
    blue_ball.remove();
    flag_ball_blue=false;

  }else{

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
		yellow_button.innerText=('取消邀請');
    
    flag_ball_yellow=true;
  
		
  }else if(yellow_button.innerText =='取消邀請' && flag_ball_yellow == true){
    yellow_button.innerText=('送出邀請');
    let yellow_ball = document.querySelector('.ball_collect_yellow');
    yellow_ball.remove();
    flag_ball_yellow=false;

  }else{

  }

}

// 
// //////////////////////////////////////
// function getquestion() {
//   let dataObj =new Date();
//   let day = dataObj.getDay();
//   question_no = [day * 3, day * 3 + 1, day * 3 + 2];

// 	let xhr = new XMLHttpRequest();
// 	xhr.onload = function(){
// 		// console.log(JSON.parse(xhr.responseText));
// 	}
// 	xhr.open("get", "phps/paring.php", true);
// 	xhr.send(null);
// }
//////////////////////////////////////


function doFirst(){
  
  red_button.addEventListener('click',collective_red);
  blue_button.addEventListener('click',collective_blue);
  yellow_button.addEventListener('click',collective_yellow);
  getquestion();

// 	check_buttons.forEach(btn => {
//     btn.addEventListener('click', change_status);

// });
}


window.addEventListener('load', doFirst);