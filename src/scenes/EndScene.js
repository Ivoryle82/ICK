import { animateText } from '../utils/typeWriter';

class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    init(data) {
        this.health = data.health;
        this.skills = data.skills;
        this.money = data.money;
        this.choices = data.choices;
    }

    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }

    create() {
        const textBoxWidth = 600;
        const textBoxHeight = 700;
        const textBoxX = this.cameras.main.centerX - (textBoxWidth / 2); // Center the text box horizontally
        const textBoxY = this.cameras.main.centerY - (textBoxHeight / 2); // Center the text box vertically
        
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setOrigin(0.5, 0.5);
        
        this.add.rectangle(textBoxX - 100, textBoxY, textBoxWidth + 200, textBoxHeight, 0x000000).setOrigin(0, 0).setAlpha(0.7);
        
        this.add.text(this.cameras.main.centerX, 100, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        //replace hard coded values with passed info from init
        let endingMessage = this.getEndingMessage(5 ,0 ,6);
        endingMessage = this.add.text(textBoxX + 20, 200, endingMessage, { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
        animateText(endingMessage);
        setTimeout(() => {
            let choice1 = this.add.text(textBoxX + 20, 250, 'Choice 1: ' + 'this was the choice you made', { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
            animateText(choice1);
            setTimeout(() => {
                let choice2 = this.add.text(textBoxX + 20, 300, 'Choice 2: ' + 'this was another choice you made', { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
                animateText(choice2);
            },1500);
        },1500);

        let more = this.add.text(this.scale.width/2, 425, 'Click here to find out more about your decisions and their real world impacts', { fontSize: '20px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.5);
        more.setInteractive();
        more.on('pointerdown', function(pointer) {
            let newWindow = window.open("https://www.usich.gov/guidance-reports-data/data-trends");
        });

        let us = this.add.text(this.scale.width/2, 650, 'About us', { fontSize: '20px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true}}).setInteractive().setOrigin(0.5);
        us.on('pointerdown', () => {
            this.scene.start('AboutUs');
        })

        this.add.text(this.scale.width/2, 550, 'Press R to Restart', { fontSize: '20px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.5);

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('BootScene');
        });
    }

    getEndingMessage(health,money, skills) {
        //const { health, money, skills } = this.stats;

        if (money > 0 && skills > 5 && health > 50) {
            return 'Good Ending: You found a job and are thriving!';
        } else if (health <= 0 || money <= 0) {
            return 'Bad Ending: You ran out of time and resources.';
        } else {
            return 'Open-ended: Your journey continues, but the future is uncertain.';
        }
    }
      
}

export default EndScene;