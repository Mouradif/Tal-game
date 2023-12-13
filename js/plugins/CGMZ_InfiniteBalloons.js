/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/infiniteballoons/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to use unlimited balloon sheets
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to use different balloon sheets for
 * your balloons, removing the restriction of balloons on your game.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To use more balloons, replace the existing balloon image with one that has
 * more balloons vertically in the same format as existing balloons.
 *
 * ICON BALLOONS:
 * Icon Balloons paint the Empty Balloon graphic set in the plugin parameters
 * over the selected balloon frame, and then it paints the selected icon index
 * over the blank balloon. It is recommended to use an index in your balloon
 * sheet that is blank since the icon balloon will paint both the balloon and
 * icon itself. You can find an empty balloon graphic that works with
 * this plugin at my website under the mz resources section:
 * https://www.caspergaming.com/resources/
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * @command showBalloon
 * @text Show Balloon
 * @desc Shows additional balloons.
 *
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the balloon in the balloon file to show
 *
 * @arg eventId
 * @text Event ID
 * @type number
 * @min -1
 * @default -1
 * @desc Player = -1, This event = 0, any other number = event ID on map
 *
 * @arg wait
 * @text Wait For Completion
 * @type boolean
 * @default false
 * @desc wait for the balloon to complete
 *
 * @command showBalloonIcon
 * @text Show Icon Balloon
 * @desc Shows balloons with icons
 *
 * @arg balloonId
 * @text Balloon ID
 * @type number
 * @min 1
 * @default 1
 * @desc The ID of the balloon in the balloon file to show as background
 *
 * @arg iconId
 * @text Icon ID
 * @type number
 * @min 0
 * @default 0
 * @desc The ID of the icon to show in balloon
 *
 * @arg eventId
 * @text Event ID
 * @type number
 * @min -1
 * @default -1
 * @desc Player = -1, This event = 0, any other number = event ID on map
 *
 * @arg wait
 * @text Wait For Completion
 * @type boolean
 * @default false
 * @desc wait for the balloon to complete
 *
 * @param Icon X Offset
 * @type number
 * @min 0
 * @desc The offset for the x-value of where icons are drawn in balloons
 * @default 12
 *
 * @param Icon Y Offset
 * @type number
 * @min 0
 * @desc The offset for the y-value of where icons are drawn in balloons
 * @default 12
 *
 * @param Icon Balloon Width
 * @type number
 * @min 1
 * @desc The width to draw the icons in the balloon
 * @default 24
 *
 * @param Icon Balloon Height
 * @type number
 * @min 1
 * @desc The height to draw the icons in the balloon
 * @default 24
 *
 * @param Empty Balloon
 * @type file
 * @dir img/system
 * @desc The empty balloon file to use when drawing icons
*/
var Imported = Imported || {};
Imported.CGMZ_InfiniteBalloons = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Infinite Balloons"] = "1.0.0";
CGMZ.InfiniteBalloons = CGMZ.InfiniteBalloons || {};
CGMZ.InfiniteBalloons.parameters = PluginManager.parameters('CGMZ_InfiniteBalloons');
CGMZ.InfiniteBalloons.IconXOffset = Number(CGMZ.InfiniteBalloons.parameters["Icon X Offset"]) || 12;
CGMZ.InfiniteBalloons.IconYOffset = Number(CGMZ.InfiniteBalloons.parameters["Icon Y Offset"]) || 12;
CGMZ.InfiniteBalloons.IconBalloonWidth = Number(CGMZ.InfiniteBalloons.parameters["Icon Balloon Width"]) || 24;
CGMZ.InfiniteBalloons.IconBalloonHeight = Number(CGMZ.InfiniteBalloons.parameters["Icon Balloon Height"]) || 24;
CGMZ.InfiniteBalloons.EmptyBalloon = CGMZ.InfiniteBalloons.parameters["Empty Balloon"];
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin command for showing balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also add new show balloon command
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_InfiniteBalloons_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_InfiniteBalloons", "showBalloon", this.pluginCommandShowBalloon);
	PluginManager.registerCommand("CGMZ_InfiniteBalloons", "showBalloonIcon", this.pluginCommandShowBalloonIcon);
};
//-----------------------------------------------------------------------------
// Show balloon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandShowBalloon = function(args) {
	this._characterId = Number(args.eventId);
	const character = this.character(this._characterId);
	if(character) {
        $gameTemp.requestBalloon(character, Number(args.balloonId));
        if(args.wait === "true") {
            this.setWaitMode("balloon");
        }
    }
};
//-----------------------------------------------------------------------------
// Show balloon with Icon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandShowBalloonIcon = function(args) {
	this._characterId = Number(args.eventId);
	const character = this.character(this._characterId);
	if(character) {
        $gameTemp.requestBalloon(character, Number(args.balloonId), Number(args.iconId));
        if(args.wait === "true") {
            this.setWaitMode("balloon");
        }
    }
};
//=============================================================================
// Game_Temp
//-----------------------------------------------------------------------------
// Add ability to handle icon id in request for balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also handle optional icon parameter
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_GameTemp_requestBallon = Game_Temp.prototype.requestBalloon;
Game_Temp.prototype.requestBalloon = function(target, balloonId, iconId = null) {
	if(iconId) {
		const request = { target: target, balloonId: balloonId, iconId: iconId};
		this._balloonQueue.push(request);
		if (target.startBalloon) {
			target.startBalloon();
		}
	} else {
		alias_CGMZ_InfiniteBalloons_GameTemp_requestBallon.call(this, target, balloonId);
	}
};
//=============================================================================
// Sprite_Balloon
//-----------------------------------------------------------------------------
// Add icon (if applicable) in balloon
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also load iconset
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_loadBitmap = Sprite_Balloon.prototype.loadBitmap;
Sprite_Balloon.prototype.loadBitmap = function() {
	this._CGMZ_InfiniteBalloons_iconBitmap = ImageManager.loadSystem("IconSet");
	this._CGMZ_InfiniteBalloons_blankBitmap = ImageManager.loadSystem(CGMZ.InfiniteBalloons.EmptyBalloon);
	alias_CGMZ_InfiniteBalloons_SpriteBalloon_loadBitmap.call(this);
};
//-----------------------------------------------------------------------------
// Alias. Also setup icon
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_setup = Sprite_Balloon.prototype.setup;
Sprite_Balloon.prototype.setup = function(targetSprite, balloonId, iconId = null) {
	this._CGMZ_InfiniteBalloons_iconId = iconId;
    alias_CGMZ_InfiniteBalloons_SpriteBalloon_setup.call(this, targetSprite, balloonId);
	if(this._CGMZ_InfiniteBalloons_iconId) {
		this.CGMZ_InfiniteBalloons_drawBlank();
	}
};
//-----------------------------------------------------------------------------
// Draw icon bitmap if exists
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpriteBalloon_updateFrame = Sprite_Balloon.prototype.updateFrame;
Sprite_Balloon.prototype.updateFrame = function() {
	const startingX = this._frame.x;
    alias_CGMZ_InfiniteBalloons_SpriteBalloon_updateFrame.call(this);
	if(this._CGMZ_InfiniteBalloons_iconId) {
		const x = this.frameIndex() * 48;
		if(x !== startingX) {
			this.CGMZ_InfiniteBalloons_drawBlank();
			if(this.frameIndex() > 0) {
				this.CGMZ_InfiniteBalloons_drawIcon();
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Draw icon
//-----------------------------------------------------------------------------
Sprite_Balloon.prototype.CGMZ_InfiniteBalloons_drawIcon = function() {
	const iconIndex = this._CGMZ_InfiniteBalloons_iconId;
	// source x, y, w, h
	const sw = ImageManager.iconWidth;
    const sh = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * sw;
    const sy = Math.floor(iconIndex / 16) * sh;
	// x, y offset
	const xoffset = CGMZ.InfiniteBalloons.IconXOffset;
	const yoffset = CGMZ.InfiniteBalloons.IconYOffset;
	// balloon w, h
	const bw = 48;
    const bh = 48;
	// destination x, y, w, h
    const dx = this.frameIndex() * bw + xoffset;
    const dy = (this._balloonId - 1) * bh + yoffset;
	const dw = CGMZ.InfiniteBalloons.IconBalloonWidth;
	const dh = CGMZ.InfiniteBalloons.IconBalloonHeight;
    this.bitmap.blt(this._CGMZ_InfiniteBalloons_iconBitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw blank balloon
//-----------------------------------------------------------------------------
Sprite_Balloon.prototype.CGMZ_InfiniteBalloons_drawBlank = function() {
	const sw = 48;
    const sh = 48;
    const sx = this.frameIndex() * sw;
    const sy = 0;
	// destination x, y, w, h
    const dx = sx
    const dy = (this._balloonId - 1) * 48;
	const dw = 48;
	const dh = 48;
    this.bitmap.blt(this._CGMZ_InfiniteBalloons_blankBitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Set up balloons for icon ballons (if applicable)
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also send iconId if exists
//-----------------------------------------------------------------------------
const alias_CGMZ_InfiniteBalloons_SpritesetMap_createBalloon = Spriteset_Map.prototype.createBalloon;
Spriteset_Map.prototype.createBalloon = function(request) {
	if(request.iconId) {
		const targetSprite = this.findTargetSprite(request.target);
		if (targetSprite) {
			const sprite = new Sprite_Balloon();
			sprite.targetObject = request.target;
			sprite.setup(targetSprite, request.balloonId, request.iconId);
			this._effectsContainer.addChild(sprite);
			this._balloonSprites.push(sprite);
		}
	} else {
		alias_CGMZ_InfiniteBalloons_SpritesetMap_createBalloon.call(this, request);
	}
};