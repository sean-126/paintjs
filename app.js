const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    //  console.log(event)
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y)
    if (!painting) {
        // console.log("creating path in", x, y);
        // console.log(painting) 
        ctx.beginPath(); // 캔버스 안에서 보이지 않는 선을 그린다
        ctx.moveTo(x, y); // 시작점을 옮긴다?
    } else {
        // console.log("creating line in", x, y);
        // console.log(painting)
        ctx.lineTo(x, y); // 라인의 시작점 좌표
        ctx.stroke(); // 좌표들을 잇는 함수
    }
}

function handleClickColor(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;

}

function handleModeClick(event) {
    // console.log(event);
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleClearClick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    
}

Array.from(colors).forEach(color => color.addEventListener("click", handleClickColor));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn) {
    clearBtn.addEventListener("click", handleClearClick);
}