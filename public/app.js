const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainTask = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = '08d1ff27ba3f8236c3b68e4278207732';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const ICON_API = `http://openweathermap.org/img/wn/`;
const DEFAULT_CITY = 'tangail,bd';

window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      getWeatherData(null, s.coords);
    },
    (e) => {
      getWeatherData();
    }
  );

  axios
    .get('api/history')
    .then(({ data }) => {
      if (data.length > 0) {
        updateHistory(data);
      } else {
        historyElm.innerHTML = 'there is no history';
      }
    })
    .catch((e) => {
      console.log(e);
      alert('error ocured');
    });

  cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      if (e.target.value) {
        getWeatherData(e.target.value);
        e.target.value = '';
      } else {
        alert('please enter a valid city name');
      }
    }
  });
};

function getWeatherData(city = DEFAULT_CITY, coords) {
  let url = BASE_URL;

  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${url}&q=${city}`);
  axios
    .get(url)
    .then(({ data }) => {
      let weather = {
        icon: data.weather[0].icon,
        name: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };
      setWeather(weather);
    })
    .catch((e) => {
      console.log(e);
      alert('city Not Found');
    });
}

function setWeather(weather) {
  condition.src = `${ICON_API}${weather.icon}.png`;
  city.innerHTML = weather.name;
  country.innerHTML = weather.country;
  mainTask.innerHTML = weather.main;
  description.innerHTML = weather.description;
  temp.innerHTML = weather.temp;
  pressure.innerHTML = weather.pressure;
  humidity.innerHTML = weather.humidity;
}

function updateHistory(history) {
  historyElm.innerHTML = '';
  history = history.reverse();

  history.forEach((h) => {
    let temHistory = masterHistory.cloneNode(true);
    temHistory.id = '';
    temHistory.getElementsByClassName(
      'condition'
    )[0].src = `${ICON_API}${h.icon}.png`;
    temHistory.getElementsByClassName('city')[0].innerHTML = h.name;

    temHistory.getElementsByClassName('country')[0].innerHTML = h.country;

    temHistory.getElementsByClassName('main')[0].innerHTML = h.main;

    temHistory.getElementsByClassName('description')[0].innerHTML =
      h.description;

    temHistory.getElementsByClassName('temp')[0].innerHTML = h.temp;

    temHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure;

    temHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity;

    historyElm.appendChild(temHistory);
  });
}
