//=============================================================================
// ShatteredRealms_CameraMovement
// ShatteredRealms_CameraMovement.js
//=============================================================================


//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [ShatteredRealms_CameraMovement]
* @author ShatteredRealms
* @url https://shatteredrealms.io
*
* @help
* ============================================================================
* Allows scrolling the camera to arbitrary X/Y locations
* ============================================================================
*
* To scroll to the map position 15,12 for example, add a comment in the event
* like this:
* <Scroll X:15 Y:15>
*
* You can also scroll to a location stored in variables. Simply add 10000 to
* the coordinates. If Your variable 20 has an X coordinate and 21 has an Y
* coordinate, then create a comment like this:
* <Scroll X:10020 Y:10021>

* @command scrollTo
* @text Scroll To
* @desc Scroll To arbitrary X/Y coordinates
*
* @arg x
* @text X
* @type number
* @min 0
* @desc the X coordinate
*
* @arg y
* @text Y
* @type number
* @desc the Y coordinate
*
* @arg frames
* @text Frames (optional)
* @type number
* @desc The number of frames the scrolling should take
*
* @arg wait
* @text Wait
* @type boolean
* @desc Wait until finished
* @default false
*
* @command scrollToPlayer
* @text Scroll To Player
* @desc Scroll To Player Location
*
* @arg frames
* @text Frames (optional)
* @type number
* @desc The number of frames the scrolling should take
*
*/

(function() {
  const pluginName = 'ShatteredRealms_CameraMovement';

  const GameMapInitialize = Game_Map.prototype.initialize;

  Game_Map.prototype.initialize = function() {
    GameMapInitialize.call(this);
    this._autoScrollRest = 0;
    this._totalDistanceX = 0;
    this._totalDistanceY = 0;
  }

  Game_Map.prototype.scrollTo = function(x, y, frames = 30, wait = false) {
    if (!Boolean(x) || !Boolean(y)) {
      x = $gamePlayer.x;
      y = $gamePlayer.y;
    } else {
      x = (x > 10000) ? $gameVariables.value(x - 10000) : x.clamp(0, $dataMap.width);
      y = (y > 10000) ? $gameVariables.value(y - 10000) : y.clamp(0, $dataMap.height);
    }
    if (typeof frames !== 'number' || isNaN(frames) || frames === 0) {
      frames = 30;
    }
    this._totalDistanceX = x - (this._displayX + ((Graphics.width / 48) - 1) / 2);
    this._totalDistanceY = y - (this._displayY + ((Graphics.height / 48) - 1) / 2);
    this._totalAutoScrollFrames = frames;
    this._autoScrollRest = frames;
    if (wait) {
      $gameMap._interpreter.wait(frames);
    }
  }

  Game_Map.prototype.isAutoScrolling = function () {
    return this._autoScrollRest > 0;
  }

  const GameMapUpdateScroll = Game_Map.prototype.updateScroll;

  Game_Map.prototype.updateScroll = function() {
    GameMapUpdateScroll.call(this);
    if (this.isAutoScrolling()) {
      const lastX = this._displayX;
      const lastY = this._displayY;
      const distanceX = this._totalDistanceX / this._totalAutoScrollFrames;
      const distanceY = this._totalDistanceY / this._totalAutoScrollFrames;
      this._displayY = Math.max(this._displayY + distanceY, 0);
      this._displayX = Math.max(this._displayX + distanceX, 0);
      this._parallaxX += this._displayX + lastX;
      this._parallaxY += this._displayY + lastY;
      this._autoScrollRest--;
      if (this._autoScrollRest === 0) {
        this._totalDistanceX = 0;
        this._totalDistanceY = 0;
        this._totalAutoScrollFrames = 0;
      }
    }
  }

  PluginManager.registerCommand(pluginName, "scrollTo", params => {
    $gameMap.scrollTo(parseInt(params.x), parseInt(params.y), parseInt(params.frames), params.wait === "true");
    return true;
  });

  PluginManager.registerCommand(pluginName, "scrollToPlayer", params => {
    $gameMap.scrollTo(null, null, parseInt(params.frames));
    return true;
  });

})();
