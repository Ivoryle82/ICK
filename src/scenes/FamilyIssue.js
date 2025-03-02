
import { animateText } from '../utils/typeWriter';
import CardComponent2 from '../components/CardComponent2';
import Phaser from 'phaser';
import StatsUI from '../components/StatsUI';

class FamilyIssue extends Phaser.Scene{
    constructor() {
        super({ key: 'FamilyIssue' });
    }
    init(data) {
        this.playerStats = data.playerStats;
        this.playerStats.daysRemaining -= 30;
        this.selectedOptions = data.selectedOptions; // Get the selected options passed from GameScene
    }
    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('roomBg', 'assets/images/NYCRoom3.jpeg');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }
    create() {
        const bg = this.add.image(0, 0, 'roomBg').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.StatsUI = new StatsUI(this);
        this.StatsUI.create();
        this.showScenario();
    }
    showScenario(){
        const options = [
            {text: 'Keep the money', statsChange: {health: -25, money: 0, skills: 0}, info: "I don't have much money left, and this apartment is getting too expensive for me. I have to do this.."},
            {text: 'Give the money', statsChange: {health: 0, money: -50, skills: 0}, info: "I came to this country to give my family a better life, so I must help in any way possible.."}
        ]
        //let text = `Oh no! You've just received even more terrible news. Your mom back home has fallen ill. Your siblings have reached out to you for financial help as you are the breadwinner of the family. However, you don't have an emergency fund and sending money home will put you in a tight financial situation. You have yet to find a new job and this could be a hole that you can't dig yourself out of.
        //Do you send any remaining money you have or keep it to use for yourself?
        //`;
        let text = `Oh no! You've just received terrible news —- your mom is ill, and your siblings need financial help. As the breadwinner, you're expected to send money, but being unemployed leaves you with little money. Do you send the money or keep it for yourself?`;

        //new CardComponent2(this, text , options);
        new CardComponent2(this, 
            text, 
            options,  
            (statsChange) => this.updateStats(statsChange),
            (selectedOption) => {
                this.playerStats.health += selectedOption.health;
                this.playerStats.money += selectedOption.money;
                this.playerStats.skills += selectedOption.skills;
                this.selectedOptions.push(selectedOption.text);
                this.scene.start('EndScene', { playerStats: this.playerStats, selectedOptions: this.selectedOptions }); // Now only starts after Continue is clicked
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
}

export default FamilyIssue;
