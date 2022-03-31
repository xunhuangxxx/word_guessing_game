const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = ['red dress', 'two birds', 'go to park', 'old city', 'apple juice'];
const hearts = document.querySelectorAll('.tries');



//create reset button
const reset = document.createElement('button');
reset.textContent = 'Reset';
reset.style.display = 'none';
reset.className = 'btn__reset';
overlay.appendChild(reset);


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
    listItem.style.transition = 'all 3s';
    console.log('fffff');
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
    reset.style.display = 'block';
    return;
  }
  if(classLetter.length === classShow.length){
    overlay.style.display = 'block';
    overlay.className = 'win';
    overlay.querySelector('h2').textContent ='Congrats! You guessed the correct phrase!';
    reset.style.display = 'block';
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
      const newImg = document.createElement('img');
      newImg.src = 'images/lostHeart.png';
      newImg.style.height = '35px';
      newImg.style.width = '30px';
      hearts[missed-1].querySelector('img').remove();
      hearts[missed-1].prepend(newImg);
    }
    checkWin();
  }
});

//create a reset function
reset.addEventListener('click', function(){
  overlay.style.display = 'none';
  missed = 0;
  const list = document.querySelectorAll('#phrase li');
  const imgs = document.querySelectorAll('img');
  const buttons = qwerty.querySelectorAll('button');

  for(let i = 0; i< imgs.length; i++){
    imgs[i].src = 'images/liveHeart.png';
  }
  for(let i = 0; i< list.length; i++){
    list[i].remove();
  }
  for(let i = 0; i< buttons.length; i++){
    buttons[i].className = '';
    buttons[i].removeAttribute('disabled');
  }

  getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phrases);
})
