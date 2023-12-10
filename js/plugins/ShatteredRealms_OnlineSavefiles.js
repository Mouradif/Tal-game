//=============================================================================
// ShatteredRealms_OnlineSavefiles
// ShatteredRealms_OnlineSavefiles.js
//=============================================================================

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [ShatteredRealms_OnlineSavefiles] [up]
* @author ShatteredRealms
* @url https://shatteredrealms.io
*
* @help
* ============================================================================
* Use the ShatteredRealms logic to handle savefiles
* ============================================================================
*/

(function() {
  const ExecuteAutosave = Scene_Base.prototype.executeAutosave;
  Scene_Base.prototype.executeAutosave = function() {
    if ($dataMap.note.contains('nosave') || $gamePlayer._shouldPreventAutosave) {
      return;
    }
    ExecuteAutosave.call(this);
  };

  StorageManager.loadObject = async function(file) {
    if (file === 'config') return {};
    if (file === 'global') return [
      {
        characters: ['', 0],
        description: '',
        faces: ['', 0],
        gold: 0,
        picture: '',
        playtime: '00:00:00',
        svbattlers: [],
        timestamp: 0,
        title: 'Tal'
      }
    ];
    const json = await PluginManager.callCommand(this, 'Tal_API', 'loadGame', {});
    if (json.length === 0) {
      return null;
    }
    return await StorageManager.jsonToObject(json);
  }

  StorageManager.saveObject = async function(file, data) {
    if (file === 'config' || file === 'global') return;
    const json = await StorageManager.objectToJson(data);
    return await PluginManager.callCommand(this, 'Tal_API', 'saveGame', { json });
  }


  DataManager.loadGame = async function() {
    const content = await StorageManager.loadObject();
    if (content === null) {
      if (SceneManager._scene.constructor.name !== 'Scene_Title') return;
      SceneManager._scene.commandNewGame();
      return false;
    }
    this.createGameObjects();
    this.extractSaveContents(content);
    this.correctDataErrors();
    return true;
  };
})();
