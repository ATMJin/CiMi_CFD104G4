function doFirst(){
    document.getElementById('theFile').onchange = fileChange
}

function fileChange(){
    //抓到file檔案
    let file = document.getElementById('theFile').files[0]
    
    
    /*-------------------------------------------------- */

    let readImage = new FileReader();
    readImage.readAsDataURL(file);

    //注意:內嵌外部內容會發生load事件
    readImage.addEventListener('load', function(){ //拿到response之後開始寫這邊
        let chat_box = document.querySelector('.chat_box')
        let imgContainer = document.createElement('img')
        imgContainer.setAttribute('src', readImage.result)
        chat_box.append(imgContainer)
        // console.log(chat_box)
        // let image = document.getElementById('image')
        // image.src = readImage.result;
        // image.style.maxWidth = '400px';
        // image.style.maxHeight = '400px';
    })
}
window.addEventListener('load', doFirst)