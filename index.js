// main elements
const player1Score = document.getElementById('player1Score')
const player2Score = document.getElementById('player2Score')
const roundsCount = document.getElementById('roundsCount')
const squaresArray = document.querySelectorAll('.game_board_square')
const gameBoard = document.getElementById('gameBoard')
const tieButton = document.getElementById('tieButton')
const tieWindow = document.getElementById('tieWindow')
const gamePage = document.getElementById('gamePage')

// result page elements
const resultPage = document.getElementById('resultPage')
const resulTitle = document.getElementById('resulTitle')
const resultScore = document.getElementById('resultScore')
const resultHome = document.getElementById('resultHome')
const resultRestart = document.getElementById('resultRestart')

const gameSquares = Array.from(squaresArray)
const xMark = '<i class="fa-solid fa-xmark xMark gameMarks"></i>'
const oMark = '<i class="fa-regular fa-circle oMark gameMarks"></i>'

const virtualGameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
]

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

let isCurrentX = true
let hasWon = false
let theWinner = ''

let player1Count = 0
let player2Count = 0

let gameRounds = 2
let roundCount = 0

tieButton.addEventListener('click', tieToggle)
resultRestart.addEventListener('click', gameResultToggle)

function setPlayerMark(mark, index) {
    if (index >= 0 && index <= 8) {
        virtualGameBoard[index] = mark
    }
}

function tieToggle() {
    gameBoard.classList.toggle('none')
    tieWindow.classList.toggle('none')
}

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
                roundCount++
                tieToggle()
                endGame()
                clearGameBoard()
                console.log(roundCount);
            }
        }

    })
}

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

function gameResultToggle() {
    gamePage.classList.toggle('none')
    resultPage.classList.toggle('none')
}

function endGame() {
    if (roundCount == gameRounds) {
        gameResultToggle()
        if (player1Count > player2Count) {
            resulTitle.innerHTML = 'Player 1 has Won!!!'
        } else if (player2Count > player1Count) {
            resulTitle.innerHTML = 'Player 2 has Won!!!'
        } else {
            resulTitle.innerHTML = 'Draw'
        }
        resultScore.innerHTML = `${player1Count} / ${player2Count}`
        player1Count = 0
        player2Count = 0
        player1Score.innerHTML = 0
        player2Score.innerHTML = 0
        roundCount = 0
    }
}

function checkTheWInner(index) {
    console.log('ui');

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
                roundCount++
                endGame()
                clearGameBoard()
                break
            }
        }
    }
}