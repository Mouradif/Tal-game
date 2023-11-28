(() => {
  const initGameMap = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    initGameMap.call(this);
    this._dungeonRoom = null;
    this._dungeonLayout = [];
  }

  Game_Map.prototype.isDungeonRoom = function () {
    return this._dungeonRoom !== null && this._dungeonLayout.length > 0;
  }

  Game_Map.prototype.initDungeon = function (rooms) {
    this._dungeonLayout = rooms;
  }

  const setupMap = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    setupMap.call(this, mapId);
  }

})();
