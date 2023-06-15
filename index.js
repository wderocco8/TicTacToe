// game vairbales
const cells = Array(9).fill(false)
const breakRows = [2,5]
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
let isTurnX = true
let isAlive = true
// let winner = null

// document element variables
const boardEl = document.getElementById("board")
const messageEl = document.getElementById("message-el")
const jsConfetti = new JSConfetti()

// automatically render empty board
renderCells()


/***********  functions  ***********/ 
// function to renderCells
function renderCells() {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]
        const cellEl = document.getElementById(`cell${i}`)
        if (cell != false) {
            cellEl.textContent = cell
            cellEl.style.color = "rgb(189, 57, 16)"
        }
    }

}

// function to clear the board
function clearBoard() {
    for (let i = 0; i < cells.length; i++) {
        const cellEl = document.getElementById(`cell${i}`)
        cells[i] = false
        cellEl.textContent = ""
        cellEl.style.backgroundColor = "rgb(200, 236, 244)"
    }
    messageEl.innerHTML = "<br>"
    isTurnX = true
    isAlive = true
    renderCells()
}

// function to add a tile
function handleClick(cell) {
    messageEl.innerHTML = "<br>"

    const cellEl = document.getElementById(`cell${cell}`)

    // if game over
    if (isAlive == false) {
        messageEl.textContent = "Click restart to continue :)"
        return
    }
    // if space already taken
    if (cells[cell] != false) {
        messageEl.textContent = "Select a new tile!"
        return
    }

    if (isTurnX) {
        cells[cell] = "X"
    } else {
        cells[cell] = "O"
    }
    if (isWinner(isTurnX) != false) {
        console.log(isTurnX + " : is winner")
        return
    }
    if (isDraw()) {
        console.log("it's a tie")
        return
    }
    // switch turns and render board
    isTurnX = !isTurnX
    renderCells()
}

// function to check if there is a winner
function isWinner(isTurnX) {
    for (const combo of WIN_COMBOS) {
        if (cells[combo[0]] != false && cells[combo[0]] === cells[combo[1]] && cells[combo[1]] === cells[combo[2]]) {
            if (isTurnX) {
                messageEl.textContent = "Congradulations player X!!!!"
            } else {
                messageEl.textContent = "Congradulations player O!!!!"
            }
            isAlive = false
            visualizeWin(combo)
            jsConfetti.addConfetti()
            return combo
        }
    }
    return false
}

// function to check if game is a draw
function isDraw() {
    for (const cell of cells) {
        if (cell == false) {
            return false
        }
    }
    messageEl.textContent = "It's a tie..."
    isAlive = false
    return true
}

// function to show winning combo
function visualizeWin(combo) {
    for (i of combo) {
        const cellEl = document.getElementById(`cell${i}`)
        cellEl.style.backgroundColor = "rgb(220, 210, 65)"
        console.log("color change " + i)
    }
}

// function to add hover for 'X' and 'O' placement
function hoverCursor(cellEl) {
    if (cellEl.textContent == "X" || cellEl.textContent == "O") {
        return
    }
    if (isTurnX) {
        cellEl.textContent = "X"
    } else {
        cellEl.textContent = "O"
    }
    cellEl.style.color = "rgba(189, 56, 16, 0.646)"
}
// function to add hover for 'X' and 'O' placement
function unHoverCursor(cellEl) {
    if (isTurnX) {
        cellEl.textContent = ""
    } else {
        cellEl.textContent = ""
    }
    renderCells()
}

// hover code (doesn't fully work with win)
for (let i = 0; i < cells.length; i++) {
    const cellEl = document.getElementById(`cell${i}`)

    cellEl.addEventListener("mouseover", function() {
        hoverCursor(cellEl)
    })
    
    cellEl.addEventListener("mouseleave", function() {
        unHoverCursor(cellEl)
    })
}