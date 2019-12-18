const domElement = {
    scorjson: localStorage.getItem("theScorer"),
    point: document.getElementById("score"),
    next: document.getElementById("next"),
    level: document.getElementById("level"),
    badPoint: document.getElementById("miss"),
    timer: document.getElementById("timer"),
    screen: document.getElementsByClassName("screen")[0],
    clickme: document.getElementById("clickme"),
    startBtn: document.getElementById("startBtn"),
    playerDiv: document.getElementById("playerDiv")
};
const gameElement = {
    gPoints: 0,
    numlevel: 1,
    bPoint: 0,
    clickim: 10,
    hovclick: 300,
    stopGame: 0,
    spinTime: 2,
    sc: 60
};

var time = null;

startBtn.addEventListener("click", start);
var highScores = [];
var flag = false;
if (domElement.scorjson != null) {
    highScores = JSON.parse(domElement.scorjson);
}

var toAppend = "";
createHtml();

function createHtml() {
    toAppend = "";
    domElement.scorjson = JSON.stringify(highScores);
    localStorage.setItem("theScorer", domElement.scorjson);
    highScores.forEach(function (highScores, i) {
        var newPlayer = "";
        if (highScores.score > 0) {
            newPlayer = `<div id="player${i + 1}" class="relative father")>${[i + 1]}. ${highScores.name}  ${highScores.score}.<span class="child">${highScores.date} </span> </div>`;
        } else {
            newPlayer = `<div id="player${i + 1}" class="relative">${[i + 1]}. ${highScores.name}  ${highScores.score}.<span class="child">${highScores.date} </span> </div>`;
        }
        toAppend += newPlayer;
        domElement.playerDiv.innerHTML = toAppend;
    });
}

function start() {
    flag = confirm("Are you ready to play ?!");
    if (flag) {
        timer()
        startBtn.removeEventListener("click", start);
        domElement.clickme.addEventListener("click", myFunc);
        domElement.clickme.className = ("clickme");
        domElement.clickme.addEventListener("click", goodPoints);
        domElement.screen.addEventListener("click", bedPoints);
        domElement.clickme.style.animationDuration = "2s";
        domElement.clickme.addEventListener("mouseover", random);
    }
}

function myFunc(e) {
    e.stopPropagation();
}

function timer() {
    domElement.timer.innerHTML = 60;
    time = setInterval(function () {
        if (gameElement.sc <= 11) {
            domElement.timer.style.color = "red";
        }
        if (gameElement.sc <= 1) {
            domElement.timer.style.color = "black";
        }
        gameElement.sc--;
        if (gameElement.sc == 0) {
            domElement.timer.style.color = "black";
            gameOver();
        }

        domElement.timer.innerHTML = gameElement.sc;
    }, 1000);
}

function date() {
    var myDate = new Date;
    var theDay = myDate.getDate();
    var theMonth = myDate.getMonth() + 1;
    var theYear = myDate.getFullYear();
    return theDay + "/" + theMonth + "/" + theYear;
}

function goodPoints() {
    gameElement.gPoints += 10 * gameElement.numlevel;
    domElement.point.innerHTML = gameElement.gPoints;
    gameElement.clickim--;
    domElement.next.innerHTML = gameElement.clickim;
    gameElement.stopGame++;
    if (gameElement.stopGame == 50) {
        gameOver();
        domElement.clickme.removeEventListener("click", goodPoints);
        domElement.screen.removeEventListener("click", bedPoints);
        domElement.level.innerHTML = 5;
        domElement.next.innerHTML = 0;
    } else {
        if (gameElement.clickim == 0) {
            nextLevel()
        }
        if (gameElement.sc >= 10) {
            domElement.timer.style.color = "black";
        }
    }
}

function nextLevel() {
    randomColor();
    gameElement.spinTime -= 0.25;
    domElement.clickme.style.animationDuration = gameElement.spinTime + "s";
    gameElement.numlevel++;
    gameElement.sc += 10;
    domElement.hovclick -= 50;
    domElement.level.innerHTML = gameElement.numlevel;
    gameElement.clickim = 10;
    domElement.next.innerHTML = gameElement.clickim;
}

function bedPoints() {
    gameElement.gPoints -= 1 * gameElement.numlevel;
    gameElement.bPoint++;
    domElement.point.innerHTML = gameElement.gPoints;
    domElement.badPoint.innerHTML = gameElement.bPoint;
}

function random() {
    setTimeout(function () {
        domElement.clickme.style.left = Math.random() * 730 + "px";
        domElement.clickme.style.top = Math.random() * 425 + "px";
    }, gameElement.hovclick)

}

function newGame() {
    gameElement.sc = 60;
    gameElement.stopGame = 0;
    gameElement.gPoints = 0;
    gameElement.clickim = 10;
    gameElement.numlevel = 1;
    gameElement.bPoint = 0;
    gameElement.stopGame = 0;
    gameElement.spinTime = 2;
    domElement.point.innerHTML = gameElement.gPoints;
    domElement.next.innerHTML = gameElement.clickim;
    domElement.level.innerHTML = gameElement.numlevel;
    domElement.badPoint.innerHTML = gameElement.bPoint;
    domElement.clickme.style.left = 0 + "px";
    domElement.clickme.style.top = 50 + "px";
    domElement.clickme.removeEventListener("click", goodPoints);
    domElement.screen.removeEventListener("click", bedPoints);
}

function gameOver() {
    domElement.clickme.style.animationDuration = "0s";
    startBtn.addEventListener("click", start);
    clearInterval(time);
    setTimeout(function () {
        alert("your score is: " + gameElement.gPoints + ".");
    }, 500);
    var list = highScores.length;
    var length = highScores[highScores.length - 1];
    if (list < 5 || gameElement.gPoints > length.score) {
        setTimeout(function () {
            pushplayer();
        }, 700);
    } else {
        setTimeout(function () {
            alert("try again");
            newGame();
        }, 500);
    }
}

function pushplayer() {
    var newName = prompt("enter your name:");
    if (newName) {
        var playerDate = date();
        var newPlayer = {
            name: newName.toLowerCase() + " :",
            score: gameElement.gPoints,
            date: playerDate
        };
        highScores.pop();
        highScores.push(newPlayer);
        sort();
        newGame();
    } else {
        newGame();
    }
}

function sort() {
    highScores.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        return 0;
    });
    highScoresJSON = JSON.stringify(highScores);
    localStorage.setItem("theScorer", highScoresJSON);
    createHtml();
}

function levelStyle() {
    if (gameElement.numlevel == 2) {
        domElement.screen.style.style
        domElement.clickme
    }
}

function randomColor() {
    var a = "#";
    // var b = "";
    // var c = "";
    var b = Math.random() * 166;
    var c = Math.random() * 166;
    var x = modoles(b);
    var z = modoles(c);
    document.body.style.backgroundColor = (a + x);
    domElement.clickme.style.backgroundColor = (a + z);

}

function modoles(x) {
    var b = x % 1;
    x -= b;
    var a = x.toString();
    var v = a.length;
    if (v <= 2) {
        // var c = "";
        c = Math.random() * 9;
        var d = c % 1;
        c -= d;
        a += c;
        return a;

    } else {
        return a;
    }
}








// var highScores = [{
//         name: "",
//         score: "",
//         date: ""
//     },
//     {
//         name: "",
//         score: "",
//         date: ""
//     },
//     {
//         name: "",
//         score: "250",
//         date: ""
//     }, {
//         name: "",
//         score: "0",
//         date: ""
//     }, {
//         name: "chanoch",
//         score: "0",
//         date: ""
//     }
// ];
// highScoresJSON = JSON.stringify(highScores);
// localStorage.setItem("theScorer", highScoresJSON);