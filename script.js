// Master Question Bank organised by Subject
const questionBank = {
  chemistry: [
    {
      question: "Which of the following elements has the highest electronegativity?",
      options: ["Sodium", "Chlorine", "Fluorine", "Oxygen"],
      correct: 2, // Fluorine
      explanation: "Fluorine is the most electronegative element on the periodic table because of its high nuclear charge and small atomic radius."
    },
    {
      question: "What is the oxidation number of Nitrogen in HNO3?",
      options: ["+3", "+5", "-3", "+4"],
      correct: 1, // +5
      explanation: "H (+1) + N + 3*O (-2) = 0  =>  1 + N - 6 = 0  =>  N = +5."
    }
  ],
  biology: [
    {
      question: "Which organelle is responsible for cellular respiration and energy production?",
      options: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Endoplasmic reticulum"],
      correct: 1, // Mitochondrion
      explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions."
    }
  ],
  english: [
    {
      question: "Choose the word opposite in meaning to 'EPHEMERAL':",
      options: ["Transient", "Permanent", "Fleeting", "Short-lived"],
      correct: 1, // Permanent
      explanation: "'Ephemeral' means lasting for a very short time, so 'Permanent' is the antonym."
    }
  ]
};

// Application State Variables
let currentSubject = "chemistry";
let currentQuestionIndex = 0;
let userAnswers = {}; // Stores user selections: { questionIndex: selectedOptionIndex }

// Function to Load a Question onto the UI
function loadQuestion(index) {
  const questions = questionBank[currentSubject];
  if (!questions || index >= questions.length) return;

  const q = questions[index];
  
  // Render Question Text
  const questionElement = document.getElementById("question-text");
  if (questionElement) {
    questionElement.innerText = `${index + 1}. ${q.question}`;
  }
  
  // Render Options
  const optionsContainer = document.getElementById("options-container");
  if (optionsContainer) {
    optionsContainer.innerHTML = ""; // Clear existing options

    q.options.forEach((optionText, optIndex) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = optionText;

      // Highlight option if user already selected it
      if (userAnswers[index] === optIndex) {
        btn.classList.add("selected");
      }

      btn.onclick = () => selectOption(optIndex);
      optionsContainer.appendChild(btn);
    });
  }
}

// Function to Handle Option Selection
function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  loadQuestion(currentQuestionIndex); // Reload to update button styling
}

// Subject Switcher Event Handler
function switchSubject(subjectName) {
  if (questionBank[subjectName]) {
    currentSubject = subjectName;
    currentQuestionIndex = 0;
    userAnswers = {}; // Reset answers for new test
    loadQuestion(currentQuestionIndex);
  }
}

// Initial Load
window.onload = () => {
  loadQuestion(0);
};

