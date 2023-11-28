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

  // =========================================================================
  // SCENES
  // =========================================================================
  Scene_Load.prototype.executeLoad = function(savefileId) {
    localStorage.setItem('savefileId', savefileId);
    DataManager.loadGame(savefileId)
      .then(() => this.onLoadSuccess())
      .catch((e) => {
        if (e.message !== 'new') {
          console.log(e);
        }
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
      });
  };

  Scene_Base.prototype.executeAutosave = function() {
    if ($dataMap.note.contains('nosave') || $gamePlayer._shouldPreventAutosave) {
      return;
    }
    $gameSystem.onBeforeSave();
    const savefileId = parseInt(localStorage.getItem('savefileId'))
    if (isNaN(savefileId)) {
      console.warn('No savefile ID in local storage');
      return;
    }
    return DataManager.saveGame(savefileId)
      .then(() => this.onAutosaveSuccess())
      .catch(() => this.onAutosaveFailure());
  };

  // =========================================================================
  // WINDOWS
  // =========================================================================

  Window_SavefileList.prototype.isEnabled = function(savefileId) {
    // Forces all save slots to be clickable
    if (this._mode === "save") {
      return savefileId > 0;
    } else {
      return true; //!!DataManager.savefileInfo(savefileId);
    }
  };

  // =========================================================================
  // MANAGERS
  // =========================================================================

  DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    const contents = {};
    contents.system = $gameSystem;
    contents.screen = $gameScreen;
    contents.timer = $gameTimer;
    contents.switches = $gameSwitches;
    contents.variables = $gameVariables;
    contents.selfSwitches = $gameSelfSwitches;
    contents.actors = $gameActors;
    contents.party = $gameParty;
    contents.map = $gameMap;
    contents.player = $gamePlayer;
    // Custom below
    contents.bestiary = $cgmz._encyclopedia._bestiary;
    contents.professions = $cgmz._professions;
    contents.recipes = {};
    for (const recipe of $cgmz._recipes) {
      const { _discovered, _experience, _timesCrafted } = recipe;
      contents.recipes[recipe._name] = { _discovered, _experience, _timesCrafted };
    }
    return contents;
  };

  DataManager.extractSaveContents = function(contents) {
    $gameSystem = contents.system;
    $gameScreen = contents.screen;
    $gameTimer = contents.timer;
    $gameSwitches = contents.switches;
    $gameVariables = contents.variables;
    $gameSelfSwitches = contents.selfSwitches;
    $gameActors = contents.actors;
    $gameParty = contents.party;
    $gameMap = contents.map;
    $gamePlayer = contents.player;
    // Custom below
    if (contents.bestiary) $cgmz._encyclopedia._bestiary = contents.bestiary;
    if (contents.professions) $cgmz._professions = contents.professions;
    if (contents.recipes) {
      const names = Object.keys(contents.recipes);
      for (const name of names) {
        const recipe = $cgmz._recipes.find(r => r._name === name);
        recipe._discovered = contents.recipes[name]._discovered;
        recipe._experience = contents.recipes[name]._experience;
        recipe._timesCrafted = contents.recipes[name]._timesCrafted;
      }
    }
  };

  DataManager.saveGame = function (savefileId) {
    // On save, use DB instead of forage

    // globals
    DataManager._globalInfo[savefileId] = DataManager.makeSavefileInfo(); // Make globals for current player
    const contents = DataManager.makeSaveContents(); // gather saves contents
    return Promise.all([
      StorageManager.objectToJson(DataManager._globalInfo) // compute global infos to valid json
        .then(data => {
          return PluginManager.callCommand(this, "ShatteredRealms_API", "saveGame", {
            fileName: "global",
            data
          });
        }).catch(e => console.log('save global', e)), // endof then globalInfos
      StorageManager.objectToJson(contents) // compute saves into a valid json
        .then(data => { // continue
          return PluginManager.callCommand(this, "ShatteredRealms_API", "saveGame", {
            // send these infos to the API:
            fileName: savefileId,
            data
          }); // endof plugin callCommand
        }).catch(e => console.log('save global', e)),
    ]);
  };

  DataManager.loadGame = function(savefileId) {
    return PluginManager.callCommand(this, "ShatteredRealms_API", "loadGame", { fileName: savefileId })
      .then(contents => {
        if (Array.isArray(contents) && contents.length === 0) {
          throw new Error('new');
        }
        DataManager.createGameObjects();
        DataManager.extractSaveContents(contents);
        DataManager.correctDataErrors();
        return 0;
      });
  };

  DataManager.loadDBInfo = function() {
    return PluginManager.callCommand(this, "ShatteredRealms_API", "loadGlobal", {})
      .then(globalInfo => {
        DataManager._globalInfo = globalInfo;
        return 0;
      })
      .catch(() => {
        console.log('Failed to load globalinfo');
        DataManager._globalInfo = [];
      });
  };
})();
