let gameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
]

let winningCombinations = [
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

function setPlayerMark(mark, index) {
    if (index >= 0 && index <= 8) {
        gameBoard[index] = mark
    }
}

for (let i = 0; i < gameBoard.length; i++) {
    if(!hasWon) {
        let markPlace = Number(prompt('Enter the place of your mark (0-8)'))
        if (isCurrentX && gameBoard[markPlace] === '') {
            setPlayerMark('x', markPlace)
            isCurrentX = false
        } else if (!isCurrentX && gameBoard[markPlace] === '') {
            setPlayerMark('o', markPlace)
            isCurrentX = true
        } else if (!markPlace) {
            break
        } else {
            i--
        }
        checkTheWInner2(markPlace)
    } else if(hasWon) {
        alert(`the winner is ${theWinner}`)
        break
    }
}

if(!hasWon) {
    alert('tie')
}


function checkTheWInner2(index) {
    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].includes(index)) {
            const [a,b,c] = winningCombinations[i]
            console.log('yes',index, a, b, c);
            if(gameBoard[a] == gameBoard[b] && gameBoard[b] == gameBoard[c]) {
                hasWon = true
                theWinner = gameBoard[b]
                console.log('yes222', gameBoard[b]);
            }
        }
    }
}

function checkTheWinner(index) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i]

    }
}