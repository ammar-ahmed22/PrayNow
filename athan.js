chrome.storage.local.get(["city", "country", "school", 'method'], function(result){
    console.log(`Saved location is ${result["city"]}, ${result['country']}`)

    var city = result['city'];
    var country = result['country'];

    var location = document.getElementById('location')
    
    if((city != undefined) && (country != undefined)){
        location.innerHTML = `<h1 class="location__heading">
        <i class='bx bxs-been-here' id='location-icon' ></i> ${city}, ${country}
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

        // var next = nextPrayer(time, fajrTime, zuhrTime, asrTime, magribTime, ishaTime);
        
        var date = athanApi.data.date;

        console.log(timeDifference(new Date(), athanApi.data, 'Isha'))
        
        var next = nextPrayer(new Date(), athanApi.data, ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']);
        console.log(next.timeTo)
        console.log(`Next prayer is ${next.prayer} in ${msToTime(next.timeTo)[2]} hours and ${msToTime(next.timeTo)[1]} minutes.`)

        
        if (athanApi.code == 200){


            

            islDate.innerHTML = `<h1 class="isl-date"><i class='bx bxs-calendar-star' id="isl-cal-icon"></i> ${date.hijri.month.en} ${date.hijri.day}, ${date.hijri.year}</h1>`;

            if ((city != undefined) && (country != undefined)){
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <h1 class=next__prayer>${msToTime(next.timeTo)[2]}hrs${msToTime(next.timeTo)[1]}m</h1>
                <h1 class="prayer__time">${formatTime(athanTime.Fajr)}</h1>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <h1 class=next__prayer>${msToTime(next.timeTo)[2]}hrs${msToTime(next.timeTo)[1]}m</h1>
                <h1 class="prayer__time">${formatTime(athanTime.Dhuhr)}</h1>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <h1 class=next__prayer>${msToTime(next.timeTo)[2]}hrs${msToTime(next.timeTo)[1]}m</h1>
                <h1 class="prayer__time">${formatTime(athanTime.Asr)}</h1>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <h1 class=next__prayer>${msToTime(next.timeTo)[2]}hrs${msToTime(next.timeTo)[1]}m</h1>
                <h1 class="prayer__time">${formatTime(athanTime.Maghrib)}</h1>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <h1 class=next__prayer>${msToTime(next.timeTo)[2]}hrs${msToTime(next.timeTo)[1]}m</h1>
                <h1 class="prayer__time">${formatTime(athanTime.Isha)}</h1>`;
            }else{
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;
            }

            if (next.prayer == 'Fajr'){
                Fajr.style.backgroundColor = 'rgba(109, 176, 56, 0.6)';
                Fajr.style.color = "#fff";
            }else if (next.prayer == 'Dhuhr'){
                Zuhr.style.backgroundColor = 'rgba(109, 176, 56, 0.6)';
                Zuhr.style.color = "#fff"
            }else if (next.prayer == 'Asr'){
                Asr.style.backgroundColor = 'rgba(109, 176, 56, 0.6)';
                Asr.style.color = "#fff"
            }else if (next.prayer == 'Maghrib'){
                Magrib.style.backgroundColor = 'rgba(109, 176, 56, 0.6)';
                Magrib.style.color = "#fff"
            }else if (next.prayer == 'Isha'){
                Isha.style.backgroundColor = 'rgba(109, 176, 56, 0.6)';
                Isha.style.color = '#fff'
            }
            
        }else{
                Fajr.innerHTML = `<h1 class="prayer__heading">
                Fajr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Zuhr.innerHTML = `<h1 class="prayer__heading" >
                Zuhr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Asr.innerHTML = `<h1 class="prayer__heading">
                Asr
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Magrib.innerHTML = `<h1 class="prayer__heading" id="magrib">
                Magrib
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;

                Isha.innerHTML = `<h1 class="prayer__heading">
                Isha
                </h1>
                <h1 class="prayer__time">${selecterr}</h1>`;
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
    
    return `${formatted} : ${minutes} ${pastNoon}`
    
    
}


//Function to check which prayer is next

// function nextPrayer(time, fajr, zuhr, asr, magrib, isha){
//     let fajrTime = [parseInt(fajr.slice(0, 2)), parseInt(fajr.slice(3,5))];
//     let zuhrTime = [parseInt(zuhr.slice(0, 2)), parseInt(zuhr.slice(3,5))];
//     let asrTime = [parseInt(asr.slice(0, 2)), parseInt(asr.slice(3,5))];
//     let magribTime = [parseInt(magrib.slice(0, 2)), parseInt(zuhr.slice(3,5))];
//     let ishaTime = [parseInt(isha.slice(0, 2)), parseInt(isha.slice(3,5))];

//     if (time[0] <= fajrTime[0] && time[1] < fajrTime[1]){
//         return {
//             'prayer':'fajr',
//             'hour': fajrTime[0],
//             'minute': fajrTime[1]
//         }
//     }else if (time[0] == fajrTime[0] && time[1] > fajrTime[1]){
//         return {
//             'prayer':'zuhr',
//             'hour': zuhrTime[0],
//             'minute': zuhrTime[1]
//         }
//     }else if (time[0] <= zuhrTime[0] && time[1] < zuhrTime[1]){
//         return {
//             'prayer':'zuhr',
//             'hour': zuhrTime[0],
//             'minute': zuhrTime[1]
//         }
//     }else if (time[0] == zuhrTime[0] && time[1] > zuhrTime[1]){
//         return {
//             'prayer':'asr',
//             'hour': asrTime[0],
//             'minute': asrTime[1]
//         }
//     }else if (time[0] <= asrTime[0] && time[1] < asrTime[1]){
//         return {
//             'prayer':'asr',
//             'hour': asrTime[0],
//             'minute': asrTime[1]
//         }
//     }else if (time[0] == asrTime[0] && time[1] > asrTime[1]){
//         return {
//             'prayer':'magrib',
//             'hour': magribTime[0],
//             'minute': magribTime[1]
//         }
//     }else if (time[0] <= magribTime[0] && time[1] < magribTime[1]){
//         return {
//             'prayer':'magrib',
//             'hour': magribTime[0],
//             'minute': magribTime[1]
//         }
//     }else if (time[0] == magribTime[0] && time[1] > magribTime[1]){
//         return {
//             'prayer':'isha',
//             'hour': ishaTime[0],
//             'minute': ishaTime[1]
//         }
//     }else if (time[0] <= ishaTime[0] && time[1] < ishaTime[1]){
//         return {
//             'prayer':'isha',
//             'hour': ishaTime[0],
//             'minute': ishaTime[1]
//         }
//     }else if (time[0] == ishaTime[0] && time[1] > ishaTime[1]){
//         return {
//             'prayer': 'fajr',
//             'hour': fajrTime[0],
//             'minute': fajrTime[1]
//         };
//     }else{
//         return {
//             'prayer': 'fajr',
//             'hour': fajrTime[0],
//             'minute': fajrTime[1]
//         };
//     }

// }

// Function to find what the next prayer is

function nextPrayer(timeNow, api, prayerNames){
    //time now is a date object, api is the api call, prayerNames is a list of the prayer names in string format following the api spelling

    differences = [] //differences in ms from now to each prayer time

    //looping through to assign values to differences list
    for (var i = 0; i < prayerNames.length; i++){
        differences.push(timeDifference(timeNow, api, prayerNames[i]))
    }

    let posIndices = [] // positive difference indexes 
    for (var i = 0; i < differences.length; i++){//looping through to create positive index list
        if (differences[i] > 0){
            posIndices.push(i)
        }
    }
    posDifferences = [] //list of positive differences
    if (posIndices.length != 0){ //checking if there are any positive indexes
        for (var i = 0; i < posIndices.length; i++){//looping through to assign positive indexes
            posDifferences.push(differences[posIndices[i]])

        }

        minIndex = posDifferences.indexOf(Math.min(...posDifferences)) //minimum index corresponding to positive differences
        minValue = differences[posIndices[minIndex]] //minimum value from original differences array (use this to find which prayer is next)

        return {//object with next prayer name and time to the next prayer in ms
            'prayer': prayerNames[posIndices[minIndex]],
            'timeTo': minValue
        }
        
    }else{

        let midnight = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), 23,59,0);
        let fajrTime = dateIntializer(api, 'Fajr');
        fajrTime.setDate(fajrTime.getDate()+1);
        if (timeNow.getHours() > parseInt(api.timings['Fajr'].slice(0,2))){
            //Need to check if this works
            return {
                'prayer': 'fajr',
                'timeTo': (midnight - timeNow) + (fajrTime - midnight)
            }
        }
    }

}


// Function to find time difference between now and prayer
// Takes nowDate as Date object, 
function timeDifference(nowDate, api, prayerName){
    let prayerDateObj = dateIntializer(api, prayerName)
    return prayerDateObj - nowDate
}

// Function to initialize a date object for a prayer time
// prayer is a string, following API spelling
function dateIntializer(api, prayer){
    return new Date(parseInt(api.date.gregorian.year), parseInt(api.date.gregorian.month.number) - 1, parseInt(api.date.gregorian.day), parseInt(api.timings[prayer].slice(0,2)), parseInt(api.timings[prayer].slice(3,5)), 0);
}

//Function to convert seconds to hours and mins

function msToTime(ms){
    var hours = Math.floor(ms / (1000 * 60 * 60) % 60);
    var minutes = Math.floor(ms / (1000 * 60) % 60);
    var seconds = Math.floor(ms / 1000 % 60);

    return [seconds, minutes, hours];
}

// Function to calculate time remaining
function hoursRem(hour, min, targetHour, targetMin){
    let sec = (hours*3600) + (min * 60);
    let secTar = (targetHour * 3600) + (targetMin * 60);
    let rem = secTar - sec;


}


