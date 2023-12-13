/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gameover/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Provides more flexibility to the Game Over scene
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Provides the option to change the Game Over scene image/music
 * based on a variable, and also allows you to add a command window to the
 * Game Over scene which the player can use to quickly get back into the game.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To change the game over image or music, before game over scene is entered
 * change the variable set up in the parameters for the image/music to a
 * number corresponding with an entry in the image/music file list parameter.
 *
 * For example, if you want to play the second music and third image in the
 * music and image file parameter, set the music variable to 2 and image
 * variable to 3.
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not support plugin commands.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_GameOver.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.1:
 * - Fixed bug with map bgm/bgs not autoplaying if using me sound type
 * 
 * Version 1.0.2:
 * - Added Spanish language help documentation
 * - This plugin will now warn instead of crash if invalid JSON detected
 *
 * @param Custom Images and Music Options
 * 
 * @param GameOver Image Variable
 * @type variable
 * @desc Determines the variable to change gameover image
 * @default 1
 * @parent Custom Images and Music Options
 * 
 * @param GameOver Music Variable
 * @type variable
 * @desc Determines the variable to change gameover music
 * @default 2
 * @parent Custom Images and Music Options
 *
 * @param Images
 * @type file[]
 * @dir img/
 * @default []
 * @desc Images to show in the game over scene.
 * @parent Custom Images and Music Options
 *
 * @param Music
 * @type file[]
 * @dir audio/
 * @default []
 * @desc Music to play in the game over scene.
 * @parent Custom Images and Music Options
 *
 * @param Command Window Options
 *
 * @param Show Command Window
 * @type boolean
 * @desc Determines whether to show the command window or not
 * @default true
 * @parent Command Window Options
 *
 * @param Command Continue
 * @desc Text for the Continue command
 * @default Continue
 * @parent Command Window Options
 *
 * @param Command Title
 * @desc Text for the Title command
 * @default To Title
 * @parent Command Window Options
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/gameover/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Proporciona más flexibilidad a la escena Game Over (Fin del Juego).
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: Brinda la opción de cambiar la imagen/música de la escena de 
 * Game Over en función de una variable, y también le permite agregar una 
 * ventana	de comando a la escena de Game Over que el jugador puede usar para
 * volver  rápidamente al juego.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Este plugin no admite comandos de plugin.
 *
 * Para cambiar la imagen o la música de Game Over, antes de ingresar a la
 * escena  de Game Over, cambia la configuración de la variable en los
 * parámetros para la  imagen/música a un número correspondiente con una
 * entrada en el parámetro de la  lista de archivos de imagen/música.
 *
 * Por ejemplo, si deseas reproducir la segunda música y la tercera imagen en 
 * el parámetro de archivo de música e imagen, establezca la variable de
 * música en 2 y la variable de imagen en 3.
 * ---------------------Historial de Versiones---------------------------------
 * Versión 1.0.1:
 * - Se corrigió un error con el mapa bgm/bgs que no se reproducía
 *	 automáticamente si se usaba el tipo de sonido.
 * 
 * Version 1.0.2:
 * - Added Spanish language help documentation
 * - This plugin will now warn instead of crash if invalid JSON detected
 *
 * @param Custom Images and Music Options
 * @text Imágenes personalizadas y opciones de música
 * 
 * @param GameOver Image Variable
 * @text Variable de imagen de Game Over
 * @type variable
 * @desc Determina la variable para cambiar la imagen del juego.
 * @default 1
 * @parent Custom Images and Music Options
 * 
 * @param GameOver Music Variable
 * @text Variable musical de GameOver
 * @type variable
 * @desc Determina la variable para cambiar la música del juego.
 * @default 2
 * @parent Custom Images and Music Options
 *
 * @param Images
 * @text Imágenes
 * @type file[]
 * @dir img/
 * @default []
 * @desc Imágenes para mostrar en la escena del fin del juego.
 * @parent Custom Images and Music Options
 *
 * @param Music
 * @text Música
 * @type file[]
 * @dir audio/
 * @default []
 * @desc Música para tocar en la escena del fin del juego.
 * @parent Custom Images and Music Options
 *
 * @param Command Window Options
 * @text Opciones de la ventana de comandos
 *
 * @param Show Command Window
 * @text Mostrar ventana de comandos
 * @type boolean
 * @desc Determina si mostrar la ventana de comandos o no.
 * @default true
 * @parent Command Window Options
 *
 * @param Command Continue
 * @text Comando Continuar
 * @desc Texto para el comando Continuar.
 * @default Continue
 * @parent Command Window Options
 *
 * @param Command Title
 * @text Título del comando
 * @desc Texto para el comando Título
 * @default To Title
 * @parent Command Window Options
*/
var Imported = Imported || {};
Imported.CGMZ_GameOver = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Game Over"] = "1.0.2";
CGMZ.GameOver = {};
CGMZ.GameOver.parameters = PluginManager.parameters('CGMZ_GameOver');
CGMZ.GameOver.ImageVariable = Number(CGMZ.GameOver.parameters["GameOver Image Variable"]);
CGMZ.GameOver.MusicVariable = Number(CGMZ.GameOver.parameters["GameOver Music Variable"]);
CGMZ.GameOver.Images = CGMZ_Utils.parseJSON(CGMZ.GameOver.parameters["Images"], [], "CGMZ GameOver", "Your Images parameter had invalid JSON and could not be read.");
CGMZ.GameOver.Music = CGMZ_Utils.parseJSON(CGMZ.GameOver.parameters["Music"], [], "CGMZ GameOver", "Your Music parameter had invalid JSON and could not be read.");
CGMZ.GameOver.ShowCommandWindow = (CGMZ.GameOver.parameters["Show Command Window"] === "true");
CGMZ.GameOver.CommandContinue = CGMZ.GameOver.parameters["Command Continue"];
CGMZ.GameOver.CommandTitle = CGMZ.GameOver.parameters["Command Title"];
//=============================================================================
// Scene_Gameover
//-----------------------------------------------------------------------------
// Show different images/music based on variable.
// modified functions: playGameoverMusic, createBackground, create, update, stop, terminate
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Play different music based on variable value.
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
Scene_Gameover.prototype.playGameoverMusic = function() {
	if($gameVariables.value(CGMZ.GameOver.MusicVariable) <= 0) {
		alias_CGMZ_GameOver_playGameoverMusic.call(this);
	}
	else {
		if($gameVariables.value(CGMZ.GameOver.MusicVariable) > CGMZ.GameOver.Music.length) {
			alias_CGMZ_GameOver_playGameoverMusic.call(this);
			const script = "CGMZ GameOver";
			const error = "Variable value out of range";
			const suggestion = "Check to make sure your GameOver Music Variable has intended value";
			$cgmzTemp.reportError(error, script, suggestion);
		} else {
			this.CGMZ_GameOver_playSound();
		}
	}
};
//-----------------------------------------------------------------------------
// Play correct sound based on variable (me, se, bgm, bgs).
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_playSound = function() {
	const file = CGMZ.GameOver.Music[$gameVariables.value(CGMZ.GameOver.MusicVariable) - 1].split("/");
	const type = file[0];
	const sound = {name: file[1], pan: 0, pitch: 100, volume: 100};
	switch(type) {
		case "me":
			AudioManager.stopBgm();
			AudioManager.stopBgs();
			AudioManager.playMe(sound);
			break;
		case "bgm":
			AudioManager.stopBgs();
			AudioManager.playBgm(sound);
			break;
		case "bgs":
			AudioManager.stopBgm();
			AudioManager.playBgs(sound);
			break;
		case "se":
			AudioManager.stopBgm();
			AudioManager.stopBgs();
			AudioManager.playSe(sound);
	}
};
//-----------------------------------------------------------------------------
// Alias. Show different Image based on variable value.
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_createBackground = Scene_Gameover.prototype.createBackground;
Scene_Gameover.prototype.createBackground = function() {
	if($gameVariables.value(CGMZ.GameOver.ImageVariable) <= 0) {
		alias_CGMZ_GameOver_createBackground.call(this);
	} else {
		if($gameVariables.value(CGMZ.GameOver.ImageVariable) > CGMZ.GameOver.Images.length) {
			alias_CGMZ_GameOver_createBackground.call(this);
			const script = "CGMZ GameOver";
			const error = "Variable value out of range";
			const suggestion = "Check to make sure your GameOver Image Variable has intended value";
			$cgmzTemp.reportError(error, script, suggestion);
		} else {
			const file = CGMZ.GameOver.Images[$gameVariables.value(CGMZ.GameOver.ImageVariable) - 1].split("/");
			const folder = 'img/' + file[0] + '/';
			const filename = file[1];
			this._backSprite = new Sprite();
			this._backSprite.bitmap = ImageManager.loadBitmap(folder, filename, 0, true);
			this.addChild(this._backSprite);
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Also create command window if option enabled
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_create = Scene_Gameover.prototype.create;
Scene_Gameover.prototype.create = function() {
	alias_CGMZ_GameOver_create.call(this);
	if(CGMZ.GameOver.ShowCommandWindow) {
		this.createWindowLayer();
		this.CGMZ_GameOver_createCommandWindow();
	}
};
//-----------------------------------------------------------------------------
// Alias. Don't gotoTitle on input if Command Window enabled.
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_update = Scene_Gameover.prototype.update;
Scene_Gameover.prototype.update = function() {
	if(CGMZ.GameOver.ShowCommandWindow) {
		if (!this.isBusy()) {
			this._commandWindow.open();
		}
		Scene_Base.prototype.update.call(this);
	} else {
		alias_CGMZ_GameOver_update.call(this);
	}
};
//-----------------------------------------------------------------------------
// Check if Command Window is closing if enabled.
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.isBusy = function() {
	if(CGMZ.GameOver.ShowCommandWindow) {
		return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
	}
	return Scene_Base.prototype.isBusy.call(this);
};
//-----------------------------------------------------------------------------
// Create Command Window
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_createCommandWindow = function() {
	const rect = this.CGMZ_GameOver_commandWindowRect();
	this._commandWindow = new CGMZ_Window_GameOverCommand(rect);
	this._commandWindow.setHandler('continue', this.CGMZ_GameOver_commandContinue.bind(this));
	this._commandWindow.setHandler('title',	 this.CGMZ_GameOver_commandTitle.bind(this));
	this.CGMZ_GameOver_addCustomHandlers();
	this.addWindow(this._commandWindow);
};
//-----------------------------------------------------------------------------
// Command window rect
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_commandWindowRect = function() {
	const ww = this.mainCommandWidth();
	const wh = this.calcWindowHeight(this.CGMZ_GameOver_numCommands(), true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = Graphics.boxHeight - wh - 96;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Number of commands in command window
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_numCommands = function() {
	return 2;
};
//-----------------------------------------------------------------------------
// Possible expansion later
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_addCustomHandlers = function() {
	// Add additional commands here
};
//-----------------------------------------------------------------------------
// Continue command handling
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_commandContinue = function() {
	this._commandWindow.close();
	SceneManager.push(Scene_Load);
};
//-----------------------------------------------------------------------------
// Title command handling
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_GameOver_commandTitle = function() {
	this._commandWindow.close();
	this.fadeOutAll();
	AudioManager.stopAll();
	this.gotoTitle();
};
//-----------------------------------------------------------------------------
// Alias. Snap for background (scene file background) if showing command window
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_terminate = Scene_Gameover.prototype.terminate;
Scene_Gameover.prototype.terminate = function() {
	if(CGMZ.GameOver.ShowCommandWindow) {
		Scene_Base.prototype.terminate.call(this);
		SceneManager.snapForBackground();
		AudioManager.stopMe();
	} else {
		alias_CGMZ_GameOver_terminate.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. No additional functionality if showing command window.
//-----------------------------------------------------------------------------
const alias_CGMZ_GameOver_stop = Scene_Gameover.prototype.stop;
Scene_Gameover.prototype.stop = function() {
	if(CGMZ.GameOver.ShowCommandWindow) {
		Scene_Base.prototype.stop.call(this);
	} else {
		alias_CGMZ_GameOver_stop.call(this);
	}
};
//=============================================================================
// CGMZ_Window_GameOverCommand
//-----------------------------------------------------------------------------
// Command Window showed on the Game Over scene.
//=============================================================================
function CGMZ_Window_GameOverCommand() {
	this.initialize(...arguments);
}
CGMZ_Window_GameOverCommand.prototype = Object.create(Window_Command.prototype);
CGMZ_Window_GameOverCommand.prototype.constructor = CGMZ_Window_GameOverCommand;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.openness = 0;
	this.selectLast();
};
//-----------------------------------------------------------------------------
// Command Position initialization
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand._lastCommandSymbol = null;
CGMZ_Window_GameOverCommand.initCommandPosition = function() {
	this._lastCommandSymbol = null;
};
//-----------------------------------------------------------------------------
// Create command list
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.GameOver.CommandContinue, 'continue', this.isContinueEnabled());
	this.addCommand(CGMZ.GameOver.CommandTitle, 'title');
};
//-----------------------------------------------------------------------------
// Check if continue enabled
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand.prototype.isContinueEnabled = function() {
	return DataManager.isAnySavefileExists();
};
//-----------------------------------------------------------------------------
// Processing for OK button
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand.prototype.processOk = function() {
	CGMZ_Window_GameOverCommand._lastCommandSymbol = this.currentSymbol();
	Window_Command.prototype.processOk.call(this);
};
//-----------------------------------------------------------------------------
// Choose which command to select
//-----------------------------------------------------------------------------
CGMZ_Window_GameOverCommand.prototype.selectLast = function() {
	if(CGMZ_Window_GameOverCommand._lastCommandSymbol) {
		this.selectSymbol(CGMZ_Window_GameOverCommand._lastCommandSymbol);
	} else if(this.isContinueEnabled()) {
		this.selectSymbol("continue");
	} else {
		this.selectSymbol("title");
	}
};