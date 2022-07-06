const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const span = document.createElement("span");

const colorBtns = document.querySelectorAll(".color");
const btns = document.querySelectorAll(".btn");
const paintingBtn = document.querySelector("#paintingJS");
const erasingBtn = document.querySelector("#erasingJS");
const paintingBackgroundBtn = document.querySelector("#paintingBackgroundJS");
const makingSquareBtn = document.querySelector("#makingSquareJS");
const currentToolState = document.querySelector(".currentTool span:last-child");
const sizeController = document.querySelector(".currentSizeForm input");
const currentSizeState = document.querySelector(".currentSize");

const PAINTING = "painting";
const ERASING = "erasing";
const PAINTING_BACKGROUND = "painting background";
const MAKING_SQUARE = "making sqaure";

const canvasSizeX = 500;
const canvasSizeY = 500;

let currentTool = PAINTING;
let painting = false;
let currentColor = "black";

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

function eraseMousePosition(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = "white";
    if (!painting) {
        ctx.beginPath(x, y);
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function paintAllCanvas() {
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, canvasSizeX, canvasSizeY);
}

let startXForMakingSquare = 0;
let startYForMakingSquare = 0;

function checkStartPositionForMakingSquare(event) {
    startXForMakingSquare = event.offsetX;
    startYForMakingSquare = event.offsetY;
    startPainting();
}

function paintSquare(event) {
    if (painting === true) {
        const x = event.offsetX;
        const y = event.offsetY;
        const width = x - startXForMakingSquare;
        const height = y - startYForMakingSquare;
        ctx.fillStyle = currentColor;
        ctx.fillRect(startXForMakingSquare, startYForMakingSquare, width, height);
    }
    stopPainting();
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function getColor(event) {
    currentColor = event.target.style.backgroundColor;
    console.log("Current Color is "+currentColor);
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
    } else if (currentTool === ERASING) {
        canvas.removeEventListener("mousemove", eraseMousePosition);
        canvas.removeEventListener("mousedown", startPainting);
        canvas.removeEventListener("mouseup", stopPainting);
        canvas.removeEventListener("mouseleave", stopPainting);
        ctx.strokeStyle = currentColor;
    } else if (currentTool === PAINTING_BACKGROUND) {
        canvas.removeEventListener("click", paintAllCanvas);
    } else if (currentTool === MAKING_SQUARE) {
        canvas.removeEventListener("mousedown", checkStartPositionForMakingSquare);
        canvas.removeEventListener("mouseup", paintSquare);
        canvas.removeEventListener("mouseleave", paintSquare);
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
}

function showCurrentTool() {
    if (currentTool === PAINTING) {
        currentToolState.innerHTML = "<i class=\"fa-solid fa-pen\"></i>"
    } else if (currentTool === ERASING) {
        currentToolState.innerHTML = "<i class=\"fa-solid fa-eraser\"></i>"
    } else if (currentTool === PAINTING_BACKGROUND) {
        currentToolState.innerHTML = "<i class=\"fa-solid fa-fill-drip\"></i>"
    } else if (currentTool === MAKING_SQUARE) {
        currentToolState.innerHTML = "<i class=\"fa-solid fa-square\"></i>"
    }
}

function checkCurrentTool() {
    if (currentTool === PAINTING) {
        canvas.addEventListener("mousemove", checkMousePosition);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
    } else if(currentTool === ERASING) {
        canvas.addEventListener("mousemove", eraseMousePosition);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
    } else if (currentTool === PAINTING_BACKGROUND) {
        canvas.addEventListener("click", paintAllCanvas);
    } else if (currentTool === MAKING_SQUARE) {
        canvas.addEventListener("mousedown", checkStartPositionForMakingSquare);
        canvas.addEventListener("mouseup", paintSquare);
        canvas.addEventListener("mouseleave", paintSquare);
    }
    console.log("Current Tool is " + currentTool);
    showCurrentTool();
}

function showCurrentColor() {
    const currentColorSpan = span;
    currentColorSpan.setAttribute("style", "background-color = " + currentColor);
    currentColorSpan.setAttribute("width", "10px");
    currentColorSpan.setAttribute("height", "10px");
    currentSizeState.appendChild(currentColorSpan);
}

function checkCurrentColor() {
    Array.from(colorBtns).forEach(color => color.addEventListener("click", getColor));
    showCurrentColor();
}

function checkSizeFromInput() {
    const currentSize = sizeController.value
    ctx.lineWidth = currentSize;
    console.log("Current Size = " + currentSize);
}

const eraseWholeCanvasBtn = document.querySelector(".eraseWholeCanvasBtnJS");

function eraseWholeCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasSizeX, canvasSizeY);
}

function makeErasingWholeCanvasBtn() {
    eraseWholeCanvasBtn.addEventListener("click", eraseWholeCanvas);
}

makeBtnsInteractive();
makeToolChangers();
checkCurrentTool();
checkCurrentColor();
makeErasingWholeCanvasBtn();