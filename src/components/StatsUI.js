import Phaser from 'phaser';

class StatsUI {
    constructor(scene) {
        this.scene = scene;
        this.healthText = null;
        this.moneyText = null;
        this.skillsText = null;
        this.daysText = null;
        this.background = null;
    }

    create() {
        const width = this.scene.scale.width;
        const height = 50; // Height of the nav bar

        // Create background for the nav bar
        this.background = this.scene.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        // Create health text
        this.healthText = this.scene.add.text(10, 10, `Health: ${this.scene.playerStats.health}`, {
            fontSize: '18px',
            fill: '#ff0000', // Red color for health
            fontStyle: 'bold'
        });

        // Create money text
        this.moneyText = this.scene.add.text(200, 10, `Money: $${this.scene.playerStats.money}`, {
            fontSize: '18px',
            fill: '#00ff00', // Green color for money
            fontStyle: 'bold'
        });

        // Create skills text
        this.skillsText = this.scene.add.text(400, 10, `Skills: ${this.scene.playerStats.skills}`, {
            fontSize: '18px',
            fill: '#0000ff', // Blue color for skills
            fontStyle: 'bold'
        });

        // Create days remaining text
        this.daysText = this.scene.add.text(600, 10, `Days Remaining: ${this.scene.playerStats.days}`, {
            fontSize: '18px',
            fill: '#ffff00', // Yellow color for days remaining
            fontStyle: 'bold'
        });
    }

    update() {
        this.healthText.setText(`Health: ${this.scene.playerStats.health}`);
        this.moneyText.setText(`Money: $${this.scene.playerStats.money}`);
        this.skillsText.setText(`Skills: ${this.scene.playerStats.skills}`);
        this.daysText.setText(`Days Remaining: ${this.scene.playerStats.days}`);
    }
}

export default StatsUI;