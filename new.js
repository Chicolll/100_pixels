var currPos = Math.round(window.scrollX);
var planetMarks=[];$('.essay').each(function(){planetMarks.push($(this).offset().left-200)});
var destinations=$.makeArray(planetMarks);
destinations.sort(function(a,b){return a-b});
var buttonInView = false;
var leaveEarth = false;

console.log(currPos);
console.log(destinations.length);
console.log(planetMarks);

// var showButton = anime({
//   targets: '.button',
//   right: '20px',
//   opacity: ['0%', '100%'],
//   easing: 'easeInOutQuad'
// });

function showButton(){
  var show = anime({
    targets: '.button',
    right: '2%',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad'
  });
  show.play;
  var show2 = anime({
    targets: '.prevjump, .nextjump',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad'
  });
  show2.play;
}
function hideButton(){
  var hide = anime({
    targets: '.button',
    right: '-1%',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad'
  });
  hide.play;
  var hide2 = anime({
    targets: '.prevjump, .nextjump',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad'
  });
  hide2.play;
}
function hideFowardButton(){
  var hide = anime({
    targets: '.button',
    right: '-1%',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad'
  });
  hide.play;
  var hide2 = anime({
    targets: '.nextjump',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad'
  });
  hide2.play;
}
function button(){
  if (buttonInView == true){
    var leftView = true;
    for (i=0; i<planetMarks.length; i++){
      var currPos = Math.round(window.scrollX);
      if ((currPos+screen.width/2) >= planetMarks[i] && (currPos-screen.width/4) <= planetMarks[i]) {
        leftView = false;
      }
    }
    if (leftView == true){
      hideButton();
      buttonInView = false;
    }
  }
  else if(buttonInView == false){
    for (i=0; i<planetMarks.length; i++){
      var currPos = Math.round(window.scrollX);

      if ((currPos+screen.width/2) >= planetMarks[i] && (currPos-screen.width/4) <= planetMarks[i]) {
       showButton();
       buttonInView = true;
      }
    }
  }

}


$(document).ready(function(){$('html, body').mousewheel(function(e,delta){button();
e.preventDefault();}     );});


var initLines = [
  "Only about 3 pixels.", " Too small? Let's zoom in.",
  "At Low Earth Orbit (LEO), it's so close it still experiences air resistance.", "Most astronauts never ventured beyond this orbit."
]

var currLine = 0;
var zoom = false
var textShowing = false;
var travelTextShowing = false;
function showText(){
  var show = anime({
    targets: '.upText',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad',
  });
  show.play;
  textShowing = true;

}
function showTravelText(){
  var show = anime({
    targets: '.travelText',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad',
  });
  show.play;
  travelTextShowing = true;

}
function showTravelTextSingle(){
  var show = anime({
    targets: '#downTravelTextSingle',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad',
  });
  show.play;
  travelTextShowing = true;

}
function showTravelImageSingle(){
  var show = anime({
    targets: '#upTravelTextSingle',
    opacity: ['0%', '100%'],
    easing: 'easeInOutQuad',
  });
  show.play;
  travelTextShowing = true;

}
function hideText(){
  var hide = anime({
    targets: '.upText',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad',
    duration:500
  });
  hide.play;
  textShowing = false;
}
function hideTravelText(){
  var hide = anime({
    targets: '.travelText',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad',
    duration:500
  });
  hide.play;
  travelTextShowing = false;
}
function hideTravelTextSingle(){
  var hide = anime({
    targets: '#downTravelTextSingle',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad',
    duration:500
  });
  hide.play;
  travelTextShowing = false;
}
function hideTravelImageSingle(){
  var hide = anime({
    targets: '#upTravelTextSingle',
    opacity: ['100%', '0%'],
    easing: 'easeInOutQuad',
    duration:500
  });
  hide.play;
  travelTextShowing = false;
}

function changeTextInit(){

  var xPos = window.pageXOffset;
    // console.log(xPos);
  var vw = document.documentElement.clientWidth;

  if (xPos >= 1.5*vw && xPos <= 2.5*vw){

    if (zoom == true){
      zoomOut();
      zoom = false;
    }
    document.getElementById("aaatext").innerHTML = initLines[0];
    document.getElementById("bbbtext").innerHTML = initLines[1];
    document.getElementById("launch").innerHTML = "Let's zoom in";
    if (textShowing == false){
      showText();
    }
  }
  else if (xPos > 3*vw && xPos < 4*vw){


    if (zoom == false){
      zoomIn();
      zoom = true;
    }
    document.getElementById("aaatext").innerHTML = initLines[2];
    document.getElementById("bbbtext").innerHTML = initLines[3];
    document.getElementById("launch").innerHTML = "How far is the moon?";

    if (textShowing == false){
      showText();
    }
  }
  else if (xPos > 4*vw && xPos < 6*vw){
    zoomOut();
    zoom = false;
    if (textShowing == true){
      hideText();
    }
    document.getElementById("aaatext").innerHTML = "";
    document.getElementById("bbbtext").innerHTML = "";
    document.getElementById("launch").innerHTML = "Next stop";
    if (leaveEarth != true){
      window.scrollLeft = xPos;
    }
  }
  else{
    if (textShowing == true){
      hideText();
    }
    document.getElementById("aaatext").innerHTML = "";
    document.getElementById("bbbtext").innerHTML = "";
  }
}



function zoomIn(){
  var zoomin = anime({
    targets: '#v0',
    height: '450px',
    easing: 'easeInOutQuad',
    complete: function(anim){ if (anim.completed == true){
      leaveEarth = false;
    }}
  });
  var vid = document.getElementById('v0');
  vid.currentTime = 0.01;
  zoomin.play;
  console.log("zoom");
}
function zoomOut(){
  var zoomout = anime({
    targets: '#v0',
    height: '108px',
    easing: 'easeInOutQuad',
    complete: function(anim){ if (anim.completed == true){
      leaveEarth = true;
    }}
  });
  var vid = document.getElementById('v0');
  vid.currentTime = 0.01;
  zoomout.play;
}

function zoomInImage(){
  var zoomin = anime({
    targets: '#singleLineImage',
    height: '70vh',
    easing: 'easeInOutQuad',
    duration: 77000,
    // complete: function(anim){ if (anim.completed == true){
    //   leaveEarth = false;
    // }}
  });
  zoomin.play;
  console.log("zoom");
}
function zoomOutImage(){
  var zoomin = anime({
    targets: '#singleLineImage',
    height: '40vh',
    easing: 'easeInOutQuad',
    duration: 500,
    // complete: function(anim){ if (anim.completed == true){
    //   leaveEarth = false;
    // }}
  });
  zoomin.play;
  console.log("zoom");
}
function hideTitle(){

}

var nextTextRunning = false;
window.addEventListener("scroll", function () {
  changeTextInit();
  // if (!nextTextRunning){
  //   nextTravelText();
  // }
  console.log("Travelling now: "+travelling);




}, );

var travelLength = 0;
var travelling = false;
var firstPlanetNum = 4;
var lastPlanetNum = 8;
var currTravelLine = 0;
var currDestinationLine = 0;
var currPlanet = 0;
var showingSinlgeImage = false;
var travelLines = [
  ["Heading towards Mars.",
  "It might not seem very fast, but we're actually travelling at impossible speeds! Literally. 25 times the speed of light.",
  7,
  "Our understanding of physics prohibits anything with mass moving faster than the speed of light. But this is the internet so we'll allow it.",
  "In reality, the journey to mars would take about 6 to 8 months.",
  9,
  "What can you do to kill 8 months of time traveling in space you ask? Well Skillshare... Just kidding, you've heard enough about them.",
  "",
  5],

  ["Evidence show Mars was once a watery planet with oceans and rivers.",
  "Some believe it could have harbored life... Guess we'll have to wait until Elon Musk gets us there to find out.",
  8,
  "We've picked up some speed flying pass mars, we're now traveling at over 40 times the speed of light.",
  "Interestingly, space is not really empty.",
  6,
  "There are about 5 atoms in every cubic cm of space, roughly the volume of a dice.",
  "",
  5
  ],

  ["We're now in what's called the outer solar system.",
   "Distances here are vast, so there's really not much out here.",
   7,
   "Coming up is the most beautiful ring in the solar system. ",
   "Don't worry, it's only made out of ice so your diamond ring is still special.",
   8
 ],

 ["On its decent to Titan, the Huygens lander wowed scientists when it transmitted back pictures of rivers and lakes on its surface.",
 "Not of water, but liquid methane below -179 degrees.",
 10,
 "Fun fact, Saturn's density is so low it would actually float on water, if you can find a big enough lake.",
 "",
 8
],

[
  "It took one of the fastest thing humans ever made, the Voyager 2 probe, 12 years to get to this point. ",
  "And it was traveling 20 times faster than a bullet. (19km/s)",
  8,
  "Picking up speed again, we now travel at 60 times the speed of light. ",
  "At this speed, you can go around the earth 450 times a second.",
  8
],

[
  "We now fast travel for one last time, to visit our closest neighbor, the Alpha Centauri system. We'll have to travel about 6000 times the distance we covered so far, so sit tight.",
  9,
  "Later in his book, astronomer Carl Sagan reflects on the significance of this photo.",
  7,
  "'Look again at that dot. That's here. That's home. That's us. On it, everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.'",
  14,
  "Looking back on history, how arrogant it was to believe we're the center of the universe.",
  8,
  "Astronomy has, time after time, reminded us of our humble place in the grand scale of the universe.",
  6,




"This is the Hubble Ultra Deep Field, a dark patch of sky covering roughly the area of a pin held at arm's length.",
10,
  "In this photo, 10,000 galaxies can be seen. Any one of them, contains as much as 100 billion stars.",
  9,
  "We now believe there are also 100 billion galaxies out there. That's 10 sextillion stars! This is what it looks like written out: 10,000,000,000,000,000,000,000.",
  12,
  "Too big to understand? Try this.",
  5,
  "For every grain of sand on earth, there is a star out there, as big as our sun.",
  8,
  "Scientists now believe half of those stars have habitable planets around them.",
  6,
  "With that in mind, how incredibly arrogant it would be to think that Earth is the only planet where life exists.",
  8,
  "Pick a galaxy in this photo. Imagine there could be the most amazing things we have never even dreamed of.",
  6,
  "There could be civilizations of all proportions and there could be the most beautiful sights you have ever seen.",
  8,
  "Now, that shows some perspective",
  5,
],
[""],

[
  "Space is huge, to say the least, but it doesn't mean our actions are meaningless.",
  6,
  "It means that we are to cherish our only home, and to also understand our humble position in the vastness of the universe. ",
  8,
  'If I may quote Carl Sagan once again',
  4,
  "'It underscores our responsibility to deal more kindly with one another, and to preserve and cherish the pale blue dot, the only home we've ever known.''"
]


]

var evenLines = false;

function timerCallBack(){
  console.log("call back called");
  hideTravelText();
  nextTextRunning = false;
  if (currTravelLine<travelLines[currPlanet-firstPlanetNum].length){
    console.log("nextTravelLine called");
    nextTravelText();
  }

}
function timerCallBackSingle(){
  console.log("call back called");
  hideTravelTextSingle();
  nextTextRunning = false;
  updateCurrPlanet();
  if (currTravelLine<travelLines[currPlanet-firstPlanetNum].length){

    nextTravelText();
  }
  else if(currTravelLine==travelLines[currPlanet-firstPlanetNum].length) {
      hideTravelImageSingle();
      showingSinlgeImage = false;
  }

}
function updateCurrPlanet(){
  for (i=0; i<planetMarks.length; i++){
    var currPos = Math.round(window.scrollX);
    if ((currPos+screen.width/2) >= planetMarks[i] && (currPos-screen.width/4) <= planetMarks[i]) {
      currPlanet = i;
      console.log("Planet: "+i);
      //break;
    }
  }
}

async function nextTravelText(){

    if (currPlanet >= firstPlanetNum && currPlanet <= lastPlanetNum){
      var waitTime = (travelLines[currPlanet-firstPlanetNum][currTravelLine+2])*1000;
      nextTextRunning = true;
      //console.log("travelLine: "+currTravelLine);
      document.getElementById("upTravelText").innerHTML = travelLines[currPlanet-firstPlanetNum][currTravelLine];
      //console.log("displaying: "+travelLines[currPlanet-firstPlanetNum][currTravelLine]);
      currTravelLine += 1;
      document.getElementById("downTravelText").innerHTML = travelLines[currPlanet-firstPlanetNum][currTravelLine];
      // console.log("displaying: "+travelLines[currPlanet-firstPlanetNum][currTravelLine]);
      showTravelText();
      currTravelLine += 2;
      // console.log("waitTime: "+waitTime);
      await new Promise(r => setTimeout(timerCallBack, waitTime));
    }
    else if (currPlanet > lastPlanetNum) {
      console.log("currplanet: "+currPlanet);
      var waitTime = (travelLines[currPlanet-firstPlanetNum][currTravelLine+1])*1000;
      if (!showingSinlgeImage && currTravelLine >= 1){
        showTravelImageSingle();
        showingSinlgeImage = true;
      }

      if (currTravelLine == 10 ){
        document.getElementById('singleLineImage').src = "assets/hubble.jpg";
        zoomInImage();
      }
      else if (currPlanet >= 10){
        console.log("hereee: "+currTravelLine);
        if (currTravelLine == 0){
          document.getElementById('singleLineImage').src = "assets/war.jpg";
        }
        else if(currTravelLine == 2 ){
          document.getElementById('singleLineImage').src = "assets/earthrise.jpg";
        }
        else if(currTravelLine == 6 ){
          document.getElementById('singleLineImage').src = "assets/bluemarble.jpg";
          hideFowardButton();
        }
      }

        document.getElementById("downTravelTextSingle").innerHTML = travelLines[currPlanet-firstPlanetNum][currTravelLine];
        showTravelTextSingle();

        currTravelLine += 2;
        await new Promise(r => setTimeout(timerCallBackSingle, waitTime));

    }




}
function rollBackLines(){

}
async function nextPlanet(){
  zoomOutImage();
  travelling = true;
  updateCurrPlanet();
  currPlanet += 1;
  currTravelLine = 0;
  if(currPlanet!=10){
    await new Promise(r => setTimeout(nextTravelText, 4000));
  }

}



function navToPlanet(id){
  var destinationPos = destinations[id];
  $('html, body').stop().animate({scrollLeft:destinationPos},1500,'easeInOutQuad').promise().done(function () {showButton(); travelling = false;});event.preventDefault();

}
// function getTravelLength(){
//   for (i=0; i<planetMarks.length; i++){
//     var currPos = Math.round(window.scrollX);
//     if ((currPos+screen.width/2) >= planetMarks[i] && (currPos-screen.width/4) <= planetMarks[i]) {
//       currPlanet = i;
//       //break;
//     }
//   }
//   var length1 = 0;
//   var lenhth2 = 0;
//   for(i=0; i<travelLines[currPlanet].length; i++){
//     length1 += travelLines[currPlanet][i+1];
//     i+=3;
//   }
//   for(i=0; i<travelLines[currPlanet].length; i++){
//     length2 += travelLines[currPlanet][i+3];
//     i+=3;
//   }
//   if (length1 >= length2){
//     return length1;
//   }
//   else{
//     return length2;
//   }
// }
