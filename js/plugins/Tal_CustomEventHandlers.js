//=============================================================================
// Tal_CustomEventHandlers
// by 0xSynon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A plugin that allows you to attach / detach custom handlers to custom events
 * @author Mouradif
 *
 * @command AttachHandler
 * @text Attach an event handler
 *
 * @arg event
 * @text Event
 * @type string
 *
 * @arg handler
 * @text Handler
 * @type multiline_string
 *
 *
 * @command DetachHandler
 * @text Detach an event handler
 *
 * @arg event
 * @text Event
 * @type string
 */
(() => {
  const $pluginName = 'Tal_CustomEventHandlers';
  const $plugin = $plugins.find(p => p.name === $pluginName);

  const Handlers = {
    onChoiceSelect: null,
  };

  Window_ChoiceList.prototype.select = function(index) {
    Window_Command.prototype.select.call(this, index);
    if (Handlers.onChoiceSelect) {
      Handlers.onChoiceSelect.call(this, index);
    }
  }

  PluginManager.registerCommand($plugin.name, "AttachHandler", ({ event, handler }) => {
    Handlers[event] = Function.prototype.isPrototypeOf(handler) ? handler : new Function('index', handler);
  });
  PluginManager.registerCommand($plugin.name, "DetachHandler", ({ event }) => {
    Handlers[event] = null;
  });
})();
