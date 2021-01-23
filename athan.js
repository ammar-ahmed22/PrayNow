chrome.storage.local.get(["city", "country", "school", 'method'], function(result){
    console.log(`Saved location is ${result["city"]}, ${result['country']}`)

    var city = result['city'];
    var country = result['country'];

    var location = document.getElementById('location')
    
    if((city != undefined) && (country != undefined)){
        location.innerHTML = `<h1 class="location__heading">
        <i class='bx bxs-been-here' ></i> ${city}, ${country}
        </h1>`;
    }

    var school = result["school"];

    if (school == true){
        var schoolOfThought = '0';
    }else{
        var schoolOfThought = '1';
    }

    var method = result['method'];

    
    //Path to api call    
    var apiPath = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&school=${schoolOfThought}`

    //Changes api call based on if a method for calculation is selected. 
    if (method != 'none'){
        apiPath = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&school=${schoolOfThought}&method=${method}`;
    }else{
        apiPath = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&school=${schoolOfThought}`;
    }
    var Fajr = document.getElementById('fajr');
    var Zuhr = document.getElementById('zuhr');
    var Asr = document.getElementById('asr');
    var Magrib = document.getElementById('magrib');
    var Isha = document.getElementById('isha');


    var dateElement = document.getElementById('date');
    var islDate = document.getElementById('isl-date');
    //Heading that gets the output heading
    fetch(apiPath).then(response => response.json()).then(athanApi => {
        //Checking for bad request
        //e.g. invalid input or no input
        console.log('Api request')
        var athanTime = athanApi.data.timings;
        var selecterr = 'Set location in settings!';

        var date = athanApi.data.date;
        if (athanApi.code == 200){


            dateElement.innerHTML = `<h1 class="date__heading">
            <i class='bx bxs-calendar'></i> ${date.gregorian.month.en} ${date.gregorian.day}, ${date.gregorian.year}
            </h1>`;

            islDate.innerHTML = `<h1 class="isl-date"><i class='bx bxs-calendar-star'></i> ${date.hijri.month.en} ${date.hijri.day}, ${date.hijri.year}</h1>`;

            if ((city != undefined) && (country != undefined)){
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${formatTime(athanTime.Fajr)}</h1>
                <div class="shadow"></div>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <img src="images/Zuhr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${formatTime(athanTime.Dhuhr)}</h1>
                <div class="shadow"></div>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <img src="images/Asr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${formatTime(athanTime.Asr)}</h1>
                <div class="shadow"></div>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${formatTime(athanTime.Maghrib)}</h1>
                <div class="shadow"></div>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <img src="images/Isha.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${formatTime(athanTime.Isha)}</h1>
                <div class="shadow"></div>`;
            }else{
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <img src="images/Zuhr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <img src="images/Asr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <img src="images/Isha.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;
            }

            
        }else{
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <img src="images/Zuhr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <img src="images/Asr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <img src="images/Fajr.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <img src="images/Isha.svg" alt="" class="prayer__images">
                <h1 class="prayer__time">${selecterr}</h1>
                <div class="shadow"></div>`;
        }
    
    })
})



//Function to format the time given from the API
function formatTime(time){
    
    var hour = parseInt(time.slice(0, 2));
    var minutes = time.slice(3,5);
    
    if (hour > 12){
        var formatted = hour - 12;
        
    }else{
        var formatted = hour;
    }

    if (hour >= 12){
        var pastNoon = "PM"
    }else{
        var pastNoon = "AM"
    }
    
    return `${formatted}:${minutes} ${pastNoon}`
    
    
}


