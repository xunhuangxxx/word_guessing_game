const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = ['red dress', 'two birds', 'go to park', 'old city', 'apple juice'];
const hearts = document.querySelectorAll('.tries');


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

//check letters to match the letter in the button the player has chosen
function checkLetter(letterBtn){
  const phraseLetters = document.querySelectorAll('.letter');
  let letterMatch = null;
  for(let i = 0; i < phraseLetters.length; i++){
    const letter = phraseLetters[i].textContent;
    if(letter === letterBtn.textContent){
      phraseLetters[i].className += ' show';
      letterMatch = letter;
    }
  }
  return letterMatch;
}

//create a function to check if players win
function checkWin() {
  const classLetter = document.querySelectorAll('.letter');
  const classShow = document.querySelectorAll('.show');
  if(missed >= hearts.length){
    overlay.style.display = 'block';
    overlay.className = 'lose';
    overlay.querySelector('h2').textContent ="Sorry! Better luck next time.";
    return;
  }
  if(classLetter.length === classShow.length){
    overlay.style.display = 'block';
    overlay.className = 'win';
    overlay.querySelector('h2').textContent ='Congrats! You guessed the correct phrase!';
  }
}

//Add an event listener to the keyboard
qwerty.addEventListener('click', (e)=>{

  if(e.target.tagName ==='BUTTON' ){
    e.target.className = 'chosen';
    e.target.setAttribute('disabled', true);
    const letterFound = checkLetter(e.target);
    //count the missed guesses
    if(letterFound === null && missed < hearts.length){

      missed += 1;
      const img = document.createElement('img');
      img.src = 'images/lostHeart.png';
      img.style.height = '35px';
      img.style.width = '30px';
      hearts[missed-1].querySelector('img').remove();
      hearts[missed-1].prepend(img);
    }
    checkWin();
  }
});

//create a reset button

const resetButton = document.createElement('button');
overlay.appendChild(resetButton);
