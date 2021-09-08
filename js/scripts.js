const rouletteButton = document.getElementById('roulette-button');
const rouletteSections = document.getElementById('roulette-sections');
let level = 'easy';

const rootStyle = document.documentElement.style;

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

const fetchCategory = async category => {
  if (category === 'random') {
    category = Object.keys(categories)[Math.floor(Math.random() * 3)];
  }

  const request = await fetch(`./questions/${category}.json`);
  const data = await request.json();
  console.log(data[level]);
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
});
