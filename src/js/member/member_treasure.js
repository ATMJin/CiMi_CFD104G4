const tracksectionlist =[];

function creatTracksection(title) 
{
    console.log('creat')
    //創建UI
        let parent = document.getElementById('test');
　　　　//新增 div
        let div = document.createElement("div");
　　
　　　　div.setAttribute("id",title);
　　　　div.innerHTML = "js 動態新增div";
        tracksectionlist.push(div)
　　　　parent.appendChild(div);
        　　
    
     //註冊取消追蹤事件
}

function updateUI(data) 
{
     //判斷有幾筆資料
     //如果資料不夠就creatTracksection
     //不然更新ui
     tracksectionlist.forEach((value)=>{value.setAttribute("id",data)})
}

function sendRemoveTracksection(title) 
{
     //送server取消追蹤事件
     xhr.send(null);
}

window.addEventListener("load", () => {
    creatTracksection('test')
    // xhr = new XMLHttpRequest();
    // xhr.open("get", `phps/member/member_integral.php?mem_no=${sessionStorage.getItem('mem_no')}`, true);
    // xhr.send(null);

    // xhr.onload = function () {
    //     // 接收PHP傳來的資料
    //     data = JSON.parse(xhr.responseText);
    //     // console.log(xhr.responseText);
    //     console.log(member.mem_point);
    //     // console.log(aaaa);
    //     updateUI(data)  
    // }
})