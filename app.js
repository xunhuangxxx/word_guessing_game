const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = ['red apple', 'on the table', 'order a pizza', 'rock and roll', 'go to school'];

//Create a function to start the game
startGame.addEventListener('click', function(){
  overlay.style.display = 'none';
  addPhraseToDisplay(phrases);
});


function getRandomNumber(num){
  const randomNum = Math.floor(Math.random() * num);
  return randomNum;
}

//create a function to get a random phrase from an array
function getRandomPhraseAsArray(arr){
  const string = arr[getRandomNumber(arr.length)];
  const phrase = string.split('');
  return phrase;
}

//create a function to display the letters
function addPhraseToDisplay(arr){
  const randomPhrase = getRandomPhraseAsArray(arr);
  const ul = document.querySelector('#phrase ul');

  for(let i = 0; i < randomPhrase.length; i++){
    const listItem = document.createElement('li');
    listItem.textContent = randomPhrase[i];
    if(listItem.textContent !== ' '){
      listItem.className = 'letter';
    }
    ul.appendChild(listItem);
  }
}
