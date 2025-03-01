import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }

    create() {
        // Add background image
        this.add.image(400, 300, 'background');

        // Play background music
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.play({ loop: true });

        // Initialize stats
        this.health = 100;
        this.money = 50;
        this.skills = 5;
        this.daysRemaining = 60;

        // Display the introductory card
        this.add.text(400, 300, 'Welcome to the Game!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);
        
        // Display initial stats
        this.displayStats();

        // Start button
        this.input.once('pointerdown', () => {
            this.bgMusic.stop();
            this.scene.start('GameScene', { health: this.health, money: this.money, skills: this.skills, daysRemaining: this.daysRemaining });
        });
    }

    displayStats() {
        this.add.text(100, 200, `Health: ${this.health}`, { fontSize: '20px', fill: '#fff' });
        this.add.text(100, 220, `Money: $${this.money}`, { fontSize: '20px', fill: '#fff' });
        this.add.text(100, 240, `Skills: ${this.skills}`, { fontSize: '20px', fill: '#fff' });
        this.add.text(100, 260, `Days Remaining: ${this.daysRemaining}`, { fontSize: '20px', fill: '#fff' });
    }
}

export default IntroScene;