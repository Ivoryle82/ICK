import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2 {
    constructor(scene, scenario, options, popupTexts, updateStatsCallback) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.popupTexts = popupTexts;
        this.updateStatsCallback = updateStatsCallback;
        this.selectedOption = null; // Track selected option
        this.continueButton = null; // Track continue button

        this.createCard();
    }

    async createCard() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        this.cardBackground = this.scene.add.rectangle(width / 2, height - height * 0.2, width, height * 0.3, 0x000000).setOrigin(0.5);
        this.cardBackground.setAlpha(0.7);

        const closeUp = this.scene.add.image(width * 0.10, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        this.scenarioText = this.scene.add.text(width * 0.66, height - height * 0.3, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 900, useAdvancedWrap: true },
            fill: '#ffffff'
        }).setOrigin(0.5);

        await animateText(this.scenarioText, 50);

        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height - height * 0.22 + (index * height * 0.05);

            const button = this.scene.add.text(width * 0.66, buttonYPosition, option.text, {
                fontSize: `${Math.min(width, height) * 0.025}px`,
                fill: '#ffffff' // Default white color
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.selectOption(button, option);
            });

            animateText(button, 50);
            return button;
        });
    }

    selectOption(selectedButton, option) {
        // Remove highlight from previous selection
        if (this.selectedOption) {
            this.selectedOption.setStyle({ fill: '#ffffff' }); // Reset color to white
        }

        // Highlight the selected option
        this.selectedOption = selectedButton;
        this.selectedOption.setStyle({ fill: '#ffff00' }); // Highlight with yellow color

        // Show the popup with additional information
        this.showPopup(option.info);

        // Show the continue button
        this.showContinueButton(option);
    }

    showContinueButton(option) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        if (this.continueButton) {
            this.continueButton.destroy();
        }

        this.continueButton = this.scene.add.text(width * 0.93, height * 0.9, 'Continue', {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            fill: '#00ff00' // Green color
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            this.handleOptionSelect(option);
        });

        animateText(this.continueButton, 50);
    }

    handleOptionSelect(option) {
        this.updateStatsCallback(option.statsChange);
        this.cardBackground.destroy();
        this.scenarioText.destroy();
        this.optionButtons.forEach(button => button.destroy());
        if (this.continueButton) this.continueButton.destroy();
        this.scene.nextScenario();
    }

    showPopup(info) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        if (this.popupBackground) {
            this.popupBackground.destroy();
            this.popupText.destroy();
        }

        this.popupBackground = this.scene.add.image(width * 0.2, height / 2, 'textbox').setOrigin(0.5);
        this.popupBackground.setDisplaySize(500, 200);

        this.popupText = this.scene.add.text(width * 0.2 - 10, (height / 2) - 20, info, {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#000000',
            wordWrap: { width: 350, useAdvancedWrap: true }
        }).setOrigin(0.5);

        animateText(this.popupText, 30);
    }
}

export default CardComponent2;
