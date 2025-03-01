const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: function() {
            // Preload assets here
        },
        create: function() {
            // Initialize game elements here
        },
        update: function() {
            // Game loop logic here
        }
    },
    backgroundColor: '#ffffff'
};

export default gameConfig;