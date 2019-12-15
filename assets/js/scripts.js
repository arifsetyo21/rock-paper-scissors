let hands = {
   rock: {
      goDown: "paper"
   },
   paper: {
      goDown: "scissors"
   },
   scissors: {
      goDown: "rock"
   }
};

let roundCount = 0;
let changeWeaponAnimation = 'tada';
let baseUrl = window.location.origin;
let path = {
   svg: '/assets/svg/',
};

let roundStatusTxt = document.querySelector('button.btn-lg').querySelector('span');
let roundStatus = document.querySelector('button.btn-lg');

let scorePlayer = document.querySelector('.rounded-left').querySelector('h3');
let scoreComp = document.querySelector('.rounded-right').querySelector('h3');

let sndLose = new Audio("/assets/audio/lose.wav");
let sndWin = new Audio("/assets/audio/win.wav");

scorePlayer.innerText = 0;
scoreComp.innerText = 0;

document.querySelector('#rock').onclick = rockBtnOnClick;
document.querySelector('#paper').onclick = paperBtnOnClick;
document.querySelector('#scissors').onclick = scissorsBtnOnClick;


function rockBtnOnClick(){
   let btn = document.querySelector('.rounded-left').querySelector('img');
   btn.src=`${baseUrl+path.svg}rock.svg`;
   animateCSS(btn, changeWeaponAnimation);
   play("rock");
}

function paperBtnOnClick(){
   let btn = document.querySelector('.rounded-left').querySelector('img');
   btn.src=`${baseUrl+path.svg}paper.svg`;
   animateCSS(btn, changeWeaponAnimation);
   play("paper");
}

function scissorsBtnOnClick(){
   let btn = document.querySelector('.rounded-left').querySelector('img');
   btn.src=`${baseUrl+path.svg}scissors.svg`;
   animateCSS(btn, changeWeaponAnimation);
   play("scissors");
}

function play(choose){

   /* NOTE generate random number */
   let randNum = Math.random() * 8;
   
   /* NOTE if num < 3 = rock, else if num =< 3 and >= 5 = paper, else scissors */
   let comp = computerPlay(randNum);
   let compWeapon = document.querySelector('.rounded-right').querySelector('img');
   compWeapon.src = `${baseUrl+path.svg+comp}.svg`;
   animateCSS(compWeapon, changeWeaponAnimation);

   /* NOTE if rock >< rock rand then draw */
   /* NOTE if rock >< scissors rand then win */
   /* NOTE if rock >< paper rand then lose */
   roundStatusTxt.innerHTML = playRound(choose, comp);

   roundCount++;
   
   document.querySelector('#round').innerHTML = `Round ${roundCount}`;
   console.log(scorePlayer.innerHTML, scoreComp.innerHTML);

}

function playRound(playerSelection, computerSelection) {
   if (playerSelection == computerSelection) {
      animateCSS(roundStatus, 'btn-primary');
      sndLose.play();
      sndWin.play();
      return "DRAW";
   } else if (hands[playerSelection].goDown == computerSelection) {
      addScore(++scoreComp.innerText);
      animateCSS(roundStatus, 'btn-danger');
      sndLose.play();
      return "LOSE";
   } else {
      addScore(++scorePlayer.innerText, 'player');
      animateCSS(roundStatus, 'btn-success');
      sndWin.play();
      return "WIN";
   }
}

function computerPlay(number) {
   if ( number <= 2 ) {
      return "rock";
   } else if ( number >= 3 && number <= 5) {
      return "paper";
   } else {
      return "scissors";
   }
}

function addScore(number, who = 'comp'){
   if (number < 5 ) {   
      if (who == 'player') {
         document.querySelector('.rounded-left').querySelector('h3').innerText = number;
      } else {
         document.querySelector('.rounded-right').querySelector('h3').innerText = number;
      }
   } else {
      (winnerAndReset(who)) ? location.reload(true) : window.close();
   }
}

function animateCSS(element, animationName, callback) {
   const node = element;
   node.classList.remove('btn-primary');
   node.classList.remove('btn-success');
   node.classList.remove('btn-danger');

   node.classList.add('animated', animationName)


   function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
   }

   node.addEventListener('animationend', handleAnimationEnd)
}

function winnerAndReset(who){
   if (who == 'comp') {
      sndWin.play();
      return confirm('You Lose, play again?');
   } else {
      sndLose.play();
      return confirm('Congratulate you win!!, play again winner?');
   } 
}