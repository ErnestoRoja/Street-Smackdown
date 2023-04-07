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
let player1, player2, platforms, cursors, isP1Jumping, isP2Jumping;


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
    this.load.spritesheet('jason-all',
        'assets/Jason/jason-sprite-sheet.png',
        { frameWidth: 150, frameHeight: 200 }
    );
    this.load.spritesheet('jason-combo-1',
        'assets/Jason/jason-combo-1.png',
        { frameWidth: 150, frameHeight: 200 }
    );
    this.load.spritesheet('jason-arial-1',
        'assets/Jason/jason-arial-1.png',
        { frameWidth: 150, frameHeight: 200 }
    );
}

function create() {
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

    platforms = this.physics.add.staticGroup();
    let platform = platforms.create(950, 910, 'city-ground').setScale(1).refreshBody();

    player1 = this.physics.add.sprite(400, 100, 'ernesto-all').setScale(1);
    player1.setCollideWorldBounds(true);

    player2 = this.physics.add.sprite(800, 100, 'jason-all').setScale(1);
    player2.setCollideWorldBounds(true);

    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, player2);
    cursors = this.input.keyboard.createCursorKeys();

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
        frames: this.anims.generateFrameNumbers('ernesto-combo-1-right', { start: 13, end: 0}),
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
        frames: [{ key: 'jason-all', frame: 5 }],
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-run-left',
        frames: this.anims.generateFrameNumbers('jason-all', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-run-right',
        frames: this.anims.generateFrameNumbers('jason-all', { start: 7, end: 10 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-turn-left',
        frames: [{ key: 'jason-all', frame: 4 }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-turn-right',
        frames: [{ key: 'jason-all', frame: 6 }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-up-left',
        frames: [{ key: 'jason-all', frame: 12 }],
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-up-right',
        frames: [{ key: 'jason-all', frame: 11 }],
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-combo-1-left',
        frames: this.anims.generateFrameNumbers('jason-combo-1', { start: 3, end: 0}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-combo-1-right',
        frames: this.anims.generateFrameNumbers('jason-combo-1', { start: 4, end: 7}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-arial-1-left',
        frames: this.anims.generateFrameNumbers('jason-arial-1', { start: 0, end: 2}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'jason-arial-1-right',
        frames: this.anims.generateFrameNumbers('jason-arial-1', { start: 3, end: 5}),
        frameRate: 15,
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
}

var P1facingLeft, P1facingRight, P2facingLeft, P2facingRight;

function update() {

    // Player 1 logic

    if (player1.body.touching.down) {
        isP1Jumping = false;
        
        if (cursors.left.isDown) {
            player1.setVelocityX(-220);
            player1.anims.play('ernesto-run-left', true);
            P1facingLeft = true;
            P1facingRight = false;
        } else if (cursors.right.isDown) {
            player1.setVelocityX(220);
            player1.anims.play('ernesto-run-right', true);
            P1facingRight = true;
            P1facingLeft = false;
        } else if (this.k_Key.isDown) {
            player1.setVelocityX(0);
            if (P1facingLeft) {
                player1.anims.play('ernesto-combo-2-left', true);
            } else {
                player1.anims.play('ernesto-combo-2-right', true);
            }
        } else if (this.l_Key.isDown) {
            player1.setVelocityX(0);
            if (P1facingLeft) {
                player1.anims.play('ernesto-combo-1-left', true);
            } else {
                player1.anims.play('ernesto-combo-1-right', true);
            }
        } else if (P1facingLeft) {
            player1.setVelocityX(0);
            player1.anims.play('ernesto-turn-left');
        } else if (P1facingRight) {
            player1.setVelocityX(0);
            player1.anims.play('ernesto-turn-right');
        } else {
            player1.setVelocityX(0);
            player1.anims.play('ernesto-idle');
        }
    } else {
        isP1Jumping = true;

        if (player1.body.velocity.x < 0) {
            if (player1.body.velocity.y > 0) {
                player1.anims.play('ernesto-up-right', true);
            } else {
                player1.anims.play('ernesto-up-right', true);
            }
        } else if (player1.body.velocity.x > 0) {
            if (player1.body.velocity.y > 0) {
                player1.anims.play('ernesto-up-left', true);
            } else {
                player1.anims.play('ernesto-up-left', true);
            }
        }
        if (cursors.left.isDown) {
            player1.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player1.setVelocityX(160);
        }
    }

    if (cursors.up.isDown && !isP1Jumping) {
        player1.setVelocityY(-540);
        isP1Jumping = true;
    }

    // Player 2 logic

    if (player2.body.touching.down) {
        isP2Jumping = false;
        
        if (this.a_Key.isDown) {
            player2.setVelocityX(-220);
            player2.anims.play('jason-run-left', true);
            P2facingLeft = true;
            P2facingRight = false;
        } else if (this.d_Key.isDown) {
            player2.setVelocityX(220);
            player2.anims.play('jason-run-right', true);
            P2facingRight = true;
            P2facingLeft = false;
        } else if (this.c_Key.isDown) {
            player2.setVelocityX(0);
            if (P2facingLeft) {
                player2.anims.play('jason-combo-1-left', true);
            } else {
                player2.anims.play('jason-combo-1-right', true);
            }
        }

        //  else if (this.v_Key.isDown) {
        //     player2.setVelocityX(0);
        //     if (P2facingLeft) {
        //         player2.anims.play('jason-combo-1-left', true);
        //     } else {
        //         player2.anims.play('jason-combo-1-right', true);
        //     }
        // } 
        
        else if (P2facingLeft) {
            player2.setVelocityX(0);
            player2.anims.play('jason-turn-left');
        } else if (P2facingRight) {
            player2.setVelocityX(0);
            player2.anims.play('jason-turn-right');
        } else {
            player2.setVelocityX(0);
            player2.anims.play('jason-idle');
        }
    } else {
        isP2Jumping = true;

        if (this.c_Key.isDown) {
            if (P2facingLeft) {
                player2.anims.play('jason-arial-1-left', true);
            } else {
                player2.anims.play('jason-arial-1-right', true);
            }
        } else if (player2.body.velocity.x < 0) {
            if (this.c_Key.isDown) {
                player2.anims.play('jason-arial-1-right', true);
            } else {
                player2.anims.play('jason-up-right', true);
            }
        } else if (player2.body.velocity.x > 0) {
            if (this.c_Key.isDown) {
                player2.anims.play('jason-arial-1-left', true);
            } else {
                player2.anims.play('jason-up-left', true);
            }
        }
        if (this.a_Key.isDown) {
            player2.setVelocityX(-160);
        } else if (this.d_Key.isDown) {
            player2.setVelocityX(160);
        }
    }

    if (this.w_Key.isDown && !isP2Jumping) {
        player2.setVelocityY(-540);
        isP2Jumping = true;
    }

    // ----------------------------------------------------


    // if (player.body.touching.down) {
    //     // If on the ground, set isJumping to false
    //     isJumping = false;

    //     // Check if the right or left arrow key is pressed
    //     if (cursors.left.isDown) {
    //         // If left arrow key is pressed, play left animation and move left
    //         player.setVelocityX(-220);
    //         player.anims.play('left', true);
    //         facingLeft = true;
    //         facingRight = false;
    //     } else if (cursors.right.isDown) {
    //         // If right arrow key is pressed, play right animation and move right
    //         player.setVelocityX(220);
    //         player.anims.play('right', true);
    //         facingRight = true;
    //         facingLeft = false;
    //     } else if (this.c_Key.isDown && facingLeft) {
    //         // If c key is pressed, play combo-ground-1 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-1-left', true);
    //     } else if (this.c_Key.isDown && facingRight) {
    //         // If c key is pressed, play combo-ground-1 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-1-right', true);
    //     } else if (this.v_Key.isDown && facingLeft) {
    //         // If v key is pressed, play combo-ground-2 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-2-left', true);
    //     } else if (this.v_Key.isDown && facingRight) {
    //         // If v key is pressed, play combo-ground-2 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-2-right', true);
    //     } else if (this.b_Key.isDown && facingLeft) {
    //         // If b key is pressed, play combo-ground-3 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-3-left', true);
    //     } else if (this.b_Key.isDown && facingRight) {
    //         // If b key is pressed, play combo-ground-3 animation and stop moving
    //         player.setVelocityX(0);
    //         player.anims.play('combo-ground-3-right', true);
    //     } else if (facingLeft) {
    //         // If no arrow key is pressed, play idle animation
    //         player.setVelocityX(0);
    //         player.anims.play('turn-left');
    //     } else {
    //         // If no arrow key is pressed, play idle animation
    //         player.setVelocityX(0);
    //         player.anims.play('turn');
    //     }
    // } else {
    //     // If in the air, set isJumping to true
    //     isJumping = true;

    //     // Check if the player is moving left or right
    //     if (player.body.velocity.x < 0) {
    //         // If moving left, play up-left animation
    //         if (player.body.velocity.y > 0) {
    //             // If falling down, play up-left frame 0
    //             player.anims.play('up-left', true).setFrame(0);
    //         } else {
    //             // If going up, play up-left frame 1
    //             player.anims.play('up-left', true).setFrame(1);
    //         }
    //     } else if (player.body.velocity.x > 0) {
    //         // If moving right, play up-right animation
    //         if (player.body.velocity.y > 0) {
    //             // If falling down, play up-right frame 1
    //             player.anims.play('up-right', true).setFrame(1);
    //         } else {
    //             // If going up, play up-right frame 0
    //             player.anims.play('up-right', true).setFrame(0);
    //         }
    //     }

    //     // Check if the left or right arrow key is pressed and update player velocity accordingly
    //     if (cursors.left.isDown) {
    //         player.setVelocityX(-160);
    //     } else if (cursors.right.isDown) {
    //         player.setVelocityX(160);
    //     }
    // }

    // // Check if the up arrow key is pressed and the player is not already jumping
    // if (cursors.up.isDown && !isJumping) {
    //     // Make the player jump
    //     player.setVelocityY(-540);
    //     isJumping = true;

    //     // Check if the player is moving left or right
    //     if (player.body.velocity.x < 0) {
    //         // If moving left, play up-left animation and set frame 0
    //         player.anims.play('up-left', true).setFrame(0);
    //     } else if (player.body.velocity.x > 0) {
    //         // If moving right, play up-right animation and set frame 1
    //         player.anims.play('up-right', true).setFrame(1);
    //     } else if (player.body.velocity.x == 0 && facingLeft) {
    //         player.anims.play('up-left', true).setFrame(0);
    //     } else if (player.body.velocity.x == 0 && facingRight) {
    //         player.anims.play('up-right', true).setFrame(1);
    //     }
    // }
}