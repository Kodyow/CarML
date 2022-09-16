
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function() {
    var gameEngine = new GameEngine();
    var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    gameEngine.init(ctx);
	new SceneManager(gameEngine);
 
	gameEngine.start();

});