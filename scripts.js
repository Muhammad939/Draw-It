const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn'); // New clear button

let painting = false;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background image
const backgroundImage = new Image();
backgroundImage.src = 'public/images/solidwhite.png'; // Replace 'path/to/your/image.png' with the actual path to your PNG image

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

    // Check if touchscreen event
    if (e.touches) {
        const touch = e.touches[0];
        context.lineTo(touch.clientX, touch.clientY);
    } else {
        context.lineTo(e.clientX, e.clientY);
    }

    context.stroke();
    context.beginPath();
    // Check if touchscreen event
    if (e.touches) {
        const touch = e.touches[0];
        context.moveTo(touch.clientX, touch.clientY);
    } else {
        context.moveTo(e.clientX, e.clientY);
    }
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

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

downloadBtn.addEventListener('click', downloadCanvasAsPng);
clearBtn.addEventListener('click', clearCanvas); // Add event listener for clear button
