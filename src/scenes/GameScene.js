
import Phaser from 'phaser';
import CardComponent2 from '../components/CardComponent2';
import { animateText } from '../utils/typeWriter';
import StatsUI from '../components/StatsUI';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.playerStats = {
            health: 100,
            money: 100,
            skills: 100,
            daysRemaining: 60
        };
        this.selectedOptions = [];
    }

    preload() {
        this.load.image('job_background', 'assets/images/NewYorkStreet.png');
        this.load.image('closeup', 'assets/images/CloseUp.png');
        this.load.image('textbox', 'assets/images/TextBox.png');
    }

    create() {
        const job_bg = this.add.image(0, 0, 'job_background').setOrigin(0, 0);
        job_bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.StatsUI = new StatsUI(this);
        this.StatsUI.create();
        this.showScenario();
    }

    showScenario() {
    
        const options = [
            { text: "Network", statsChange: { health: -10, money: -10, skills: +20 }, info: "Thankfully, I have many connections from my last job! Hopefully I can get a job from them..."},
            { text: "Cold Apply", statsChange: { health: +20, money: -20, skills: 0 }, info: "With my experience, I'm sure I could just cold apply and get a new job!"},
            { text: "Self Petition Visa", statsChange: { health: +20, money: -20, skills: 0 }, info: "I do have many great accomplishments in research and my field, so this VISA should not be too complicated to get..."},
        ];
        
        new CardComponent2(this, 
            "Now that you are unemployed, you are forced to start using your savings. Money is getting tight, and you do not have much time left. How will you get a job?", 
            options,  
            (statsChange) => this.updateStats(statsChange),
            (selectedOption) => {
                this.playerStats.health += selectedOption.health;
                this.playerStats.money += selectedOption.money;
                this.playerStats.skills += selectedOption.skills;
                this.scene.start('FamilyIssue', {playerStats: this.playerStats, selectedOptions: this.selectedOptions}); // Pass selected options to next scene
            }
        );
    }

    updateStats(statsChange) {
        this.playerStats.health += statsChange.health;
        this.playerStats.money += statsChange.money;
        this.playerStats.skills += statsChange.skills;
        this.playerStats.daysRemaining -= 1;

        console.log('Updated Stats:', this.playerStats);
    }

    nextScenario(option) {

    }

    endGame() {
        // Evaluate stats and transition to EndScene
        this.scene.start('EndScene', { health: this.stats.health, money: this.stats.money, skills: this.stats.skills });
    }
}

export default GameScene;
