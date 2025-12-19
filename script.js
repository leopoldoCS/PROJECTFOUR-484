//Global Variables
let map;
let currentIndex = 0;
let score = 0;
let currentRect = null;

let guessPoint= null;    
let infoPop = null;   

//RELOADS THE PAGE TO RESTART THE GAME
document.getElementById("resetButton").addEventListener("click", function() {
    location.reload();
});

//WHERE THE MAP IS CENTERED AT WITH THE LOCATIONS I CHOSE
function wholeMap() {
const schoolCenter = { 
    lat: 34.23761953544939,
    lng:-118.52907677505928
};
    
    map = new google.maps.Map(document.getElementById("map"), {
    center: schoolCenter,
    zoom: 18,
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
//hHides the names of locations
    styles: [
      {
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  
});
//MY FIRST UNIQUE GOOGLE MAPS COMPONENT
infoPop = new google.maps.InfoWindow();

showQ();
//DOUBLE CLICK
map.addListener("dblclick", function(e){
    theClick(e.latLng);
});
}

// PLACES ON THE MAP
const places = [
    {
        place: "Kurland Lecture Hall—E1",
        bounds: {
            north:34.2368,
            south:34.2364,
            east:-118.5275,
            west:-118.5289
        }
    },
    {
        place: "Manzanita Hall",
        bounds: {
            north:34.2379,
            south:34.2375,
            east:-118.5295,
            west:-118.5307
        }
    },
    { 
        place: "Live Oak Hall",
        bounds: {
            north:34.2384,
            south:34.2381,
            east:-118.5275,
            west:-118.5289
        }
    },
    {
        place: "Eucalyptus Hall",
        bounds: {
            north:34.2388,
            south:34.2385,
            east:-118.5275,
            west:-118.5289
        }
    },
    {
        place: "Sierra Hall",
        bounds: {
            north:34.2385,
            south:34.2381,
            east:-118.5300,
            west:-118.5312
        }
    }
];
//DISPLAY CURRENT QUESTION
function showQ(){
    const curQ = document.getElementById("currentQ");
    const mess = document.getElementById("message");
    //IF THIS IS OPEN CLOSE THE INFOPOP
    if (infoPop) {
        infoPop.close();
    }
    //REMOVE THE PREV RECTANGLE FROM MAP
    if (currentRect){
        currentRect.setMap(null);
        currentRect = null;
    }
    //SHOW NEXT LOCATION QUESTION
    if (currentIndex < places.length) {
        const loca = places[currentIndex];
        curQ.textContent = "Where is " + loca.place + " ?";
        mess.textContent = "";
    } else {
        curQ.textContent = "DONE";
        mess.textContent = "SCORE = " + score + "/" + places.length;
    }
}
//IF QUESTIONS ARE FINISHED STOP
function theClick(coordinates) {
    if(currentIndex >= places.length){
        return;
    }

    const loca = places[currentIndex];
    const bounds = loca.bounds;
//IS POINT INSIDE CORRECT BOUNDS?
    const inBounds =
    coordinates.lat() <= bounds.north &&
    coordinates.lat() >= bounds.south &&
    coordinates.lng() <= bounds.east &&
    coordinates.lng() >= bounds.west;
    //RIGHT OR WRONG DISPLAY
    const mess = document.getElementById("message");
    //MY SECOND MAPS COMPONENT
    if(inBounds) {
        score++;
        mess.textContent = "Correct";
    }else{
        mess.textContent = "Wrong";
    }

    if(guessPoint) {
        guessPoint.setMap(null);
    }
    //MY SECOND MAPS COMPONENT
    guessPoint = new google.maps.Marker ({
        position: coordinates,
        map: map
    });

    infoPop.setContent(inBounds ? "Correct" : "Wrong!");
    infoPop.open(map, guessPoint);

    if (currentRect) {
    currentRect.setMap(null);
  }
    //COLOR OF THE RECTANGLES
    currentRect = new google.maps.Rectangle({
    strokeColor: inBounds ? "#000000ff" : "#000000ff",
    strokeOpacity: 50, strokeWeight: 2,
    fillColor: inBounds ? "#20ff20b9" : "#ec0000de",
    fillOpacity: 0.50, map: map, bounds: bounds
  });
    currentIndex++;
    setTimeout(showQ, 1500)
}
