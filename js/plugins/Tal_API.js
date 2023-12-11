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

function transferInstruction(map, x, y) {
  return {
    code: 201,
    indent: 0,
    parameters: [
      0,
      map,
      x,
      y,
      0,
      0
    ]
  }
}

function newEvent(name, note, x, y) {
  return {
    "id": 7,
    "name": name,
    "note": note,
    "pages": [
      {
        "conditions": {
          "actorId": 1,
          "actorValid": false,
          "itemId": 1,
          "itemValid": false,
          "selfSwitchCh": "A",
          "selfSwitchValid": false,
          "switch1Id": 1,
          "switch1Valid": false,
          "switch2Id": 1,
          "switch2Valid": false,
          "variableId": 1,
          "variableValid": false,
          "variableValue": 0
        },
        "directionFix": false,
        "image": {
          "tileId": 0,
          "characterName": "",
          "direction": 2,
          "pattern": 0,
          "characterIndex": 1
        },
        "list": [
          {
            "code": 0,
            "indent": 0,
            "parameters": []
          }
        ],
        "moveFrequency": 3,
        "moveRoute": {
          "list": [
            {
              "code": 0,
              "parameters": []
            }
          ],
          "repeat": true,
          "skippable": false,
          "wait": false
        },
        "moveSpeed": 3,
        "moveType": 0,
        "priorityType": 0,
        "stepAnime": false,
        "through": false,
        "trigger": 0,
        "walkAnime": false
      }
    ],
    "x": x,
    "y": y
  };
}

function reassembleEvents(events) {
  const input = events.filter(Boolean);
  const output = [null];
  let id = 1;
  for (const event of input) {
    output.push({...event, id });
    id++;
  }
  return output;
}

(function() {
  const $pluginName = 'Tal_API';
  const $plugin = this.$plugins.find(p => p.name === $pluginName);
  const APIaddr = $plugin.parameters.apiAddress;

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

  PluginManager.registerCommand($pluginName, "auth", params => auth(params));

  PluginManager.registerCommand($pluginName, "saveGame", params => saveFile(params));

  PluginManager.registerCommand($pluginName, "loadGame", params => loadFile(params));

  const loadMapData = DataManager.loadMapData;
  DataManager.loadMapData = function(mapId) {
    if (window._offChain || !isNaN(mapId)) {
      return loadMapData.call(this, mapId);
    }
    this.loadApiMap(mapId);
  };

  DataManager.loadApiMap = async function(src) {
    window.$dataMap = null;
    const url = APIaddr + "/map/" + src;
    const [questHash, roomNumber] = src.split('/');
    const { quest, room } = await fetch(url, {
      headers: {
        'x-nonce': localStorage.getItem('nonce'),
        'x-signature': localStorage.getItem('signature')
      }
    }).then(d => d.json());
    const prefix = quest.location.toLowerCase() === 'crypt' ? 'RoomA' : 'Wilderness';
    const n = room.north === null ? '0' : '1';
    const e = room.east === null ? '0' : '1';
    const s = room.south === null ? '0' : '1';
    const w = room.west === null ? '0' : '1';
    const mapName = [prefix, n, e, s, w].join('');
    const templateMap = $dataMapInfos.filter(Boolean).find(m => m.name === mapName);
    const templateMapData = await fetch('data/Map' + templateMap.id.padZero(3) + '.json').then(d => d.json());
    const toRemove = [];
    for (const event of templateMapData.events) {
      if (!event) continue;
      if (event.name === 'Door (North)') {
        event.pages[0].list[0] = transferInstruction([questHash, room.north].join('/'), 13, 18)
      }
      if (event.name === 'Door (East)') {
        event.pages[0].list[0] = transferInstruction([questHash, room.east].join('/'), 1, 9);
      }
      if (event.name === 'Door (South)') {
        event.pages[0].list[0] = transferInstruction([questHash, room.south].join('/'), 13, 3);
      }
      if (event.name === 'Door (West)') {
        event.pages[0].list[0] = transferInstruction([questHash, room.west].join('/'), 25, 9);
      }
      if (event.note.includes('<Enemy:') || event.note.includes('<Party:')) {
        toRemove.push(event);
      }
    }
    const toAdd = [];
    if (room.Monsters.length > 0) {
      toAdd.push(newEvent('Player', '<Party:1>', $gamePlayer._newX, $gamePlayer._newY));
    }
    let offset = 0;
    for (const monster of room.Monsters) {
      const enemyId = $dataEnemies.filter(Boolean).find(e => e.name === monster.name).id;
      const enemyEvent = newEvent(monster.name, `<Enemy:${enemyId}><SpawnRegion:11>`, 20 - offset, 20);
      toAdd.push(enemyEvent);
      offset++;
    }

    const events = reassembleEvents([
      ...templateMapData.events.filter(e => !toRemove.includes(e)),
      ...toAdd
    ]);
    templateMapData.events = events;
    DataManager.onXhrLoad({
      status: 200,
      responseText: JSON.stringify(templateMapData),
    }, '$dataMap', src, url);
  };


})();
