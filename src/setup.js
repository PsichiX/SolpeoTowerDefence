/**
 * Game viewport
 *
 * Holds all cameras defined for a game
 */
var viewport = new Engine.Viewport('engine', 800, 600);

var Game = new Global.Game({
	viewport: viewport
});

Game.addRoom('game', new Global.GameRoom());
