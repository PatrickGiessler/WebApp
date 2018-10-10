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
    if (email === null || email === undefined) {
        alert("ups, da ging was schief! bitte nochmals anmelden");
        window.location.href = "./login.html";
    } else {
        getData(email);
    }


    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", onCloseClicked);
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
    if (email === null || email === undefined) {
        alert("ups, da ging was schief! bitte nochmals anmelden");
        window.location.href = "./login.html";
    } else {
        getData(email);
    }


    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", onCloseClicked);
    let closeButtonRep = document.getElementById("closeButtonRep");
    closeButtonRep.addEventListener("click", onCloseClicked);

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
    for (let i = 0; i < keyArraySize; i++) {
        let size = keyArray.length;
        let rand = Math.floor(Math.random() * size);
        let selectedKey = keyArray[rand];
        let selectedDay = data[selectedKey].Day;
        let solved = data[selectedKey].beantwortet;
        addViewElement(kalender, selectedDay, solved);
        keyArray.splice(rand, 1);
    }
};
let addViewElement = (kalender, day, solved) => {

    let iDivDor = document.createElement("div");
    iDivDor.className = 'dors col-xs-4';
    iDivDor.addEventListener("click", onDoorKlicked);
    if (solved) {
        iDivDor.className += " makeItGreen";
    }
    //iDivDor.className = 'tuerchen';
    let iDivNumer = document.createElement("div");
    iDivNumer.className = "number";
    iDivNumer.innerHTML = "" + day;
    iDivDor.appendChild(iDivNumer);
    kalender.appendChild(iDivDor);
};
let onDoorKlicked = (event) => {
    let selectedId = "Day" + event.srcElement.innerText;
    let selectedObject = window.data[selectedId];
    window.SelectedObject = selectedObject;
    selectedDay = selectedObject.Day;
    currentDate = new Date();
    currentDay = currentDate.getDate();

    if (selectedDay <= currentDay) {
        makePopover(selectedObject);
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

    }
    else {
        let question = document.getElementById("question");
        question.innerHTML = "" + selectedObject.Frage;
        popoverQuest.style.display = "";
        popoverResp.style.display = "none";
    }

};

let onCloseClicked = () => {
    let popover = document.getElementById("popover");
    popover.style.display = "none";
};

let onCheckClicked = () => {
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
            //clear input
            input.value = "";

            database.ref(path).set({
                Antwort: SelectedObject.Antwort,
                Day: day,
                Frage: SelectedObject.Frage,
                beantwortet: true,
                Response: SelectedObject.Respnse
            });
        }


    } else {
        event.srcElement.className = "false";
    }

};
let showSolution = () => {
    let selectedObject = window.SelectedObject;
}
