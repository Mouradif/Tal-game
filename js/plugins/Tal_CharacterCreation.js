//=============================================================================
// Tal_CharacterCreation
// by 0xSynon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A plugin that allows you to attach / detach custom handlers to custom events
 * @author Mouradif
 *
 * @param parts
 * @text Character Parts
 * @type struct<CharacterPartConfig>[]
 * @default []
 *
 * @command CustomizeCharacter
 * @text Customize Character
 * @desc Starts the Character Customization Scene
 *
 * @arg actor
 * @text Actor ID
 * @type actor
 *
 * @arg part
 * @text Part Name
 * @type string
 *
 * @arg isColor
 * @text Is Color Selection
 * @type boolean
 */
/*~struct~CharacterPartConfig:
 *
 * @param folderName
 * @text Folder Name
 * @type string
 * @desc Folder under 'character_parts' where these assets are stored
 *
 * @param parts
 * @text Parts
 * @type struct<Part>[]
 * @desc List of available parts in this folder
 */
/*~struct~Part:
 *
 * @param displayName
 * @text Display Name
 * @type string
 * @desc The name of this part that will show in-game
 *
 * @param baseFileName
 * @text File Name of the base version
 * @type string
 * @desc The filename of the base version (without color suffix and without .png extension)
 *
 * @param colors
 * @text Available Colors
 * @type struct<Color>[]
 * @desc List of available color options
 */
/*~struct~Color:
 *
 * @param displayName
 * @type string
 * @text Display Name
 *
 * @param suffix
 * @type string
 * @text Suffix
 * @desc (for example _c1, _c2, or an empty string)
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

  const $pluginParams = deepParseJSON($plugin.parameters);

  const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === 'customChoice') {
      return true;
    }
    return updateWaitMode.call(this);
  }

  function Window_CharacterFeatureSelect() {
    this.initialize(...arguments);
  }

  Window_CharacterFeatureSelect.prototype = Object.create(Window_Command.prototype);
  Window_CharacterFeatureSelect.prototype.constructor = Window_CharacterFeatureSelect;

  Window_CharacterFeatureSelect.prototype.initialize = function(rect, actorIndex, bodyPart, colorFor) {
    Window_Command.prototype.initialize.call(this, rect);
    this._actorIndex = actorIndex;
    this._bodyPart = bodyPart;
    this._colorFor = colorFor;
  }

  Window_CharacterFeatureSelect.prototype.select = function(index) {
    Window_Command.prototype.select.call(this, index);
    if (this._list === undefined || this._list.length === 0) return;
    const { symbol } = this._list[index]
    if (this._colorFor === null) {
      $dataActors[this._actorIndex].meta[this._bodyPart] = symbol;
    } else {
      $dataActors[this._actorIndex].meta[this._bodyPart] = `${this._colorFor}${symbol.split(':').pop()}`;
    }
    $gamePlayer.refresh();
  };

  Window_CharacterFeatureSelect.prototype.callOkHandler = function() {
    Window_Command.prototype.callOkHandler.call(this);
    this.close();
    $gameMap._interpreter.wait(12);
    $gameMap._interpreter.setWaitMode('');
  }

  function makeCreateCharacterWindow(actorIndex, bodyPart, colorFor = null) {
    const partParams = $pluginParams.parts.find(p => p.folderName === bodyPart);
    if (!partParams) {
      throw new Error(`No body part parameters found for ${bodyPart}`);
    }
    const messageRect = SceneManager._scene.messageWindowRect();
    const rect = new Rectangle(0, 0, 300, Graphics.boxHeight - messageRect.height);
    const characterSelectWindow = new Window_CharacterFeatureSelect(rect, actorIndex, bodyPart, colorFor);
    if (colorFor === null) {
      for (const part of partParams.parts) {
        characterSelectWindow.addCommand(part.displayName, part.baseFileName);
      }
    } else {
      const part = partParams.parts.find(p => p.baseFileName === colorFor);
      if (!Array.isArray(part.colors)) {
        throw new Error(`No colors configured for part ${part}`);
      }
      for (const color of part.colors) {
        characterSelectWindow.addCommand(color.displayName, `color:${color.suffix}`);
      }
    }
    characterSelectWindow.select(0);
    return characterSelectWindow;
  }

  PluginManager.registerCommand($pluginName, 'CustomizeCharacter', function (params) {
    this.setWaitMode('customChoice');
    const actorId = Number(params.actor);
    const colorFor = params.isColor !== 'true' ? null : $dataActors[actorId].meta[params.part].split('_').shift();
    const characterCreationWindow = makeCreateCharacterWindow(actorId, params.part, colorFor)
    SceneManager._scene.addWindow(characterCreationWindow);
    Window_Selectable.prototype.refresh.call(characterCreationWindow);
  });

})();
