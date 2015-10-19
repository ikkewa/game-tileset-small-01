'use strict';

var Player = require('../prefabs/player');

/**
 * Play state - the actual game
 */
function Play() {
  // define game relevant constants or Phaser.Group's
  // with `this` binding here
}

Play.prototype = {
  /**
   * Preload the game
   *
   * This is for overall keybinding and debugging.
   * Nothing really fancy happens here
   */
  preload: function preload() {
    // prevent window jumping, by binding the keys that
    // trigger the browser to scroll
    this.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    // if arrow keys needed, use `createCursorKeys`
    this.cursors = this.input.keyboard.createCursorKeys();

    // enable advance (precission) timing
    this.game.time.advancedTiming = true;

  },

  /**
   * Create the game instance that makes a 
   * level playable. Constructs the entities and
   * the basic logic that is needed
   */
  create: function create() {
    this.stage.setBackgroundColor(0xffffff);  // set backgroundcolor of stage (white)

    this.map = this.game.add.tilemap('mech01_map');
    this.map.addTilesetImage('tiled_mech01_asset01', 'tiled_mech01_assets');

    this.platform = this.map.createLayer('platform');
    this.poles = this.map.createLayer('pole');

    this.platform.resizeWorld();
    this.poles.resizeWorld();

    this.map.setCollisionBetween(1, 100, true, this.platform);
    this.map.setCollisionBetween(1, 100, true, this.poles);

    this.player = new Player(this.game, 64, this.game.height / 2 - 64);
    this.player.jumpVelocity = 700;


    // enable gravity, so that elements "fall down"
    this.physics.arcade.gravity.y = 2000;


    //this.game.world.setBounds(2880, 640);
    //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
  },

  /**
   * Update function - called on every frame
   */
  update: function update() {
    // check physics, move player position etc ...
    this.game.physics.arcade.collide(this.player, this.platform);
    this.game.physics.arcade.collide(this.player, this.poles);

    if(this.cursors.left.isDown) {
      this.player.goLeft();
    } else if(this.cursors.right.isDown) {
      this.player.goRight();
    } else {
      this.player.stopWalking();
    }

    if(this.player.isOnGround() && this.cursors.up.isDown) {
      this.player.jump();
    }
  },
  render: function render() {
  }
};

module.exports = Play;

