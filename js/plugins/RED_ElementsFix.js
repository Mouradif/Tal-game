/*:
 * @plugindesc v1.04 A simple plug-in designed to adjust the sprite draw of Time Elements characters
 * @author Hikitsune-Red 火狐
 *
 * @help
 * ================================================================================
 *
 * Just put a closing parentheses ")" at the start of an Elements character's
 * image's filename (much like "$" or "!" for other uses) and the system will
 * adjust on draw
 *
 * ================================================================================
 * TERMS OF USE
 * Free for any commercial or non-commercial project!
 * Just credit Hikitsune-Red 火狐 in your project
 * And let me know about your project! =^~^= Twitter: @hikitsune_red
 */

(function () {
	const oldisobject = ImageManager.isObjectCharacter;

	ImageManager.isObjectCharacter = function(filename) {
		const sign = filename.match(/^[!$)]+/);
		return oldisobject.call(this, filename) || (sign && sign[0].contains('!'));
	};

	const oldisbig = ImageManager.isBigCharacter;

	ImageManager.isBigCharacter = function(filename) {
		const sign = filename.match(/^[!$)]+/);
		return oldisbig.call(this, filename) || (sign && sign[0].contains('$'));
	};

	ImageManager.isElementsCharacter = function(filename) {
		const sign = filename.match(/^[!$)]+/);
		return sign && sign[0].contains(')');
	};

	const oldsetbitmap = Sprite_Character.prototype.setCharacterBitmap;

	Sprite_Character.prototype.setCharacterBitmap = function() {
		oldsetbitmap.call(this);
		this._isElementsCharacter = this.isMultipart() || ImageManager.isElementsCharacter(this._characterName);
	};

	const oldupdate = Sprite_Character.prototype.updatePosition;
	Sprite_Character.prototype.updatePosition = function() {
		oldupdate.call(this);
		if (this._isElementsCharacter) {
			this.y = this._character.screenY() + $gameMap.tileHeight();
		}
	};

	const oldupdatepos = Sprite_Actor.prototype.updatePosition;
	Sprite_Actor.prototype.updatePosition = function() {
		//Sprite_Battler.prototype.updatePosition.call(this);
		oldupdatepos.call(this);

		if (this._isElementsCharacter) {
			this.y += 48;
			this._shadowSprite.y = -48;
		}
	};

	const oldupdatebitmap = Sprite_Actor.prototype.updateBitmap;
	Sprite_Actor.prototype.updateBitmap = function() {
		const name = this._actor.battlerName();
		if (this._battlerName !== name) {
			this._isElementsCharacter = ImageManager.isElementsCharacter(name);
		}

		oldupdatebitmap.call(this);
	};

	const oldcompare = Tilemap.prototype._compareChildOrder;
	Tilemap.prototype._compareChildOrder = function(a, b) {
		const flag = b._isElementsCharacter << 1 | a._isElementsCharacter;

		if (flag === 0) {
			return oldcompare.call(this, a, b);
		} else if (a.z !== b.z) {
			return a.z - b.z;
		} else if (flag === 1 && a._character.screenY() !== b.y) {
			return a._character.screenY() - b.y;
		} else if (flag === 2 && a.y !== b._character.screenY()) {
			return a.y - b._character.screenY();
		} else if (flag === 3 && a._character.screenY() !== b._character.screenY()) {
			return a._character.screenY() - b._character.screenY();
		} else {
			return a.spriteId - b.spriteId;
		}
	};
}) ();
