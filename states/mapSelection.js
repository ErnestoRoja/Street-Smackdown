export class mapSelection extends Phaser.Scene {
    constructor() {
        super({ key: 'mapSelection' });
    }

    preload() {
        this.load.image('background', 'assets/menu1.png');
        this.load.image('map1', 'assets/arena-island.png');
        this.load.image('map2', 'assets/city-pixel.jpg');
    }

    create() {
        this.add.image(945, 475, 'background');
        const sceneText = this.add.text(670, 50, 'Map Selection', {
            fontSize: '68px',
            fill: '#fff',
            align: 'center',
            stroke: '#000', 
            strokeThickness: 10
          });
        const map1Box = this.add.rectangle(650, 500, 500, 700, 0x000000, 1);
        const map2Box = this.add.rectangle(1200, 500, 500, 700, 0x000000, 1);
    }
    
    update() {

    }
}