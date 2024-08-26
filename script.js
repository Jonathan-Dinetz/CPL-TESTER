const draggable = document.getElementById('draggable');
        const coordinatesDisplay = document.getElementById('coordinates');
        
        let isDragging = false;
        let offsetX, offsetY;
        let velocityX = 1, velocityY = 1; // Initial velocity for bouncing
        const dragThreshold = 10; // Minimum distance to consider dragging
        
        function updateCoordinates(x, y) {
            coordinatesDisplay.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
        }
        
        function moveDraggable(e) {
            if (isDragging) {
                draggable.style.left = `${e.clientX - offsetX}px`;
                draggable.style.top = `${e.clientY - offsetY}px`;
                updateCoordinates(e.clientX - offsetX, e.clientY - offsetY);
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
            if (!isDragging) {
                offsetX = e.clientX - draggable.getBoundingClientRect().left;
                offsetY = e.clientY - draggable.getBoundingClientRect().top;
                isDragging = true;
                draggable.style.cursor = 'grabbing';
            } else {
                isDragging = false;
                draggable.style.cursor = 'grab';
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
        
        document.addEventListener('mousemove', moveDraggable);
        document.addEventListener('mouseup', stopDragging);
        
        // Bouncing animation
        function bounce() {
            moveDraggable();
            requestAnimationFrame(bounce); // Continue the bouncing animation
        }
        
        bounce(); // Start the bouncing animation