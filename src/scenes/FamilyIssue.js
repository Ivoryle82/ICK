import { animateText } from '../utils/typeWriter';
import CardComponent from '../components/CardComponent';
import Phaser from 'phaser';

class FamilyIssue extends Phaser.Scene{
    constructor() {
        super({ key: 'FamilyIssue' });
    }
    init(data) {
        this.stats = {
            health: 100,
            skills: 25,
            money: 100
        }
        // this.health = data.health;
        // this.skills = data.skills;
        // this.money = data.money;
        // this.choices = data.choices;
    }
    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }
    create() {
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.showScenario();
        // let message = 
        // `Oh no! You've just received even more terrible news. Your mom back home has fallen ill. Your siblings have reached out to you for financial help as you are the breadwinner of the family. 
        // However, you don't have an emergency fund and sending money home will put you in a tight financial situation. You have yet to find a new job and this could be a hole that you can't dig yourself out of.
        
        // Do you send any remaining money you have or keep it to use for yourself?
        // `;

        // const textBoxWidth = 600;
        // const textBoxHeight = 350;
        // const textBoxX = this.cameras.main.centerX - (textBoxWidth / 2); // Center the text box horizontally
        // const textBoxY = this.cameras.main.centerY - (textBoxHeight * 3 / 4); // Center the text box vertically
        // this.add.rectangle(textBoxX, textBoxY, textBoxWidth, textBoxHeight, 0x000000).setOrigin(0, 0).setAlpha(0.7);

        // // Create the text object with improved formatting
        // const textObject = this.add.text(textBoxX + 20, textBoxY + 20, message, {
        //     font: '18px Arial',
        //     fill: '#fff',
        //     wordWrap: { width: textBoxWidth - 40, useAdvancedWrap: true },  // Add padding to the sides
        //     lineSpacing: 10  // Add spacing between lines for readability
        // });

        // // Animate text (you can define your custom animation here)
        // animateText(textObject);
        
        // // this.add.graphics().fillStyle(0x808080).fillEllipse(this.cameras.main.centerX - 130, this.cameras.main.centerY + 55, 250,60);

        // // this.add.graphics().fillStyle(0x808080).fillEllipse(this.cameras.main.centerX + 130, this.cameras.main.centerY + 55, 250,60);
        
        // let button1 = this.add.text(this.cameras.main.centerX - 125, this.cameras.main.centerY + 50, 'Send the money', { fontSize: '24px', fill: '#fff'}).setPadding(32).setOrigin(0.5).setInteractive().setScale(1);
        // let button2 = this.add.text(this.cameras.main.centerX + 125, this.cameras.main.centerY + 50, 'Keep the money', { fontSize: '24px', fill: '#fff'}).setPadding(32).setOrigin(0.5).setInteractive();

        // button2.on('pointerover', function(pointer){
        //     button2.setScale(1.1);
        // });
        // button2.on('pointerout', function(pointer){
        //     button2.setScale(1);
        // });
        // button2.on('pointerdown', function(pointer){
        //     console.log('keep the money');
        // });

        // button1.on('pointerover', function(pointer){
        //     button1.setScale(1.1);
        // });
        // button1.on('pointerout', function(pointer){
        //     button1.setScale(1);
        // });
        // button1.on('pointerdown', function(pointer){
        //     console.log('give the money');
        // });
    }
    showScenario(){
        const options = [
            {text: 'Keep the money', statsChange: {health: -25, money: 0, skills: 0}},
            {text: 'Give the money', statsChange: {health: 0, money: -50, skills: 0}}
        ]
        let text = `Oh no! You've just received even more terrible news. Your mom back home has fallen ill. Your siblings have reached out to you for financial help as you are the breadwinner of the family. 
        However, you don't have an emergency fund and sending money home will put you in a tight financial situation. You have yet to find a new job and this could be a hole that you can't dig yourself out of.
        
        Do you send any remaining money you have or keep it to use for yourself?
        `;
        new CardComponent(this, text , options, this.updateStats(3));
    }
    updateStats(statsChange) {
        this.stats.health += statsChange.health;
        this.stats.money += statsChange.money;
        this.stats.skills += statsChange.skills;
        this.stats.daysRemaining -= 1;

        console.log('Updated Stats:', this.stats);
    }
}

export default FamilyIssue;