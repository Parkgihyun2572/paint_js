const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const colorBtns = document.querySelectorAll(".color");

canvas.width

let painting = false;
let currentColor = "black";

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

canvas.addEventListener("mousemove", checkMousePosition);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
Array.from(colorBtns).forEach(color => color.addEventListener("click", getColor));