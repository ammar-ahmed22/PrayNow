var submitBtn = document.getElementById('submit');
submitBtn.addEventListener("click", submit);


//Function that is called on submitting the form
function submit(){
    //Takes user input from input field in HTML for city and country
    var city = document.getElementById('city').value;
    var country = document.getElementById('country').value;

    //Input for changing to shaafi method
    var school = document.getElementById("switch").checked;
    

    //Input for method of calculation
    var method = document.getElementById('method').value;
    console.log(method + ' (found in submit)')
    
    // Stores data locally in the users browser (Basically like Html5Storage)
    // Data will not be deleted unless the browswer is deleted
    chrome.storage.local.set({"city": `${city}`, "country": `${country}`, 'school': school, 'method': `${method}`, }, function(){
        console.log("Location saved!");
        alert("Settings saved!")
    })
    
    
}

chrome.storage.local.get(["city", "country", "school", 'method'], function(result){
    
    var cityInput = document.getElementById('city');
    var countryInput = document.getElementById('country');
    var methodInput = document.getElementById('method');
    var toggle = document.getElementById('switch');

    var schoolOfThought = result['school'];    
    var city = result["city"];
    var country = result["country"];
    var method = result['method'];

    methodInput.value = method;

    

    if ((city != undefined) && (country != undefined)){
        cityInput.value = city;
        countryInput.value = country;
    }

    if (schoolOfThought == true){
        toggle.checked = true;
    }else{
        toggle.checked = false;
    }
})








