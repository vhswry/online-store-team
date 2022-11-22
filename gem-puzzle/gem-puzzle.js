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
    static validateTag(tagName) {
        return typeof this.validators[tagName] === 'function'
            ? this.validators[tagName]
            : (
                this.validators[tagName] = (e) => e.target.tagName === tagName,
                this.validators[tagName]
            )
    }
    static range(min, max) {
        return [...(function* (min = 0, max = 10) {
            for (let j = max; j >= min; j--) {
                yield max - j + min;
            }
        })(min, max)]
    }
    static timeDiff(now) {
        let t = (new Date()).getTime() - now;
        let hours = Math.floor((t % (1000*60*60*24))/(1000*60*60))
        let minutes = Math.floor((t % (1000*60*60))/(1000*60));
        let seconds = Math.floor((t % (1000*60))/1000);
        return [hours, minutes, seconds];
    }
};

// Tools.validateTag.prototype.validators = {};
// Tools.validateTag('A')

let board, rows, cells;
let minSize = 3;
let maxSize = 8;
let defaultSize = 8;
let selectedSize = defaultSize;
// console.log(selectedSize);
selectedSize = defaultSize;
// console.log(selectedSize);
let sizeId = () => Tools.range(minSize, maxSize).indexOf(selectedSize + 0);
let emptyCellId;
let startBtn, stopBtn, saveBtn, resultBtn;
let movesLabel, timeLabel;
let selectedSizeLabel;
let counterId;
let emptyPos, movePos;
let otherSizeBtnPannel;
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
let startTime, currentTime;
let isPaused = false;
let isStarted = false;

function setupBoard() {
    board.innerHTML = Tools.generateCells(selectedSize);
    rows = Array.from(document.querySelectorAll('#board .row'))
    cells = Array.from(board.querySelectorAll('.cell'))
    numerateBoard();
}

function numerateBoard() {
    for (let i = cells.length, j = i - 1; i; i--, j--) {
        let cellId = cells.length - i;
        let value = cellId + 1;
        let assignedValue = value === cells.length ? '' : value;
        cells[cellId].innerHTML = assignedValue;
        cells[cellId].setAttribute('data-value', assignedValue)
        if (!assignedValue) {
            cells[cellId].classList.add('empty')
        }
    }
}
// function configureNavigation() {
//     startBtn = document.getElementById('start');
//     stopBtn = document.getElementById('stop');
//     saveBtn = document.getElementById('save');
//     resultBtn = document.getElementById('result');
//     movesLabel = document.getElementById('moves');
//     timeLabel = document.getElementById('time');
//     selectedSizeLabel = document.querySelector('#selected-size span');
// }
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
    if (emptyPos && emptyPos.el && emptyPos.el.classList.contains('empty')) {
        emptyPos.el.classList.remove('empty')
    }
    let emptyCell = cells.find((el) => el.innerText === '');
    emptyPos = calcPos(emptyCell);
    emptyCell.classList.add('empty');
    // console.log(emptyCell.classList)
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
    let el2 = emptyPos.el;
    isStillInMove = true;
    el.classList.add(direction)
    el2.classList.add('empty')
    setTimeout(() => {
        Tools.swap(movePos.el, emptyPos.el)
        el.classList.remove(direction);
        el2.classList.remove('empty');
        el.classList.add('empty');
        isStillInMove = false;
    }, 100)
    let tmp = movePos;
    movePos = emptyPos;
    emptyPos = tmp;
    // console.log('SWAP!!!!');
    /////.//
    /////.//
    /////.//
}

function boardClickHandler(e) {
    let el = e.target
    if (isStarted && !isStillInMove && el.classList.contains('cell')) {
        calcZeroPos();
        let clickPos = calcPos(el)
        if (isCanMove(clickPos)) {
            let labelMoveNumber = (+movesLabel.innerText) + 1;
            movesLabel.innerText = typeof labelMoveNumber === 'number' ? labelMoveNumber : 0;
            movePos = clickPos;
            swapCells()
        }
    }
}

function stopBtnCkickHandler(e) {
    clearInterval(counterId);
    counterId = null;
    stopBtn.classList.remove('active')
    startBtn.classList.remove('active')
}
function startBtnClickHandler(e) {
    if (!isStarted) {
        isStarted = true;
        isPaused = false;
        stopBtn.classList.add('active');
        startBtn.classList.add('active');
        Tools.mixCells(cells);
        // }
        // if (!counterId) {
        startTime = new Date().getTime();
        counterId = setInterval(function () {
            let [h, m, s] = Tools.timeDiff(startTime);
            let labelText =
                `${(h + '').length < 2 ? '0' + h : h}`
                + `:${(m + '').length < 2 ? '0' + m : m}`
                + `:${(s + '').length < 2 ? '0' + s : s}`;
            timeLabel.innerText = labelText
            // console.log(labelText);
        }, 1000);
    }
    calcZeroPos();
}

function changeSizeHandler(e) {
    let element = e.target;
    if (element.tagName === 'A') {
        e.preventDefault();
        let sizeText = element.innerText;
        let prevSize = selectedSize + 'x' + selectedSize;
        if (board.classList.contains(prevSize)) {
            board.classList.remove(prevSize)
        }
        let size = +sizeText.split('x')[0];
        selectedSize =
            typeof size === 'number'
                && (size >= minSize && size <= maxSize)
                ? size
                : defaultSize;
        board.classList.add(selectedSize + 'x' + selectedSize);
        setupBoard();
        selectedSizeLabel.innerHTML = selectedSize + 'x' + selectedSize;
    }
}

function configureNavigation() {
    board = document.getElementById('board');
    startBtn = document.getElementById('start');
    stopBtn = document.getElementById('stop');
    saveBtn = document.getElementById('save');
    resultBtn = document.getElementById('result');
    movesLabel = document.getElementById('moves');
    timeLabel = document.getElementById('time');
    selectedSizeLabel = document.querySelector('#selected-size span');
    otherSizeBtnPannel = document.getElementById('other-size');

    stopBtn.addEventListener('click', stopBtnCkickHandler)
    board.addEventListener('click', boardClickHandler);
    startBtn.addEventListener('click', startBtnClickHandler);
    otherSizeBtnPannel.addEventListener('click', changeSizeHandler);
}
function init() {
    // debugger;
    configureNavigation();
    // setupBoard();
    otherSizeBtnPannel.querySelectorAll('a')[sizeId()].click();
    calcZeroPos();
}

window.addEventListener('load', init);