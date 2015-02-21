(function(exports){

	function Room(config){

		Model.call(this, config);

		this._scenes = {};
		this._cameras = {};
	};

	exports.Room = Room;
	Room.prototype = Object.create(Model.prototype);
	Room.prototype.constructor = Room;

	Room.prototype._game = null;
	Room.prototype._scenes = null;
	Room.prototype._cameras = null;

	Object.defineProperty(Room.prototype, 'game', {
		get: function(){

			return this._game;

		}
	});

	Object.defineProperty(Room.prototype, 'viewport', {
		get: function(){

			var game = this._game;
			return game ? game.viewport : null;

		}
	});

	Room.prototype.onGameStart = function(){
	};

	Room.prototype.onGameStop = function(){
	};

	Room.prototype.onEnter = function(){
	};

	Room.prototype.onExit = function(){
	};

	Room.prototype.onStep = function(){
	};

	Room.prototype.onRender = function(){
	};

	Room.prototype._onRegister = function(game){

		this._game = game;

	};

	Room.prototype._onUnregister = function(game){

		this._game === game && (this._game = game);

	};

})(Global);
