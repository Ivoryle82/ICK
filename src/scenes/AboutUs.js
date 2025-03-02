class AboutUs extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutUs' });
    }

    preload(){
        this.load.image('Ken', 'assets/images/Ken_Pixel.png');
        this.load.image('Ivory', 'assets/images/Ivory_Pixel.png');
        this.load.image('Cristian', 'assets/images/Cristian_Pixel.png');
        this.load.image('bg', 'assets/images/JobScene1.png');
    }
    create(){
        this.add.image(this.cameras.main.centerX+100,this.cameras.main.centerY, 'bg');
        this.add.image(200, 300, 'Ken').setOrigin(0.5, 0.5).setScale(0.75);
        this.add.image(725, 300, 'Ivory').setOrigin(0.5, 0.5).setScale(0.75);
        this.add.image(1250, 300, 'Cristian').setOrigin(0.5, 0.5).setScale(0.75);

        this.add.text(this.scale.width/2, 50, 'Meet the team', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
        
        
        this.add.rectangle(200, 525, 155, 35, 0x000000, 0.5);
        let ken = this.add.text(200, 525, 'Ken Zhu', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5).setInteractive();
        ken.on('pointerdown', () => {
            let kenWindow = window.open('https://www.linkedin.com/in/ken-h-z/');
        })
        this.add.rectangle(725, 525, 155, 35, 0x000000, 0.5);
        let ivory = this.add.text(725, 525, 'Ivory Le', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5).setInteractive();
        ivory.on('pointerdown', () => {
            let ivoryWindow = window.open('https://www.linkedin.com/in/ivory-le/');
        })
        this.add.rectangle(1250, 525, 300, 35, 0x000000, 0.5);
        let cristian = this.add.text(1250, 525, 'Cristian Cortez', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5).setInteractive();
        cristian.on('pointerdown', () => {
            let cristianWindow = window.open('https://www.linkedin.com/in/cristian-cortez/');
        })

        this.add.text(this.scale.width/2, 650, 'Press R to return to start', { fontSize: '20px', fill: '#fff', wordWrap: { width: 700, useAdvancedWrap: true} }).setOrigin(0.5);

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('BootScene');
        });
    }
}

export default AboutUs;