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
    let email = window.sessionStorage.getItem("user");
    let color = window.sessionStorage.getItem("bgCol");
    if (email === null || email === undefined) {
        alert("ups, da ging was schief! bitte nochmals anmelden");
        window.location.href = "./login.html";
    } else {
        var htmlElement = document.querySelector("body");
        htmlElement.style.backgroundColor = color;
        getData(email);
    }


    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", onCloseClicked);
    let closeButtonRep = document.getElementById("closeButtonRep");
    closeButtonRep.addEventListener("click", onCloseClicked);
    let backbutton = document.getElementById("zurückButton");
    backbutton.addEventListener("click", onCloseClicked);

    let checkButton = document.getElementById("checkButton");
    checkButton.addEventListener("click", onCheckClicked);


});
let getData = (email) => {
    let database = window.database;
    let ref = database.ref("/users/" + email + "/Days");
    ref.on("value", function (snap) {
        generateView(snap.val());
    });
};

let generateView = (data) => {
    window.data = data;
    let kalender = document.getElementById("kalender");
    //clear for live change in Database
    kalender.innerHTML = "";
    let key;

// i++ (Inkrement), ist dasselbe wie i = i + 1
    let keyArray = [];
    //console.log(i);
    for (key in data) {
        keyArray.push(key);
    }
    let keyArraySize = keyArray.length;
    //  for (let i = 0; i < keyArraySize; i++) {
    for (let i = 0; i < keyArraySize; i++) {
        let size = keyArray.length;
        let rand = Math.floor(Math.random() * size);
        let selectedKey = keyArray[rand];
        let selectedData = data[selectedKey];

        addViewElement(kalender, selectedData);
        keyArray.splice(rand, 1);
    }
};
let addViewElement = (kalender, selectedData) => {
    let day = selectedData.Day;
    let solved = selectedData.beantwortet;



    let sectionWrapper = document.createElement("section");
    sectionWrapper.className = "cube-wrapper col-xs-4 ";
    sectionWrapper.addEventListener("click", onDoorKlicked);

    let cubeDiv = document.createElement("div");
    cubeDiv.className = "cube";

    let figurFront = document.createElement("figure");
    figurFront.className = "front";
    figurFront.innerHTML = "" + day;
    cubeDiv.appendChild(figurFront);

    let figurback = document.createElement("figure");
    figurback.className = "back";
    cubeDiv.appendChild(figurback);

    let figurright = document.createElement("figure");
    figurright.className = "right";
    cubeDiv.appendChild(figurright);

    let figurleft = document.createElement("figure");
    figurleft.className = "left";
    figurleft.innerHTML = "" + day;
    cubeDiv.appendChild(figurleft);

    let figurtop = document.createElement("figure");
    figurtop.className = "top";

    let lowerLeft = document.createElement("div");
    lowerLeft.className = "lower lower-left";
    let lowerRight = document.createElement("div");
    lowerRight.className = "lower lower-right";
    let upperLeft = document.createElement("div");
    upperLeft.className = "upper upper-left";
    let upperRight = document.createElement("div");
    upperRight.className = "upper upper-right";
    figurtop.appendChild(lowerLeft);
    figurtop.appendChild(lowerRight);
    figurtop.appendChild(upperLeft);
    figurtop.appendChild(upperRight);

    cubeDiv.appendChild(figurtop);

    let figurbottom = document.createElement("figure");
    figurbottom.className = "bottom";
    cubeDiv.appendChild(figurbottom);

    let figurshadow = document.createElement("figure");
    figurshadow.className = "shadow";
    cubeDiv.appendChild(figurshadow);

    let figureText = document.createElement("figure");
    figureText.className = "present";

    //let divCoupon = makeCoupon(selectedData);


//
//    divCoupon.appendChild(spanBackSide);
//    divCoupon.appendChild(spanFrontSide);
    //figureText.appendChild(divCoupon);

    cubeDiv.appendChild(figureText);
    sectionWrapper.appendChild(cubeDiv);
    /*<section class="cube-wrapper">
     <div class="cube">
     <figure class="front"></figure>
     <figure class="back"></figure>
     <figure class="right"></figure>
     <figure class="left"></figure>
     <figure class="top"></figure>
     <figure class="bottom"></figure>
     <figure class="shadow"></figure>
     </div>
     </section> */
    kalender.appendChild(sectionWrapper);
//
//
//
//    let iDivDor = document.createElement("div");
//    iDivDor.className = 'dors col-xs-4';
//    iDivDor.addEventListener("click", onDoorKlicked);
//    if (solved) {
//        iDivDor.className += " makeItGreen";
//    }
//    //iDivDor.className = 'tuerchen';
//    let iDivNumer = document.createElement("div");
//    iDivNumer.className = "number";
//    iDivNumer.innerHTML = "" + day;
//    iDivDor.appendChild(iDivNumer);
//    kalender.appendChild(iDivDor);
};
let makeCoupon = (selectedData) => {
    let solved = selectedData.beantwortet;
    let divCoupon = document.createElement("div");
    divCoupon.className = "coupon";
    let spanFrontSide = document.createElement("span");
    spanFrontSide.className = "coupon-front";
    if (!solved) {
        let pQuestion = document.createElement("p");
        pQuestion.innerHTML = "" + selectedData.Frage;
        let iAnswer = document.createElement("input");
        let bCheck = document.createElement("button");
        bCheck.innerHTML = "Check;)";
        bCheck.addEventListener("click", onCheckClicked);
        spanFrontSide.appendChild(pQuestion);
        spanFrontSide.appendChild(iAnswer);
        spanFrontSide.appendChild(bCheck);
        divCoupon.appendChild(spanFrontSide);
    } else {

    }

    return divCoupon;


    /*<div id="AntwortForm">
     <div class="popupCloseButton" id="closeButton">X</div>
     <p id="question"></p>
     <input type="text" id="answer" name="fname"><br>
     <button  id="checkButton"> Check ;)</button>
     </div>*/


};

let onDoorKlicked = (event) => {

    //event.srcElement.classname += " open"
    let selectedId = "Day" + event.srcElement.innerText;
    let selectedObject = window.data[selectedId];
    let selectedDay;
    document.getElementById("checkButton").classList.remove("right");
    if (selectedObject == null) {

        selectedDay = event.srcElement.parentElement.children[0].innerHTML;
    } else {
        window.SelectedObject = selectedObject;
        selectedDay = selectedObject.Day;
    }

    currentDate = new Date();
    currentDay = currentDate.getDate();

    if (selectedDay <= currentDay) {
        // makePopover(selectedObject);

        event.srcElement.parentElement.parentElement.classList.toggle("open");
        setTimeout(function () {
            makePopover(selectedObject);
        }, 3000);
        //;



    } else {
        alert("nicht so hastig");
    }
};

let makePopover = (selectedObject) => {
    let popover = document.getElementById("popover");
    let popoverQuest = document.getElementById("AntwortForm");
    let popoverResp = document.getElementById("ResponseForm");

    popover.style.display = "block";
    if (SelectedObject.beantwortet) {
        let image = document.getElementById("RespImage");
        image.src = selectedObject.Response;
        popoverQuest.style.display = "none";
        popoverResp.style.display = "";

    } else {
        let question = document.getElementById("question");
        question.innerHTML = "" + selectedObject.Frage;
        popoverQuest.style.display = "";
        popoverResp.style.display = "none";
    }

};

let onCloseClicked = (event) => {
    let popover = document.getElementById("popover");
    let element =  document.getElementsByClassName('open')[0];
    if (element !== undefined){
        document.getElementsByClassName('open')[0].classList.toggle("open");
    }
    popover.style.display = "none";
};

let onCheckClicked = (event) => {
    let input = document.getElementById("answer")
    let answer = input.value;
    let selectedObject = window.SelectedObject;
    let database = window.database;
    

    if (answer.toLowerCase() === selectedObject.Antwort.toLowerCase()) {
        event.srcElement.className = "right";
        SelectedObject.beantwortet = true;
        let day = SelectedObject.Day;
        let email = window.sessionStorage.getItem("user");


        if (email === null || email === undefined) {
            alert("ups, da ging was schief! bitte nochmals anmelden");
            window.location.href = "./login.html";
        } else {
            let path = "/users/" + email + "/Days/Day" + day;
            

            database.ref(path).set({
                Antwort: SelectedObject.Antwort,
                Day: day,
                Frage: SelectedObject.Frage,
                beantwortet: true,
                Response: SelectedObject.Response
            });
            
            setTimeout(function () {
            let popoverQuest = document.getElementById("AntwortForm");
            let popoverResp = document.getElementById("ResponseForm");
            let image = document.getElementById("RespImage");
            image.src = SelectedObject.Response;
            popoverQuest.style.display = "none";
            popoverResp.style.display = "";
            //clear input
            input.value = "";
            
            }, 1000);
            



        }


    } else {
        event.srcElement.className = "false";
    }

};
let showSolution = () => {
    let selectedObject = window.SelectedObject;
}
