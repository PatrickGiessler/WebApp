

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
    
    window.rowCount = 10;
    window.colCount = 10;
    
    
    let email = window.sessionStorage.getItem("user");
    let color = window.sessionStorage.getItem("bgCol");
    let sUrl = getImageUrl();
    let size = getImageSize(sUrl);
    createView(size[0], size[1],window.colCount,window.rowCount);
    let switchcalendarButton = document.getElementById("switchcalendarButton");
    var img = new Image();
    img.onload = callBackOnload;
    img.src = sUrl;
    switchcalendarButton.addEventListener("click", onSwitchCalendarClicked);

});
let createView = (width, height, countCol, countRow) => {
    let table = document.getElementById("table");
    let actualHeight = height / countRow;
    let actualWidth = width / countCol;
    for (let i = 0; i < countRow-1; i++) {
        let tr = document.createElement("tr");
        tr.style.height = actualHeight +"px";
        for (let j = 1; j < countCol; j++) {
            let td = document.createElement("td");
            td.style.width = actualWidth+"px";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

};
let callBackOnload =(event)=>{
    //alert("test");
    window.ratio = event.srcElement.naturalWidth / event.srcElement.naturalHeight;
    var table = document.getElementById("table");
    new ResizeObserver(onImgResize).observe(table);
};
let onImgResize = (event)=>{
    let width=window.getComputedStyle(event[0].target).width;
    let height = Math.round(width.slice(0,width.length-2)/window.ratio) ;
    height = height/window.rowCount ; 
    
    //width = width.slice(0,width.length-2)/colCount +"px"; 
    width = width.slice(0,width.length-2)/colCount;
    let roundwidth = Math.round(width);
    
    let cdif  = height-roundHeight;
    cdif = (Math.round(cdif * 10) / 10)*10;
  
    //let height =(width.slice(0,width.length-2)/window.rowCount);
    let roundHeight = Math.round(height);
    
    let rdif  = height-roundHeight;
    rdif = (Math.round(rdif * 10) / 10)*10;

    let allTr = document.getElementsByTagName("tr");
    for (let i=0; i<allTr.length;i++ ){
        if (i===allTr.length-1) {
             allTr[i].style.height = (roundHeight -rdif) +"px";
        }
        else{
             allTr[i].style.height = roundHeight +"px";
        }
       
        
    }
     let allTd = document.getElementsByTagName("td");
    for (let i=0; i<allTd.length;i++ ){
        if (i===allTd.length-1) {
             allTd[i].style.height = (roundwidth -cdif) +"px";
        }
        else{
             allTd[i].style.height = roundwidth +"px";
        }
       
        
    }
    
};

let getImageUrl = () => {
    let oTable = document.getElementById("table");
    let sUrl = window.getComputedStyle(oTable, false).backgroundImage;
    sUrl = sUrl.slice(4, -1).replace(/"/g, "");
    return sUrl;
};

let getImageSize = (sUrl) => {
    //let img = new Image(sUrl);
    let img = document.createElement("img");
    img.src = sUrl;
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    let aSize = [width, height];
    
    
    
    return aSize;
};
let onSwitchCalendarClicked = (event) => {
    window.location.href = "./index.html";
};
