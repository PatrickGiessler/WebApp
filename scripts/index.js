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

    getData();
    let closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", onCloseClicked);
    let checkButton = document.getElementById("checkButton");
    checkButton.addEventListener("click", onCheckClicked);
});
let getData = () => {
    let database = window.database;
    let ref = database.ref("/users/Lisa/Days");
    ref.on("value", function (snap) {
        alert(snap.val());
    });
};