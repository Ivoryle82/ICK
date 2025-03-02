import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent {
    constructor(scene, scenario, options) {
        this.scene = scene;
        //text to output
        this.scenario = scenario;
        //buttons to create
        this.options = options;

        this.createCard();
    }

    async createCard() {  // Mark this method as async
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create card background to fit the screen at the bottom, black with opacity
        this.cardBackground = this.scene.add.rectangle(width / 2, height - height * 0.2, width, height * 0.3, 0x000000).setOrigin(0.5);
        this.cardBackground.setAlpha(0.7); // Set opacity to 70%

        const closeUp = this.scene.add.image(30, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        // Create scenario text at the bottom, inside the rectangle
        this.scenarioText = this.scene.add.text(width / 2, height - height * 0.3, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 700, useAdvancedWrap: true},
            fill: '#ffffff' // White text color
        }).setOrigin(0.5);

        // Animate the scenario text
        await animateText(this.scenarioText, 50); // Adjust speed as necessary

        // Create option buttons closer to the scenario text
        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height - height * 0.22 + (index * height * 0.05); // Decreased the Y position gap

            const button = this.scene.add.text(width / 2, buttonYPosition, option.text, {
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
        this.cardBackground.destroy();
        this.scenarioText.destroy();
        this.optionButtons.forEach(button => button.destroy());
        this.scene.nextScenario();
    }

    showPopup(info) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create a popup background (black with opacity)
        this.popupBackground = this.scene.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.4, 0x000000).setOrigin(0.5);
        this.popupBackground.setAlpha(0.8); // Set opacity to 80%

        // Add text for the popup information
        this.popupText = this.scene.add.text(width / 2, height / 2, info, {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#ffffff', // White text color
            wordWrap: { width: width * 0.7, useAdvancedWrap: true } // Wrapping text
        }).setOrigin(0.5);

        // Close button for the popup
        this.closeButton = this.scene.add.text(width / 2, height / 2 + height * 0.15, 'Close', {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#ff0000', // Red color for close button
        }).setOrigin(0.5).setInteractive();
        this.closeButton.on('pointerdown', () => this.closePopup());
        

        // Animate the popup text and button
        animateText(this.popupText, 50);
        animateText(this.closeButton, 50);

    }

    closePopup() {
        // Destroy all popup elements
        if (this.popupBackground) this.popupBackground.destroy();
        if (this.popupText) this.popupText.destroy();
        if (this.closeButton) {
            this.closeButton.destroy();
            this.closeButton = null; // Clear the reference after destroying
        }
    }
}

export default CardComponent;