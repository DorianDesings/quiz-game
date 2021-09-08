const rootStyle = document.documentElement.style;
const rouletteButton = document.getElementById('roulette-button');
const rouletteSections = document.getElementById('roulette-sections');
const questionContainer = document.getElementById('question-container');
const counterTime = document.getElementById('counter-time');
const question = document.getElementById('question');
const answer1 = document.getElementById('answer-1');
const answer2 = document.getElementById('answer-2');
const answer3 = document.getElementById('answer-3');
const answer4 = document.getElementById('answer-4');

let level = 'easy';
let randomNumberEnd = 0;

const categories = {
  html: {
    min: 0,
    max: 90
  },
  css: {
    min: 270,
    max: 359
  },
  js: {
    min: 90,
    max: 179
  },
  random: {
    min: 180,
    max: 269
  }
};

const randomNumber = () => Math.floor(Math.random() * 360) + 3600;

const writeQuestion = ({ question, answers, correctAnswer }) => {
  question.textContent = question;
  answer1.textContent = answers[0];
  answer2.textContent = answers[1];
  answer3.textContent = answers[2];
  answer4.textContent = answers[3];
};

const fetchCategory = async category => {
  if (category === 'random') {
    category = Object.keys(categories)[Math.floor(Math.random() * 3)];
  }

  const request = await fetch(`./questions/${category}.json`);
  const data = await request.json();
  writeQuestion(data[level][0]);
};

const setCategory = () => {
  Object.keys(categories).forEach(category => {
    if (
      randomNumberEnd - 3600 >= categories[category].min &&
      randomNumberEnd - 3600 <= categories[category].max
    ) {
      fetchCategory(category);
    }
  });
};

const startCounter = () => {
  let time = 5;
  let position = 0;
  const interval = setInterval(() => {
    counterTime.textContent = time;
    position -= 100 / 6;
    rootStyle.setProperty('--counter-position', `${position}%`);
    if (time <= 0) {
      clearInterval(interval);
      questionContainer.classList.remove('question-container--show');
    } else {
      time = time - 1;
    }
  }, 1000);
};

rouletteButton.addEventListener('click', () => {
  if (!rouletteSections.classList.contains('roulette__sections--spin')) {
    const generatedNumber = randomNumber();
    rootStyle.setProperty('--spin-end', `${generatedNumber}deg`);
    randomNumberEnd = generatedNumber;
    rouletteSections.classList.add('roulette__sections--spin');
    setCategory();
  }
});

rouletteSections.addEventListener('animationend', () => {
  rootStyle.setProperty('--spin-start', `${randomNumberEnd % 360}deg`);
  rouletteSections.classList.remove('roulette__sections--spin');
  questionContainer.classList.add('question-container--show');
  startCounter();
});
