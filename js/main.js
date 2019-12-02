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
    stopGame: 0
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
        var newPlayer = `<div id="player${i + 1}" class="relative father">${[i + 1]}. ${highScores.name}: ${highScores.score}.<span class="child">${highScores.date} </span> </div>`;
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
        domElement.clickme.className = "clickme";
        domElement.clickme.addEventListener("click", goodPoints);
        domElement.screen.addEventListener("click", bedPoints);
        // domElement.clickme.addEventListener("mouseover", random);

    }
}

function myFunc(e) {
    e.stopPropagation();
}

function timer() {
    sc = 10;
    domElement.timer.innerHTML = 60;
    var time = setInterval(function () {
        if (sc <= 11) {
            domElement.timer.style.color = "red";
        }
        if (sc <= 1) {
            domElement.timer.style.color = "black";
        }
        sc--;
        if (sc == 0) {
            sc = 0;
            clearInterval(time);
            domElement.timer.style.color = "black";
            setTimeout(function () {
                gameOver();
            }, 1000)
        }

        domElement.timer.innerHTML = sc;
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
        gameElement.stopGame = 0;
        clearInterval(time);
        console.log(1)
        domElement.clickme.removeEventListener("click", goodPoints);
        domElement.screen.removeEventListener("click", bedPoints);
        domElement.level.innerHTML = 5;
        domElement.next.innerHTML = 0;
        gameOver();
    } else {

        if (gameElement.clickim == 0) {
            gameElement.numlevel++;
            sc += 10;
            domElement.hovclick -= 50;
            domElement.level.innerHTML = gameElement.numlevel;
            gameElement.clickim = 10;
            domElement.next.innerHTML = gameElement.clickim;
        }
        if (sc >= 10) {
            domElement.timer.style.color = "black";
        }
        if (gameElement.numlevel == 2) {
            domElement.clickme.style.animation = "myAnimation 1.75s infinite linear";
        }
        if (gameElement.numlevel == 3) {
            domElement.clickme.style.animation = "myAnimation 1.5s infinite linear";
        }
        if (gameElement.numlevel == 4) {
            domElement.clickme.style.animation = "myAnimation 1.25s infinite linear";
        }
        if (gameElement.numlevel == 5) {
            domElement.clickme.style.animation = "myAnimation 1s infinite linear";

        }
    }
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
    gameElement.stopGame = 0;
    gameElement.gPoints = 0;
    gameElement.clickim = 10;
    gameElement.numlevel = 1;
    gameElement.bPoint = 0;
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
    domElement.clickme.className = "";
    startBtn.addEventListener("click", start);
    console.log(2)

    setTimeout(function () {
        alert("your score is: " + gameElement.gPoints + ".");
    }, 1000);

    var list = highScores.length;
    var length = highScores[highScores.length - 1];
    if (list < 5 || gameElement.gPoints > length.score) {
        setTimeout(function () {
            pushplayer();
        }, 1100);
    } else {
        setTimeout(function () {
            alert("try again");
            newGame();
        }, 1100);
    }
}

function pushplayer() {
    var newName = prompt("enter your name:");
    if (newName) {
        var playerDate = date();
        var newPlayer = {
            name: newName.toLowerCase(),
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













// var highScores = [{
//         name: "chanoch",
//         score: "350",
//         date: "15/07/1989"
//     },
//     {
//         name: "chanoch",
//         score: "250",
//         date: "15/07/1989"
//     },
//     {
//         name: "chanoch",
//         score: "150",
//         date: "15/07/1989"
//     },
//     {
//         name: "chanoch",
//         score: "100",
//         date: "15/07/1989"
//     },
//     {
//         name: "chanoch",
//         score: "50",
//         date: "15/07/1989"
//     }
// ];