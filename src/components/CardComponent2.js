import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2{
    constructor(scene, scenario, options, popupTexts, updateStatsCallback) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.popupTexts = popupTexts;
        this.updateStatsCallback = updateStatsCallback;

        this.createCard();
    }

    async createCard() {  // Mark this method as async
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create card background to fit the screen at the bottom, black with opacity
        this.cardBackground = this.scene.add.rectangle(width / 2, height - height * 0.2, width, height * 0.3, 0x000000).setOrigin(0.5);
        this.cardBackground.setAlpha(0.7); // Set opacity to 70%

        const closeUp = this.scene.add.image(width * 0.10, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        // Create scenario text at the bottom, inside the rectangle
        // Create scenario text at the bottom, inside the rectangle
        this.scenarioText = this.scene.add.text(width * 0.66, height - height * 0.3, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 900, useAdvancedWrap: true},
            fill: '#ffffff' // White text color
        }).setOrigin(0.5);


        // Animate the scenario text
        await animateText(this.scenarioText, 50); // Adjust speed as necessary

        // Create option buttons closer to the scenario text
        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height - height * 0.22 + (index * height * 0.05); // Decreased the Y position gap

            const button = this.scene.add.text(width * 0.66, buttonYPosition, option.text, {
                fontSize: `${Math.min(width, height) * 0.025}px`,
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.showPopup(option.info); // Show the popup with option info
            });

            // Animate each button text with a slight delay
            animateText(button, 50);

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

    showPopup(info) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create a popup background (black with opacity)
        //this.popupBackground = this.scene.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.4, 0x000000).setOrigin(0.5);
        this.popupBackground = this.scene.add.image(width*0.2, height / 2, 'textbox').setOrigin(0.5);
        //this.popupBackground.setAlpha(0.8); // Set opacity to 80%
        this.popupBackground.setDisplaySize(500, 200);

        // Add text for the popup information
        this.popupText = this.scene.add.text(width*0.2+10, (height / 2) - 20, info, {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#0', // White text color
            wordWrap: { width: 350, useAdvancedWrap: true},
        }).setOrigin(0.5);

        // Close button for the popup
        const closeButton = this.scene.add.text(width / 2, height / 2 + height * 0.15, 'Close', {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#ff0000', // Red color for close button
        }).setOrigin(0.5).setInteractive();

        closeButton.on('pointerdown', () => {
            this.closePopup();
        });

        // Animate the popup text and button
        animateText(this.popupText, 50);
        animateText(closeButton, 50);
    }

    closePopup() {
        // Destroy all popup elements
        if (this.popupBackground) this.popupBackground.destroy();
        if (this.popupText) this.popupText.destroy();
        if (this.popupCloseButton) this.popupCloseButton.destroy();
    }
}

export default CardComponent2;