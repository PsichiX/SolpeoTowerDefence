/**
 * this event is triggered just after BOOTSTRAP event
 * but before the default asset manager group is loaded
 */
Engine.on(Engine.PRELOAD, function(){

	Game.start(1000/30);
	Game.enterRoom('game');

});
