class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
        // Add other assets as needed
    }

    create() {
        // Start the IntroScene after assets are loaded
        this.scene.start('IntroScene');
    }
}

export default BootScene;