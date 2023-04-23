export class mapSelection extends Phaser.Scene {
    constructor() {
        super({ key: 'mapSelection' });
    }

    preload() {
        this.load.image('background', 'assets/menu1.png');
        this.load.image('map1', 'assets/city-pixel.jpg');
        this.load.image('map2', 'assets/arena-island.png');
    }

    create() {
        this.add.image(945, 475, 'background');
        const sceneText = this.add.text(690, 50, 'Map Selection', {
            fontSize: '68px',
            fill: '#fff',
            align: 'center',
            stroke: '#000', 
            strokeThickness: 10
          });
          const map1Text = this.add.text(415, 700, 'City', {
            fontSize: '68px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 10
          });
          const map2Text = this.add.text(1280, 700, 'Island', {
            fontSize: '68px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 10
          });
        const map1Box = this.add.rectangle(500, 500, 700, 400, 0x000000, 0.9);
        const map2Box = this.add.rectangle(1400, 500, 700, 400, 0x000000, 0.9);
        let map1Button = this.add.image(500, 500, 'map1');
        map1Button.setScale(680/map1Button.width, 380/map1Button.height);
        map1Button.setInteractive();
        let map2Button = this.add.image(1400, 500, 'map2');
        map2Button.setScale(680/map2Button.width, 380/map2Button.height);
        map2Button.setInteractive();

        map1Button.on('pointerdown', function () {
            this.game.arena = 1;
            this.scene.start('main');
        }, this);
        map2Button.on('pointerdown', function () {
            this.game.arena = 2;
            this.scene.start('main');
        }, this);

    }
    
    update() {

    }
}