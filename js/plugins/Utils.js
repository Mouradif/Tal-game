//=============================================================================
// Utils
// by 0xSynon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc This plugin should be first in the list. It defines utility functions that are used in other plugins
 * @author 0xSynon
 */
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
