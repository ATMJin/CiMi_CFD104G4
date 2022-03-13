//會員名稱

function chartsname() {
    let charts_mem = document.querySelectorAll('.charts_mem');
    // console.log(charts_mem)

    // GET
    let xhr = new XMLHttpRequest();
    xhr.open("get", `phps/getcharts.php?case=chartsname`, true);
    xhr.send(null);

    xhr.onload = function () {
        // 接收PHP傳來的資料
        charts_name = JSON.parse(xhr.responseText);
        charts_mem[0].innerText = charts_name[0];
        for (let i = 0; i < charts_mem.length; i++) {
            // console.log(charts_name[i].mem_name);
            // charts_mem[i].innerText = charts_name[i].mem_name;
        }
    }
}

function doFirst() {
    chartsname();
}
window.addEventListener('load', doFirst)