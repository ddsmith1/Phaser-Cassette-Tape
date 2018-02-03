game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'cassette', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.spritesheet('cassette', 'assets/cassetteSheet.png', 727, 445);
	game.load.audio('song', ['assets/song.mp3', 'assets/song.ogg']);
	game.load.image('play','assets/play.png');
	game.load.image('pause','assets/pause.png');
	game.load.image('soundUp','assets/soundUp.png');
	game.load.image('soundDown','assets/soundDown.png');
	game.load.spritesheet('buttons','assets/audioControls.png', 70, 70);
	
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setMinMax(480,320);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

}

var cassette;
var music;
var rewindButton;
var playButton;
var pauseButton;
var soundUpButton;
var soundDownButton;
var isStarted;
var buttons;

function create() {
	
	game.stage.backgroundColor = '#fcf0db';
	
	cassette = game.add.sprite(game.world.width / 2.5, game.world.height / 7.5 , 'cassette');
	cassette.scale.setTo(0.5, 0.5);
	
	cassette.animations.add('playTape', [0,1,2,3,4,5,6,7,8,9,10,11]);
	
	rewindButton = game.add.button(24 * game.world.width / 64, 5 * game.world.height / 8, 'buttons', clickRewind, this, 0, 0, 0, 0);
	playButton = game.add.button(27 * game.world.width / 64, 5 * game.world.height / 8, 'buttons', clickPlay, this, 1, 1, 1, 1);
	pauseButton = game.add.button(30 * game.world.width / 64, 5 * game.world.height / 8, 'buttons', clickPause, this, 2, 2, 2, 2);
	soundUpButton = game.add.button(33 * game.world.width / 64, 5 * game.world.height / 8, 'buttons', clickSoundUp, this, 3, 3, 3, 3);
	soundDownButton = game.add.button(37 * game.world.width / 64, 5 * game.world.height / 8, 'buttons', clickSoundDown, this, 4, 4, 4, 4);
	
	music = game.add.audio('song');
	isStarted = 0;
	
}

function update() {
	//doNothing
}

function render() {

    // Sprite debug info
    //game.debug.spriteInfo(cassette, 32, 32);

}

function clickPlay() {
	if(music.isPlaying) {
		return;
	}
	if(isStarted != 0) {
		music.resume();
	} else {
		music.play();
		isStarted = 1;
	}
	cassette.animations.play('playTape', 20, true);
}

function clickPause() {
	music.pause();
	cassette.animations.stop();
}

function clickSoundUp() {
	if(music.volume > 1) {
		music.volume = 1;
	}
	
	if(music.volume < 1) { 
		music.volume += 0.1;
	}
}

function clickSoundDown() {
	if(music.volume < 0) {
		music.volume = 0;
	}
	
	if(music.volume > 0) {
		music.volume += -0.1;
	}
}

function clickRewind() {
	if(music.isPlaying) {
		music.play();
	} else {
		music.play();
		music.pause();
	}
}