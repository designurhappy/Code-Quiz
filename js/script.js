//quiz questions
const questions = [
    {
        question: 'How does JavaScript access an HTML element?',
        answers: [
            { text: '<document.getElementById(id)>', correct: true },
            { text: '<document.write>', correct: false },
            { text: '<document.getHTMLElement>', correct: false },
        ]
    },
    {
        question: 'JavaScript syntax defines three types of values',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
    {
        question: 'Which of these is a JavaScript Data Type?',
        answers: [
            { text: '<variable>', correct: false },
            { text: '<string>', correct: true },
            { text: '<syntax>', correct: false }
        ]
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
]

const startButton = document.getElementById('button');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerTextElement = document.getElementById('timer-text');

let shuffledQuestions, currentQuestionIndex;
let secondsRemaining = 120;

startButton.addEventListener('click', startGame);


function startGame() {
    var interval1 = setInterval(function() {
        if (secondsRemaining === 1) {
            clearInterval(interval1);
        }
        timerTextElement.innerText = --secondsRemaining;
    }, 1000);
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(function() {Math.random() - .5});
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();

}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement ('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        // saveScore();
    })
}

function resetState() {
    clearStatusClass(document.body);
//    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    console.log(selectedButton);
    console.log(correct);
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
 //       nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    setTimeout(setNextQuestion, 2000);
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
