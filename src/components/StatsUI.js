import Phaser from 'phaser';

class StatsUI {
    constructor(scene) {
        this.scene = scene;
        this.healthText = null;
        this.moneyText = null;
        this.skillsText = null;
        this.daysText = null;
    }

    create(x, y) {
        this.healthText = this.scene.add.text(x, y, `Health: ${this.scene.playerStats.health}`, {
            fontSize: '16px',
            fill: '#fff'
        });

        this.moneyText = this.scene.add.text(x, y + 20, `Money: $${this.scene.playerStats.money}`, {
            fontSize: '16px',
            fill: '#fff'
        });

        this.skillsText = this.scene.add.text(x, y + 40, `Skills: ${this.scene.playerStats.skills}`, {
            fontSize: '16px',
            fill: '#fff'
        });

        this.daysText = this.scene.add.text(x, y + 60, `Days Remaining: ${this.scene.playerStats.days}`, {
            fontSize: '16px',
            fill: '#fff'
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