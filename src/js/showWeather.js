const icons = document.querySelectorAll('.js_smallCard__icon');
const maxTemps = document.querySelectorAll('.js_smallMaxTemp')

function getToday() {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    return today;
}

//store needed data in one object
function getAllDaysData(arg) {
    const allDaysData = [];
    arg.list.map((i) => {
        allDaysData.push({
            date: i.dt_txt.split(' ')[0],
            time: i.dt_txt.split(' ')[1],
            tempMax: i.main.temp_max,
            icon: i.weather[0].icon,
            desc: i.weather[0].description
        })
    });
    return allDaysData;
}

//get data for 4 next days at noon
function getNextDaysData(arg) {
    const today = getToday();
    const allDaysData = getAllDaysData(arg);
    const nextDaysData = allDaysData.filter((n) => {
        return (n.date > today && n.time === "12:00:00")
    })
    return nextDaysData;
}

//display weather data in small cards
function showWeather(arg){
    console.log('----------Prognoza na kolejne dni------------', arg)
    const nextDaysData = getNextDaysData(arg);
    for(let i = 0; i <= 3; i++) {
        maxTemps[i].textContent = nextDaysData[i].tempMax.toFixed(1)
        icons[i].src = `http://openweathermap.org/img/wn/${nextDaysData[i].icon}@2x.png`,
        icons[i].alt = nextDaysData[i].desc
        icons[i].title = nextDaysData[i].desc
    }
}

export default showWeather