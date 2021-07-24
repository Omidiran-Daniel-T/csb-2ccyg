var answer = 0;
var score = 0;
var gameIsPlaying = false;

function displayFeedback(message, color) {
    document.getElementById("tryagain").innerText = message;
    document.getElementById("tryagain").style.backgroundColor = color;
    setTimeout(function() {
        hide("tryagain");
    }, 1000);
    show("tryagain");
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function generateQuestion() {
    //Question
    var lhs = Math.floor(1 + Math.random() * 10);
    var rhs = Math.floor(1 + Math.random() * 10);
    answer = lhs * rhs;
    document.getElementById("question").innerText = lhs + "x" + rhs;

    //Options
    var wrongOption1 = Math.floor(1 + Math.random() * 99);
    var wrongOption2 = Math.floor(1 + Math.random() * 99);
    var wrongOption3 = Math.floor(1 + Math.random() * 99);
    do {
        if (wrongOption1 == answer) {
            wrongOption1 = Math.floor(1 + Math.random() * 10);
        }
        if (wrongOption2 == answer) {
            wrongOption2 = Math.floor(1 + Math.random() * 10);
        }
        if (wrongOption3 == answer) {
            wrongOption3 = Math.floor(1 + Math.random() * 10);
        }
        if (wrongOption1 == wrongOption2) {
            wrongOption1 = Math.floor(1 + Math.random() * 10);
        }
        if (wrongOption2 == wrongOption3) {
            wrongOption2 = Math.floor(1 + Math.random() * 10);
        }
        if (wrongOption3 == wrongOption1) {
            wrongOption3 = Math.floor(1 + Math.random() * 10);
        }
    } while (wrongOption1 == answer ||
        wrongOption2 == answer ||
        wrongOption3 == answer ||
        wrongOption1 == wrongOption2 ||
        wrongOption2 == wrongOption3 ||
        wrongOption3 == wrongOption1
    );

    var selectedOption = Math.floor(1 + Math.random() * 3);
    if (selectedOption == 1) {
        document.getElementById("option1").innerText = answer;
        document.getElementById("option2").innerText = wrongOption1;
        document.getElementById("option3").innerText = wrongOption2;
        document.getElementById("option4").innerText = wrongOption3;
    }
    if (selectedOption == 2) {
        document.getElementById("option1").innerText = wrongOption1;
        document.getElementById("option2").innerText = answer;
        document.getElementById("option3").innerText = wrongOption2;
        document.getElementById("option4").innerText = wrongOption3;
    }
    if (selectedOption == 3) {
        document.getElementById("option1").innerText = wrongOption2;
        document.getElementById("option2").innerText = wrongOption1;
        document.getElementById("option3").innerText = answer;
        document.getElementById("option4").innerText = wrongOption3;
    }
    if (selectedOption == 4) {
        document.getElementById("option1").innerText = wrongOption3;
        document.getElementById("option2").innerText = wrongOption1;
        document.getElementById("option3").innerText = wrongOption2;
        document.getElementById("option4").innerText = answer;
    }
}

function startTimer(t) {
    var timer = setInterval(function() {
        document.getElementById("time").innerText = t;
        if (t == 0) {
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + "</p>";
            show("gameOver");
            clearInterval(timer);
            playing = false;
        }
        t--;
    }, 1000);
    show("timer");
}

function checkOptionAndProceed(option) {
    if (option == answer) {
        displayFeedback("Correct", "green");
        generateQuestion();
        score += 1;
        document.getElementById("score").innerText = score;
    } else {
        displayFeedback("Try Again", "red");
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("startbtn").addEventListener("click", function() {
    if (this.innerText == "Start Game") {
        startTimer(59);
        playing = true;
        this.innerText = "Reset Game";
        generateQuestion();
    } else {
        location.reload();
    }
});

for (i = 1; i <= 4; i++) {
    document.getElementById("option" + i).onclick = function() {
        if (playing == true) {
            checkOptionAndProceed(this.innerText);
        }
    };


}