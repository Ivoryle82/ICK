import { animateText } from '../utils/typeWriter';
import CardComponent from '../components/CardComponent';
import Phaser from 'phaser';
import StatsUI from '../components/StatsUI';

class FamilyIssue extends Phaser.Scene{
    constructor() {
        super({ key: 'FamilyIssue' });
    }
    init(data) {
        this.playerStats = data.playerStats;
        this.playerStats.daysRemaining -= 30;
    }
    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }
    create() {
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.StatsUI = new StatsUI(this);
        this.StatsUI.create();
        this.showScenario();
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
        new CardComponent(this, text , options);
    }
}

export default FamilyIssue;