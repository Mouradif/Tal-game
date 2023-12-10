//=============================================================================
// Tal_Web3
// Tal_Web3.js
//=============================================================================


//=============================================================================
/*:
* @target MZ
* @plugindesc Adds commands to interact with a Web3 Provider (like Metamask)
* @author Tal
* @url https://tal.gg
*
* @help
* ============================================================================
*
* ============================================================================
*
* @param charactersAddress
* @text Characters Contract Address
* @desc The address where the ERC-721 Smart Contract is deployed to (0x...)
* @type string
*
* @param charactersAbi
* @text Characters ABI
* @desc ABI of the ERC-721 characters contract address
* @type multiline_string
*
* @param currencyAddress
* @text Currency Contract Address
* @desc The address where your ERC-20 Smart Contract is deployed to (0x...)
* @type string
*
* @param currencyAbi
* @text Currency ABI
* @desc ABI of your ERC-20 Token address
* @type multiline_string
*
* @param itemsAddress
* @text Items Contract Address
* @desc The address where your ERC-1155 Smart Contract is deployed to (0x...)
* @type string
*
* @param itemsAbi
* @text Jobs ABI
* @desc The ABI of your ERC-1155 jobs contract
* @type multiline_string
*
* @param ethStatusVariable
* @text Ethereum Status Variable ID
* @desc ID of the variable where the Ethereum Status should be stored
* @type variable
*
* @param ethAddressActorId
* @text Ethereum Address Actor ID
* @desc ID of the actor where the Ethereum address should be stored
* @type actor
*
* @param chainId
* @text Chain ID (in hex)
* @desc ID of the chain that needs to be switched to
* @type string
*
* @command mint
* @text Mint
* @desc mint a token
*
* @arg tokenId
* @text Token ID
* @type number
* @min 0
* @desc Select which Token ID to mint.
* @default 1
*
* @arg price
* @text Price
* @type string
* @desc minting price in native tokens
*
* @command balanceOf
* @text Check Balance
* @desc Retrieves the balance of a token and store it in a variable
*
* @arg tokenId
* @text Token ID
* @type number
* @min 0
* @desc Select which Token ID to mint.
* @default 1
*
* @arg variableId
* @text Variable ID
* @type number
* @desc ID of the variable where to store the response
*
* @command login
* @text Login
* @desc Login with Metamask
**/

(function() {
  const $pluginName = 'Tal_Web3';
  const $plugin = $plugins.find(p => p.name === $pluginName);

  const initSystem = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    initSystem.call(this);
    this._offChain = false;
  }

  const MessageDoesContinue = Window_Message.prototype.doesContinue;
  Window_Message.prototype.doesContinue = function () {
    return window._TalTransactionPending || MessageDoesContinue.call(this);
  }

  const SceneMapProcessMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if (window._TalTransactionPending) return;
    SceneMapProcessMapTouch.call(this);
  }

  const SceneMapIsBusy = Scene_Map.prototype.isBusy;
  Scene_Map.prototype.isBusy = function () {
    return window._TalTransactionPending || SceneMapIsBusy.call(this);
  }

  function ethereumLogin(useVariables = false) {
    if (useVariables)
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, -1);
    if (typeof window.ethereum === 'undefined') {
      if (useVariables)
        $gameVariables.setValue($plugin.parameters.ethStatusVariable, 404);
      return;
    }
    const p = window.ethereum.request({ method: 'eth_requestAccounts' });
    return p.then(async (addresses) => {
      if (addresses.length === 0) {
        if (useVariables)
          $gameVariables.setValue($plugin.parameters.ethStatusVariable, 403);
        return;
      }
      window._TalAddress = addresses[0];
      if (useVariables)
        $gameVariables.setValue($plugin.parameters.ethStatusVariable, 200);

      $gameActors.actor($plugin.parameters.ethAddressActorId).setName(addresses[0]);
    }).then(() =>
      new Promise(resolve => setTimeout(resolve, 500))
    ).then(() =>
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: $plugin.parameters.chainId
        }],
      }).then(console.log).catch((e) => window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: $plugin.parameters.chainId,
          chainName: 'Tal Subnet',
          rpcUrls: ['https://rpc.tal.gg'],
          nativeCurrency: {
            name: 'G',
            symbol: ' G',
            decimals: 18
          },
        }]
      }))
    ).then(() => window._TalAddress).catch((e) => {
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 500);
    });
  }

  PluginManager.registerCommand($pluginName, "mint", async (args) => {
    $gameVariables.setValue($plugin.parameters.ethStatusVariable, -1);
    try {
      window._TalTransactionPending = true;
      $gameMessage.add('Minting...');
      while ($gameMessage.isBusy()) {
        await new Promise(r => setTimeout(r, 50));
        Input.virtualClick('ok');
      }
      await ethereumLogin()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const wallet = provider.getSigner();
      const abi = JSON.parse($plugin.parameters.jobsAbi);
      const contract = new ethers.Contract($plugin.parameters.jobsAddress, abi, wallet);
      const tx = await contract.mint(window._TalAddress, args.tokenId, 1, {
        value: 0 // w.utils.toWei(args.price)
      });
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 200);
      window._TalTransactionPending = false;
    } catch (e) {
      window._TalTransactionPending = false;
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 500);
    }
  });

  PluginManager.registerCommand($pluginName, "balanceOf", async (args) => {
    $gameVariables.setValue($plugin.parameters.ethStatusVariable, -1);
    try {
      window._TalTransactionPending = true;
      $gameMessage.add('Checking balance...');
      while ($gameMessage.isBusy()) {
        await new Promise(r => setTimeout(r, 50));
        Input.virtualClick('ok');
      }
      await ethereumLogin();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const wallet = provider.getSigner();
      const abi = JSON.parse($plugin.parameters.jobsAbi);
      const contract = new ethers.Contract($plugin.parameters.jobsAddress, abi, wallet);
      const balance = await contract.balanceOf(window._TalAddress, args.tokenId);
      $gameVariables.setValue(args.variableId, balance.toNumber());
      SceneManager._scene._messageWindow.terminateMessage();
      window._TalTransactionPending = false;
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 200);
    } catch (e) {
      SceneManager._scene._messageWindow.terminateMessage();
      window._TalTransactionPending = false;
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 500);
    }
  })

  PluginManager.registerCommand($pluginName, "login", () => ethereumLogin(true));

  PluginManager.registerCommand($pluginName, 'sign', async (args) => {
    window._TalTransactionPending = true;
    $gameVariables.setValue($plugin.parameters.ethStatusVariable, 0);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(args.message);
      window._TalTransactionPending = false;
      return signature;
    } catch (e) {
      console.log("SIGN FAIL", e);
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 500);
      window._TalTransactionPending = false;
    }
  })
})();
