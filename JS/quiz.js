'use strict'
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "img/html.png",
        choiceA : "Hypertext Markup Language.",
        choiceB : "Hypertext and links markup language.",
        choiceC : "Hightext machine language.",
        correct : "A"
    },
    {
        question : "What is the font-size of the h1 heading tag?",
        imgSrc : "img/html.png",
        choiceA : "2.17 em",
        choiceB : "2 em",
        choiceC : "1.5 em",
        correct : "B"
    },
    {
        question : "How many heading tags are there in HTML5?",
        imgSrc : "img/html.png",
        choiceA : "5",
        choiceB : "6",
        choiceC : "3",
        correct : "B"
    },
    {
        question : "Which of the following attributes is used to add link to any element?",
        imgSrc : "img/html.png",
        choiceA : "link",
        choiceB : "ref",
        choiceC : "href",
        correct : "C"
    },
    {
        question : "Which of the following characters indicate closing of a tag?",
        imgSrc : "img/html.png",
        choiceA : ".",
        choiceB : "/",
        choiceC : "\\",
        correct : "B"
    },
    {
        question : "What does CSS stand for?",
        imgSrc : "img/css.png",
        choiceA : "Creative Style Sheets",
        choiceB : "Cascading Style Sheets  ",
        choiceC : "Colorful Style Sheets",
        correct : "B"
    },
    {
        question : "Where in an HTML document is the correct place to refer to an external style sheet?",
        imgSrc : "img/css.png",
        choiceA : "In the body section",
        choiceB : "At the end of the document",
        choiceC : "In the head section  ",
        correct : "C"
    },
    {
        question : "Which HTML attribute is used to define inline styles?",
        imgSrc : "img/css.png",
        choiceA : "style ",
        choiceB : "styles",
        choiceC : "font",
        correct : "A"
    },
    {
        question : "Which of the following selector matches the name of any element type?",
        imgSrc : "img/css.png",
        choiceA : "The Type Selector",
        choiceB : "The Universal Selector ",
        choiceC : "The Class Selector",
        correct : "B"
    },
    {
        question : "Which property is used to change the background color?",
        imgSrc : "img/css.png",
        choiceA : "color",
        choiceB : "bgcolor",
        choiceC : "background-color  ",
        correct : "C"
    },
    {
        question : "Which of the following is not a reserved word in JavaScript?",
        imgSrc : "img/js.png",
        choiceA : "interface",
        choiceB : "throws",
        choiceC : "program",
        correct : "C"
    },
    {
        question : "Which of the following type of variable is visible everywhere in your JavaScript code?",
        imgSrc : "img/js.png",
        choiceA : "global variable",
        choiceB : "local variable",
        choiceC : "Both of the above.",
        correct : "A"
    },
    {
        question : "What is the HTML tag under which one can write the JavaScript code?",
        imgSrc : "img/js.png",
        choiceA : "javascript",
        choiceB : "script",
        choiceC : "scripted",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#75daad";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


// when user tries to refresh the page in middle of the quiz.
window.onbeforeunload = function() {
    return "Progress will be lost if you leave the page, are you sure?";
  };

















