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

    var dateObj = new Date;

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

        var fajrTime = athanTime.Fajr;
        var zuhrTime = athanTime.Dhuhr;
        var asrTime = athanTime.Asr;
        var magribTime = athanTime.Maghrib;
        var ishaTime = athanTime.Isha;

        var time = [dateObj.getHours(), dateObj.getMinutes()];        

        var next = nextPrayer(time, fajrTime, zuhrTime, asrTime, magribTime, ishaTime);
        
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

            if (next.prayer == 'fajr'){
                Fajr.style.backgroundColor = '#2196f3';
                Fajr.style.color = "#fff";
            }else if (next.prayer == 'zuhr'){
                Zuhr.style.backgroundColor = '#2196f3';
                Zuhr.style.color = "#fff"
            }else if (next.prayer == 'asr'){
                Asr.style.backgroundColor = '#2196f3';
                Asr.style.color = "#fff"
            }else if (next.prayer == 'magrib'){
                Magrib.style.backgroundColor = '#2196f3';
                Magrib.style.color = "#fff"
            }else if (next.prayer == 'isha'){
                Isha.style.backgroundColor = '#2196f3';
                Isha.style.color = '#fff'
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


//Function to check which prayer is next

function nextPrayer(time, fajr, zuhr, asr, magrib, isha){
    let fajrTime = [parseInt(fajr.slice(0, 2)), parseInt(fajr.slice(3,5))];
    let zuhrTime = [parseInt(zuhr.slice(0, 2)), parseInt(zuhr.slice(3,5))];
    let asrTime = [parseInt(asr.slice(0, 2)), parseInt(asr.slice(3,5))];
    let magribTime = [parseInt(magrib.slice(0, 2)), parseInt(zuhr.slice(3,5))];
    let ishaTime = [parseInt(isha.slice(0, 2)), parseInt(isha.slice(3,5))];

    if (time[0] <= fajrTime[0] && time[1] < fajrTime[1]){
        return {
            'prayer':'fajr',
            'hour': fajrTime[0],
            'minute': fajrTime[1]
        }
    }else if (time[0] == fajrTime[0] && time[1] > fajrTime[1]){
        return {
            'prayer':'zuhr',
            'hour': zuhrTime[0],
            'minute': zuhrTime[1]
        }
    }else if (time[0] <= zuhrTime[0] && time[1] < zuhrTime[1]){
        return {
            'prayer':'zuhr',
            'hour': zuhrTime[0],
            'minute': zuhrTime[1]
        }
    }else if (time[0] == zuhrTime[0] && time[1] > zuhrTime[1]){
        return {
            'prayer':'asr',
            'hour': asrTime[0],
            'minute': asrTime[1]
        }
    }else if (time[0] <= asrTime[0] && time[1] < asrTime[1]){
        return {
            'prayer':'asr',
            'hour': asrTime[0],
            'minute': asrTime[1]
        }
    }else if (time[0] == asrTime[0] && time[1] > asrTime[1]){
        return {
            'prayer':'magrib',
            'hour': magribTime[0],
            'minute': magribTime[1]
        }
    }else if (time[0] <= magribTime[0] && time[1] < magribTime[1]){
        return {
            'prayer':'magrib',
            'hour': magribTime[0],
            'minute': magribTime[1]
        }
    }else if (time[0] == magribTime[0] && time[1] > magribTime[1]){
        return {
            'prayer':'isha',
            'hour': ishaTime[0],
            'minute': ishaTime[1]
        }
    }else if (time[0] <= ishaTime[0] && time[1] < ishaTime[1]){
        return {
            'prayer':'isha',
            'hour': ishaTime[0],
            'minute': ishaTime[1]
        }
    }else if (time[0] == ishaTime[0] && time[1] > ishaTime[1]){
        return {
            'prayer': 'fajr',
            'hour': fajrTime[0],
            'minute': fajrTime[1]
        };
    }else{
        return {
            'prayer': 'fajr',
            'hour': fajrTime[0],
            'minute': fajrTime[1]
        };
    }

}


//Function to convert seconds to hours and mins

function toHour(seconds){
    let hour = (seconds/3600)  % 24;
    let minutes = ((seconds - hour)/60) % 60
    return [hours, minutes];
}

// Function to calculate time remaining
function hoursRem(hour, min, targetHour, targetMin){
    let sec = (hours*3600) + (min * 60);
    let secTar = (targetHour * 3600) + (targetMin * 60);
    let rem = secTar - sec;


}
