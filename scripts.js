const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');

let painting = false;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background image
const backgroundImage = new Image();
backgroundImage.src = 'path/to/your/image.png'; // Replace 'path/to/your/image.png' with the actual path to your PNG image

// Draw the background image on the canvas
backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    context.beginPath();
}

function draw(e) {
    if (!painting) return;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
}

function downloadCanvasAsPng() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

downloadBtn.addEventListener('click', downloadCanvasAsPng);
