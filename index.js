const player1Score = document.getElementById('player1Score')
const player2Score = document.getElementById('player2Score')
const roundsCount = document.getElementById('roundsCount')
const squaresArray = document.querySelectorAll('.game_board_square')
const gameBoard = document.getElementById('gameBoard')
const tieButton = document.getElementById('tieButton')
const tieWindow = document.getElementById('tieWindow')

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

let gameRounds = 5
let roundCount = 0

tieButton.addEventListener('click', tieToggle)

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
            if (!virtualGameBoard.includes('')) {
                tieToggle()
                clearGameBoard()
            }
            checkTheWInner(i)
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
    roundCount++
    theWinner = ''
    // if(roundCount == gameRounds) {

    // }
}

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
                clearGameBoard()
            }
        }
    }
}