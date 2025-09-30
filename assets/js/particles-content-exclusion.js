// Custom particles.js modification to exclude central content area
function addContentAreaExclusion() {
  // Wait for particles to be initialized
  setTimeout(function() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const pJS = window.pJSDom[0].pJS;
      
      // Define the content area boundaries (in percentages)
      const contentArea = {
        left: 0.25,   // 25% from left
        right: 0.75,  // 75% from left (so 25% from right)
        top: 0.10,   // 10% from top
        bottom: 0.90 // 90% from top (so 10% from bottom)
      };
      
      // Store original particle update function
      const originalUpdateParticle = pJS.fn.particlesUpdate;
      
      // Override particle update function
      pJS.fn.particlesUpdate = function() {
        // Call original update
        originalUpdateParticle.call(this);
        
        // Check each particle and modify its position if it's in the content area
        for (let i = 0; i < pJS.particles.array.length; i++) {
          const particle = pJS.particles.array[i];
          
          // Convert particle position to percentage
          const xPercent = particle.x / pJS.canvas.w;
          const yPercent = particle.y / pJS.canvas.h;
          
          // Check if particle is in the content area
          if (xPercent > contentArea.left && xPercent < contentArea.right &&
              yPercent > contentArea.top && yPercent < contentArea.bottom) {
            
            // Calculate distances to each edge of the content area
            const distToLeft = Math.abs(xPercent - contentArea.left);
            const distToRight = Math.abs(xPercent - contentArea.right);
            const distToTop = Math.abs(yPercent - contentArea.top);
            const distToBottom = Math.abs(yPercent - contentArea.bottom);
            
            // Find the closest edge
            const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
            
            // Move particle to the closest edge with a small offset
            const offset = 0.05; // 5% offset
            
            if (minDist === distToLeft) {
              // Move to left edge
              particle.x = (contentArea.left - offset) * pJS.canvas.w;
            } else if (minDist === distToRight) {
              // Move to right edge
              particle.x = (contentArea.right + offset) * pJS.canvas.w;
            } else if (minDist === distToTop) {
              // Move to top edge
              particle.y = (contentArea.top - offset) * pJS.canvas.h;
            } else if (minDist === distToBottom) {
              // Move to bottom edge
              particle.y = (contentArea.bottom + offset) * pJS.canvas.h;
            }
            
            // Optionally reverse direction to create a "bounce" effect
            if (minDist === distToLeft || minDist === distToRight) {
              particle.vx = -particle.vx;
            } else {
              particle.vy = -particle.vy;
            }
          }
        }
      };
    }
  }, 100); // Wait 100 milliseconds for particles to initialize
}

// Call the function when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addContentAreaExclusion);
} else {
  addContentAreaExclusion();
}