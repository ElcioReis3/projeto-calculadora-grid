const clock = document.getElementById("displauHours");
let batery = document.getElementById("batery");

function showClock() {
    let date = new Date;
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let seconds = addZero(date.getSeconds());


    clock.innerHTML = `${hours}:${minutes}`
};

setInterval(() => {
    showClock()
}, 1000);

function addZero(x) {
    return x < 10 ? "0" + x : x
};

