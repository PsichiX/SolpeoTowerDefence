(function(exports){

	var Room = exports.Room;

	function GameRoom(config){

		Room.call(this, config);

	}

	exports.GameRoom = GameRoom;
	GameRoom.prototype = Object.create(Room.prototype);
	GameRoom.prototype.constructor = GameRoom;

	GameRoom.prototype._camera = null;
	GameRoom.prototype._scene = null;

	GameRoom.prototype.onEnter = function(){

		console.log('GameRoom::onEnter');

		var scene = this._scene = new Engine.Scene({
			color: 'black'
		});

		var camera = this._camera = new Engine.Camera({
			lookAt: scene
		});

		this.viewport.addCamera(camera);

	};

	GameRoom.prototype.onExit = function(){

		console.log('GameRoom::onExit');

		this.viewport.removeCamera(this._camera);
		this._camera = null;
		this._scene = null;
	
	};

	GameRoom.prototype.onStep = function(){
	
		console.log('GameRoom::onStep');
	
	};

})(Global);
