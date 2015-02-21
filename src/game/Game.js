(function(exports){

	var Room = exports.Room;

	function Game(config){

		Model.call(this, config);

		if('viewport' in config && config.viewport && config.viewport instanceof Engine.Viewport){
			this._viewport = config.viewport;
		}

		this._rooms = {};

	};

	exports.Game = Game;
	Game.prototype = Object.create(Model.prototype);
	Game.prototype.constructor = Game;

	Game.prototype._viewport = null;
	Game.prototype._timer = null;
	Game.prototype._timerRender = null;
	Game.prototype._rooms = null;
	Game.prototype._roomCurrent = null;
	Game.prototype._roomCurrentId = null;
	Game.prototype._roomEnter = null;
	Game.prototype._roomExit = false;

	Object.defineProperty(Game.prototype, 'viewport', {
		get: function(){

			return this._viewport;
		
		}
	});

	Game.prototype.start = function(stepDuration){

		var self = this;

		this._timer = new Engine.Timer({
			autoplay: true,
			loop: true,
			duration: stepDuration,
			on: {
				play: function(){
					self._start();
				},
				loop: function(){
					self._step();
				},
				stop: function(){
					self._stop();
				}
			}
		});

		this._timerRender = new Engine.Timer({
			type: Engine.Timer.VSYNC,
			on: {
				step: function(){
					self._render();
				}
			}
		});

	};

	Game.prototype.addRoom = function(id, room){

		var rooms = this._rooms;

		if(id !== '' && room instanceof Room && !(id in rooms)){
			rooms[id] = room;
			room._onRegister(this);
		}

	};

	Game.prototype.removeRoom = function(id){

		var rooms = this._rooms;

		if(id !== '' && id in rooms){
			rooms[id]._onUnregister(this);
			delete rooms[id];
			if(id == this._roomCurrentId){
				this._roomCurrent = null;
				this._roomCurrentId = null;
			}
		}

	};

	Game.prototype.enterRoom = function(id){

		if(id && id !== '' && typeof id === 'string'){
			this._roomEnter = id;
			this._roomExit = true;
		}

	};

	Game.prototype.exitRoom = function(){

		this._roomEnter = null;
		this._roomExit = true;

	};

	Game.prototype._start = function(){

		var current = this._roomCurrent;
		if(current){
			current.onGameStart();
		}

	};

	Game.prototype._stop = function(){

		var current = this._roomCurrent;
		if(current){
			current.onGameStop();
		}

	};

	Game.prototype._step = function(){

		var rooms = this._rooms;
		
		if(this._roomExit){
			this._roomCurrent && this._roomCurrent.onExit();
			this._roomCurrent = null;
			this._roomCurrentId = null;
			this._roomExit = false;
		}

		if(this._roomCurrent){
			var current = this._roomCurrent;
			current.onStep();
		}

		if(this._roomEnter){
			this._roomCurrentId = this._roomEnter;
			this._roomCurrent = this._rooms[this._roomEnter];
			this._roomCurrent.onEnter();
			this._roomEnter = null;
		}

	};

	Game.prototype._render = function(){

		var current = this._roomCurrent;
		if(current){
			current.onRender();
		}

	};

})(Global);
