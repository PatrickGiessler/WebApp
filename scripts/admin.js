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

    let carouselPrev = document.getElementById("carouselPrev");
    carouselPrev.addEventListener("click", onCarouselNavClicked);

    let carouselNext = document.getElementById("carouselNext");
    carouselNext.addEventListener("click", onCarouselNavClicked);



    let homeLink = document.getElementById("homeLink");
    homeLink.addEventListener("click", onNavbarClicked);
    let quizLink = document.getElementById("quizLink");
    quizLink.addEventListener("click", onNavbarClicked);
    let solLink = document.getElementById("solLink");
    solLink.addEventListener("click", onNavbarClicked);


    window.SolArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

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
        saveToFireBase(toValidateNodeList);
        showQuiz();
    }
};

let showQuiz = () => {
    let adminView = document.getElementById("adminview");
    adminView.classList.remove("makeVisible");
    adminView.classList.add("makeInVisible");

    document.getElementById("textForCoutn").classList.remove("makeInVisible");
    document.getElementById("textForCoutn").classList.add("makeVisible");

    let dayView = document.getElementById("dayView");
    dayView.classList.add("makeVisible");
    dayView.classList.remove("makeInVisible");

    let homeLink = document.getElementById("homeLink");
    homeLink.classList.toggle("active");

    let navText = document.getElementById("countText");
    navText.classList.toggle("makeVisible");
};

let validateInputs = (nodeList) => {
    let faults = 0;
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].value === "") {

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


let onCarouselNavClicked = (event) => {
    let nodeList = document.getElementsByClassName("carousel-item active")[0].querySelectorAll("input");
    let isValid = validateInputs(nodeList);
    let user = window.benutzerName;
    if (isValid) {
        let day = document.getElementsByClassName("carousel-item active")[0].querySelectorAll("h1")[0].innerHTML;
        day = day.slice(5, day.length - 1);
        let solUrl = nodeList[2].value;
        let question = nodeList[0].value;
        let solution = nodeList[1].value;
        //database
        let path = "/users/" + user + "/Days/Day" + day;
        database.ref(path).set({
            Antwort: solution,
            Day: day,
            Frage: question,
            beantwortet: false,
            ResponsePic: solUrl,
            SolID: "",
            ResponseTxt: ""
        });

        let array = window.SolArray;
        let index = array.indexOf(parseInt(day));
        if (index !== -1) {
            array.splice(index, 1);
            if (array.length === 0) {
                document.getElementById("buttonForNext").classList.toggle("makeInVisible");
                document.getElementById("textForCoutn").classList.remove("makeVisible");
                document.getElementById("textForCoutn").classList.add("makeInVisible");
            } else {
                document.getElementById("count").innerHTML = array.length;
            }

        }


        if (event.srcElement.parentElement.classList.contains("carousel-control-prev")) {
            $('#carouselExampleIndicators').carousel('prev');
        } else if (event.srcElement.parentElement.classList.contains("carousel-control-next")) {
            $('#carouselExampleIndicators').carousel('next');
        }
    }

};

let saveToFireBase = (nodeList) => {
    window.benutzerName = nodeList[0].value;
    let Pw = nodeList[1].value;
    let bgCol = "rgb(" + Math.round(nodeList[2].jscolor.rgb[0]) + "," + Math.round(nodeList[2].jscolor.rgb[1]) + "," + Math.round(nodeList[2].jscolor.rgb[2]) + ")";
    let cubeCol = "rgb(" + Math.round(nodeList[3].jscolor.rgb[0]) + "," + Math.round(nodeList[3].jscolor.rgb[1]) + "," + Math.round(nodeList[3].jscolor.rgb[2]) + ")";
    let CubeColSol = "rgb(" + Math.round(nodeList[4].jscolor.rgb[0]) + "," + Math.round(nodeList[4].jscolor.rgb[1]) + "," + Math.round(nodeList[4].jscolor.rgb[2]) + ")";
    let Days = {};

    let path = "/users/" + window.benutzerName;
    database.ref(path).set({
        SolPic: "",
        Days: Days,
        backgroundCol: bgCol,
        cubCol: cubeCol,
        cubColSolved: CubeColSol,
        pw: Pw
    });

};
let onNavbarClicked = (event) => {
    let target = event.srcElement.id;
    let sourceContainer = document.getElementsByClassName("navbar-nav");
    let source = sourceContainer[0].getElementsByClassName("active")[0].id;
    if (target !== source) {

        changeView(target, source);
    }
};

let changeView = (idToShow, soruce) => {
    let isValid = false;

    document.getElementsByClassName("active").item(1).querySelectorAll("input");
    switch (soruce) {
        case "homeLink":
            let toValidateNodeList = document.getElementById("adminview").querySelectorAll("input");
            isValid = validateInputs(toValidateNodeList);
            break;
        case "quizLink":
            let nodeList = document.getElementsByClassName("carousel-item active")[0].querySelectorAll("input");
            isValid = validateInputs(nodeList);
            break;
        case "solLink":

            break;

        default:

            break;
    }
    if (isValid) {
                document.getElementById(soruce).classList.toggle("active");
        document.getElementById(idToShow).classList.toggle("active");
        let allViews = document.getElementsByClassName("forSel");

        for (let i = 0; i < allViews.length; i++) {
            if (allViews[i].classList.contains("makeVisible")) {
                allViews[i].classList.remove("makeVisible");
                allViews[i].classList.add("makeInVisible");
            }
        }

        switch (idToShow) {
            case "homeLink":
                allViews[0].classList.remove("makeInVisible");
                allViews[0].classList.add("makeVisible");
                break;
            case "quizLink":
                allViews[1].classList.remove("makeInVisible");
                allViews[1].classList.add("makeVisible");
                break;
            case "solLink":
                allViews[2].classList.remove("makeInVisible");
                allViews[2].classList.add("makeVisible");
                break;

            default:

                break;
        }
    }

    if (isValid) {
        let navbar = document.getElementsByClassName("navbar-nav");
        let allLinks = navbar[0].querySelectorAll("a");
        let highLightLink = document.getElementById(idToShow);
        for (let i = 0; i < allLinks; i++) {
            allLinks[i].classList.remove("active");
        }
        highLightLink.classList.add("active");
    }


};