/**
 * Create typewriter animation for text
 * @param {Phaser.GameObjects.Text} target
 * @param {number} [speedInMs=25]
 * @returns {Promise<void>}
 */
 export function animateText(target, speedInMs = 25) {
    // Store original text
    const message = target.text;
    const invisibleMessage = message.replace(/[^ ]/g, " "); // Keeps spacing
  
    // Clear text on screen
    target.text = "";
  
    // Mutable state for visible text
    let visibleText = "";
  
    // Use a Promise to wait for the animation to complete
    return new Promise((resolve) => {
      const timer = target.scene.time.addEvent({
        delay: speedInMs,
        loop: true,
        callback() {
          // If all characters are visible, stop the timer
          if (target.text === message) {
            timer.destroy();
            resolve();
            return;
          }
  
          // Add next character to visible text
          visibleText += message[visibleText.length];
  
          // Right pad with invisibleText (for smooth effect)
          const invisibleText = invisibleMessage.substring(visibleText.length);
  
          // Update text on screen
          target.text = visibleText + invisibleText;
        },
      });
    });
  }
  