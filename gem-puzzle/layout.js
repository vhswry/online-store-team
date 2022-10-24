function initLayout() {
    document.body.innerHTML = `<div class="container">
    <div class="navigation">
        <div class="buttons">
            <button id="start" class="start">Shuffle and Start</button>
            <button id="stop" class="stop">Stop</button>
            <button id="save" class="save">Save</button>
            <button id="result" class="result">Result</button>
        </div>
        <div class="status">
            <span class="moves">Moves: <span id="moves">0</span></span>  
            <span class="time">Time: <span id="time">00:00</span></span>
        </div>
    </div>
    <div class="board" id="board">
    </div>
    <div class="size">
    <p class="selected-size" id="selected-size">Frame size: <span>4x4</span></p>
    <p class="other-size" id="other-size">Other size: 
        <a href="./">3x3</a>
        <a href="./">4x4</a>
        <a href="./">5x5</a>
        <a href="./">6x6</a>
        <a href="./">7x7</a>
        <a href="./">8x8</a>
    </p>
    </div>
</div>`;
}

window.addEventListener('load', () => initLayout())