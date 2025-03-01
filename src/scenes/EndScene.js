class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    init(data) {
        this.health = data.health;
        this.skills = data.skills;
        this.money = data.money;
        this.choices = data.choices;
    }

    preload() {
        // Load any assets needed for the intro scene here
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('bgMusic', 'assets/sounds/background.mp3');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.add.text(400, 100, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        //replace hard coded values with passed info from init
        let endingMessage = this.getEndingMessage(5 ,0 ,6);
        endingMessage = this.add.text(100, 200, endingMessage, { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
        this.animateText(endingMessage);
        setTimeout(() => {
            let choice1 = this.add.text(100, 250, 'Choice 1: ' + 'this was the choice you made', { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
            this.animateText(choice1);
            setTimeout(() => {
                let choice2 = this.add.text(100, 300, 'Choice 2: ' + 'this was another choice you made', { fontSize: '24px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.05);
                this.animateText(choice2);
            },1500);
        },1500);

        let more = this.add.text(400, 425, 'Click here to find out more about your decisions and their real world impacts', { fontSize: '20px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.5);
        more.setInteractive();
        more.on('pointerdown', function(pointer) {
            let newWindow = window.open("https://google.com");
        });

        this.add.text(400, 550, 'Press R to Restart', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('IntroScene');
        });
    }

    getEndingMessage(health,money, skills) {
        //const { health, money, skills } = this.stats;

        if (money > 0 && skills > 5 && health > 50) {
            return 'Good Ending: You found a job and are thriving!';
        } else if (health <= 0 || money <= 0) {
            return 'Bad Ending: You ran out of time and resources.';
        } else {
            return 'Open-ended: Your journey continues, but the future is uncertain.';
        }
    }

    animateText(target, speedInMs = 25) {
        // store original text
        const message = target.text;
        const invisibleMessage = message.replace(/[^ ]/g, " ");
      
        // clear text on screen
        target.text = "";
      
        // mutable state for visible text
        let visibleText = "";
      
        // use a Promise to wait for the animation to complete
        return new Promise((resolve) => {
          const timer = target.scene.time.addEvent({
            delay: speedInMs,
            loop: true,
            callback() {
              // if all characters are visible, stop the timer
              if (target.text === message) {
                timer.destroy();
                return resolve();
              }
      
              // add next character to visible text
              visibleText += message[visibleText.length];
      
              // right pad with invisibleText
              const invisibleText = invisibleMessage.substring(visibleText.length);
      
              // update text on screen
              target.text = visibleText + invisibleText;
            },
          });
        });
      }
      
}

export default EndScene;