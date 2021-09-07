const rouletteButton = document.getElementById('roulette-button');
const rouletteSections = document.getElementById('roulette-sections');

const rootStyle = document.documentElement.style;

let randomNumberEnd = 0;

const categories = {
  html: {
    min: 270,
    max: 359
  },
  css: {
    min: 0,
    max: 89
  },
  js: {
    min: 180,
    max: 269
  },
  random: {
    min: 90,
    max: 179
  }
};

const randomNumber = () => Math.floor(Math.random() * 360) + 1800;

const setCategory = () => {
  Object.keys(categories).forEach(category => {
    if (
      randomNumberEnd - 1800 >= categories[category].min &&
      randomNumberEnd - 1800 <= categories[category].max
    ) {
      console.log(category);
    }
  });
};

rouletteButton.addEventListener('click', () => {
  const generatedNumber = randomNumber();
  rootStyle.setProperty('--spin-end', `${generatedNumber}deg`);
  randomNumberEnd = generatedNumber;
  rouletteSections.classList.add('roulette__sections--spin');
  // console.log(setCategory());
  setCategory();
});

rouletteSections.addEventListener('animationend', () => {
  rootStyle.setProperty('--spin-start', `${randomNumberEnd % 360}deg`);
  rouletteSections.classList.remove('roulette__sections--spin');
});
