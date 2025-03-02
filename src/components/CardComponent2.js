import Phaser from 'phaser';
import { animateText } from '../utils/typeWriter';

class CardComponent2 {
    constructor(scene, scenario, options, popupTexts, updateStatsCallback, onContinue) {
        this.scene = scene;
        this.scenario = scenario;
        this.options = options;
        //this.popupTexts = popupTexts;
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
        this.cardBackground.setAlpha(0.75); 

        // Add close-up image
        const closeUp = this.scene.add.image(width * 0.10, height - 280, 'closeup').setOrigin(0, 0);
        closeUp.setDisplaySize(190, 240);

        // Add scenario text
        this.scenarioText = this.scene.add.text(width * 0.60, height * 0.73, this.scenario, {
            fontSize: `${Math.min(width, height) * 0.03}px`,
            wordWrap: { width: 960, useAdvancedWrap: true },
            fill: '#ffffff'
        }).setOrigin(0.5);

        await animateText(this.scenarioText, 50); 

        // Create option buttons
        this.optionButtons = this.options.map((option, index) => {
            const buttonYPosition = height * .81 + (index * height * 0.05);

            const button = this.scene.add.text(width * 0.60, buttonYPosition, option.text, {
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
    /*
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
    */
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
        /*
        // Animation for moving the popup background up and down
        this.scene.tweens.add({
            targets: this.popupBackground,
            y: height / 2 + 3, // Moving up and down by 20 pixels
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true, // Ensure it goes back to the original position
            repeat: -1, // Keep repeating the animation
            delay: 500 // Optional delay before starting the animation
        });*/
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

        //this.scene.nextScenario();
    }
}

export default CardComponent2;



