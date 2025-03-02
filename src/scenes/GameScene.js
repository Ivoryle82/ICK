
import Phaser from 'phaser';
import CardComponent2 from '../components/CardComponent2';
import { animateText } from '../utils/typeWriter';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.stats = {
            health: 100,
            money: 100,
            skills: 100,
            daysRemaining: 60
        };
    }

    preload() {
        this.load.image('job_background', 'assets/images/JobSceneBackground.png');
        this.load.image('closeup', 'assets/images/CloseUp.png');
        this.load.image('textbox', 'assets/images/TextBox.png');
    }

    create() {
        const job_bg = this.add.image(0, 0, 'job_background').setOrigin(0, 0);
        job_bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.showScenario();
    }

    showScenario() {
        const popup1 = "Luckily, you have many connections from your last job that can help you find a new one.";
        const popup2 = "With your great experience, it should be no problem for you to cold apply to new positions.";
        const popup3 = "You have many great accomplishments and are at the top of your field. Maybe you should try to apply for a self petition VISA? With this, you would not need an employer to sponsor you.";
        const popupTexts = [popup1, popup2, popup3];

        const options = [
            { text: "Network", statsChange: { health: -10, money: -10, skills: +20 }, info: "Thankfully, I have many connections from my last job! Hopefully I can get a job from them..."},
            { text: "Cold Apply", statsChange: { health: +20, money: -20, skills: 0 }, info: "With my experience, I'm sure I could just cold apply and get a new job!"},
            { text: "Self Petition Visa", statsChange: { health: +20, money: -20, skills: 0 }, info: "I do have many great accomplishments in research and my field, so this VISA should not be too complicated to get..."},
        ];
        
        new CardComponent2(this, 
            "Now that you are unemployed, you are forced to start using your savings. Money is getting tight, and you do not have much time left. How will you get a job?", 
            options, popupTexts, this.updateStats(3));
        
    }

    updateStats(statsChange) {
        this.stats.health += statsChange.health;
        this.stats.money += statsChange.money;
        this.stats.skills += statsChange.skills;
        this.stats.daysRemaining -= 1;

        console.log('Updated Stats:', this.stats);
    }

    nextScenario() {
        // Logic to show the next scenario or end the game
        if (this.stats.daysRemaining <= 0) {
            this.scene.start('EndScene');
        } else {
            this.showScenario();
        }
    }

    endGame() {
        // Evaluate stats and transition to EndScene
        this.scene.start('EndScene', { health: this.stats.health, money: this.stats.money, skills: this.stats.skills });
    }
}

export default GameScene;
