

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


    /*if (email === null || email === undefined) {
        alert("ups, da ging was schief! bitte nochmals anmelden");
        window.location.href = "./login.html";
    } else {
        var htmlElement = document.querySelector("body");
        htmlElement.style.backgroundColor = color;

        getData(email);
    }*/


    let switchcalendarButton = document.getElementById("switchcalendarButton");
    switchcalendarButton.addEventListener("click", onSwitchCalendarClicked);

});

    let onSwitchCalendarClicked = (event) => {
        window.location.href = "./index.html";
    };
