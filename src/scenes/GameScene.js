import Phaser from 'phaser';
import CardComponent from '../components/CardComponent';
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
    }

    create() {
        const job_bg = this.add.image(0, 0, 'job_background').setOrigin(0, 0);
        job_bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.showScenario();
    }

    showScenario() {
        const options = [
            { text: "Network", statsChange: { health: -10, money: -10, skills: +20 } },
            { text: "Cold Apply", statsChange: { health: +20, money: -20, skills: 0 } },
            { text: "Self Petition Visa", statsChange: { health: +20, money: -20, skills: 0 } },
        ];
        
        new CardComponent(this, "You have been laid off. What will you do?", options, this.updateStats(3));
        
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