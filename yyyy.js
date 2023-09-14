// Array of words to guess
const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

// Initialize game variables
let currentWord = "";
let guessedWord = [];
let guesses = [];
let attempts = 6;

// Elements
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const guessesDisplay = document.getElementById("guesses");

// Pick a random word from the array
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Initialize a new game
function newGame() {
    currentWord = getRandomWord();
    guessedWord = Array(currentWord.length).fill('_');
    guesses = [];
    attempts = 6;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    guessesDisplay.textContent = `Guesses: ${guesses.join(', ')}`;
    message.textContent = '';
}

// Handle user guesses
function guessLetter() {
    const letter = guessInput.value.toLowerCase();

    if (!letter.match(/[a-z]/)) {
        message.textContent = 'Please enter a valid letter.';
        return;
    }

    if (guesses.includes(letter)) {
        message.textContent = 'You already guessed that letter.';
        return;
    }

    guesses.push(letter);

    if (currentWord.includes(letter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        attempts--;
    }

    updateDisplay();

    if (guessedWord.join('') === currentWord) {
        message.textContent = 'Congratulations! You guessed the word!';
    } else if (attempts === 0) {
        message.textContent = `Game over! The word was "${currentWord}".`;
    }

    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
guessButton.addEventListener('click', guessLetter);
newGame();

