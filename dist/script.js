const cities = ["Cairo", "London", "Tokyo"];
const cardsContainer = document.getElementById("cardsContainer");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const displayedcards = [];
async function getWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await fetch(url);
        if (!response.ok) {
            alert(`No city named "${city}" was found`);
            return;
        }
        const data = await response.json();
        const card = document.createElement("div");
        card.className = "weather-card";
        card.innerHTML = `
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            <h2>${data.location.name}</h2>
            <p class="temp">${data.current.temp_c}°C</p>
            <p class="condition">${data.current.condition.text}</p>
            <p class="details">💧 ${data.current.humidity}%  |  💨 ${data.current.wind_kph} km/h</p>
        `;
        cardsContainer.appendChild(card);
        displayedcards.push(card);
        if (displayedcards.length > 3) {
            const oldestCard = displayedcards.shift();
            if (oldestCard) {
                cardsContainer.removeChild(oldestCard);
            }
        }
    }
    catch (error) {
        alert("An error occurred while fetching weather data; please check your internet connection.");
        console.log(error);
    }
}
cities.forEach(getWeather);
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    getWeather(cityName);
    cityInput.value = "";
});
export {};
//# sourceMappingURL=script.js.map