'use strict';

/**
 * Preload state
 *
 * Preloader for the game to load all kind of
 * assets and lastly start the menu state
 */
function Preload() {
  // empty
}

Preload.prototype = {
  /**
   * Preload the preload state
   *
   * In the preload state all assets are loaded
   * via the `this.load` reference to Phaser.Loader.
   *
   * The visually indicate for the use the loading,
   * setup the preloadSprite system.
   */
  preload: function preload() {
    var cx = this.game.width / 2;
    var cy = this.game.height / 2;

    this.loadBackground = this.game.add.sprite(cx - 100, cy - 30, 'preload-bg');
    this.loadBar = this.game.add.sprite(cx - 100, cy - 30, 'preload-fg');

    this.load.setPreloadSprite(this.loadBar);

    // load the play button spritesheet
    this.load.spritesheet(
      'menu-btn-play',
      'assets/images/menu-btn-play.png',
      128, 32  // width+height of each frame
    );
    // load the audio for the menu
    this.load.audio('audio-menu-tick', 'assets/audio/menu-tick.mp3');
    this.load.audio('audio-menu-select', 'assets/audio/menu-select.mp3');


    this.load.image('block-red', 'assets/images/sprite_redblock.png');

    // load the tiled assets
    this.game.load.tilemap('mech01_map', 'assets/tilemaps/simple_map.json',
        null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiled_mech01_assets',
        'assets/images/tiled_mech01_asset01.png');
  },

  /**
   * Create the preload state
   *
   * When the `create` method is called, then the preload
   * of assets has been done and we can jump over
   * to the `play` state.
   */
  create: function create() {
    this.state.start('play');
  }
};

module.exports = Preload;
