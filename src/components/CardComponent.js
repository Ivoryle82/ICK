import Phaser from 'phaser';

class CardComponent {
    constructor(scene, x, y, scenario, options, updateStatsCallback) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scenario = scenario;
        this.options = options;
        this.updateStatsCallback = updateStatsCallback;

        this.createCard();
    }

    createCard() {
        this.cardBackground = this.scene.add.rectangle(this.x, this.y, 400, 300, 0xffffff).setOrigin(0.5);
        this.scenarioText = this.scene.add.text(this.x, this.y - 50, this.scenario, {
            fontSize: '20px',
            fill: '#000' // Change fill color to black
        }).setOrigin(0.5);

        this.optionButtons = this.options.map((option, index) => {
            const button = this.scene.add.text(this.x, this.y + (index * 40), option.text, {
                fontSize: '18px',
                fill: '#00f' // Change fill color to blue
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.handleOptionSelect(option);
            });

            return button;
        });
    }

    handleOptionSelect(option) {
        this.updateStatsCallback(option.statsChange);
        this.cardBackground.destroy();
        this.scenarioText.destroy();
        this.optionButtons.forEach(button => button.destroy());
        this.scene.nextScenario();
    }
}

export default CardComponent;