
const phrase = document.querySelector("ul");
const overlay = document.getElementById("overlay");
const startButton = document.querySelector(".btn_reset");
const qwerty = document.getElementById('qwerty');
const tries = document.getElementsByClassName("tries");
const title = document.getElementsByClassName("title")[0];

let missed = 0;

const phrases = ["functions","loops","apple","microsoft","technology"];


// Add event listener to start button
startButton.addEventListener("click", () => {
  overlay.style.display = "none"
});


//Generating random phrases and spliting into letters
getRandomPhraseArray = arr => {
  let randomWord = [Math.floor(Math.random() * phrases.length)];
  let splitWord = phrases[randomWord].split('');
  return splitWord;
}
const randomPhrases = getRandomPhraseArray(phrases); 


// Setting the game display
 addPhraseToDisplay = arr => {
  arr.forEach(letters => {
       let li = document.createElement("li");
       li.textContent = letters
       phrase.appendChild(li);
     if (li.textContent !== '') {
           li.className = "letter";
       } else {
           li.className = "space";
       }
  });
 }
 addPhraseToDisplay(randomPhrases);


// Checking if the letters match
checkLetter = button => {
    const letterCheck = document.getElementsByClassName("letter");
    let match = null;
    for (let i = 0; i < letterCheck.length; i++) {
        if (letterCheck[i].textContent === button.textContent) {
          letterCheck[i] = letterCheck[i].classList.add("show");
          match = letterCheck[i];
      }
    }

  return match;
 }


// Creating an event handler for the keyboard
qwerty.addEventListener("click", e => {
   if (e.target.tagName === "BUTTON") {
    let button = e.target;
    button.className = 'chosen';
    button.disabled = true;
    checkLetter(button);

    if (checkLetter(button) === null) {
     missed++;
     let heartImg = tries[missed-1].getElementsByTagName("img")[0];
     heartImg.src = "images/lostHeart.png";
     }
   }

  checkWin();
});

  
// Win function for win and loose screens
checkWin = () => {
 let letterClass = document.getElementsByClassName("letter");
 let showClass = document.getElementsByClassName("show");

 if (letterClass.length === showClass.length) {

  setTimeout( () => {
    // Display win overlay
    overlay.style.display = 'flex';
    overlay.className = 'win';
    title.textContent = "You Win!!";
    overlay.appendChild(win);
  }, 600);
  
  } else if (missed >= 5) {

  setTimeout( () => {
    // Display the loose overlay
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    title.textContent = "You Loose!!";
    overlay.appendChild(lose);
    }, 600);
  }

   newGame();
 }
 

// Start a New Game
newGame = () => {
  startButton.textContent = "New Game";
  startButton.addEventListener("click", () => {
  window.location.reload();
   });
  }

