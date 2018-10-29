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
        alert("Ups, da ging leider etwas schief! Bitte melde dich nochmal an!");
        window.location.href = "./login.html";
    } else {
        let htmlElement = document.querySelector("body");
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

    let inputField = document.getElementById("answer");
    inputField.addEventListener("keyup", onInputKeyUp);

    let solutionButton = document.getElementById("solutionButton");
    solutionButton.addEventListener("click", onSwitchSolutionClicked);
    let switchsolutionButton = document.getElementById("switchsolutionButton");
    switchsolutionButton.addEventListener("click", onSwitchSolutionClicked);




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
let makeCol = (col, div) => {
    let aCol = col.slice(4).split(",");
    let r = aCol[0] * div;
    let g = aCol[1] * div;
    let b = (aCol[2].slice(0, aCol[2].length - 1)) * div;

    let retCol = "rgb(" + r + "," + g + "," + b + ")";
    return retCol;

};
let addViewElement = (kalender, selectedData) => {
    let day = selectedData.Day;
    let solved = selectedData.beantwortet;
    let col = window.sessionStorage.getItem("cubRGB");
    let colSolv = window.sessionStorage.getItem("cubRGBSolv");
    let cubCol = "";
    let cubColDark = "";
    let cubColDarker = "";

    if (solved) {
        cubCol = makeCol(colSolv, 1);
        cubColDark = makeCol(colSolv, (2 / 3));
        cubColDarker = makeCol(colSolv, (1 / 2));
    } else {
        cubCol = makeCol(col, 1);
        cubColDark = makeCol(col, (2 / 3));
        cubColDarker = makeCol(col, (1 / 2));
    }


    let sectionWrapper = document.createElement("section");

    sectionWrapper.className = "col-xs-4 ";
    sectionWrapper.addEventListener("click", onDoorKlicked);

       let cubeDiv1 = document.createElement("div");
    cubeDiv1.className = "cube-wrapper";
    sectionWrapper.appendChild(cubeDiv1);


    let cubeDiv = document.createElement("div");
    cubeDiv.className = "cube";

    let figurFront = document.createElement("figure");
    figurFront.className = "front";
    figurFront.innerHTML = "" + day;
    figurFront.style.backgroundColor = cubColDark;
    cubeDiv.appendChild(figurFront);

    let figurback = document.createElement("figure");
    figurback.className = "back";
    figurback.style.backgroundColor = cubColDark;
    cubeDiv.appendChild(figurback);


    let figurright = document.createElement("figure");
    figurright.className = "right";
    figurright.style.backgroundColor = cubColDarker;
    cubeDiv.appendChild(figurright);

    let figurleft = document.createElement("figure");
    figurleft.className = "left";
    figurleft.innerHTML = "" + day;
    figurleft.style.backgroundColor = cubCol;
    cubeDiv.appendChild(figurleft);

    let figurtop = document.createElement("figure");
    figurtop.className = "top";

    let lowerLeft = document.createElement("div");
    lowerLeft.className = "lower lower-left";
    lowerLeft.style.backgroundColor = cubColDark;

    let lowerRight = document.createElement("div");
    lowerRight.className = "lower lower-right";
    lowerRight.style.backgroundColor = cubCol;

    let upperLeft = document.createElement("div");
    upperLeft.className = "upper upper-left";
    upperLeft.style.backgroundColor = cubCol;

    let upperRight = document.createElement("div");
    upperRight.className = "upper upper-right";
    upperRight.style.backgroundColor = cubColDark;
    figurtop.appendChild(lowerLeft);
    figurtop.appendChild(lowerRight);
    figurtop.appendChild(upperLeft);
    figurtop.appendChild(upperRight);

    cubeDiv.appendChild(figurtop);

    let figurbottom = document.createElement("figure");
    figurbottom.className = "bottom";
    figurbottom.style.backgroundColor = cubColDarker;
    cubeDiv.appendChild(figurbottom);


    let figurshadow = document.createElement("figure");
    figurshadow.className = "shadow";
    cubeDiv.appendChild(figurshadow);

    let figureText = document.createElement("figure");
    figureText.className = "present";

    cubeDiv.appendChild(figureText);
    cubeDiv1.appendChild(cubeDiv);
    sectionWrapper.appendChild(cubeDiv1);

    kalender.appendChild(sectionWrapper);
};
let onDoorKlicked = (event) => {

    //event.srcElement.classname += " open"
    let selectedId = "Day" + event.srcElement.innerText;
    let selectedObject = window.data[selectedId];
    let selectedDay;
    document.getElementById("checkButton").classList.remove("right");
    if (selectedObject === null) {

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
        alert("Leider musst du dich für dieses Rätsel noch gedulden!");
    }
};
let makePopover = (selectedObject) => {
    let popover = document.getElementById("popover");
    let popoverQuest = document.getElementById("AntwortForm");
    let popoverResp = document.getElementById("ResponseForm");

    popover.style.display = "block";
    if (SelectedObject.beantwortet) {
        let image = document.getElementById("RespImage");
        image.src = selectedObject.ResponsePic;
        popoverQuest.style.display = "none";
        popoverResp.style.display = "";

    } else {
        let question = document.getElementById("question");
        question.innerHTML = "" + selectedObject.Frage;
        popoverQuest.style.display = "";
        popoverResp.style.display = "none";
    }

};


let onInputKeyUp = (event) => {
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("checkButton").click();
    }
};


let onCloseClicked = (event) => {
    let popover = document.getElementById("popover");
    let element = document.getElementsByClassName('open')[0];
    if (element !== undefined) {
        document.getElementsByClassName('open')[0].classList.toggle("open");
    }
    popover.style.display = "none";
};

let onSwitchSolutionClicked = (event) => {
    window.location.href = "./solution.html";
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
            alert("Ups, da ging leider etwas schief! Bitte melden Sie sich nochmals an!");
            window.location.href = "./login.html";
        } else {
            let path = "/users/" + email + "/Days/Day" + day;


            database.ref(path).set({
                Antwort: SelectedObject.Antwort,
                Day: day,
                Frage: SelectedObject.Frage,
                beantwortet: true,
                ResponsePic: SelectedObject.ResponsePic,
                SolID: SelectedObject.SolID,
                ResponseTxt:SelectedObject.ResponseTxt
            });

            setTimeout(function () {
                let popoverQuest = document.getElementById("AntwortForm");
                let popoverResp = document.getElementById("ResponseForm");
                let image = document.getElementById("RespImage");
                image.src = SelectedObject.ResponsePic;
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
