// Išorinis JS failas pagal reikalavimus.

const quizData = [
  {
    question: "Kuri iš šių miestų yra Prancūzijos sostinė?",
    options: ["Londonas", "Paryžius", "Berlynas", "Madridas"],
    answer: "Paryžius",
    difficulty: "easy", // Pridedame sunkumą prie kiekvieno klausimo.
  },
  {
    question: "Kuri iš šių miestų yra Lietuvos sostinė?",
    options: ["Kaunas", "Klaipėda", "Vilnius", "Panevėžys"],
    answer: "Vilnius",
    difficulty: "easy",
  },
  {
    question: "Kas yra didžiausias Lietuvos ežeras?",
    options: ["Dusios", "Asveja", "Drūkšiai", "Neris"],
    answer: "Drūkšiai",
    difficulty: "medium",
  },
  {
    question: "Kokia yra Lietuvos valstybės kalba?",
    options: ["Anglų", "Rusų", "Lenkų", "Lietuvių"],
    answer: "Lietuvių",
    difficulty: "easy",
  },
  {
    question: "Koks yra tradicinis lietuviškas maistas iš bulvių?",
    options: ["Cepelinai", "Koldūnai", "Balandėliai", "Šaltibarščiai"],
    answer: "Cepelinai",
    difficulty: "medium",
  },
  {
    question: "Kokia yra Lietuvos valiuta?",
    options: ["Euras", "Doleris", "Litas", "Rublis"],
    answer: "Euras",
    difficulty: "easy",
  },
  {
    question: "Koks yra didžiausias Lietuvos kalnas?",
    options: ["Aukštojas", "Juozapinė", "Etnos Kalnas", "Auksuotasis kalnas"],
    answer: "Aukštojas",
    difficulty: "medium",
  },
  {
    question: "Kur yra Lietuvos karaliaus Mindaugo palaidojimo vieta?",
    options: ["Kernavė", "Trakai", "Vilnius", "Klaipėda"],
    answer: "Vilnius",
    difficulty: "hard",
  },
  {
    question: "Kuris iš šių yra seniausias Lietuvos miestas?",
    options: ["Kaunas", "Vilnius", "Kernavė", "Trakai"],
    answer: "Kernavė",
    difficulty: "hard",
  },
  {
    question: "Kuri planeta yra žinoma kaip raudonoji planeta?",
    options: ["Marsas", "Venera", "Jupiteris", "Merkurijus"],
    answer: "Marsas",
    difficulty: "medium",
  },
  // Visada galima pridėti daugiau klausimų atsižvelgiant į šiuos pavyzdžius.
];

let currentQuestion = 0;
let score = 0;
let answered = false; // Sekti jeigu atsakymas buvo pasirinktas

// Funkcija, kad nustatyti sunkumo lygį pagal esamą taškų skaičių.
function determineQuestionDifficulty(score) {
  let questionDifficulty;

  if (score < 40) {
    questionDifficulty = "easy"; // Pradedame žaidimą su lengvo sunkumo klausimais.
  } else if (score >= 40 && score < 80) {
    questionDifficulty = "medium"; // Nustatome vidutinį sunkumą jeigu pasiekia 40 taškų.
  } else {
    questionDifficulty = "hard"; // Nustatome sunkumą jeigu pasiekia 80 taškų ir daugiau.
  }

  return questionDifficulty;
}

function displayQuestion(questionObj) {
  const questionElement = document.querySelector("#question");
  const optionsElement = document.querySelector(".options");
  const nextButton = document.getElementById("nextButton");

  // Adding a new method getElementsByClassName to select elements based on class name
  const scoreElements = document.getElementsByClassName("score");
  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].textContent = `Dabartinis taškų skaičius: ${score} taškų`;
  }

  // Event 2: Pelės užvedimo event
  document
    .getElementById("nextButton")
    .addEventListener("mouseover", function () {
      this.style.backgroundColor = "red"; // Pakeičiame mygtuko spalvą ant pelės užvedimo.
    });

  // Event 3: Mygtuko ant klaviatūros paspaudimo įvykis
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Jeigu nuspausite ant klaviatūros "ESC", galutinio klausimyno rezultato tekstas dings.
      document.getElementById("result").style.display = "none";
    }
  });

  questionElement.textContent = questionObj.question;

  optionsElement.innerHTML = "";

  questionObj.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.addEventListener("click", function () {
      checkAnswer(option);
      answered = true;
      nextButton.disabled = false;
    });
    optionsElement.appendChild(optionButton);
  });

  nextButton.textContent =
    currentQuestion === quizData.length - 1 ? "Baigti" : "Sekantis";
}

displayQuestion(quizData[currentQuestion]);

document.getElementById("nextButton").addEventListener("click", function () {
  if (answered) {
    checkAnswer();
    answered = false;
    this.disabled = true;
  }
});

function startQuiz() {
  const nextButton = document.getElementById("nextButton");
  nextButton.disabled = true;
  nextButton.addEventListener("click", function () {
    if (currentQuestion < quizData.length) {
      displayQuestion(quizData[currentQuestion]);
    } else {
      showResult();
    }
  });
}

function checkAnswer(selectedOption) {
  if (currentQuestion < quizData.length) {
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
      score += 10; // Duodame 10 taškų už kiekvieną teisingai pasirinktą atsakymą.
    }

    const currentScore = score;
    const questionDifficulty = determineQuestionDifficulty(currentScore);

    // Filtruojame klausimus pagal esamą sunkumo lygį.
    const filteredQuestions = quizData.filter(
      (question) => question.difficulty === questionDifficulty
    );

    // Ieškoti dabartinio klausimo indekso filtruotuose klausimuose
    const currentQuestionIndex = filteredQuestions.findIndex(
      (question) => question.question === quizData[currentQuestion].question
    );

    // Jei yra, pereiname prie kito klausimo
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      currentQuestion++; // Perėjimas prie kito pradinio duomenų rinkinio klausimo
      const nextFilteredQuestion = filteredQuestions[currentQuestionIndex + 1];
      currentQuestion = quizData.findIndex(
        (question) => question.question === nextFilteredQuestion.question
      );
      displayQuestion(filteredQuestions[currentQuestionIndex + 1]); // Rodome kitą klausimą
    } else {
      showResult(); // Parodome galutinį rezultatą, jei atsakyta į visus klausimus
    }
  }
}

function showResult() {
  const scoreElement = document.getElementById("score");
  scoreElement.style.display = "none";
  document.getElementById("nextButton").style.display = "none";

  const resultElement = document.getElementById("result");

  switch (score) {
    case 10:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Liūdnas reikalas..`;
      break;
    case 20:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Wow, tu tikrai daug žinai..`;
      break;
    case 30:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Nesugebėjote įveikti net lengviausių klausimų..`;
      break;
    case 40:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Bent jau lengviausius klausimus įveikėte..`;
      break;
    case 50:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Neblogai atsakyta!`;
      break;
    case 60:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Gal sekantį kartą pasiseks geriau?`;
      break;
    case 70:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Įspūdinga!`;
      break;
    case 80:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Esate tikras(-a) genijus(-jė)!`;
      break;
    case 90:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų. Esate tikras Maestro!`;
      break;
    case 100:
      resultElement.textContent = `Sveikiname! Surinkote stulbinantį rezultatą ${score} taškų! Atsakėtė į visus klausimus teisingai!`;
      break;
    default:
      resultElement.textContent = `Jūsų galutinis taškų skaičius yra: ${score} taškų.`;
  }
}

startQuiz();
