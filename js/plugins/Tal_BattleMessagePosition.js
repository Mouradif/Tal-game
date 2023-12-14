/*:
* @plugindesc Adjusts the Y-coordinate position of the battle message window in RPG Maker MZ.
* @author [GPT-Xiamon]
*
* @param Message Window Y
* @desc The Y-coordinate for the battle message window.
* @type number
* @default 0
*
* @help
* This plugin allows you to change the Y-coordinate of the battle message window.
* Set the Y-coordinate in the plugin parameters.
*/

(() => {
    const parameters = PluginManager.parameters('BattleMessagePosition');
    const messageWindowY = Number(parameters['Message Window Y'] || 0);

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this._logWindow.y = messageWindowY;
    };
})();
