'use strict';

class Tools {
    static generateCells(size) {
        return (`<div class="row">${`<div class="cell"></div>`
            .repeat(size)}</div>`.repeat(size))
    }
    static swap(el1, el2) {
        let tmp = el1.innerHTML;
        el1.innerHTML = el2.innerHTML;
        el1.setAttribute('data-value', el1.innerHTML)
        el2.innerHTML = tmp;
        el2.setAttribute('data-value', el2.innerHTML);
    }
    static mixCells(cells) {
        let currentIndex = cells.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            this.swap(cells[currentIndex], cells[randomIndex]);
        }
        return cells;
    }
};

let board, rows, cells;
let minSize = 3;
let maxSize = 8;
let defaultSize = 4;
let selectedSize = defaultSize;
let emptyCellId;
let startBtn, stopBtn, saveBtn, resultBtn;
let movesLabel, timeLabel;
let selectedSizeLabel;
let counterId;
let emptyPos, movePos;
let directions = {
    '10': 'left',
    '-10': 'right',
    '01': 'top',
    '0-1': 'bottom',
    'bottom': 'top',
    'top': 'bottom',
    'left': 'right',
    'right': 'left',
};
let isStillInMove = false;

function setupBoard() {
    board = document.getElementById('board');
    board.innerHTML = Tools.generateCells(selectedSize);
    getBoard();
    numerateBoard();
}
function getBoard() {
    rows = Array.from(document.querySelectorAll('#board .row'))
    cells = Array.from(board.querySelectorAll('.cell'))
}

function numerateBoard() {
    for (let i = cells.length, j = i - 1; i; i--, j--) {
        let cellId = cells.length - i;
        let value = cellId + 1;
        let assignedValue = value === cells.length ? '' : value;
        cells[cellId].innerHTML = assignedValue;
        cells[cellId].setAttribute('data-value', assignedValue)
    }
}
function configureNavigation() {
    startBtn = document.getElementById('start');
    stopBtn = document.getElementById('stop');
    saveBtn = document.getElementById('save');
    resultBtn = document.getElementById('result');
    movesLabel = document.getElementById('moves');
    timeLabel = document.getElementById('time');
    selectedSizeLabel = document.querySelector('#selected-size span');
}
function calcPos(el) {
    return {
        value: el.innerText,
        el,
        parent: el.parentNode,
        x: Array.from(el.parentNode.childNodes).indexOf(el),
        y: Array.from(el.parentNode.parentNode.childNodes).indexOf(el.parentNode),
    }
}
function calcZeroPos() {
    let emptyCell = cells.find((el) => el.innerText === '');
    emptyPos = calcPos(emptyCell);
}
function isCanMove(to) {
    let _movePos = to ? to : movePos;
    let xTry = Math.abs(emptyPos.x - _movePos.x)
    let yTry = Math.abs(emptyPos.y - _movePos.y)
    let _xTry = Math.abs(xTry)
    let _yTry = Math.abs(yTry)
    if ((_xTry == 0 && _yTry === 1) || (_xTry == 1 && _yTry === 0)) {
        console.log('can move')
        return true;
    } else {
        console.log('can\'t move');
        return false;
    }
}
function getDirection() {
    let xTry = emptyPos.x - movePos.x
    let yTry = emptyPos.y - movePos.y
    let direction = directions[`${xTry}${yTry}`]
    direction = directions[direction];
    return `to-${direction}`;
}
function swapCells() {
    let direction = getDirection()
    let el = movePos.el;
    isStillInMove = true;
    el.classList.add(direction)
    setTimeout(() => {
        Tools.swap(movePos.el, emptyPos.el)
        el.classList.remove(direction);
        isStillInMove = false;
    }, 1000)
    let tmp = movePos;
    movePos = emptyPos;
    emptyPos = tmp;
    // console.log('SWAP!!!!');
    /////.//
    /////.//
    /////.//

}
function init() {
    setupBoard();
    configureNavigation();
    Array.from(document.querySelectorAll('.other-size a'))
        .forEach((el) => {
            el.onclick = (e) => {
                e.preventDefault();
                let sizeText = e.target.innerText;
                let size = +sizeText.split('x')[0]
                selectedSize =
                    typeof size === 'number'
                        && (size >= minSize && size <= maxSize)
                        ? size
                        : defaultSize;
                setupBoard();
                selectedSizeLabel.innerHTML = selectedSize + 'x' + selectedSize;
            }
        });

    startBtn.addEventListener('click', (e) => {
        if (!counterId) {
            stopBtn.classList.add('active');
            startBtn.classList.add('active');
            Tools.mixCells(cells);
            counterId = setInterval(function () {
                /////.//
                /////.//
                /////.//
                console.log();
            }, 400)
        }
    })

    stopBtn.addEventListener('click', function (e) {
        clearInterval(counterId);
        counterId = null;
        stopBtn.classList.remove('active')
        startBtn.classList.remove('active')
    })

    board.addEventListener('click', function (e) {
        /////.//
        /////.//
        /////.//
        let el = e.target
        if (!isStillInMove && el.classList.contains('cell')) {
            calcZeroPos();
            let clickPos = calcPos(el)
            if (isCanMove(clickPos)) {
                movesLabel.innerText = (+movesLabel.innerText) + 1;
                movePos = clickPos;
                swapCells()
            }
        }
    })


}
window.addEventListener('load', init);