const RefreshFollower = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function() {
  const actorData = this.actor();
  if (!actorData) {
    return RefreshFollower.call(this);
  }
  const { base, hair, top, bottom } = actorData.actor().meta;
  if (!base) {
    return RefreshFollower.call(this);
  }
  this._parts = {
    base, hair, top, bottom
  };
};

Game_Player.prototype.refresh = function() {
  const actorData = $gameParty.leader().actor();
  const { base, hair, top, bottom } = actorData.meta;
  if (!base) {
    RefreshPlayer.call(this);
    return;
  }
  this._parts = {
    base, hair, top, bottom
  }
  this._followers.refresh();
}

ImageManager.loadCharacterPart = function(part, filename) {
  return this.loadBitmap("img/character_parts/" + part + "/", filename);
};

/**
 * Sprite_Character overrides
 */
const setSpriteCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
  setSpriteCharacter.call(this, character);
  if (this.isMultipart()) {
    this._characterBase = new Sprite_CharacterPart(character, 'base');
    this._characterHair = new Sprite_CharacterPart(character, 'hair');
    this._characterTop = new Sprite_CharacterPart(character, 'top');
    this._characterBottom = new Sprite_CharacterPart(character, 'bottom');
    this.addChild(this._characterBase);
    this.addChild(this._characterHair);
    this.addChild(this._characterTop);
    this.addChild(this._characterBottom);
    this._isElementsCharacter = true;
  }
}

Sprite_Character.prototype.isMultipart = function() {
  return Boolean(this._character._parts);
}

const isCharacterImageChanged = Sprite_Character.prototype.isImageChanged;
Sprite_Character.prototype.isImageChanged = function() {
  const partChanged = this.isMultipart() ? (
    this._characterBase.isImageChanged() ||
    this._characterHair.isImageChanged() ||
    this._characterTop.isImageChanged() ||
    this._characterBottom.isImageChanged()
  ) : false;
  return partChanged || isCharacterImageChanged.call(this);
};

const updateSpriteCharacter = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
  if (this.isMultipart()) {
    this._characterBase.update();
    this._characterHair.update();
    this._characterTop.update();
    this._characterBottom.update();
    return;
  }
  updateSpriteCharacter.call(this);
}

const patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function() {
  if (this.isMultipart()) {
    return this._characterBase.patternWidth();
  }
  return patternWidth.call(this);
}

const patternHeight = Sprite_Character.prototype.patternHeight;
Sprite_Character.prototype.patternHeight = function() {
  if (this.isMultipart()) {
    return this._characterBase.patternHeight();
  }
  return patternHeight.call(this);
}


/**
 * Sprite_CharacterPart
 */
function Sprite_CharacterPart() {
  this.initialize(...arguments);
}

Sprite_CharacterPart.prototype = Object.create(Sprite_Character.prototype);
Sprite_CharacterPart.prototype.constructor = Sprite_CharacterPart;

Sprite_CharacterPart.prototype.initialize = function(character, part) {
  Sprite_Character.prototype.initialize.call(this, character);
  this._part = part;
  this._partName = null;
  this._isElementsCharacter = true;
}

Sprite_CharacterPart.prototype.updateVisibility = function() {
  Sprite.prototype.updateVisibility.call(this);
  if (this.isEmptyPart()) {
    this.visible = false;
  }
};

Sprite_CharacterPart.prototype.isMultipart = function() {
  return false;
}

Sprite_CharacterPart.prototype.isEmptyPart = function() {
  return !Boolean(this._part) || !Boolean(this._partName);
}

Sprite_CharacterPart.prototype.updateBitmap = function() {
  if (this.isImageChanged()) {
    this._partName = this._character._parts[this._part];
    this.bitmap = ImageManager.loadCharacterPart(this._part, this._partName);
  }
};

Sprite_CharacterPart.prototype.characterBlockX = function() {
  return 0;
};

Sprite_CharacterPart.prototype.characterBlockY = function() {
  return 0;
};

Sprite_CharacterPart.prototype.patternWidth = function() {
  return this.bitmap.width / 3;
}

Sprite_CharacterPart.prototype.patternHeight = function() {
  return this.bitmap.height / 4;
}

Sprite_CharacterPart.prototype.isImageChanged = function() {
  return this._partName !== this._character._parts[this._part];
}

const onLoad = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
  onLoad.call(this);
  $dataActors[2].meta.base = localStorage.getItem('player:base');
  $dataActors[2].meta.hair = localStorage.getItem('player:hair');
  $dataActors[2].meta.top = localStorage.getItem('player:top');
  $dataActors[2].meta.bottom = localStorage.getItem('player:bottom');
}
