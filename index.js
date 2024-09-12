// game page elements
const player1Score = document.getElementById('player1Score')
const player2Score = document.getElementById('player2Score')
const domRoundsCount = document.getElementById('roundsCount')
const domGameRounds = document.getElementById('gameRounds')
const squaresArray = document.querySelectorAll('.game_board_square')
const gameBoard = document.getElementById('gameBoard')
const tieButton = document.getElementById('tieButton')
const tieWindow = document.getElementById('tieWindow')
const gamePage = document.getElementById('gamePage')

// the names of the players
const fstPlayerName = document.getElementById('fstPlayerName')
const sndPlayerName = document.getElementById('sndPlayerName')

// home and restart buttons that appear during the game
const homeRestartCon = document.getElementById('homeRestartCon')
const backHomeBtn = document.getElementById('backHomeBtn')
const restartGameBtn = document.getElementById('restartGameBtn')

// home page elements
const homePage = document.getElementById('homePage')
const playerVsPlayer = document.getElementById('playerVsPlayer')
const playerVsComp = document.getElementById('playerVsComp')
const homeForm = document.getElementById('homeForm')
const homeInput = document.getElementById('homeInput')

// result page elements
const resultPage = document.getElementById('resultPage')
const resulTitle = document.getElementById('resulTitle')
const resultScore = document.getElementById('resultScore')
const resultHome = document.getElementById('resultHome')
const resultRestart = document.getElementById('resultRestart')

// game board squares from dom
const gameSquares = Array.from(squaresArray)

// x and o marks
const xMark = '<i class="fa-solid fa-xmark xMark gameMarks"></i>'
const oMark = '<i class="fa-regular fa-circle oMark gameMarks"></i>'

// game board as an array of strings
const virtualGameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
]

// all the winning combinations in the game
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

// checking for some actions that either happened or not
let isCurrentX = true
let hasWon = false
let isGameEnded = false
let isHomeClicked = false
let isItTie = false

// checking the winner of a round
let theWinner = ''

// names of the players. player vs player or player vs computer
let player1name = ''
let player2name = ''

// players' score during the game
let player1Count = 0
let player2Count = 0

// checking if it is a game with a computer
let computerGame;

// the data we get from the home page
let gameData;

// the form from the home page
homeForm.addEventListener('submit', startGame)

// listeners for the buttons to choose players' type
playerVsPlayer.addEventListener('click', () => {
    computerGame = false
})
playerVsComp.addEventListener('click', () => {
    computerGame = true
})

// event listener for a tie button which appears if it is a tie during the game
tieButton.addEventListener('click', () => tieToggle(true))

// listeners for the restart and home buttons that appear during the game
restartGameBtn.addEventListener('click', () => restartOrHome(true, false))
backHomeBtn.addEventListener('click', () => restartOrHome(true, true))

// the restart and home buttons for the result page
resultRestart.addEventListener('click', gameResultToggle)
resultHome.addEventListener('click', () => restartOrHome(false, true))

// a main loop to add event listeners for each square of the game board
for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].addEventListener('click', () => {
        if (!hasWon) {
            if (isCurrentX && virtualGameBoard[i] === '') {
                setPlayerMark('x', i)
                gameSquares[i].innerHTML = xMark
                isCurrentX = false
            } else if (!isCurrentX && virtualGameBoard[i] === '') {
                setPlayerMark('o', i)
                gameSquares[i].innerHTML = oMark
                isCurrentX = true
            }
            checkTheWInner(i)
            if (!virtualGameBoard.includes('')) {
                isItTie = true
                gameData.increaseRoundCount()
                tieToggle(false)
                endGame()
                clearGameBoard()
            }
        }

    })
}

function restartOrHome(isGameBtn, isGoHome) {
    // isGameBtn checks if it is a restart/home btn from the game page
    // isGoHome checks if it is an event to get back to the home page
    if (isGameBtn) {
        if (isItTie) {
            tieToggle(false)
        }
        clearPLayerResults();
        clearGameBoard()
    }
    if (isGoHome) {
        homeInput.value = '';
        isHomeClicked = true;
        gameResultToggle()
    }
}

// function to get the data from the game page and count the rounds
function gameDataFunc(gameRounds) {
    let roundCount = 0

    function getRoundCount() {
        return roundCount
    }

    function increaseRoundCount() {
        roundCount++
        domRoundsCount.innerHTML = roundCount
    }

    function resetRoundCount() {
        roundCount = 0
        domRoundsCount.innerHTML = roundCount
    }

    return { gameRounds, increaseRoundCount, getRoundCount, resetRoundCount }
}

// function to start the game, happens when we click to the start button and submit
function startGame(e) {
    e.preventDefault()
    const formData = new FormData(homeForm)
    gameData = gameDataFunc(Number(formData.get('amounOfRounds')))
    domGameRounds.innerHTML = gameData.gameRounds
    if(computerGame) {
        player1name = 'Player'
        player2name = 'Computer'
        fstPlayerName.innerHTML = player1name
        sndPlayerName.innerHTML = player2name
    } else {
        player1name = 'Player 1'
        player2name = 'Player 2'
        fstPlayerName.innerHTML = player1name
        sndPlayerName.innerHTML = player2name
    }
    gameResultToggle()
}

// function to set the player's mark in the virtual game board
function setPlayerMark(mark, index) {
    if (index >= 0 && index <= 8) {
        virtualGameBoard[index] = mark
    }
}

// function to make appear a tie window
function tieToggle(isItBtn) {
    if (isItBtn) {
        isItTie = false
    }
    gameBoard.classList.toggle('none')
    tieWindow.classList.toggle('none')
}

// function to clear the game board
function clearGameBoard() {
    for (let i = 0; i < virtualGameBoard.length; i++) {
        virtualGameBoard[i] = ''
    }
    for (let i = 0; i < gameSquares.length; i++) {
        gameSquares[i].innerHTML = ''
    }
    hasWon = false
    isCurrentX = true
    theWinner = ''
}

// function to make the pages appear and disappear
function gameResultToggle() {
    if (isHomeClicked) {
        resultPage.classList.add('none')
        homePage.classList.remove('none')
        gamePage.classList.add('none')
        homeRestartCon.classList.add('none')
        isHomeClicked = false
        isGameEnded = false
    } else {
        gamePage.classList.toggle('none')
        homeRestartCon.classList.toggle('none')
        if (isGameEnded) {
            resultPage.classList.toggle('none')
        } else {
            homePage.classList.toggle('none')
        }
    }

}

// function to end the game and make the result page appear
function endGame() {
    if (gameData.getRoundCount() == gameData.gameRounds) {
        isGameEnded = true
        if (isItTie && isGameEnded) {
            tieToggle(false)
            isItTie = false
        }
        gameResultToggle()
        if (player1Count > player2Count) {
            resulTitle.innerHTML = `${player1name} has Won!!!`
        } else if (player2Count > player1Count) {
            resulTitle.innerHTML = `${player2name} has Won!!!`
        } else {
            resulTitle.innerHTML = 'Draw'
        }
        resultScore.innerHTML = `${player1Count} / ${player2Count}`
        clearPLayerResults()
    }
}

// function to clear all of the game data? exept the amount of rounds and players' type
function clearPLayerResults() {
    player1Count = 0
    player2Count = 0
    player1Score.innerHTML = 0
    player2Score.innerHTML = 0
    gameData.resetRoundCount()
}

// function to check if there is a winner of each round
function checkTheWInner(index) {
    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].includes(index)) {
            const [a, b, c] = winningCombinations[i]
            if (virtualGameBoard[a] == virtualGameBoard[b] && virtualGameBoard[b] == virtualGameBoard[c]) {
                hasWon = true
                theWinner = virtualGameBoard[c]
                if (theWinner == 'x') {
                    player1Count++
                    player1Score.innerHTML = player1Count
                } else if (theWinner == 'o') {
                    player2Count++
                    player2Score.innerHTML = player2Count
                }
                gameData.increaseRoundCount()
                endGame()
                clearGameBoard()
                break
            }
        }
    }
}