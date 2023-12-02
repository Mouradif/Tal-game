//=============================================================================
// Tal_CharacterCreation
// by 0xSynon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A plugin that allows you to attach / detach custom handlers to custom events
 * @author Mouradif
 *
 * @param base
 * @text Body Parts
 * @type string[]
 * @default []
 *
 * @param hair
 * @text Hair Parts
 * @type string[]
 * @default []
 *
 * @param top
 * @text Top Parts
 * @type string[]
 * @default []
 *
 * @param bottom
 * @text Bottom Parts
 * @type string[]
 * @default []
 *
 * @command CustomizeCharacter
 * @text Start the Character Customization Scene
 *
 * @arg actor
 * @text Actor ID
 * @type actor
 */
/*~struct~CharacterPart
 *
 * @param folderName
 * @text Folder Name
 * @type string
 * @default folder
 *
 * @param options
 * @text Asset options
 * @type string[]
 * @default ["asset1", "asset2", "..."]
 */

(() => {
  const $pluginName = 'Tal_CharacterCreation';
  const $pluginDependencies = [
    'Tal_CharacterParts',
  ];
  for (const dependency of $pluginDependencies) {
    const plugin = $plugins.find(p => p.name === dependency);
    if (!plugin || !plugin.status) {
      throw new Error(`Plugin '${$pluginName}' has a missing dependency '${dependency}'`);
    }
  }
  const $plugin = $plugins.find(p => p.name === $pluginName);

  function Window_CharacterFeatureSelect() {
    this.initialize(...arguments);
  }

  Window_CharacterFeatureSelect.prototype = Object.create(Window_Command.prototype);
  Window_CharacterFeatureSelect.prototype.constructor = Window_CharacterFeatureSelect;

  Window_CharacterFeatureSelect.prototype.initialize = function(rect, actorIndex, bodyPart) {
    Window_Command.prototype.initialize.call(this, rect);
    this._actorIndex = actorIndex;
    this._bodyPart = bodyPart;
  }

  Window_CharacterFeatureSelect.prototype.select = function(index) {
    Window_Command.prototype.select.call(this, index);
    if (this._list === undefined || this._list.length === 0) return;
    $dataActors[this._actorIndex].meta.bottom = $plugin.parameters[this._bodyPart][index];
    $gamePlayer.refresh();
  };

  // function makeCreateCharacterWindow(bodyPart) {
  //   const rect = new Rectangle(0, 0, 200, Graphics.boxHeight / 2)
  //   const characterSelectWindow = new Window_CharacterFeatureSelect(rect);
  //   for (const part of $plugin.parameters[bodyPart]) {
  //     characterSelectWindow.addCommand(event.name, part, true, event);
  //   }
  //   characterSelectWindow.select(0);
  //   return characterSelectWindow;
  // }

})();
