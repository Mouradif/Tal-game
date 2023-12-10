//=============================================================================
// Tal_API
// Tal_API.js
//=============================================================================

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tal_API] [up]
* @author Tal
* @url https://tal.gg
*
* @help
* ============================================================================
* Connect to the the Tal API
* ============================================================================
*
* @param apiAddress
* @text API public IP address
* @desc IP to call to request the API
* @type string
*/

(function() {
  const pluginName = 'Tal_API';
  const $thisPlugin = this.$plugins.find(p => p.name === pluginName);
  const APIaddr = $thisPlugin.parameters.apiAddress;

  const saveFile = (params) => {
    const { json } = params;
    const url = APIaddr + '/save';
    return fetch(url, {
      method: 'POST',
      headers: {
        'x-nonce': localStorage.getItem('nonce'),
        'x-signature': localStorage.getItem('signature'),
        'content-type': 'text/plain'
      },
      body: json
    }).then(response => response.json()).catch(error => console.log('Save Error', error));
  };

  const loadFile = () => {
    const url = APIaddr + '/save';
    return fetch(url, {
      headers: {
        'x-nonce': localStorage.getItem('nonce'),
        'x-signature': localStorage.getItem('signature')
      },
    }).then(response => response.text());
  }

  const auth = ({ address }) => {
    const currentNonce = localStorage.getItem('nonce');
    const currentSig = localStorage.getItem('signature');
    return fetch(APIaddr + "/auth/" + address, {
      method: 'GET',
      headers: {
        'x-nonce': currentNonce,
        'x-signature': currentSig
      }
    }).then(
      response => response.json()
    ).then(response => {
      if (response.nonce === currentNonce) {
        return currentSig;
      }
      localStorage.setItem('nonce', response.nonce)
      return PluginManager.callCommand(this, "Tal_Web3", "sign", response)
    }).then(signature => {
      localStorage.setItem('signature', signature);
    }).then(() => true);
  }

  PluginManager.registerCommand(pluginName, "auth", params => auth(params));

  PluginManager.registerCommand(pluginName, "saveGame", params => saveFile(params));

  PluginManager.registerCommand(pluginName, "loadGame", params => loadFile(params));
})();
