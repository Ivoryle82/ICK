/*import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2 {
    constructor(scene, scenario, options, popupTexts, updateStatsCallback, onOptionSelected) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.popupTexts = popupTexts;
        this.updateStatsCallback = updateStatsCallback;
        this.onOptionSelected = onOptionSelected; // Store the callback
        this.selectedOption = null;
        this.continueButton = null;

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
                fill: '#ffffff' 
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.selectOption(button, option);
            });

            animateText(button, 50);
            return button;
        });
    }

    selectOption(selectedButton, option) {
        if (this.selectedOption) {
            this.selectedOption.setStyle({ fill: '#ffffff' });
        }

        this.selectedOption = selectedButton;
        this.selectedOption.setStyle({ fill: '#ffff00' });

        this.showPopup(option.info);
        this.showContinueButton(option);
    }

    showContinueButton(option) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        if (this.continueButton) {
            this.continueButton.destroy();
        }

        this.continueButton = this.scene.add.text(width * 0.85, height * 0.9, 'Continue', {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            if (this.onOptionSelected) {
                this.onOptionSelected(option); // Call the callback with the selected option
            }
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
        animateText(this.popupText, 50);
    }
}

export default CardComponent2;*/

/*import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2 {
    constructor(scene, scenario, options, popupTexts, updateStatsCallback, onContinue) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.popupTexts = popupTexts;
        this.updateStatsCallback = updateStatsCallback;
        this.onContinue = onContinue; // Store callback for continue button
        this.selectedOption = null; // Track selected option

        this.createCard();
    }

    async createCard() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create card background
        this.cardBackground = this.scene.add.rectangle(width / 2, height - height * 0.2, width, height * 0.3, 0x000000).setOrigin(0.5);
        this.cardBackground.setAlpha(0.7); 

        // Add close-up image
        const closeUp = this.scene.add.image(width * 0.10, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        // Add scenario text
        this.scenarioText = this.scene.add.text(width * 0.66, height - height * 0.3, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 900, useAdvancedWrap: true },
            fill: '#ffffff'
        }).setOrigin(0.5);

        await animateText(this.scenarioText, 50); 

        // Create option buttons
        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height - height * 0.22 + (index * height * 0.05);

            const button = this.scene.add.text(width * 0.66, buttonYPosition, option.text, {
                fontSize: `${Math.min(width, height) * 0.025}px`,
            }).setOrigin(0.5).setInteractive();

            // Option button logic
            button.on('pointerdown', () => {
                this.selectOption(option, button);
            });

            animateText(button, 50);
            return button;
        });

        // Add "Continue" button at bottom right
        this.continueButton = this.scene.add.text(width * 0.85, height * 0.95, "Continue", {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            fill: '#00ff00' 
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            if (this.selectedOption) {
                this.updateStatsCallback(this.selectedOption.statsChange);
                this.onContinue(this.selectedOption); // Pass the selected option
                this.cleanup(); // Remove UI elements
            }
        });
    }

    selectOption(option, selectedButton) {
        this.selectedOption = option;

        // Highlight the selected button and remove highlight from others
        this.optionButtons.forEach(button => button.setStyle({ fill: '#ffffff' }));
        selectedButton.setStyle({ fill: '#ffff00' }); // Highlight in yellow
    }

    cleanup() {
        this.cardBackground.destroy();
        this.scenarioText.destroy();
        this.optionButtons.forEach(button => button.destroy());
        this.continueButton.destroy();
    }
}

export default CardComponent2;*/

import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2 {
    constructor(scene, scenario, options, popupTexts, updateStatsCallback, onContinue) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        this.popupTexts = popupTexts;
        this.updateStatsCallback = updateStatsCallback;
        this.onContinue = onContinue; // Callback for handling continue button click
        this.selectedOption = null;
        this.continueButton = null;
        this.popupBackground = null;
        this.popupText = null;

        this.createCard();
    }

    async createCard() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create card background
        this.cardBackground = this.scene.add.rectangle(width / 2, height - height * 0.2, width, height * 0.3, 0x000000).setOrigin(0.5);
        this.cardBackground.setAlpha(0.7); 

        // Add close-up image
        const closeUp = this.scene.add.image(width * 0.10, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        // Add scenario text
        this.scenarioText = this.scene.add.text(width * 0.66, height - height * 0.3, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 900, useAdvancedWrap: true },
            fill: '#ffffff'
        }).setOrigin(0.5);

        await animateText(this.scenarioText, 50); 

        // Create option buttons
        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height - height * 0.22 + (index * height * 0.05);

            const button = this.scene.add.text(width * 0.66, buttonYPosition, option.text, {
                fontSize: `${Math.min(width, height) * 0.025}px`,
                fill: '#ffffff' 
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.selectOption(button, option, this.popupTexts[index]);
            });

            animateText(button, 50);
            return button;
        });
    }

    selectOption(selectedButton, option, popupText) {
        if (this.selectedOption) {
            this.selectedOption.setStyle({ fill: '#ffffff' });
        }

        this.selectedOption = selectedButton;
        this.selectedOption.setStyle({ fill: '#ffff00' }); // Highlight selection

        this.showPopup(popupText); // Show popup for the selected option
        this.showContinueButton(option);
    }

    showPopup(info) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Remove previous popup if it exists
        if (this.popupBackground) {
            this.popupBackground.destroy();
            this.popupText.destroy();
        }

        // Create popup background
        this.popupBackground = this.scene.add.image(width * 0.2, height / 2, 'textbox').setOrigin(0.5);
        this.popupBackground.setDisplaySize(500, 200);

        // Create popup text
        this.popupText = this.scene.add.text(width * 0.2 - 15, (height / 2) - 20, info, {
            fontSize: `${Math.min(width, height) * 0.025}px`,
            fill: '#000000',
            wordWrap: { width: 350, useAdvancedWrap: true }
        }).setOrigin(0.5);

        animateText(this.popupText, 50);
    }

    showContinueButton(option) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Remove previous continue button if it exists
        if (this.continueButton) {
            this.continueButton.destroy();
        }

        this.continueButton = this.scene.add.text(width * 0.93, height * 0.9, 'Continue', {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        this.continueButton.on('pointerdown', () => {
            if (this.onContinue) {
                this.onContinue(option); // Pass the selected option
            }
            this.handleOptionSelect(option);
        });

        animateText(this.continueButton, 50);
    }

    handleOptionSelect(option) {
        this.updateStatsCallback(option.statsChange);

        // Clean up UI elements
        this.cardBackground.destroy();
        this.scenarioText.destroy();
        this.optionButtons.forEach(button => button.destroy());
        if (this.continueButton) this.continueButton.destroy();
        if (this.popupBackground) this.popupBackground.destroy();
        if (this.popupText) this.popupText.destroy();

        this.scene.nextScenario();
    }
}

export default CardComponent2;



