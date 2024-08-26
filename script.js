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
document.addEventListener('touchend', stopDragging);

// Bouncing animation
function bounce() {
    moveDraggable();
    requestAnimationFrame(bounce); // Continue the bouncing animation
}

bounce(); // Start the bouncing animation