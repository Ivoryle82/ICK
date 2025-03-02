import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/images/City1.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
        this.load.image('mainCharacter', 'assets/images/main_char.png');
        this.load.image('startButton', 'assets/images/start_button.png');  // Add a start button image
    }

    create() {
        // Set the background color of the website to black
        this.cameras.main.setBackgroundColor(0x000000);

        // Scale the game display smaller
        this.scale.setGameSize(window.innerWidth * 0.4, window.innerHeight * 0.4); // Set game size to 80% of window

        // Add an animated background effect (moving background, fading effect, etc.)
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setOrigin(0.5, 0.5);

        // Animate the background to make it more dynamic (move background slightly)
        this.tweens.add({
            targets: this.cameras.main,
            x: this.cameras.main.x + 5,  // Move the camera slightly on the x-axis for dynamic effect
            duration: 5000,
            repeat: -1,  // Loop the animation indefinitely
            yoyo: true,  // Make it bounce back
            ease: 'Sine.easeInOut'
        });

        // Introductory text to the player with added padding
        const introText = `
            You've just woken up to the worst news of your life. A notification from your manager tells you that you've been laid off — and to make matters worse, you're on a visa sponsorship in the United States. You have 60 days to find a new job or risk losing your right to stay in the country.
            Luckily, you've got some savings ($100), but your health is taking a hit. You've been burning the midnight oil, working overtime to finish projects, and now your health stands at a worrying 70. The stress is mounting, and your physical well-being could be a major obstacle in your job search.
            But there's hope. You're not just any applicant — you have outstanding skills in mechanical engineering (80). Your expertise, along with a bachelor's degree, should give you an edge in the competitive job market. 
            Will you be able to overcome the hurdles of time, health, and financial stress to secure a new job within 60 days? Or will the pressure break you before you find your way? Every decision counts.`;

        // Create a background rectangle for text readability, centered on screen
        const textBoxWidth = 600;
        const textBoxHeight = 700;
        const textBoxX = this.cameras.main.centerX - (textBoxWidth / 2); // Center the text box horizontally
        const textBoxY = this.cameras.main.centerY - (textBoxHeight / 2); // Center the text box vertically
        this.add.rectangle(textBoxX, textBoxY, textBoxWidth, textBoxHeight, 0x000000).setOrigin(0, 0).setAlpha(0.7);

        // Create the text object with improved formatting
        const textObject = this.add.text(textBoxX + 20, textBoxY + 20, introText, {
            font: '18px Arial',
            fill: '#fff',
            wordWrap: { width: textBoxWidth - 40, useAdvancedWrap: true },  // Add padding to the sides
            lineSpacing: 10  // Add spacing between lines for readability
        });

        // Animate text (you can define your custom animation here)
        animateText(textObject);

        // Play background music
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.play({ loop: true });

        // Create the "Start Game" button, smaller and centered at the bottom
        // how do i add start game in pixely font
        let startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 220, 'startButton').setInteractive().setScale(0.2);


        //make sure to delete this
        this.playerStats = {
            health: 100,
            money: 50,
            skills: 5,
            daysRemaining: 60
        };



        // Add an event listener for the button
        startButton.on('pointerdown', () => {
            this.bgMusic.stop();  // Stop the background music
            this.scene.start('GameScene');  // Transition to the next scene
        });

        // Add hover effect for the button
        startButton.on('pointerover', () => {
            startButton.setScale(0.3);  // Scale the button up on hover
        });

        startButton.on('pointerout', () => {
            startButton.setScale(0.2);  // Scale the button back to normal
        });
    }

    // create(){
    //     this.scene.start('FamilyIssue')
    // }
}

export default BootScene;
