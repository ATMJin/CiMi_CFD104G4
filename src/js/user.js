 /*功能一 : searchBar點擊輸入搜索欄位*/
 const searchBar = document.querySelector('.users .search input');
 const searchBtn = document.querySelector('.users .search button');
 const userList = document.querySelector('.users .users_list');


 searchBtn.onclick = () => {
     searchBar.classList.toggle('active');
     searchBar.focus();
     searchBtn.classList.toggle('active');
     searchBar.value = "";
 }

/*功能二 : 從好友列表中撈資料寫入userList*/
 
 let xhr = new XMLHttpRequest() //產生XML物件


 
// setInterval(() => {
    //執行ajax
    // xhr = new XMLHttpRequest() 
    xhr.open('GET', 'phps/users.php', true)
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                // console.log(data);
                userList.innerHTML = data;
            }
        }
    }
    xhr.send(null);
// }, 500);



/*功能三: 左邊的人點擊之後要換成他的頭像和名字和聊天視窗 */
function doFirst() {
    const users = document.querySelectorAll('.users_list .friends');
    console.log(users);

     for (let i = 0; i < users.length; i++) {
         users[i].addEventListener('click', function (e) {


            //換顏色
            //  users[i].style.backgroundColor = '#FFFFF'
            //  console.log(e.currentTarget);

             let a = e.currentTarget
            //  a.style.backgroundColor = '#EAF3FF'

             console.log('給老師看', a.lastElementChild.innerText); //使用者id
             let user_id = a.lastElementChild.innerText

             let userInfo = document.querySelector('.chat_area header')
             console.log(userInfo);
            
            xhr.open('POST', 'phps/getusers.php', true)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`id=${user_id}`);
            xhr.onload = () => {
                 if (xhr.readyState == 4) {
                     if (xhr.status == 200) {
                         let data = xhr.responseText;
                         userInfo.innerHTML = data;

                         console.log(data);
                     }
                 }
             }

         })
     }

 }
//  function changeState() {}
 window.addEventListener('load', doFirst)
     
