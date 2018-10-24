//var firebase = require('firebase');
//var config = {
//    apiKey: "AIzaSyCof8vlK6qFoGmZOAZDX8MjIV-0_sHl73g",
//    databaseURL: "https://projektfordh.firebaseio.com/",
//    projectId: "projektfordh",
//    storageBucket: "projektfordh.appspot.com"
//};
//window.app = firebase.initializeApp(config);
//window.database = firebase.database();

window.addEventListener("load", () => {
    let bgCol = document.getElementById("bgCol");
    bgCol.addEventListener('change', onbgColChange);
    let cubeCol = document.getElementById("cubeCol");
    cubeCol.addEventListener('change', onCubeColChange);
    let cubeColSolv = document.getElementById("cubeColSolv");
    cubeColSolv.addEventListener('change', onCubeSolvColChange);

    let cubeWrapper = document.getElementsByClassName("cube-wrapper");
    cubeWrapper[0].addEventListener("click", onWrapperClicked);

    let gotToDayBtn = document.getElementById("goToDay");
    gotToDayBtn.addEventListener("click", onGoToDayClicked);

});
let onbgColChange = (event) => {
    //let rgb = event.sourceElement.innerHTML.rgb;
    let bgcol = "rgb(" + Math.round(event.target.jscolor.rgb[0]) + "," + Math.round(event.target.jscolor.rgb[1]) + "," + Math.round(event.target.jscolor.rgb[2]) + ")";
    let wrapper = document.getElementById("vorschau");
    wrapper.style.backgroundColor = bgcol;
};

let onCubeColChange = (event) => {
    //let rgb = event.sourceElement.innerHTML.rgb;
    let cubeCol = "rgb(" + Math.round(event.target.jscolor.rgb[0]) + "," + Math.round(event.target.jscolor.rgb[1]) + "," + Math.round(event.target.jscolor.rgb[2]) + ")";
    setCol(cubeCol);
};
let onCubeSolvColChange = (event) => {
    //let rgb = event.sourceElement.innerHTML.rgb;
    let cubeSolvCol = "rgb(" + Math.round(event.target.jscolor.rgb[0]) + "," + Math.round(event.target.jscolor.rgb[1]) + "," + Math.round(event.target.jscolor.rgb[2]) + ")";
    setCol(cubeSolvCol);

};

let makeCol = (col, div) => {
    let aCol = col.slice(4).split(",");
    let r = aCol[0] * div;
    let g = aCol[1] * div;
    let b = (aCol[2].slice(0, aCol[2].length - 1)) * div;

    let retCol = "rgb(" + r + "," + g + "," + b + ")";
    return retCol;

};
let setCol = (color) => {
    let cubCol = makeCol(color, 1);
    let cubColDark = makeCol(color, (2 / 3));
    let cubColDarker = makeCol(color, (1 / 2));

    let figurFront = document.getElementsByClassName("front");
    figurFront[0].style.backgroundColor = cubColDark;

    let figurback = document.getElementsByClassName("back");
    figurback[0].style.backgroundColor = cubColDark;

    let figurright = document.getElementsByClassName("right");
    figurright[0].style.backgroundColor = cubColDarker;

    let figurleft = document.getElementsByClassName("left");
    figurleft[0].style.backgroundColor = cubCol;

//    let figurtop = document.createElement("figure");
//    figurtop[0].className = "top";

    let lowerLeft = document.getElementsByClassName("lower lower-left");
    lowerLeft[0].style.backgroundColor = cubColDark;

    let lowerRight = document.getElementsByClassName("lower lower-right");

    lowerRight[0].style.backgroundColor = cubCol;

    let upperLeft = document.getElementsByClassName("upper upper-left");
    upperLeft[0].style.backgroundColor = cubCol;

    let upperRight = document.getElementsByClassName("upper upper-right");
    upperRight[0].style.backgroundColor = cubColDark;

    let figurbottom = document.getElementsByClassName("bottom");
    figurbottom[0].style.backgroundColor = cubColDarker;
};
onWrapperClicked = () => {
    let wrapper = document.getElementById("vorschau");
    wrapper.classList.toggle("open");
};
onGoToDayClicked = () => {
    let toValidateNodeList = document.getElementById("adminview").querySelectorAll("input");
    let isValid = validateInputs(toValidateNodeList);

    if (isValid) {
        let adminView = document.getElementById("adminview");
        adminView.classList.toggle("makeVisible");

        let dayView = document.getElementById("dayView");
        dayView.classList.toggle("makeVisible");
    }
};

let validateInputs = (nodeList) => {
    let faults = 0;
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].value ==="" ) {
            
            nodeList[i].classList.add("makeRedBorder");
            faults++;
        }
    }
    if (faults === 0) {
        return true;
    } else {
        alert("Alle Felder Auswüllen");
        return false;
    }

};