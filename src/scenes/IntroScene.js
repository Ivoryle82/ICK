import Phaser from 'phaser';
import StatsUI from '../components/StatsUI';

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
        this.playerStats={
            health: 100,
            money: 50,
            skills: 5,
            daysRemaining: 60
        };
        this.StatsUI = new StatsUI(this);
        this.StatsUI.create();

        let updateHealth = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "Update health", { fontSize: '32px', fill: '#000' }).setInteractive();
        updateHealth.on('pointerover', () => {
            this.playerStats.health -= 5;
            this.StatsUI.update();
        })


        // Display the introductory card
        this.add.text(this.sys.game.config.width / 2, 100, 'Welcome to the Game!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        // Start button
        this.input.once('pointerdown', () => {
            this.bgMusic.stop();
            this.scene.start('GameScene', { health: this.health, money: this.money, skills: this.skills, daysRemaining: this.daysRemaining });
        });
    }
}

export default IntroScene;