//=============================================================================
// ShatteredRealms_TitleScreen
// ShatteredRealms_TitleScreen.js
//=============================================================================

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [ShatteredRealms_TitleScreen] [up]
* @author ShatteredRealms
* @url https://shatteredrealms.io
*
* @help
* ============================================================================
* Replace the Title Screen by a MetaMask connection
* ============================================================================
*
*/

(function() {

  // =========================================================================
  // SCENES
  // =========================================================================

  Scene_Title.prototype.reloadMapIfUpdated = function() {
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
  }

  Scene_Title.prototype.connectWallet = async function() {
    if (!window.ethereum) return window.open("https://metamask.com/",'_blank');
    const address = await PluginManager.callCommand(this, "Tal_Web3", "login", { firstConnection: true });
    await PluginManager.callCommand(this, 'Tal_API', 'auth', { address });
    console.log('Auth ok');
    const load = await DataManager.loadGame();
    if (load) {
      Scene_Load.prototype.onLoadSuccess.call(this);
    }
  };

  Scene_Title.prototype.commandWindowRect = function() {
    const offsetX = $dataSystem.titleCommandWindow.offsetX;
    const offsetY = $dataSystem.titleCommandWindow.offsetY * 2; // * 3 to align center
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(2, true); // 2 instd of 3
    const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
    const wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};

  Scene_Title.prototype.createCommandWindow = function() {
    const background = $dataSystem.titleCommandWindow.background;
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_TitleCommand(rect);
    this._commandWindow.setBackgroundType(background);
    this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
    this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
    this._commandWindow.setHandler("options", this.commandOptions.bind(this));
    this._commandWindow.setHandler("connectWallet", this.connectWallet.bind(this));
    this.addWindow(this._commandWindow);
  };

  // =========================================================================
  // WINDOWS
  // =========================================================================

  Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand("Connect Wallet", "connectWallet");
    this.addCommand(TextManager.options, "options");
  };

})();
