const years       = document.getElementById("year"        );
const months      = document.getElementById("month"       );
const days        = document.getElementById("day-input"   );
const dayPlusBtn  = document.getElementById("day-plus"    );
const dayMinusBtn = document.getElementById("day-minus"   );
const message     = document.getElementById("message-date");
const id          = document.getElementById("id"          );

let day        = '';
let month      = '';
let year       = '';
let url        = '';
let dateString = '';

document.addEventListener('DOMContentLoaded', function() {
    initiateApp();
});

dayPlusBtn.addEventListener('click', getTomorrow);
dayMinusBtn.addEventListener('click', getYesterday);

function initiateApp() {
    getDate();

    setDate();
    
    getApiData();

}

function getDate() {
    const today         = new Date();

    day        = today.getDate();
    month      = today.getMonth();
    year       = today.getFullYear();
    dateString = today.toString();
    
}

function setDate() {
    const monthsSpanish = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    years.textContent  = year;
    months.textContent = monthsSpanish[month];
    days.textContent   = day;
}

async function getApiData() {
    url        = `https://byabbe.se/on-this-day/${month + 1}/${day}/events.json`;

    await fetch(url)
    .then((res)  => res.json())
    .then((data) => {
        let dataLength = data.events.length;
        let random     = Math.round(Math.random() * (dataLength));
        let randomFact = data.events[random].description;

        message.textContent = randomFact;
    })
    .catch((e) => console.log(e));
}

function getTomorrow() {

    let diasMes = new Date(year, month+1, 0).getDate();
    
    if (day >= diasMes) {
        month += 1;
        day    = 1;
    } else {
        day   += 1;
    }

    getApiData();
    setDate();

}

function getYesterday() {

    let diasMes = new Date(year, month+1, 0).getDate();

    if (day <= 1) {
        month -= 1;
        day    = diasMes;
    } else {
        day   -= 1;
    }

    getApiData();
    setDate();
}

