const questions = [
    { question: "Who is the fastest Indian bowler to take 50 wickets in Test cricket?",answers: ["Anil Kumble","Jasprit Bumrah","Ravichandran Ashwin","Mohammed Shami "],correct: "Jasprit Bumrah" },
    { question:"Who is the only Indian cricketer to score 100 international centuries?",answers:["MS Dhoni","Virat Kholi","Sachin Tendulkar","Rahul Dravid"],correct:"Sachin Tendulkar"},
    {question:"Who has scored the fastest double century in ODIs for India?",answers: ["Rohit Sharma", "Virender Sehwag", "Ishan Kishan", "Shubman Gill"],correct:"Ishan Kishan"},
    { question:"Who was the first Indian to score a century in T20 internationals?",answers:["Rohit Sharma", "KL Rahul", "Suresh Raina","Virat Kohli"],correct: "Suresh Raina"},
    { question:"Who is the leading wicket-taker for India in Test cricket?",answers:["Anil Kumble", "Kapil Dev", "Harbhajan Singh", "Ravichandran Ashwin"],correct:"Anil Kumble"},
    { question:"Who has scored the most runs in a single IPL season?",answers:["Chris Gayle", "Virat Kohli", "David Warner", "Suresh Raina"],correct:"Virat Kohli"},
    { question:" Who was the first Indian batsman to hit a century in a World Cup final?",answers:["Kapil Dev", "Gautam Gambhir", "MS Dhoni", "Rohit Sharma"],correct:"MS Dhoni"},
    { question:"Who is the first Indian to take five wickets in all three formats?",answers:["Bhuvneshwar Kumar"," Kapil Dev", "Gautam Gambhir", "MS Dhoni"],correct:"Bhuvneshwar Kumar"},
 //ADD MORE QUESTIONS
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score-value");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timeDisplay.textContent = timeLeft;
    timer = setInterval(countdown, 1000);

    let question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerButtons.innerHTML = "";

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(answer, question.correct));
        answerButtons.appendChild(button);
    });
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
    } else {
        clearInterval(timer);
        nextQuestion();
    }
}

function checkAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        score++;
        scoreDisplay.textContent = score;
    }

    document.querySelectorAll("#answer-buttons button").forEach(button => {
        if (button.textContent === correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionText.textContent =` Quiz Over! Your score: ${score}/${questions.length}`;
    answerButtons.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

startQuiz();

