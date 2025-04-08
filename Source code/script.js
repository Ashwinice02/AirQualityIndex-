const errorLabel = document.querySelector(".error-msg");
const latInp = document.querySelector("#latitude");
const lonInp = document.querySelector("#longitude");
const airQuality = document.querySelector(".air-quality");
const airQualityStat = document.querySelector(".air-quality-status");
const componentsEle = document.querySelector("[data-comp='pm2_5']");

const appId = "15f13b2d939c1326bc93aeff858f14ef"; // Your API Key
const link = "https://api.openweathermap.org/data/2.5/air_pollution"; // API endpoint

const getAirQuality = async () => {
    const lat = latInp.value;
    const lon = lonInp.value;

    if (!lat || !lon) {
        errorLabel.innerText = "Please enter valid coordinates.";
        return;
    }

    try {
        const response = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const airData = await response.json();
        setValuesOfAir(airData);
        setComponentsOfAir(airData);
    } catch (error) {
        errorLabel.innerText = "Something went wrong. Check your internet connection.";
        console.error(error);
    }
};

const setValuesOfAir = (airData) => {
    const pm25 = airData.list[0].components.pm2_5;
    let airStat = "";
    let color = "";

    airQuality.innerText = pm25;

    if (pm25 <= 12) {
        airStat = "Good";
        color = "rgb(19, 201, 28)";
    } else if (pm25 <= 35.4) {
        airStat = "Moderate";
        color = "rgb(201, 204, 13)";
    } else if (pm25 <= 55.4) {
        airStat = "Unhealthy for Sensitive Groups";
        color = "rgb(204, 83, 13)";
    } else if (pm25 <= 150.4) {
        airStat = "Unhealthy";
        color = "rgb(204, 13, 13)";
    } else if (pm25 <= 250.4) {
        airStat = "Very Unhealthy";
        color = "rgb(121, 14, 12)";
    } else {
        airStat = "Hazardous";
        color = "rgb(126, 0, 35)";
    }

    airQualityStat.innerText = airStat;
    airQualityStat.style.color = color;
};

const setComponentsOfAir = (airData) => {
    const components = airData.list[0].components;
    componentsEle.innerText = components.pm2_5 + " µg/m³";
};
