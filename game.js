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
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let player, platforms, cursors, isJumping;


function preload() {

    this.load.image('city', 'assets/city-pixel.jpg');
    this.load.image('city-ground', 'assets/city-ground.jpg');
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


    // Ernesto's assets
    // this.load.spritesheet('ernesto-all',
    //     'assets/jason-sprite-sheet.png',
    //     { frameWidth: 150, frameHeight: 200 }
    // );

    // // Jason's assets (147, 162)
    // this.load.spritesheet('jason-all',
    //     'assets/jason-sprite-sheet.png',
    //     { frameWidth: 150, frameHeight: 200 }
    // );
}

function create() {
    // Attack Keybinds (Player 1)
    this.c_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.v_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.b_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.x_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.add.image(945, 475, 'city');

    platforms = this.physics.add.staticGroup();
    platforms.create(950, 910, 'city-ground').setScale(1).refreshBody();

    //player = this.physics.add.sprite(400, 450, 'dude-1-idle').setScale(3);
    player = this.physics.add.sprite(400, 450, 'dude-1-idle').setScale(3);
    player.setBounce(0);
    player.setCollideWorldBounds(true);

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

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

var facingLeft, facingRight;

function update() {

    // if (player.body.touching.down) {
    //     isJumping = false;

    //     if (cursors.left.isDown) {
    //         player.setVelocityX(-220);
    //         player.anims.play('ernesto-run-left', true);
    //         facingLeft = true;
    //         facingRight = false;
    //     } else if (cursors.right.isDown) {
    //         player.setVelocityX(220);
    //         player.anims.play('ernesto-run-right', true);
    //         facingRight = true;
    //         facingLeft = false;
    //     } else if (facingLeft) {
    //         // If no arrow key is pressed, play idle animation
    //         player.setVelocityX(0);
    //         player.anims.play('ernesto-turn-left');
    //     } else if (facingRight) {
    //         // If no arrow key is pressed, play idle animation
    //         player.setVelocityX(0);
    //         player.anims.play('ernesto-turn-right');
    //     } else {
    //         // If no arrow key is pressed, play idle animation
    //         player.setVelocityX(0);
    //         player.anims.play('ernesto-idle');
    //     }
    // } else {
    //     // If in the air, set isJumping to true
    //     isJumping = true;

    //     // Check if the player is moving left or right
    //     if (player.body.velocity.x < 0) {
    //         // If moving left, play up-left animation
    //         if (player.body.velocity.y > 0) {
    //             // If falling down, play up-left frame 0
    //             player.anims.play('ernesto-up-right', true);
    //         } else {
    //             // If going up, play up-left frame 1
    //             player.anims.play('ernesto-up-right', true);
    //         }
    //     } else if (player.body.velocity.x > 0) {
    //         // If moving right, play up-right animation
    //         if (player.body.velocity.y > 0) {
    //             // If falling down, play up-right frame 1
    //             player.anims.play('ernesto-up-left', true);
    //         } else {
    //             // If going up, play up-right frame 0
    //             player.anims.play('ernesto-up-left', true);
    //         }
    //     }

    //     // Check if the left or right arrow key is pressed and update player velocity accordingly
    //     if (cursors.left.isDown) {
    //         player.setVelocityX(-160);
    //     } else if (cursors.right.isDown) {
    //         player.setVelocityX(160);
    //     }
    // }

    // if (cursors.up.isDown && !isJumping) {
    //     // Make the player jump
    //     player.setVelocityY(-540);
    //     isJumping = true;
    // }

    // ----------------------------------------------------


    if (player.body.touching.down) {
        // If on the ground, set isJumping to false
        isJumping = false;

        // Check if the right or left arrow key is pressed
        if (cursors.left.isDown) {
            // If left arrow key is pressed, play left animation and move left
            player.setVelocityX(-220);
            player.anims.play('left', true);
            facingLeft = true;
            facingRight = false;
        } else if (cursors.right.isDown) {
            // If right arrow key is pressed, play right animation and move right
            player.setVelocityX(220);
            player.anims.play('right', true);
            facingRight = true;
            facingLeft = false;
        } else if (this.c_Key.isDown && facingLeft) {
            // If c key is pressed, play combo-ground-1 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-1-left', true);
        } else if (this.c_Key.isDown && facingRight) {
            // If c key is pressed, play combo-ground-1 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-1-right', true);
        } else if (this.v_Key.isDown && facingLeft) {
            // If v key is pressed, play combo-ground-2 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-2-left', true);
        } else if (this.v_Key.isDown && facingRight) {
            // If v key is pressed, play combo-ground-2 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-2-right', true);
        } else if (this.b_Key.isDown && facingLeft) {
            // If b key is pressed, play combo-ground-3 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-3-left', true);
        } else if (this.b_Key.isDown && facingRight) {
            // If b key is pressed, play combo-ground-3 animation and stop moving
            player.setVelocityX(0);
            player.anims.play('combo-ground-3-right', true);
        } else if (facingLeft) {
            // If no arrow key is pressed, play idle animation
            player.setVelocityX(0);
            player.anims.play('turn-left');
        } else {
            // If no arrow key is pressed, play idle animation
            player.setVelocityX(0);
            player.anims.play('turn');
        }
    } else {
        // If in the air, set isJumping to true
        isJumping = true;

        // Check if the player is moving left or right
        if (player.body.velocity.x < 0) {
            // If moving left, play up-left animation
            if (player.body.velocity.y > 0) {
                // If falling down, play up-left frame 0
                player.anims.play('up-left', true).setFrame(0);
            } else {
                // If going up, play up-left frame 1
                player.anims.play('up-left', true).setFrame(1);
            }
        } else if (player.body.velocity.x > 0) {
            // If moving right, play up-right animation
            if (player.body.velocity.y > 0) {
                // If falling down, play up-right frame 1
                player.anims.play('up-right', true).setFrame(1);
            } else {
                // If going up, play up-right frame 0
                player.anims.play('up-right', true).setFrame(0);
            }
        }

        // Check if the left or right arrow key is pressed and update player velocity accordingly
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }
    }

    // Check if the up arrow key is pressed and the player is not already jumping
    if (cursors.up.isDown && !isJumping) {
        // Make the player jump
        player.setVelocityY(-540);
        isJumping = true;

        // Check if the player is moving left or right
        if (player.body.velocity.x < 0) {
            // If moving left, play up-left animation and set frame 0
            player.anims.play('up-left', true).setFrame(0);
        } else if (player.body.velocity.x > 0) {
            // If moving right, play up-right animation and set frame 1
            player.anims.play('up-right', true).setFrame(1);
        } else if (player.body.velocity.x == 0 && facingLeft) {
            player.anims.play('up-left', true).setFrame(0);
        } else if (player.body.velocity.x == 0 && facingRight) {
            player.anims.play('up-right', true).setFrame(1);
        }
    }
}