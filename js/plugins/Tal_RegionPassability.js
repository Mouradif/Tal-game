(function() {
  const GameMapIsPassable = Game_Map.prototype.isPassable;
  Game_Map.prototype.isPassable = function(x, y, d) {
    if (this.regionId(x, y) === 99) {
      return false;
    }
    return GameMapIsPassable.call(this, x, y, d);
  };
})();
