import { menu } from './states/menu.js';
import { gameOver } from './states/gameOver.js';

var config = {
    type: Phaser.AUTO,
    width: 1890,
    height: 950,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: {
    }
};

var game = new Phaser.Game(config);
game.scene.add('MainMenu', menu);
game.scene.add('GameOver', gameOver);

class main extends Phaser.Scene {

    constructor() {
        super({ key: 'Main' });
        this.player1 = null;
        this.player2 = null;
        this.platforms = null;
        this.cursors = null;
        this.platform = null;
        this.isP1Jumping = false;
        this.isP2Jumping = false;
        this.rectangleP1M = null;
        this.rectangleP2M = null;
        this.rectangleP1A = null;
        this.rectangleP2A = null;
        this.container = null;
        this.timer = null;
        this.timerText = null;
        this.redHealth = null;
        this.emptyBar = null;
        this.player1Health = 485;
        this.player2Health = 485;
        this.boolJasonCombo1 = false;
        this.boolJasonArial1 = false;
        this.boolErnestoCombo1 = false;
        this.boolErnestoCombo2 = false;
        this.P1facingLeft = false;
        this.P1facingRight = true;
        this.P2facingLeft = false;
        this.P2facingRight = true;
        this.countdown = 60;

    }

    onTimerTick() {
        if (this.countdown > 0) {
            this.countdown -= 1; // decrease the countdown by 1
            // update the timer text to display the new time
            this.timerText.setText('0:' + (this.countdown < 10 ? '0' : '') + this.countdown);
        }

        // check if countdown is complete
        if (this.countdown === 0) {
            console.log("ROUND ENDED!");
        }
    }

    takeDamage(playerBar, amount) {
        if (playerBar == this.player1_redBar) {
            this.player1Health -= amount;
            this.player1_redBar.setCrop(0, 0, this.player1Health, 84);
        } else {
            this.player2Health -= amount;
            this.player2_redBar.setCrop(0, 0, this.player2Health, 84);
        }
    }

    preload() {
        this.load.image('city', 'assets/city-pixel.jpg');
        this.load.image('city-ground', 'assets/city-ground.jpg');
        this.load.image('red-health', 'assets/Health/red-health.png');
        this.load.image('empty-health', 'assets/Health/empty-health.png');
        this.load.spritesheet('dude-1-run-right',
            'assets/Dude/Run.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-run-left',
            'assets/Dude/Run-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-idle',
            'assets/Dude/Idle.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-idle-left',
            'assets/Dude/Idle-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-jump',
            'assets/Dude/JumpAndFall.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-jump-left',
            'assets/Dude/JumpAndFall-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-1-right',
            'assets/Dude/GroundCombo1.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-1-left',
            'assets/Dude/GroundCombo1-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-2-right',
            'assets/Dude/GroundCombo2.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-2-left',
            'assets/Dude/GroundCombo2-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-3-right',
            'assets/Dude/GroundCombo3.png',
            { frameWidth: 80, frameHeight: 48 }
        );
        this.load.spritesheet('dude-1-combo-ground-3-left',
            'assets/Dude/GroundCombo3-Left.png',
            { frameWidth: 80, frameHeight: 48 }
        );


        //Ernesto's assets
        this.load.spritesheet('ernesto-all',
            'assets/Ernesto/ernesto-sprite-sheet.png',
            { frameWidth: 150, frameHeight: 200 }
        );

        this.load.spritesheet('ernesto-combo-1-left',
            'assets/Ernesto/ernesto-combo-1-left-test.png',
            { frameWidth: 380, frameHeight: 200 }
        );

        this.load.spritesheet('ernesto-combo-1-right',
            'assets/Ernesto/ernesto-combo-1-right.png',
            { frameWidth: 380, frameHeight: 200 }
        );

        this.load.spritesheet('ernesto-combo-2-left',
            'assets/Ernesto/ernesto-combo-2-left.png',
            { frameWidth: 380, frameHeight: 200 }
        );

        this.load.spritesheet('ernesto-combo-2-right',
            'assets/Ernesto/ernesto-combo-2-right.png',
            { frameWidth: 380, frameHeight: 200 }
        );

        // Jason's assets (147, 162)
        this.load.spritesheet('jason-combo-1',
            'assets/Jason/jason-combo-1.png',
            { frameWidth: 170, frameHeight: 200 }
        );
        this.load.spritesheet('jason-arial-1',
            'assets/Jason/jason-arial-1.png',
            { frameWidth: 150, frameHeight: 200 }
        );
        this.load.spritesheet('jason-idle',
            'assets/Jason/jason-idle.png',
            { frameWidth: 100, frameHeight: 200 }
        );
        this.load.spritesheet('jason-running',
            'assets/Jason/jason-running.png',
            { frameWidth: 120, frameHeight: 200 }
        );
        this.load.spritesheet('jason-jumping',
            'assets/Jason/jason-jumping.png',
            { frameWidth: 120, frameHeight: 200 }
        );
    }

    create() {
        console.log("IN GAME");

        // Timer text
        this.timerText = this.add.text(game.config.width / 2, 100, '1:00', { fontSize: '48px', fill: '#FFF', stroke: '#000', strokeThickness: 10 });
        this.timerText.setOrigin(0.5, 0.5); // center the text anchor point
        this.timerText.setDepth(1);

        // set up timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });

        // Ernesto's animations
        this.anims.create({
            key: 'ernesto-idle',
            frames: [{ key: 'ernesto-all', frame: 4 }],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-run-left',
            frames: this.anims.generateFrameNumbers('ernesto-all', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-run-right',
            frames: this.anims.generateFrameNumbers('ernesto-all', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-turn-left',
            frames: [{ key: 'ernesto-all', frame: 3 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-turn-right',
            frames: [{ key: 'ernesto-all', frame: 5 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-up-left',
            frames: [{ key: 'ernesto-all', frame: 10 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-up-right',
            frames: [{ key: 'ernesto-all', frame: 9 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-combo-1-left',
            frames: this.anims.generateFrameNumbers('ernesto-combo-1-left', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-combo-1-right',
            frames: this.anims.generateFrameNumbers('ernesto-combo-1-right', { start: 13, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-combo-2-left',
            frames: this.anims.generateFrameNumbers('ernesto-combo-2-left', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ernesto-combo-2-right',
            frames: this.anims.generateFrameNumbers('ernesto-combo-2-right', { start: 2, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        // Jason's animations
        this.anims.create({
            key: 'jason-idle',
            frames: [{ key: 'jason-idle', frame: 1 }],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-run-left',
            frames: this.anims.generateFrameNumbers('jason-running', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-run-right',
            frames: this.anims.generateFrameNumbers('jason-running', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-turn-left',
            frames: [{ key: 'jason-idle', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-turn-right',
            frames: [{ key: 'jason-idle', frame: 2 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-up-left',
            frames: [{ key: 'jason-jumping', frame: 1 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-up-right',
            frames: [{ key: 'jason-jumping', frame: 0 }],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-combo-1-left',
            frames: this.anims.generateFrameNumbers('jason-combo-1', { start: 3, end: 0 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-combo-1-right',
            frames: this.anims.generateFrameNumbers('jason-combo-1', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-arial-1-left',
            frames: this.anims.generateFrameNumbers('jason-arial-1', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jason-arial-1-right',
            frames: this.anims.generateFrameNumbers('jason-arial-1', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Asset character's animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude-1-run-left', { start: 7, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude-1-idle', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn-left',
            frames: [{ key: 'dude-1-idle-left', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude-1-run-right', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up-right',
            frames: this.anims.generateFrameNumbers('dude-1-jump', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'up-left',
            frames: this.anims.generateFrameNumbers('dude-1-jump-left', { start: 1, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-1-right',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-1-right', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-1-left',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-1-left', { start: 7, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-2-right',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-2-right', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-2-left',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-2-left', { start: 9, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-3-right',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-3-right', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'combo-ground-3-left',
            frames: this.anims.generateFrameNumbers('dude-1-combo-ground-3-left', { start: 13, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        // Attack Keybinds (Player 1)
        this.k_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.l_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        // Attack Keybinds (Player 2)
        this.c_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.v_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

        // Move Keybinds (Player 2)
        this.w_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.add.image(945, 475, 'city');

        this.platforms = this.physics.add.staticGroup();
        this.platform = this.platforms.create(950, 910, 'city-ground').setScale(1).refreshBody();

        this.player1 = this.physics.add.sprite(400, 700, 'ernesto-all').setScale(1);
        this.player1.setCollideWorldBounds(true);

        this.player2 = this.physics.add.sprite(800, 700, 'jason-idle').setScale(1);
        this.player2.setCollideWorldBounds(true);

        this.player1_emptyBar = this.add.sprite(450, 100, 'empty-health');
        this.player1_emptyBar.displayHeight = 60;
        this.player1_emptyBar.displayWidth = 800;

        this.player1_redBar = this.add.sprite(450, 100, 'red-health');
        this.player1_redBar.displayHeight = 50;
        this.player1_redBar.displayWidth = 785;

        this.player1_redBar.setCrop(0, 0, 485, 84);

        this.player2_emptyBar = this.add.sprite(1435, 100, 'empty-health');
        this.player2_emptyBar.displayHeight = 60;
        this.player2_emptyBar.displayWidth = 800;

        this.player2_redBar = this.add.sprite(1435, 100, 'red-health');
        this.player2_redBar.displayHeight = 50;
        this.player2_redBar.displayWidth = 785;

        this.player2_redBar.setCrop(0, 0, 485, 84);

        this.rectangleP1M = this.add.rectangle(this.player1.x, this.player1.y, 150, 200);
        this.rectangleP1M.setOrigin(0.5);
        this.rectangleP1M.setStrokeStyle(1, 0xFF0000);
        this.physics.add.existing(this.rectangleP1M);

        this.rectangleP2M = this.add.rectangle(this.player2.x, this.player2.y, 90, 200);
        this.rectangleP2M.setOrigin(0.5);
        this.rectangleP2M.setStrokeStyle(1, 0xFF0000);
        this.physics.add.existing(this.rectangleP2M);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.rectangleP1M, this.platforms);
        this.physics.add.collider(this.rectangleP2M, this.platforms);

        this.physics.add.overlap(this.rectangleP1M, this.rectangleP2M, function () {
            console.log('Kisses detected! -> p1 health: ' + this.player1Health + ', p2 health: ' + this.player2Health);
        });

        // Ernesto Combo1 Hitbox
        this.rectErnestoCombo1 = this.add.rectangle(this.player1.x, this.player1.y, 175, 190);
        this.rectErnestoCombo1.setOrigin(0.15, 0.5);
        this.rectErnestoCombo1.setStrokeStyle(1, 0x0000FF);
        this.physics.add.existing(this.rectErnestoCombo1);
        this.rectErnestoCombo1.body.allowGravity = false;

        this.boolErnestoCombo1 = false;
        this.physics.add.overlap(this.rectErnestoCombo1, this.rectangleP2M, function () {
            this.boolErnestoCombo1 = true;
        });

        // Ernesto Combo2 Hitbox
        this.rectErnestoCombo2 = this.add.rectangle(this.player1.x, this.player1.y, 175, 85);
        this.rectErnestoCombo2.setOrigin(0, 0.7);
        this.rectErnestoCombo2.setStrokeStyle(1, 0x0000FF);
        this.physics.add.existing(this.rectErnestoCombo2);
        this.rectErnestoCombo2.body.allowGravity = false;

        this.boolErnestoCombo2 = false;
        this.physics.add.overlap(this.rectErnestoCombo2, this.rectangleP2M, function () {
            this.boolErnestoCombo2 = true;
        });

        // Jason Combo1 Hitbox
        this.rectJasonCombo1 = this.add.rectangle(this.player2.x, this.player2.y, 80, 40);
        this.rectJasonCombo1.setOrigin(1.1, 0.6);
        this.rectJasonCombo1.setStrokeStyle(1, 0x0000FF);
        this.physics.add.existing(this.rectJasonCombo1);
        this.rectJasonCombo1.body.allowGravity = false;

        this.boolJasonCombo1 = false;
        this.physics.add.overlap(this.rectJasonCombo1, this.rectangleP1M, function () {
            this.boolJasonCombo1 = true;
        });

        // Jason Arial1 Hitbox
        this.rectJasonArial1 = this.add.rectangle(this.player2.x, this.player2.y, 100, 60);
        this.rectJasonArial1.setOrigin(0.9, -0.2);
        this.rectJasonArial1.setStrokeStyle(1, 0xA020F0);
        this.physics.add.existing(this.rectJasonArial1);
        this.rectJasonArial1.body.allowGravity = false;

        this.boolJasonArial1 = false;
        this.physics.add.overlap(this.rectJasonArial1, this.rectangleP1M, function () {
            this.boolJasonArial1 = true;
        });
    }

    update() {
        // Player 1 Logic
        // Hitbox
        this.rectangleP1M.x = this.player1.x;
        this.rectangleP1M.y = this.player1.y;
        this.rectangleP1M.displayWidth = 150;

        // Combo1 Hitbox
        this.rectErnestoCombo1.x = this.player1.x;
        this.rectErnestoCombo1.y = this.player1.y;
        this.rectErnestoCombo1.setStrokeStyle(0, 0x0000FF);

        // Combo2 Hitbox
        this.rectErnestoCombo2.x = this.player1.x;
        this.rectErnestoCombo2.y = this.player1.y;
        this.rectErnestoCombo2.setStrokeStyle(0, 0x0000FF);

        if (this.player1.body.touching.down) {
            this.isP1Jumping = false;
            if (this.cursors.left.isDown) {
                this.player1.setVelocityX(-220);
                this.player1.anims.play('ernesto-run-left', true);
                this.P1facingLeft = true;
                this.P1facingRight = false;
            } else if (this.cursors.right.isDown) {
                this.player1.setVelocityX(220);
                this.player1.anims.play('ernesto-run-right', true);
                this.P1facingRight = true;
                this.P1facingLeft = false;
            } else if (this.k_Key.isDown) {
                this.player1.setVelocityX(0);
                this.rectErnestoCombo2.setStrokeStyle(1, 0x0000FF);
                if (this.P1facingLeft) {
                    this.rectErnestoCombo2.setOrigin(1, 0.7);
                    this.rectangleP1M.displayWidth = 380;
                    this.player1.anims.play('ernesto-combo-2-left', true);
                    if (this.player1.anims.currentFrame.index == 3 && this.boolErnestoCombo2) {
                        console.log('Sword (lol) detected!');
                        this.takeDamage(this.player2_redBar, 5);
                        this.boolErnestoCombo2 = false;
                        this.player2.setVelocityX(-500);
                        this.player2.setVelocityY(-70);
                    }
                } else {
                    this.rectErnestoCombo2.setOrigin(0, 0.7);
                    this.rectangleP1M.displayWidth = 380;
                    this.player1.anims.play('ernesto-combo-2-right', true);
                    if (this.player1.anims.currentFrame.index == 3 && this.boolErnestoCombo2) {
                        console.log('Sword (lol) detected!');
                        this.takeDamage(this.player2_redBar, 5);
                        this.boolErnestoCombo2 = false;
                        this.player2.setVelocityX(500);
                        this.player2.setVelocityY(-70);
                    }
                }
            }
            else if (this.l_Key.isDown) {
                this.player1.setVelocityX(0);
                this.rectErnestoCombo1.setStrokeStyle(1, 0x0000FF);
                if (this.P1facingLeft) {
                    this.rectErnestoCombo1.setOrigin(0.85, 0.5);
                    this.rectangleP1M.displayWidth = 380;
                    this.player1.anims.play('ernesto-combo-1-left', true);
                    if (this.player1.anims.currentFrame.index == 9 && this.boolErnestoCombo1) {
                        console.log('Sword (lol) detected!');
                        this.takeDamage(this.player2_redBar, 15);
                        this.boolErnestoCombo1 = false;
                        this.player2.setVelocityX(-1200);
                        this.player2.setVelocityY(-100);
                    }
                } else {
                    this.rectErnestoCombo1.setOrigin(0.15, 0.5);
                    this.rectangleP1M.displayWidth = 380;
                    this.player1.anims.play('ernesto-combo-1-right', true);
                    if (this.player1.anims.currentFrame.index == 9 && this.boolErnestoCombo1) {
                        console.log('Sword (lol) detected!');
                        this.takeDamage(this.player2_redBar, 15);
                        this.boolErnestoCombo1 = false;
                        this.player2.setVelocityX(1200);
                        this.player2.setVelocityY(-100);
                    }
                }
            } else if (this.P1facingLeft) {
                this.player1.setVelocityX(0);
                this.player1.anims.play('ernesto-turn-left');
            } else if (this.P1facingRight) {
                this.player1.setVelocityX(0);
                this.player1.anims.play('ernesto-turn-right');
            } else {
                this.player1.setVelocityX(0);
                this.player1.anims.play('ernesto-idle');
            }
        } else {
            this.isP1Jumping = true;
            if (this.player1.body.velocity.x < 0) {
                if (this.player1.body.velocity.y > 0) {
                    this.player1.anims.play('ernesto-up-right', true);
                } else {
                    this.player1.anims.play('ernesto-up-right', true);
                }
            } else if (this.player1.body.velocity.x > 0) {
                if (this.player1.body.velocity.y > 0) {
                    this.player1.anims.play('ernesto-up-left', true);
                } else {
                    this.player1.anims.play('ernesto-up-left', true);
                }
            }
            if (this.cursors.left.isDown) {
                this.player1.setVelocityX(-160);
            } else if (this.cursors.right.isDown) {
                this.player1.setVelocityX(160);
            }
        }

        if (this.cursors.up.isDown && !this.isP1Jumping) {
            this.player1.setVelocityY(-1000);
            this.isP1Jumping = true;
        }

        // Player 2 Logic //

        // Hitbox
        this.rectangleP2M.x = this.player2.x;
        this.rectangleP2M.y = this.player2.y;
        this.rectangleP2M.displayWidth = 100;
        //rectangleP2M.displayWidth = 150;

        // Combo1 Hitbox
        this. rectJasonCombo1.x = this.player2.x;
        this.rectJasonCombo1.y = this.player2.y;
        this.rectJasonCombo1.setStrokeStyle(0, 0x0000FF);

        // Arial1 Hitbox
        this.rectJasonArial1.x = this.player2.x;
        this.rectJasonArial1.y = this.player2.y;
        this.rectJasonArial1.setStrokeStyle(0, 0x0000FF);

        if (this.player2.body.touching.down) {
            this.isP2Jumping = false;

            if (this.a_Key.isDown) {
                this.rectangleP2M.displayWidth = 120;
                this.player2.setVelocityX(-220);
                this.player2.anims.play('jason-run-left', true);
                this.P2facingLeft = true;
                this.P2facingRight = false;
            } else if (this.d_Key.isDown) {
                this.rectangleP2M.displayWidth = 120;
                this.player2.setVelocityX(220);
                this.player2.anims.play('jason-run-right', true);
                this.P2facingRight = true;
                this.P2facingLeft = false;
            } else if (this.c_Key.isDown) {
                this.rectJasonCombo1.setStrokeStyle(1, 0x0000FF);
                this.rectangleP2M.displayWidth = 170;
                this.player2.setVelocityX(0);
                if (this.P2facingLeft) {
                    this.rectJasonCombo1.setOrigin(1.1, 0.6);
                    this.rectangleP2M.displayWidth = 170;
                    this.player2.anims.play('jason-combo-1-left', true);
                    if (this.player2.anims.currentFrame.index == 4 && this.boolJasonCombo1) {
                        console.log('Punches detected!');
                        this.takeDamage(this.player1_redBar, 7);
                        this.boolJasonCombo1 = false;
                        this.player1.setVelocityX(-500);
                        this.player1.setVelocityY(-70);
                    }
                } else {
                    this.rectJasonCombo1.setOrigin(-0.1, 0.6);
                    this.rectangleP2M.displayWidth = 170;
                    this.player2.anims.play('jason-combo-1-right', true);
                    if (this.player2.anims.currentFrame.index == 4 && this.boolJasonCombo1) {
                        console.log('Punches detected!');
                        this.takeDamage(this.player1_redBar, 7);
                        this.boolJasonCombo1 = false;
                        this.player1.setVelocityX(500);
                        this.player1.setVelocityY(-70);
                    }
                }
            } else if (this.P2facingLeft) {
                this.rectangleP2M.displayWidth = 100;
                this.player2.setVelocityX(0);
                this.player2.anims.play('jason-turn-left');
            } else if (this.P2facingRight) {
                this.rectangleP2M.displayWidth = 100;
                this.player2.setVelocityX(0);
                this.player2.anims.play('jason-turn-right');
            } else {
                this.rectangleP2M.displayWidth = 100;
                this.player2.setVelocityX(0);
                this.player2.anims.play('jason-idle');
            }
        } else {
            this.isP2Jumping = true;
            this.rectangleP2M.displayWidth = 100;
            if (this.c_Key.isDown) {
                this.rectJasonArial1.setStrokeStyle(1, 0xA020F0);
                this.rectangleP2M.displayWidth = 150;
                if (this.P2facingLeft) {
                    this.rectJasonArial1.setOrigin(0.9, -0.2);
                    this.player2.anims.play('jason-arial-1-left', true);
                    if (this.player2.anims.currentFrame.index == 1 && this.boolJasonArial1) {
                        console.log('Kicks detected!');
                        this.takeDamage(this.player1_redBar, 8);
                        this.boolJasonArial1 = false;
                        this.player1.setVelocityX(-600);
                        this.player1.setVelocityY(-100);
                    }
                } else {
                    this.rectJasonArial1.setOrigin(0.1, -0.2);
                    this.player2.anims.play('jason-arial-1-right', true);
                    if (this.player2.anims.currentFrame.index == 1 && this.boolJasonArial1) {
                        console.log('Kicks detected!');
                        this.takeDamage(this.player1_redBar, 8);
                        this.boolJasonArial1 = false;
                        this.player1.setVelocityX(600);
                        this.player1.setVelocityY(-100);
                    }
                }
            } else if (this.player2.body.velocity.x < 0) {
                if (this.c_Key.isDown) {
                    this.rectJasonArial1.setStrokeStyle(1, 0xA020F0);
                    this.rectJasonArial1.setOrigin(0.1, -0.2);
                    this.rectangleP2M.displayWidth = 150;
                    this.player2.anims.play('jason-arial-1-right', true);
                    if (this.player2.anims.currentFrame.index == 1 && this.boolJasonArial1) {
                        console.log('Kicks detected!');
                        this.takeDamage(this.player1_redBar, 8);
                        this.boolJasonArial1 = false;
                        this.player1.setVelocityX(600);
                        this.player1.setVelocityY(-100);
                    }
                } else {
                    this.rectangleP2M.displayWidth = 120;
                    this.player2.anims.play('jason-up-right', true);
                }
            } else if (this.player2.body.velocity.x > 0) {
                if (this.c_Key.isDown) {
                    this.rectJasonArial1.setStrokeStyle(1, 0xA020F0);
                    this.rectJasonArial1.setOrigin(0.9, -0.2);
                    this.rectangleP2M.displayWidth = 150;
                    this.player2.anims.play('jason-arial-1-left', true);
                    if (this.player2.anims.currentFrame.index == 1 && this.boolJasonArial1) {
                        console.log('Kicks detected!');
                        this.takeDamage(this.player1_redBar, 8);
                        this.boolJasonArial1 = false;
                        this.player1.setVelocityX(-600);
                        this.player1.setVelocityY(-100);
                    }
                } else {
                    this.rectangleP2M.displayWidth = 120;
                    this.player2.anims.play('jason-up-left', true);
                }
            }
            if (this.a_Key.isDown) {
                this.player2.setVelocityX(-160);
            } else if (this.d_Key.isDown) {
                this.player2.setVelocityX(160);
            }
        }

        if (this.w_Key.isDown && !this.isP2Jumping) {
            this.player2.setVelocityY(-1000);
            this.isP2Jumping = true;
        }
    }
}

game.scene.add('Main', main);
game.scene.start('Main');