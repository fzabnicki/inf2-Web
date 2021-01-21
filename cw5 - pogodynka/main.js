let input = document.getElementById('inputBox');
const button = document.querySelector("#inputBtn");
let quant = 0;
const apiKey = "c9282e6c985537ea764a0ed9f6aa40f9";
const localStorageKey = 'Cities'
let cities = [];
let citiesArray = [];
let loading = false;

button.addEventListener("click", CreateNewWeatherInfoBox);

function CreateNewWeatherInfoBox(){
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=${apiKey}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then((json) => {
        if(input.value == ""){
            alert('Please insert City name.');
        }
        else{
            if(json.cod == '404'){
                alert(capitalizeFirstLetter(json.message)+ ', Error: '+json.cod)
            }
            else{
                if(json.cod == '400'){
                    alert(capitalizeFirstLetter(json.message)+ ', Error: '+json.cod)
                }else{

                    let mainDiv = document.createElement("div");
                    mainDiv.className = "weatherInfoBox";
                    mainDiv.setAttribute("id", `mainDiv${quant}`);
                    document.body.appendChild(mainDiv);
                    mainDiv = null;
                    
                    let cityDiv = document.createElement("div");
                    cityDiv.className = "cityName";
                    cityDiv.appendChild(document.createTextNode(`${json.name}`));
                    
                    let closeButton = document.createElement("button");
                    closeButton.setAttribute('id', quant);
                    closeButton.setAttribute('onClick', 'removeFromLocalStorage(this.id)')
                    closeButton.className = "closeButton";
                    closeButton.innerHTML = 'X';
                    
                    let temperatureDiv = document.createElement("div");
                    temperatureDiv.className = "temperature";
                    temperatureDiv.appendChild(document.createTextNode(`${Math.round(json.main.temp-273.15)}\u2103`));
                    
                    let humidityDiv = document.createElement("div");
                    humidityDiv.className = "humidity";
                    humidityDiv.appendChild(document.createTextNode(`Humidity: \n${json.main.humidity}%`));
                    
                    let pressureDiv = document.createElement("div");
                    pressureDiv.className = "pressure";
                    pressureDiv.appendChild(document.createTextNode(`Pressure: \n${json.main.pressure} hPa`));
                    
                    let lineDiv = document.createElement("div");
                    lineDiv.className = "line";
                    
                    let weatherNameDiv = document.createElement("div");
                    weatherNameDiv.className = "weatherName";
                    weatherNameDiv.appendChild(document.createTextNode(`${capitalizeFirstLetter(json.weather[0].description)}`));
                    
                    let weatherIcon = document.createElement("img");
                    weatherIcon.className = "weatherIcon";
                    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)

                    document.getElementById(`mainDiv${quant}`).appendChild(closeButton);
                    document.getElementById(`mainDiv${quant}`).appendChild(cityDiv);
                    document.getElementById(`mainDiv${quant}`).appendChild(temperatureDiv);
                    document.getElementById(`mainDiv${quant}`).appendChild(humidityDiv);
                    document.getElementById(`mainDiv${quant}`).appendChild(lineDiv)
                    document.getElementById(`mainDiv${quant}`).appendChild(pressureDiv);
                    document.getElementById(`mainDiv${quant}`).appendChild(weatherNameDiv);
                    document.getElementById(`mainDiv${quant}`).appendChild(weatherIcon);
                    quant = quant +1 ;
                    if(!loading){
                        cities.push(json.name);
                        SaveToLocalStorage();
                    }
                    console.log(json);
            }
        }}
    })
    .catch(err => { throw err });
}
function SaveToLocalStorage(){
    localStorage.setItem(localStorageKey,JSON.stringify(cities));
}
function LoadFromLocalStorage(){
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    citiesArray = citiesFromLocalStorage;
    console.log(citiesArray);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function removeFromLocalStorage(id){
    cities.splice(id,1);
    SaveToLocalStorage();
    document.querySelectorAll('.weatherInfoBox').forEach(e=> e.remove())
    CreateFromLocalStorage();
}
function CreateFromLocalStorage(){
    LoadFromLocalStorage();
    if(cities != null){
        for(let city of citiesArray){
            loading =true;
            input.value = city;
            CreateNewWeatherInfoBox();
        }
    }
    loading = false;
}
document.onload = CreateFromLocalStorage();