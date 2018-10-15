
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCof8vlK6qFoGmZOAZDX8MjIV-0_sHl73g",
    databaseURL: "https://projektfordh.firebaseio.com/",
    projectId: "projektfordh",
    storageBucket: "projektfordh.appspot.com"
};
window.app = firebase.initializeApp(config);
window.database = firebase.database();





window.addEventListener("load", () => {
    // Anwendung starten

    window.email = document.querySelector('#email');
    window.password = document.querySelector('#password');
    window.mySVG = document.querySelector('.svgContainer');
    window.armL = document.querySelector('.armL');

    window.armR = document.querySelector('.armR');
    window.eyeL = document.querySelector('.eyeL');
    window.eyeR = document.querySelector('.eyeR');
    window.nose = document.querySelector('.nose');
   window.mouth = document.querySelector('.mouth');
    window.mouthBG = document.querySelector('.mouthBG');
    window.mouthSmallBG = document.querySelector('.mouthSmallBG'),
    window.mouthMediumBG = document.querySelector('.mouthMediumBG');
    window.mouthLargeBG = document.querySelector('.mouthLargeBG');
   window.mouthMaskPath = document.querySelector('#mouthMaskPath');
   window.mouthOutline = document.querySelector('.mouthOutline');
    window.tooth = document.querySelector('.tooth');
    window.tongue = document.querySelector('.tongue');
    window.chin = document.querySelector('.chin');
    window.face = document.querySelector('.face');
    window.eyebrow = document.querySelector('.eyebrow');
    window.outerEarL = document.querySelector('.earL .outerEar');
    window.outerEarR = document.querySelector('.earR .outerEar');
    window.earHairL = document.querySelector('.earL .earHair');
    window.earHairR = document.querySelector('.earR .earHair');
    window.hair = document.querySelector('.hair');
    
    let loginButtom = document.getElementById("login");
    loginButtom.addEventListener("click", onLogInClicked);


    window.caretPos;
    window.emailIndex;
    window.screenCenter;
    window.svgCoords;
    window.eyeMaxHorizD = 20;
    window.eyeMaxVertD = 10;
    window.noseMaxHorizD = 23;
    window.noseMaxVertD = 10;
    window.dFromC;
    window.eyeDistH;
    window.eyeLDistV;
    window.eyeRDistV;
    window.eyeDistR;
    window.mouthStatus = "small";

    window.email.addEventListener('focus', onemailFocus);
    window.email.addEventListener('blur', onemailBlur);
    window.email.addEventListener('input', onemailInput);
    window.password.addEventListener('focus', onpasswordFocus);
    window.password.addEventListener('blur', onpasswordBlur);
     window.password.addEventListener('keyup', onInputKeyUp);
    TweenMax.set(window.armL, {x: -93, y: 220, rotation: 105, transformOrigin: "top left"});
    TweenMax.set(window.armR, {x: -93, y: 220, rotation: -105, transformOrigin: "top right"});
    
    
});



function getCoord(e) {
    var carPos = window.email.selectionEnd,
            div = document.createElement('div'),
            span = document.createElement('span'),
            copyStyle = getComputedStyle(window.email),
            emailCoords = {},
            caretCoords = {}, 
            centerCoords = {}
    ;
    [].forEach.call(copyStyle, function (prop) {
        div.style[prop] = copyStyle[prop];
    });
    div.style.position = 'absolute';
    document.body.appendChild(div);
    div.textContent = window.email.value.substr(0, carPos);
    span.textContent = window.email.value.substr(carPos) || '.';
    div.appendChild(span);

    window.emailCoords = getPosition(window.email);							//console.log("window.emailCoords.x: " + window.emailCoords.x + ", window.emailCoords.y: " + window.emailCoords.y);
    caretCoords = getPosition(span);							//console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
    centerCoords = getPosition(window.mySVG);							//console.log("centerCoords.x: " + centerCoords.x);
    window.svgCoords = getPosition(window.mySVG);
    window.screenCenter = centerCoords.x + (window.mySVG.offsetWidth / 2);		//console.log("window.screenCenter: " + window.screenCenter);
    window.caretPos = caretCoords.x + window.emailCoords.x;					//console.log("window.caretPos: " + window.caretPos);

    window.dFromC = window.screenCenter - window.caretPos; 							//console.log("window.dFromC: " + window.dFromC);
    var pFromC = Math.round((window.caretPos / window.screenCenter) * 100) / 100;
    if (pFromC < 1) {

    } else if (pFromC > 1) {
        pFromC -= 2;
        pFromC = Math.abs(pFromC);
    }

    window.eyeDistH = -window.dFromC * .05;
    if (window.eyeDistH > window.eyeMaxHorizD) {
        window.eyeDistH = window.eyeMaxHorizD;
    } else if (window.eyeDistH < -window.eyeMaxHorizD) {
        window.eyeDistH = -window.eyeMaxHorizD;
    }

    window.eyeLCoords = {x: window.svgCoords.x + 84, y: window.svgCoords.y + 76};
    window.eyeRCoords = {x: window.svgCoords.x + 113, y: window.svgCoords.y + 76};
    window.noseCoords = {x: window.svgCoords.x + 97, y: window.svgCoords.y + 81};
    window.mouthCoords = {x: window.svgCoords.x + 100, y: window.svgCoords.y + 100};
    window.eyeLAngle = getAngle(window.eyeLCoords.x, window.eyeLCoords.y, window.emailCoords.x + caretCoords.x, window.emailCoords.y + 25);
    window.eyeLX = Math.cos(window.eyeLAngle) * window.eyeMaxHorizD;
    window.eyeLY = Math.sin(window.eyeLAngle) * window.eyeMaxVertD;
    window.eyeRAngle = getAngle(window.eyeRCoords.x, window.eyeRCoords.y, window.emailCoords.x + caretCoords.x, window.emailCoords.y + 25);
    window.eyeRX = Math.cos(window.eyeRAngle) * window.eyeMaxHorizD;
    window.eyeRY = Math.sin(window.eyeRAngle) * window.eyeMaxVertD;
    window.noseAngle = getAngle(window.noseCoords.x, window.noseCoords.y, window.emailCoords.x + caretCoords.x, window.emailCoords.y + 25);
    window.noseX = Math.cos(window.noseAngle) * window.noseMaxHorizD;
    window.noseY = Math.sin(window.noseAngle) * window.noseMaxVertD;
    window.mouthAngle = getAngle(window.mouthCoords.x, window.mouthCoords.y, window.emailCoords.x + caretCoords.x, window.emailCoords.y + 25);
    window.mouthX = Math.cos(window.mouthAngle) * window.noseMaxHorizD;
    window.mouthY = Math.sin(window.mouthAngle) * window.noseMaxVertD;
    window.mouthR = Math.cos(window.mouthAngle) * 6;
    window.chinX = window.mouthX * .8;
    window.chinY = window.mouthY * .5;
    window.chinS = 1 - ((window.dFromC * .15) / 100);
    if (window.chinS > 1) {
        window.chinS = 1 - (window.chinS - 1);
    }
    window.faceX = window.mouthX * .3;
    window.faceY = window.mouthY * .4;
    window.faceSkew = Math.cos(window.mouthAngle) * 5;
    window.eyebrowSkew = Math.cos(window.mouthAngle) * 25;
    var outerEarX = Math.cos(window.mouthAngle) * 4;
    var outerEarY = Math.cos(window.mouthAngle) * 5;
    window.hairX = Math.cos(window.mouthAngle) * 6;
    window.hairS = 1.2;

    TweenMax.to(window.eyeL, 1, {x: -window.eyeLX, y: -window.eyeLY, ease: Expo.easeOut});
    TweenMax.to(window.eyeR, 1, {x: -window.eyeRX, y: -window.eyeRY, ease: Expo.easeOut});
    TweenMax.to(window.nose, 1, {x: -window.noseX, y: -window.noseY, rotation: window.mouthR, transformOrigin: "center center", ease: Expo.easeOut});
    TweenMax.to(window.mouth, 1, {x: -window.mouthX, y: -window.mouthY, rotation: window.mouthR, transformOrigin: "center center", ease: Expo.easeOut});
    TweenMax.to(window.chin, 1, {x: -window.chinX, y: -window.chinY, scaleY: window.chinS, ease: Expo.easeOut});
    TweenMax.to(window.face, 1, {x: -window.faceX, y: -window.faceY, skewX: -window.faceSkew, transformOrigin: "center top", ease: Expo.easeOut});
    TweenMax.to(window.eyebrow, 1, {x: -window.faceX, y: -window.faceY, skewX: -window.eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut});
    TweenMax.to(window.outerEarL, 1, {x: outerEarX, y: -outerEarY, ease: Expo.easeOut});
    TweenMax.to(window.outerEarR, 1, {x: outerEarX, y: outerEarY, ease: Expo.easeOut});
    TweenMax.to(window.earHairL, 1, {x: -outerEarX, y: -outerEarY, ease: Expo.easeOut});
    TweenMax.to(window.earHairR, 1, {x: -outerEarX, y: outerEarY, ease: Expo.easeOut});
    TweenMax.to(window.hair, 1, {x: window.hairX, scaleY: window.hairS, transformOrigin: "center bottom", ease: Expo.easeOut});

    document.body.removeChild(div);
}
;

function onemailInput(e) {
    getCoord(e);
    var value = e.target.value;
    curEmailIndex= value.length;

    // very crude window.email validation for now to trigger effects
    if (curEmailIndex   > 0) {
        if (window.mouthStatus == "small") {
            window.mouthStatus = "medium";
            TweenMax.to([window.mouthBG, window.mouthOutline, window.mouthMaskPath], 1, {morphSVG: window.mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut});
            TweenMax.to(window.tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
            TweenMax.to(window.tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
            TweenMax.to([window.eyeL, window.eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
        }
        if (value.includes("@")) {
            window.mouthStatus = "large";
            TweenMax.to([window.mouthBG, window.mouthOutline, window.mouthMaskPath], 1, {morphSVG: window.mouthLargeBG, ease: Expo.easeOut});
            TweenMax.to(window.tooth, 1, {x: 3, y: -2, ease: Expo.easeOut});
            TweenMax.to(window.tongue, 1, {y: 2, ease: Expo.easeOut});
            TweenMax.to([window.eyeL, window.eyeR], 1, {scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center"});
        } else {
            window.mouthStatus = "medium";
            TweenMax.to([window.mouthBG, window.mouthOutline, window.mouthMaskPath], 1, {morphSVG: window.mouthMediumBG, ease: Expo.easeOut});
            TweenMax.to(window.tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
            TweenMax.to(window.tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
            TweenMax.to([window.eyeL, window.eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
        }
    } else {
        window.mouthStatus = "small";
        TweenMax.to([window.mouthBG, window.mouthOutline, window.mouthMaskPath], 1, {morphSVG: window.mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut});
        TweenMax.to(window.tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
        TweenMax.to(window.tongue, 1, {y: 0, ease: Expo.easeOut});
        TweenMax.to([window.eyeL, window.eyeR], 1, {scaleX: 1, scaleY: 1, ease: Expo.easeOut});
    }
}

function onemailFocus(e) {
    e.target.parentElement.classList.add("focusWithText");
    getCoord();
}

function onemailBlur(e) {
    if (e.target.value == "") {
        e.target.parentElement.classList.remove("focusWithText");
    }
    resetface();
}

function onpasswordFocus(e) {
    coverEyes();
}

function onpasswordBlur(e) {
    uncoverEyes();
}

function coverEyes() {
    TweenMax.to(window.armL, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut});
    TweenMax.to(window.armR, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1});
}

function uncoverEyes() {
    TweenMax.to(window.armL, 1.35, {y: 220, ease: Quad.easeOut});
    TweenMax.to(window.armL, 1.35, {rotation: 105, ease: Quad.easeOut, delay: .1});
    TweenMax.to(window.armR, 1.35, {y: 220, ease: Quad.easeOut});
    TweenMax.to(window.armR, 1.35, {rotation: -105, ease: Quad.easeOut, delay: .1});
}

function resetface() {
    TweenMax.to([window.eyeL, window.eyeR], 1, {x: 0, y: 0, ease: Expo.easeOut});
    TweenMax.to(window.nose, 1, {x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut});
    TweenMax.to(window.mouth, 1, {x: 0, y: 0, rotation: 0, ease: Expo.easeOut});
    TweenMax.to(window.chin, 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
    TweenMax.to([window.face, window.eyebrow], 1, {x: 0, y: 0, skewX: 0, ease: Expo.easeOut});
    TweenMax.to([window.outerEarL, window.outerEarR, window.earHairL, window.earHairR, window.hair], 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
}

function getAngle(x1, y1, x2, y2) {
    var angle = Math.atan2(y1 - y2, x1 - x2);
    return angle;
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

let onLogInClicked =(event)=>{
    let email = window.email.value;
    let inputPW =   window.password.value;
    let pw = "";
    
    
    email = email.substr(0, email.indexOf('@')); 
    
    let database = window.database;
    let ref = database.ref("/users/"+email);
     ref.on("value", function (snap) {
        pw = snap.val().pw;
        col = snap.val().backgroundCol;
        cubRGB = snap.val().cubCol;
        cubRGBSolv=  snap.val().cubColSolved;
        if (pw === inputPW){
            window.sessionStorage.setItem("user",email);
            window.sessionStorage.setItem("bgCol",col);
            window.sessionStorage.setItem("cubRGB",cubRGB);
            window.sessionStorage.setItem("cubRGBSolv",cubRGBSolv);
            window.location.href = "./index.html";
        }
        else{
            alert("E-Mail oder Passwort falsch");
        }
    });
    
};
let onInputKeyUp = (event)=>{
    event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("login").click();
  }
};

