
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

const draggable = document.getElementById('draggable');
const coordinatesDisplay = document.getElementById('coordinates');

let isDragging = false;
let offsetX, offsetY;
let velocityX = 2, velocityY = 2; // Initial velocity for bouncing
let lastMoveTime = null;

function updateCoordinates(x, y) {
    coordinatesDisplay.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
}

function moveDraggable() {
    if (!isDragging) {
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

    requestAnimationFrame(moveDraggable); // Continue the bouncing animation
}

function startDragging(e) {
    e.preventDefault(); // Prevent default behavior like scrolling on touch devices

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (!isDragging) {
        offsetX = clientX - draggable.getBoundingClientRect().left;
        offsetY = clientY - draggable.getBoundingClientRect().top;
        isDragging = true;
        draggable.style.cursor = 'grabbing';

        // Temporarily stop bouncing while dragging
        velocityX = 0;
        velocityY = 0;
    } else {
        isDragging = false;
        draggable.style.cursor = 'grab';

       
    }
}

function drag(e) {
    if (isDragging) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        draggable.style.left = `${clientX - offsetX}px`;
        draggable.style.top = `${clientY - offsetY}px`;
        updateCoordinates(clientX - offsetX, clientY - offsetY);

        lastMoveTime = Date.now();
    }
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
        draggable.style.cursor = 'grab';
    }
}

// Event listeners
draggable.addEventListener('mousedown', startDragging);
draggable.addEventListener('touchstart', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

// Start the bouncing animation
moveDraggable();