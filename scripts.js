const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeButton = document.querySelector('.sizeButton');
const shareBtn = document.getElementById('shareBtn');

let painting = false;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background image
const backgroundImage = new Image();
backgroundImage.src = 'public/images/solidwhite.png';

// Draw the background image on the canvas
backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

// Function to handle brush size change
sizeButton.addEventListener('change', function() {
    context.lineWidth = parseInt(this.value);
});

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
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    // Get mouse/touch position
    const mouseX = e.clientX || e.touches[0].clientX;
    const mouseY = e.clientY || e.touches[0].clientY;

    // Draw line
    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.beginPath();
    context.moveTo(mouseX, mouseY);
}

function downloadCanvasAsPng() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'masterpiece.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // redraw background
}

function shareCanvas() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

// Button click events
downloadBtn.addEventListener('click', downloadCanvasAsPng);
clearBtn.addEventListener('click', clearCanvas);
shareBtn.addEventListener('click', shareCanvas);
