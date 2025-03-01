import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.image('mainCharacter', 'assets/images/main_char.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }

    create() {
        // Add background image and set its size to fit the screen
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Add main character image and set its size (adjust as needed)
        const mainCharacter = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'mainCharacter');
        mainCharacter.setDisplaySize(100, 100); // Adjust the size as needed

        // Play background music
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.play({ loop: true });

        // Initialize stats
        this.health = 100;
        this.money = 50;
        this.skills = 5;
        this.daysRemaining = 60;

        // Display the introductory card
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Welcome to the Game!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);
        
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