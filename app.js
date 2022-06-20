const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const colorBtns = document.querySelectorAll(".color");
const btns = document.querySelectorAll(".btn");

const PAINTING = "painting";
const ERASING = "erasing";
const PAINTING_BACKGROUND = "painting background";
const MAKING_SQUARE = "making sqaure";
const MAKING_CIRCLE = "making circle";

let currentTool = PAINTING;
let painting = false;
let currentColor = "black";

const paintingBtn = document.querySelector("#paintingJS");
const erasingBtn = document.querySelector("#erasingJS");
const paintingBackgroundBtn = document.querySelector("#paintingBackgroundJS");
const makingSquareBtn = document.querySelector("#makingSquareJS");
const makingCircleBtn = document.querySelector("#makingCircleJS");

function changeToolForPainting() {
    resetCanvasEventListener();
    currentTool = PAINTING;
    checkCurrentTool();
}

function changeToolForErasing() {
    resetCanvasEventListener();
    currentTool = ERASING;
    checkCurrentTool();
}

function changeToolForPaintingBackground() {
    resetCanvasEventListener();
    currentTool = PAINTING_BACKGROUND;
    checkCurrentTool();
}

function changeToolForMakingSquare() {
    resetCanvasEventListener();
    currentTool = MAKING_SQUARE;
    checkCurrentTool();
}

function changeToolForMakingCircle() {
    resetCanvasEventListener();
    currentTool = MAKING_CIRCLE;
    checkCurrentTool();
}

function checkMousePosition(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = currentColor;
    if (!painting) {
        ctx.beginPath(x, y);
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function getColor(event) {
    currentColor = event.target.style.backgroundColor;
    console.log(currentColor);
}

function showPressBtn(event) {
    const btn = event.target;
    btn.classList.add("pressed-btn");
}

function returnPressedBtn(event) {
    const btn = event.target;
    btn.classList.remove("pressed-btn");
}

function resetCanvasEventListener() {
    if (currentTool === PAINTING) {
        canvas.removeEventListener("mousemove", checkMousePosition);
        canvas.removeEventListener("mousedown", startPainting);
        canvas.removeEventListener("mouseup", stopPainting);
        canvas.removeEventListener("mouseleave", stopPainting);
    } else if(currentTool === ERASING) {
    } else if (currentTool === PAINTING_BACKGROUND) {
    } else if (currentTool === MAKING_SQUARE) {
    } else if (currentTool === MAKING_CIRCLE) {
    }
}

function makeBtnsInteractive() {
    Array.from(btns).forEach(btn => btn.addEventListener("mousedown", showPressBtn));
    Array.from(btns).forEach(btn => btn.addEventListener("mouseup", returnPressedBtn));
    Array.from(btns).forEach(btn => btn.addEventListener("mouseleave", returnPressedBtn));
}

function makeToolChangers() {
    paintingBtn.addEventListener("click", changeToolForPainting);
    erasingBtn.addEventListener("click", changeToolForErasing);
    paintingBackgroundBtn.addEventListener("click", changeToolForPaintingBackground);
    makingSquareBtn.addEventListener("click", changeToolForMakingSquare);
    makingCircleBtn.addEventListener("click", changeToolForMakingCircle);
}

function checkCurrentTool() {
    if (currentTool === PAINTING) {
        canvas.addEventListener("mousemove", checkMousePosition);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
    } else if(currentTool === ERASING) {
    } else if (currentTool === PAINTING_BACKGROUND) {
    } else if (currentTool === MAKING_SQUARE) {
    } else if (currentTool === MAKING_CIRCLE) {
    }
    console.log(currentTool);
}

Array.from(colorBtns).forEach(color => color.addEventListener("click", getColor));

makeBtnsInteractive();
makeToolChangers();
checkCurrentTool();