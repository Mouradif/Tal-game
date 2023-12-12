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
* @param charactersAbi
* @text Characters ABI
* @desc ABI of the ERC-721 characters contract address
* @type multiline_string
*
* @param subnetAddress
* @text Subnet Address
* @type string
*
* @param ethAddress
* @text Eth Address
* @type string
*
* @param polAddress
* @text Polygon Address
* @type string
*
* @param avAddress
* @text Avalanche Address
* @type string
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
* @param chainData
* @text Chain Data
* @type multiline_string
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
*
* @command switchChain
* @text Switch Chain
*
* @arg chainName
* @text Chain Name
* @type combo
* @option Tal
* @option Ethereum
* @option Avalanche
* @option Polygon
**/

(function() {
  const $pluginName = 'Tal_Web3';
  const $plugin = $plugins.find(p => p.name === $pluginName);
  const $apiPlugin = $plugins.find(p => p.name === 'Tal_API');
  if (!$apiPlugin) {
    throw new Error('Tal_Web3 requires Tal_API');
  }

  const avalancheChainId = '0xa869';
  const polygonChainId = '0x13881';
  const ethereumChainId = '0xaa36a7';

  const polygonConfig = {
    chainId: polygonChainId,
    chainName: 'Polygon Mumbai',
    rpcUrls: ['https://polygon-mumbai-bor.publicnode.com'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
      blockExplorerUrls: [
        'https://mumbai.polygonscan.com'
      ]
    },
  }

  const avalancheConfig = {
    chainId: avalancheChainId,
    chainName: 'Avalanche Fuji',
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
      blockExplorerUrls: [
        'https://testnet.snowtrace.io'
      ]
    },
  }

  const chains = {
    Ethereum: {
      chainId: ethereumChainId,
      config: null
    },
    Avalanche: {
      chainId: avalancheChainId,
      config: avalancheConfig
    },
    Polygon: {
      chainId: polygonChainId,
      config: polygonConfig
    },
    Tal: {
      chainId: '0x54616c',
      config: null
    }
  };

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
        params: [JSON.parse($plugin.parameters.chainData)]
      }))
    ).then(() => window._TalAddress).catch((e) => {
      $gameVariables.setValue($plugin.parameters.ethStatusVariable, 500);
    });
  }

  PluginManager.registerCommand($pluginName, "mint", async function(args) {
    $gameMessage.add('Minting...');
    this.setWaitMode('customChoice');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const { result } = await window.ethereum.send('eth_chainId', []);
      const characters = new ethers.Contract($plugin.parameters.subnetAddress, $plugin.parameters.charactersAbi, signer);
      const { to, tokenId, signature } = await fetch($apiPlugin.parameters.apiAddress + '/mint', {
        method: 'POST',
        headers: {
          'x-nonce': localStorage.getItem('nonce'),
          'x-signature': localStorage.getItem('signature'),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          parts: $gamePlayer._parts,
          name: $gameActors.actor(2).name(),
          chainId: result
        })
      }).then(r => r.json());
      const tx = await characters.mint(to, tokenId, signature, {
        gasLimit: 100_000
      });
      if (result.toLowerCase() === '0x54616c') {
        await fetch($apiPlugin.parameters.apiAddress + '/mint/post', {
          method: 'POST',
          headers: {
            'x-nonce': localStorage.getItem('nonce'),
            'x-signature': localStorage.getItem('signature'),
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            hash: tx.hash
          })
        });
      }
      console.log(tx.hash);
      const receipt = await tx.wait();
      console.log(receipt.events);
    } catch (e) {
      console.log(e);
    }
    this.setWaitMode('');
    $gameMessage.add('Done');
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
  });


  PluginManager.registerCommand($pluginName, "switchChain", async function({ chainName }) {
    this.setWaitMode('customChoice');
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{
        chainId: chains[chainName].chainId
      }],
    }).catch(() => window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chains[chainName].config]
    }));
    this.setWaitMode('');
  });
})();
