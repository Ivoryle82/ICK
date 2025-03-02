const gameConfig = {
    type: Phaser.AUTO, // Use Phaser.AUTO for the rendering context
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: '#ffffff',
    scale: {
        mode: Phaser.Scale.RESIZE, // Use Phaser.Scale.RESIZE for resizing
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
    },
    scene: [] // Scenes will be added in index.js
};

export default gameConfig;