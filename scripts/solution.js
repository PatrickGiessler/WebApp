

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

    window.rowCount = window.sessionStorage.getItem("rowCount");
    window.colCount = window.sessionStorage.getItem("colCount");

    window.email = window.sessionStorage.getItem("user");
    window.color = window.sessionStorage.getItem("bgCol");


    if (window.email === null || window.email === undefined) {
        alert("Ups, da ging leider etwas schief! Bitte melde dich nochmal an!");
        window.location.href = "./login.html";
    } else {
        let htmlElement = document.querySelector("body");
        htmlElement.style.backgroundColor = window.color;
        makeBgImage();

    }
    let switchcalendarButton = document.getElementById("switchcalendarButton");
    switchcalendarButton.addEventListener("click", onSwitchCalendarClicked);


});
let createView = (countCol, countRow) => {
    let table = document.getElementById("table");
    let width = window.innerWidth;
    let widthPerCol = width / window.colCount;
    let widthPerColRound = Math.round(widthPerCol);
    let colDif = width - (widthPerColRound * window.colCount);

    let height = Math.round(width / window.ratio);
    let heightPerCol = height / window.rowCount;
    let heightPerColRound = Math.round(heightPerCol);
    let rowDif = height - (heightPerColRound * window.rowCount);




    for (let i = 0; i < countRow; i++) {

        let tr = document.createElement("tr");
        let height = 0;

        if (i === countRow - 1) {
            height = (heightPerColRound + rowDif) + "px";

        } else {
            height = heightPerColRound + "px";
        }
        tr.style.height = height;
        for (let j = 0; j < countCol; j++) {
            let td = document.createElement("td");
            let tdID = (i + 1) + "_" + (j + 1);
            td.bgColor = window.color;
            td.id = tdID;
            if (i === countCol - 1) {
                td.style.width = (widthPerColRound + colDif) + "px";
                td.style.height = height;
            } else {
                td.style.width = widthPerColRound + "px";
                td.style.height = height;
            }

            td.classList.add("flip-container");
            let divFlipper = document.createElement("div");
            divFlipper.classList.add("flipper");
            let divFront = document.createElement("div");
            divFront.classList.add("front");
            divFront.style.backgroundColor = window.color;

            let divBack = document.createElement("div");
            divBack.classList.add("back");
            divBack.classList.add("noBackground");

            divFlipper.appendChild(divFront);
            divFlipper.appendChild(divBack);


            td.appendChild(divFlipper);

            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    makeSolutionVisible();

};

let makeSolutionVisible = () => {
    let database = window.database;
    let ref = database.ref("/users/" + window.email + "/Days");
    ref.on("value", function (snap) {
        let i = 0;
        let sollutionArray = [];
        for (let key in snap.val()) {
            if (snap.val()[key].beantwortet === true) {
                let td = document.getElementById(snap.val()[key].SolID);
                //td.classList.add("noBackground");
                if (td !== undefined && td !== null) {
                    setTimeout(function () {
                        if (td.firstElementChild.classList.contains("flipped")) {

                        } else {
                            td.firstElementChild.classList.add("flipped");
                        }

                    }, 1000);
                }
                i++;
            }
        }
        //just for debug
        //i = 24;
        if (i === 24) {
            let allTd = document.getElementsByTagName("td");
            for (let j = 0; j < allTd.length; j++) {
                if (allTd[j].firstElementChild.classList.contains("flipped")) {

                } else {
                    setTimeout(function () {
                        allTd[j].firstElementChild.classList.add("flipped");
                    }, 1000);
                }

            }
        }


    });

};

let callBackOnload = (event) => {
    //alert("test");
    window.ratio = event.srcElement.naturalWidth / event.srcElement.naturalHeight;
    var table = document.getElementById("table");
    let fakeelement = {
        srcElement: window
    };
    createView(window.colCount, window.rowCount);
    onImgResize(fakeelement);
    window.addEventListener('resize', onImgResize);

    //new ResizeObserver(onImgResize).observe(table);
};
let onImgResize = (event) => {

    let width = window.getComputedStyle(document.getElementById("table")).width;
    width = width.slice(0, width.length - 2);
    let widthPerCol = width / window.colCount;
    let widthPerColRound = Math.round(widthPerCol);
    let colDif = width - (widthPerColRound * window.colCount);
    let lastColWidth = (widthPerColRound + colDif) + "px";
    let widthToUse = "";


    let height = Math.round(width / window.ratio);
    let heightPerCol = height / window.rowCount;
    let heightPerColRound = Math.round(heightPerCol);
    let rowDif = height - (heightPerColRound * window.rowCount);
    let calcHeightLast = (heightPerColRound + rowDif) + "px";
    let heightToUse = "";


    let allTr = document.getElementsByTagName("tr");

    for (let i = 0; i < allTr.length; i++) {
        let allTd = allTr[i].querySelectorAll("td");
        for (let j = 0; j < allTd.length; j++) {
            if (i === allTr.length - 1) {
                heightToUse = calcHeightLast;
            } else {
                heightToUse = heightPerColRound + "px";
            }

            if (j === allTd.length - 1) {
                widthToUse = lastColWidth;
            } else {
                widthToUse = widthPerColRound + "px";
            }
            allTd[j].style.height = heightToUse;
            allTd[j].style.width = widthToUse;
        }
        allTr[i].style.height = heightToUse;
    }


};

let makeBgImage = () => {
    let oTable = document.getElementById("table");


    let database = window.database;
    let ref = database.ref("/users/" + window.email);
    ref.on("value", function (snap) {
        let sUrl = snap.val().SolPic;
        let sUrlForBg = "url(" + sUrl + ")";
        oTable.style.backgroundImage = sUrlForBg;

        var img = new Image();
        img.onload = callBackOnload;
        img.src = sUrl;

    });


};
let onSwitchCalendarClicked = (event) => {
    window.location.href = "./index.html";
};

let getSolIDs = () => {

};
