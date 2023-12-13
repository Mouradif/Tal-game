/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/menucommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Manage the menu command window
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to easily manage the command window in the
 * menu scene. It allows you to re-arrange commands or use JavaScript to 
 * add custom commands which are capable of calling custom plugin scenes or
 * functions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The command symbol should be unique and not blank for every command. This
 * symbol is how the plugin knows internally which JS code to run.
 *
 * Some Command Symbols can have special meanings, mainly
 * when they represent the original 8 commands.
 * The following symbols represent the original 8 commands (case sensitive):
 * item - Will handle like the original item command
 * skill - Will handle like the original skill command
 * equip - Will handle like the original equip command
 * status - Will handle like the original status command
 * formation - Will handle like the original formation command
 * options - Will handle like the original options command
 * save - Will handle like the original save command
 * gameEnd - will handle like the original game end command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 * 
 * If you set the parameter "Keep Original Commands" to true, the 8 original
 * commands will be untouched and custom commands will go where the makers of
 * RPG Maker MZ intended them to go in the list of menu items. This is the
 * beginner-friendly option.
 *
 * If you set the parameter "Keep Original Commands" to false, no commands will
 * be added by default and you will need to add any menu item you wish to use
 * even if it is one of the ones that come with the maker (such as the Item
 * command). However, with this option you have more control over where in the
 * list each entry appears and you can also easily hide or disable menu entries
 * with the switches associated with them.
 * 
 * Below you can find the default 8 commands which you can copy+paste into the
 * text part of the parameter setup if using this option. You can still change
 * the order, the command name, and modify switches to enable/disable and
 * hide/show the option.
 *
 * Item command:
 * {"Command Name":"Item","Command Symbol":"item","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Skill command:
 * {"Command Name":"Skill","Command Symbol":"skill","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Equip command:
 * {"Command Name":"Equip","Command Symbol":"equip","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Status command:
 * {"Command Name":"Status","Command Symbol":"status","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Formation command:
 * {"Command Name":"Formation","Command Symbol":"formation","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Options command:
 * {"Command Name":"Options","Command Symbol":"options","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Save command:
 * {"Command Name":"Save","Command Symbol":"save","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 *
 * Game End command:
 * {"Command Name":"Game End","Command Symbol":"gameEnd","JS Command":"\"\"","Enable Switch":"0","Show Switch":"0","Required Item":"0"}
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_MenuCommandWindow.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * 1.0.0 - Initial release
 *
 * 1.0.1:
 * - Added ability to choose alignment of command text
 *
 * 1.1.0:
 * - Added option to use text codes in commands
 *
 * 1.2.0:
 * - Added option to disable commands if party doesn't have item
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
 *
 * @param Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc The alignment of the command text in the window
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands in their original order.
 *
 * @param Enable Text Codes
 * @type boolean
 * @default true
 * @desc Allow the use of text codes (such as colors) ?
*/
/*~struct~Handler:
 * @param Command Name
 * @type text
 * @desc Name of the command to display in the command window.
 *
 * @param Command Symbol
 * @type text
 * @desc This symbol is used internally to recognize the command.
 * Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type note
 * @desc JavaScript to run when command is selected.
 * @default ""
 *
 * @param Enable Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will enable the command.
 *
 * @param Show Switch
 * @type switch
 * @default 0
 * @desc Turning this switch on will show the command.
 *
 * @param Required Item
 * @type item
 * @default 0
 * @desc Item that must be in the inventory
*/
var Imported = Imported || {};
Imported.CGMZ_Menu_CommandWindow = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Menu Command Window"] = "1.2.0";
CGMZ.Menu_CommandWindow = CGMZ.Menu_CommandWindow || {};
CGMZ.Menu_CommandWindow.parameters = PluginManager.parameters('CGMZ_MenuCommandWindow');
CGMZ.Menu_CommandWindow.Alignment = CGMZ.Menu_CommandWindow.parameters["Alignment"];
CGMZ.Menu_CommandWindow.KeepOriginals = (CGMZ.Menu_CommandWindow.parameters["Keep Original Commands"] === "true");
CGMZ.Menu_CommandWindow.EnableTextCodes = (CGMZ.Menu_CommandWindow.parameters["Enable Text Codes"] === "true");
CGMZ.Menu_CommandWindow.CommandsArray = JSON.parse(CGMZ.Menu_CommandWindow.parameters["Commands"]);
CGMZ.Menu_CommandWindow.Commands = [];
for(i = 0; i < CGMZ.Menu_CommandWindow.CommandsArray.length; i++) {
	CGMZ.Menu_CommandWindow.Commands.push(JSON.parse(CGMZ.Menu_CommandWindow.CommandsArray[i]));
	CGMZ.Menu_CommandWindow.Commands[i]["Enable Switch"] = Number(CGMZ.Menu_CommandWindow.Commands[i]["Enable Switch"]);
	CGMZ.Menu_CommandWindow.Commands[i]["Show Switch"] = Number(CGMZ.Menu_CommandWindow.Commands[i]["Show Switch"]);
}
//=============================================================================
// Scene Menu
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_Menu.prototype.CGMZ_MenuCommand_commandCustom = function() {
	for(let i = 0; i < CGMZ.Menu_CommandWindow.Commands.length; i++) {
		if(this._commandWindow.currentSymbol() === CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"]) {
			try {
				eval(JSON.parse(CGMZ.Menu_CommandWindow.Commands[i]["JS Command"]));
			}
			catch (e) {
				const origin = "CGMZ Menu Command Window";
				const suggestion = "Check your JavaScript command";
				$cgmzTemp.reportError(e.message, origin, suggestion);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	alias_CGMZ_MenuCommandWindow_createCommandWindow.call(this);
	for(let i = 0; i < CGMZ.Menu_CommandWindow.Commands.length; i++) {
		if(this.CGMZ_MenuCommandWindow_isCustomCommand(CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"])) {
			this._commandWindow.setHandler(CGMZ.Menu_CommandWindow.Commands[i]["Command Symbol"], this.CGMZ_MenuCommand_commandCustom.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_Menu.prototype.CGMZ_MenuCommandWindow_isCustomCommand = function(symbol) {
	if(symbol === 'item' || symbol === 'skill' || symbol === 'equip' || symbol === 'status' ||
	symbol === 'formation' || symbol === 'options' || symbol === 'save' || symbol === 'gameEnd') {
		return false;
	}
	return true;
};
//=============================================================================
// Window MenuCommand
//-----------------------------------------------------------------------------
// Change amount of commands displayed at once and add new original commands
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Add original commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	alias_CGMZ_MenuCommandWindow_addOriginalCommands.call(this);
	for(const cmd of CGMZ.Menu_CommandWindow.Commands) {
		if(this.CGMZ_MenuCommandWindow_needsCommand(cmd)) {
			const enabled = this.CGMZ_MenuCommandWindow_getEnabledStatus(cmd);
			this.addCommand(cmd["Command Name"], cmd["Command Symbol"], enabled);
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMZ_MenuCommandWindow_needsCommand = function(cmd) {
	if(cmd["Show Switch"] > 0 && !$gameSwitches.value(cmd["Show Switch"])) {
		return false;
	}
	return this.needsCommand(cmd["Command Symbol"]);
};
//-----------------------------------------------------------------------------
// Determine if Command should show
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.CGMZ_MenuCommandWindow_getEnabledStatus = function(cmd) {
	const switchId = Number(cmd["Enable Switch"]);
	if(switchId > 0 && !$gameSwitches.value(switchId)) return false;
	const itemId = Number(cmd["Required Item"]);
	if(itemId > 0 && !$gameParty.hasItem($dataItems[itemId], false)) return false;
	switch(cmd["Command Symbol"]) {
		case 'item':
		case 'skill':
		case 'equip':
		case 'status':
			return this.areMainCommandsEnabled();
		case 'formation':
			return this.isFormationEnabled();
		case 'options':
			return this.isOptionsEnabled();
		case 'save':
			return this.isSaveEnabled();
		case 'gameEnd':
			return this.isGameEndEnabled();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Alias. Add main commands only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addMainCommands.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add formation command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addFormationCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add options command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addOptionsCommand = Window_MenuCommand.prototype.addOptionsCommand;
Window_MenuCommand.prototype.addOptionsCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addOptionsCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add save command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addSaveCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Add game end command only if original commands should not be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_MenuCommandWindow_addGameEndCommand = Window_MenuCommand.prototype.addGameEndCommand;
Window_MenuCommand.prototype.addGameEndCommand = function() {
	if(CGMZ.Menu_CommandWindow.KeepOriginals) {
		alias_CGMZ_MenuCommandWindow_addGameEndCommand.call(this);
	}
};
//-----------------------------------------------------------------------------
// Change alignment of command text
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.itemTextAlign = function() {
    return CGMZ.Menu_CommandWindow.Alignment;
};
//-----------------------------------------------------------------------------
// Allow use of text codes in command
//-----------------------------------------------------------------------------
Window_MenuCommand.prototype.drawItem = function(index) {
	if(CGMZ.Menu_CommandWindow.EnableTextCodes) {
		const rect = this.itemLineRect(index);
		const align = this.itemTextAlign();
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, align);
	} else {
		Window_Command.prototype.drawItem.call(this, index);
	}
};