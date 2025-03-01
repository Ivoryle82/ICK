class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    init(data) {
        this.stats = data.stats;
    }

    create() {
        this.add.text(100, 100, 'Game Over', { fontSize: '32px', fill: '#fff' });

        let endingMessage = this.getEndingMessage();
        this.add.text(100, 150, endingMessage, { fontSize: '24px', fill: '#fff' });

        this.add.text(100, 250, 'Press R to Restart', { fontSize: '20px', fill: '#fff' });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('IntroScene');
        });
    }

    getEndingMessage() {
        const { health, money, skills } = this.stats;

        if (money > 0 && skills > 5 && health > 50) {
            return 'Good Ending: You found a job and are thriving!';
        } else if (health <= 0 || money <= 0) {
            return 'Bad Ending: You ran out of time and resources.';
        } else {
            return 'Open-ended: Your journey continues, but the future is uncertain.';
        }
    }
}