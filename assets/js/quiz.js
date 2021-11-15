var currentQuestionIndex = 0;
var time = questions.length * 15;


var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// start quiz function
function startQuiz() {
    console.log("click");

    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "start hide");

    questionsEl.setAttribute("class", " ");


    // start timer
    timerId = setInterval(function(){
    clockTick();
    }, 1000);
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionsEl.children[0].textContent = currentQuestion.title;

    while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
    }

    for(var i = 0; i < currentQuestion.choices.length; i++){

    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    choicesEl.appendChild(choiceButton);
    }
    // add event listener to each choice
    choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
    });
    choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
    });
    choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
    });
    choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
    });
}

function questionClick(answerChoice) {
  // check if answer is correct  
    if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    time -= 10;
    feedbackEl.textContent = "incorrect!"
    }
    else{
        feedbackEl.textContent = "correct!"
    }

    feedbackEl.setAttribute("class", "feedback");
    setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
    }, 500);

    // next question
    currentQuestionIndex++;

    // check questions
    if(currentQuestionIndex === questions.length) 

    quizEnd();

    else

    getQuestion();
}

// quiz end function

function quizEnd() {
    clearInterval(timerId);
    timerEl.textContent = time;


    var finalScreenEl = document.getElementById("final-screen");
    finalScreenEl.setAttribute("class", " ");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if(time <= 0)
    quizEnd();

}

function saveHighscore() {
    var initials = initialsEl.value.toUpperCase();

    if(initials === ""){ 
    alert("Input mustn't be blank'");
    return;
    }

    else if(initials.length > 3){
    alert("Input must be no more than 3 characters");
    return;
    }

    else{

    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
        highscores = [];


    var newScore = {
        initials: initials,
        score: time
    };

    highscores.push(newScore);


    localStorage.setItem("highscores", JSON.stringify(highscores));


    location.href = "highscores.html";
    }
}

function checkForEnter(event) {


    if(event.keyCode === 13)
        saveHighscore();
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

// enter key for submit initials
initialsEl.onkeyup = checkForEnter;