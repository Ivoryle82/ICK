import Phaser from 'phaser';

class CardComponent {
    constructor(scene, scenario, options, updateStatsCallback) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.updateStatsCallback = updateStatsCallback;

        this.createCard();
    }

    createCard() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create card background to fit the screen
        this.cardBackground = this.scene.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.6, 0xffffff).setOrigin(0.5);

        // Create scenario text
        this.scenarioText = this.scene.add.text(width / 2, height / 2 - height * 0.25, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            fill: '#000' // Change fill color to black
        }).setOrigin(0.5);

        // Create option buttons
        this.optionButtons = this.options.map((option, index) => {
            const button = this.scene.add.text(width / 2, height / 2 - height * 0.1 + (index * height * 0.1), option.text, {
                fontSize: `${Math.min(width, height) * 0.025}px`,
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