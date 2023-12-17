(() => {
  ImageManager.loadHud = function(filename) {
    return this.loadBitmap("img/hud/", filename);
  }

  /**
   * Class Sprite_Hoverable
   * @constructor
   */
  function Sprite_Hoverable() {
    this.initialize(...arguments);
  }

  Sprite_Hoverable.prototype = Object.create(Sprite_Clickable.prototype);
  Sprite_Hoverable.prototype.constructor = Sprite_Hoverable;

  Sprite_Hoverable.prototype.initialize = function() {
    Sprite_Clickable.prototype.initialize.call(this);
    this._hoverSprite = null;
  }

  Sprite_Hoverable.prototype.setHoverSprite = function(sprite) {
    this._hoverSprite = sprite;
  }

  Sprite_Hoverable.prototype.update = function() {
    Sprite_Clickable.prototype.update.call(this);
    if (!this._hoverSprite) return;
    if (this._hovered && this._hoverSprite._hidden) {
      this._hoverSprite.show();
    }
    if (!this._hovered && !this._hoverSprite._hidden) {
      this._hoverSprite.hide();
    }
  }

  /**
   * abstract class Sprite_Bar
   * @constructor
   */
  function Sprite_Bar() {
    this.initialize(...arguments);
  }

  Sprite_Bar.prototype = Object.create(Sprite_Hoverable.prototype);
  Sprite_Bar.prototype.constructor = Sprite_Bar;

  Sprite_Bar.prototype.initialize = function(hud, property, order) {
    Sprite_Hoverable.prototype.initialize.call(this);
    this._hud = hud;
    this._order = order;
    this.bitmap = ImageManager.loadHud(property + '_bar');
    this.x = 86;
    this.y = 23 + 20 * (order - 1);
  }

  Sprite_Bar.prototype.update = function() {
    Sprite_Hoverable.prototype.update.call(this);
    if (!this._hud || !this._hud._mainPartyMember) {
      this.width = 0;
      return;
    }
    this.width = this.getWidth();
  }

  Sprite_Bar.prototype.value = function() {
    return 0;
  }

  Sprite_Bar.prototype.max = function() {
    return 100;
  }

  Sprite_Bar.prototype.getWidth = function() {
    return Math.round(80 * this.value() / this.max());
  }


  function Sprite_BarInfo() {
    this.initialize(...arguments);
  }

  Sprite_BarInfo.prototype = Object.create(Sprite.prototype);
  Sprite_BarInfo.prototype.constructor = Sprite_BarInfo;

  Sprite_BarInfo.prototype.initialize = function(bar) {
    Sprite.prototype.initialize.call(this);
    this._bar = bar;
    this.y = 20 * (bar._order - 1);
    this.bitmap = new Bitmap(80, 16);
    this.bitmap.fontSize = 12;
    this._text = '';
  }

  Sprite_BarInfo.prototype.text = function() {
    if (!this._bar) return '';
    const value = this._bar.value();
    const max = this._bar.max();
    return `${value} / ${max}`;
  }

  Sprite_BarInfo.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._text !== this.text()) {
      this._text = this.text();
      this.bitmap.drawText(this.text(), 0, 0, 80, 16, 'center');
    }
  }

  function Sprite_HpBar() {
    this.initialize(...arguments);
  }

  Sprite_HpBar.prototype = Object.create(Sprite_Bar.prototype);
  Sprite_HpBar.prototype.constructor = Sprite_HpBar;

  Sprite_HpBar.prototype.initialize = function(hud) {
    Sprite_Bar.prototype.initialize.call(this, hud, 'hp', 1);
  }

  Sprite_HpBar.prototype.value = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.value.call(this);
    }
    return this._hud._mainPartyMember.hp;
  }

  Sprite_HpBar.prototype.max = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.max.call(this);
    }
    return this._hud._mainPartyMember.mhp;
  }

  function Sprite_MpBar() {
    this.initialize(...arguments);
  }

  Sprite_MpBar.prototype = Object.create(Sprite_Bar.prototype);
  Sprite_MpBar.prototype.constructor = Sprite_MpBar;

  Sprite_MpBar.prototype.initialize = function(hud) {
    Sprite_Bar.prototype.initialize.call(this, hud, 'mp', 2);
  }

  Sprite_MpBar.prototype.value = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.value.call(this);
    }
    return this._hud._mainPartyMember.mp;
  }

  Sprite_MpBar.prototype.max = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.max.call(this);
    }
    return this._hud._mainPartyMember.mmp;
  }

  function Sprite_TpBar() {
    this.initialize(...arguments);
  }

  Sprite_TpBar.prototype = Object.create(Sprite_Bar.prototype);
  Sprite_TpBar.prototype.constructor = Sprite_TpBar;

  Sprite_TpBar.prototype.initialize = function(hud) {
    Sprite_Bar.prototype.initialize.call(this, hud, 'tp', 3);
  }

  Sprite_TpBar.prototype.value = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.value.call(this);
    }
    return this._hud._mainPartyMember.tp;
  }

  Sprite_TpBar.prototype.max = function() {
    if (!this._hud || !this._hud._mainPartyMember) {
      return Sprite_Bar.prototype.max.call(this);
    }
    return this._hud._mainPartyMember.maxTp();
  }

  function Sprite_PlayerHUD() {
    this.initialize(...arguments);
  }

  Sprite_PlayerHUD.prototype = Object.create(Sprite_Hoverable.prototype);
  Sprite_PlayerHUD.prototype.constructor = Sprite_PlayerHUD;

  Sprite_PlayerHUD.prototype.initialize = function() {
    Sprite_Hoverable.prototype.initialize.call(this);
    this.initMembers();
  }

  Sprite_PlayerHUD.prototype.initMembers = function() {
    const party = $gameParty.members();
    this.bitmap = new Bitmap(182, 84)
    this._mainPartyMember = party.shift();
    this._followers = party;
    this._hp = this._mainPartyMember._hp;
    this._mp = this._mainPartyMember._mp;
    this._tp = this._mainPartyMember._tp;
    this._playerName = this._mainPartyMember._name;
    this.createMainSprite();
    this.createHpBar();
    this.createMpBar();
    this.createTpBar();
    this.createPlayerName();
    this.createBarInfos();
    this.createAvatar();
  }

  Sprite_PlayerHUD.prototype.createMainSprite = function() {
    this._mainSprite = new Sprite();
    this._mainSprite.bitmap = ImageManager.loadHud('player_hud')
    this.addChild(this._mainSprite);
  }

  Sprite_PlayerHUD.prototype.createHpBar = function() {
    this._hpBarSprite = new Sprite_HpBar(this);
    this.addChild(this._hpBarSprite);
  }

  Sprite_PlayerHUD.prototype.createMpBar = function() {
    this._mpBarSprite = new Sprite_MpBar(this);
    this.addChild(this._mpBarSprite);
  }

  Sprite_PlayerHUD.prototype.createTpBar = function() {
    this._tpBarSprite = new Sprite_TpBar(this);
    this.addChild(this._tpBarSprite);
  }

  Sprite_PlayerHUD.prototype.createPlayerName = function() {
    this._playerNameSprite = new Sprite();
    this._playerNameSprite.bitmap = new Bitmap(114, 20);
    this._playerNameSprite.bitmap.fontSize = 18;
    this._playerNameSprite.bitmap.drawText(
      this._playerName,
      0,
      0,
      114,
      20,
      "center"
    );
    this._playerNameSprite.x = 28;
    this._playerNameSprite.y = 3;
    this.addChild(this._playerNameSprite);
  }

  Sprite_PlayerHUD.prototype.createBarInfos = function() {
    this._hoverSprite = new Sprite();
    this._hoverSprite.bitmap = new Bitmap(80, 56);
    this._hoverSprite._hp = new Sprite_BarInfo(this._hpBarSprite);
    this._hoverSprite.addChild(this._hoverSprite._hp);
    this._hoverSprite._mp = new Sprite_BarInfo(this._mpBarSprite);
    this._hoverSprite.addChild(this._hoverSprite._mp);
    this._hoverSprite._tp = new Sprite_BarInfo(this._tpBarSprite);
    this._hoverSprite.addChild(this._hoverSprite._tp);
    this._hoverSprite.x = 87;
    this._hoverSprite.y = 23;
    this.addChild(this._hoverSprite);
  }

  Sprite_PlayerHUD.prototype.createAvatar = function() {

  }

  Sprite_PlayerHUD.prototype.onMouseEnter = function() {
  }

  Sprite_PlayerHUD.prototype.onMouseExit = function() {
  }

  const createSceneDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    createSceneDisplayObjects.call(this);
    this._hud = new Sprite_PlayerHUD();
    this._hud.x = 50;
    this._hud.y = 700;
    this.addChild(this._hud);
  }

})();
