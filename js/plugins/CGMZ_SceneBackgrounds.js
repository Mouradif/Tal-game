/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/scenebackgrounds/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Change any scene's background image
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to specify the scene background image
 * displayed for each scene, even third party scenes should you know what the
 * scene is called.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * Want additional features not already present? Make suggestions on the
 * Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ------------------------------JavaScript------------------------------------
 * The scene background will depend on the JavaScript constructor for the
 * scene. In your parameters, you will set up an image for a constructor. You
 * will need to know what the scene constructor is. Below are the defaults:
 *
 * Scene_Equip
 * Scene_GameEnd
 * Scene_Item
 * Scene_Load
 * Scene_Menu
 * Scene_Name
 * Scene_Options
 * Scene_Save
 * Scene_Shop
 * Scene_Skill
 * Scene_Status
 *
 * This plugin will only work for scenes which extend Scene_MenuBase. If it
 * isn't working for your scene, it probably doesn't inherit from
 * Scene_MenuBase.
 * -------------------------Scrolling Backgrounds------------------------------
 * You can make your backgrounds scroll, similar to how map parallax images
 * can scroll. To scroll faster, reduce the scroll frames or increase the
 * scroll X/Y (further from 0). To scroll slower, increase the scroll frames
 * or reduce the scroll X/Y (closer to 0).
 * ----------------------------Error Reporting---------------------------------
 * This plugin reports common errors with parameter setup. If it doesn't seem
 * to be working, please open the dev tools by pressing F8 during a playtest,
 * and then selecting the CONSOLE tab at the top of the window that opens.
 * Look for any warning logs which come from CGMZ_SceneBackgrounds.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_SceneBackgrounds.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * 1.0.0 - Initial release
 *
 * @param Backgrounds
 * @type struct<Background>[]
 * @default []
 * @desc Set up custom backgrounds here
*/
/*~struct~Background:
 * @param Constructor
 * @desc The constructor of the scene to change the background for
 *
 * @param Image
 * @type file
 * @dir img/
 * @desc The image to display in the background
 *
 * @param Scroll
 * @type boolean
 * @default false
 * @desc Should the image scroll?
 *
 * @param Scroll X
 * @type number
 * @min -1000
 * @default 1
 * @desc horizontal scrolling speed
 *
 * @param Scroll Y
 * @type number
 * @min -1000
 * @default 1
 * @desc vertical scrolling speed
 *
 * @param Scroll Frames
 * @type number
 * @min 1
 * @default 1
 * @desc Amount of frames before scrolling
*/
var Imported = Imported || {};
Imported.CGMZ_SceneBackgrounds = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Scene Backgrounds"] = "Alpha R2";
CGMZ.SceneBackgrounds = {};
CGMZ.SceneBackgrounds.parameters = PluginManager.parameters('CGMZ_SceneBackgrounds');
CGMZ.SceneBackgrounds.Backgrounds = CGMZ_Utils.parseJSON(CGMZ.SceneBackgrounds.parameters["Backgrounds"], [], "CGMZ Scene Backgrounds", "Your Backgrounds parameter cannot be blank");
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Setup Scene Background data
//=============================================================================
//-----------------------------------------------------------------------------
// Also set up scene background data
//-----------------------------------------------------------------------------
const alias_CGMZ_SceneBackgrounds_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_SceneBackgrounds_CGMZTemp_createPluginData.call(this);
	this._sceneBackgrounds = {};
	for(const bgJSON of CGMZ.SceneBackgrounds.Backgrounds) {
		const bgObj = CGMZ_Utils.parseJSON(bgJSON, null, "CGMZ Scene Backgrounds", "One of your backgrounds is incorrect JSON: " + bgJSON);
		if(!bgObj) continue;
		this._sceneBackgrounds[bgObj.Constructor] = {
			image: bgObj.Image,
			scroll: (bgObj.Scroll === 'true'),
			scrollX: Number(bgObj["Scroll X"]),
			scrollY: Number(bgObj["Scroll Y"]),
			scrollFrames: Number(bgObj["Scroll Frames"])
		};
	}
};
//=============================================================================
// Scene_MenuBase
//-----------------------------------------------------------------------------
// Change scene background
//=============================================================================
//-----------------------------------------------------------------------------
// Change the background if set
//-----------------------------------------------------------------------------
const alias_CGMZ_SceneBackgrounds_SceneMenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	const customBackground = this.CGMZ_getCustomSceneBackground();
	if(customBackground) {
		this._CGMZ_backgroundCustomSpriteSettings = null;
		this._CGMZ_backgroundCustomSpriteFrameCounter = 0;
		const imgData = CGMZ_Utils.getImageData(customBackground.image, "img");
		if(customBackground.scroll) {
			this._backgroundCustomSprite = new TilingSprite();
			this._backgroundCustomSprite.move(0, 0, Graphics.width, Graphics.height);
			this._CGMZ_backgroundCustomSpriteSettings = {scrollX: customBackground.scrollX, scrollY: customBackground.scrollY, scrollFrames: customBackground.scrollFrames};
		} else {
			this._backgroundCustomSprite = new Sprite();
		}
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		this.addChild(this._backgroundCustomSprite);
	} else {
		alias_CGMZ_SceneBackgrounds_SceneMenuBase_createBackground.call(this);
	}
};
//-----------------------------------------------------------------------------
// Check if custom scene background exists, return it's key if so
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_getCustomSceneBackground = function() {
	for(const key of Object.keys($cgmzTemp._sceneBackgrounds)) {
		if(this.constructor.name === key) return $cgmzTemp._sceneBackgrounds[key];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Check if custom scene background exists, if so set its opacity instead
//-----------------------------------------------------------------------------
const alias_CGMZ_SceneBackgrounds_SceneMenuBase_setBackgroundOpacity = Scene_MenuBase.prototype.setBackgroundOpacity;
Scene_MenuBase.prototype.setBackgroundOpacity = function(opacity) {
	if(this._backgroundCustomSprite) {
		this._backgroundCustomSprite.opacity = opacity;
	} else {
		alias_CGMZ_SceneBackgrounds_SceneMenuBase_setBackgroundOpacity.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Also update custom background
//-----------------------------------------------------------------------------
const alias_CGMZ_SceneBackgrounds_SceneMenuBase_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
    alias_CGMZ_SceneBackgrounds_SceneMenuBase_update.call(this);
	this.CGMZ_updateBackground();
};
//-----------------------------------------------------------------------------
// Update custom background
//-----------------------------------------------------------------------------
Scene_MenuBase.prototype.CGMZ_updateBackground = function() {
    if(this._CGMZ_backgroundCustomSpriteSettings) {
		if(++this._CGMZ_backgroundCustomSpriteFrameCounter >= this._CGMZ_backgroundCustomSpriteSettings.scrollFrames) {
			this._CGMZ_backgroundCustomSpriteFrameCounter = 0;
			this._backgroundCustomSprite.origin.x += this._CGMZ_backgroundCustomSpriteSettings.scrollX;
			this._backgroundCustomSprite.origin.y += this._CGMZ_backgroundCustomSpriteSettings.scrollY;
		}
	}
};