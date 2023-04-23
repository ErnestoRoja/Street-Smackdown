export class gameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        if (this.game.arena == 1) {
            this.load.image('city', 'assets/city-pixel.jpg');
            this.load.image('city-ground', 'assets/city-ground.jpg');
        }
        else if (this.game.arena == 2) {
            this.load.image('island', 'assets/arena-island.png');
            this.load.image('island-ground', 'assets/arena-island-ground.png');
        }
    }

    create() {
        if (this.game.arena == 1) {
            this.add.image(945, 475, 'city');
        }
        else if (this.game.arena == 2) {
            this.add.image(945, 533, 'island');
        }

        let mainMenuButton = null;
        const box = this.add.rectangle(945, 500, 700, 300, 0x000000, 0.8);
        if (this.game.winner == 1) {
            let winner1Text = this.add.text(660, 400, 'Player 1 Wins!', {
                fontSize: '68px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 10
            });
            mainMenuButton = this.add.text(750, 530, 'Main Menu', {
                fontSize: '68px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 10
            });

        }
        else if (this.game.winner == 2) {
            let winner2Text = this.add.text(660, 400, 'Player 2 Wins!', {
                fontSize: '68px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 10
            });
            mainMenuButton = this.add.text(750, 530, 'Main Menu', {
                fontSize: '68px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 10
            });
        }

        mainMenuButton.setInteractive();
        mainMenuButton.on('pointerdown', function () {
            this.scene.start('menu');
        }, this);

    }

    update() {

    }
}