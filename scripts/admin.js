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


    let inputUsername = document.getElementById("username");
    inputUsername.addEventListener("change", onUserNameChange);

    let solURL = document.getElementById("picURl");
    solURL.addEventListener("change", onInputChange);
    let colCount = document.getElementById("colCount");
    colCount.addEventListener("change", onInputChange);
    let rowCount = document.getElementById("rowCount");
    rowCount.addEventListener("change", onInputChange);
    
    bindEventsToIndicators();

    window.SolArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

});
let onbgColChange = (event) => {
    //let rgb = event.sourceElement.innerHTML.rgb;
    let bgcol = "rgb(" + Math.round(event.target.jscolor.rgb[0]) + "," + Math.round(event.target.jscolor.rgb[1]) + "," + Math.round(event.target.jscolor.rgb[2]) + ")";
    let wrapper = document.getElementsByClassName("cuberow");
    wrapper[0].style.backgroundColor = bgcol;
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
    changeView("quizLink", "homeLink");
};

let showQuiz = () => {
    let adminView = document.getElementById("adminview");
    adminView.classList.remove("makeAdminVisible");
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
        alert("Bitte füllen Sie alle Felder aus.");
        return false;
    }

};


let onCarouselNavClicked = (event) => {
    let nodeList = document.getElementsByClassName("carousel-item active")[0].querySelectorAll("input");
    let isValid = validateInputs(nodeList);
    let user = document.getElementById("username").value;
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

let getDataForUpdate = () => {
    let username = document.getElementById("username").value;
    let Pw = document.getElementById("password").value;
    let inpBG = document.getElementById("bgCol");
    let bgCol = "rgb(" + Math.round(inpBG.jscolor.rgb[0]) + "," + Math.round(inpBG.jscolor.rgb[1]) + "," + Math.round(inpBG.jscolor.rgb[2]) + ")";
    let inpCube = document.getElementById("cubeCol");
    let cubeCol = "rgb(" + Math.round(inpCube.jscolor.rgb[0]) + "," + Math.round(inpCube.jscolor.rgb[1]) + "," + Math.round(inpCube.jscolor.rgb[2]) + ")";
    let inpCubeSolv = document.getElementById("cubeColSolv");
    let cubeColSol = "rgb(" + Math.round(inpCubeSolv.jscolor.rgb[0]) + "," + Math.round(inpCubeSolv.jscolor.rgb[1]) + "," + Math.round(inpCubeSolv.jscolor.rgb[2]) + ")";
    let Days = {};

    let colCount = document.getElementById("colCount").value;
    let rowCount = document.getElementById("rowCount").value;
    let solPic = document.getElementById("picURl").value;

    let data = {};
    data.SolPic = solPic;
    data.Days = Days;
    data.backgroundCol = bgCol;
    data.cubCol = cubeCol;
    data.cubColSolved = cubeColSol;
    data.pw = Pw;
    data.colCount = colCount;
    data.rowCount = rowCount;

    updateFirebase(username, data);


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
            if (isValid) {
                getDataForUpdate();
            }
            break;
        case "quizLink":
            let nodeList = document.getElementsByClassName("carousel-item active")[0].querySelectorAll("input");
            isValid = validateInputs(nodeList);
            break;
        case "solLink":
            let toValidNodeList = document.getElementById("solutionView").querySelectorAll("input");
            isValid = validateInputs(toValidNodeList);
            if (isValid) {
                getDataForUpdate();
            }
            break;

        default:

            break;
    }
    if (isValid) {
        document.getElementById(soruce).classList.toggle("active");
        document.getElementById(idToShow).classList.toggle("active");
        let allViews = document.getElementsByClassName("forSel");

        for (let i = 0; i < allViews.length; i++) {
            if (allViews[i].classList.contains("makeVisible")|| allViews[i].classList.contains("makeAdminVisible")) {
                allViews[i].classList.remove("makeVisible");
                  allViews[i].classList.remove("makeAdminVisible");
                allViews[i].classList.add("makeInVisible");
            }
        }

        switch (idToShow) {
            case "homeLink":
                allViews[0].classList.remove("makeInVisible");
                allViews[0].classList.add("makeAdminVisible");
                break;
            case "quizLink":
                allViews[1].classList.remove("makeInVisible");
                allViews[1].classList.add("makeVisible");
                break;
            case "solLink":
                allViews[2].classList.remove("makeInVisible");
                allViews[2].classList.add("makeVisible");
                document.getElementById("picURl").dispatchEvent(new Event("change"));
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

let onInputChange = (event) => {
    let allInputs = document.getElementById("solutionView").querySelectorAll("input");
    let sURL = allInputs[0].value;
    window.colCount = parseInt(allInputs[1].value);
    window.rowCount = parseInt(allInputs[2].value);


    if (window.colCount > 0 && window.rowCount > 0 && sURL !== "") {
        getDataForUpdate();
        makeBgImage(sURL);
    }
};

let createView = (countCol, countRow, fakeelement) => {
    let table = document.getElementById("table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
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
        tr.id = "" + (i + 1);
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
            td.id = tdID;
            td.addEventListener("click", onTdClicked);
            if (i === countCol - 1) {
                td.style.width = (widthPerColRound + colDif) + "px";
                td.style.height = height;
            } else {
                td.style.width = widthPerColRound + "px";
                td.style.height = height;
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);

    }

    onImgResize(fakeelement);
    window.addEventListener('resize', onImgResize);


};

let callBackOnload = (event) => {
    //alert("test");
    window.ratio = event.srcElement.naturalWidth / event.srcElement.naturalHeight;
    var table = document.getElementById("table");
    let fakeelement = {
        srcElement: window
    };
    createView(window.colCount, window.rowCount, fakeelement);

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
let makeBgImage = (sURL) => {
    let oTable = document.getElementById("table");
    bgsURL = "url('" + sURL + "')";
    oTable.style.backgroundImage = bgsURL;
    var img = new Image();
    img.onload = callBackOnload;
    img.src = sURL;



};

let onUserNameChange = (event) => {
    let username = event.srcElement.value;
    window.benutzerName = username;
    let data = {};
    data.SolPic = "";
    data.backgroundCol = "rgb(255,255,255)";
    data.cubCol = "rgb(255,255,255)";
    data.cubColSolved = "rgb(255,255,255)";
    data.pw = "";
    data.Days = {};
    data.colCount = 15;
    data.rowCount = 15;
    readData(username, data);
};
let readData = (username, data) => {
    let database = window.database;
    let ref = database.ref("/users/" + username);
    ref.on("value", function (snap) {
        if (snap.val() !== null) {
            fillViewWithExistingData(snap.val());
        } else {
            createDataInFireBase(username, data);
        }
    });

};
let createDataInFireBase = (username, data) => {
    database.ref("/users/" + username).set({
        SolPic: data.SolPic,
        backgroundCol: data.backgroundCol,
        cubCol: data.cubCol,
        cubColSolved: data.cubColSolved,
        pw: data.pw,
        Days: data.Days = {},
        colCount: data.colCount,
        rowCount: data.rowCount

    });
};
let updateFirebase = (username, data) => {
    database.ref("/users/" + username).update({
        SolPic: data.SolPic,
        backgroundCol: data.backgroundCol,
        cubCol: data.cubCol,
        cubColSolved: data.cubColSolved,
        pw: data.pw,

        colCount: data.colCount,
        rowCount: data.rowCount
    });
};
let fillViewWithExistingData = (data) => {
    document.getElementById("password").value = data.pw;
    setColForJSCOLORHEX(document.getElementById("bgCol"), data.backgroundCol);
    setColForJSCOLORHEX(document.getElementById("cubeCol"), data.cubCol);
    setColForJSCOLORHEX(document.getElementById("cubeColSolv"), data.cubColSolved);
    document.getElementById("picURl").value = data.SolPic;

    document.getElementById("colCount").value = data.colCount;
    document.getElementById("rowCount").value = data.rowCount;
    document.getElementById("picURl").dispatchEvent(new Event("change"));
    if (data.Days !== null) {
        clearAllInputs()
        window.days = data.Days;
        let i = 0;
        let allItems = document.getElementsByClassName("carousel-item");
        for (let key in data.Days) {
            let actuallItem = allItems[i];
            let allInputs = actuallItem.querySelectorAll("input");
            let actuallObject = data.Days[key];
            allInputs[0].value = actuallObject.Frage;
            allInputs[1].value = actuallObject.Antwort;
            allInputs[2].value = actuallObject.ResponsePic;
            i++;
        }
    }

};
let setColForJSCOLORHEX = (control, rgb) => {
    let rgbSplit = rgb.slice(4, rgb.length - 1).split(",");
    let r = parseInt(rgbSplit[0]);
    let g = parseInt(rgbSplit[1]);
    let b = parseInt(rgbSplit[2]);
    control.jscolor.fromRGB(r, g, b);
    control.dispatchEvent(new Event("change"));
};
let clearAllInputs = () => {
    let allInputs = document.getElementById("dayView").querySelectorAll("input");

    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
    }
};
let onTdClicked = (event) => {

    let bufferArray = [];
    let id = event.srcElement.id;
    if (window.forUpload !== undefined) {
        bufferArray = window.forUpload;
    }
    if (bufferArray.length < 24) {
        event.srcElement.classList.toggle("makeItWhite");

        if (event.srcElement.classList.contains("makeItWhite")) {
            bufferArray.push(event.srcElement.id);
        } else {
            bufferArray.splice(bufferArray.indexOf(id), 1);
        }
    }
    document.getElementById("countPic").innerHTML = (24-bufferArray.length);
    if (bufferArray.length === 24) {
        syncDataWithFirebase(bufferArray);
        bufferArray =[];
    }

    window.forUpload = bufferArray;

};
let syncDataWithFirebase = (data) => {
    for (let i = 0; i < data.length; i++) {
        let path = "/users/" + window.benutzerName + "/Days/Day" + (i + 1);
        database.ref(path).update({
            SolID: data[i]
        });

    }
};
let bindEventsToIndicators=()=>{
  let allIndicators = document.getElementsByClassName("carousel-indicators")[0].children;
  for (let i = 0; i< allIndicators.length; i++){
      allIndicators[i].addEventListener("click", onIndicatorCklicked);
  }
    
};
let onIndicatorCklicked = (event)=>{
   let allIndicators = document.getElementById("carousel-indicators").getElementsByClassName("active");
   
};