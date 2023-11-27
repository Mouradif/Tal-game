/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/skillshop/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Creates a shop scene where you can buy skills
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Creates a shop scene where you can buy skills for actors.
 * It includes selecting which actor can learn the skill, and showing which
 * actors can learn the skill or those that already learned the skill.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ----------------------------Default Prices----------------------------------
 * You can set up default prices for skills, which will be used when the skill
 * price in the shop is set to -1. In case you set a skill price to -1 in the
 * shop and no default price was set up in the plugin parameters, this plugin
 * will fall back and use the Missing Default Price parameter.
 *
 * Default prices allow you to offer the same spells in many different shops
 * without needing to remember how much the skill should cost.
 *
 * Default prices are optional, and can always be overridden by providing a 
 * non-negative number in the shop goods parameter when calling the Skill Shop.
 * -------------------------------Note Tags------------------------------------
 * To restrict certain actors from purchasing certain skills, add the following
 * notetag to the actor in the database:
 * <cgmzssrestriction:skillId1,skillId2>
 * Example restricting skill 1 and 2 from purchase:
 * <cgmzssrestriction:1,2>
 * Note: This notetag also works for classes.
 *
 * To ensure a skill cannot be purchased before a prerequisite skill is known,
 * use the following notetag in the skill notebox in the database:
 * <cgmzssprereq:skillId1,skillId2>
 * Example preventing a skill from being purchased if the actor does not
 * already know skill 1 and 2:
 * <cgmzssprereq:1,2>
 * ----------------------------Plugin Commands---------------------------------
 * • Call Scene
 * Calls the skill shop scene with the provided shop goods (skills) for sale.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -------------------------Version History------------------------------------
 * Version 1.1.0
 * - Added default skill prices
 * - Added option to draw character sprites in the shop window
 * - Added option to draw actor face graphics in the shop window
 * - Added option to only look at learned skills for prereqs
 * - Added option to disable touch UI space at the top
 * - Added Spanish help documentation
 *
 * @command Call Scene
 * @desc Calls the Skill Shop scene
 *
 * @arg goods
 * @type struct<Skill>[]
 * @text Shop Goods
 * @desc Set up shop goods here
 * @default []
 *
 * @param Price Options
 *
 * @param Default Skill Prices
 * @parent Price Options
 * @type struct<SkillDefault>[]
 * @desc Set up default skill prices here
 * @default []
 *
 * @param Missing Default Price
 * @parent Price Options
 * @type number
 * @min 0
 * @desc Price to use if default price is not set, but default price access attempted from shop
 * @default 0
 *
 * @param Window Options
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Available Text
 * @parent Window Options
 * @desc Text to show when the actor can learn a skill
 * @default Available
 *
 * @param Already Known Text
 * @parent Window Options
 * @desc Text to show when the actor has already learned the skill
 * @default Already Known
 *
 * @param Cannot Learn Text
 * @parent Window Options
 * @desc Text to show when the actor cannot learn a skill (due to skill type or some other reason)
 * @default Cannot Learn
 *
 * @param Restricted Text
 * @parent Window Options
 * @desc Text to show when the actor cannot learn a skill due to notetag restriction
 * @default Restricted
 *
 * @param Missing Prerequisites Text
 * @parent Window Options
 * @desc Text to show when the actor cannot learn a skill due to missing prereq skills
 * @default Missing Prerequisites
 *
 * @param Learned Skills Only
 * @parent Window Options
 * @type boolean
 * @desc If prerequisites only look at learned skills (not temp skills via equips)
 * @default true
 *
 * @param Draw Character
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw character sprites. Cannot be used with Draw Face.
 * @default true
 *
 * @param Draw Face
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw face sprites. Cannot be used with Draw Character
 * @default true
 *
 * @param Face Height
 * @parent Window Options
 * @type number
 * @min 0
 * @desc The height (and width) to draw face images. 0 = default
 * @default 0
*/
/*~struct~Skill:
 * @param skill
 * @type skill
 * @default 0
 * @desc The skill to offer in the skill shop
 *
 * @param price
 * @type number
 * @min -1
 * @default -1
 * @desc The price of the skill. -1 = default price
*/
/*~struct~SkillDefault:
 * @param skill
 * @type skill
 * @default 0
 * @desc The skill to set a default price for
 *
 * @param price
 * @type number
 * @min 0
 * @default 0
 * @desc The default price of the skill
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/skillshop/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc 技能商店系统（在商店内直接学习技能）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】 V 1.1.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 1、创建一个技能商店，使角色可以直接学习技能。
 * 2、可以设置专属的技能，使某些角色不能学习。
 * 3、可以设置先决条件，需要先学习技能1才能学习技能2。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 *
 * 一、备注命令
 * 如果你需要限制某个角色不能从技能商店中学习某个技能。
 * 请在角色设置界面的"备注"栏内输入以下命令。N1、N2对应技能ID
 * <cgmzssrestriction:N1,N2>
 * 本命令同样适用于职业设置。被限制的技能可以是1个或者多个。
 *
 * 如果你想设置学习某个技能的先决条件，
 * 请在某个技能的设置界面的"备注"里输入以下命令。N1、N2对应先决技能的ID。
 * <cgmzssprereq:N1,N2>
 * 先决技能可以是1个或者是多个。
 * 
 * 二、插件指令
 * 打开技能商店：打开技能商店，并通过设置来指定本商店可以出售的技能和价格。
 * 通过不同的事件来设置不同的商店指令来出售不同的技能。
 * 
 * 三、作者注
 * This plugin is fully compatible with saved games.
 * 
 * ----------------------------Default Prices----------------------------------
 * You can set up default prices for skills, which will be used when the skill
 * price in the shop is set to -1. In case you set a skill price to -1 in the
 * shop and no default price was set up in the plugin parameters, this plugin
 * will fall back and use the Missing Default Price parameter.
 *
 * Default prices allow you to offer the same spells in many different shops
 * without needing to remember how much the skill should cost.
 *
 * Default prices are optional, and can always be overridden by providing a 
 * non-negative number in the shop goods parameter when calling the Skill Shop.
 * ----------------------------------------------------------------------------
 * 【版本历史】
 * 版本 1.1.0
 * - Added default skill prices
 * - Added option to draw character sprites in the shop window
 * - Added option to draw actor face graphics in the shop window
 * - Added option to only look at learned skills for prereqs
 * - Added option to disable touch UI space at the top
 * - Added Spanish help documentation
 *
 * @command Call Scene
 * @text 打开技能商店
 * @desc 打开技能商店
 *
 * @arg goods
 * @text 技能种类
 * @type struct<Skill>[]
 * @desc 本商店出售的技能。
 * @default []
 *
 * @param Price Options
 *
 * @param Default Skill Prices
 * @parent Price Options
 * @type struct<SkillDefault>[]
 * @desc Set up default skill prices here
 * @default []
 *
 * @param Missing Default Price
 * @parent Price Options
 * @type number
 * @min 0
 * @desc Price to use if default price is not set, but default price access attempted from shop
 * @default 0
 *
 * @param Window Options
 * @text 文本描述设置
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Available Text
 * @text 可以学习的描述
 * @parent Window Options
 * @desc 显示这个技能是可以学习的。
 * @default 可以学习
 *
 * @param Already Known Text
 * @text 已经学会的描述
 * @parent Window Options
 * @desc 显示这个技能是已经学会了的。
 * @default 已经学会
 *
 * @param Cannot Learn Text
 * @text 无法学习的描绘
 * @parent Window Options
 * @desc 显示这个技能因为技能类型或其他原因无法学习。
 * @default 无法学习
 *
 * @param Restricted Text
 * @text 被限制学习的描述
 * @parent Window Options
 * @desc 显示这个技能因为被限制而无法学习的。（通过"备注"输入指令来限制）
 * @default 被限制的
 *
 * @param Missing Prerequisites Text
 * @text 条件不足的描述
 * @parent Window Options
 * @desc 显示这个技能需要先学会某些先决技能才能学习。
 * @default 条件不足
 *
 * @param Learned Skills Only
 * @parent Window Options
 * @type boolean
 * @desc If prerequisites only look at learned skills (not temp skills via equips)
 * @default true
 *
 * @param Draw Character
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw character sprites. Cannot be used with Draw Face.
 * @default true
 *
 * @param Draw Face
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw face sprites. Cannot be used with Draw Character
 * @default true
 *
 * @param Face Height
 * @parent Window Options
 * @type number
 * @min 0
 * @desc The height (and width) to draw face images. 0 = default
 * @default 0
*/
/*~struct~Skill:zh-CN
 * @param skill
 * @text 技能
 * @type skill
 * @default 0
 * @desc 选择商店出售的技能的ID。
 *
 * @param price
 * @text 价格
 * @type number
 * @min -1
 * @default -1
 * @desc 该技能的售价。 -1 = default price
*/
/*~struct~SkillDefault:zh-CN
 * @param skill
 * @type skill
 * @default 0
 * @desc The skill to set a default price for
 *
 * @param price
 * @type number
 * @min 0
 * @default 0
 * @desc The default price of the skill
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/skillshop/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Crea una escena de tienda donde puedes comprar habilidades.
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.1.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: Crea una escena de tienda donde puedes comprar habilidades para
 * actores. Incluye seleccionar qué actor puede aprender la habilidad y mostrar
 * qué actores pueden aprender la habilidad o aquellos que ya aprendieron la
 * habilidad.
 * ----------------------------------------------------------------------------
 * Documentación:
 * ----------------------------Default Prices----------------------------------
 * You can set up default prices for skills, which will be used when the skill
 * price in the shop is set to -1. In case you set a skill price to -1 in the
 * shop and no default price was set up in the plugin parameters, this plugin
 * will fall back and use the Missing Default Price parameter.
 *
 * Default prices allow you to offer the same spells in many different shops
 * without needing to remember how much the skill should cost.
 *
 * Default prices are optional, and can always be overridden by providing a 
 * non-negative number in the shop goods parameter when calling the Skill Shop.
 * ---------------------------Etiquetas de nota--------------------------------
 * Para restringir que ciertos actores compren ciertas habilidades, agregue la 
 * siguiente etiqueta de nota al actor en la base de datos:
 * <cgmzssrestriction:skillId1,skillId2>
 * Ejemplo de restricción de habilidad 1 y 2 desde la compra:
 * <cgmzssrestriction:1,2>
 * Nota: Esta etiqueta de notas también funciona para las clases.
 *
 * Para garantizar que no se pueda comprar una habilidad antes de que se
 * conozca una habilidad previa, use la siguiente etiqueta de nota en el cuadro
 * de notas de habilidades en la base de datos:
 * <cgmzssprereq:skillId1,skillId2>
 * Ejemplo que impide que se compre una habilidad si el actor aún no conoce la
 * habilidad 1 y 2:
 * <cgmzssprereq:1,2>
 * ---------------------------Comandos de Plugin-------------------------------
 * • Escena de llamada
 * Apertura de la tienda de habilidades con los productos provistos de la
 * tienda (habilidades) en venta.
 * ----------------------------Juegos Guardados--------------------------------
 * Este plugin es totalmente compatible con los juegos guardados.
 * -------------------------Historial de Versiones-----------------------------
 * Versión 1.1.0
 * - Added default skill prices
 * - Added option to draw character sprites in the shop window
 * - Added option to draw actor face graphics in the shop window
 * - Added option to only look at learned skills for prereqs
 * - Added option to disable touch UI space at the top
 * - Added Spanish help documentation
 *
 * @command Call Scene
 * @text Abrir la tienda de habilidades
 * @desc Llamar/Abrir la tienda de habilidades.
 *
 * @arg goods
 * @text Productos
 * @type struct<Skill>[]
 * @text Shop Goods
 * @desc Configure los productos de la tienda aquí.
 * @default []
 *
 * @param Price Options
 *
 * @param Default Skill Prices
 * @parent Price Options
 * @type struct<SkillDefault>[]
 * @desc Set up default skill prices here
 * @default []
 *
 * @param Missing Default Price
 * @parent Price Options
 * @type number
 * @min 0
 * @desc Price to use if default price is not set, but default price access attempted from shop
 * @default 0
 *
 * @param Window Options
 * @text Opciones de Ventana
 *
 * @param Disable Touch UI Space
 * @parent Window Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Available Text
 * @text Texto Disponible
 * @parent Window Options
 * @desc Texto para mostrar cuando el actor puede aprender una habilidad.
 * @default Available
 *
 * @param Already Known Text
 * @text Texto Ya conocido
 * @parent Window Options
 * @desc Texto para mostrar cuando el actor ya ha aprendido la habilidad.
 * @default Already Known
 *
 * @param Cannot Learn Text
 * @text Texto No puede aprender
 * @parent Window Options
 * @desc Texto para mostrar cuando el actor no puede aprender una habilidad (debido al tipo de habilidad o alguna otra razón)
 * @default Cannot Learn
 *
 * @param Restricted Text
 * @text Texto Restringido
 * @parent Window Options
 * @desc Texto para mostrar cuando el actor no puede aprender una habilidad debido a la restricción de etiquetas de notas
 * @default Restricted
 *
 * @param Missing Prerequisites Text
 * @text Texto Requisitos previos que faltan
 * @parent Window Options
 * @desc Texto para mostrar cuando el actor no puede aprender una habilidad debido a la falta de habilidades previas.
 * @default Missing Prerequisites
 *
 * @param Learned Skills Only
 * @parent Window Options
 * @type boolean
 * @desc If prerequisites only look at learned skills (not temp skills via equips)
 * @default true
 *
 * @param Draw Character
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw character sprites. Cannot be used with Draw Face.
 * @default true
 *
 * @param Draw Face
 * @parent Window Options
 * @type boolean
 * @desc If the window should draw face sprites. Cannot be used with Draw Character
 * @default true
 *
 * @param Face Height
 * @parent Window Options
 * @type number
 * @min 0
 * @desc The height (and width) to draw face images. 0 = default
 * @default 0
*/
/*~struct~Skill:es
 * @param skill
 * @text Habilidad
 * @type skill
 * @default 0
 * @desc La habilidad para ofrecer en la tienda de habilidades.
 *
 * @param price
 * @text Precio
 * @type number
 * @min -1
 * @default -1
 * @desc Precio de la habilidad. -1 = default price
*/
/*~struct~SkillDefault:es
 * @param skill
 * @type skill
 * @default 0
 * @desc The skill to set a default price for
 *
 * @param price
 * @type number
 * @min 0
 * @default 0
 * @desc The default price of the skill
*/
var Imported = Imported || {};
Imported.CGMZ_SkillShop = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Skill Shop"] = "1.1.0";
CGMZ.SkillShop = {};
CGMZ.SkillShop.parameters = PluginManager.parameters('CGMZ_SkillShop');
CGMZ.SkillShop.AvailableText = CGMZ.SkillShop.parameters["Available Text"];
CGMZ.SkillShop.AlreadyKnownText = CGMZ.SkillShop.parameters["Already Known Text"];
CGMZ.SkillShop.CannotLearnText = CGMZ.SkillShop.parameters["Cannot Learn Text"];
CGMZ.SkillShop.RestrictedText = CGMZ.SkillShop.parameters["Restricted Text"];
CGMZ.SkillShop.MissingPrerequisitesText = CGMZ.SkillShop.parameters["Missing Prerequisites Text"];
CGMZ.SkillShop.MissingDefaultPrice = Number(CGMZ.SkillShop.parameters["Missing Default Price"]);
CGMZ.SkillShop.FaceHeight = Number(CGMZ.SkillShop.parameters["Face Height"]);
CGMZ.SkillShop.DisableTouchUISpace = (CGMZ.SkillShop.parameters["Disable Touch UI Space"] === 'true');
CGMZ.SkillShop.LearnedSkillsOnly = (CGMZ.SkillShop.parameters["Learned Skills Only"] === 'true');
CGMZ.SkillShop.DrawCharacter = (CGMZ.SkillShop.parameters["Draw Character"] === 'true');
CGMZ.SkillShop.DrawFace = (CGMZ.SkillShop.parameters["Draw Face"] === 'true');
CGMZ.SkillShop.DefaultSkillPrices = CGMZ_Utils.parseJSON(CGMZ.SkillShop.parameters["Default Skill Prices"], [], "CGMZ Skill Shop", "Your Default Skill Prices parameter could not be parsed, default skill prices will not work correctly.");
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands, default price data
//=============================================================================
//-----------------------------------------------------------------------------
// Set up default skill price data
//-----------------------------------------------------------------------------
const CGMZ_SkillShop_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	CGMZ_SkillShop_CGMZTemp_createPluginData.call(this);
	this._defaultSkillPrices = {};
	for(const skillJSON of CGMZ.SkillShop.DefaultSkillPrices) {
		const settings = CGMZ_Utils.parseJSON(skillJSON, null, "CGMZ Skill Shop", "One of your default skill prices could not be parsed due to invalid JSON. Skipping.");
		if(!settings) continue;
		this._defaultSkillPrices[Number(settings.skill)] = Number(settings.price);
	}
};
//-----------------------------------------------------------------------------
// Get a skill default price, or 0 if not exists
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getDefaultSkillShopPrice = function(skillId) {
	const defaultPrice = this._defaultSkillPrices[skillId];
	return (defaultPrice) ? defaultPrice : CGMZ.SkillShop.MissingDefaultPrice;
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_SkillShop_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_SkillShop_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_SkillShop", "Call Scene", this.pluginCommandSkillShopCallScene);
};
//-----------------------------------------------------------------------------
// Call skill shop scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSkillShopCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_SkillShop);
	SceneManager.prepareNextScene(JSON.parse(args.goods));
};
//=============================================================================
// CGMZ_Scene_SkillShop
//-----------------------------------------------------------------------------
// Handle the skill shop scene
//=============================================================================
function CGMZ_Scene_SkillShop() {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_SkillShop.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_SkillShop.prototype.constructor = CGMZ_Scene_SkillShop;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.prepare = function(goods) {
	this._goods = [];
	goods.forEach(good => {
		const skillObj = JSON.parse(good);
		this._goods.push(skillObj);
	});
	this._item = null;
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.hasTouchUI = function() {
	return !CGMZ.SkillShop.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Create skill shop windows
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.loadActorImages();
	this.createHelpWindow();
    this.createGoldWindow();
	this.createCommandWindow();
	this.createBuyWindow();
	this.createActorWindow();
};
//-----------------------------------------------------------------------------
// Load Actor Images
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.loadActorImages = function() {
	const partyMembers = $gameParty.members();
	for(const actor of partyMembers) {
		const faceBitmap = ImageManager.loadFace(actor.faceName());
		const charBitmap = ImageManager.loadCharacter(actor.characterName());
	}
};
//-----------------------------------------------------------------------------
// Create gold window
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.createGoldWindow = function() {
	const rect = this.goldWindowRect();
	this._goldWindow = new Window_Gold(rect);
	this.addWindow(this._goldWindow);
};
//-----------------------------------------------------------------------------
// Get gold window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.goldWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = this.hasTouchUI() ? this.mainAreaTop() : 0;
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create command window
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new CGMZ_Window_SkillShopCommand(rect);
    this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};
//-----------------------------------------------------------------------------
// Get command window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.commandWindowRect = function() {
    const wx = 0;
    const wy = this._goldWindow.y;
    const ww = this._goldWindow.x;
    const wh = this._goldWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create list (buy) window
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.createBuyWindow = function() {
    const rect = this.buyWindowRect();
    this._buyWindow = new CGMZ_Window_SkillShopBuy(rect);
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
	this._buyWindow.setupGoods(this._goods);
	this._buyWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._buyWindow);
};
//-----------------------------------------------------------------------------
// Get list (buy) window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.buyWindowRect = function() {
    const wx = 0;
    const wy = this._goldWindow.y + this._goldWindow.height;
    const ww = Graphics.boxWidth * 6 / 10;
    const wh = Graphics.boxHeight - this._goldWindow.y - this._goldWindow.height - this._helpWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create list (actor) window
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.createActorWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new CGMZ_Window_SkillShopActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this._buyWindow.setActorWindow(this._actorWindow);
    this.addWindow(this._actorWindow);
};
//-----------------------------------------------------------------------------
// Get list (actor) window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.actorWindowRect = function() {
    const wx = this._buyWindow.width;
    const wy = this._buyWindow.y;
    const ww = Graphics.boxWidth - wx
    const wh = this._buyWindow.height
    return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Handling for the buy command
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.commandBuy = function() {
    this._buyWindow.setMoney(this.money());
    this._buyWindow.activate();
	this._buyWindow.select(0);
};
//-----------------------------------------------------------------------------
// Handling for buy window OK (skill selected)
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.onBuyOk = function() {
    this._actorWindow.activate();
	this._actorWindow.select(0);
	this._actorWindow.ensureCursorVisible(true);
};
//-----------------------------------------------------------------------------
// Handling for buy window cancel (back out to command window)
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
	this._buyWindow.deselect();
    this._actorWindow.setItem(null);
    this._helpWindow.clear();
};
//-----------------------------------------------------------------------------
// Handling for actor window OK (purchase)
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.onActorOk = function() {
	const skill = this._buyWindow.item();
	const price = this._buyWindow.price(skill);
	const actor = this._actorWindow.item();
	SoundManager.playShop();
	$gameParty.loseGold(price);
	actor.learnSkill(skill.id);
	this._goldWindow.refresh();
	this._buyWindow.setMoney(this.money());
    this._actorWindow.refresh();
	this._actorWindow.deselect();
	this._buyWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for buy window cancel (back out to command window)
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.onActorCancel = function() {
	this._buyWindow.activate();
	this._actorWindow.deselect();
};
//-----------------------------------------------------------------------------
// Get the money value
//-----------------------------------------------------------------------------
CGMZ_Scene_SkillShop.prototype.money = function() {
	if(Imported.CGMZ_CurrencySystem) return this._goldWindow.value().val;
    return this._goldWindow.value();
};
//=============================================================================
// CGMZ_Window_SkillShopCommand
//-----------------------------------------------------------------------------
// Skill Shop Command Window
//=============================================================================
function CGMZ_Window_SkillShopCommand() {
    this.initialize(...arguments);
}
CGMZ_Window_SkillShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_SkillShopCommand.prototype.constructor = CGMZ_Window_SkillShopCommand;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Maximum columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopCommand.prototype.maxCols = function() {
    return 2;
};
//-----------------------------------------------------------------------------
// Create the command list
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy, "buy");
    this.addCommand(TextManager.cancel, "cancel");
};
//=============================================================================
// CGMZ_Window_SkillShopBuy
//-----------------------------------------------------------------------------
// Skill Shop Command Window
//=============================================================================
function CGMZ_Window_SkillShopBuy() {
    this.initialize(...arguments);
}
CGMZ_Window_SkillShopBuy.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_SkillShopBuy.prototype.constructor = CGMZ_Window_SkillShopBuy;
//-----------------------------------------------------------------------------
// Initialize the window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._money = $gameParty.gold();
};
//-----------------------------------------------------------------------------
// Set up the skills for sale
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.setupGoods = function(shopGoods) {
    this._shopGoods = shopGoods;
    this.refresh();
};
//-----------------------------------------------------------------------------
// Get max item count
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Get current item
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.item = function() {
    return this.itemAt(this.index());
};
//-----------------------------------------------------------------------------
// Get item at index
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};
//-----------------------------------------------------------------------------
// Set the money
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.setMoney = function(money) {
    this._money = money;
    this.refresh();
};
//-----------------------------------------------------------------------------
// Determine if the current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};
//-----------------------------------------------------------------------------
// Get the price
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.price = function(item) {
    return this._price[this._data.indexOf(item)] || 0;
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.isEnabled = function(item) {
    return (
        item && this.price(item) <= this._money
    );
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make the list of all skills for sale and their prices
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(skillObj => {
		const skillId = Number(skillObj.skill);
        const skill = $dataSkills[skillId];
        if (skill) {
            this._data.push(skill);
			const price = Number(skillObj.price);
            this._price.push((price >= 0) ? price : this.getDefaultPrice(skillId));
        }
    });
};
//-----------------------------------------------------------------------------
// Get the default price of a skill, or 0 if not found
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.getDefaultPrice = function(skillId) {
    return $cgmzTemp.getDefaultSkillShopPrice(skillId);
};
//-----------------------------------------------------------------------------
// Draw the skill and price
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    const price = this.price(item);
    const rect = this.itemLineRect(index);
    const priceWidth = this.priceWidth();
    const priceX = rect.x + rect.width - priceWidth;
    const nameWidth = rect.width - priceWidth;
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, nameWidth);
    this.drawText(price, priceX, rect.y, priceWidth, "right");
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Width of the price
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.priceWidth = function() {
    return 96;
};
//-----------------------------------------------------------------------------
// Set the actor window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.setActorWindow = function(actorWindow) {
    this._actorWindow = actorWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Update the help and actor windows
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopBuy.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._actorWindow) {
        this._actorWindow.setItem(this.item());
    }
};
//=============================================================================
// CGMZ_Window_SkillShopActor
//-----------------------------------------------------------------------------
// Skill Shop Actor Window
//=============================================================================
function CGMZ_Window_SkillShopActor() {
    this.initialize(...arguments);
}
CGMZ_Window_SkillShopActor.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_SkillShopActor.prototype.constructor = CGMZ_Window_SkillShopActor;
//-----------------------------------------------------------------------------
// Initialize the window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._skill = null;
	this._characterTimer = 0;
	this._characterXOffset = 0;
	this._isNegativeCharacter = false;
};
//-----------------------------------------------------------------------------
// Set the skill to buy
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.setItem = function(skill) {
	if(this._skill && skill && this._skill.id === skill.id) return;
    this._skill = skill;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Get the height of an item
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.itemHeight = function() {
	const textHeight = Window_Scrollable.prototype.itemHeight.call(this) * 2;
	const characterHeight = (CGMZ.SkillShop.DrawCharacter) ? this.getMaxCharacterHeight() : 0;
	const faceHeight = (CGMZ.SkillShop.DrawFace) ? (CGMZ.SkillShop.FaceHeight > 0) ? CGMZ.SkillShop.FaceHeight + 8 : ImageManager.faceHeight + 8 : 0;
    return Math.max(textHeight, characterHeight, faceHeight);
};
//-----------------------------------------------------------------------------
// Get max character height
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.getMaxCharacterHeight = function() {
    let height = 0;
	for(const actor of $gameParty.members()) {
		const characterName = actor.characterName();
		const characterIndex = actor.characterIndex();
		const isBigCharacter = ImageManager.isBigCharacter(characterName);
		const bitmap = ImageManager.loadCharacter(this._characterName);
		const charHeight = (isBigCharacter) ?  Math.floor(bitmap.height / 4) : Math.floor(bitmap.height / 8);
		height = Math.max(height, charHeight);
	}
	return height;
};
//-----------------------------------------------------------------------------
// Get max item count
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Get current item
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.item = function() {
    return this.itemAt(this.index());
};
//-----------------------------------------------------------------------------
// Get item at index
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};
//-----------------------------------------------------------------------------
// Determine if the current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.isEnabled = function(actor) {
	if(!this._skill || !actor) return false;
	if(!actor.skillTypes().includes(this._skill.stypeId)) return false;
	if(actor.hasSkill(this._skill.id)) return false;
	if(actor.isCGMZSkillShopRestricted(this._skill.id)) return false;
	if(this.missingSkillPrerequisites(actor)) return false;
	if(actor.isCGMZSkillShopRestrictedByClass(this._skill.id)) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check skill prereqs
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.missingSkillPrerequisites = function(actor) {
    if(this._skill.meta && this._skill.meta.cgmzssprereq) {
		for(const id of this._skill.meta.cgmzssprereq.split(",")) {
			if(CGMZ.SkillShop.LearnedSkillsOnly) {
				if(!actor.isLearnedSkill(Number(id))) return true;
			} else {
				if(!actor.hasSkill(Number(id))) return true;
			}
		}
	}
	return false;
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.refresh = function() {
	if(!this._skill) {
		this.contents.clear();
		this.contentsBack.clear();
	} else {
		this.makeItemList();
		Window_Selectable.prototype.refresh.call(this);
	}
};
//-----------------------------------------------------------------------------
// Make the list of all actors
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.makeItemList = function() {
    this._data = $gameParty.members();
};
//-----------------------------------------------------------------------------
// Draw the actor info
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.drawItem = function(index) {
    const actor = this.itemAt(index);
    const rect = this.itemRectWithPadding(index);
    this.changePaintOpacity(this.isEnabled(actor));
	if(CGMZ.SkillShop.DrawCharacter) {
		const frameOffset = (this.index() === index) ? this._characterXOffset : 0;
		this.CGMZ_drawCharacter(actor.characterName(), actor.characterIndex(), rect.x + rect.width - 50, rect.y + rect.height - 4, frameOffset);
	} else if(CGMZ.SkillShop.DrawFace) {
		const height = (CGMZ.SkillShop.FaceHeight > 0) ? CGMZ.SkillShop.FaceHeight : ImageManager.faceHeight;
		const width = (CGMZ.SkillShop.FaceHeight > 0) ? CGMZ.SkillShop.FaceHeight : ImageManager.faceWidth;
		this.drawFace(actor.faceName(), actor.faceIndex(), rect.x + rect.width - width, rect.y + 4, width, height);
	}
    this.drawText(actor._name, rect.x, rect.y, rect.width);
	if(actor.hasSkill(this._skill.id)) {
		this.drawText(CGMZ.SkillShop.AlreadyKnownText, rect.x, rect.y + this.lineHeight(), rect.width);
	} else if(!actor.skillTypes().includes(this._skill.stypeId)) {
		this.drawText(CGMZ.SkillShop.CannotLearnText, rect.x, rect.y + this.lineHeight(), rect.width);
	} else if(actor.isCGMZSkillShopRestricted(this._skill.id) || actor.isCGMZSkillShopRestrictedByClass(this._skill.id)) {
		this.drawText(CGMZ.SkillShop.RestrictedText, rect.x, rect.y + this.lineHeight(), rect.width);
	} else if(this.missingSkillPrerequisites(actor)) {
		this.drawText(CGMZ.SkillShop.MissingPrerequisitesText, rect.x, rect.y + this.lineHeight(), rect.width);
	} else {
		this.drawText(CGMZ.SkillShop.AvailableText, rect.x, rect.y + this.lineHeight(), rect.width);
	}
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Draw the face  image
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
	const bitmap = ImageManager.loadFace(faceName);
	const sw = ImageManager.faceWidth;
	const sh = ImageManager.faceHeight;
	const dx = x;
	const dy = y;
	const sx = Math.floor((faceIndex % 4) * sw);
	const sy = Math.floor(Math.floor(faceIndex / 4) * sh);
	const dw = width;
	const dh = height;
	this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//-----------------------------------------------------------------------------
// Update window
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(CGMZ.SkillShop.DrawCharacter) {
		this.updateCharacterSprite();
	}
};
//-----------------------------------------------------------------------------
// Update window character frame
//-----------------------------------------------------------------------------
CGMZ_Window_SkillShopActor.prototype.updateCharacterSprite = function() {
	if(!this.active || this.index() < 0) return;
	this._characterTimer++;
	if(this._characterTimer > 15) {
		this._characterTimer = 0;
		const modifier = (this._isNegativeCharacter) ? -1 : 1;
		this._characterXOffset += modifier;
		if(this._characterXOffset >= 1) {
			this._isNegativeCharacter = true;
		}
		else if(this._characterXOffset <= -1) {
			this._isNegativeCharacter = false;
		}
		this.redrawCurrentItem();
	}
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Check if actor has restriction for certain skills in skill shop
//=============================================================================
//-----------------------------------------------------------------------------
// Check if actor has restriction note tag
//-----------------------------------------------------------------------------
Game_Actor.prototype.isCGMZSkillShopRestricted = function(skillId) {
	const meta = $dataActors[this._actorId].meta;
	if(!meta || !meta.cgmzssrestriction) return false;
	for(const id of meta.cgmzssrestriction.split(",")) {
		if(Number(id) === skillId) return true;
	}
	return false;
};
//-----------------------------------------------------------------------------
// Check if actor class has restriction note tag
//-----------------------------------------------------------------------------
Game_Actor.prototype.isCGMZSkillShopRestrictedByClass = function(skillId) {
	const meta = $dataClasses[this._classId].meta;
	if(!meta || !meta.cgmzssrestriction) return false;
	for(const id of meta.cgmzssrestriction.split(",")) {
		if(Number(id) === skillId) return true;
	}
	return false;
};