import Phaser from 'phaser';
import CardComponent from '../components/CardComponent';

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
        // Load any necessary assets here
    }

    create() {
        this.add.text(400, 50, 'Game Scene', { fontSize: '32px', fill: '#000' }).setOrigin(0.5); // Change fill color to black
        this.showScenario();
    }

    showScenario() {
        const scenario = "You have been laid off. What will you do?";
        const options = [
            { text: "Look for a job", statsChange: { health: -10, money: -10, skills: +20 } },
            { text: "Take a break", statsChange: { health: +20, money: -20, skills: 0 } }
        ];

        new CardComponent(this, 400, 300, scenario, options, this.updateStats.bind(this));
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