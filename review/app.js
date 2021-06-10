window.addEventListener('load' , () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconcode = document.querySelector('.icon')
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=745ff98385df751080b05ffa9d4a3e51`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const {main} = data.weather[0];
                    const {timezone} = data.base;
                    const temperatureC = Math.floor((temp - 273));

                    temperatureDegree.textContent = temperatureC;
                    temperatureDescription.textContent = main;
                    locationTimezone.textContent = data.sys.country + " / " + data.name;
                    iconcode = data.weather[0].icon;
                    //formula for C to F
                    let temperatureF = (temperatureC * 2) + 30;
                    
                    //icon
                    iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    document.getElementById("wicon").src = iconUrl;

                    //convert temperature on click
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperatureF;

                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temperatureC;
                        }
                    })

                });
        });
    }

    

});