export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
        this.playButton = null;
        this.controlButton = null;
        this.exitButton = null;
        this.title = null;
    }

    preload() {
        this.load.image('menu', 'assets/menu2.png');
    }

    create() {
        console.log("IN MENU");

        this.add.image(945, 475, 'menu');
        this.title = this.add.text(345 , 100, 'Street Smackdown', { fontSize: '128px', fill: '#d2752d', stroke: '#000', strokeThickness: 10 })
        this.playButton = this.add.text(880 , 350, 'Play', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.playButton.setInteractive();

        this.controlButton = this.add.text(805 , 450, 'Controls', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.controlButton.setInteractive();

        this.exitButton = this.add.text(880 , 550, 'Exit', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.exitButton.setInteractive();

        this.playButton.on('pointerdown', function () {
            this.scene.start('main');
        }, this);
    }
    
    update() {
        console.log("test");
    }
}