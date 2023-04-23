export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
        this.playButton = null;
        this.controlButton = null;
        this.exitButton = null;
        this.title = null;
        this.popup_active = false;
    }

    preload() {
        this.load.image('menu', 'assets/menu2.png');
    }

    createPopup() {
        this.popup_active = true;
        // create the popup background
        const popupBg = this.add.rectangle(1500, 550, 600, 500, 0x000000, 0.7);
        popupBg.setOrigin(0.5);
    
        // create the popup text
        const P1popupText = this.add.text(1500, 400, 'Player 1 controls:\nWASD - move\nC - light attack\nJump + C - ariel attack', {
          fontSize: '32px',
          fill: '#fff',
          align: 'center',
        });
        P1popupText.setOrigin(0.5);

        // create the popup text
        const P2popupText = this.add.text(1500, 600, 'Player 2 controls:\nArrow Keys - move\nL - light attack\nK - heavy attack', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
          });
        P2popupText.setOrigin(0.5);
    
        // create the popup exit button
        const exitButton = this.add.text(1500, 750, 'Close', {
          fontSize: '32px',
          fill: '#fff',
          align: 'center',
        });
        exitButton.setOrigin(0.5);
        exitButton.setInteractive();
    
        // add an event listener to the exit button to remove the popup when clicked
        exitButton.on('pointerdown', function () {
          popupBg.destroy();
          P1popupText.destroy();
          P2popupText.destroy();
          exitButton.destroy();
          this.popup_active = false;
        }, this);
      }

    create() {
        this.add.image(945, 475, 'menu');
        this.title = this.add.text(345 , 100, 'Street Smackdown', { fontSize: '128px', fill: '#d2752d', stroke: '#000', strokeThickness: 10 })
        this.playButton = this.add.text(880 , 350, 'Play', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.playButton.setInteractive();

        this.controlButton = this.add.text(805 , 450, 'Controls', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.controlButton.setInteractive();

        this.exitButton = this.add.text(880 , 550, 'Exit', { fontSize: '64px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.exitButton.setInteractive();

        this.playButton.on('pointerdown', function () {
            this.scene.start('mapSelection');
        }, this);

        this.controlButton.on('pointerdown', function () {
            if (!this.popup_active) {
                this.createPopup();
            }
        }, this);

        this.exitButton.on('pointerdown', function () {
            window.close();
        }, this);
    }
    
    update() {
    }
}