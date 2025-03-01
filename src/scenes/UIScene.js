class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        this.health = 100; // Initial Health
        this.money = 100; // Initial Money
        this.skills = 0; // Initial Skills
        this.daysRemaining = 60; // Initial Days

        this.statsText = this.add.text(10, 10, this.getStatsText(), {
            fontSize: '20px',
            fill: '#fff'
        });

        this.daysText = this.add.text(10, 50, `Days Remaining: ${this.daysRemaining}`, {
            fontSize: '20px',
            fill: '#fff'
        });

        this.events.on('updateStats', this.updateStats, this);
    }

    getStatsText() {
        return `Health: ${this.health}\nMoney: ${this.money}\nSkills: ${this.skills}`;
    }

    updateStats(newHealth, newMoney, newSkills, daysPassed) {
        this.health = newHealth;
        this.money = newMoney;
        this.skills = newSkills;
        this.daysRemaining -= daysPassed;

        this.statsText.setText(this.getStatsText());
        this.daysText.setText(`Days Remaining: ${this.daysRemaining}`);
    }
}