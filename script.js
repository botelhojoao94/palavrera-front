import { words } from './words.js'
let word = []
let attemptRow = 0
let attemptPosition = 0
let attemptWords = [[], [], [], [], [], []]
const keyboard = document.querySelectorAll(".button-letter")
const enter = document.querySelector(".button-enter")
const backSpace = document.querySelector(".button-back")
const game = document.querySelector(".game")
const gameOver = document.querySelector(".game-over")
const restart = document.querySelector(".restart-btn")

window.onload = function pickWord() {
    const index = Math.floor(Math.random() * (words.length))
    word = [...words[index]]
    console.log(word)
}

for (let i = 0; i < Object.keys(keyboard).length; i++) {
    keyboard[i].addEventListener("click", Attempt)
}
enter.addEventListener("click", enterClick)
backSpace.addEventListener("click", backSpaceClick)
restart.addEventListener("click", restartGame)

function backSpaceClick() {
    if (attemptPosition > 0)
        attemptPosition--
    attemptWords[attemptRow].pop()
    const currentLetterBox = document.getElementById(`letter${attemptRow}${attemptPosition}`)
    currentLetterBox.innerHTML = ''
}

function enterClick() {
    if (attemptPosition == 5) {
        checkAttempt()
    }
}

function restartGame() {
    window.location.reload();
}

function Attempt(event) {
    if (attemptPosition < 5) {
        const letterBox = document.getElementById(`letter${attemptRow}${attemptPosition}`)
        letterBox.innerHTML = event.target.id.toUpperCase()
        attemptWords[attemptRow].push(event.target.id)
        attemptPosition++
    }
}

function checkAttempt() {
    checkMatchLetterPosition()
    checkExistsLetter()
    checkCorrectWord()
}

function checkMatchLetterPosition() {
    word.forEach((letterWord, indexWord) => {
        if (attemptWords[attemptRow][indexWord] == letterWord) {
            const letterBoxMatched = document.getElementById(`letter${attemptRow}${indexWord}`)
            letterBoxMatched.style.background = "green"
        }
    })
}

function checkExistsLetter() {
    attemptWords[attemptRow].forEach((letterAttempt) => {
        if (!word.includes(letterAttempt)) {
            const keyMismatched = document.getElementById(`${letterAttempt}`)
            keyMismatched.style.visibility = "hidden"
        }
    })
}

function checkCorrectWord() {
    if (JSON.stringify(attemptWords[attemptRow]) == JSON.stringify(word)) {
        console.log("Palavra encontrada!")
        endGame(true)
    }
    else {
        if (attemptRow < 5) {
            attemptRow++
            attemptPosition = 0
        }
        else {
            console.log("Game Over!")
            endGame(false)
        }
    }
}

function endGame(correct) {
    const finalFrase = document.getElementById("final-frase")
    const correctWord = document.getElementById("correct-word")
    console.log(finalFrase)
    console.log(correctWord)
    if (correct) {
        finalFrase.innerHTML = `Parabéns! <br/> Você acertou a palavra!`
        correctWord.innerHTML = `${word.toString().toUpperCase().replaceAll(',', '')}`
        correctWord.style.color = "green"
    }
    else {
        finalFrase.innerHTML = `Que pena! <br/> A palavra correta é:`
        correctWord.innerHTML = `${word.toString().toUpperCase().replaceAll(',', '')}`
        correctWord.style.color = "red"
    }
    gameOver.style.display = "flex"
    game.style.display = "none"
}