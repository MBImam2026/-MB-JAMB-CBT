const questions = [
    {
        question: "Which of the following organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: 1
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Pb"],
        answer: 1
    },
    {
        question: "Which unit is used to measure electrical current?",
        options: ["Volt", "Watt", "Ampere", "Ohm"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);
let score = 0;

const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTextEl.textContent = currentQ.question;
    optionsContainerEl.innerHTML = "";

    currentQ.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        
        if (selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectOption(index) {
    selectedAnswers[currentQuestionIndex] = index;
    loadQuestion();
}

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", calculateResult);

function calculateResult() {
    score = 0;
    selectedAnswers.forEach((ans, index) => {
        if (ans === questions[index].answer) {
            score++;
        }
    });

    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    loadQuestion();
});

loadQuestion();
