const draggable = document.getElementById('draggable');
const coordinatesDisplay = document.getElementById('coordinates');

let isDragging = false;
let offsetX, offsetY;
let velocityX = 2, velocityY = 2; // Initial velocity for bouncing

function updateCoordinates(x, y) {
    coordinatesDisplay.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
}

function moveDraggable(e) {
    if (isDragging) {
        const touch = e.touches ? e.touches[0] : e;
        draggable.style.left = `${touch.clientX - offsetX}px`;
        draggable.style.top = `${touch.clientY - offsetY}px`;
        updateCoordinates(touch.clientX - offsetX, touch.clientY - offsetY);
    } else {
        const rect = draggable.getBoundingClientRect();
        let left = rect.left + velocityX;
        let top = rect.top + velocityY;

        // Bounce off the edges of the window
        if (left <= 0 || left + rect.width >= window.innerWidth) {
            velocityX = -velocityX;
        }
        if (top <= 0 || top + rect.height >= window.innerHeight) {
            velocityY = -velocityY;
        }

        draggable.style.left = `${left}px`;
        draggable.style.top = `${top}px`;
        updateCoordinates(left, top);
    }
}

function startDragging(e) {
    const touch = e.touches ? e.touches[0] : e;
    if (!isDragging) {
        offsetX = touch.clientX - draggable.getBoundingClientRect().left;
        offsetY = touch.clientY - draggable.getBoundingClientRect().top;
        isDragging = true;
        draggable.style.cursor = 'grabbing';
    } else {
        isDragging = false;
        draggable.style.cursor = 'pointer';
    }
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
        draggable.style.cursor = 'pointer';
    }
}

// Event listeners for both mouse and touch events
draggable.addEventListener('mousedown', startDragging);
draggable.addEventListener('touchstart', startDragging);
document.addEventListener('mousemove', moveDraggable);
document.addEventListener('touchmove', moveDraggable);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchcancel', stopDragging);


// Bouncing animation
function bounce() {
    moveDraggable();
    requestAnimationFrame(bounce); // Continue the bouncing animation
}
bounce(); // Start the bouncing animation


function updateClock() {
    const now = new Date();
    const estOffset = -5 * 60; // EST offset in minutes (-5 hours from UTC)
    const estTime = new Date(now.getTime() + (now.getTimezoneOffset() + estOffset) * 60000);
    
    const hours = String(estTime.getHours()).padStart(2, '0');
    const minutes = String(estTime.getMinutes()).padStart(2, '0');
    const seconds = String(estTime.getSeconds()).padStart(2, '0');
    const milliseconds = String(estTime.getMilliseconds()).padStart(3, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

setInterval(updateClock, 1); // Update every millisecond
updateClock(); // Initial call to display the time immediately