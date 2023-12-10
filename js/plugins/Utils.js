//=============================================================================
// Utils
// by 0xSynon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc This plugin should be first in the list. It defines utility functions that are used in other plugins
 * @author 0xSynon
 */

Array.prototype.shuffle = function() {
  let k, n, v;
  n = this.length;
  while (n > 1) {
    n--;
    k = Math.round(Math.random() * (n + 1));
    v = this[k];
    this[k] = this[n];
    this[n] = v;
  }
};

PluginManager.callCommand = function (self, pluginName, commandName, args) {
  const key = pluginName + ":" + commandName;
  const func = this._commands[key];
  if (typeof func === "function") {
    return func.bind(self)(args);
  }
  return null;
};

/**
 * Draw a line, new
 *
 * @method drawLine
 * @param {Number} x1 The x coordinate for the start.
 * @param {Number} y1 The y coordinate for the start.
 * @param {Number} x2 The x coordinate for the destination.
 * @param {Number} y2 The y coordinate for the destination.
 */
Bitmap.prototype.drawLine = function(x1, y1, x2, y2) {
  const context = this._context;
  context.save();
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
  this._baseTexture.update();
};

function deepParseJSON(arg) {
  if (typeof arg === 'object') {
    if (Array.isArray(arg)) {
      const ret = [];
      for (const n of arg) {
        ret.push(deepParseJSON(n));
      }
      return ret;
    }
    const ret = {};
    for (const k in arg) {
      if (!Object.prototype.hasOwnProperty.call(arg, k)) continue;
      ret[k] = deepParseJSON(arg[k]);
    }
    return ret;
  }
  if (typeof arg === 'string') {
    if (['true', 'false'].includes(arg.toLowerCase())) {
      return arg.toLowerCase() === 'true';
    }
    try {
      const parsed = JSON.parse(arg);
      return deepParseJSON(parsed);
    } catch (e) {
      return arg;
    }
  }
  return arg;
}
