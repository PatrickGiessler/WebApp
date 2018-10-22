

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

    window.rowCount = 15;
    window.colCount = 15;

    window.email = window.sessionStorage.getItem("user");
    window.color = window.sessionStorage.getItem("bgCol");


    if (window.email === null || window.email === undefined) {
        alert("Ups, da ging leider etwas schief! Bitte melde dich nochmal an!");
        window.location.href = "./login.html";
    } else {
        let htmlElement = document.querySelector("body");
        htmlElement.style.backgroundColor =  window.color;
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
       
        if (i === countRow - 1) {
            tr.style.height = (heightPerColRound + rowDif) + "px";
        } else {
            tr.style.height = heightPerColRound + "px";
        }
        for (let j = 0; j < countCol; j++) {
            let td = document.createElement("td");
            let tdID = (i+1) + "_" + (j+1);
            td.bgColor = window.color;
            td.id = tdID;
            if (i === countCol - 1) {
                td.style.width = (widthPerColRound + rowDif) + "px";
            } else {
                td.style.width = widthPerColRound + "px";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        
    }
    makeSolutionVisible();

};

let makeSolutionVisible=()=>{
    let database = window.database;
    let ref = database.ref("/users/" + window.email + "/Days");
    ref.on("value", function (snap) {
    let i = 0; 
    let sollutionArray =[];
//    for (let i = 0; snap.val().lengt;i++){
//        if(snap.val().beantwortet === true){
//            let td = document.getElementById(data[0].SolID);
//            td.bgcolor ="none";
//        }
//    } 
//    
    for (let key in snap.val()){
        if(snap.val()[key].beantwortet === true){
            let td = document.getElementById(snap.val()[key].SolID);
            td.classList.add("noBackground");
       }
       i++;
    }
    
    //just for debug
   // i=24;
    if(i===24){
        let allTd = document.getElementsByTagName("td");
        for (let j=0; j<allTd.length;j++){
            allTd[j].classList.add("noBackground");
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



    let allTd = document.getElementsByTagName("td");
    for (let i = 0; i < allTd.length; i++) {
        if (i === allTd.length - 1) {
            allTd[i].style.width = (widthPerColRound + colDif) + "px";
        } else {
            allTd[i].style.width = widthPerColRound + "px";
        }


    }
    let height = Math.round(width / window.ratio);
    let heightPerCol = height / window.rowCount;
    let heightPerColRound = Math.round(heightPerCol);
    let rowDif = height - (heightPerColRound * window.rowCount);

    let allTr = document.getElementsByTagName("tr");
    for (let i = 0; i < allTr.length; i++) {
        if (i === allTr.length - 1) {
            allTr[i].style.height = (heightPerColRound + rowDif) + "px";
        } else {
            allTr[i].style.height = heightPerColRound + "px";
        }


    }

};

let makeBgImage = () => {
    let oTable = document.getElementById("table");
    

    let database = window.database;
    let ref = database.ref("/users/" + window.email);
    ref.on("value", function (snap) {
        let sUrl = snap.val().SolPic;
        let sUrlForBg = "url(" + sUrl + ")"
        oTable.style.backgroundImage = sUrlForBg;
        
        var img = new Image();
        img.onload = callBackOnload;
        img.src = sUrl;
       
    });


};
let onSwitchCalendarClicked = (event) => {
    window.location.href = "./index.html";
};

let getSolIDs =()=>{
    
};
