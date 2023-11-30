//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.63;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.63] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 *
 * Auto Battle Attack Seal Bypass
 *
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 *
 * ---
 *
 * Auto Battle Lock Up
 *
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 *
 * ---
 *
 * Battle Forced End Action Crash
 *
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 *
 * ---
 *
 * Gamepad Repeat Input
 *
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 *
 * ---
 *
 * Invisible Battle Sprites
 *
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 *
 * ---
 *
 * Instant Text Discrepancy for Window_Message
 *
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 *
 * This can be disabled through the Plugin Parameters:
 *
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 *
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * Overly-Protective Substitute
 *
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 *
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 *
 * ---
 *
 * Status Window Name Vertical Cutoffs
 *
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 *
 * ---
 *
 * Termination Clear Effects
 *
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 *
 * ---
 *
 * Timer Sprite
 *
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 *
 * ---
 *
 * Unusable Battle Items
 *
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 *
 * ---
 *
 * Window Arrows Sprite Tearing
 *
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 *
 * ---
 *
 * Window Client Area Scaling Bug
 *
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 *
 * ---
 *
 * Window Skin Bleeding
 *
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 *
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 *
 * Script Call Failsafes
 *
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 *
 * ---
 *
 * Digit Grouping
 *
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 *
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 *
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 *
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 *
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 *
 * ---
 *
 * Show Scrolling Text, additional functionality
 *
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 *
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 *
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 *
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 *
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * === Animations ===
 *
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 *
 * ---
 *
 * <Head>
 * <Foot>
 *
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 *
 * ---
 *
 * <Anchor X: x>
 * <Anchor Y: y>
 *
 * <Anchor: x, y>
 *
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 *
 * Examples:
 *
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 *
 * <Anchor: 0.2, 0.9>
 *
 * ---
 *
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 *
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 *
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 *
 * Examples:
 *
 * <Offset X: +20>
 * <Offset Y: -50>
 *
 * <Offset: +10, -30>
 *
 * ---
 *
 * <Mirror Offset X>
 * <No Mirror Offset X>
 *
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 *
 * ---
 *
 * <Rate: x>
 *
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 *
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * === Battle Setting-Related Notetags ===
 *
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 *
 * ---
 *
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 *
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 *
 * ---
 *
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 *
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 *
 * ---
 *
 * <DTB>
 * <Battle System: DTB>
 *
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 *
 * ---
 *
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 *
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 *
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 *
 * ---
 *
 * <BTB>
 * <Battle System: BTB>
 *
 * <CTB>
 * <Battle System: CTB>
 *
 * <ETB>
 * <Battle System: ETB>
 *
 * <FTB>
 * <Battle System: FTB>
 *
 * <OTB>
 * <Battle System: OTB>
 *
 * <PTB>
 * <Battle System: PTB>
 *
 * <STB>
 * <Battle System: STB>
 *
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * === Animation Commands ===
 *
 * ---
 *
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 *
 *   Animation ID:
 *   - Plays this animation.
 *
 *   Coordinates:
 *
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 *
 *   Mirror Animation?:
 *   - Mirror the animation?
 *
 *   Mute Animation?:
 *   - Mute the animation?
 *
 * ---
 *
 * === Export Plugin Commands ===
 *
 * ---
 *
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 *
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *
 * ---
 *
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 *
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *
 * ---
 *
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 *
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 *
 * ---
 *
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 *
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 *
 * ---
 *
 * === Game Plugin Commands ===
 *
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 *
 * === Gold Plugin Commands ===
 *
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 *
 * === Map Plugin Commands ===
 *
 * ---
 *
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 *
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 *
 * ---
 *
 * === Picture Plugin Commands ===
 *
 * ---
 *
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 *
 *   Picture ID:
 *   - The ID of the pictures to track the coordinates of.
 *
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 *
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 *
 * ---
 *
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 *
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 *
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 *
 * ---
 *
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 *
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 *
 *   Picture Settings:
 *
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 *
 * ---
 *
 * === Screen Shake Plugin Commands ===
 *
 * ---
 *
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 *
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 *
 *   Power:
 *   - Power level for screen shake.
 *
 *   Speed:
 *   - Speed level for screen shake.
 *
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 *
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 *
 * ---
 *
 * === Switch Plugin Commands ===
 *
 * ---
 *
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 *
 * === System Plugin Commands ===
 *
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 *
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * === Variable Plugin Commands ===
 *
 * ---
 *
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 *
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 *
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 *
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 *
 * ---
 *
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 *
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 *
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 *
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 *
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 *
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Battle Test
 *
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 *
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 *
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Picture-Related
 *
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 *
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 *
 * ---
 *
 * Misc
 *
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 *
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 *
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 *
 *     $scene
 *     - Returns current scene.
 *
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 *
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 *
 *     $targets
 *     - Returns last recorded targets marked in battle.
 *
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 *
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 *
 * Choose which battle system to use for your game.
 *
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 *
 * ---
 *
 *   Database Default (Use game database setting)
 *
 *   -
 *
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 *
 *   -
 *
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 *   -
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 *
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 *
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 *
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 *
 * Controls
 *
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 *
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 *
 * ---
 *
 * Name Input
 *
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 *
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 *
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 *
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 *
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 *
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 *
 * Button Assist
 *
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 *
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 *
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 *
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 *
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 *
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 *
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 *
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 *
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *
 *   Version:
 *   - Version to be display in the title screen corner.
 *
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 *
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 *
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 *
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 *
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 *
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 *
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 *
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 *
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 *
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 *
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 *
 * Instructions on Adding Custom Parameters to VisuStella Menus
 *
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 *
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 *
 * ---
 *
 * Instructions on Using Custom Parameters as Mechanics
 *
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 *
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 *
 *   a.str - b.con
 *
 * These values are attached to the Game_Battlerbase prototype class.
 *
 * ---
 *
 * Instructions on Setting Custom Parameter Values
 *
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 *
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 *
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 *
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 *
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 *
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 *
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 *
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 *
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 *
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 *
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 *
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 *
 *   Line Height:
 *   - Default line height used for standard windows.
 *
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 *
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 *
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 *
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 *
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 *
 * Selectable Items:
 *
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 *
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 *
 * WARNING: This feature is highly experimental! Use it at your own risk!
 *
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 *
 * ---
 *
 * JS: Quick Function
 *
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 *
 *   JS: Code:
 *   - Run this code when using the function.
 *
 * ---
 *
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 *
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 *
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 *
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 *
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 *
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 *
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 *
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 *
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 *
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 *
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 *
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 *
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject,
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 *
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 *
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 *
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 *
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 *
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 *
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 *
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 *
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 *
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 *
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 *
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 *
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 *
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 *
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 *
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 *
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 *
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 *
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 *
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 *
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 *
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 *
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 *
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 *
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 *
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 *
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 *
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 *
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 *
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 *
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 *
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 *
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 *
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 *
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 *
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 *
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 *
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 *
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 *
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 *
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 *
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 *
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 *
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 *
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 *
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 *
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 *
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 *
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 *
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 *
 * @arg General
 *
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 *
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 *
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 *
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 *
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 *
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 *
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 *
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x283c20=_0xfbd7;(function(_0x539927,_0x53a038){const _0x845063=_0xfbd7,_0x679975=_0x539927();while(!![]){try{const _0x46c0ff=-parseInt(_0x845063(0x418))/0x1+-parseInt(_0x845063(0x6c5))/0x2+-parseInt(_0x845063(0x31a))/0x3+-parseInt(_0x845063(0x7f0))/0x4*(-parseInt(_0x845063(0x405))/0x5)+-parseInt(_0x845063(0x68d))/0x6*(-parseInt(_0x845063(0x5d1))/0x7)+parseInt(_0x845063(0x4f0))/0x8+parseInt(_0x845063(0x749))/0x9;if(_0x46c0ff===_0x53a038)break;else _0x679975['push'](_0x679975['shift']());}catch(_0x4ab7ef){_0x679975['push'](_0x679975['shift']());}}}(_0x1e92,0xf1423));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x283c20(0x68c)](function(_0x1c4f2a){const _0x15fefd=_0x283c20;return _0x1c4f2a[_0x15fefd(0x90b)]&&_0x1c4f2a['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x283c20(0x914)]=VisuMZ[label][_0x283c20(0x914)]||{},VisuMZ[_0x283c20(0x5c0)]=function(_0x20b15a,_0x3512b1){const _0x1cdfeb=_0x283c20;for(const _0x225d04 in _0x3512b1){if(_0x1cdfeb(0x700)!==_0x1cdfeb(0x552)){if(_0x225d04['match'](/(.*):(.*)/i)){if(_0x1cdfeb(0x6f3)===_0x1cdfeb(0x5a3))return![];else{const _0xc4a0d4=String(RegExp['$1']),_0x3cbdc9=String(RegExp['$2'])[_0x1cdfeb(0x287)]()['trim']();let _0x292a6d,_0x5ac44b,_0x517fca;switch(_0x3cbdc9){case _0x1cdfeb(0x2f6):_0x292a6d=_0x3512b1[_0x225d04]!==''?Number(_0x3512b1[_0x225d04]):0x0;break;case _0x1cdfeb(0x60b):_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x5d55e7=>Number(_0x5d55e7));break;case _0x1cdfeb(0x331):_0x292a6d=_0x3512b1[_0x225d04]!==''?eval(_0x3512b1[_0x225d04]):null;break;case _0x1cdfeb(0x8af):_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON['parse'](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x1f4488=>eval(_0x1f4488));break;case'JSON':_0x292a6d=_0x3512b1[_0x225d04]!==''?JSON['parse'](_0x3512b1[_0x225d04]):'';break;case _0x1cdfeb(0x3ff):_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x54c38e=>JSON['parse'](_0x54c38e));break;case'FUNC':_0x292a6d=_0x3512b1[_0x225d04]!==''?new Function(JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04])):new Function('return\x200');break;case'ARRAYFUNC':_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x5ffd75=>new Function(JSON[_0x1cdfeb(0x5a2)](_0x5ffd75)));break;case'STR':_0x292a6d=_0x3512b1[_0x225d04]!==''?String(_0x3512b1[_0x225d04]):'';break;case _0x1cdfeb(0x395):_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x5dd746=>String(_0x5dd746));break;case _0x1cdfeb(0x27b):_0x517fca=_0x3512b1[_0x225d04]!==''?JSON['parse'](_0x3512b1[_0x225d04]):{},_0x20b15a[_0xc4a0d4]={},VisuMZ[_0x1cdfeb(0x5c0)](_0x20b15a[_0xc4a0d4],_0x517fca);continue;case _0x1cdfeb(0x249):_0x5ac44b=_0x3512b1[_0x225d04]!==''?JSON[_0x1cdfeb(0x5a2)](_0x3512b1[_0x225d04]):[],_0x292a6d=_0x5ac44b[_0x1cdfeb(0x37e)](_0x45bca7=>VisuMZ[_0x1cdfeb(0x5c0)]({},JSON[_0x1cdfeb(0x5a2)](_0x45bca7)));break;default:continue;}_0x20b15a[_0xc4a0d4]=_0x292a6d;}}}else _0xd2df9b[_0x1cdfeb(0x85a)][_0x1cdfeb(0x914)]['MenuLayout'][_0x1cdfeb(0x470)]['drawGameSubtitle']['call'](this);}return _0x20b15a;},VisuMZ[_0x283c20(0x85a)]['SceneManager_exit']=SceneManager[_0x283c20(0x309)],SceneManager[_0x283c20(0x309)]=function(){const _0x5d4340=_0x283c20;VisuMZ[_0x5d4340(0x85a)]['SceneManager_exit'][_0x5d4340(0x5d8)](this);if(Utils[_0x5d4340(0x8c5)]>='1.4.4'){if('pRZvE'!==_0x5d4340(0x4e7)){if(typeof nw==='object')nw[_0x5d4340(0x6cc)][_0x5d4340(0x7bb)]();}else{this['_pointAnimationSprites'][_0x5d4340(0x438)](_0x27da2b),this[_0x5d4340(0x21a)][_0x5d4340(0x521)](_0x54cc4d);for(const _0xbb2257 of _0x26b06e[_0x5d4340(0x22d)]){_0xbb2257['endAnimation']&&_0xbb2257[_0x5d4340(0x101)]();const _0x1d0fc6=this[_0x5d4340(0x81a)]();if(_0x1d0fc6)_0x1d0fc6[_0x5d4340(0x521)](_0xbb2257);}_0x416cad['destroy']();}}},(_0x3b9e1c=>{const _0x16a115=_0x283c20,_0x6435ca=_0x3b9e1c['name'];for(const _0x4ade6a of dependencies){if(!Imported[_0x4ade6a]){if(_0x16a115(0x440)===_0x16a115(0x827))_0x1fa2f2[_0x16a115(0x409)]=_0xffa6a,_0xd68c20[_0x16a115(0x5e1)](),_0x3d60c6[_0x16a115(0x5e1)]();else{alert(_0x16a115(0x916)[_0x16a115(0x520)](_0x6435ca,_0x4ade6a)),SceneManager[_0x16a115(0x309)]();break;}}}const _0x22f316=_0x3b9e1c[_0x16a115(0x21b)];if(_0x22f316[_0x16a115(0x312)](/\[Version[ ](.*?)\]/i)){const _0xfd1acb=Number(RegExp['$1']);_0xfd1acb!==VisuMZ[label][_0x16a115(0x463)]&&(alert(_0x16a115(0x439)[_0x16a115(0x520)](_0x6435ca,_0xfd1acb)),SceneManager[_0x16a115(0x309)]());}if(_0x22f316[_0x16a115(0x312)](/\[Tier[ ](\d+)\]/i)){if(_0x16a115(0x8b8)!==_0x16a115(0x8b8))0x1-this[_0x16a115(0x683)](_0x371461)>this[_0x16a115(0x505)](_0x5b983c)&&(_0x658f27[_0x16a115(0x205)]=![],_0x2546fa[_0x16a115(0x6a6)]=!![]);else{const _0x3d8d54=Number(RegExp['$1']);_0x3d8d54<tier?(alert(_0x16a115(0x7e1)[_0x16a115(0x520)](_0x6435ca,_0x3d8d54,tier)),SceneManager[_0x16a115(0x309)]()):tier=Math[_0x16a115(0x861)](_0x3d8d54,tier);}}VisuMZ[_0x16a115(0x5c0)](VisuMZ[label][_0x16a115(0x914)],_0x3b9e1c['parameters']);})(pluginData),((()=>{const _0x399b6d=_0x283c20;if(VisuMZ[_0x399b6d(0x85a)][_0x399b6d(0x914)][_0x399b6d(0x5be)][_0x399b6d(0x48c)]??!![]){if(_0x399b6d(0x16e)!==_0x399b6d(0x16e))this['_commandWindow']&&this[_0x399b6d(0x3ce)][_0x399b6d(0x22a)](_0x3d59f6[_0x399b6d(0x631)][_0x399b6d(0x561)]),this[_0x399b6d(0x8e8)]&&this[_0x399b6d(0x8e8)]['setBackgroundType'](_0x2654b9[_0x399b6d(0x631)][_0x399b6d(0x33e)]),this['_statusWindow']&&this[_0x399b6d(0x747)]['setBackgroundType'](_0x37dd51[_0x399b6d(0x631)][_0x399b6d(0x6df)]);else for(const _0x1bb9a9 in $plugins){if('NeSfS'!==_0x399b6d(0x1eb)){var _0x33fdcb=_0x1a2fb0(_0x4ba2b1['$1']);_0x1f8faa+=_0x33fdcb;}else{const _0xc76341=$plugins[_0x1bb9a9];_0xc76341[_0x399b6d(0x3f0)]['match'](/(.*)\/(.*)/i)&&(_0xc76341[_0x399b6d(0x3f0)]=String(RegExp['$2']['trim']()));}}}})()),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x502),_0x43cb9c=>{const _0xa77dcc=_0x283c20;if(!SceneManager[_0xa77dcc(0x573)])return;if(!SceneManager[_0xa77dcc(0x573)]['_spriteset'])return;VisuMZ[_0xa77dcc(0x5c0)](_0x43cb9c,_0x43cb9c);const _0x51d8a4=Math['round'](_0x43cb9c[_0xa77dcc(0x24b)]),_0xc9cb4a=Math[_0xa77dcc(0x4a8)](_0x43cb9c[_0xa77dcc(0x106)]);$gameTemp[_0xa77dcc(0x53e)](_0x51d8a4,_0xc9cb4a,_0x43cb9c[_0xa77dcc(0x876)],_0x43cb9c['Mirror'],_0x43cb9c[_0xa77dcc(0x33f)]);}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x10f),_0x4ca21b=>{const _0x2f6ac4=_0x283c20;if(!$gameTemp[_0x2f6ac4(0x8bc)]())return;if(!Utils[_0x2f6ac4(0x889)]())return;SceneManager['_scene']['_active']=![],VisuMZ['CoreEngine']['ExportStrFromAllMaps']();}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],'ExportAllTroopText',_0x273f61=>{const _0xcdf6ce=_0x283c20;if(!$gameTemp[_0xcdf6ce(0x8bc)]())return;if(!Utils['isNwjs']())return;SceneManager[_0xcdf6ce(0x573)][_0xcdf6ce(0x20c)]=![],VisuMZ[_0xcdf6ce(0x85a)]['ExportStrFromAllTroops']();}),PluginManager[_0x283c20(0x713)](pluginData['name'],_0x283c20(0x847),_0x47e28a=>{const _0x1758a1=_0x283c20;if(!$gameTemp[_0x1758a1(0x8bc)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x1758a1(0x351)]()<=0x0)return;VisuMZ[_0x1758a1(0x5c0)](_0x47e28a,_0x47e28a);const _0x22366a=_0x1758a1(0x43a)[_0x1758a1(0x520)]($gameMap[_0x1758a1(0x351)]()[_0x1758a1(0x708)](0x3)),_0x559765=VisuMZ[_0x1758a1(0x85a)][_0x1758a1(0x639)]($gameMap[_0x1758a1(0x351)]());VisuMZ[_0x1758a1(0x85a)][_0x1758a1(0x7e3)](_0x559765,_0x22366a,!![]);}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x75b),_0x31a3c2=>{const _0x3bfd60=_0x283c20;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x3bfd60(0x889)]())return;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x31a3c2,_0x31a3c2);const _0x25fa66=_0x3bfd60(0x8cb)[_0x3bfd60(0x520)]($gameTroop[_0x3bfd60(0x6ca)][_0x3bfd60(0x708)](0x4)),_0x92a544=VisuMZ['CoreEngine']['ExtractStrFromTroop']($gameTroop[_0x3bfd60(0x6ca)]);VisuMZ[_0x3bfd60(0x85a)]['ExportString'](_0x92a544,_0x25fa66,!![]);}),VisuMZ['CoreEngine'][_0x283c20(0x7e3)]=function(_0x174097,_0x2954c1,_0x429b90){const _0x573a3a=_0x283c20,_0x7f96d8=require('fs');let _0x38d2e6=_0x573a3a(0x4fe)[_0x573a3a(0x520)](_0x2954c1||'0');_0x7f96d8[_0x573a3a(0x5b2)](_0x38d2e6,_0x174097,_0xeb0af=>{const _0x400d49=_0x573a3a;if(_0xeb0af)throw err;else _0x429b90&&alert(_0x400d49(0x893)[_0x400d49(0x520)](_0x38d2e6));});},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x750)]=function(){const _0x4489d1=_0x283c20,_0xb927b2=[];for(const _0x360c97 of $dataMapInfos){if(!_0x360c97)continue;_0xb927b2[_0x4489d1(0x163)](_0x360c97['id']);}const _0x14e962=_0xb927b2[_0x4489d1(0x6a1)]*0x64+Math['randomInt'](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x14e962)),this[_0x4489d1(0x503)]=[],this['_currentMap']=$dataMap;for(const _0x5650cc of _0xb927b2){VisuMZ[_0x4489d1(0x85a)][_0x4489d1(0x825)](_0x5650cc);}setTimeout(VisuMZ['CoreEngine'][_0x4489d1(0x6a5)]['bind'](this),_0x14e962);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x825)]=function(_0x12c351){const _0x4c04cd=_0x283c20,_0x39cb78=_0x4c04cd(0x3b0)[_0x4c04cd(0x520)](_0x12c351[_0x4c04cd(0x708)](0x3)),_0x55ce31=new XMLHttpRequest(),_0x1c0688=_0x4c04cd(0x5c1)+_0x39cb78;_0x55ce31[_0x4c04cd(0x636)](_0x4c04cd(0x918),_0x1c0688),_0x55ce31[_0x4c04cd(0x202)](_0x4c04cd(0x322)),_0x55ce31['onload']=()=>this[_0x4c04cd(0x4f1)](_0x55ce31,_0x12c351,_0x39cb78,_0x1c0688),_0x55ce31[_0x4c04cd(0x3be)]=()=>DataManager[_0x4c04cd(0x555)](_0x4c04cd(0x735),_0x39cb78,_0x1c0688),_0x55ce31[_0x4c04cd(0x100)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4f1)]=function(_0xc56667,_0x4885f4,_0xde5b6e,_0x4a90bd){const _0x449b91=_0x283c20;$dataMap=JSON[_0x449b91(0x5a2)](_0xc56667[_0x449b91(0x548)]),DataManager[_0x449b91(0x73b)]($dataMap),this[_0x449b91(0x503)][_0x4885f4]=VisuMZ[_0x449b91(0x85a)]['ExtractStrFromMap'](_0x4885f4),$dataMap=this[_0x449b91(0x6ea)];},VisuMZ[_0x283c20(0x85a)]['exportAllMapStrings']=function(){const _0xb4325d=_0x283c20,_0x18eccf='AllMaps';this[_0xb4325d(0x503)][_0xb4325d(0x438)](undefined)[_0xb4325d(0x438)]('')[_0xb4325d(0x438)](null);const _0x1d78a0=this[_0xb4325d(0x503)][_0xb4325d(0x65d)](_0xb4325d(0x6e0))[_0xb4325d(0x538)]();VisuMZ['CoreEngine'][_0xb4325d(0x7e3)](_0x1d78a0,_0x18eccf,!![]),SceneManager[_0xb4325d(0x573)][_0xb4325d(0x20c)]=!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x639)]=function(_0x25ecc4){const _0x5af9d1=_0x283c20;if(!$dataMap)return'';let _0x55fbc7='█'[_0x5af9d1(0x3b2)](0x46)+'\x0a\x0a',_0x607720='═'['repeat'](0x46)+'\x0a\x0a',_0x5b5a71='';this[_0x5af9d1(0x1be)]=0x0;for(const _0x1193e1 of $dataMap['events']){if(_0x5af9d1(0x30e)===_0x5af9d1(0x30e)){if(!_0x1193e1)continue;let _0x1ec93b=_0x1193e1['id'],_0x2aa5f4=_0x1193e1[_0x5af9d1(0x3f0)],_0x48376e=_0x1193e1[_0x5af9d1(0x7a1)];for(const _0x35f873 of _0x48376e){if('qSMWK'===_0x5af9d1(0x684)){let _0x5b811a=this['_mode'];this[_0x5af9d1(0x1fd)]=_0x2f84fe,_0x5b811a!==this['_mode']&&(this[_0x5af9d1(0x661)](),_0x578534[_0x5af9d1(0x52d)](),this[_0x5af9d1(0x1fd)]==='default'?this[_0x5af9d1(0x623)](0x0):this[_0x5af9d1(0x623)](-0x1));}else{const _0x2105e0=_0x48376e[_0x5af9d1(0x152)](_0x35f873)+0x1;let _0x11fbb5=_0x607720+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x2ee6a0=VisuMZ[_0x5af9d1(0x85a)][_0x5af9d1(0x6dc)](_0x35f873[_0x5af9d1(0x3fe)]);if(_0x2ee6a0[_0x5af9d1(0x6a1)]>0x0){if(_0x5b5a71[_0x5af9d1(0x6a1)]>0x0){if(_0x5af9d1(0x5ac)==='aBjLq')_0x5b5a71+=_0x607720+_0x5af9d1(0x6e0);else return!![];}else{if('AdTIk'!==_0x5af9d1(0x6aa)){const _0x2e7777=$dataMapInfos[_0x25ecc4][_0x5af9d1(0x3f0)];_0x5b5a71+=_0x55fbc7+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x5af9d1(0x520)](_0x25ecc4,_0x2e7777||'Unnamed')+_0x55fbc7;}else{if(!this[_0x5af9d1(0x5c7)])return;if(this[_0x5af9d1(0x5c7)][_0x5af9d1(0x23d)]<=0x0)return;this['x']=this[_0x5af9d1(0x2e1)](this['x'],this['_coreEasing'][_0x5af9d1(0x43d)]),this['y']=this[_0x5af9d1(0x2e1)](this['y'],this['_coreEasing'][_0x5af9d1(0x198)]),this[_0x5af9d1(0x53d)]['x']=this[_0x5af9d1(0x2e1)](this[_0x5af9d1(0x53d)]['x'],this[_0x5af9d1(0x5c7)][_0x5af9d1(0x895)]),this[_0x5af9d1(0x53d)]['y']=this['applyCoreEasing'](this[_0x5af9d1(0x53d)]['y'],this[_0x5af9d1(0x5c7)][_0x5af9d1(0x835)]),this['opacity']=this[_0x5af9d1(0x2e1)](this[_0x5af9d1(0x5cc)],this[_0x5af9d1(0x5c7)][_0x5af9d1(0x3ad)]),this['backOpacity']=this[_0x5af9d1(0x2e1)](this[_0x5af9d1(0x385)],this[_0x5af9d1(0x5c7)]['targetBackOpacity']),this[_0x5af9d1(0x8d7)]=this[_0x5af9d1(0x2e1)](this[_0x5af9d1(0x8d7)],this['_coreEasing']['targetContentsOpacity']),this[_0x5af9d1(0x5c7)][_0x5af9d1(0x23d)]--;}}_0x5b5a71+=_0x11fbb5[_0x5af9d1(0x520)](_0x1ec93b,_0x2aa5f4,_0x2105e0,_0x2ee6a0);}}}}else _0x421993+=_0x207a69+'\x0a',_0x4c91aa+=_0x5af9d1(0x4f6),_0x18e1c7['parameters'][0x4]!==''&&_0x1c985e[_0x5af9d1(0x263)][0x4]!==_0x598b6f&&(_0x5258a1+='【%1】\x0a'['format'](_0xbb21a['parameters'][0x4]));}return _0x5b5a71[_0x5af9d1(0x6a1)]>0x0&&(_0x5b5a71+=_0x607720),_0x5b5a71;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x2d0)]=function(){const _0x250ae0=_0x283c20,_0x344a41=$dataTroops[_0x250ae0(0x6a1)]*0xa+Math[_0x250ae0(0x35e)](0xa);alert(_0x250ae0(0x213)[_0x250ae0(0x520)](_0x344a41));const _0xdae423=[];for(const _0x502119 of $dataTroops){if(!_0x502119)continue;const _0x2e753d=_0x502119['id'];_0xdae423[_0x2e753d]=VisuMZ[_0x250ae0(0x85a)]['ExtractStrFromTroop'](_0x2e753d);}setTimeout(VisuMZ[_0x250ae0(0x85a)]['exportAllTroopStrings'][_0x250ae0(0x63b)](this,_0xdae423),_0x344a41);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x209)]=function(_0x5e7e18){const _0x34606a=_0x283c20;if(!$dataTroops[_0x5e7e18])return'';let _0x1970b9='█'['repeat'](0x46)+'\x0a\x0a',_0x293d27='═'['repeat'](0x46)+'\x0a\x0a',_0x13e821='';this[_0x34606a(0x1be)]=0x0;const _0x59921a=$dataTroops[_0x5e7e18];let _0x222f9d=_0x59921a[_0x34606a(0x7a1)];for(const _0x3c6452 of _0x222f9d){const _0x34d4cd=_0x222f9d[_0x34606a(0x152)](_0x3c6452)+0x1;let _0x27e1c0=_0x293d27+_0x34606a(0x565),_0x4728dc=VisuMZ[_0x34606a(0x85a)][_0x34606a(0x6dc)](_0x3c6452[_0x34606a(0x3fe)]);_0x4728dc[_0x34606a(0x6a1)]>0x0&&(_0x13e821[_0x34606a(0x6a1)]>0x0?_0x34606a(0x6af)===_0x34606a(0x4c4)?this[_0x34606a(0x3b8)]=_0xd1e997:_0x13e821+=_0x293d27+_0x34606a(0x6e0):_0x34606a(0x76b)!==_0x34606a(0x500)?_0x13e821+=_0x1970b9+_0x34606a(0x25c)[_0x34606a(0x520)](_0x5e7e18,_0x59921a[_0x34606a(0x3f0)]||_0x34606a(0x300))+_0x1970b9:(this[_0x34606a(0x7ce)]={},_0x3e96c7[_0x34606a(0x44e)][_0x34606a(0x3a9)]['call'](this,_0x1d635e),this[_0x34606a(0x22a)](_0x2cdd82[_0x34606a(0x85a)]['Settings'][_0x34606a(0x52f)][_0x34606a(0x8ca)]||0x0),this[_0x34606a(0x661)]()),_0x13e821+=_0x27e1c0[_0x34606a(0x520)](_0x34d4cd,_0x4728dc));}if(_0x13e821['length']>0x0){if('Hcpda'!==_0x34606a(0x668))_0x13e821+=_0x293d27;else{if(this[_0x34606a(0x1fd)]==='keyboard'&&!_0x2ceb69[_0x34606a(0x218)]())return;if(_0xebfa8f['isNumpadPressed']())return;_0x2077b5[_0x34606a(0x85a)][_0x34606a(0x70d)]['call'](this,_0x3222cb),this[_0x34606a(0x8c4)](_0x34606a(0x7f5));}}return _0x13e821;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x849)]=function(_0x4ac745){const _0x4236c2=_0x283c20,_0x568be4=_0x4236c2(0x851);_0x4ac745[_0x4236c2(0x438)](undefined)[_0x4236c2(0x438)]('')[_0x4236c2(0x438)](null);const _0x366205=_0x4ac745[_0x4236c2(0x65d)](_0x4236c2(0x6e0))['trim']();VisuMZ[_0x4236c2(0x85a)][_0x4236c2(0x7e3)](_0x366205,_0x568be4,!![]),SceneManager['_scene'][_0x4236c2(0x20c)]=!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x6dc)]=function(_0x15c489){const _0x185cfd=_0x283c20;let _0x4560c9='\x0a'+'─'[_0x185cfd(0x3b2)](0x46)+'\x0a',_0x452375='\x0a'+'┄'[_0x185cfd(0x3b2)](0x46)+'\x0a',_0x3bd1d5='';for(const _0x104d88 of _0x15c489){if(!_0x104d88)continue;if(_0x104d88['code']===0x65){if(_0x185cfd(0x49b)!==_0x185cfd(0x49b)){if(!_0x4233b2[_0x185cfd(0x8bc)]())return;if(!_0x49a3dc['isNwjs']())return;if(!_0x286227)return;if(_0x1b9c85[_0x185cfd(0x351)]()<=0x0)return;_0x230738[_0x185cfd(0x5c0)](_0x3a66ed,_0x40b2c4);const _0x5a211e=_0x185cfd(0x43a)[_0x185cfd(0x520)](_0x15bf3b[_0x185cfd(0x351)]()[_0x185cfd(0x708)](0x3)),_0x10218d=_0x1ff9ba[_0x185cfd(0x85a)][_0x185cfd(0x639)](_0x1ba37b[_0x185cfd(0x351)]());_0xb773f3['CoreEngine'][_0x185cfd(0x7e3)](_0x10218d,_0x5a211e,!![]);}else _0x3bd1d5+=_0x4560c9+'\x0a',_0x3bd1d5+='〘Show\x20Text〙\x0a',_0x104d88['parameters'][0x4]!==''&&_0x104d88[_0x185cfd(0x263)][0x4]!==undefined&&(_0x3bd1d5+='【%1】\x0a'[_0x185cfd(0x520)](_0x104d88[_0x185cfd(0x263)][0x4]));}else{if(_0x104d88[_0x185cfd(0x36b)]===0x191){if(_0x185cfd(0x159)!==_0x185cfd(0x159)){const _0xfe3dbe=_0x23b334['value'](_0x464b5d);_0xa7b0bd['setValue'](_0x4d5217,!_0xfe3dbe);}else _0x3bd1d5+=_0x185cfd(0x536)[_0x185cfd(0x520)](_0x104d88['parameters'][0x0]);}else{if(_0x104d88[_0x185cfd(0x36b)]===0x192)'uNNOm'===_0x185cfd(0x1ea)?(_0x3bd1d5+=_0x4560c9,_0x3bd1d5+=_0x185cfd(0x1db)['format'](_0x452375,_0x104d88['parameters'][0x0]+0x1,_0x104d88['parameters'][0x1])):this['_listWindow'][_0x185cfd(0x22a)](_0x140a8e[_0x185cfd(0x631)][_0x185cfd(0x523)]);else{if(_0x104d88[_0x185cfd(0x36b)]===0x193){if('CaVjJ'!=='CaVjJ')return _0x430197[_0x185cfd(0x85a)][_0x185cfd(0x914)][_0x185cfd(0x5be)]['EncounterRateMinimum'];else _0x3bd1d5+=_0x4560c9,_0x3bd1d5+=_0x185cfd(0x7cd)[_0x185cfd(0x520)](_0x452375);}else{if(_0x104d88[_0x185cfd(0x36b)]===0x194)_0x3bd1d5+=_0x4560c9,_0x3bd1d5+='%1〘End\x20Choice\x20Selection〙%1'['format'](_0x452375);else{if(_0x104d88[_0x185cfd(0x36b)]===0x69)_0x3bd1d5+=_0x4560c9+'\x0a',_0x3bd1d5+='〘Scrolling\x20Text〙\x0a';else{if(_0x104d88[_0x185cfd(0x36b)]===0x6c){if('LUbKb'!=='LUbKb'){let _0x2fbe5d='',_0x3eb503=this[_0x185cfd(0x635)]+0x1;while(this[_0x185cfd(0x73f)][_0x3eb503]&&this['_list'][_0x3eb503]['code']===0x195){_0x2fbe5d+=this[_0x185cfd(0x73f)][_0x3eb503]['parameters'][0x0]+'\x0a',_0x3eb503++;}return _0x2fbe5d;}else _0x3bd1d5+=_0x4560c9+'\x0a',_0x3bd1d5+=_0x185cfd(0x274)[_0x185cfd(0x520)](_0x104d88['parameters'][0x0]);}else{if(_0x104d88['code']===0x198)_0x3bd1d5+=_0x185cfd(0x536)[_0x185cfd(0x520)](_0x104d88[_0x185cfd(0x263)][0x0]);else{if(_0x104d88['code']===0x75){const _0x257ab3=$dataCommonEvents[_0x104d88[_0x185cfd(0x263)][0x0]];if(_0x257ab3&&this[_0x185cfd(0x1be)]<=0xa){if(_0x185cfd(0x776)===_0x185cfd(0x776)){this[_0x185cfd(0x1be)]++;let _0x8faab8=VisuMZ['CoreEngine'][_0x185cfd(0x6dc)](_0x257ab3[_0x185cfd(0x3fe)]);_0x8faab8['length']>0x0&&(_0x3bd1d5+=_0x4560c9,_0x3bd1d5+=_0x452375,_0x3bd1d5+=_0x185cfd(0x82a)[_0x185cfd(0x520)](_0x257ab3['id'],_0x257ab3['name']),_0x3bd1d5+=_0x452375,_0x3bd1d5+=_0x8faab8,_0x3bd1d5+=_0x452375,_0x3bd1d5+=_0x185cfd(0x15a)[_0x185cfd(0x520)](_0x257ab3['id'],_0x257ab3[_0x185cfd(0x3f0)]),_0x3bd1d5+=_0x452375),this['_commonEventLayers']--;}else this[_0x185cfd(0x38f)]=0x0;}}}}}}}}}}}return _0x3bd1d5['length']>0x0&&(_0x3bd1d5+=_0x4560c9),_0x3bd1d5;},PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],'OpenURL',_0xa1f472=>{const _0x4c20f6=_0x283c20;VisuMZ[_0x4c20f6(0x5c0)](_0xa1f472,_0xa1f472);const _0x4831eb=_0xa1f472[_0x4c20f6(0x54b)];VisuMZ[_0x4c20f6(0x546)](_0x4831eb);}),PluginManager[_0x283c20(0x713)](pluginData['name'],_0x283c20(0x662),_0x3e7d23=>{const _0x2b93a9=_0x283c20;VisuMZ['ConvertParams'](_0x3e7d23,_0x3e7d23);const _0x899c21=_0x3e7d23[_0x2b93a9(0x86d)]||0x0;$gameParty[_0x2b93a9(0x340)](_0x899c21);}),PluginManager[_0x283c20(0x713)](pluginData['name'],_0x283c20(0x4eb),_0x131271=>{const _0x4f09a7=_0x283c20;if(!SceneManager[_0x4f09a7(0x4e2)]())return;VisuMZ[_0x4f09a7(0x5c0)](_0x131271,_0x131271);const _0x138713=_0x131271['CommonEventID'];SceneManager[_0x4f09a7(0x573)][_0x4f09a7(0x798)](_0x138713);}),PluginManager[_0x283c20(0x713)](pluginData['name'],_0x283c20(0x3c3),_0xcd1f0a=>{const _0x4d99a5=_0x283c20;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;VisuMZ['ConvertParams'](_0xcd1f0a,_0xcd1f0a);const _0x588753=_0xcd1f0a[_0x4d99a5(0x739)]||0x1;$gameTemp[_0x4d99a5(0x409)]=_0x588753;}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],'PictureEasingType',_0x467a62=>{const _0x74ce4a=_0x283c20;VisuMZ[_0x74ce4a(0x5c0)](_0x467a62,_0x467a62);const _0x208136=_0x467a62['pictureId']||0x1,_0x3e49b3=_0x467a62['easingType']||_0x74ce4a(0x7bf),_0x34d4ff=$gameScreen[_0x74ce4a(0x1d1)](_0x208136);_0x34d4ff&&_0x34d4ff[_0x74ce4a(0x62c)](_0x3e49b3);}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],_0x283c20(0x7af),_0x3d7ed1=>{const _0x21a202=_0x283c20;for(let _0x320a43=0x1;_0x320a43<=0x64;_0x320a43++){if(_0x21a202(0x6f5)!==_0x21a202(0x75d))$gameScreen[_0x21a202(0x1fa)](_0x320a43);else{const _0x40c268='_stored_systemColor';this[_0x21a202(0x3f7)]=this[_0x21a202(0x3f7)]||{};if(this[_0x21a202(0x3f7)][_0x40c268])return this[_0x21a202(0x3f7)][_0x40c268];const _0x5c115d=_0x35595f[_0x21a202(0x85a)][_0x21a202(0x914)][_0x21a202(0x113)][_0x21a202(0x400)];return this[_0x21a202(0x21e)](_0x40c268,_0x5c115d);}}}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],_0x283c20(0x387),_0x30838c=>{const _0x51282d=_0x283c20;VisuMZ[_0x51282d(0x5c0)](_0x30838c,_0x30838c);const _0x323f4d=Math['min'](_0x30838c[_0x51282d(0x4bf)],_0x30838c[_0x51282d(0x6cd)]),_0x5ba564=Math[_0x51282d(0x861)](_0x30838c[_0x51282d(0x4bf)],_0x30838c[_0x51282d(0x6cd)]);for(let _0xf41c5c=_0x323f4d;_0xf41c5c<=_0x5ba564;_0xf41c5c++){$gameScreen[_0x51282d(0x1fa)](_0xf41c5c);}}),PluginManager['registerCommand'](pluginData['name'],_0x283c20(0x466),_0x5a5bcd=>{const _0xf4fc9e=_0x283c20;VisuMZ[_0xf4fc9e(0x5c0)](_0x5a5bcd,_0x5a5bcd);const _0x531b70=Math[_0xf4fc9e(0x4a8)](_0x5a5bcd['PictureID'])['clamp'](0x1,0x64),_0x18b853=_0x5a5bcd['Settings'],_0x52f1d3=_0x18b853[_0xf4fc9e(0x687)][_0xf4fc9e(0x4f9)](0x0,0x1),_0x51ed85=Math[_0xf4fc9e(0x4a8)](_0x18b853[_0xf4fc9e(0x197)]||0x0),_0x4f182e=Math['round'](_0x18b853[_0xf4fc9e(0x1af)]||0x0),_0x275fc6=Math['round'](_0x18b853['ScaleX']||0x0),_0x4e5d62=Math[_0xf4fc9e(0x4a8)](_0x18b853[_0xf4fc9e(0x891)]||0x0),_0x210511=Math[_0xf4fc9e(0x4a8)](_0x18b853[_0xf4fc9e(0x1c3)])[_0xf4fc9e(0x4f9)](0x0,0xff),_0x4fc322=_0x18b853['BlendMode'],_0x5138a3='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x1e20b6=_0x5a5bcd[_0xf4fc9e(0x316)]?_0xf4fc9e(0x316):_0xf4fc9e(0x7aa),_0x415453=_0x5138a3[_0xf4fc9e(0x520)](_0x5a5bcd['IconIndex'],_0x1e20b6);$gameScreen[_0xf4fc9e(0x14f)](_0x531b70,_0x415453,_0x52f1d3,_0x51ed85,_0x4f182e,_0x275fc6,_0x4e5d62,_0x210511,_0x4fc322);}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],_0x283c20(0x441),_0x6c2d0f=>{const _0x52927a=_0x283c20;VisuMZ[_0x52927a(0x5c0)](_0x6c2d0f,_0x6c2d0f);const _0x2c280d=_0x6c2d0f['Type']||_0x52927a(0x27e),_0x8e80f7=_0x6c2d0f[_0x52927a(0x627)]['clamp'](0x1,0x9),_0x2120a3=_0x6c2d0f[_0x52927a(0x575)][_0x52927a(0x4f9)](0x1,0x9),_0x2cd8a7=_0x6c2d0f[_0x52927a(0x5d2)]||0x1,_0xae5817=_0x6c2d0f[_0x52927a(0x104)];$gameScreen[_0x52927a(0x5c8)](_0x2c280d),$gameScreen[_0x52927a(0x731)](_0x8e80f7,_0x2120a3,_0x2cd8a7);if(_0xae5817){const _0x5328f6=$gameTemp[_0x52927a(0x904)]();if(_0x5328f6)_0x5328f6[_0x52927a(0x221)](_0x2cd8a7);}}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],_0x283c20(0x416),_0x5d10a6=>{const _0x22100f=_0x283c20;VisuMZ[_0x22100f(0x5c0)](_0x5d10a6,_0x5d10a6);const _0x2aadbc=_0x5d10a6[_0x22100f(0x8da)]||0x1;$gameSystem[_0x22100f(0x433)](_0x2aadbc);}),PluginManager['registerCommand'](pluginData['name'],_0x283c20(0x908),_0x3bc870=>{const _0x2f3175=_0x283c20;if($gameParty['inBattle']())return;VisuMZ[_0x2f3175(0x5c0)](_0x3bc870,_0x3bc870);const _0x5363ef=_0x3bc870[_0x2f3175(0x8da)];if(_0x5363ef[_0x2f3175(0x312)](/Front/i)){if('yiiLt'===_0x2f3175(0x44b))$gameSystem[_0x2f3175(0x512)](![]);else{_0x57bd3f[_0x2f3175(0x85a)]['ParseClassNotetags']['call'](this,_0xa3b239);if(_0x2c4c0c[_0x2f3175(0x3e4)])for(const _0x386c9a of _0x191a8a[_0x2f3175(0x3e4)]){_0x386c9a['note'][_0x2f3175(0x312)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x386c9a[_0x2f3175(0x51b)]=_0x331966[_0x2f3175(0x861)](_0x2b502e(_0x1a6f01['$1']),0x1));}}}else{if(_0x5363ef[_0x2f3175(0x312)](/Side/i)){if(_0x2f3175(0x790)===_0x2f3175(0x223))return _0x25609f[_0x2f3175(0x631)][_0x2f3175(0x154)][_0x2f3175(0x5d8)](this);else $gameSystem[_0x2f3175(0x512)](!![]);}else $gameSystem['setSideView'](!$gameSystem[_0x2f3175(0x721)]());}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],'SystemLoadAudio',_0x4e6853=>{const _0x37b741=_0x283c20;if($gameParty[_0x37b741(0x478)]())return;VisuMZ[_0x37b741(0x5c0)](_0x4e6853,_0x4e6853);const _0x5eeee8=[_0x37b741(0x757),_0x37b741(0x1d3),'me','se'];for(const _0x5b9294 of _0x5eeee8){const _0x2561bc=_0x4e6853[_0x5b9294],_0x4e1e4b=_0x37b741(0x42a)[_0x37b741(0x520)](_0x5b9294);for(const _0x377949 of _0x2561bc){if('lGrTE'!==_0x37b741(0x148))return _0x45002d['CoreEngine'][_0x37b741(0x32d)][_0x37b741(0x5d8)](this,_0x40e68f);else AudioManager[_0x37b741(0x2f1)](_0x4e1e4b,_0x377949);}}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x2b0),_0x29a224=>{const _0x140699=_0x283c20;if($gameParty[_0x140699(0x478)]())return;VisuMZ[_0x140699(0x5c0)](_0x29a224,_0x29a224);const _0x3648d2=[_0x140699(0x7e8),_0x140699(0x2f2),'battlebacks2','characters',_0x140699(0x792),_0x140699(0x3b5),_0x140699(0x6ee),'pictures','sv_actors',_0x140699(0x92b),_0x140699(0x1aa),_0x140699(0x380),'titles1','titles2'];for(const _0x4b9aa4 of _0x3648d2){const _0x175a91=_0x29a224[_0x4b9aa4],_0xf9c8a8=_0x140699(0x270)[_0x140699(0x520)](_0x4b9aa4);for(const _0x456b42 of _0x175a91){ImageManager[_0x140699(0x803)](_0xf9c8a8,_0x456b42);}}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x566),_0x3b3b20=>{const _0x4061fc=_0x283c20;if($gameParty[_0x4061fc(0x478)]())return;VisuMZ[_0x4061fc(0x5c0)](_0x3b3b20,_0x3b3b20);const _0xa6e9ea=_0x3b3b20[_0x4061fc(0x821)],_0x3a340a=(_0x3b3b20[_0x4061fc(0x48d)]||0x0)/0x64;for(const _0x3c66cc of _0xa6e9ea){const _0x4cee8e=Math[_0x4061fc(0x27e)]()<=_0x3a340a;$gameSwitches[_0x4061fc(0x3c0)](_0x3c66cc,_0x4cee8e);}}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],_0x283c20(0x459),_0x417e42=>{const _0x190888=_0x283c20;if($gameParty['inBattle']())return;VisuMZ[_0x190888(0x5c0)](_0x417e42,_0x417e42);const _0x481911=Math[_0x190888(0x8f4)](_0x417e42[_0x190888(0x4bf)],_0x417e42[_0x190888(0x6cd)]),_0x3e2e2c=Math[_0x190888(0x861)](_0x417e42['StartID'],_0x417e42[_0x190888(0x6cd)]),_0x343ec5=(_0x417e42[_0x190888(0x48d)]||0x0)/0x64;for(let _0x28aed2=_0x481911;_0x28aed2<=_0x3e2e2c;_0x28aed2++){const _0x446a2a=Math[_0x190888(0x27e)]()<=_0x343ec5;$gameSwitches['setValue'](_0x28aed2,_0x446a2a);}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x2c7),_0xa04844=>{const _0x27d504=_0x283c20;if($gameParty[_0x27d504(0x478)]())return;VisuMZ[_0x27d504(0x5c0)](_0xa04844,_0xa04844);const _0x3207be=_0xa04844[_0x27d504(0x821)];for(const _0x685530 of _0x3207be){if('DJGoY'!==_0x27d504(0x2d4)){if(this[_0x27d504(0x805)]===_0x42ad31)this[_0x27d504(0x123)]();return this[_0x27d504(0x805)];}else{const _0x487049=$gameSwitches[_0x27d504(0x86d)](_0x685530);$gameSwitches[_0x27d504(0x3c0)](_0x685530,!_0x487049);}}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x52e),_0x1f6ddd=>{const _0x3fccfe=_0x283c20;if($gameParty[_0x3fccfe(0x478)]())return;VisuMZ[_0x3fccfe(0x5c0)](_0x1f6ddd,_0x1f6ddd);const _0x209e76=Math['min'](_0x1f6ddd['StartID'],_0x1f6ddd[_0x3fccfe(0x6cd)]),_0x4c74ac=Math[_0x3fccfe(0x861)](_0x1f6ddd[_0x3fccfe(0x4bf)],_0x1f6ddd['EndingID']);for(let _0x158608=_0x209e76;_0x158608<=_0x4c74ac;_0x158608++){const _0x4781bd=$gameSwitches[_0x3fccfe(0x86d)](_0x158608);$gameSwitches[_0x3fccfe(0x3c0)](_0x158608,!_0x4781bd);}}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],'SystemSetBattleSystem',_0x58958e=>{const _0x8c4b8d=_0x283c20;if($gameParty[_0x8c4b8d(0x478)]())return;VisuMZ[_0x8c4b8d(0x5c0)](_0x58958e,_0x58958e);const _0x18b058=_0x58958e['option']['toUpperCase']()[_0x8c4b8d(0x538)](),_0x23e822=VisuMZ['CoreEngine'][_0x8c4b8d(0x62a)](_0x18b058);$gameSystem[_0x8c4b8d(0x8e2)](_0x23e822);}),VisuMZ[_0x283c20(0x85a)][_0x283c20(0x62a)]=function(_0x4aed50){const _0x3b19e2=_0x283c20;_0x4aed50=_0x4aed50||_0x3b19e2(0x589),_0x4aed50=String(_0x4aed50)[_0x3b19e2(0x287)]()[_0x3b19e2(0x538)]();switch(_0x4aed50){case _0x3b19e2(0x6c3):return 0x0;case _0x3b19e2(0x323):Imported[_0x3b19e2(0x138)]&&(ConfigManager[_0x3b19e2(0x67f)]=!![]);return 0x1;case _0x3b19e2(0x447):Imported['VisuMZ_1_OptionsCore']&&(_0x3b19e2(0x7fd)===_0x3b19e2(0x7fd)?ConfigManager[_0x3b19e2(0x67f)]=![]:this[_0x3b19e2(0x747)]['setBackgroundType'](_0x574561[_0x3b19e2(0x631)][_0x3b19e2(0x6df)]));return 0x2;case _0x3b19e2(0x326):if(Imported[_0x3b19e2(0x82d)]){if(_0x3b19e2(0x2dc)!=='mKNvZ')return'CTB';else{const _0x38ce62=_0x3b19e2(0x30f);this[_0x3b19e2(0x3f7)]=this['_colorCache']||{};if(this[_0x3b19e2(0x3f7)][_0x38ce62])return this[_0x3b19e2(0x3f7)][_0x38ce62];const _0x57fc02=_0x56c245['CoreEngine'][_0x3b19e2(0x914)][_0x3b19e2(0x113)][_0x3b19e2(0x829)];return this[_0x3b19e2(0x21e)](_0x38ce62,_0x57fc02);}}break;case _0x3b19e2(0x384):if(Imported['VisuMZ_2_BattleSystemSTB']){if('sqGXI'==='sqGXI')return _0x3b19e2(0x384);else{const _0x11ba32=_0x21d787[_0x3b19e2(0x573)];for(let _0x4b6075=0x1;_0x4b6075<=0x5;_0x4b6075++){if(this[_0x3b19e2(0x7ce)][_0x3b19e2(0x7cb)['format'](_0x4b6075)]!==_0x11ba32[_0x3b19e2(0x2c5)[_0x3b19e2(0x520)](_0x4b6075)]())return this[_0x3b19e2(0x661)]();if(this[_0x3b19e2(0x7ce)][_0x3b19e2(0x45b)[_0x3b19e2(0x520)](_0x4b6075)]!==_0x11ba32[_0x3b19e2(0x234)['format'](_0x4b6075)]())return this[_0x3b19e2(0x661)]();}}}break;case _0x3b19e2(0x882):if(Imported[_0x3b19e2(0x3b4)])return _0x3b19e2(0x882);break;case'FTB':if(Imported[_0x3b19e2(0x839)]){if(_0x3b19e2(0x682)===_0x3b19e2(0x682))return _0x3b19e2(0x36c);else{var _0x2cf57a=_0x2101b3(_0x3118ed['$1']);try{_0x58f5e9+=_0x2feea7(_0x2cf57a);}catch(_0x161f68){if(_0x5768dc[_0x3b19e2(0x8bc)]())_0xb03ed9[_0x3b19e2(0x836)](_0x161f68);}}}break;case _0x3b19e2(0x171):if(Imported[_0x3b19e2(0x311)]){if(_0x3b19e2(0x174)==='FiQud')return _0x3b19e2(0x171);else _0x57cc67[_0x3b19e2(0x85a)][_0x3b19e2(0x2a3)][_0x3b19e2(0x5d8)](this,_0x2b7b94,_0x3857c4,_0x3e750a,_0x4b3f9b,_0x242986),this['markCoreEngineModified']();}break;case _0x3b19e2(0x3af):if(Imported[_0x3b19e2(0x91c)])return _0x3b19e2(0x3af);break;case _0x3b19e2(0x2a4):if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x3b19e2(0x2a4);break;}return $dataSystem[_0x3b19e2(0x81c)];},PluginManager[_0x283c20(0x713)](pluginData['name'],'SystemSetWindowPadding',_0x1c58fd=>{const _0x46a0eb=_0x283c20;VisuMZ['ConvertParams'](_0x1c58fd,_0x1c58fd);const _0x10692e=_0x1c58fd[_0x46a0eb(0x8da)]||0x1;$gameSystem['setWindowPadding'](_0x10692e);}),PluginManager[_0x283c20(0x713)](pluginData[_0x283c20(0x3f0)],_0x283c20(0x103),_0x532b4d=>{const _0x365956=_0x283c20;VisuMZ[_0x365956(0x5c0)](_0x532b4d,_0x532b4d);const _0x14f27e=_0x532b4d['id']||0x1,_0x1e2f9a=_0x532b4d['operation'],_0x3cdb92=_0x532b4d[_0x365956(0x4a5)]||0x0;let _0x523724=$gameVariables[_0x365956(0x86d)](_0x14f27e)||0x0;switch(_0x1e2f9a){case'=':_0x523724=_0x3cdb92;break;case'+':_0x523724+=_0x3cdb92;break;case'-':_0x523724-=_0x3cdb92;break;case'*':_0x523724*=_0x3cdb92;break;case'/':_0x523724/=_0x3cdb92;break;case'%':_0x523724%=_0x3cdb92;break;}_0x523724=_0x523724||0x0,$gameVariables[_0x365956(0x3c0)](_0x14f27e,_0x523724);}),PluginManager['registerCommand'](pluginData[_0x283c20(0x3f0)],'VariableJsBlock',_0x53032f=>{const _0x430f5c=_0x283c20;VisuMZ[_0x430f5c(0x5c0)](_0x53032f,_0x53032f);const _0x1dbc78=_0x53032f['id']()||0x1,_0x4f6284=_0x53032f[_0x430f5c(0x5ae)],_0x4b4333=_0x53032f[_0x430f5c(0x4a5)]()||0x0;let _0x33997f=$gameVariables[_0x430f5c(0x86d)](_0x1dbc78)||0x0;switch(_0x4f6284){case'=':_0x33997f=_0x4b4333;break;case'+':_0x33997f+=_0x4b4333;break;case'-':_0x33997f-=_0x4b4333;break;case'*':_0x33997f*=_0x4b4333;break;case'/':_0x33997f/=_0x4b4333;break;case'%':_0x33997f%=_0x4b4333;break;}_0x33997f=_0x33997f||0x0,$gameVariables[_0x430f5c(0x3c0)](_0x1dbc78,_0x33997f);}),VisuMZ[_0x283c20(0x85a)][_0x283c20(0x266)]=Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x12b)],Scene_Boot[_0x283c20(0x44e)]['onDatabaseLoaded']=function(){const _0x372363=_0x283c20;VisuMZ[_0x372363(0x85a)][_0x372363(0x266)][_0x372363(0x5d8)](this),this[_0x372363(0x937)](),this[_0x372363(0x260)](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x372363(0x435)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x770)]={},Scene_Boot[_0x283c20(0x44e)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x46c167=_0x283c20,_0x19426c=[_0x46c167(0x47a),_0x46c167(0x730),_0x46c167(0x423),'DEF','MAT',_0x46c167(0x4d1),_0x46c167(0x593),_0x46c167(0x612)],_0x13e566=[_0x46c167(0x354),_0x46c167(0x437),_0x46c167(0x860),_0x46c167(0x191),_0x46c167(0x7e0),_0x46c167(0x899),'CNT',_0x46c167(0x830),_0x46c167(0x89a),_0x46c167(0x6ff)],_0x565259=['TGR',_0x46c167(0x76e),_0x46c167(0x905),'PHA',_0x46c167(0x594),'TCR','PDR',_0x46c167(0x7dc),'FDR',_0x46c167(0x273)],_0x1d6362=[_0x19426c,_0x13e566,_0x565259],_0x5dcd3b=[_0x46c167(0x716),_0x46c167(0x355),_0x46c167(0x659),_0x46c167(0x5c4),_0x46c167(0x4f7),_0x46c167(0x742),'Rate2',_0x46c167(0x1c2),_0x46c167(0x86e),_0x46c167(0x90e)];for(const _0x399828 of _0x1d6362){let _0x12bc3c='';if(_0x399828===_0x19426c)_0x12bc3c=_0x46c167(0x508);if(_0x399828===_0x13e566)_0x12bc3c=_0x46c167(0x69b);if(_0x399828===_0x565259)_0x12bc3c=_0x46c167(0x5ec);for(const _0x5126e4 of _0x5dcd3b){let _0x4dd892=_0x46c167(0x615)[_0x46c167(0x520)](_0x12bc3c,_0x5126e4);VisuMZ[_0x46c167(0x85a)]['RegExp'][_0x4dd892]=[],VisuMZ[_0x46c167(0x85a)]['RegExp'][_0x4dd892+'JS']=[];let _0x59349a=_0x46c167(0x46e);if([_0x46c167(0x716),_0x46c167(0x1c2)][_0x46c167(0x59d)](_0x5126e4))_0x59349a+=_0x46c167(0x38d);else{if(['Plus1',_0x46c167(0x86e)][_0x46c167(0x59d)](_0x5126e4))_0x59349a+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x46c167(0x659),_0x46c167(0x90e)][_0x46c167(0x59d)](_0x5126e4))_0x46c167(0x27c)!==_0x46c167(0x27c)?_0x6d9dde[_0x46c167(0x85a)]['loadMapData'](_0x2848f3):_0x59349a+=_0x46c167(0x83f);else{if(_0x5126e4===_0x46c167(0x5c4)){if(_0x46c167(0x814)!==_0x46c167(0x31c))_0x59349a+=_0x46c167(0x216);else return _0x22d7d1[_0x46c167(0x797)](_0x46c167(0x677));}else{if(_0x5126e4==='Rate1'){if(_0x46c167(0x4af)!=='lJElX')return _0x522892[_0x46c167(0x87c)]-0.05;else _0x59349a+=_0x46c167(0x4bc);}else{if(_0x5126e4===_0x46c167(0x71e)){if('eGAIw'===_0x46c167(0x401))_0x59349a+=_0x46c167(0x44c);else{if(_0x2645ed)_0x40be03[_0x46c167(0x2d7)](_0x1a773e);}}}}}}}for(const _0x5cae93 of _0x399828){let _0x4c9eb4=_0x5126e4['replace'](/[\d+]/g,'')['toUpperCase']();const _0x545d8c=_0x59349a['format'](_0x5cae93,_0x4c9eb4);VisuMZ[_0x46c167(0x85a)]['RegExp'][_0x4dd892]['push'](new RegExp(_0x545d8c,'i'));const _0xb69ac5='<JS\x20%1\x20%2:[\x20](.*)>'[_0x46c167(0x520)](_0x5cae93,_0x4c9eb4);VisuMZ[_0x46c167(0x85a)]['RegExp'][_0x4dd892+'JS'][_0x46c167(0x163)](new RegExp(_0xb69ac5,'i'));}}}},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x260)]=function(){const _0x1ff165=_0x283c20;if(VisuMZ[_0x1ff165(0x435)])return;},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x848)]=function(){const _0x47898a=_0x283c20,_0x103098=VisuMZ['CoreEngine'][_0x47898a(0x914)];_0x103098['QoL'][_0x47898a(0x51e)]&&VisuMZ['ShowDevTools'](!![]);_0x103098[_0x47898a(0x5be)][_0x47898a(0x17c)]&&(Input[_0x47898a(0x4f8)][0x23]='end',Input[_0x47898a(0x4f8)][0x24]=_0x47898a(0x672));if(_0x103098[_0x47898a(0x52f)]){if(_0x47898a(0x3e3)!=='QTMPd'){const _0x48f6b2=_0x103098[_0x47898a(0x52f)];_0x48f6b2[_0x47898a(0x2ff)]=_0x48f6b2[_0x47898a(0x2ff)]||_0x47898a(0x8a9),_0x48f6b2[_0x47898a(0x319)]=_0x48f6b2['KeyTAB']||_0x47898a(0x5dd);}else return this[_0x47898a(0x8f3)]['shift']();}if(_0x103098['KeyboardInput'][_0x47898a(0x880)]){if(_0x47898a(0x17b)!==_0x47898a(0x46f))Input['keyMapper'][0x57]='up',Input[_0x47898a(0x4f8)][0x41]='left',Input[_0x47898a(0x4f8)][0x53]=_0x47898a(0x5c2),Input[_0x47898a(0x4f8)][0x44]='right',Input[_0x47898a(0x4f8)][0x45]=_0x47898a(0x8dd);else return _0x5070f0[_0x47898a(0x631)]['CommandRect'][_0x47898a(0x5d8)](this);}if(_0x103098[_0x47898a(0x1f7)]['DashToggleR']){if(_0x47898a(0x2a8)!==_0x47898a(0x7b6))Input['keyMapper'][0x52]=_0x47898a(0x72e);else{var _0x344a95=_0x27ca70(_0x41e88b['$1']);_0x22c0cc+=_0x344a95;}}_0x103098[_0x47898a(0x7ee)][_0x47898a(0x1cc)]=_0x103098[_0x47898a(0x7ee)][_0x47898a(0x1cc)][_0x47898a(0x37e)](_0x292373=>_0x292373[_0x47898a(0x287)]()['trim']()),_0x103098[_0x47898a(0x7ee)][_0x47898a(0x597)]=_0x103098[_0x47898a(0x7ee)][_0x47898a(0x597)][_0x47898a(0x37e)](_0xeeb6d2=>_0xeeb6d2[_0x47898a(0x287)]()['trim']());},Scene_Boot['prototype'][_0x283c20(0x189)]=function(){const _0x3e49d0=_0x283c20;this[_0x3e49d0(0x12e)]();},Scene_Boot['prototype'][_0x283c20(0x12e)]=function(){const _0x1ab3de=_0x283c20,_0x56e4a5=VisuMZ[_0x1ab3de(0x85a)][_0x1ab3de(0x914)]['jsQuickFunc'];for(const _0x480c80 of _0x56e4a5){if(_0x1ab3de(0x8e3)!==_0x1ab3de(0x8e3))_0x465884[_0x1ab3de(0x85a)][_0x1ab3de(0x1c6)][_0x1ab3de(0x5d8)](this);else{const _0x93f3a1=_0x480c80[_0x1ab3de(0x2b4)][_0x1ab3de(0x243)](/[ ]/g,''),_0x3c4512=_0x480c80[_0x1ab3de(0x2fe)];VisuMZ[_0x1ab3de(0x85a)]['createJsQuickFunction'](_0x93f3a1,_0x3c4512);}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8e0)]=function(_0x18aeb1,_0x5d6cfa){const _0x49e472=_0x283c20;if(!!window[_0x18aeb1]){if(_0x49e472(0x91b)===_0x49e472(0x91b)){if($gameTemp['isPlaytest']())console[_0x49e472(0x836)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x49e472(0x520)](_0x18aeb1));}else this[_0x49e472(0x4aa)]=_0x39d6,this[_0x49e472(0x8b6)]=_0x41069d['makeDeepCopy'](this[_0x49e472(0x4aa)]);}const _0x328466=_0x49e472(0x108)[_0x49e472(0x520)](_0x18aeb1,_0x5d6cfa);window[_0x18aeb1]=new Function(_0x328466);},Scene_Boot[_0x283c20(0x44e)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x32f545=_0x283c20,_0xe37cd7=VisuMZ[_0x32f545(0x85a)][_0x32f545(0x914)]['CustomParam'];if(!_0xe37cd7)return;for(const _0x885a39 of _0xe37cd7){if(_0x32f545(0x413)!==_0x32f545(0x413))return _0x5cdf34[_0x32f545(0x485)](this),_0x29d5f7[_0x32f545(0x85a)][_0x32f545(0x8df)]['call'](this,_0x236eaf);else{if(!_0x885a39)continue;VisuMZ[_0x32f545(0x85a)][_0x32f545(0x86f)](_0x885a39);}}},VisuMZ['CoreEngine'][_0x283c20(0x481)]={},VisuMZ['CoreEngine'][_0x283c20(0x5c9)]={},VisuMZ[_0x283c20(0x85a)]['CustomParamType']={},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x83b)]={},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x86f)]=function(_0x35017a){const _0x3359de=_0x283c20,_0x3fc58c=_0x35017a[_0x3359de(0x3a7)],_0x12c52f=_0x35017a['ParamName'],_0xfe54c8=_0x35017a[_0x3359de(0x3cf)],_0x166892=_0x35017a[_0x3359de(0x181)],_0x16ce64=new Function(_0x35017a[_0x3359de(0x461)]);VisuMZ[_0x3359de(0x85a)][_0x3359de(0x481)][_0x3fc58c[_0x3359de(0x287)]()[_0x3359de(0x538)]()]=_0x12c52f,VisuMZ[_0x3359de(0x85a)]['CustomParamIcons'][_0x3fc58c[_0x3359de(0x287)]()[_0x3359de(0x538)]()]=_0xfe54c8,VisuMZ[_0x3359de(0x85a)][_0x3359de(0x2c6)][_0x3fc58c[_0x3359de(0x287)]()[_0x3359de(0x538)]()]=_0x166892,VisuMZ[_0x3359de(0x85a)][_0x3359de(0x83b)][_0x3fc58c[_0x3359de(0x287)]()[_0x3359de(0x538)]()]=_0x3fc58c,Object[_0x3359de(0x8a4)](Game_BattlerBase[_0x3359de(0x44e)],_0x3fc58c,{'get'(){const _0x20a65d=_0x3359de,_0x1fe85a=_0x16ce64[_0x20a65d(0x5d8)](this);return _0x166892===_0x20a65d(0x110)?Math[_0x20a65d(0x4a8)](_0x1fe85a):_0x1fe85a;}});},VisuMZ[_0x283c20(0x435)]=function(){const _0x4b0e5e=_0x283c20;for(const _0x487230 of $dataActors){if(_0x487230)VisuMZ['ParseActorNotetags'](_0x487230);}for(const _0x3e38e7 of $dataClasses){if(_0x3e38e7)VisuMZ['ParseClassNotetags'](_0x3e38e7);}for(const _0x1633a6 of $dataSkills){if(_0x4b0e5e(0x83d)!==_0x4b0e5e(0x83d))this[_0x4b0e5e(0x365)]='FV';else{if(_0x1633a6)VisuMZ[_0x4b0e5e(0x2c9)](_0x1633a6);}}for(const _0x45c9c0 of $dataItems){if(_0x45c9c0)VisuMZ[_0x4b0e5e(0x2d7)](_0x45c9c0);}for(const _0x16f510 of $dataWeapons){if('DEVvd'!==_0x4b0e5e(0x238)){if(_0x16f510)VisuMZ[_0x4b0e5e(0x714)](_0x16f510);}else return _0x5d7d1c[_0x4b0e5e(0x631)]['ItemRect'][_0x4b0e5e(0x5d8)](this);}for(const _0x562266 of $dataArmors){if(_0x562266)VisuMZ[_0x4b0e5e(0x460)](_0x562266);}for(const _0x173873 of $dataEnemies){if(_0x173873)VisuMZ[_0x4b0e5e(0x18b)](_0x173873);}for(const _0x344416 of $dataStates){if(_0x344416)VisuMZ[_0x4b0e5e(0x590)](_0x344416);}for(const _0x29521c of $dataTilesets){if(_0x29521c)VisuMZ[_0x4b0e5e(0x18f)](_0x29521c);}},VisuMZ['ParseActorNotetags']=function(_0x4497d8){},VisuMZ[_0x283c20(0x90a)]=function(_0xea7cff){},VisuMZ[_0x283c20(0x2c9)]=function(_0x5d5b41){},VisuMZ[_0x283c20(0x2d7)]=function(_0x1e1374){},VisuMZ[_0x283c20(0x714)]=function(_0x3541d7){},VisuMZ[_0x283c20(0x460)]=function(_0x5607fd){},VisuMZ[_0x283c20(0x18b)]=function(_0x63c6d){},VisuMZ['ParseStateNotetags']=function(_0x1a8ff5){},VisuMZ[_0x283c20(0x18f)]=function(_0x518127){},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8fc)]=VisuMZ[_0x283c20(0x8fc)],VisuMZ[_0x283c20(0x8fc)]=function(_0x2b3b51){const _0x2bb9f1=_0x283c20;VisuMZ[_0x2bb9f1(0x85a)][_0x2bb9f1(0x8fc)]['call'](this,_0x2b3b51);const _0x2e36e9=_0x2b3b51[_0x2bb9f1(0x40d)];if(_0x2e36e9[_0x2bb9f1(0x312)](/<MAX LEVEL:[ ](\d+)>/i)){_0x2b3b51[_0x2bb9f1(0x492)]=Number(RegExp['$1']);if(_0x2b3b51['maxLevel']===0x0)_0x2b3b51[_0x2bb9f1(0x492)]=Number['MAX_SAFE_INTEGER'];}_0x2e36e9['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2b3b51['initialLevel']=Math[_0x2bb9f1(0x8f4)](Number(RegExp['$1']),_0x2b3b51[_0x2bb9f1(0x492)]));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x90a)]=VisuMZ[_0x283c20(0x90a)],VisuMZ[_0x283c20(0x90a)]=function(_0x58a49c){const _0x19481c=_0x283c20;VisuMZ[_0x19481c(0x85a)][_0x19481c(0x90a)][_0x19481c(0x5d8)](this,_0x58a49c);if(_0x58a49c[_0x19481c(0x3e4)])for(const _0x53db60 of _0x58a49c['learnings']){if(_0x19481c(0x79e)!==_0x19481c(0x4d5))_0x53db60['note'][_0x19481c(0x312)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x53db60[_0x19481c(0x51b)]=Math['max'](Number(RegExp['$1']),0x1));else var _0x39f901=_0x5da099[_0x19481c(0x2b6)](_0x2c72f3*0x2,_0x19481c(0x5fc))*0.5;}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x18b)]=VisuMZ[_0x283c20(0x18b)],VisuMZ[_0x283c20(0x18b)]=function(_0x328002){const _0x1a33f8=_0x283c20;VisuMZ[_0x1a33f8(0x85a)]['ParseEnemyNotetags'][_0x1a33f8(0x5d8)](this,_0x328002),_0x328002['level']=0x1;const _0x10c7ea=_0x328002[_0x1a33f8(0x40d)];if(_0x10c7ea[_0x1a33f8(0x312)](/<LEVEL:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x51b)]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<MAXHP:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x0]=Number(RegExp['$1']);if(_0x10c7ea['match'](/<MAXMP:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x1]=Number(RegExp['$1']);if(_0x10c7ea['match'](/<ATK:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x2]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<DEF:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x3]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<MAT:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x4]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<MDF:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x5]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<AGI:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x6]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<LUK:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x1c7)][0x7]=Number(RegExp['$1']);if(_0x10c7ea[_0x1a33f8(0x312)](/<EXP:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x3e7)]=Number(RegExp['$1']);if(_0x10c7ea['match'](/<GOLD:[ ](\d+)>/i))_0x328002[_0x1a33f8(0x31e)]=Number(RegExp['$1']);},VisuMZ['CoreEngine']['Graphics_defaultStretchMode']=Graphics[_0x283c20(0x651)],Graphics['_defaultStretchMode']=function(){const _0x1536f3=_0x283c20;switch(VisuMZ[_0x1536f3(0x85a)][_0x1536f3(0x914)][_0x1536f3(0x5be)][_0x1536f3(0x697)]){case _0x1536f3(0x602):return!![];case _0x1536f3(0x5d7):return![];default:return VisuMZ[_0x1536f3(0x85a)]['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x283c20(0x85a)]['Graphics_printError']=Graphics[_0x283c20(0x20f)],Graphics[_0x283c20(0x20f)]=function(_0x55bd23,_0x5136d9,_0x1515e9=null){const _0x7a426=_0x283c20;VisuMZ['CoreEngine'][_0x7a426(0x663)]['call'](this,_0x55bd23,_0x5136d9,_0x1515e9),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x551)]=Graphics[_0x283c20(0x613)],Graphics['_centerElement']=function(_0x535074){const _0x244317=_0x283c20;VisuMZ[_0x244317(0x85a)][_0x244317(0x551)][_0x244317(0x5d8)](this,_0x535074),this[_0x244317(0x244)](_0x535074);},Graphics[_0x283c20(0x244)]=function(_0x2f2ebd){const _0x2a308c=_0x283c20;VisuMZ[_0x2a308c(0x85a)][_0x2a308c(0x914)][_0x2a308c(0x5be)]['FontSmoothing']&&('HUDFc'!==_0x2a308c(0x476)?this[_0x2a308c(0x47e)]():_0x2f2ebd[_0x2a308c(0x766)][_0x2a308c(0x3a6)]=_0x2a308c(0x7d9));VisuMZ[_0x2a308c(0x85a)]['Settings'][_0x2a308c(0x5be)][_0x2a308c(0x2db)]&&(_0x2f2ebd[_0x2a308c(0x766)][_0x2a308c(0x7ef)]=_0x2a308c(0x736));const _0x5d4694=Math['max'](0x0,Math['floor'](_0x2f2ebd['width']*this[_0x2a308c(0x1ba)])),_0x31086d=Math['max'](0x0,Math[_0x2a308c(0x214)](_0x2f2ebd[_0x2a308c(0x753)]*this[_0x2a308c(0x1ba)]));_0x2f2ebd[_0x2a308c(0x766)][_0x2a308c(0x3d3)]=_0x5d4694+'px',_0x2f2ebd[_0x2a308c(0x766)][_0x2a308c(0x753)]=_0x31086d+'px';},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x545)]=Bitmap[_0x283c20(0x44e)]['initialize'],Bitmap[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(_0x4dc18b,_0x4426c8){const _0x209558=_0x283c20;VisuMZ['CoreEngine'][_0x209558(0x545)][_0x209558(0x5d8)](this,_0x4dc18b,_0x4426c8),this[_0x209558(0x67c)]=!(VisuMZ[_0x209558(0x85a)]['Settings'][_0x209558(0x5be)][_0x209558(0x2db)]??!![]);},Bitmap[_0x283c20(0x44e)][_0x283c20(0x3ac)]=function(){const _0x3315b8=_0x283c20;this[_0x3315b8(0x44d)]=!![];},VisuMZ[_0x283c20(0x85a)]['Sprite_destroy']=Sprite[_0x283c20(0x44e)]['destroy'],Sprite['prototype'][_0x283c20(0x2a1)]=function(){const _0x1d5d0e=_0x283c20;VisuMZ[_0x1d5d0e(0x85a)][_0x1d5d0e(0x19a)][_0x1d5d0e(0x5d8)](this),this[_0x1d5d0e(0x7da)]();},Sprite[_0x283c20(0x44e)][_0x283c20(0x7da)]=function(){const _0x4bbb3d=_0x283c20;if(!this[_0x4bbb3d(0x341)])return;if(!this[_0x4bbb3d(0x341)]['_customModified'])return;this[_0x4bbb3d(0x341)][_0x4bbb3d(0x866)]&&!this[_0x4bbb3d(0x758)][_0x4bbb3d(0x866)]['destroyed']&&this[_0x4bbb3d(0x341)][_0x4bbb3d(0x2a1)]();},VisuMZ['CoreEngine'][_0x283c20(0x2be)]=Bitmap['prototype']['resize'],Bitmap[_0x283c20(0x44e)][_0x283c20(0x178)]=function(_0x31e8cc,_0x4b257f){const _0x54593a=_0x283c20;VisuMZ['CoreEngine']['Bitmap_resize'][_0x54593a(0x5d8)](this,_0x31e8cc,_0x4b257f),this[_0x54593a(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4b0)]=Bitmap[_0x283c20(0x44e)][_0x283c20(0x6d5)],Bitmap['prototype'][_0x283c20(0x6d5)]=function(_0x4f8b9a,_0x3e8aac,_0x249726,_0x38f3e7,_0x3c9257,_0x39d57e,_0x586b97,_0x592c93,_0x3c0894){const _0x2acbae=_0x283c20;_0x3e8aac=Math[_0x2acbae(0x4a8)](_0x3e8aac),_0x249726=Math[_0x2acbae(0x4a8)](_0x249726),_0x38f3e7=Math['round'](_0x38f3e7),_0x3c9257=Math[_0x2acbae(0x4a8)](_0x3c9257),_0x39d57e=Math['round'](_0x39d57e),_0x586b97=Math['round'](_0x586b97),VisuMZ[_0x2acbae(0x85a)]['Bitmap_blt'][_0x2acbae(0x5d8)](this,_0x4f8b9a,_0x3e8aac,_0x249726,_0x38f3e7,_0x3c9257,_0x39d57e,_0x586b97,_0x592c93,_0x3c0894),this[_0x2acbae(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x56b)]=Bitmap[_0x283c20(0x44e)][_0x283c20(0x3c5)],Bitmap[_0x283c20(0x44e)][_0x283c20(0x3c5)]=function(_0x248937,_0xa7a03d,_0x2f3771,_0x405f62){const _0x39c2b6=_0x283c20;VisuMZ[_0x39c2b6(0x85a)][_0x39c2b6(0x56b)][_0x39c2b6(0x5d8)](this,_0x248937,_0xa7a03d,_0x2f3771,_0x405f62),this[_0x39c2b6(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x2a3)]=Bitmap[_0x283c20(0x44e)][_0x283c20(0x19b)],Bitmap['prototype']['fillRect']=function(_0x2d8dac,_0x41c04e,_0x4f36e8,_0x302c14,_0x11b6be){const _0x46de07=_0x283c20;VisuMZ[_0x46de07(0x85a)][_0x46de07(0x2a3)]['call'](this,_0x2d8dac,_0x41c04e,_0x4f36e8,_0x302c14,_0x11b6be),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x283c20(0x5b6)]=Bitmap[_0x283c20(0x44e)][_0x283c20(0x34c)],Bitmap[_0x283c20(0x44e)][_0x283c20(0x34c)]=function(_0x3b64b0,_0x21ef44,_0x69516d,_0x3c16fd,_0x49271e){const _0x73fbaa=_0x283c20;VisuMZ[_0x73fbaa(0x85a)][_0x73fbaa(0x5b6)][_0x73fbaa(0x5d8)](this,_0x3b64b0,_0x21ef44,_0x69516d,_0x3c16fd,_0x49271e),this[_0x73fbaa(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4d8)]=Bitmap['prototype'][_0x283c20(0x7d4)],Bitmap['prototype']['gradientFillRect']=function(_0x2b9f51,_0x592fe8,_0xbaa66,_0x12a3b3,_0x5a6f09,_0x4ae580,_0x181012){const _0x139908=_0x283c20;VisuMZ[_0x139908(0x85a)]['Bitmap_gradientFillRect'][_0x139908(0x5d8)](this,_0x2b9f51,_0x592fe8,_0xbaa66,_0x12a3b3,_0x5a6f09,_0x4ae580,_0x181012),this[_0x139908(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x2e6)]=Bitmap[_0x283c20(0x44e)][_0x283c20(0x5f7)],Bitmap[_0x283c20(0x44e)][_0x283c20(0x5f7)]=function(_0x4446c6,_0x2108c5,_0x2e0274,_0x4aead6){const _0x16bcef=_0x283c20;_0x4446c6=Math['round'](_0x4446c6),_0x2108c5=Math[_0x16bcef(0x4a8)](_0x2108c5),_0x2e0274=Math[_0x16bcef(0x4a8)](_0x2e0274),VisuMZ[_0x16bcef(0x85a)][_0x16bcef(0x2e6)]['call'](this,_0x4446c6,_0x2108c5,_0x2e0274,_0x4aead6),this[_0x16bcef(0x3ac)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5bd)]=Bitmap[_0x283c20(0x44e)]['measureTextWidth'],Bitmap[_0x283c20(0x44e)][_0x283c20(0x1a3)]=function(_0x1db8d4){const _0x36d7b7=_0x283c20;return Math[_0x36d7b7(0x7fc)](VisuMZ[_0x36d7b7(0x85a)]['Bitmap_measureTextWidth'][_0x36d7b7(0x5d8)](this,_0x1db8d4));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x3c8)]=Bitmap['prototype'][_0x283c20(0x367)],Bitmap[_0x283c20(0x44e)]['drawText']=function(_0x6a2b6e,_0xe4c2a1,_0x20dc91,_0x5ab232,_0x4be458,_0x363ef4){const _0x8a3319=_0x283c20;_0xe4c2a1=Math[_0x8a3319(0x4a8)](_0xe4c2a1),_0x20dc91=Math[_0x8a3319(0x4a8)](_0x20dc91),_0x5ab232=Math['round'](_0x5ab232),_0x4be458=Math[_0x8a3319(0x4a8)](_0x4be458),VisuMZ[_0x8a3319(0x85a)][_0x8a3319(0x3c8)]['call'](this,_0x6a2b6e,_0xe4c2a1,_0x20dc91,_0x5ab232,_0x4be458,_0x363ef4),this[_0x8a3319(0x3ac)]();},VisuMZ['CoreEngine'][_0x283c20(0x69c)]=Bitmap['prototype']['_drawTextOutline'],Bitmap['prototype']['_drawTextOutline']=function(_0x52c9b3,_0x267f8e,_0x27704f,_0x543409){const _0x5a4b2e=_0x283c20;VisuMZ['CoreEngine'][_0x5a4b2e(0x914)][_0x5a4b2e(0x5be)][_0x5a4b2e(0x801)]?'amvIY'!==_0x5a4b2e(0x582)?this[_0x5a4b2e(0x85f)]['x']=_0x59899b[_0x5a4b2e(0x4ef)]+0x4:this[_0x5a4b2e(0x62e)](_0x52c9b3,_0x267f8e,_0x27704f,_0x543409):VisuMZ[_0x5a4b2e(0x85a)][_0x5a4b2e(0x69c)]['call'](this,_0x52c9b3,_0x267f8e,_0x27704f,_0x543409);},Bitmap[_0x283c20(0x44e)][_0x283c20(0x62e)]=function(_0x307133,_0x1068f7,_0x2d672d,_0x21cd25){const _0x1884e9=_0x283c20,_0x30e77e=this[_0x1884e9(0x818)];_0x30e77e[_0x1884e9(0x4a4)]=this[_0x1884e9(0x55c)],_0x30e77e[_0x1884e9(0x31d)](_0x307133,_0x1068f7+0x2,_0x2d672d+0x2,_0x21cd25);},VisuMZ['CoreEngine'][_0x283c20(0x130)]=Input['clear'],Input['clear']=function(){const _0x165bd5=_0x283c20;VisuMZ[_0x165bd5(0x85a)][_0x165bd5(0x130)][_0x165bd5(0x5d8)](this),this['_inputString']=undefined,this[_0x165bd5(0x284)]=undefined,this[_0x165bd5(0x10a)]=Input[_0x165bd5(0x3ec)];},VisuMZ[_0x283c20(0x85a)]['Input_update']=Input['update'],Input[_0x283c20(0x118)]=function(){const _0x51f638=_0x283c20;VisuMZ[_0x51f638(0x85a)][_0x51f638(0x149)][_0x51f638(0x5d8)](this);if(this[_0x51f638(0x10a)])this[_0x51f638(0x10a)]--;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x1e0)]=Input['_pollGamepads'],Input[_0x283c20(0x92f)]=function(){const _0x4ea82e=_0x283c20;if(this['_gamepadWait'])return;VisuMZ['CoreEngine'][_0x4ea82e(0x1e0)][_0x4ea82e(0x5d8)](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5e5)]=Input['_setupEventHandlers'],Input[_0x283c20(0x5b0)]=function(){const _0xfca996=_0x283c20;VisuMZ['CoreEngine'][_0xfca996(0x5e5)]['call'](this),document[_0xfca996(0x48e)](_0xfca996(0x8f5),this[_0xfca996(0x74f)][_0xfca996(0x63b)](this));},VisuMZ['CoreEngine'][_0x283c20(0x397)]=Input['_onKeyDown'],Input[_0x283c20(0x15e)]=function(_0x1d60c3){const _0x1d09b0=_0x283c20;this[_0x1d09b0(0x284)]=_0x1d60c3[_0x1d09b0(0x487)],VisuMZ[_0x1d09b0(0x85a)][_0x1d09b0(0x397)][_0x1d09b0(0x5d8)](this,_0x1d60c3);},Input[_0x283c20(0x74f)]=function(_0x385661){const _0x1fe30b=_0x283c20;this[_0x1fe30b(0x475)](_0x385661);},Input[_0x283c20(0x475)]=function(_0x5ec139){const _0x37e3f6=_0x283c20;this[_0x37e3f6(0x284)]=_0x5ec139[_0x37e3f6(0x487)];let _0x529b8c=String[_0x37e3f6(0x556)](_0x5ec139['charCode']);if(this['_inputString']===undefined){if('IVloq'===_0x37e3f6(0x11b))this[_0x37e3f6(0x703)]=_0x529b8c;else return _0x1a9029[_0x37e3f6(0x85a)]['Spriteset_Base_isAnimationPlaying']['call'](this)||this[_0x37e3f6(0x26b)]();}else this['_inputString']+=_0x529b8c;},VisuMZ[_0x283c20(0x85a)]['Input_shouldPreventDefault']=Input[_0x283c20(0x3a3)],Input['_shouldPreventDefault']=function(_0x5d3ed4){const _0x28ae90=_0x283c20;if(_0x5d3ed4===0x8)return![];return VisuMZ[_0x28ae90(0x85a)][_0x28ae90(0x3bc)]['call'](this,_0x5d3ed4);},Input['isSpecialCode']=function(_0xa5a908){const _0x1d3905=_0x283c20;if(_0xa5a908[_0x1d3905(0x312)](/backspace/i))return this[_0x1d3905(0x284)]===0x8;if(_0xa5a908[_0x1d3905(0x312)](/enter/i))return this[_0x1d3905(0x284)]===0xd;if(_0xa5a908[_0x1d3905(0x312)](/escape/i))return this[_0x1d3905(0x284)]===0x1b;},Input[_0x283c20(0x2aa)]=function(){return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this['_inputSpecialKeyCode']);},Input[_0x283c20(0x218)]=function(){const _0x3958b5=_0x283c20;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3958b5(0x284)]);},Input['isGamepadConnected']=function(){const _0x3cb01b=_0x283c20;if(navigator[_0x3cb01b(0x72f)]){if(_0x3cb01b(0x3c1)===_0x3cb01b(0x302))_0x10094d['clear'](),this[_0x3cb01b(0x1fd)]==='keyboard'?this[_0x3cb01b(0x8c4)](_0x3cb01b(0x7f5)):this[_0x3cb01b(0x8c4)](_0x3cb01b(0x1df));else{const _0x3ea9a2=navigator[_0x3cb01b(0x72f)]();if(_0x3ea9a2)for(const _0x442bbf of _0x3ea9a2){if(_0x442bbf&&_0x442bbf[_0x3cb01b(0x24f)])return!![];}}}return![];},Input[_0x283c20(0x709)]=function(){const _0x886d2=_0x283c20;if(navigator['getGamepads']){const _0x33e3bd=navigator[_0x886d2(0x72f)]();if(_0x33e3bd)for(const _0x1034c6 of _0x33e3bd){if('curfK'!=='curfK')_0x36947f['CoreEngine'][_0x886d2(0x266)][_0x886d2(0x5d8)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x886d2(0x260)](),this[_0x886d2(0x848)](),this[_0x886d2(0x189)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),_0xba519e['ParseAllNotetags']();else{if(_0x1034c6&&_0x1034c6[_0x886d2(0x24f)]){if(this['isGamepadButtonPressed'](_0x1034c6))return!![];}}}}return![];},Input[_0x283c20(0x7c4)]=function(_0xd69e9f){const _0x248c9=_0x283c20,_0xb39338=_0xd69e9f[_0x248c9(0x820)];for(let _0x57992e=0x0;_0x57992e<_0xb39338[_0x248c9(0x6a1)];_0x57992e++){if(_0xb39338[_0x57992e][_0x248c9(0x934)])return!![];}return![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x54c)]=Tilemap['prototype'][_0x283c20(0x6c6)],Tilemap[_0x283c20(0x44e)][_0x283c20(0x6c6)]=function(_0x1ab477,_0xa33586,_0x25f962,_0x59d840){const _0x5981d4=_0x283c20;if($gameMap&&$gameMap[_0x5981d4(0x73e)]())return;VisuMZ['CoreEngine'][_0x5981d4(0x54c)][_0x5981d4(0x5d8)](this,_0x1ab477,_0xa33586,_0x25f962,_0x59d840);},Tilemap[_0x283c20(0x17d)][_0x283c20(0x44e)][_0x283c20(0x88d)]=function(){const _0x2de03d=_0x283c20;this[_0x2de03d(0x83e)]();for(let _0x39f262=0x0;_0x39f262<Tilemap[_0x2de03d(0x5a5)][_0x2de03d(0x42c)];_0x39f262++){if(_0x2de03d(0x85c)===_0x2de03d(0x2cf)){if(!_0x240360['isSceneMap']())return;_0x2b00f4[_0x2de03d(0x5c0)](_0x25c191,_0x14dcba);const _0x4a5a4f=_0x4e974c[_0x2de03d(0x4a9)];_0x56026f[_0x2de03d(0x573)][_0x2de03d(0x798)](_0x4a5a4f);}else{const _0x247390=new PIXI[(_0x2de03d(0x151))]();_0x247390[_0x2de03d(0x5e0)](0x800,0x800),VisuMZ[_0x2de03d(0x85a)][_0x2de03d(0x914)]['QoL']['PixelateImageRendering']&&(_0x247390[_0x2de03d(0x88e)]=PIXI[_0x2de03d(0x689)][_0x2de03d(0x6fe)]),this['_internalTextures'][_0x2de03d(0x163)](_0x247390);}}},WindowLayer[_0x283c20(0x44e)][_0x283c20(0x72b)]=function(){const _0x41a39a=_0x283c20;if(SceneManager&&SceneManager[_0x41a39a(0x573)])return SceneManager[_0x41a39a(0x573)][_0x41a39a(0x268)]();else{if(_0x41a39a(0x73d)!==_0x41a39a(0x907))return!![];else{if(typeof _0x38362e===_0x41a39a(0x112))_0x1eb8d1[_0x41a39a(0x6cc)]['quit']();}}},VisuMZ['CoreEngine'][_0x283c20(0x63c)]=WindowLayer[_0x283c20(0x44e)][_0x283c20(0x6b9)],WindowLayer['prototype'][_0x283c20(0x6b9)]=function render(_0x3093d1){const _0x11b8a2=_0x283c20;this[_0x11b8a2(0x72b)]()?VisuMZ[_0x11b8a2(0x85a)][_0x11b8a2(0x63c)][_0x11b8a2(0x5d8)](this,_0x3093d1):this[_0x11b8a2(0x4d6)](_0x3093d1);},WindowLayer[_0x283c20(0x44e)][_0x283c20(0x4d6)]=function render(_0x49e353){const _0xb0ca08=_0x283c20;if(!this[_0xb0ca08(0x6d8)])return;const _0x4c261e=new PIXI[(_0xb0ca08(0x681))](),_0x31e654=_0x49e353['gl'],_0x4d8c2d=this[_0xb0ca08(0x254)][_0xb0ca08(0x886)]();_0x49e353[_0xb0ca08(0x3cd)][_0xb0ca08(0x525)](),_0x4c261e[_0xb0ca08(0x442)]=this[_0xb0ca08(0x442)],_0x49e353['batch'][_0xb0ca08(0x394)](),_0x31e654[_0xb0ca08(0x46a)](_0x31e654['STENCIL_TEST']);while(_0x4d8c2d[_0xb0ca08(0x6a1)]>0x0){const _0x112f01=_0x4d8c2d[_0xb0ca08(0x8f2)]();_0x112f01[_0xb0ca08(0x454)]&&_0x112f01[_0xb0ca08(0x6d8)]&&_0x112f01[_0xb0ca08(0x450)]>0x0&&(_0x31e654[_0xb0ca08(0x444)](_0x31e654['EQUAL'],0x0,~0x0),_0x31e654['stencilOp'](_0x31e654['KEEP'],_0x31e654[_0xb0ca08(0x69d)],_0x31e654[_0xb0ca08(0x69d)]),_0x112f01[_0xb0ca08(0x6b9)](_0x49e353),_0x49e353[_0xb0ca08(0x927)][_0xb0ca08(0x394)](),_0x4c261e[_0xb0ca08(0x5e1)](),_0x31e654[_0xb0ca08(0x444)](_0x31e654[_0xb0ca08(0x8a1)],0x1,~0x0),_0x31e654[_0xb0ca08(0x62d)](_0x31e654[_0xb0ca08(0x194)],_0x31e654[_0xb0ca08(0x194)],_0x31e654[_0xb0ca08(0x194)]),_0x31e654[_0xb0ca08(0x1dd)](_0x31e654['ZERO'],_0x31e654[_0xb0ca08(0x38e)]),_0x4c261e[_0xb0ca08(0x6b9)](_0x49e353),_0x49e353[_0xb0ca08(0x927)][_0xb0ca08(0x394)](),_0x31e654['blendFunc'](_0x31e654[_0xb0ca08(0x38e)],_0x31e654[_0xb0ca08(0x359)]));}_0x31e654['disable'](_0x31e654['STENCIL_TEST']),_0x31e654['clear'](_0x31e654[_0xb0ca08(0x5df)]),_0x31e654[_0xb0ca08(0x850)](0x0),_0x49e353['batch']['flush']();for(const _0x57150c of this['children']){_0xb0ca08(0x811)!==_0xb0ca08(0xff)?!_0x57150c[_0xb0ca08(0x454)]&&_0x57150c[_0xb0ca08(0x6d8)]&&_0x57150c['render'](_0x49e353):(_0x33d310+=_0x24d26e,_0x153b7a+=_0x5d7570,_0x139a07+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0xb0ca08(0x520)](_0x394d72['id'],_0x2b9077['name']),_0x2f8316+=_0x371489,_0x414f07+=_0x174fb2,_0x3f1da9+=_0x52af77,_0x11b96c+=_0xb0ca08(0x15a)[_0xb0ca08(0x520)](_0x39a852['id'],_0x3b6c16[_0xb0ca08(0x3f0)]),_0x55ef7e+=_0x268f2e);}_0x49e353[_0xb0ca08(0x927)][_0xb0ca08(0x394)]();},DataManager[_0x283c20(0x305)]=function(_0x22ecab){return this['isItem'](_0x22ecab)&&_0x22ecab['itypeId']===0x2;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x542)]=DataManager['setupNewGame'],DataManager[_0x283c20(0x11e)]=function(){const _0x7c5537=_0x283c20;VisuMZ[_0x7c5537(0x85a)]['DataManager_setupNewGame']['call'](this),this[_0x7c5537(0x75f)](),this[_0x7c5537(0x301)]();},DataManager[_0x283c20(0x75f)]=function(){const _0x473a75=_0x283c20;if($gameTemp[_0x473a75(0x8bc)]()){if(_0x473a75(0x812)!=='FmSGG')try{_0x5483e5[_0x473a75(0x85a)][_0x473a75(0x2bf)][_0x473a75(0x5d8)](this,_0xb071c7);}catch(_0x19647e){if(_0x2bbcff[_0x473a75(0x8bc)]())_0x380ccc['log'](_0x19647e);}else{const _0x3533b3=VisuMZ['CoreEngine'][_0x473a75(0x914)][_0x473a75(0x5be)][_0x473a75(0x328)];if(_0x3533b3>0x0)$gameTemp['reserveCommonEvent'](_0x3533b3);}}},DataManager[_0x283c20(0x301)]=function(){const _0x83ee6f=_0x283c20,_0x44be7e=VisuMZ[_0x83ee6f(0x85a)]['Settings']['QoL'][_0x83ee6f(0x7f8)]||0x0;if(_0x44be7e>0x0)$gameTemp[_0x83ee6f(0x290)](_0x44be7e);},DataManager[_0x283c20(0x389)]=function(_0x586208){const _0x9297a4=_0x283c20,_0x2ec1da=$dataTroops[_0x586208];if(!_0x2ec1da)return'';let _0x363540='';_0x363540+=_0x2ec1da[_0x9297a4(0x3f0)];for(const _0x2a2b1c of _0x2ec1da[_0x9297a4(0x7a1)]){if(_0x9297a4(0x8a7)!==_0x9297a4(0x752))for(const _0x250936 of _0x2a2b1c[_0x9297a4(0x3fe)]){if(_0x9297a4(0x2b2)!==_0x9297a4(0x2b2))return _0x64d3b[_0x9297a4(0x85a)][_0x9297a4(0x481)][_0x5553e9];else[0x6c,0x198][_0x9297a4(0x59d)](_0x250936['code'])&&(_0x363540+='\x0a',_0x363540+=_0x250936[_0x9297a4(0x263)][0x0]);}else this[_0x9297a4(0x2fd)][_0x9297a4(0x22a)](_0x2c8ef0[_0x9297a4(0x631)][_0x9297a4(0x241)]);}return _0x363540;};(VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['QoL'][_0x283c20(0x8d1)]??!![])&&($scene=null,VisuMZ[_0x283c20(0x85a)]['Scene_Base_create']=Scene_Base[_0x283c20(0x44e)][_0x283c20(0x338)],Scene_Base[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x452ef3=_0x283c20;VisuMZ[_0x452ef3(0x85a)][_0x452ef3(0x653)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x283c20(0x85a)][_0x283c20(0x3ca)]=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x422)],Scene_Map['prototype']['createSpriteset']=function(){const _0x4c126f=_0x283c20;VisuMZ[_0x4c126f(0x85a)]['Scene_Map_createSpriteset'][_0x4c126f(0x5d8)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x18d)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x422)]=function(){const _0x455273=_0x283c20;VisuMZ[_0x455273(0x85a)][_0x455273(0x18d)][_0x455273(0x5d8)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x1a5)]=Scene_Base[_0x283c20(0x44e)]['terminate'],Scene_Base[_0x283c20(0x44e)]['terminate']=function(){const _0x154b27=_0x283c20;VisuMZ[_0x154b27(0x85a)][_0x154b27(0x1a5)][_0x154b27(0x5d8)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x283c20(0x85a)][_0x283c20(0x868)]=BattleManager['update'],BattleManager[_0x283c20(0x118)]=function(_0x145ea6){const _0x4e3593=_0x283c20;VisuMZ[_0x4e3593(0x85a)][_0x4e3593(0x868)][_0x4e3593(0x5d8)](this,_0x145ea6),$subject=this[_0x4e3593(0x27a)],$targets=this[_0x4e3593(0x3fb)],$target=this[_0x4e3593(0x665)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x283c20(0x85a)][_0x283c20(0x114)]=Game_Event[_0x283c20(0x44e)][_0x283c20(0x18c)],Game_Event[_0x283c20(0x44e)][_0x283c20(0x18c)]=function(){const _0x356402=_0x283c20;VisuMZ['CoreEngine']['Game_Event_start'][_0x356402(0x5d8)](this),$event=this;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x759)]=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x118)],Scene_Map['prototype'][_0x283c20(0x118)]=function(){const _0x3b2ffc=_0x283c20;VisuMZ['CoreEngine'][_0x3b2ffc(0x759)][_0x3b2ffc(0x5d8)](this),$gameMap[_0x3b2ffc(0x53f)]();},Game_Map[_0x283c20(0x44e)][_0x283c20(0x53f)]=function(){const _0x4b4a4e=_0x283c20;!this[_0x4b4a4e(0x320)]()&&$event!==null&&(_0x4b4a4e(0x3f2)!==_0x4b4a4e(0x533)?$event=null:this[_0x4b4a4e(0x901)](0x0));},$commonEvent=function(_0xf681fa){const _0x11f9a0=_0x283c20;if($gameTemp)$gameTemp[_0x11f9a0(0x290)](_0xf681fa);},$onceParallel=function(_0x4707e3){const _0x4b2654=_0x283c20;if(SceneManager[_0x4b2654(0x4e2)]())$scene[_0x4b2654(0x798)](_0x4707e3);else{if(SceneManager[_0x4b2654(0x24e)]()){if('BWTfs'!==_0x4b2654(0x8b7)){if(_0x506398)_0x35a252[_0x4b2654(0x714)](_0x45602d);}else{if(Imported['VisuMZ_1_BattleCore'])$scene[_0x4b2654(0x798)](_0x4707e3);else $gameTemp&&$gameTemp[_0x4b2654(0x8bc)]()&&alert(_0x4b2654(0x269));}}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x4b2654(0x28d));}});;StorageManager['jsonToZip']=function(_0x2832e4){return new Promise((_0x64baeb,_0x3067e5)=>{const _0xfc494b=_0xfbd7;try{const _0x2463f4=pako[_0xfc494b(0x4de)](_0x2832e4,{'to':_0xfc494b(0x1e5),'level':0x1});if(_0x2463f4['length']>=0xc350){}_0x64baeb(_0x2463f4);}catch(_0x1800e7){if('YDrnk'==='YDrnk')_0x3067e5(_0x1800e7);else{if(!this[_0xfc494b(0x2e7)])return![];return _0x4fa6e4[_0xfc494b(0x85a)]['Settings'][_0xfc494b(0x1f7)][_0xfc494b(0x13c)];}}});},TextManager[_0x283c20(0x63a)]=['','','',_0x283c20(0x3b6),'','',_0x283c20(0x8fe),'',_0x283c20(0x900),_0x283c20(0x3d5),'','',_0x283c20(0x58f),_0x283c20(0x41e),'ENTER_SPECIAL','',_0x283c20(0x80d),'CTRL',_0x283c20(0x25f),_0x283c20(0x902),_0x283c20(0x2cb),_0x283c20(0x50f),_0x283c20(0x852),_0x283c20(0x898),_0x283c20(0x88f),'HANJA','','ESC',_0x283c20(0x6d7),_0x283c20(0x375),'ACCEPT',_0x283c20(0x936),_0x283c20(0x887),_0x283c20(0x40c),'PGDN',_0x283c20(0x7a8),_0x283c20(0x46c),_0x283c20(0x1e6),'UP',_0x283c20(0x295),_0x283c20(0x72d),_0x283c20(0x8d0),_0x283c20(0x429),'EXECUTE','PRINTSCREEN',_0x283c20(0x4dc),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x283c20(0x930),_0x283c20(0x4b5),_0x283c20(0x84e),_0x283c20(0x8ee),'GREATER_THAN','QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x283c20(0x4a1),'',_0x283c20(0x296),'',_0x283c20(0x282),'NUMPAD0','NUMPAD1','NUMPAD2',_0x283c20(0x605),_0x283c20(0x17e),'NUMPAD5',_0x283c20(0x386),_0x283c20(0x21d),'NUMPAD8',_0x283c20(0x8c1),_0x283c20(0x22b),_0x283c20(0x40b),_0x283c20(0x701),_0x283c20(0x524),_0x283c20(0x6fc),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0x283c20(0x364),'F13',_0x283c20(0x693),'F15','F16','F17',_0x283c20(0x379),'F19',_0x283c20(0x288),_0x283c20(0x368),_0x283c20(0x344),_0x283c20(0x2a0),'F24','','','','','','','','',_0x283c20(0x788),_0x283c20(0x6ba),_0x283c20(0x6c0),_0x283c20(0x762),_0x283c20(0x7c3),_0x283c20(0x856),_0x283c20(0x1fe),'','','','','','','','','',_0x283c20(0x30a),'EXCLAMATION',_0x283c20(0x393),_0x283c20(0x493),_0x283c20(0x2da),_0x283c20(0x383),'AMPERSAND',_0x283c20(0x572),_0x283c20(0x60e),_0x283c20(0x1d5),'ASTERISK',_0x283c20(0x670),_0x283c20(0x6f0),_0x283c20(0x76a),'OPEN_CURLY_BRACKET',_0x283c20(0x741),_0x283c20(0x332),'','','','',_0x283c20(0x634),_0x283c20(0x161),_0x283c20(0x133),'','',_0x283c20(0x4b5),_0x283c20(0x8ee),'COMMA','MINUS',_0x283c20(0x60a),_0x283c20(0x390),_0x283c20(0x6b8),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x283c20(0x1d7),'BACK_SLASH',_0x283c20(0x8c0),_0x283c20(0x7a4),'',_0x283c20(0x2ec),_0x283c20(0x33c),'',_0x283c20(0x2a2),_0x283c20(0x377),'',_0x283c20(0x7c7),'','','WIN_OEM_RESET',_0x283c20(0x3d2),_0x283c20(0x1b9),_0x283c20(0x432),_0x283c20(0x3e6),_0x283c20(0x698),'WIN_OEM_CUSEL',_0x283c20(0x931),_0x283c20(0x4d2),_0x283c20(0x35f),_0x283c20(0x146),_0x283c20(0x2e2),_0x283c20(0x796),'ATTN','CRSEL',_0x283c20(0x251),_0x283c20(0x903),_0x283c20(0x878),_0x283c20(0x293),'',_0x283c20(0x91d),_0x283c20(0x88c),''],TextManager[_0x283c20(0x8eb)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['ButtonAssist'][_0x283c20(0x173)],TextManager[_0x283c20(0x25d)]=VisuMZ['CoreEngine'][_0x283c20(0x914)][_0x283c20(0x52f)][_0x283c20(0x892)],TextManager['buttonAssistSwitch']=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x52f)][_0x283c20(0x38a)],VisuMZ[_0x283c20(0x85a)]['TextManager_param']=TextManager[_0x283c20(0x508)],TextManager[_0x283c20(0x508)]=function(_0x3f29bc){const _0x44c4b8=_0x283c20;if(typeof _0x3f29bc==='number')return _0x44c4b8(0x7ca)!==_0x44c4b8(0x7ca)?_0x3a2f5a:VisuMZ[_0x44c4b8(0x85a)][_0x44c4b8(0x42e)][_0x44c4b8(0x5d8)](this,_0x3f29bc);else{if(_0x44c4b8(0x486)===_0x44c4b8(0x8bb))_0xb2e6d+=_0x44c4b8(0x536)[_0x44c4b8(0x520)](_0x3f625e[_0x44c4b8(0x263)][0x0]);else return this['paramName'](_0x3f29bc);}},TextManager[_0x283c20(0x27d)]=function(_0x16c84a){const _0x36067b=_0x283c20;_0x16c84a=String(_0x16c84a||'')[_0x36067b(0x287)]();const _0x34cb47=VisuMZ[_0x36067b(0x85a)][_0x36067b(0x914)][_0x36067b(0x7ee)];if(_0x16c84a===_0x36067b(0x47a))return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x0];if(_0x16c84a===_0x36067b(0x730))return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x1];if(_0x16c84a==='ATK')return $dataSystem[_0x36067b(0x2ae)]['params'][0x2];if(_0x16c84a==='DEF')return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x3];if(_0x16c84a===_0x36067b(0x761))return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x4];if(_0x16c84a===_0x36067b(0x4d1))return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x5];if(_0x16c84a==='AGI')return $dataSystem[_0x36067b(0x2ae)]['params'][0x6];if(_0x16c84a===_0x36067b(0x612))return $dataSystem[_0x36067b(0x2ae)][_0x36067b(0x1c7)][0x7];if(_0x16c84a===_0x36067b(0x354))return _0x34cb47[_0x36067b(0x2f4)];if(_0x16c84a===_0x36067b(0x437))return _0x34cb47[_0x36067b(0x87b)];if(_0x16c84a===_0x36067b(0x860))return _0x34cb47['XParamVocab2'];if(_0x16c84a==='CEV')return _0x34cb47[_0x36067b(0x642)];if(_0x16c84a===_0x36067b(0x7e0))return _0x34cb47['XParamVocab4'];if(_0x16c84a===_0x36067b(0x899))return _0x34cb47[_0x36067b(0x224)];if(_0x16c84a===_0x36067b(0x134))return _0x34cb47['XParamVocab6'];if(_0x16c84a===_0x36067b(0x830))return _0x34cb47[_0x36067b(0x8f1)];if(_0x16c84a===_0x36067b(0x89a))return _0x34cb47[_0x36067b(0x28f)];if(_0x16c84a===_0x36067b(0x6ff))return _0x34cb47['XParamVocab9'];if(_0x16c84a===_0x36067b(0x41a))return _0x34cb47[_0x36067b(0x719)];if(_0x16c84a===_0x36067b(0x76e))return _0x34cb47[_0x36067b(0x3c4)];if(_0x16c84a===_0x36067b(0x905))return _0x34cb47[_0x36067b(0x427)];if(_0x16c84a===_0x36067b(0x451))return _0x34cb47[_0x36067b(0x8b2)];if(_0x16c84a==='MCR')return _0x34cb47[_0x36067b(0x74a)];if(_0x16c84a===_0x36067b(0x7c2))return _0x34cb47[_0x36067b(0x650)];if(_0x16c84a===_0x36067b(0x872))return _0x34cb47[_0x36067b(0x457)];if(_0x16c84a==='MDR')return _0x34cb47[_0x36067b(0x643)];if(_0x16c84a===_0x36067b(0x430))return _0x34cb47['SParamVocab8'];if(_0x16c84a===_0x36067b(0x273))return _0x34cb47['SParamVocab9'];if(VisuMZ[_0x36067b(0x85a)]['CustomParamNames'][_0x16c84a]){if(_0x36067b(0x124)!=='jtdUg')return VisuMZ[_0x36067b(0x85a)]['CustomParamNames'][_0x16c84a];else _0x5cb04b[_0x36067b(0x85a)]['Bitmap_resize'][_0x36067b(0x5d8)](this,_0x534e5a,_0x50e295),this[_0x36067b(0x3ac)]();}return'';},TextManager[_0x283c20(0x797)]=function(_0x10f696){const _0x31b3b7=_0x283c20;if(_0x10f696===_0x31b3b7(0x8aa))_0x10f696='escape';let _0x49abc1=[];for(let _0x3add4d in Input[_0x31b3b7(0x4f8)]){_0x3add4d=Number(_0x3add4d);if(_0x3add4d>=0x60&&_0x3add4d<=0x69)continue;if([0x12,0x20][_0x31b3b7(0x59d)](_0x3add4d))continue;_0x10f696===Input[_0x31b3b7(0x4f8)][_0x3add4d]&&_0x49abc1[_0x31b3b7(0x163)](_0x3add4d);}for(let _0x1a8c6c=0x0;_0x1a8c6c<_0x49abc1[_0x31b3b7(0x6a1)];_0x1a8c6c++){_0x31b3b7(0x14c)===_0x31b3b7(0x5cb)?this['switchModes'](_0x31b3b7(0x7f5)):_0x49abc1[_0x1a8c6c]=TextManager[_0x31b3b7(0x63a)][_0x49abc1[_0x1a8c6c]];}return this[_0x31b3b7(0x89e)](_0x49abc1);},TextManager[_0x283c20(0x89e)]=function(_0x52aeda){const _0x16a9aa=_0x283c20,_0x18bc78=VisuMZ[_0x16a9aa(0x85a)]['Settings'][_0x16a9aa(0x52f)],_0x140d1d=_0x18bc78[_0x16a9aa(0x649)],_0x62fb69=_0x52aeda[_0x16a9aa(0x132)](),_0x47e8af=_0x16a9aa(0x71d)['format'](_0x62fb69);return _0x18bc78[_0x47e8af]?_0x18bc78[_0x47e8af]:_0x140d1d[_0x16a9aa(0x520)](_0x62fb69);},TextManager[_0x283c20(0x928)]=function(_0x509b16,_0x1e025c){const _0x4d2115=_0x283c20,_0x349f9a=VisuMZ[_0x4d2115(0x85a)][_0x4d2115(0x914)][_0x4d2115(0x52f)],_0x3ff14b=_0x349f9a[_0x4d2115(0x6da)],_0x2baf9e=this[_0x4d2115(0x797)](_0x509b16),_0xc3d8d3=this['getInputButtonString'](_0x1e025c);return _0x3ff14b[_0x4d2115(0x520)](_0x2baf9e,_0xc3d8d3);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x80e)]=ColorManager[_0x283c20(0x1cb)],ColorManager['loadWindowskin']=function(){const _0x4a8aef=_0x283c20;VisuMZ['CoreEngine'][_0x4a8aef(0x80e)][_0x4a8aef(0x5d8)](this),this[_0x4a8aef(0x3f7)]=this[_0x4a8aef(0x3f7)]||{};},ColorManager[_0x283c20(0x21e)]=function(_0x48f507,_0x106abb){const _0x1ef67a=_0x283c20;return _0x106abb=String(_0x106abb),this[_0x1ef67a(0x3f7)]=this[_0x1ef67a(0x3f7)]||{},_0x106abb['match'](/#(.*)/i)?_0x1ef67a(0x298)!==_0x1ef67a(0x6fb)?this[_0x1ef67a(0x3f7)][_0x48f507]=_0x1ef67a(0x800)[_0x1ef67a(0x520)](String(RegExp['$1'])):_0x1349da[_0x1ef67a(0x85a)][_0x1ef67a(0x2bf)][_0x1ef67a(0x5d8)](this,_0x290b6c):this['_colorCache'][_0x48f507]=this['textColor'](Number(_0x106abb)),this[_0x1ef67a(0x3f7)][_0x48f507];},ColorManager['getColor']=function(_0x45f342){const _0x335048=_0x283c20;return _0x45f342=String(_0x45f342),_0x45f342['match'](/#(.*)/i)?_0x335048(0x800)[_0x335048(0x520)](String(RegExp['$1'])):this[_0x335048(0x923)](Number(_0x45f342));},ColorManager[_0x283c20(0x911)]=function(){this['_colorCache']={};},ColorManager[_0x283c20(0x2a9)]=function(){const _0x5773a0=_0x283c20,_0x1608c3=_0x5773a0(0x18a);this['_colorCache']=this['_colorCache']||{};if(this[_0x5773a0(0x3f7)][_0x1608c3])return this['_colorCache'][_0x1608c3];const _0x489d68=VisuMZ[_0x5773a0(0x85a)][_0x5773a0(0x914)]['Color'][_0x5773a0(0x809)];return this[_0x5773a0(0x21e)](_0x1608c3,_0x489d68);},ColorManager[_0x283c20(0x89c)]=function(){const _0x18e92d=_0x283c20,_0x101887=_0x18e92d(0x229);this['_colorCache']=this[_0x18e92d(0x3f7)]||{};if(this['_colorCache'][_0x101887])return this[_0x18e92d(0x3f7)][_0x101887];const _0x9d69a1=VisuMZ[_0x18e92d(0x85a)][_0x18e92d(0x914)][_0x18e92d(0x113)]['ColorSystem'];return this[_0x18e92d(0x21e)](_0x101887,_0x9d69a1);},ColorManager['crisisColor']=function(){const _0x3f5b9f=_0x283c20,_0x48e165=_0x3f5b9f(0x4a0);this[_0x3f5b9f(0x3f7)]=this[_0x3f5b9f(0x3f7)]||{};if(this['_colorCache'][_0x48e165])return this[_0x3f5b9f(0x3f7)][_0x48e165];const _0x120d49=VisuMZ[_0x3f5b9f(0x85a)][_0x3f5b9f(0x914)][_0x3f5b9f(0x113)][_0x3f5b9f(0x557)];return this[_0x3f5b9f(0x21e)](_0x48e165,_0x120d49);},ColorManager[_0x283c20(0x39a)]=function(){const _0x12aab0=_0x283c20,_0x39a9a3=_0x12aab0(0x6e8);this['_colorCache']=this[_0x12aab0(0x3f7)]||{};if(this[_0x12aab0(0x3f7)][_0x39a9a3])return this[_0x12aab0(0x3f7)][_0x39a9a3];const _0x19176a=VisuMZ[_0x12aab0(0x85a)][_0x12aab0(0x914)][_0x12aab0(0x113)][_0x12aab0(0x71a)];return this[_0x12aab0(0x21e)](_0x39a9a3,_0x19176a);},ColorManager[_0x283c20(0x7e5)]=function(){const _0x75f642=_0x283c20,_0x51bbde='_stored_gaugeBackColor';this[_0x75f642(0x3f7)]=this['_colorCache']||{};if(this[_0x75f642(0x3f7)][_0x51bbde])return this[_0x75f642(0x3f7)][_0x51bbde];const _0x5da3f9=VisuMZ[_0x75f642(0x85a)][_0x75f642(0x914)]['Color'][_0x75f642(0x327)];return this[_0x75f642(0x21e)](_0x51bbde,_0x5da3f9);},ColorManager[_0x283c20(0x4df)]=function(){const _0x5d8fd4=_0x283c20,_0x19bfb8='_stored_hpGaugeColor1';this[_0x5d8fd4(0x3f7)]=this[_0x5d8fd4(0x3f7)]||{};if(this[_0x5d8fd4(0x3f7)][_0x19bfb8])return this[_0x5d8fd4(0x3f7)][_0x19bfb8];const _0x27bd6b=VisuMZ['CoreEngine'][_0x5d8fd4(0x914)][_0x5d8fd4(0x113)][_0x5d8fd4(0x829)];return this[_0x5d8fd4(0x21e)](_0x19bfb8,_0x27bd6b);},ColorManager[_0x283c20(0x1e8)]=function(){const _0x38024c=_0x283c20,_0x28dd24=_0x38024c(0x4dd);this[_0x38024c(0x3f7)]=this[_0x38024c(0x3f7)]||{};if(this[_0x38024c(0x3f7)][_0x28dd24])return this[_0x38024c(0x3f7)][_0x28dd24];const _0x5389fe=VisuMZ[_0x38024c(0x85a)][_0x38024c(0x914)][_0x38024c(0x113)][_0x38024c(0x7be)];return this[_0x38024c(0x21e)](_0x28dd24,_0x5389fe);},ColorManager[_0x283c20(0x7d0)]=function(){const _0x3ab30b=_0x283c20,_0x43c9c0=_0x3ab30b(0x8e1);this['_colorCache']=this[_0x3ab30b(0x3f7)]||{};if(this[_0x3ab30b(0x3f7)][_0x43c9c0])return this[_0x3ab30b(0x3f7)][_0x43c9c0];const _0x5877ee=VisuMZ[_0x3ab30b(0x85a)]['Settings']['Color'][_0x3ab30b(0x190)];return this['getColorDataFromPluginParameters'](_0x43c9c0,_0x5877ee);},ColorManager[_0x283c20(0x361)]=function(){const _0x3f8e58=_0x283c20,_0x4d0d73='_stored_mpGaugeColor2';this['_colorCache']=this[_0x3f8e58(0x3f7)]||{};if(this[_0x3f8e58(0x3f7)][_0x4d0d73])return this['_colorCache'][_0x4d0d73];const _0x233740=VisuMZ[_0x3f8e58(0x85a)][_0x3f8e58(0x914)]['Color'][_0x3f8e58(0x4b8)];return this[_0x3f8e58(0x21e)](_0x4d0d73,_0x233740);},ColorManager['mpCostColor']=function(){const _0x9de5e3=_0x283c20,_0x3f90fb='_stored_mpCostColor';this[_0x9de5e3(0x3f7)]=this['_colorCache']||{};if(this[_0x9de5e3(0x3f7)][_0x3f90fb])return this['_colorCache'][_0x3f90fb];const _0x37ec15=VisuMZ['CoreEngine'][_0x9de5e3(0x914)][_0x9de5e3(0x113)][_0x9de5e3(0x3dc)];return this[_0x9de5e3(0x21e)](_0x3f90fb,_0x37ec15);},ColorManager[_0x283c20(0x3bf)]=function(){const _0x22c62d=_0x283c20,_0x523f40=_0x22c62d(0x810);this[_0x22c62d(0x3f7)]=this[_0x22c62d(0x3f7)]||{};if(this[_0x22c62d(0x3f7)][_0x523f40])return this['_colorCache'][_0x523f40];const _0x4899ad=VisuMZ['CoreEngine'][_0x22c62d(0x914)][_0x22c62d(0x113)][_0x22c62d(0x20a)];return this['getColorDataFromPluginParameters'](_0x523f40,_0x4899ad);},ColorManager[_0x283c20(0x629)]=function(){const _0x29a1ae=_0x283c20,_0x357645=_0x29a1ae(0x838);this[_0x29a1ae(0x3f7)]=this[_0x29a1ae(0x3f7)]||{};if(this[_0x29a1ae(0x3f7)][_0x357645])return this[_0x29a1ae(0x3f7)][_0x357645];const _0x1dce1c=VisuMZ[_0x29a1ae(0x85a)][_0x29a1ae(0x914)][_0x29a1ae(0x113)][_0x29a1ae(0x6d9)];return this[_0x29a1ae(0x21e)](_0x357645,_0x1dce1c);},ColorManager[_0x283c20(0x3bb)]=function(){const _0x3afc0d=_0x283c20,_0x3ca559=_0x3afc0d(0x23a);this['_colorCache']=this[_0x3afc0d(0x3f7)]||{};if(this[_0x3afc0d(0x3f7)][_0x3ca559])return this[_0x3afc0d(0x3f7)][_0x3ca559];const _0x131fa2=VisuMZ[_0x3afc0d(0x85a)][_0x3afc0d(0x914)][_0x3afc0d(0x113)][_0x3afc0d(0x7d2)];return this[_0x3afc0d(0x21e)](_0x3ca559,_0x131fa2);},ColorManager['ctGaugeColor2']=function(){const _0x3be293=_0x283c20,_0x53d384=_0x3be293(0x219);this[_0x3be293(0x3f7)]=this['_colorCache']||{};if(this[_0x3be293(0x3f7)][_0x53d384])return this['_colorCache'][_0x53d384];const _0x47353f=VisuMZ[_0x3be293(0x85a)]['Settings'][_0x3be293(0x113)]['ColorCTGauge2'];return this[_0x3be293(0x21e)](_0x53d384,_0x47353f);},ColorManager['tpGaugeColor1']=function(){const _0x51d9ef=_0x283c20,_0x3ecba9=_0x51d9ef(0x6f1);this[_0x51d9ef(0x3f7)]=this[_0x51d9ef(0x3f7)]||{};if(this[_0x51d9ef(0x3f7)][_0x3ecba9])return this[_0x51d9ef(0x3f7)][_0x3ecba9];const _0x58f69b=VisuMZ[_0x51d9ef(0x85a)][_0x51d9ef(0x914)]['Color']['ColorTPGauge1'];return this[_0x51d9ef(0x21e)](_0x3ecba9,_0x58f69b);},ColorManager[_0x283c20(0x5ce)]=function(){const _0x251fec=_0x283c20,_0x14fb37='_stored_tpGaugeColor2';this[_0x251fec(0x3f7)]=this[_0x251fec(0x3f7)]||{};if(this[_0x251fec(0x3f7)][_0x14fb37])return this['_colorCache'][_0x14fb37];const _0x3ec106=VisuMZ['CoreEngine'][_0x251fec(0x914)][_0x251fec(0x113)][_0x251fec(0x7a2)];return this[_0x251fec(0x21e)](_0x14fb37,_0x3ec106);},ColorManager['tpCostColor']=function(){const _0x58ddf2=_0x283c20,_0x58f6ad=_0x58ddf2(0x2dd);this['_colorCache']=this['_colorCache']||{};if(this[_0x58ddf2(0x3f7)][_0x58f6ad])return this[_0x58ddf2(0x3f7)][_0x58f6ad];const _0x575f5c=VisuMZ[_0x58ddf2(0x85a)]['Settings']['Color'][_0x58ddf2(0x1ca)];return this[_0x58ddf2(0x21e)](_0x58f6ad,_0x575f5c);},ColorManager[_0x283c20(0x2cc)]=function(){const _0x1153c1=_0x283c20,_0x540473=_0x1153c1(0x2bd);this[_0x1153c1(0x3f7)]=this[_0x1153c1(0x3f7)]||{};if(this[_0x1153c1(0x3f7)][_0x540473])return this[_0x1153c1(0x3f7)][_0x540473];const _0x4d3dea=VisuMZ[_0x1153c1(0x85a)][_0x1153c1(0x914)][_0x1153c1(0x113)][_0x1153c1(0x1ca)];return this['getColorDataFromPluginParameters'](_0x540473,_0x4d3dea);},ColorManager[_0x283c20(0x61f)]=function(){const _0x2f1e57=_0x283c20,_0x1e4c49=_0x2f1e57(0x137);this[_0x2f1e57(0x3f7)]=this[_0x2f1e57(0x3f7)]||{};if(this[_0x2f1e57(0x3f7)][_0x1e4c49])return this['_colorCache'][_0x1e4c49];const _0x37dff0=VisuMZ[_0x2f1e57(0x85a)]['Settings'][_0x2f1e57(0x113)]['ColorExpGauge1'];return this['getColorDataFromPluginParameters'](_0x1e4c49,_0x37dff0);},ColorManager[_0x283c20(0x38c)]=function(){const _0x3dbd9d=_0x283c20,_0x11f658='_stored_expGaugeColor2';this[_0x3dbd9d(0x3f7)]=this[_0x3dbd9d(0x3f7)]||{};if(this['_colorCache'][_0x11f658])return this[_0x3dbd9d(0x3f7)][_0x11f658];const _0x2a51fe=VisuMZ[_0x3dbd9d(0x85a)][_0x3dbd9d(0x914)][_0x3dbd9d(0x113)][_0x3dbd9d(0x1d0)];return this[_0x3dbd9d(0x21e)](_0x11f658,_0x2a51fe);},ColorManager[_0x283c20(0x8d3)]=function(){const _0x4f335a=_0x283c20,_0x3352e4=_0x4f335a(0x540);this[_0x4f335a(0x3f7)]=this['_colorCache']||{};if(this[_0x4f335a(0x3f7)][_0x3352e4])return this[_0x4f335a(0x3f7)][_0x3352e4];const _0xf2fb0d=VisuMZ[_0x4f335a(0x85a)][_0x4f335a(0x914)][_0x4f335a(0x113)]['ColorMaxLvGauge1'];return this[_0x4f335a(0x21e)](_0x3352e4,_0xf2fb0d);},ColorManager[_0x283c20(0x25e)]=function(){const _0x2a30ff=_0x283c20,_0x40352a=_0x2a30ff(0x53b);this[_0x2a30ff(0x3f7)]=this[_0x2a30ff(0x3f7)]||{};if(this['_colorCache'][_0x40352a])return this['_colorCache'][_0x40352a];const _0x11e265=VisuMZ[_0x2a30ff(0x85a)]['Settings'][_0x2a30ff(0x113)][_0x2a30ff(0x532)];return this[_0x2a30ff(0x21e)](_0x40352a,_0x11e265);},ColorManager[_0x283c20(0x36e)]=function(_0x398ccf){const _0x5441f9=_0x283c20;return VisuMZ[_0x5441f9(0x85a)][_0x5441f9(0x914)]['Color'][_0x5441f9(0x343)][_0x5441f9(0x5d8)](this,_0x398ccf);},ColorManager[_0x283c20(0x206)]=function(_0xe5e076){const _0x448e62=_0x283c20;return VisuMZ['CoreEngine'][_0x448e62(0x914)]['Color'][_0x448e62(0x3b1)][_0x448e62(0x5d8)](this,_0xe5e076);},ColorManager[_0x283c20(0x2f0)]=function(_0x2985f5){const _0x2d656a=_0x283c20;return VisuMZ[_0x2d656a(0x85a)]['Settings']['Color']['ActorTPColor'][_0x2d656a(0x5d8)](this,_0x2985f5);},ColorManager[_0x283c20(0x854)]=function(_0x5a48b4){const _0x38f9d9=_0x283c20;return VisuMZ[_0x38f9d9(0x85a)][_0x38f9d9(0x914)][_0x38f9d9(0x113)][_0x38f9d9(0x356)]['call'](this,_0x5a48b4);},ColorManager['damageColor']=function(_0xdb06fa){const _0x31e374=_0x283c20;return VisuMZ[_0x31e374(0x85a)][_0x31e374(0x914)][_0x31e374(0x113)][_0x31e374(0x45a)]['call'](this,_0xdb06fa);},ColorManager[_0x283c20(0x55c)]=function(){const _0x1bbf91=_0x283c20;return VisuMZ[_0x1bbf91(0x85a)]['Settings']['Color'][_0x1bbf91(0x403)];},ColorManager[_0x283c20(0x915)]=function(){const _0x4163f1=_0x283c20;return VisuMZ[_0x4163f1(0x85a)][_0x4163f1(0x914)][_0x4163f1(0x113)][_0x4163f1(0x265)]||_0x4163f1(0x853);},ColorManager['outlineColorGauge']=function(){const _0x3f458a=_0x283c20;return VisuMZ[_0x3f458a(0x85a)][_0x3f458a(0x914)][_0x3f458a(0x113)][_0x3f458a(0x4b4)]||_0x3f458a(0x1b3);},ColorManager[_0x283c20(0x917)]=function(){const _0x5b0195=_0x283c20;return VisuMZ[_0x5b0195(0x85a)][_0x5b0195(0x914)][_0x5b0195(0x113)][_0x5b0195(0x567)];},ColorManager[_0x283c20(0x143)]=function(){const _0x456776=_0x283c20;return VisuMZ[_0x456776(0x85a)][_0x456776(0x914)]['Color'][_0x456776(0x813)];},ColorManager[_0x283c20(0x16c)]=function(){const _0x568765=_0x283c20;return VisuMZ[_0x568765(0x85a)]['Settings'][_0x568765(0x113)][_0x568765(0x5ef)];},ColorManager['itemBackColor2']=function(){const _0x48f845=_0x283c20;return VisuMZ['CoreEngine'][_0x48f845(0x914)][_0x48f845(0x113)][_0x48f845(0x77a)];},SceneManager['_storedStack']=[],SceneManager[_0x283c20(0x24e)]=function(){const _0x402898=_0x283c20;return this[_0x402898(0x573)]&&this[_0x402898(0x573)][_0x402898(0x7ff)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x3c85da=_0x283c20;return this[_0x3c85da(0x573)]&&this[_0x3c85da(0x573)][_0x3c85da(0x7ff)]===Scene_Map;},SceneManager[_0x283c20(0x894)]=function(){const _0x291bc4=_0x283c20;return this[_0x291bc4(0x573)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x1b1)]=SceneManager[_0x283c20(0x3a9)],SceneManager[_0x283c20(0x3a9)]=function(){const _0x221a9d=_0x283c20;VisuMZ['CoreEngine']['SceneManager_initialize'][_0x221a9d(0x5d8)](this),this[_0x221a9d(0x637)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x55f)]=SceneManager[_0x283c20(0x65c)],SceneManager['onKeyDown']=function(_0x247cea){const _0x35bbec=_0x283c20;if($gameTemp)this[_0x35bbec(0x773)](_0x247cea);VisuMZ[_0x35bbec(0x85a)]['SceneManager_onKeyDown'][_0x35bbec(0x5d8)](this,_0x247cea);},SceneManager[_0x283c20(0x773)]=function(_0x128f8b){const _0x2a324e=_0x283c20;if(!_0x128f8b['ctrlKey']&&!_0x128f8b[_0x2a324e(0x62f)])switch(_0x128f8b[_0x2a324e(0x487)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x2a324e(0x79c)]();break;case 0x76:if(Input[_0x2a324e(0x4ac)](_0x2a324e(0x8f2))||Input[_0x2a324e(0x4ac)](_0x2a324e(0x345)))return;this[_0x2a324e(0x7f1)]();break;}},SceneManager['playTestF6']=function(){const _0x160628=_0x283c20;if($gameTemp[_0x160628(0x8bc)]()&&VisuMZ[_0x160628(0x85a)][_0x160628(0x914)]['QoL'][_0x160628(0x22c)]){ConfigManager[_0x160628(0x5ff)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x160628(0x837)]=0x0,ConfigManager[_0x160628(0x56c)]=0x0,ConfigManager[_0x160628(0x5ff)]=0x0):(ConfigManager[_0x160628(0x75e)]=0x64,ConfigManager[_0x160628(0x837)]=0x64,ConfigManager[_0x160628(0x56c)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x160628(0x657)]();if(this[_0x160628(0x573)]['constructor']===Scene_Options){if(this['_scene'][_0x160628(0x105)])this[_0x160628(0x573)][_0x160628(0x105)][_0x160628(0x661)]();if(this[_0x160628(0x573)]['_listWindow'])this[_0x160628(0x573)][_0x160628(0x1b4)][_0x160628(0x661)]();}}},SceneManager[_0x283c20(0x7f1)]=function(){const _0x176a3f=_0x283c20;$gameTemp[_0x176a3f(0x8bc)]()&&VisuMZ[_0x176a3f(0x85a)][_0x176a3f(0x914)]['QoL'][_0x176a3f(0x347)]&&($gameTemp[_0x176a3f(0x5e2)]=!$gameTemp['_playTestFastMode']);},SceneManager['playTestCtrlT']=function(){const _0x4be3c4=_0x283c20;if(!$gameTemp[_0x4be3c4(0x8bc)]())return;if(!SceneManager[_0x4be3c4(0x24e)]())return;for(const _0x888b88 of $gameParty['members']()){if(!_0x888b88)continue;_0x888b88[_0x4be3c4(0x754)](_0x888b88[_0x4be3c4(0x12f)]());}},SceneManager[_0x283c20(0x637)]=function(){const _0x2cd4d7=_0x283c20;this[_0x2cd4d7(0x42f)]=![],this[_0x2cd4d7(0x7c8)]=!VisuMZ[_0x2cd4d7(0x85a)][_0x2cd4d7(0x914)]['UI']['ShowButtons'];},SceneManager[_0x283c20(0x89f)]=function(_0xc7ad3a){const _0x1e427f=_0x283c20;VisuMZ[_0x1e427f(0x85a)][_0x1e427f(0x914)]['UI'][_0x1e427f(0x534)]&&(_0x1e427f(0x2b5)!==_0x1e427f(0x57c)?this[_0x1e427f(0x42f)]=_0xc7ad3a:this[_0x1e427f(0x6c7)]=_0x596179[_0x1e427f(0x573)][_0x1e427f(0x6db)]()!==_0x1e427f(0x66a)?0x0:0x8);},SceneManager[_0x283c20(0x315)]=function(){const _0x103a63=_0x283c20;return this[_0x103a63(0x42f)];},SceneManager['areButtonsHidden']=function(){return this['_hideButtons'];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x595ca3=_0x283c20;return this[_0x595ca3(0x358)]()||this[_0x595ca3(0x315)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x57a)]=SceneManager[_0x283c20(0x8bf)],SceneManager[_0x283c20(0x8bf)]=function(){const _0xf9a644=_0x283c20;if(VisuMZ[_0xf9a644(0x85a)]['Settings']['QoL'][_0xf9a644(0x257)]){if(_0xf9a644(0x417)===_0xf9a644(0x417))return VisuMZ[_0xf9a644(0x85a)][_0xf9a644(0x57a)][_0xf9a644(0x5d8)](this);else _0x2aa89d[_0xf9a644(0x91c)]&&(this['_forcedBattleSys']=_0xf9a644(0x3af));}else return!![];},SceneManager[_0x283c20(0x890)]=function(_0x259a7e){const _0x43af34=_0x283c20;if(_0x259a7e instanceof Error){if(_0x43af34(0x806)==='NTViw')this[_0x43af34(0x33a)](_0x259a7e);else{this[_0x43af34(0x35a)](),this[_0x43af34(0x666)][_0x43af34(0x5e1)](),this[_0x43af34(0x666)][_0x43af34(0x1d2)]=_0x5ce3d2[_0x43af34(0x85a)][_0x43af34(0x914)][_0x43af34(0x165)][_0x43af34(0x729)];const _0x646b55=_0xefe3eb[_0x43af34(0x85a)]['Settings'][_0x43af34(0x165)][_0x43af34(0x226)],_0x486d25=this[_0x43af34(0x164)](0x0);if(_0x646b55>0x0){const _0x1ce9ba=_0x486d25['y']+(this[_0x43af34(0x261)]()-_0xf7ee06[_0x43af34(0x50c)])/0x2;this[_0x43af34(0x514)](_0x646b55,_0x486d25['x'],_0x1ce9ba);const _0x625a9f=_0x4b64b2[_0x43af34(0x87d)]+0x4;_0x486d25['x']+=_0x625a9f,_0x486d25['width']-=_0x625a9f;}this[_0x43af34(0x705)](_0x233a93[_0x43af34(0x89c)]()),this['drawText'](this[_0x43af34(0x1a4)](),_0x486d25['x'],_0x486d25['y'],_0x486d25[_0x43af34(0x3d3)],'left');const _0x5ad201=this['textWidth'](this[_0x43af34(0x1a4)]())+0x6;;_0x486d25['x']+=_0x5ad201,_0x486d25[_0x43af34(0x3d3)]-=_0x5ad201,this[_0x43af34(0x496)]();const _0x438463=this['value'](),_0x27b7cd=this['textWidth'](this['_digitGrouping']?_0x29b04c[_0x43af34(0x10c)](this[_0x43af34(0x86d)]()):this[_0x43af34(0x86d)]());_0x27b7cd>_0x486d25[_0x43af34(0x3d3)]?this['drawText'](_0x16be3f[_0x43af34(0x85a)][_0x43af34(0x914)][_0x43af34(0x165)][_0x43af34(0x424)],_0x486d25['x'],_0x486d25['y'],_0x486d25[_0x43af34(0x3d3)],_0x43af34(0x15d)):this[_0x43af34(0x367)](this['value'](),_0x486d25['x'],_0x486d25['y'],_0x486d25[_0x43af34(0x3d3)],'right'),this[_0x43af34(0x35a)]();}}else{if(_0x259a7e instanceof Array&&_0x259a7e[0x0]===_0x43af34(0x69e)){if(_0x43af34(0x5af)!==_0x43af34(0x5af))return _0x36b4fa[_0x43af34(0x85a)][_0x43af34(0x914)][_0x43af34(0x415)][_0x43af34(0x61d)];else this[_0x43af34(0x491)](_0x259a7e);}else this[_0x43af34(0x499)](_0x259a7e);}this[_0x43af34(0x702)]();},VisuMZ['CoreEngine']['BattleManager_processEscape']=BattleManager[_0x283c20(0x4b9)],BattleManager[_0x283c20(0x4b9)]=function(){const _0x3c80d6=_0x283c20;if(VisuMZ[_0x3c80d6(0x85a)]['Settings'][_0x3c80d6(0x5be)][_0x3c80d6(0x15c)]){if(_0x3c80d6(0x707)==='eRiQP')this[_0x3c80d6(0x1c8)]();else{_0xf82ae6[_0x3c80d6(0x5c0)](_0x517b5b,_0x1c97a3);const _0xfe4bc0=_0x2cac75['URL'];_0x527aa1[_0x3c80d6(0x546)](_0xfe4bc0);}}else return VisuMZ[_0x3c80d6(0x85a)]['BattleManager_processEscape'][_0x3c80d6(0x5d8)](this);},BattleManager[_0x283c20(0x1c8)]=function(){const _0x44052f=_0x283c20;return $gameParty['performEscape'](),SoundManager[_0x44052f(0x28a)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x283c20(0x822)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager['isActiveTpb']=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x283c20(0x85a)]['Game_Temp_initialize']=Game_Temp['prototype']['initialize'],Game_Temp[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x4a7d50=_0x283c20;VisuMZ[_0x4a7d50(0x85a)][_0x4a7d50(0x227)][_0x4a7d50(0x5d8)](this),this[_0x4a7d50(0x64f)](),this[_0x4a7d50(0x7ae)](),this[_0x4a7d50(0x6a7)]();},Game_Temp['prototype'][_0x283c20(0x64f)]=function(){const _0x3af891=_0x283c20;VisuMZ[_0x3af891(0x85a)][_0x3af891(0x914)][_0x3af891(0x5be)][_0x3af891(0x4e3)]&&(this[_0x3af891(0x5a6)]=![]);},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x485)]=function(_0x40c932){this['_lastPluginCommandInterpreter']=_0x40c932;},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x904)]=function(){const _0x407686=_0x283c20;return this[_0x407686(0x5d0)];},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x1c9)]=function(){const _0x23ebd4=_0x283c20;this[_0x23ebd4(0x365)]=undefined,this[_0x23ebd4(0x38f)]=undefined;},Game_Temp[_0x283c20(0x44e)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x394072){const _0x4d98fd=_0x283c20;$gameMap&&$dataMap&&$dataMap[_0x4d98fd(0x40d)]&&this[_0x4d98fd(0x5ca)]($dataMap['note']);const _0x450b86=$dataTroops[_0x394072];if(_0x450b86){if(_0x4d98fd(0x19e)!==_0x4d98fd(0x19e))return _0x15f659[_0x4d98fd(0x797)](_0x4d98fd(0x8aa));else{let _0x2bc6aa=DataManager[_0x4d98fd(0x389)](_0x450b86['id']);this[_0x4d98fd(0x5ca)](_0x2bc6aa);}}},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x5ca)]=function(_0x2a0cc9){const _0x1899eb=_0x283c20;if(!_0x2a0cc9)return;if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x1899eb(0x362)!==_0x1899eb(0x362)){if(this['isGamepadButtonPressed'](_0x2640c1))return!![];}else this[_0x1899eb(0x365)]='SV';}else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5a204a=String(RegExp['$1']);if(_0x5a204a[_0x1899eb(0x312)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))_0x1899eb(0x8de)!==_0x1899eb(0x19d)?this['_forcedTroopView']='FV':this[_0x1899eb(0x446)][_0x1899eb(0x22a)](_0x43d632[_0x1899eb(0x631)][_0x1899eb(0x1ad)]);else _0x5a204a[_0x1899eb(0x312)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(_0x1899eb(0x203)===_0x1899eb(0x599)?(this[_0x1899eb(0x334)](),this[_0x1899eb(0x7e7)]()):this[_0x1899eb(0x365)]='SV');}}}if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:DTB)>/i))_0x1899eb(0x8b1)!==_0x1899eb(0x8b1)?(this[_0x1899eb(0x156)]=new _0x4ead65[(_0x1899eb(0x43e))]['BlurFilter'](_0x412a6e=!![]),this[_0x1899eb(0x8fa)]=new _0x522c87(),this[_0x1899eb(0x8fa)][_0x1899eb(0x341)]=_0x52dd2c['backgroundBitmap'](),this[_0x1899eb(0x8fa)][_0x1899eb(0x43e)]=[this[_0x1899eb(0x156)]],this[_0x1899eb(0x6fd)](this[_0x1899eb(0x8fa)]),this[_0x1899eb(0x28e)](0xc0),this[_0x1899eb(0x28e)](this[_0x1899eb(0x782)]()),this[_0x1899eb(0x2a5)]()):this['_forcedBattleSys']=0x0;else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if('ChjGS'===_0x1899eb(0x72a))this['_forcedBattleSys']=0x1;else{let _0x475957=0x0;return _0xbdfb30[_0x1899eb(0x8e5)]()?_0x475957=this[_0x1899eb(0x5ad)]():_0x475957=_0xf751b8[_0x1899eb(0x85a)][_0x1899eb(0x1f9)][_0x1899eb(0x5d8)](this),this[_0x1899eb(0x669)]()&&this[_0x1899eb(0x6db)]()===_0x1899eb(0x8ef)&&(_0x475957+=_0x150bc8[_0x1899eb(0x44e)]['lineHeight']()),_0x475957;}}else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x1899eb(0x38f)]=0x2;else{if(_0x2a0cc9['match'](/<(?:CTB)>/i))Imported[_0x1899eb(0x82d)]&&(_0x1899eb(0x7ba)===_0x1899eb(0x4ab)?_0x183d1d[_0x1899eb(0x6b9)](_0x5904ba):this[_0x1899eb(0x38f)]='CTB');else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:STB)>/i))Imported[_0x1899eb(0x816)]&&('vsHjS'===_0x1899eb(0x34d)?this[_0x1899eb(0x38f)]='CTB':this[_0x1899eb(0x38f)]='STB');else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:BTB)>/i))Imported[_0x1899eb(0x3b4)]&&(_0x1899eb(0x304)==='TGxuh'?this[_0x1899eb(0x38f)]='BTB':(_0x57ab61[_0x1899eb(0x85a)]['Scene_Base_createWindowLayer'][_0x1899eb(0x5d8)](this),this[_0x1899eb(0x6d6)](),this[_0x1899eb(0x7a7)]['x']=_0x580060['round'](this[_0x1899eb(0x7a7)]['x']),this[_0x1899eb(0x7a7)]['y']=_0x584b04[_0x1899eb(0x4a8)](this[_0x1899eb(0x7a7)]['y'])));else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:FTB)>/i))Imported[_0x1899eb(0x839)]&&(this['_forcedBattleSys']=_0x1899eb(0x36c));else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:OTB)>/i))'UOMwV'!==_0x1899eb(0x286)?Imported[_0x1899eb(0x311)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x171)):this[_0x1899eb(0x2d2)]()?this[_0x1899eb(0x588)]():_0x4fdd3b[_0x1899eb(0x85a)]['Scene_Name_onInputOk'][_0x1899eb(0x5d8)](this);else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:ETB)>/i))Imported[_0x1899eb(0x91c)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x3af));else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:PTB)>/i))Imported[_0x1899eb(0x5a7)]&&(this[_0x1899eb(0x38f)]='PTB');else{if(_0x2a0cc9[_0x1899eb(0x312)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x52f31e=String(RegExp['$1']);if(_0x52f31e['match'](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x52f31e[_0x1899eb(0x312)](/(?:TPB|ATB)[ ]ACTIVE/i)){if('Glozp'!=='SrLbX')this[_0x1899eb(0x38f)]=0x1;else for(const _0xafc497 of _0x44250a){this[_0x1899eb(0x5fd)]([_0xafc497],_0x28c5fd,_0x45304c,_0xef9ff8,_0x13a7de),_0x59ad27+=_0x5cb21f;}}else{if(_0x52f31e[_0x1899eb(0x312)](/(?:TPB|ATB)[ ]WAIT/i))_0x1899eb(0x787)!==_0x1899eb(0x87a)?this[_0x1899eb(0x38f)]=0x2:this[_0x1899eb(0x5fd)](_0x2c925e,_0x40ac61,_0x5d552e,_0x486e4e,_0x2ac611);else{if(_0x52f31e[_0x1899eb(0x312)](/CTB/i)){if(_0x1899eb(0x177)===_0x1899eb(0x177))Imported[_0x1899eb(0x82d)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x326));else{const _0x3f908a=this[_0x1899eb(0x818)];_0x3f908a[_0x1899eb(0x657)](),_0x3f908a[_0x1899eb(0x58e)]=this[_0x1899eb(0x793)]();const _0x568173=_0x3f908a[_0x1899eb(0x4c7)](_0x3975f5)[_0x1899eb(0x3d3)];return _0x3f908a['restore'](),_0x568173;}}else{if(_0x52f31e[_0x1899eb(0x312)](/STB/i)){if(Imported[_0x1899eb(0x816)]){if(_0x1899eb(0x3da)==='BUIqJ'){_0x28cbf2[_0x1899eb(0x492)]=_0x594af2(_0x3ff2ed['$1']);if(_0x4883b4[_0x1899eb(0x492)]===0x0)_0x26f6f1['maxLevel']=_0xca9b50[_0x1899eb(0x4ca)];}else this['_forcedBattleSys']='STB';}}else{if(_0x52f31e['match'](/BTB/i))Imported[_0x1899eb(0x3b4)]&&(this[_0x1899eb(0x38f)]='BTB');else{if(_0x52f31e[_0x1899eb(0x312)](/FTB/i))Imported[_0x1899eb(0x839)]&&(_0x1899eb(0x8c6)!==_0x1899eb(0x49a)?this[_0x1899eb(0x38f)]='FTB':_0x391008[_0x1899eb(0x85a)][_0x1899eb(0x80b)]['call'](this));else{if(_0x52f31e[_0x1899eb(0x312)](/OTB/i))Imported[_0x1899eb(0x311)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x171));else{if(_0x52f31e[_0x1899eb(0x312)](/ETB/i))Imported[_0x1899eb(0x91c)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x3af));else{if(_0x52f31e['match'](/PTB/i)){if(_0x1899eb(0x58a)==='oNbCi')Imported[_0x1899eb(0x5a7)]&&(this[_0x1899eb(0x38f)]=_0x1899eb(0x2a4));else return 0x0;}}}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x283c20(0x7ae)]=function(){const _0x18bc8=_0x283c20;this[_0x18bc8(0x3e2)]=[];},Game_Temp[_0x283c20(0x44e)]['requestFauxAnimation']=function(_0x565731,_0x5125c5,_0x408536,_0xe909c){const _0x35c6e1=_0x283c20;if(!this[_0x35c6e1(0x82f)]())return;_0x408536=_0x408536||![],_0xe909c=_0xe909c||![];if($dataAnimations[_0x5125c5]){const _0x2ac4f4={'targets':_0x565731,'animationId':_0x5125c5,'mirror':_0x408536,'mute':_0xe909c};this['_fauxAnimationQueue']['push'](_0x2ac4f4);for(const _0x4eca68 of _0x565731){if(_0x4eca68[_0x35c6e1(0x785)]){if('zegtl'===_0x35c6e1(0x869))_0x4eca68[_0x35c6e1(0x785)]();else return _0x43afa0['mev'];}}}},Game_Temp['prototype'][_0x283c20(0x82f)]=function(){return!![];},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x8d9)]=function(){const _0x390f19=_0x283c20;return this[_0x390f19(0x3e2)][_0x390f19(0x8f2)]();},Game_Temp[_0x283c20(0x44e)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype'][_0x283c20(0x53e)]=function(_0x35b68f,_0x5e9439,_0x461fce,_0x14f361,_0x12f86f){const _0x613ee5=_0x283c20;if(!this[_0x613ee5(0x278)]())return;_0x14f361=_0x14f361||![],_0x12f86f=_0x12f86f||![];if($dataAnimations[_0x461fce]){const _0x49fd34={'x':_0x35b68f,'y':_0x5e9439,'animationId':_0x461fce,'mirror':_0x14f361,'mute':_0x12f86f};this[_0x613ee5(0x8f3)][_0x613ee5(0x163)](_0x49fd34);}},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x278)]=function(){return!![];},Game_Temp[_0x283c20(0x44e)][_0x283c20(0x77d)]=function(){const _0x1e72f6=_0x283c20;return this[_0x1e72f6(0x8f3)]['shift']();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System[_0x283c20(0x44e)][_0x283c20(0x3a9)],Game_System[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x585a49=_0x283c20;VisuMZ[_0x585a49(0x85a)][_0x585a49(0x69f)]['call'](this),this[_0x585a49(0x22e)]();},Game_System['prototype'][_0x283c20(0x22e)]=function(){const _0x588a97=_0x283c20;this[_0x588a97(0x41f)]={'SideView':$dataSystem[_0x588a97(0x6d0)],'BattleSystem':this[_0x588a97(0x4b1)](),'FontSize':$dataSystem[_0x588a97(0x8a8)][_0x588a97(0x1d2)],'Padding':0xc};},Game_System['prototype'][_0x283c20(0x721)]=function(){const _0x3f99f3=_0x283c20;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x3f99f3(0x365)]==='FV')return![];}if(this[_0x3f99f3(0x41f)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x3f99f3(0x452)]===undefined)this[_0x3f99f3(0x22e)]();return this[_0x3f99f3(0x41f)][_0x3f99f3(0x452)];},Game_System['prototype'][_0x283c20(0x512)]=function(_0x24583a){const _0x143ef1=_0x283c20;if(this['_CoreEngineSettings']===undefined)this[_0x143ef1(0x22e)]();if(this[_0x143ef1(0x41f)][_0x143ef1(0x452)]===undefined)this[_0x143ef1(0x22e)]();this[_0x143ef1(0x41f)][_0x143ef1(0x452)]=_0x24583a;},Game_System[_0x283c20(0x44e)][_0x283c20(0x102)]=function(){const _0xa4576f=_0x283c20;if(this[_0xa4576f(0x41f)]===undefined)this[_0xa4576f(0x22e)]();this[_0xa4576f(0x41f)][_0xa4576f(0x80f)]=this[_0xa4576f(0x4b1)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x1a10fa=_0x283c20,_0x436197=(VisuMZ[_0x1a10fa(0x85a)][_0x1a10fa(0x914)][_0x1a10fa(0x80f)]||_0x1a10fa(0x589))[_0x1a10fa(0x287)]()[_0x1a10fa(0x538)]();return VisuMZ[_0x1a10fa(0x85a)][_0x1a10fa(0x62a)](_0x436197);},Game_System[_0x283c20(0x44e)][_0x283c20(0x236)]=function(){const _0x201ba1=_0x283c20;if($gameTemp[_0x201ba1(0x38f)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x201ba1(0x41f)]===undefined)this['initCoreEngine']();if(this[_0x201ba1(0x41f)]['BattleSystem']===undefined)this[_0x201ba1(0x102)]();return this[_0x201ba1(0x41f)][_0x201ba1(0x80f)];},Game_System[_0x283c20(0x44e)][_0x283c20(0x8e2)]=function(_0x3bfd73){const _0x355df8=_0x283c20;if(this[_0x355df8(0x41f)]===undefined)this[_0x355df8(0x22e)]();if(this['_CoreEngineSettings'][_0x355df8(0x80f)]===undefined)this[_0x355df8(0x102)]();this[_0x355df8(0x41f)][_0x355df8(0x80f)]=_0x3bfd73;},Game_System['prototype'][_0x283c20(0x8d2)]=function(){const _0x1826e0=_0x283c20;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1826e0(0x41f)][_0x1826e0(0x656)]===undefined)this[_0x1826e0(0x22e)]();return this['_CoreEngineSettings'][_0x1826e0(0x656)];},Game_System['prototype'][_0x283c20(0x433)]=function(_0x4c5768){const _0x46d493=_0x283c20;if(this[_0x46d493(0x41f)]===undefined)this[_0x46d493(0x22e)]();if(this[_0x46d493(0x41f)]['TimeProgress']===undefined)this[_0x46d493(0x22e)]();this[_0x46d493(0x41f)]['FontSize']=_0x4c5768;},Game_System[_0x283c20(0x44e)][_0x283c20(0x5e3)]=function(){const _0x3c4594=_0x283c20;if(this['_CoreEngineSettings']===undefined)this[_0x3c4594(0x22e)]();if(this[_0x3c4594(0x41f)][_0x3c4594(0x7b8)]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x283c20(0x44e)][_0x283c20(0x846)]=function(_0xf27e9){const _0x29f136=_0x283c20;if(this[_0x29f136(0x41f)]===undefined)this[_0x29f136(0x22e)]();if(this[_0x29f136(0x41f)][_0x29f136(0x1ec)]===undefined)this['initCoreEngine']();this[_0x29f136(0x41f)][_0x29f136(0x7b8)]=_0xf27e9;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x873)]=Game_Screen[_0x283c20(0x44e)]['initialize'],Game_Screen[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x58e359=_0x283c20;VisuMZ[_0x58e359(0x85a)]['Game_Screen_initialize'][_0x58e359(0x5d8)](this),this[_0x58e359(0x724)]();},Game_Screen['prototype']['initCoreEngineScreenShake']=function(){const _0x524572=_0x283c20,_0x1e936a=VisuMZ['CoreEngine'][_0x524572(0x914)][_0x524572(0x441)];this[_0x524572(0x5cf)]=_0x1e936a?.['DefaultStyle']||_0x524572(0x27e);},Game_Screen[_0x283c20(0x44e)][_0x283c20(0x1dc)]=function(){const _0x3e974e=_0x283c20;if(this[_0x3e974e(0x5cf)]===undefined)this[_0x3e974e(0x724)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x283c20(0x44e)][_0x283c20(0x5c8)]=function(_0x53c479){const _0x331a5c=_0x283c20;if(this['_coreEngineShakeStyle']===undefined)this[_0x331a5c(0x724)]();this['_coreEngineShakeStyle']=_0x53c479[_0x331a5c(0x155)]()['trim']();},Game_Picture[_0x283c20(0x44e)][_0x283c20(0x3f8)]=function(){const _0x4895ea=_0x283c20;if($gameParty[_0x4895ea(0x478)]())return![];return this[_0x4895ea(0x3f0)]()&&this[_0x4895ea(0x3f0)]()[_0x4895ea(0x506)](0x0)==='!';},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4f5)]=Game_Picture[_0x283c20(0x44e)]['x'],Game_Picture['prototype']['x']=function(){const _0x50a3e3=_0x283c20;return this[_0x50a3e3(0x3f8)]()?this[_0x50a3e3(0x313)]():'VtzXb'!==_0x50a3e3(0x3e0)?_0x50a3e3(0x326):VisuMZ['CoreEngine']['Game_Picture_x'][_0x50a3e3(0x5d8)](this);},Game_Picture['prototype']['xScrollLinkedOffset']=function(){const _0x3271d8=$gameMap['displayX']()*$gameMap['tileWidth']();return this['_x']-_0x3271d8;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8b9)]=Game_Picture[_0x283c20(0x44e)]['y'],Game_Picture['prototype']['y']=function(){const _0x3dbccd=_0x283c20;if(this[_0x3dbccd(0x3f8)]())return this[_0x3dbccd(0x59b)]();else{if('iIiQd'!==_0x3dbccd(0x4fd))_0x2dd5ca[_0x3dbccd(0x85a)]['Graphics_printError'][_0x3dbccd(0x5d8)](this,_0x2784c9,_0x367495,_0x4f0d8e),_0xeaa54a['ShowDevTools'](![]);else return VisuMZ[_0x3dbccd(0x85a)][_0x3dbccd(0x8b9)][_0x3dbccd(0x5d8)](this);}},Game_Picture[_0x283c20(0x44e)][_0x283c20(0x59b)]=function(){const _0x1a22ee=_0x283c20,_0xe2079b=$gameMap[_0x1a22ee(0x5e4)]()*$gameMap[_0x1a22ee(0x32e)]();return this['_y']-_0xe2079b;},Game_Picture['prototype'][_0x283c20(0x62c)]=function(_0x5b4181){this['_coreEasingType']=_0x5b4181;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x180)]=Game_Picture[_0x283c20(0x44e)][_0x283c20(0x1cf)],Game_Picture[_0x283c20(0x44e)]['calcEasing']=function(_0xa7cca4){const _0x2f3263=_0x283c20;this['_coreEasingType']=this[_0x2f3263(0x425)]||0x0;if([0x0,0x1,0x2,0x3]['includes'](this[_0x2f3263(0x425)]))return VisuMZ[_0x2f3263(0x85a)][_0x2f3263(0x180)][_0x2f3263(0x5d8)](this,_0xa7cca4);else{if(_0x2f3263(0x188)!==_0x2f3263(0x188)){if(_0x523aff[_0x2f3263(0x1a4)]!==this['currencyUnit']())return![];return _0x5e32f2['CoreEngine'][_0x2f3263(0x914)][_0x2f3263(0x165)]['ItemStyle'];}else return VisuMZ['ApplyEasing'](_0xa7cca4,this[_0x2f3263(0x425)]);}},VisuMZ[_0x283c20(0x85a)]['Game_Action_itemHit']=Game_Action[_0x283c20(0x44e)][_0x283c20(0x505)],Game_Action[_0x283c20(0x44e)]['itemHit']=function(_0x1ebfa6){const _0x2eb708=_0x283c20;return VisuMZ[_0x2eb708(0x85a)][_0x2eb708(0x914)][_0x2eb708(0x5be)]['ImprovedAccuracySystem']?this[_0x2eb708(0x6eb)](_0x1ebfa6):'iItmv'===_0x2eb708(0x275)?VisuMZ[_0x2eb708(0x85a)][_0x2eb708(0x248)][_0x2eb708(0x5d8)](this,_0x1ebfa6):_0x4de917[_0x2eb708(0x85a)][_0x2eb708(0x522)][_0x2eb708(0x5d8)](this,_0x58a028);},Game_Action[_0x283c20(0x44e)][_0x283c20(0x6eb)]=function(_0x2875a5){const _0x42af45=_0x283c20,_0x55383a=this['itemSuccessRate'](_0x2875a5),_0xf85693=this[_0x42af45(0x86b)](_0x2875a5),_0x355e85=this[_0x42af45(0x609)](_0x2875a5);return _0x55383a*(_0xf85693-_0x355e85);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7f3)]=Game_Action[_0x283c20(0x44e)][_0x283c20(0x683)],Game_Action[_0x283c20(0x44e)][_0x283c20(0x683)]=function(_0x28ad07){const _0x345a0f=_0x283c20;if(VisuMZ['CoreEngine']['Settings'][_0x345a0f(0x5be)]['ImprovedAccuracySystem']){if('frQim'==='frQim')return 0x0;else this['_forcedBattleSys']=_0x345a0f(0x2a4);}else return VisuMZ[_0x345a0f(0x85a)]['Game_Action_itemEva'][_0x345a0f(0x5d8)](this,_0x28ad07);},Game_Action[_0x283c20(0x44e)][_0x283c20(0x66d)]=function(_0x4676d4){const _0x2fc8be=_0x283c20;return this[_0x2fc8be(0x5b5)]()[_0x2fc8be(0x5e9)]*0.01;},Game_Action[_0x283c20(0x44e)][_0x283c20(0x86b)]=function(_0x36fb90){const _0x52462d=_0x283c20;if(VisuMZ[_0x52462d(0x85a)]['Settings'][_0x52462d(0x5be)][_0x52462d(0x2c4)]&&this[_0x52462d(0x337)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x52462d(0x914)]['QoL']['AccuracyBoost']&&this['subject']()[_0x52462d(0x6d3)]()?this['subject']()[_0x52462d(0x4ce)]+0.05:this[_0x52462d(0x1f1)]()[_0x52462d(0x4ce)]:0x1;},Game_Action[_0x283c20(0x44e)]['targetEvaRate']=function(_0x4eb460){const _0x58a5c3=_0x283c20;if(this['subject']()[_0x58a5c3(0x6d3)]()===_0x4eb460[_0x58a5c3(0x6d3)]())return 0x0;if(this[_0x58a5c3(0x55a)]()){if(_0x58a5c3(0x1d4)===_0x58a5c3(0x158)){_0x132a44[_0x58a5c3(0x85a)][_0x58a5c3(0x52a)][_0x58a5c3(0x5d8)](this,_0x532d8d);if(_0x2f476b[_0x58a5c3(0x85a)][_0x58a5c3(0x914)][_0x58a5c3(0x5be)][_0x58a5c3(0x279)])return;const _0x5bae05=_0x520120[_0x58a5c3(0x720)]();_0x5bae05[_0x58a5c3(0x205)]&&(0x1-this[_0x58a5c3(0x683)](_0x10ee60)>this[_0x58a5c3(0x505)](_0x374689)&&(_0x5bae05[_0x58a5c3(0x205)]=![],_0x5bae05['evaded']=!![]));}else return VisuMZ[_0x58a5c3(0x85a)]['Settings'][_0x58a5c3(0x5be)][_0x58a5c3(0x2c4)]&&_0x4eb460[_0x58a5c3(0x3b9)]()?_0x4eb460[_0x58a5c3(0x87c)]-0.05:_0x4eb460[_0x58a5c3(0x87c)];}else{if(this[_0x58a5c3(0x6b6)]()){if(_0x58a5c3(0x744)==='eEDgQ'){let _0x2d4cfa=_0x58a5c3(0x69b)+_0x33428b+'Total';if(this[_0x58a5c3(0x725)](_0x2d4cfa))return this[_0x58a5c3(0x84f)][_0x2d4cfa];return this['_cache'][_0x2d4cfa]=_0x1afe6c[_0x58a5c3(0x85a)][_0x58a5c3(0x914)][_0x58a5c3(0x7ee)][_0x58a5c3(0x617)][_0x58a5c3(0x5d8)](this,_0x54aea8),this[_0x58a5c3(0x84f)][_0x2d4cfa];}else return _0x4eb460[_0x58a5c3(0x4ea)];}else{if(_0x58a5c3(0x511)==='VGfMp')_0x30b432[_0x58a5c3(0x85a)]['Scene_Battle_createSpriteset'][_0x58a5c3(0x5d8)](this),_0x9ac9f4=this[_0x58a5c3(0x7e2)];else return 0x0;}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x52a)]=Game_Action[_0x283c20(0x44e)]['updateLastTarget'],Game_Action['prototype'][_0x283c20(0x644)]=function(_0x58c52e){const _0x5ce797=_0x283c20;VisuMZ['CoreEngine']['Game_Action_updateLastTarget']['call'](this,_0x58c52e);if(VisuMZ[_0x5ce797(0x85a)][_0x5ce797(0x914)][_0x5ce797(0x5be)][_0x5ce797(0x279)])return;const _0x3e9c78=_0x58c52e[_0x5ce797(0x720)]();if(_0x3e9c78[_0x5ce797(0x205)]){if('JLfya'==='JLfya')0x1-this[_0x5ce797(0x683)](_0x58c52e)>this['itemHit'](_0x58c52e)&&('yAxYI'==='vswsn'?(_0x70c1c3[_0x5ce797(0x85a)][_0x5ce797(0x38b)][_0x5ce797(0x5d8)](this),_0x27fac3[_0x5ce797(0x5e2)]&&!_0x407d96[_0x5ce797(0x39c)]()&&(this[_0x5ce797(0x122)](),_0x7f2556[_0x5ce797(0x595)]())):(_0x3e9c78[_0x5ce797(0x205)]=![],_0x3e9c78[_0x5ce797(0x6a6)]=!![]));else{if(_0x57554d===_0x4ac213&&_0x548bd6%0x1===0x0)return _0x3955ad;if(_0x2cf936!==_0x2924fd&&[_0x5ce797(0x47a),'MAXMP',_0x5ce797(0x423),'DEF',_0x5ce797(0x761),_0x5ce797(0x4d1),'AGI','LUK'][_0x5ce797(0x59d)](_0x125076(_0x993708)[_0x5ce797(0x287)]()[_0x5ce797(0x538)]()))return _0x2205cf;_0x4b5664=_0x3e5b0e||0x0;if(_0x599b56[_0x5ce797(0x85a)][_0x5ce797(0x83b)][_0x2ae3c3])return _0x4c840c[_0x5ce797(0x85a)]['CustomParamType'][_0x4cd721]===_0x5ce797(0x110)?_0x31180a:_0x560717((_0x39b1a9*0x64)[_0x5ce797(0x67e)](_0x577c62))+'%';return _0x48894f((_0x413c0c*0x64)[_0x5ce797(0x67e)](_0xc4889e))+'%';}}},VisuMZ[_0x283c20(0x85a)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x283c20(0x44e)]['initMembers'],Game_BattlerBase[_0x283c20(0x44e)]['initMembers']=function(){const _0x3e3fa7=_0x283c20;this[_0x3e3fa7(0x84f)]={},VisuMZ[_0x3e3fa7(0x85a)][_0x3e3fa7(0x34a)][_0x3e3fa7(0x5d8)](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x26f)]=Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x661)],Game_BattlerBase[_0x283c20(0x44e)]['refresh']=function(){const _0x38e2ed=_0x283c20;this[_0x38e2ed(0x84f)]={},VisuMZ['CoreEngine'][_0x38e2ed(0x26f)][_0x38e2ed(0x5d8)](this);},Game_BattlerBase[_0x283c20(0x44e)]['checkCacheKey']=function(_0x4abe07){const _0x2723dc=_0x283c20;return this['_cache']=this[_0x2723dc(0x84f)]||{},this['_cache'][_0x4abe07]!==undefined;},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x3a2)]=function(_0x280d1c){const _0x3896b1=_0x283c20,_0x1a57d3=(_0x565143,_0x509ae6)=>{const _0x55b691=_0xfbd7;if(_0x55b691(0x277)===_0x55b691(0x587))return this['getButtonAssistLocation']()==='button'?this[_0x55b691(0x11d)]():this[_0x55b691(0x153)]();else{if(!_0x509ae6)return _0x565143;if(_0x509ae6['note'][_0x55b691(0x312)](VisuMZ[_0x55b691(0x85a)][_0x55b691(0x770)][_0x55b691(0x3a2)][_0x280d1c])){var _0x3402b8=Number(RegExp['$1']);_0x565143+=_0x3402b8;}if(_0x509ae6[_0x55b691(0x40d)][_0x55b691(0x312)](VisuMZ[_0x55b691(0x85a)][_0x55b691(0x770)][_0x55b691(0x1a0)][_0x280d1c])){if(_0x55b691(0x581)!==_0x55b691(0x1a7)){var _0xaa676c=String(RegExp['$1']);try{_0x565143+=eval(_0xaa676c);}catch(_0x5902ea){if($gameTemp[_0x55b691(0x8bc)]())console['log'](_0x5902ea);}}else{const _0x146318=_0x286fa8['y']+(this[_0x55b691(0x261)]()-_0x23392a[_0x55b691(0x50c)])/0x2;this[_0x55b691(0x514)](_0x54e387,_0x274436['x'],_0x146318);const _0x3af635=_0x431ac7[_0x55b691(0x87d)]+0x4;_0x28824c['x']+=_0x3af635,_0x114aa7['width']-=_0x3af635;}}return _0x565143;}};return this[_0x3896b1(0x591)]()[_0x3896b1(0x36f)](_0x1a57d3,this[_0x3896b1(0x3db)][_0x280d1c]);},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x2bc)]=function(_0xebe1d){const _0x406102=_0x283c20;var _0x113421='Basic'+(this[_0x406102(0x6d3)]()?_0x406102(0x592):_0x406102(0x1f5))+_0x406102(0x3ea)+_0xebe1d;if(this['checkCacheKey'](_0x113421))return this[_0x406102(0x84f)][_0x113421];this[_0x406102(0x84f)][_0x113421]=eval(VisuMZ[_0x406102(0x85a)][_0x406102(0x914)][_0x406102(0x7ee)][_0x113421]);const _0xd88307=(_0x38fdef,_0x33ea71)=>{const _0x493c6a=_0x406102;if(!_0x33ea71)return _0x38fdef;if(_0x33ea71[_0x493c6a(0x40d)]['match'](VisuMZ['CoreEngine'][_0x493c6a(0x770)]['paramMax'][_0xebe1d])){if('uBsRb'!==_0x493c6a(0x71b)){var _0x167bb8=Number(RegExp['$1']);if(_0x167bb8===0x0)_0x167bb8=Number[_0x493c6a(0x4ca)];_0x38fdef=Math[_0x493c6a(0x861)](_0x38fdef,_0x167bb8);}else _0x2b83b9['length']>0x0?_0x1fbcfe+=_0x4c4c90+_0x493c6a(0x6e0):_0x162ae4+=_0x1112ab+_0x493c6a(0x25c)[_0x493c6a(0x520)](_0x50d8e8,_0x4e67e3[_0x493c6a(0x3f0)]||_0x493c6a(0x300))+_0x11bcc0,_0x499a39+=_0x47e522[_0x493c6a(0x520)](_0x10f785,_0x57416b);}if(_0x33ea71[_0x493c6a(0x40d)][_0x493c6a(0x312)](VisuMZ[_0x493c6a(0x85a)][_0x493c6a(0x770)][_0x493c6a(0x4c5)][_0xebe1d])){var _0x4c07f0=String(RegExp['$1']);try{_0x38fdef=Math[_0x493c6a(0x861)](_0x38fdef,Number(eval(_0x4c07f0)));}catch(_0xc6fd17){if(_0x493c6a(0x1c4)!=='LlhWM'){if($gameTemp['isPlaytest']())console[_0x493c6a(0x836)](_0xc6fd17);}else _0x42a4bd['alwaysDash']=!_0x3dae54['alwaysDash'],_0x50e1e0[_0x493c6a(0x657)]();}}return _0x38fdef;};if(this[_0x406102(0x84f)][_0x113421]===0x0)this[_0x406102(0x84f)][_0x113421]=Number['MAX_SAFE_INTEGER'];return this[_0x406102(0x84f)][_0x113421]=this['traitObjects']()[_0x406102(0x36f)](_0xd88307,this[_0x406102(0x84f)][_0x113421]),this['_cache'][_0x113421];},Game_BattlerBase['prototype']['paramRate']=function(_0x518a75){const _0x5cfd4a=_0x283c20,_0x1c4070=this[_0x5cfd4a(0x126)](Game_BattlerBase[_0x5cfd4a(0x4b6)],_0x518a75),_0x452cb1=(_0x35bc8c,_0x348410)=>{const _0x2c8e74=_0x5cfd4a;if(!_0x348410)return _0x35bc8c;if(_0x348410[_0x2c8e74(0x40d)][_0x2c8e74(0x312)](VisuMZ[_0x2c8e74(0x85a)][_0x2c8e74(0x770)][_0x2c8e74(0x6e5)][_0x518a75])){var _0x2d18cd=Number(RegExp['$1'])/0x64;_0x35bc8c*=_0x2d18cd;}if(_0x348410[_0x2c8e74(0x40d)][_0x2c8e74(0x312)](VisuMZ[_0x2c8e74(0x85a)][_0x2c8e74(0x770)][_0x2c8e74(0x646)][_0x518a75])){if(_0x2c8e74(0x65a)!==_0x2c8e74(0x65a)){_0x3bf08c['CoreEngine'][_0x2c8e74(0x64e)][_0x2c8e74(0x5d8)](this);if(_0x5e09f5[_0x2c8e74(0x8c5)]>='1.4.4'){if(typeof _0x39bea9===_0x2c8e74(0x112))_0xe029bb[_0x2c8e74(0x6cc)]['quit']();}}else{var _0x2d18cd=Number(RegExp['$1']);_0x35bc8c*=_0x2d18cd;}}if(_0x348410[_0x2c8e74(0x40d)][_0x2c8e74(0x312)](VisuMZ[_0x2c8e74(0x85a)][_0x2c8e74(0x770)][_0x2c8e74(0x57b)][_0x518a75])){var _0x4176ef=String(RegExp['$1']);try{if(_0x2c8e74(0x59a)!==_0x2c8e74(0x37c))_0x35bc8c*=eval(_0x4176ef);else{let _0x31a05f=_0x4192b9['CoreEngine'][_0x2c8e74(0x517)][_0x2c8e74(0x5d8)](this,_0x1c83be);return _0x31a05f['x']=_0x39fd1e[_0x2c8e74(0x4a8)](_0x31a05f['x']),_0x31a05f['y']=_0xffeea1[_0x2c8e74(0x4a8)](_0x31a05f['y']),_0x31a05f['width']=_0x26ce8f[_0x2c8e74(0x4a8)](_0x31a05f[_0x2c8e74(0x3d3)]),_0x31a05f[_0x2c8e74(0x753)]=_0x54b409[_0x2c8e74(0x4a8)](_0x31a05f[_0x2c8e74(0x753)]),_0x31a05f;}}catch(_0x4ee957){if($gameTemp[_0x2c8e74(0x8bc)]())console[_0x2c8e74(0x836)](_0x4ee957);}}return _0x35bc8c;};return this[_0x5cfd4a(0x591)]()[_0x5cfd4a(0x36f)](_0x452cb1,_0x1c4070);},Game_BattlerBase['prototype']['paramFlatBonus']=function(_0x26c6e0){const _0x3febd1=_0x283c20,_0x401e3a=(_0x30022e,_0x4c73f4)=>{const _0x46e17c=_0xfbd7;if(!_0x4c73f4)return _0x30022e;if(_0x4c73f4[_0x46e17c(0x40d)][_0x46e17c(0x312)](VisuMZ[_0x46e17c(0x85a)][_0x46e17c(0x770)][_0x46e17c(0x845)][_0x26c6e0])){if(_0x46e17c(0x3ba)!=='uAbpn'){var _0x1a3568=Number(RegExp['$1']);_0x30022e+=_0x1a3568;}else return _0x349779[_0x46e17c(0x8e5)]()?this[_0x46e17c(0x231)]():_0x4410ee['CoreEngine'][_0x46e17c(0x7b5)][_0x46e17c(0x5d8)](this);}if(_0x4c73f4['note'][_0x46e17c(0x312)](VisuMZ[_0x46e17c(0x85a)][_0x46e17c(0x770)]['paramFlatJS'][_0x26c6e0])){var _0x11ce5f=String(RegExp['$1']);try{_0x30022e+=eval(_0x11ce5f);}catch(_0xc0a71c){if($gameTemp['isPlaytest']())console[_0x46e17c(0x836)](_0xc0a71c);}}return _0x30022e;};return this[_0x3febd1(0x591)]()[_0x3febd1(0x36f)](_0x401e3a,0x0);},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x508)]=function(_0x77597){const _0xbf5da5=_0x283c20;let _0x2ca6f0=_0xbf5da5(0x508)+_0x77597+_0xbf5da5(0x453);if(this[_0xbf5da5(0x725)](_0x2ca6f0))return this[_0xbf5da5(0x84f)][_0x2ca6f0];return this[_0xbf5da5(0x84f)][_0x2ca6f0]=Math['round'](VisuMZ[_0xbf5da5(0x85a)][_0xbf5da5(0x914)][_0xbf5da5(0x7ee)]['BasicParameterFormula'][_0xbf5da5(0x5d8)](this,_0x77597)),this[_0xbf5da5(0x84f)][_0x2ca6f0];},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x3a0)]=function(_0x1bc64e){const _0x3475f1=_0x283c20,_0x36e41e=(_0x14daf9,_0x4229c6)=>{const _0xd807ae=_0xfbd7;if('yXWrz'==='Rodzg')_0x13a08b[_0xd807ae(0x5a7)]&&(this[_0xd807ae(0x38f)]=_0xd807ae(0x2a4));else{if(!_0x4229c6)return _0x14daf9;if(_0x4229c6[_0xd807ae(0x40d)][_0xd807ae(0x312)](VisuMZ[_0xd807ae(0x85a)][_0xd807ae(0x770)][_0xd807ae(0x819)][_0x1bc64e])){var _0x14f33a=Number(RegExp['$1'])/0x64;_0x14daf9+=_0x14f33a;}if(_0x4229c6[_0xd807ae(0x40d)]['match'](VisuMZ[_0xd807ae(0x85a)]['RegExp'][_0xd807ae(0x3cb)][_0x1bc64e])){var _0x14f33a=Number(RegExp['$1']);_0x14daf9+=_0x14f33a;}if(_0x4229c6[_0xd807ae(0x40d)][_0xd807ae(0x312)](VisuMZ[_0xd807ae(0x85a)][_0xd807ae(0x770)]['xparamPlusJS'][_0x1bc64e])){var _0x2aa32f=String(RegExp['$1']);try{_0x14daf9+=eval(_0x2aa32f);}catch(_0xfa1db0){if(_0xd807ae(0x3b3)!==_0xd807ae(0x13a)){if($gameTemp[_0xd807ae(0x8bc)]())console[_0xd807ae(0x836)](_0xfa1db0);}else _0x1d7cd5[_0xd807ae(0x85a)]['SceneManager_initialize']['call'](this),this[_0xd807ae(0x637)]();}}return _0x14daf9;}};return this['traitObjects']()[_0x3475f1(0x36f)](_0x36e41e,0x0);},Game_BattlerBase['prototype']['xparamRate']=function(_0x20179d){const _0x53ae79=_0x283c20,_0x1e8033=(_0x5ac5bc,_0x3fe044)=>{const _0x1fca72=_0xfbd7;if(!_0x3fe044)return _0x5ac5bc;if(_0x3fe044[_0x1fca72(0x40d)][_0x1fca72(0x312)](VisuMZ['CoreEngine'][_0x1fca72(0x770)][_0x1fca72(0x47f)][_0x20179d])){var _0x5038c0=Number(RegExp['$1'])/0x64;_0x5ac5bc*=_0x5038c0;}if(_0x3fe044[_0x1fca72(0x40d)][_0x1fca72(0x312)](VisuMZ['CoreEngine'][_0x1fca72(0x770)][_0x1fca72(0x4fb)][_0x20179d])){var _0x5038c0=Number(RegExp['$1']);_0x5ac5bc*=_0x5038c0;}if(_0x3fe044[_0x1fca72(0x40d)]['match'](VisuMZ[_0x1fca72(0x85a)][_0x1fca72(0x770)][_0x1fca72(0x935)][_0x20179d])){var _0xa679a=String(RegExp['$1']);try{_0x5ac5bc*=eval(_0xa679a);}catch(_0x4d720d){if('fBasH'==='ZmEBg'){if(_0x28896a[_0x1fca72(0x7cf)]())return _0x1fca72(0x7f5);return _0x19a611['CoreEngine']['Settings']['KeyboardInput'][_0x1fca72(0x4fa)]||_0x1fca72(0x1df);}else{if($gameTemp[_0x1fca72(0x8bc)]())console['log'](_0x4d720d);}}}return _0x5ac5bc;};return this[_0x53ae79(0x591)]()[_0x53ae79(0x36f)](_0x1e8033,0x1);},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x56d)]=function(_0x1338b3){const _0x31b48a=_0x283c20,_0x3e18cf=(_0x7f705c,_0x390541)=>{const _0xba7885=_0xfbd7;if(!_0x390541)return _0x7f705c;if(_0x390541[_0xba7885(0x40d)][_0xba7885(0x312)](VisuMZ[_0xba7885(0x85a)]['RegExp'][_0xba7885(0x7dd)][_0x1338b3])){if(_0xba7885(0x52c)!==_0xba7885(0x52c)){let _0x5ea20c=_0x5e6a4e;if(_0x5ea20c[0x0]==='0')return _0x5ea20c;if(_0x5ea20c[_0x5ea20c[_0xba7885(0x6a1)]-0x1]==='.')return _0x2753fa(_0x5ea20c)['toLocaleString'](_0x3dca52,_0x38f72e)+'.';else return _0x5ea20c[_0x5ea20c['length']-0x1]===','?_0x1c5740(_0x5ea20c)[_0xba7885(0x3c9)](_0x24a426,_0xdbbfcc)+',':_0x3267c1(_0x5ea20c)[_0xba7885(0x3c9)](_0x9a00fa,_0x2c4047);}else{var _0x52f9ef=Number(RegExp['$1'])/0x64;_0x7f705c+=_0x52f9ef;}}if(_0x390541[_0xba7885(0x40d)]['match'](VisuMZ[_0xba7885(0x85a)]['RegExp'][_0xba7885(0x624)][_0x1338b3])){var _0x52f9ef=Number(RegExp['$1']);_0x7f705c+=_0x52f9ef;}if(_0x390541[_0xba7885(0x40d)][_0xba7885(0x312)](VisuMZ[_0xba7885(0x85a)]['RegExp'][_0xba7885(0x404)][_0x1338b3])){var _0x234b6d=String(RegExp['$1']);try{if(_0xba7885(0x779)===_0xba7885(0x779))_0x7f705c+=eval(_0x234b6d);else return _0x4b8ebb[_0xba7885(0x2b6)](_0x2dc1e8,this[_0xba7885(0x425)]);}catch(_0x80291f){if($gameTemp['isPlaytest']())console[_0xba7885(0x836)](_0x80291f);}}return _0x7f705c;};return this[_0x31b48a(0x591)]()['reduce'](_0x3e18cf,0x0);},Game_BattlerBase['prototype'][_0x283c20(0x69b)]=function(_0x334254){const _0x26399f=_0x283c20;let _0x5a9c95=_0x26399f(0x69b)+_0x334254+_0x26399f(0x453);if(this[_0x26399f(0x725)](_0x5a9c95))return this[_0x26399f(0x84f)][_0x5a9c95];return this[_0x26399f(0x84f)][_0x5a9c95]=VisuMZ[_0x26399f(0x85a)][_0x26399f(0x914)][_0x26399f(0x7ee)][_0x26399f(0x617)][_0x26399f(0x5d8)](this,_0x334254),this[_0x26399f(0x84f)][_0x5a9c95];},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x211)]=function(_0x5a9dec){const _0x6c5073=_0x283c20,_0x492ec9=(_0x173d77,_0x1fb2f7)=>{const _0x42b32d=_0xfbd7;if(_0x42b32d(0x6f8)===_0x42b32d(0x765))return!![];else{if(!_0x1fb2f7)return _0x173d77;if(_0x1fb2f7[_0x42b32d(0x40d)]['match'](VisuMZ['CoreEngine'][_0x42b32d(0x770)][_0x42b32d(0x658)][_0x5a9dec])){var _0x20cd1b=Number(RegExp['$1'])/0x64;_0x173d77+=_0x20cd1b;}if(_0x1fb2f7[_0x42b32d(0x40d)][_0x42b32d(0x312)](VisuMZ['CoreEngine'][_0x42b32d(0x770)][_0x42b32d(0x4c2)][_0x5a9dec])){var _0x20cd1b=Number(RegExp['$1']);_0x173d77+=_0x20cd1b;}if(_0x1fb2f7[_0x42b32d(0x40d)][_0x42b32d(0x312)](VisuMZ['CoreEngine']['RegExp'][_0x42b32d(0x874)][_0x5a9dec])){var _0x2bfd25=String(RegExp['$1']);try{_0x173d77+=eval(_0x2bfd25);}catch(_0xfc89d1){if($gameTemp[_0x42b32d(0x8bc)]())console['log'](_0xfc89d1);}}return _0x173d77;}};return this[_0x6c5073(0x591)]()['reduce'](_0x492ec9,0x0);},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x374)]=function(_0x38f40f){const _0x1e7cda=_0x283c20,_0x1eb86f=(_0x1ce4a2,_0x49b700)=>{const _0x2d11f0=_0xfbd7;if(!_0x49b700)return _0x1ce4a2;if(_0x49b700[_0x2d11f0(0x40d)][_0x2d11f0(0x312)](VisuMZ['CoreEngine'][_0x2d11f0(0x770)][_0x2d11f0(0x64c)][_0x38f40f])){var _0xca6bf3=Number(RegExp['$1'])/0x64;_0x1ce4a2*=_0xca6bf3;}if(_0x49b700[_0x2d11f0(0x40d)][_0x2d11f0(0x312)](VisuMZ[_0x2d11f0(0x85a)][_0x2d11f0(0x770)]['sparamRate2'][_0x38f40f])){var _0xca6bf3=Number(RegExp['$1']);_0x1ce4a2*=_0xca6bf3;}if(_0x49b700[_0x2d11f0(0x40d)]['match'](VisuMZ['CoreEngine'][_0x2d11f0(0x770)][_0x2d11f0(0x64a)][_0x38f40f])){var _0x1e3ab7=String(RegExp['$1']);try{if('BUrJS'==='uMRMe')return _0x31f2a9[_0x2d11f0(0x85a)][_0x2d11f0(0x914)]['QoL'][_0x2d11f0(0x2c4)]&&this[_0x2d11f0(0x1f1)]()[_0x2d11f0(0x6d3)]()?this['subject']()[_0x2d11f0(0x4ce)]+0.05:this[_0x2d11f0(0x1f1)]()['hit'];else _0x1ce4a2*=eval(_0x1e3ab7);}catch(_0x486f51){if(_0x2d11f0(0x83a)==='WKmIL'){if($gameTemp[_0x2d11f0(0x8bc)]())console[_0x2d11f0(0x836)](_0x486f51);}else this[_0x2d11f0(0x350)]&&(_0x3a382d=_0x1b4ed4['makeDeepCopy'](_0x2d8766),_0x2db81b['se']&&(_0x411739['se']['volume']=0x0)),_0x158ce1[_0x2d11f0(0x85a)][_0x2d11f0(0x32b)]['call'](this,_0x1ad8e1);}}return _0x1ce4a2;};return this[_0x1e7cda(0x591)]()[_0x1e7cda(0x36f)](_0x1eb86f,0x1);},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x73a)]=function(_0x332d59){const _0x48b0d0=_0x283c20,_0x1c80fe=(_0x4f5431,_0x4f3944)=>{const _0x388d4c=_0xfbd7;if(!_0x4f3944)return _0x4f5431;if(_0x4f3944['note'][_0x388d4c(0x312)](VisuMZ[_0x388d4c(0x85a)]['RegExp']['sparamFlat1'][_0x332d59])){if(_0x388d4c(0x8e6)!==_0x388d4c(0x8e6)){if(this[_0x388d4c(0x41f)]===_0x1fa0a9)this[_0x388d4c(0x22e)]();if(this[_0x388d4c(0x41f)][_0x388d4c(0x452)]===_0x1aa781)this[_0x388d4c(0x22e)]();this[_0x388d4c(0x41f)][_0x388d4c(0x452)]=_0xe0e403;}else{var _0x3dd79a=Number(RegExp['$1'])/0x64;_0x4f5431+=_0x3dd79a;}}if(_0x4f3944['note'][_0x388d4c(0x312)](VisuMZ['CoreEngine'][_0x388d4c(0x770)][_0x388d4c(0x465)][_0x332d59])){var _0x3dd79a=Number(RegExp['$1']);_0x4f5431+=_0x3dd79a;}if(_0x4f3944[_0x388d4c(0x40d)][_0x388d4c(0x312)](VisuMZ[_0x388d4c(0x85a)]['RegExp']['sparamFlatJS'][_0x332d59])){var _0x22fc20=String(RegExp['$1']);try{_0x4f5431+=eval(_0x22fc20);}catch(_0x4dcc4b){if('XZyWJ'!==_0x388d4c(0x58d))this['_forcedTroopView']=_0x361b91,this['_forcedBattleSys']=_0x110ca8;else{if($gameTemp[_0x388d4c(0x8bc)]())console['log'](_0x4dcc4b);}}}return _0x4f5431;};return this[_0x48b0d0(0x591)]()['reduce'](_0x1c80fe,0x0);},Game_BattlerBase['prototype'][_0x283c20(0x5ec)]=function(_0x361c96){const _0x3e24a4=_0x283c20;let _0x49f574=_0x3e24a4(0x5ec)+_0x361c96+'Total';if(this[_0x3e24a4(0x725)](_0x49f574))return this[_0x3e24a4(0x84f)][_0x49f574];return this[_0x3e24a4(0x84f)][_0x49f574]=VisuMZ['CoreEngine'][_0x3e24a4(0x914)]['Param'][_0x3e24a4(0x167)]['call'](this,_0x361c96),this[_0x3e24a4(0x84f)][_0x49f574];},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x607)]=function(_0x3584e4,_0x42b135){const _0x2fd062=_0x283c20;if(typeof paramId===_0x2fd062(0x264))return this[_0x2fd062(0x508)](_0x3584e4);_0x3584e4=String(_0x3584e4||'')[_0x2fd062(0x287)]();if(_0x3584e4===_0x2fd062(0x47a))return this[_0x2fd062(0x508)](0x0);if(_0x3584e4==='MAXMP')return this[_0x2fd062(0x508)](0x1);if(_0x3584e4===_0x2fd062(0x423))return this[_0x2fd062(0x508)](0x2);if(_0x3584e4===_0x2fd062(0x79d))return this[_0x2fd062(0x508)](0x3);if(_0x3584e4===_0x2fd062(0x761))return this[_0x2fd062(0x508)](0x4);if(_0x3584e4===_0x2fd062(0x4d1))return this['param'](0x5);if(_0x3584e4==='AGI')return this[_0x2fd062(0x508)](0x6);if(_0x3584e4===_0x2fd062(0x612))return this[_0x2fd062(0x508)](0x7);if(_0x3584e4===_0x2fd062(0x354))return _0x42b135?String(Math['round'](this['xparam'](0x0)*0x64))+'%':this[_0x2fd062(0x69b)](0x0);if(_0x3584e4===_0x2fd062(0x437))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x3584e4===_0x2fd062(0x860))return _0x42b135?String(Math['round'](this[_0x2fd062(0x69b)](0x2)*0x64))+'%':this[_0x2fd062(0x69b)](0x2);if(_0x3584e4===_0x2fd062(0x191))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x69b)](0x3)*0x64))+'%':this[_0x2fd062(0x69b)](0x3);if(_0x3584e4==='MEV')return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x69b)](0x4)*0x64))+'%':this[_0x2fd062(0x69b)](0x4);if(_0x3584e4===_0x2fd062(0x899))return _0x42b135?String(Math['round'](this[_0x2fd062(0x69b)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x3584e4===_0x2fd062(0x134))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x69b)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x3584e4==='HRG')return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x69b)](0x7)*0x64))+'%':this[_0x2fd062(0x69b)](0x7);if(_0x3584e4==='MRG')return _0x42b135?String(Math[_0x2fd062(0x4a8)](this['xparam'](0x8)*0x64))+'%':this[_0x2fd062(0x69b)](0x8);if(_0x3584e4==='TRG')return _0x42b135?String(Math['round'](this['xparam'](0x9)*0x64))+'%':this[_0x2fd062(0x69b)](0x9);if(_0x3584e4===_0x2fd062(0x41a))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x3584e4===_0x2fd062(0x76e))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this['sparam'](0x1)*0x64))+'%':this[_0x2fd062(0x5ec)](0x1);if(_0x3584e4==='REC')return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x2)*0x64))+'%':this[_0x2fd062(0x5ec)](0x2);if(_0x3584e4===_0x2fd062(0x451))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x3)*0x64))+'%':this[_0x2fd062(0x5ec)](0x3);if(_0x3584e4===_0x2fd062(0x594))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x3584e4===_0x2fd062(0x7c2))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x5)*0x64))+'%':this[_0x2fd062(0x5ec)](0x5);if(_0x3584e4===_0x2fd062(0x872))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this[_0x2fd062(0x5ec)](0x6)*0x64))+'%':this[_0x2fd062(0x5ec)](0x6);if(_0x3584e4===_0x2fd062(0x7dc))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this['sparam'](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x3584e4===_0x2fd062(0x430))return _0x42b135?String(Math[_0x2fd062(0x4a8)](this['sparam'](0x8)*0x64))+'%':this[_0x2fd062(0x5ec)](0x8);if(_0x3584e4===_0x2fd062(0x273))return _0x42b135?String(Math['round'](this[_0x2fd062(0x5ec)](0x9)*0x64))+'%':this[_0x2fd062(0x5ec)](0x9);if(VisuMZ['CoreEngine'][_0x2fd062(0x83b)][_0x3584e4]){const _0x41ed5e=VisuMZ[_0x2fd062(0x85a)]['CustomParamAbb'][_0x3584e4],_0x1e3c13=this[_0x41ed5e];return VisuMZ[_0x2fd062(0x85a)][_0x2fd062(0x2c6)][_0x3584e4]===_0x2fd062(0x110)?_0x1e3c13:_0x42b135?String(Math[_0x2fd062(0x4a8)](_0x1e3c13*0x64))+'%':_0x1e3c13;}return'';},Game_BattlerBase[_0x283c20(0x44e)][_0x283c20(0x550)]=function(){const _0x20020b=_0x283c20;return this[_0x20020b(0x5ed)]()&&this[_0x20020b(0x8d8)]<this[_0x20020b(0x7d1)]*VisuMZ[_0x20020b(0x85a)][_0x20020b(0x914)][_0x20020b(0x7ee)][_0x20020b(0x4c9)];},Game_Battler[_0x283c20(0x44e)][_0x283c20(0x142)]=function(){const _0x150079=_0x283c20;SoundManager[_0x150079(0x3a1)](),this[_0x150079(0x371)](_0x150079(0x1da));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x879)]=Game_Actor[_0x283c20(0x44e)][_0x283c20(0x678)],Game_Actor[_0x283c20(0x44e)][_0x283c20(0x678)]=function(_0x177173){const _0xebb5cb=_0x283c20;if(this[_0xebb5cb(0x51b)]>0x63)return this[_0xebb5cb(0x80c)](_0x177173);return VisuMZ[_0xebb5cb(0x85a)]['Game_Actor_paramBase'][_0xebb5cb(0x5d8)](this,_0x177173);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0x594a9d){const _0x30211b=_0x283c20,_0x360223=this[_0x30211b(0x8db)]()[_0x30211b(0x1c7)][_0x594a9d][0x63],_0x542cf0=this[_0x30211b(0x8db)]()['params'][_0x594a9d][0x62];return _0x360223+(_0x360223-_0x542cf0)*(this[_0x30211b(0x51b)]-0x63);},VisuMZ['CoreEngine'][_0x283c20(0x6e6)]=Game_Actor[_0x283c20(0x44e)][_0x283c20(0x717)],Game_Actor['prototype'][_0x283c20(0x717)]=function(_0x5f0a98,_0x5cf4e1){const _0x4ef284=_0x283c20;$gameTemp[_0x4ef284(0x83c)]=!![],VisuMZ[_0x4ef284(0x85a)][_0x4ef284(0x6e6)][_0x4ef284(0x5d8)](this,_0x5f0a98,_0x5cf4e1),$gameTemp[_0x4ef284(0x83c)]=undefined;},VisuMZ['CoreEngine'][_0x283c20(0x14b)]=Game_Actor['prototype'][_0x283c20(0x76d)],Game_Actor[_0x283c20(0x44e)][_0x283c20(0x76d)]=function(){const _0x2234b0=_0x283c20;VisuMZ[_0x2234b0(0x85a)][_0x2234b0(0x14b)][_0x2234b0(0x5d8)](this);if(!$gameTemp[_0x2234b0(0x83c)])this['levelUpRecovery']();},Game_Actor['prototype'][_0x283c20(0x695)]=function(){const _0x8418d3=_0x283c20;this[_0x8418d3(0x84f)]={};if(VisuMZ[_0x8418d3(0x85a)][_0x8418d3(0x914)][_0x8418d3(0x5be)][_0x8418d3(0x10b)])this[_0x8418d3(0x8d8)]=this[_0x8418d3(0x7d1)];if(VisuMZ[_0x8418d3(0x85a)][_0x8418d3(0x914)]['QoL']['LevelUpFullMp'])this[_0x8418d3(0x622)]=this['mmp'];},Game_Actor[_0x283c20(0x44e)]['expRate']=function(){const _0x5a2105=_0x283c20;if(this[_0x5a2105(0x84d)]())return 0x1;const _0x3c324f=this[_0x5a2105(0x285)]()-this[_0x5a2105(0x49f)](),_0x2f46c5=this[_0x5a2105(0x324)]()-this[_0x5a2105(0x49f)]();return(_0x2f46c5/_0x3c324f)[_0x5a2105(0x4f9)](0x0,0x1);},Game_Actor['prototype'][_0x283c20(0x591)]=function(){const _0x5535f9=_0x283c20,_0x55e7da=Game_Battler[_0x5535f9(0x44e)]['traitObjects'][_0x5535f9(0x5d8)](this);for(const _0x2954d0 of this['equips']()){if(_0x5535f9(0x428)===_0x5535f9(0x1e2))return _0x2b2487['CoreEngine'][_0x5535f9(0x914)][_0x5535f9(0x5be)][_0x5535f9(0x279)]?0x0:_0x28d5e7[_0x5535f9(0x85a)][_0x5535f9(0x7f3)][_0x5535f9(0x5d8)](this,_0x581c4e);else _0x2954d0&&_0x55e7da[_0x5535f9(0x163)](_0x2954d0);}return _0x55e7da['push'](this[_0x5535f9(0x8db)](),this[_0x5535f9(0x3b7)]()),_0x55e7da;},Object['defineProperty'](Game_Enemy[_0x283c20(0x44e)],_0x283c20(0x51b),{'get':function(){const _0x2a0d19=_0x283c20;return this[_0x2a0d19(0x378)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x283c20(0x378)]=function(){const _0xce8725=_0x283c20;return this[_0xce8725(0x111)]()['level'];},Game_Enemy[_0x283c20(0x44e)]['moveRelativeToResolutionChange']=function(){const _0x549c16=_0x283c20;if(!this[_0x549c16(0x376)]){if(_0x549c16(0x6ef)===_0x549c16(0x81f)){_0x5ef4b2-=_0x4a70b7;if(_0x435a89<=0x0)_0x403329=0x0;this[_0x549c16(0x901)](_0x5b8113);}else this[_0x549c16(0x391)]+=Math[_0x549c16(0x4a8)]((Graphics[_0x549c16(0x753)]-0x270)/0x2),this[_0x549c16(0x391)]-=Math[_0x549c16(0x214)]((Graphics[_0x549c16(0x753)]-Graphics[_0x549c16(0x5d5)])/0x2),$gameSystem['isSideView']()?_0x549c16(0x5fa)==='EZGqE'?this[_0x549c16(0x38f)]=_0x549c16(0x2a4):this[_0x549c16(0x24d)]-=Math[_0x549c16(0x214)]((Graphics[_0x549c16(0x3d3)]-Graphics[_0x549c16(0x4ef)])/0x2):this[_0x549c16(0x24d)]+=Math[_0x549c16(0x4a8)]((Graphics[_0x549c16(0x4ef)]-0x330)/0x2);}this[_0x549c16(0x376)]=!![];},Game_Party[_0x283c20(0x44e)]['maxGold']=function(){const _0x12c9b9=_0x283c20;return VisuMZ[_0x12c9b9(0x85a)][_0x12c9b9(0x914)][_0x12c9b9(0x165)]['GoldMax'];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5bf)]=Game_Party['prototype'][_0x283c20(0x63e)],Game_Party[_0x283c20(0x44e)]['consumeItem']=function(_0x300ae0){const _0x3b3dfe=_0x283c20;if(VisuMZ[_0x3b3dfe(0x85a)][_0x3b3dfe(0x914)][_0x3b3dfe(0x5be)][_0x3b3dfe(0x135)]&&DataManager[_0x3b3dfe(0x305)](_0x300ae0))return;VisuMZ['CoreEngine']['Game_Party_consumeItem'][_0x3b3dfe(0x5d8)](this,_0x300ae0);},Game_Party[_0x283c20(0x44e)]['setupBattleTestItems']=function(){const _0x5ea8a7=_0x283c20,_0x2042da=VisuMZ[_0x5ea8a7(0x85a)][_0x5ea8a7(0x914)][_0x5ea8a7(0x5be)],_0x56abf3=_0x2042da['BTestAddedQuantity']??0x63;let _0x3a77ff=[];if(_0x2042da['BTestItems']??!![]){if(_0x5ea8a7(0x5c5)!==_0x5ea8a7(0x680))_0x3a77ff=_0x3a77ff[_0x5ea8a7(0x610)]($dataItems);else{_0x1faf28[_0x5ea8a7(0x85a)][_0x5ea8a7(0x8a2)]['call'](this);if(!_0x2428ef['DETACH_PICTURE_CONTAINER'])return;const _0x2a4528=this[_0x5ea8a7(0x7e2)];if(!_0x2a4528)return;this[_0x5ea8a7(0x8e7)]=_0x2a4528[_0x5ea8a7(0x8e7)];if(!this[_0x5ea8a7(0x8e7)])return;this[_0x5ea8a7(0x6fd)](this[_0x5ea8a7(0x8e7)]);}}if(_0x2042da[_0x5ea8a7(0x4bb)]??!![]){if(_0x5ea8a7(0x480)!==_0x5ea8a7(0x480)){if(this[_0x5ea8a7(0x41f)]===_0x4098f8)this[_0x5ea8a7(0x22e)]();if(this[_0x5ea8a7(0x41f)]['TimeProgress']===_0x2802a4)this[_0x5ea8a7(0x22e)]();this[_0x5ea8a7(0x41f)][_0x5ea8a7(0x7b8)]=_0x56d3b6;}else _0x3a77ff=_0x3a77ff['concat']($dataWeapons);}(_0x2042da[_0x5ea8a7(0x192)]??!![])&&(_0x3a77ff=_0x3a77ff[_0x5ea8a7(0x610)]($dataArmors));for(const _0x54feff of _0x3a77ff){if(_0x5ea8a7(0x86a)!=='HuIMV')return 0x0;else{if(!_0x54feff)continue;if(_0x54feff[_0x5ea8a7(0x3f0)][_0x5ea8a7(0x538)]()<=0x0)continue;if(_0x54feff[_0x5ea8a7(0x3f0)]['match'](/-----/i))continue;this[_0x5ea8a7(0x42b)](_0x54feff,_0x56abf3);}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x515)]=Game_Troop[_0x283c20(0x44e)][_0x283c20(0x91f)],Game_Troop[_0x283c20(0x44e)]['setup']=function(_0x508b23){const _0x5eb4c2=_0x283c20;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x5eb4c2(0x455)](_0x508b23),VisuMZ[_0x5eb4c2(0x85a)][_0x5eb4c2(0x515)][_0x5eb4c2(0x5d8)](this,_0x508b23);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x471)]=Game_Map[_0x283c20(0x44e)]['setup'],Game_Map[_0x283c20(0x44e)][_0x283c20(0x91f)]=function(_0x4bedfd){const _0x51821f=_0x283c20;VisuMZ[_0x51821f(0x85a)][_0x51821f(0x471)][_0x51821f(0x5d8)](this,_0x4bedfd),this['setupCoreEngine'](_0x4bedfd);},Game_Map[_0x283c20(0x44e)][_0x283c20(0x123)]=function(){const _0x39e82c=_0x283c20;this['_hideTileShadows']=VisuMZ['CoreEngine']['Settings'][_0x39e82c(0x5be)][_0x39e82c(0x66b)]||![];if($dataMap&&$dataMap['note']){if($dataMap[_0x39e82c(0x40d)]['match'](/<SHOW TILE SHADOWS>/i))this[_0x39e82c(0x805)]=![];if($dataMap[_0x39e82c(0x40d)][_0x39e82c(0x312)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x283c20(0x44e)][_0x283c20(0x73e)]=function(){const _0x4f54e9=_0x283c20;if(this[_0x4f54e9(0x805)]===undefined)this['setupCoreEngine']();return this[_0x4f54e9(0x805)];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x2bf)]=Game_Character[_0x283c20(0x44e)][_0x283c20(0x5d9)],Game_Character[_0x283c20(0x44e)][_0x283c20(0x5d9)]=function(_0x14e9b4){const _0x353754=_0x283c20;try{VisuMZ['CoreEngine'][_0x353754(0x2bf)][_0x353754(0x5d8)](this,_0x14e9b4);}catch(_0x4b6a1d){if($gameTemp[_0x353754(0x8bc)]())console[_0x353754(0x836)](_0x4b6a1d);}},Game_Player[_0x283c20(0x44e)][_0x283c20(0x626)]=function(){const _0x58ca4d=_0x283c20,_0x11518c=$gameMap[_0x58ca4d(0x1f3)]();this[_0x58ca4d(0x7a6)]=Math[_0x58ca4d(0x35e)](_0x11518c)+Math[_0x58ca4d(0x35e)](_0x11518c)+this['encounterStepsMinimum']();},Game_Player[_0x283c20(0x44e)][_0x283c20(0x7b7)]=function(){const _0x307c73=_0x283c20;if($dataMap&&$dataMap[_0x307c73(0x40d)]&&$dataMap[_0x307c73(0x40d)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x307c73(0x89b)==='DQjvn')return VisuMZ[_0x307c73(0x85a)][_0x307c73(0x914)][_0x307c73(0x5be)][_0x307c73(0x564)];else _0x500bf0[_0x307c73(0x205)]=![],_0x500fc2[_0x307c73(0x6a6)]=!![];}},VisuMZ[_0x283c20(0x85a)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x283c20(0x44e)][_0x283c20(0x60d)],Game_Event[_0x283c20(0x44e)][_0x283c20(0x60d)]=function(_0x52c5a9,_0x2d186d){const _0x84a1bb=_0x283c20;if(this['isSmartEventCollisionOn']()){if(_0x84a1bb(0x2ab)==='XVlkB')_0x5138f4['playOk']();else return this[_0x84a1bb(0x3a4)](_0x52c5a9,_0x2d186d);}else{if('Tyzol'===_0x84a1bb(0x3e9))return VisuMZ[_0x84a1bb(0x85a)][_0x84a1bb(0x207)][_0x84a1bb(0x5d8)](this,_0x52c5a9,_0x2d186d);else this[_0x84a1bb(0x5e1)]();}},Game_Event[_0x283c20(0x44e)][_0x283c20(0x7c9)]=function(){const _0x29739b=_0x283c20;return VisuMZ['CoreEngine'][_0x29739b(0x914)][_0x29739b(0x5be)][_0x29739b(0x215)];},Game_Event[_0x283c20(0x44e)][_0x283c20(0x3a4)]=function(_0x2f1834,_0x5b7857){const _0x3f09db=_0x283c20;if(!this[_0x3f09db(0x16b)]())return![];else{if(_0x3f09db(0x2e9)!==_0x3f09db(0x346)){const _0x326233=$gameMap[_0x3f09db(0x145)](_0x2f1834,_0x5b7857)[_0x3f09db(0x68c)](_0x5ef2ae=>_0x5ef2ae[_0x3f09db(0x16b)]());return _0x326233[_0x3f09db(0x6a1)]>0x0;}else _0x51c98e['CoreEngine'][_0x3f09db(0x873)][_0x3f09db(0x5d8)](this),this[_0x3f09db(0x724)]();}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x537)]=Game_Interpreter['prototype'][_0x283c20(0x867)],Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x867)]=function(_0x409e3f){const _0x5ea5b8=_0x283c20,_0x5c45d8=this[_0x5ea5b8(0x242)]();if(_0x5c45d8[_0x5ea5b8(0x312)](/\/\/[ ]SCRIPT[ ]CALL/i))return this[_0x5ea5b8(0x4db)](_0x5c45d8);else{if('AsgJS'!==_0x5ea5b8(0x41d)){const _0x2d915a=_0x5a9023[_0x5ea5b8(0x7f7)]();_0x2d915a>_0x245cd2&&(_0x4adb85=_0x2d915a,this[_0x5ea5b8(0x353)](_0x4a0cac,_0x4563cb));}else return VisuMZ[_0x5ea5b8(0x85a)]['Game_Interpreter_command105']['call'](this,_0x409e3f);}},Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x242)]=function(){const _0x32ce0c=_0x283c20;let _0xfe993c='',_0x11f600=this[_0x32ce0c(0x635)]+0x1;while(this[_0x32ce0c(0x73f)][_0x11f600]&&this[_0x32ce0c(0x73f)][_0x11f600]['code']===0x195){_0xfe993c+=this[_0x32ce0c(0x73f)][_0x11f600][_0x32ce0c(0x263)][0x0]+'\x0a',_0x11f600++;}return _0xfe993c;},Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x4db)]=function(_0x11fe5f){const _0x57a720=_0x283c20;try{eval(_0x11fe5f);}catch(_0x4f1b71){$gameTemp['isPlaytest']()&&(console[_0x57a720(0x836)](_0x57a720(0x29d)),console[_0x57a720(0x836)](_0x4f1b71));}return!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x412)]=Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x7b3)],Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x7b3)]=function(_0x4079f6){const _0x3d52d4=_0x283c20;try{if(_0x3d52d4(0x6ec)!==_0x3d52d4(0x6ec))return 0x0;else VisuMZ[_0x3d52d4(0x85a)][_0x3d52d4(0x412)][_0x3d52d4(0x5d8)](this,_0x4079f6);}catch(_0x1fd4f9){if(_0x3d52d4(0x2f5)!==_0x3d52d4(0x2f5))_0x176b1f+=_0x19dec6[_0x3d52d4(0x44e)]['lineHeight']();else{if($gameTemp['isPlaytest']()){if('ituIi'===_0x3d52d4(0x1c0))return _0x1ec23e[_0x3d52d4(0x85a)][_0x3d52d4(0x914)]['Color'][_0x3d52d4(0x3b1)][_0x3d52d4(0x5d8)](this,_0x244209);else console['log'](_0x3d52d4(0x255)),console[_0x3d52d4(0x836)](_0x1fd4f9);}this[_0x3d52d4(0x256)]();}}return!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x31b)]=Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x81d)],Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x81d)]=function(_0x4ff816){const _0x55852d=_0x283c20;try{VisuMZ[_0x55852d(0x85a)]['Game_Interpreter_command122'][_0x55852d(0x5d8)](this,_0x4ff816);}catch(_0x3d54d7){$gameTemp[_0x55852d(0x8bc)]()&&(console['log'](_0x55852d(0x50b)),console['log'](_0x3d54d7));}return!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x79f)]=Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x611)],Game_Interpreter['prototype'][_0x283c20(0x611)]=function(){const _0x5c15ad=_0x283c20;try{VisuMZ[_0x5c15ad(0x85a)]['Game_Interpreter_command355']['call'](this);}catch(_0x440cb6){$gameTemp[_0x5c15ad(0x8bc)]()&&(console['log'](_0x5c15ad(0x329)),console[_0x5c15ad(0x836)](_0x440cb6));}return!![];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8df)]=Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x160)],Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x160)]=function(_0x10c5c1){const _0x1f13f3=_0x283c20;return $gameTemp[_0x1f13f3(0x485)](this),VisuMZ[_0x1f13f3(0x85a)][_0x1f13f3(0x8df)][_0x1f13f3(0x5d8)](this,_0x10c5c1);},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x1e7)]=function(){const _0x347f61=_0x283c20;return VisuMZ[_0x347f61(0x85a)][_0x347f61(0x914)]['UI'][_0x347f61(0x32f)];},Scene_Base[_0x283c20(0x44e)]['isBottomHelpMode']=function(){const _0x4a805c=_0x283c20;return VisuMZ[_0x4a805c(0x85a)][_0x4a805c(0x914)]['UI'][_0x4a805c(0x530)];},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x349)]=function(){const _0x2e074a=_0x283c20;return VisuMZ[_0x2e074a(0x85a)][_0x2e074a(0x914)]['UI']['BottomButtons'];},Scene_Base[_0x283c20(0x44e)]['isRightInputMode']=function(){const _0x931e73=_0x283c20;return VisuMZ['CoreEngine'][_0x931e73(0x914)]['UI']['RightMenus'];},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x652)]=function(){const _0x3b1c9d=_0x283c20;return VisuMZ[_0x3b1c9d(0x85a)][_0x3b1c9d(0x914)]['UI'][_0x3b1c9d(0x871)];},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x7a3)]=function(){const _0xdacde7=_0x283c20;return VisuMZ[_0xdacde7(0x85a)][_0xdacde7(0x914)]['UI'][_0xdacde7(0x382)];},Scene_Base[_0x283c20(0x44e)]['isWindowMaskingEnabled']=function(){const _0x42ab3a=_0x283c20;return VisuMZ[_0x42ab3a(0x85a)][_0x42ab3a(0x914)][_0x42ab3a(0x415)]['EnableMasking'];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x449)]=Scene_Base[_0x283c20(0x44e)][_0x283c20(0x22f)],Scene_Base[_0x283c20(0x44e)]['createWindowLayer']=function(){const _0x58fd29=_0x283c20;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']['call'](this),this[_0x58fd29(0x6d6)](),this[_0x58fd29(0x7a7)]['x']=Math[_0x58fd29(0x4a8)](this[_0x58fd29(0x7a7)]['x']),this[_0x58fd29(0x7a7)]['y']=Math['round'](this[_0x58fd29(0x7a7)]['y']);},Scene_Base[_0x283c20(0x44e)]['createButtonAssistWindow']=function(){},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x633)]=function(){const _0x37e961=_0x283c20;return TextManager[_0x37e961(0x928)](_0x37e961(0x4d3),_0x37e961(0x8dd));},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x78b)]=function(){return TextManager['getInputButtonString']('tab');},Scene_Base['prototype'][_0x283c20(0x5ab)]=function(){const _0x449f60=_0x283c20;return TextManager[_0x449f60(0x797)](_0x449f60(0x8f2));},Scene_Base['prototype']['buttonAssistKey4']=function(){const _0x346eb4=_0x283c20;return TextManager[_0x346eb4(0x797)]('ok');},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x712)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x45f)]=function(){const _0x2253a5=_0x283c20;if(this['_pageupButton']&&this[_0x2253a5(0x406)][_0x2253a5(0x6d8)]){if(_0x2253a5(0x193)!==_0x2253a5(0x5b1))return TextManager[_0x2253a5(0x748)];else{const _0x52e0d9=_0x2253a5(0x8e1);this[_0x2253a5(0x3f7)]=this[_0x2253a5(0x3f7)]||{};if(this[_0x2253a5(0x3f7)][_0x52e0d9])return this[_0x2253a5(0x3f7)][_0x52e0d9];const _0xeab0a0=_0x44958a['CoreEngine'][_0x2253a5(0x914)]['Color'][_0x2253a5(0x190)];return this[_0x2253a5(0x21e)](_0x52e0d9,_0xeab0a0);}}else return'';},Scene_Base[_0x283c20(0x44e)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x4c1)]=function(){return'';},Scene_Base[_0x283c20(0x44e)]['buttonAssistText4']=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x29e)]=function(){const _0x2cc7ab=_0x283c20;return TextManager[_0x2cc7ab(0x25d)];},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x240)]=function(){return 0x0;},Scene_Base['prototype'][_0x283c20(0x8ea)]=function(){return 0x0;},Scene_Base['prototype'][_0x283c20(0x5d4)]=function(){return 0x0;},Scene_Base[_0x283c20(0x44e)][_0x283c20(0x498)]=function(){return 0x0;},Scene_Base[_0x283c20(0x44e)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x6ae)]=Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x6bc)],Scene_Boot[_0x283c20(0x44e)]['loadSystemImages']=function(){const _0x4a7aec=_0x283c20;VisuMZ[_0x4a7aec(0x85a)][_0x4a7aec(0x6ae)][_0x4a7aec(0x5d8)](this),this[_0x4a7aec(0x291)]();},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x291)]=function(){const _0x3462cd=_0x283c20,_0x28e9fa=[_0x3462cd(0x7e8),'battlebacks1',_0x3462cd(0x272),'characters','enemies',_0x3462cd(0x3b5),_0x3462cd(0x6ee),_0x3462cd(0x7f4),_0x3462cd(0x82c),_0x3462cd(0x92b),_0x3462cd(0x1aa),'tilesets',_0x3462cd(0x685),_0x3462cd(0x30d)];for(const _0x39bb3e of _0x28e9fa){const _0x19ca30=VisuMZ['CoreEngine'][_0x3462cd(0x914)][_0x3462cd(0x4d7)][_0x39bb3e],_0x27d84a=_0x3462cd(0x270)[_0x3462cd(0x520)](_0x39bb3e);for(const _0xd8a3c6 of _0x19ca30){ImageManager[_0x3462cd(0x803)](_0x27d84a,_0xd8a3c6);}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x51a)]=Scene_Boot['prototype'][_0x283c20(0x7b2)],Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x7b2)]=function(){const _0x369967=_0x283c20;if(Utils[_0x369967(0x824)](_0x369967(0x877))&&VisuMZ[_0x369967(0x85a)][_0x369967(0x914)]['QoL'][_0x369967(0x121)]){if(_0x369967(0x559)===_0x369967(0x7ad))return _0x46ebf9&&_0x3d9c71[_0x369967(0x40d)]&&_0x3151bf[_0x369967(0x40d)][_0x369967(0x312)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x420f2d(_0x182ae4['$1']):_0xb1abb5[_0x369967(0x85a)][_0x369967(0x914)][_0x369967(0x5be)]['EncounterRateMinimum'];else this['startAutoNewGame']();}else _0x369967(0x314)!==_0x369967(0x314)?_0x1525fa[_0x369967(0x803)](_0x1ed4b8,_0x238af7):VisuMZ[_0x369967(0x85a)][_0x369967(0x51a)][_0x369967(0x5d8)](this);},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x473)]=function(){const _0x416131=_0x283c20;DataManager[_0x416131(0x11e)](),SceneManager[_0x416131(0x187)](Scene_Map);},Scene_Boot[_0x283c20(0x44e)]['adjustBoxSize']=function(){const _0x3f96ab=_0x283c20,_0x3412e2=$dataSystem['advanced'][_0x3f96ab(0x36d)],_0x195d29=$dataSystem[_0x3f96ab(0x8a8)][_0x3f96ab(0x791)],_0x2efed3=VisuMZ[_0x3f96ab(0x85a)][_0x3f96ab(0x914)]['UI'][_0x3f96ab(0x920)];Graphics[_0x3f96ab(0x4ef)]=_0x3412e2-_0x2efed3*0x2,Graphics['boxHeight']=_0x195d29-_0x2efed3*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x544)]=Scene_Boot[_0x283c20(0x44e)]['updateDocumentTitle'],Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x175)]=function(){const _0x5cb549=_0x283c20;this[_0x5cb549(0x1fb)]()?this[_0x5cb549(0x392)]():_0x5cb549(0x5dc)!==_0x5cb549(0x411)?VisuMZ[_0x5cb549(0x85a)]['Scene_Boot_updateDocumentTitle'][_0x5cb549(0x5d8)](this):_0x1bb286[_0x5cb549(0x85a)][_0x5cb549(0x692)]['call'](this);},Scene_Boot['prototype'][_0x283c20(0x1fb)]=function(){const _0x112748=_0x283c20;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x112748(0x28b)]==='Subtitle')return![];if(Scene_Title[_0x112748(0x463)]==='')return![];if(Scene_Title[_0x112748(0x463)]==='0.00')return![];return!![];},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x392)]=function(){const _0x287af9=_0x283c20,_0x7c257=$dataSystem[_0x287af9(0x65b)],_0x8a870d=Scene_Title[_0x287af9(0x28b)]||'',_0x199151=Scene_Title[_0x287af9(0x463)]||'',_0x5e6772=VisuMZ[_0x287af9(0x85a)][_0x287af9(0x914)][_0x287af9(0x85e)]['Title'][_0x287af9(0x479)],_0x45760d=_0x5e6772[_0x287af9(0x520)](_0x7c257,_0x8a870d,_0x199151);document[_0x287af9(0x628)]=_0x45760d;},Scene_Boot[_0x283c20(0x44e)][_0x283c20(0x4bd)]=function(){const _0x56e4f5=_0x283c20;if(VisuMZ[_0x56e4f5(0x85a)][_0x56e4f5(0x914)]['UI']['SideButtons']){const _0x4dcba9=Graphics[_0x56e4f5(0x3d3)]-Graphics[_0x56e4f5(0x4ef)]-VisuMZ[_0x56e4f5(0x85a)][_0x56e4f5(0x914)]['UI'][_0x56e4f5(0x920)]*0x2,_0x57b5f0=Sprite_Button[_0x56e4f5(0x44e)][_0x56e4f5(0x46d)]['call'](this)*0x4;if(_0x4dcba9>=_0x57b5f0)SceneManager[_0x56e4f5(0x89f)](!![]);}},Scene_Title[_0x283c20(0x28b)]=VisuMZ[_0x283c20(0x85a)]['Settings'][_0x283c20(0x85e)][_0x283c20(0x470)][_0x283c20(0x259)],Scene_Title[_0x283c20(0x463)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x85e)][_0x283c20(0x470)][_0x283c20(0x37f)],Scene_Title['pictureButtons']=VisuMZ[_0x283c20(0x85a)]['Settings']['TitlePicButtons'],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x348)]=Scene_Title[_0x283c20(0x44e)][_0x283c20(0x2ac)],Scene_Title[_0x283c20(0x44e)]['drawGameTitle']=function(){const _0x21b150=_0x283c20;VisuMZ[_0x21b150(0x85a)]['Settings'][_0x21b150(0x85e)]['Title'][_0x21b150(0x2ac)][_0x21b150(0x5d8)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x21b150(0x28b)]!=='Subtitle')this[_0x21b150(0x784)]();if(Scene_Title[_0x21b150(0x463)]!==''&&Scene_Title['version']!==_0x21b150(0x863))this[_0x21b150(0x802)]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x4a136a=_0x283c20;VisuMZ[_0x4a136a(0x85a)][_0x4a136a(0x914)][_0x4a136a(0x85e)][_0x4a136a(0x470)][_0x4a136a(0x784)][_0x4a136a(0x5d8)](this);},Scene_Title['prototype']['drawGameVersion']=function(){const _0x4beddd=_0x283c20;VisuMZ[_0x4beddd(0x85a)][_0x4beddd(0x914)][_0x4beddd(0x85e)][_0x4beddd(0x470)][_0x4beddd(0x802)]['call'](this);},Scene_Title[_0x283c20(0x44e)][_0x283c20(0x3d4)]=function(){const _0x3d5ecf=_0x283c20;this[_0x3d5ecf(0x239)]();const _0xf3da3c=$dataSystem[_0x3d5ecf(0x271)][_0x3d5ecf(0x616)],_0x58cf26=this['commandWindowRect']();this['_commandWindow']=new Window_TitleCommand(_0x58cf26),this[_0x3d5ecf(0x3ce)][_0x3d5ecf(0x22a)](_0xf3da3c);const _0x5caad9=this['commandWindowRect']();this['_commandWindow'][_0x3d5ecf(0x2fa)](_0x5caad9['x'],_0x5caad9['y'],_0x5caad9[_0x3d5ecf(0x3d3)],_0x5caad9['height']),this['addWindow'](this['_commandWindow']);},Scene_Title[_0x283c20(0x44e)]['commandWindowRows']=function(){const _0x51b847=_0x283c20;return this['_commandWindow']?this[_0x51b847(0x3ce)][_0x51b847(0x8d6)]():VisuMZ[_0x51b847(0x85a)][_0x51b847(0x914)][_0x51b847(0x19f)][_0x51b847(0x6a1)];},Scene_Title[_0x283c20(0x44e)][_0x283c20(0x5f4)]=function(){const _0xa4b7d=_0x283c20;return VisuMZ[_0xa4b7d(0x85a)][_0xa4b7d(0x914)][_0xa4b7d(0x85e)][_0xa4b7d(0x470)][_0xa4b7d(0x541)][_0xa4b7d(0x5d8)](this);},Scene_Title['prototype'][_0x283c20(0x239)]=function(){const _0x1e3822=_0x283c20;for(const _0x190950 of Scene_Title['pictureButtons']){const _0x23f27e=new Sprite_TitlePictureButton(_0x190950);this[_0x1e3822(0x6fd)](_0x23f27e);}},VisuMZ['CoreEngine'][_0x283c20(0xfd)]=Scene_Map['prototype']['initialize'],Scene_Map[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x15a5cb=_0x283c20;VisuMZ['CoreEngine'][_0x15a5cb(0xfd)][_0x15a5cb(0x5d8)](this),$gameTemp[_0x15a5cb(0x1c9)](),this[_0x15a5cb(0x407)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x38b)]=Scene_Map[_0x283c20(0x44e)]['updateMainMultiply'],Scene_Map['prototype']['updateMainMultiply']=function(){const _0x1250da=_0x283c20;VisuMZ[_0x1250da(0x85a)][_0x1250da(0x38b)]['call'](this),$gameTemp[_0x1250da(0x5e2)]&&!$gameMessage[_0x1250da(0x39c)]()&&(this[_0x1250da(0x122)](),SceneManager[_0x1250da(0x595)]());},Scene_Map[_0x283c20(0x44e)]['terminate']=function(){const _0xef8513=_0x283c20;Scene_Message[_0xef8513(0x44e)][_0xef8513(0x7de)][_0xef8513(0x5d8)](this),!SceneManager[_0xef8513(0x4e0)](Scene_Battle)&&(this[_0xef8513(0x7e2)][_0xef8513(0x118)](),this['_mapNameWindow'][_0xef8513(0x910)](),this['_windowLayer'][_0xef8513(0x6d8)]=![],SceneManager['snapForBackground']()),$gameScreen['clearZoom'](),this[_0xef8513(0x407)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5f8)]=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x30b)],Scene_Map['prototype'][_0x283c20(0x30b)]=function(){const _0x12e9f0=_0x283c20;VisuMZ[_0x12e9f0(0x85a)][_0x12e9f0(0x5f8)][_0x12e9f0(0x5d8)](this);if(SceneManager[_0x12e9f0(0x315)]()){if(_0x12e9f0(0x7e6)!==_0x12e9f0(0x1ff))this[_0x12e9f0(0x253)]();else{const _0x5a5225=this[_0x12e9f0(0x604)][_0x12e9f0(0x341)],_0x2c78f9=this[_0x12e9f0(0x3d3)],_0x44f6e7=this[_0x12e9f0(0x753)],_0x2c3211=this[_0x12e9f0(0x6c7)],_0x2d6111=_0x55cb83[_0x12e9f0(0x917)](),_0x732357=_0x58e344[_0x12e9f0(0x143)]();_0x5a5225['resize'](_0x2c78f9,_0x44f6e7),_0x5a5225[_0x12e9f0(0x7d4)](0x0,0x0,_0x2c78f9,_0x2c3211,_0x732357,_0x2d6111,!![]),_0x5a5225[_0x12e9f0(0x19b)](0x0,_0x2c3211,_0x2c78f9,_0x44f6e7-_0x2c3211*0x2,_0x2d6111),_0x5a5225[_0x12e9f0(0x7d4)](0x0,_0x44f6e7-_0x2c3211,_0x2c78f9,_0x2c3211,_0x2d6111,_0x732357,!![]),this[_0x12e9f0(0x604)][_0x12e9f0(0x6a4)](0x0,0x0,_0x2c78f9,_0x44f6e7);}}},Scene_Map[_0x283c20(0x44e)]['moveMenuButtonSideButtonLayout']=function(){const _0x56ec5f=_0x283c20;this[_0x56ec5f(0x85f)]['x']=Graphics[_0x56ec5f(0x4ef)]+0x4;},VisuMZ[_0x283c20(0x85a)]['Scene_Map_updateScene']=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x6c8)],Scene_Map['prototype'][_0x283c20(0x6c8)]=function(){const _0x546930=_0x283c20;VisuMZ['CoreEngine'][_0x546930(0x2ba)]['call'](this),this[_0x546930(0x5da)]();},Scene_Map[_0x283c20(0x44e)][_0x283c20(0x5da)]=function(){const _0x1eef98=_0x283c20;Input[_0x1eef98(0x55e)](_0x1eef98(0x72e))&&(ConfigManager['alwaysDash']=!ConfigManager['alwaysDash'],ConfigManager['save']());},VisuMZ[_0x283c20(0x85a)]['Scene_Map_updateMain']=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x122)],Scene_Map[_0x283c20(0x44e)][_0x283c20(0x122)]=function(){const _0x5e1990=_0x283c20;VisuMZ['CoreEngine']['Scene_Map_updateMain'][_0x5e1990(0x5d8)](this),this[_0x5e1990(0x528)]();},Scene_Map[_0x283c20(0x44e)][_0x283c20(0x407)]=function(){const _0x26efcf=_0x283c20;this[_0x26efcf(0x79a)]=[];},Scene_Map['prototype']['updateOnceParallelInterpreters']=function(){const _0x29fb18=_0x283c20;if(!this[_0x29fb18(0x79a)])return;for(const _0x3fa560 of this['_onceParallelInterpreters']){if(_0x3fa560){if('TgTKE'!==_0x29fb18(0x67a))_0x3fa560['update']();else{const _0x5e3e14=_0x42d230[_0x29fb18(0x6b0)]?(_0x3e8ba5[_0x29fb18(0x44e)][_0x29fb18(0x46d)]()+0x6)*0x2:0x0,_0x4aa844=this[_0x29fb18(0x922)](),_0x399e60=_0x4eda31[_0x29fb18(0x4ef)]-_0x5e3e14*0x2,_0xe6395b=this[_0x29fb18(0x7a3)]();return new _0x584489(_0x5e3e14,_0x4aa844,_0x399e60,_0xe6395b);}}}},Scene_Map[_0x283c20(0x44e)][_0x283c20(0x798)]=function(_0x4f0a9f){const _0x4e3f87=$dataCommonEvents[_0x4f0a9f];if(!_0x4e3f87)return;const _0x26643d=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x26643d),_0x26643d['setCommonEvent'](_0x4f0a9f);},Scene_Map['prototype']['addOnceParallelInterpreter']=function(_0x5d4233){const _0x1e1bea=_0x283c20;this['_onceParallelInterpreters']=this[_0x1e1bea(0x79a)]||[],this[_0x1e1bea(0x79a)]['push'](_0x5d4233);},Scene_Map[_0x283c20(0x44e)][_0x283c20(0x3ee)]=function(_0x1cb5ea){const _0x5a0996=_0x283c20;this['_onceParallelInterpreters']=this[_0x5a0996(0x79a)]||[],this['_onceParallelInterpreters'][_0x5a0996(0x438)](_0x1cb5ea);};function Game_OnceParallelInterpreter(){const _0x524436=_0x283c20;this[_0x524436(0x3a9)](...arguments);}Game_OnceParallelInterpreter[_0x283c20(0x44e)]=Object[_0x283c20(0x338)](Game_Interpreter[_0x283c20(0x44e)]),Game_OnceParallelInterpreter[_0x283c20(0x44e)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x283c20(0x585)]=function(_0x1d2071){const _0x4f2c61=_0x283c20,_0x26a6af=$dataCommonEvents[_0x1d2071];if(_0x26a6af)_0x4f2c61(0x3a5)===_0x4f2c61(0x3a5)?this[_0x4f2c61(0x91f)](_0x26a6af[_0x4f2c61(0x3fe)],0x0):!_0x34c37b[_0x4f2c61(0x3fd)]()&&this[_0x4f2c61(0x549)](_0xdf34b7);else{if('NVeJO'!=='NVeJO')return[0x25,0x26,0x27,0x28][_0x4f2c61(0x826)](this[_0x4f2c61(0x284)]);else this[_0x4f2c61(0x7de)]();}},Game_OnceParallelInterpreter['prototype'][_0x283c20(0x7de)]=function(){const _0x5ab2f4=_0x283c20;if(!SceneManager[_0x5ab2f4(0x4e2)]())return;SceneManager['_scene'][_0x5ab2f4(0x3ee)](this),Game_Interpreter[_0x5ab2f4(0x44e)][_0x5ab2f4(0x7de)]['call'](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x1f9)]=Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x655)],Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x655)]=function(){const _0x521a9d=_0x283c20;let _0x399648=0x0;if(SceneManager['areButtonsOutsideMainUI']())_0x399648=this[_0x521a9d(0x5ad)]();else{if(_0x521a9d(0x2ed)!==_0x521a9d(0x92c))_0x399648=VisuMZ[_0x521a9d(0x85a)][_0x521a9d(0x1f9)][_0x521a9d(0x5d8)](this);else{var _0x3ef5a7=_0x5d01aa-2.625/2.75;return 7.5625*_0x3ef5a7*_0x3ef5a7+0.984375;}}return this['isMenuButtonAssistEnabled']()&&this[_0x521a9d(0x6db)]()===_0x521a9d(0x8ef)&&(_0x521a9d(0x778)===_0x521a9d(0x778)?_0x399648+=Window_ButtonAssist['prototype'][_0x521a9d(0x261)]():this[_0x521a9d(0x2f9)]()&&_0xee990b&&this[_0x521a9d(0x862)]()===0x1&&this[_0x521a9d(0x526)]()===this[_0x521a9d(0x8d6)]()-0x1?this[_0x521a9d(0x901)](0x0):_0x4e1e46[_0x521a9d(0x85a)][_0x521a9d(0x8fd)]['call'](this,_0x27945d)),_0x399648;},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x5ad)]=function(){const _0x2f9986=_0x283c20;if(this[_0x2f9986(0x775)]()){if('fYhQR'!==_0x2f9986(0x78a))_0x29fd29[_0x2f9986(0x85a)]['Window_Selectable_cursorDown'][_0x2f9986(0x5d8)](this,_0x51e4a4);else return this['mainAreaBottom']();}else{if('YtqSh'===_0x2f9986(0x8c7))this['_forcedBattleSys']=_0x2f9986(0x36c);else return 0x0;}},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x283c20(0x44e)]['mainAreaTop'],Scene_MenuBase['prototype'][_0x283c20(0x7ac)]=function(){const _0x215b2b=_0x283c20;return SceneManager[_0x215b2b(0x8e5)]()?_0x215b2b(0x1ef)===_0x215b2b(0x3d1)?-0.5*(_0x50e7ab[_0x215b2b(0x60f)](0x2,0xa*_0x152df1)*_0x318669['sin']((_0x3ddc45-_0x550900)*(0x2*_0x2ce8c0['PI'])/_0x94852)):this[_0x215b2b(0x231)]():VisuMZ[_0x215b2b(0x85a)][_0x215b2b(0x7b5)]['call'](this);},Scene_MenuBase[_0x283c20(0x44e)]['mainAreaTopSideButtonLayout']=function(){const _0x25f2ab=_0x283c20;if(!this[_0x25f2ab(0x775)]()){if('tdTWN'!==_0x25f2ab(0x579)){const _0x3121ef=(_0x3d20e2[_0x25f2ab(0x85a)][_0x25f2ab(0x914)][_0x25f2ab(0x80f)]||'DATABASE')['toUpperCase']()['trim']();return _0x2e915d[_0x25f2ab(0x85a)]['CreateBattleSystemID'](_0x3121ef);}else return this['helpAreaBottom']();}else return 0x0;},VisuMZ[_0x283c20(0x85a)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x8f7)],Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x8f7)]=function(){const _0x33230a=_0x283c20;let _0x59cde9=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x59cde9=this[_0x33230a(0x906)]():_0x59cde9=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']['call'](this),this['isMenuButtonAssistEnabled']()&&this[_0x33230a(0x6db)]()!==_0x33230a(0x66a)&&(_0x33230a(0x318)!=='NajbB'?_0x1eac29[_0x33230a(0x8bc)]()&&(_0x5e7865['log'](_0x33230a(0x50b)),_0xedee79['log'](_0xb3f44)):_0x59cde9-=Window_ButtonAssist[_0x33230a(0x44e)]['lineHeight']()),_0x59cde9;},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x906)]=function(){const _0x3750a2=_0x283c20;return Graphics[_0x3750a2(0x5d5)]-this['helpAreaHeight']();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5aa)]=Scene_MenuBase['prototype'][_0x283c20(0x3d8)],Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x3d8)]=function(){const _0x1c4ccc=_0x283c20;this[_0x1c4ccc(0x156)]=new PIXI[(_0x1c4ccc(0x43e))][(_0x1c4ccc(0x7e9))](clamp=!![]),this[_0x1c4ccc(0x8fa)]=new Sprite(),this[_0x1c4ccc(0x8fa)]['bitmap']=SceneManager[_0x1c4ccc(0x5f6)](),this[_0x1c4ccc(0x8fa)][_0x1c4ccc(0x43e)]=[this[_0x1c4ccc(0x156)]],this[_0x1c4ccc(0x6fd)](this[_0x1c4ccc(0x8fa)]),this[_0x1c4ccc(0x28e)](0xc0),this[_0x1c4ccc(0x28e)](this['getBackgroundOpacity']()),this[_0x1c4ccc(0x2a5)]();},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x782)]=function(){const _0x56c1a4=_0x283c20,_0x448559=String(this[_0x56c1a4(0x7ff)][_0x56c1a4(0x3f0)]),_0x43ba26=this[_0x56c1a4(0x90c)](_0x448559);if(_0x43ba26)return _0x43ba26[_0x56c1a4(0x59f)];else{if(_0x56c1a4(0x1f2)===_0x56c1a4(0x834))this['_anchor']['x']=this[_0x56c1a4(0x8b6)]['x'],this[_0x56c1a4(0x4aa)]['y']=this[_0x56c1a4(0x8b6)]['y'];else return 0xc0;}},Scene_MenuBase['prototype'][_0x283c20(0x2a5)]=function(){const _0x4beb78=_0x283c20,_0xa3922f=String(this[_0x4beb78(0x7ff)]['name']),_0x535309=this[_0x4beb78(0x90c)](_0xa3922f);if(_0x535309&&(_0x535309[_0x4beb78(0x3f1)]!==''||_0x535309[_0x4beb78(0x780)]!=='')){if('sUZHI'===_0x4beb78(0x39b))return this[_0x4beb78(0x4aa)];else this[_0x4beb78(0x67b)]=new Sprite(ImageManager['loadTitle1'](_0x535309[_0x4beb78(0x3f1)])),this[_0x4beb78(0x86c)]=new Sprite(ImageManager[_0x4beb78(0x49e)](_0x535309[_0x4beb78(0x780)])),this[_0x4beb78(0x6fd)](this[_0x4beb78(0x67b)]),this['addChild'](this[_0x4beb78(0x86c)]),this[_0x4beb78(0x67b)][_0x4beb78(0x341)][_0x4beb78(0x6bf)](this['adjustSprite'][_0x4beb78(0x63b)](this,this['_backSprite1'])),this[_0x4beb78(0x86c)][_0x4beb78(0x341)][_0x4beb78(0x6bf)](this['adjustSprite'][_0x4beb78(0x63b)](this,this[_0x4beb78(0x86c)]));}},Scene_MenuBase['prototype'][_0x283c20(0x90c)]=function(_0x59c772){const _0x318d41=_0x283c20;return VisuMZ['CoreEngine']['Settings'][_0x318d41(0x276)][_0x59c772]||VisuMZ[_0x318d41(0x85a)][_0x318d41(0x914)][_0x318d41(0x276)][_0x318d41(0x200)];},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x576)]=function(_0x107c03){const _0x2faf03=_0x283c20;this[_0x2faf03(0x8ba)](_0x107c03),this[_0x2faf03(0x91e)](_0x107c03);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x13f)]=Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x2d8)],Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x2d8)]=function(){const _0x5d6650=_0x283c20;VisuMZ[_0x5d6650(0x85a)][_0x5d6650(0x13f)][_0x5d6650(0x5d8)](this),SceneManager['isSideButtonLayout']()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x54d)]=function(){const _0x179fcd=_0x283c20;this[_0x179fcd(0x8be)]['x']=Graphics[_0x179fcd(0x4ef)]+0x4;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7d6)]=Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x8dc)],Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x8dc)]=function(){const _0xced706=_0x283c20;VisuMZ[_0xced706(0x85a)][_0xced706(0x7d6)][_0xced706(0x5d8)](this),SceneManager[_0xced706(0x315)]()&&(_0xced706(0x443)===_0xced706(0x443)?this[_0xced706(0x706)]():(this[_0xced706(0x3c7)](this[_0xced706(0x27a)]),this['_subject']=null));},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x706)]=function(){const _0x2d252f=_0x283c20;this['_pageupButton']['x']=-0x1*(this['_pageupButton'][_0x2d252f(0x3d3)]+this[_0x2d252f(0x7c1)][_0x2d252f(0x3d3)]+0x8),this[_0x2d252f(0x7c1)]['x']=-0x1*(this[_0x2d252f(0x7c1)][_0x2d252f(0x3d3)]+0x4);},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x669)]=function(){const _0x45e755=_0x283c20;return VisuMZ[_0x45e755(0x85a)][_0x45e755(0x914)][_0x45e755(0x52f)][_0x45e755(0x883)];},Scene_MenuBase['prototype'][_0x283c20(0x6db)]=function(){const _0x3626ea=_0x283c20;return SceneManager[_0x3626ea(0x315)]()||SceneManager[_0x3626ea(0x358)]()?VisuMZ[_0x3626ea(0x85a)]['Settings'][_0x3626ea(0x52f)]['Location']:'button';},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x6d6)]=function(){const _0x5b4199=_0x283c20;if(!this[_0x5b4199(0x669)]())return;const _0x2cf798=this[_0x5b4199(0x18e)]();this[_0x5b4199(0x8a0)]=new Window_ButtonAssist(_0x2cf798),this[_0x5b4199(0x690)](this[_0x5b4199(0x8a0)]);},Scene_MenuBase[_0x283c20(0x44e)]['buttonAssistWindowRect']=function(){const _0x426d04=_0x283c20;return this[_0x426d04(0x6db)]()===_0x426d04(0x66a)?this[_0x426d04(0x11d)]():_0x426d04(0x54e)!==_0x426d04(0x54e)?_0x42b28e[_0x426d04(0x631)][_0x426d04(0x541)]['call'](this):this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x283c20(0x44e)][_0x283c20(0x11d)]=function(){const _0x23f686=_0x283c20,_0x507d56=ConfigManager[_0x23f686(0x6b0)]?(Sprite_Button[_0x23f686(0x44e)][_0x23f686(0x46d)]()+0x6)*0x2:0x0,_0x5808bc=this[_0x23f686(0x922)](),_0x1fbfa8=Graphics[_0x23f686(0x4ef)]-_0x507d56*0x2,_0x59fac9=this['buttonAreaHeight']();return new Rectangle(_0x507d56,_0x5808bc,_0x1fbfa8,_0x59fac9);},Scene_MenuBase[_0x283c20(0x44e)]['buttonAssistWindowSideRect']=function(){const _0x33587d=_0x283c20,_0x48068f=Graphics[_0x33587d(0x4ef)],_0x13585a=Window_ButtonAssist[_0x33587d(0x44e)]['lineHeight'](),_0x54f64e=0x0;let _0x5aefcc=0x0;if(this[_0x33587d(0x6db)]()==='top'){if(_0x33587d(0x777)!=='IicfS')return this[_0x33587d(0x3ce)][_0x33587d(0x8d6)]();else _0x5aefcc=0x0;}else{if('OcZkY'!=='OcZkY')return _0x4e15cf[_0x33587d(0x85a)][_0x33587d(0x914)][_0x33587d(0x5be)][_0x33587d(0x37d)];else _0x5aefcc=Graphics[_0x33587d(0x5d5)]-_0x13585a;}return new Rectangle(_0x54f64e,_0x5aefcc,_0x48068f,_0x13585a);},Scene_Menu[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['MenuLayout']['MainMenu'],VisuMZ['CoreEngine'][_0x283c20(0x13b)]=Scene_Menu[_0x283c20(0x44e)]['create'],Scene_Menu[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x234301=_0x283c20;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x234301(0x5d8)](this),this[_0x234301(0x606)]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2d3383=_0x283c20;this['_commandWindow']&&this['_commandWindow']['setBackgroundType'](Scene_Menu[_0x2d3383(0x631)][_0x2d3383(0x561)]);if(this[_0x2d3383(0x8e8)]){if(_0x2d3383(0x2e0)!==_0x2d3383(0x40f))this[_0x2d3383(0x8e8)][_0x2d3383(0x22a)](Scene_Menu[_0x2d3383(0x631)][_0x2d3383(0x33e)]);else return this[_0x2d3383(0x231)]();}this[_0x2d3383(0x747)]&&this[_0x2d3383(0x747)][_0x2d3383(0x22a)](Scene_Menu[_0x2d3383(0x631)][_0x2d3383(0x6df)]);},Scene_Menu['prototype'][_0x283c20(0x5f4)]=function(){const _0x528d5e=_0x283c20;return Scene_Menu['layoutSettings'][_0x528d5e(0x541)][_0x528d5e(0x5d8)](this);},Scene_Menu[_0x283c20(0x44e)]['goldWindowRect']=function(){const _0x461929=_0x283c20;return Scene_Menu['layoutSettings'][_0x461929(0x2c2)][_0x461929(0x5d8)](this);},Scene_Menu[_0x283c20(0x44e)]['statusWindowRect']=function(){const _0x112838=_0x283c20;return Scene_Menu[_0x112838(0x631)]['StatusRect'][_0x112838(0x5d8)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x283c20(0x85a)]['Settings'][_0x283c20(0x85e)][_0x283c20(0x369)],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x299)]=Scene_Item[_0x283c20(0x44e)][_0x283c20(0x338)],Scene_Item['prototype'][_0x283c20(0x338)]=function(){const _0x491992=_0x283c20;VisuMZ[_0x491992(0x85a)]['Scene_Item_create']['call'](this),this[_0x491992(0x606)]();},Scene_Item[_0x283c20(0x44e)][_0x283c20(0x606)]=function(){const _0x2aae66=_0x283c20;this[_0x2aae66(0x8a6)]&&this['_helpWindow'][_0x2aae66(0x22a)](Scene_Item[_0x2aae66(0x631)][_0x2aae66(0x539)]),this[_0x2aae66(0x446)]&&this[_0x2aae66(0x446)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x2aae66(0x1ad)]),this[_0x2aae66(0x2fd)]&&(_0x2aae66(0x246)!==_0x2aae66(0x246)?(this[_0x2aae66(0x67b)]=new _0x567a00(_0xbbeb42[_0x2aae66(0x464)](_0x4c6ef5[_0x2aae66(0x3f1)])),this[_0x2aae66(0x86c)]=new _0x458950(_0x261e48[_0x2aae66(0x49e)](_0x57fb5b[_0x2aae66(0x780)])),this[_0x2aae66(0x6fd)](this[_0x2aae66(0x67b)]),this[_0x2aae66(0x6fd)](this[_0x2aae66(0x86c)]),this[_0x2aae66(0x67b)][_0x2aae66(0x341)][_0x2aae66(0x6bf)](this[_0x2aae66(0x576)][_0x2aae66(0x63b)](this,this['_backSprite1'])),this[_0x2aae66(0x86c)][_0x2aae66(0x341)][_0x2aae66(0x6bf)](this[_0x2aae66(0x576)]['bind'](this,this[_0x2aae66(0x86c)]))):this['_itemWindow'][_0x2aae66(0x22a)](Scene_Item[_0x2aae66(0x631)][_0x2aae66(0x241)])),this[_0x2aae66(0x619)]&&this['_actorWindow']['setBackgroundType'](Scene_Item[_0x2aae66(0x631)][_0x2aae66(0x6c1)]);},Scene_Item['prototype'][_0x283c20(0x6e2)]=function(){const _0x100f49=_0x283c20;return Scene_Item[_0x100f49(0x631)]['HelpRect'][_0x100f49(0x5d8)](this);},Scene_Item[_0x283c20(0x44e)][_0x283c20(0x21c)]=function(){const _0x28a212=_0x283c20;return Scene_Item[_0x28a212(0x631)]['CategoryRect'][_0x28a212(0x5d8)](this);},Scene_Item[_0x283c20(0x44e)][_0x283c20(0x711)]=function(){const _0x597abe=_0x283c20;return Scene_Item[_0x597abe(0x631)][_0x597abe(0x402)][_0x597abe(0x5d8)](this);},Scene_Item[_0x283c20(0x44e)]['actorWindowRect']=function(){const _0x2d0da5=_0x283c20;return Scene_Item[_0x2d0da5(0x631)][_0x2d0da5(0x185)][_0x2d0da5(0x5d8)](this);},Scene_Skill[_0x283c20(0x631)]=VisuMZ['CoreEngine']['Settings'][_0x283c20(0x85e)]['SkillMenu'],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x15b)]=Scene_Skill[_0x283c20(0x44e)][_0x283c20(0x338)],Scene_Skill[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x4279af=_0x283c20;VisuMZ[_0x4279af(0x85a)]['Scene_Skill_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x283c20(0x44e)]['setCoreEngineUpdateWindowBg']=function(){const _0x4b61f0=_0x283c20;if(this[_0x4b61f0(0x8a6)]){if(_0x4b61f0(0x48b)==='GsVBa'){_0x281a89['ConvertParams'](_0x5e9386,_0x1fb5ad);const _0x1fa6c2=_0xf0416f[_0x4b61f0(0x86d)]||0x0;_0x54fd70['gainGold'](_0x1fa6c2);}else this[_0x4b61f0(0x8a6)][_0x4b61f0(0x22a)](Scene_Skill[_0x4b61f0(0x631)][_0x4b61f0(0x539)]);}if(this[_0x4b61f0(0x237)]){if(_0x4b61f0(0x2ea)===_0x4b61f0(0x420))return this[_0x4b61f0(0x111)]()[_0x4b61f0(0x51b)];else this[_0x4b61f0(0x237)]['setBackgroundType'](Scene_Skill['layoutSettings']['SkillTypeBgType']);}this[_0x4b61f0(0x747)]&&(_0x4b61f0(0x7ed)!==_0x4b61f0(0x7ed)?_0x41e41a['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x4b61f0(0x384)):this[_0x4b61f0(0x747)]['setBackgroundType'](Scene_Skill[_0x4b61f0(0x631)]['StatusBgType'])),this[_0x4b61f0(0x2fd)]&&this[_0x4b61f0(0x2fd)][_0x4b61f0(0x22a)](Scene_Skill[_0x4b61f0(0x631)][_0x4b61f0(0x241)]),this[_0x4b61f0(0x619)]&&this[_0x4b61f0(0x619)]['setBackgroundType'](Scene_Skill[_0x4b61f0(0x631)][_0x4b61f0(0x6c1)]);},Scene_Skill['prototype'][_0x283c20(0x6e2)]=function(){const _0x1fd707=_0x283c20;return Scene_Skill['layoutSettings']['HelpRect'][_0x1fd707(0x5d8)](this);},Scene_Skill[_0x283c20(0x44e)][_0x283c20(0x888)]=function(){const _0x59f976=_0x283c20;return Scene_Skill[_0x59f976(0x631)][_0x59f976(0x4cf)][_0x59f976(0x5d8)](this);},Scene_Skill[_0x283c20(0x44e)][_0x283c20(0x7f9)]=function(){const _0x41d00f=_0x283c20;return Scene_Skill[_0x41d00f(0x631)][_0x41d00f(0x154)][_0x41d00f(0x5d8)](this);},Scene_Skill['prototype'][_0x283c20(0x711)]=function(){const _0x1f23f0=_0x283c20;return Scene_Skill[_0x1f23f0(0x631)][_0x1f23f0(0x402)]['call'](this);},Scene_Skill[_0x283c20(0x44e)][_0x283c20(0x91a)]=function(){const _0x530ddd=_0x283c20;return Scene_Skill[_0x530ddd(0x631)][_0x530ddd(0x185)]['call'](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine'][_0x283c20(0x914)][_0x283c20(0x85e)]['EquipMenu'],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x17a)]=Scene_Equip[_0x283c20(0x44e)][_0x283c20(0x338)],Scene_Equip[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x45cde2=_0x283c20;VisuMZ['CoreEngine'][_0x45cde2(0x17a)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x283c20(0x606)]=function(){const _0x192df4=_0x283c20;this[_0x192df4(0x8a6)]&&(_0x192df4(0x33d)!==_0x192df4(0x33d)?_0x187975-=_0x4335ce[_0x192df4(0x44e)][_0x192df4(0x261)]():this[_0x192df4(0x8a6)][_0x192df4(0x22a)](Scene_Equip[_0x192df4(0x631)][_0x192df4(0x539)]));if(this['_statusWindow']){if(_0x192df4(0x24c)!==_0x192df4(0x1d9))this[_0x192df4(0x747)][_0x192df4(0x22a)](Scene_Equip[_0x192df4(0x631)][_0x192df4(0x6df)]);else return _0x323af2[_0x192df4(0x58c)][_0x192df4(0x5d8)](this);}this[_0x192df4(0x3ce)]&&this['_commandWindow']['setBackgroundType'](Scene_Equip[_0x192df4(0x631)][_0x192df4(0x561)]);if(this['_slotWindow']){if('gqbhh'===_0x192df4(0x370))this[_0x192df4(0x6e7)][_0x192df4(0x22a)](Scene_Equip[_0x192df4(0x631)][_0x192df4(0x3a8)]);else return this[_0x192df4(0x21f)]()[_0x192df4(0x68c)](_0x1f05ea=>this[_0x192df4(0x501)](_0x1f05ea)&&this[_0x192df4(0x25a)]()[_0x192df4(0x59d)](_0x1f05ea[_0x192df4(0x373)]));}this[_0x192df4(0x2fd)]&&this['_itemWindow']['setBackgroundType'](Scene_Equip['layoutSettings'][_0x192df4(0x241)]);},Scene_Equip[_0x283c20(0x44e)][_0x283c20(0x6e2)]=function(){const _0x50c8f9=_0x283c20;return Scene_Equip[_0x50c8f9(0x631)]['HelpRect'][_0x50c8f9(0x5d8)](this);},Scene_Equip[_0x283c20(0x44e)][_0x283c20(0x7f9)]=function(){const _0x1fec58=_0x283c20;return Scene_Equip['layoutSettings']['StatusRect'][_0x1fec58(0x5d8)](this);},Scene_Equip[_0x283c20(0x44e)]['commandWindowRect']=function(){const _0x12a0c2=_0x283c20;return Scene_Equip[_0x12a0c2(0x631)][_0x12a0c2(0x541)][_0x12a0c2(0x5d8)](this);},Scene_Equip['prototype'][_0x283c20(0x78f)]=function(){const _0x4497ae=_0x283c20;return Scene_Equip[_0x4497ae(0x631)][_0x4497ae(0x578)][_0x4497ae(0x5d8)](this);},Scene_Equip[_0x283c20(0x44e)][_0x283c20(0x711)]=function(){const _0x2cd4c6=_0x283c20;return Scene_Equip[_0x2cd4c6(0x631)][_0x2cd4c6(0x402)][_0x2cd4c6(0x5d8)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['MenuLayout'][_0x283c20(0x2d9)],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4e1)]=Scene_Status['prototype'][_0x283c20(0x338)],Scene_Status[_0x283c20(0x44e)]['create']=function(){const _0xa1f664=_0x283c20;VisuMZ[_0xa1f664(0x85a)][_0xa1f664(0x4e1)]['call'](this),this[_0xa1f664(0x606)]();},Scene_Status['prototype'][_0x283c20(0x606)]=function(){const _0x5a4ecc=_0x283c20;this['_profileWindow']&&this[_0x5a4ecc(0x3cc)]['setBackgroundType'](Scene_Status[_0x5a4ecc(0x631)][_0x5a4ecc(0x335)]),this['_statusWindow']&&this['_statusWindow'][_0x5a4ecc(0x22a)](Scene_Status['layoutSettings'][_0x5a4ecc(0x6df)]),this[_0x5a4ecc(0x477)]&&('LueZP'==='jzrOk'?this[_0x5a4ecc(0x54f)]&&(this[_0x5a4ecc(0x450)]-=this[_0x5a4ecc(0x23e)](),this[_0x5a4ecc(0x6a2)]()&&(this['_closing']=![])):this[_0x5a4ecc(0x477)]['setBackgroundType'](Scene_Status[_0x5a4ecc(0x631)][_0x5a4ecc(0x267)])),this['_statusEquipWindow']&&this['_statusEquipWindow'][_0x5a4ecc(0x22a)](Scene_Status[_0x5a4ecc(0x631)][_0x5a4ecc(0x56a)]);},Scene_Status[_0x283c20(0x44e)][_0x283c20(0x603)]=function(){const _0x1f9d18=_0x283c20;return Scene_Status[_0x1f9d18(0x631)][_0x1f9d18(0x7d8)][_0x1f9d18(0x5d8)](this);},Scene_Status[_0x283c20(0x44e)][_0x283c20(0x7f9)]=function(){const _0x228f73=_0x283c20;return Scene_Status['layoutSettings'][_0x228f73(0x154)][_0x228f73(0x5d8)](this);},Scene_Status[_0x283c20(0x44e)][_0x283c20(0x4ff)]=function(){const _0x2277f6=_0x283c20;return Scene_Status['layoutSettings'][_0x2277f6(0x715)][_0x2277f6(0x5d8)](this);},Scene_Status[_0x283c20(0x44e)][_0x283c20(0x396)]=function(){const _0x348166=_0x283c20;return Scene_Status['layoutSettings'][_0x348166(0x78d)][_0x348166(0x5d8)](this);},Scene_Options[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['MenuLayout'][_0x283c20(0x3d6)],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x4ec)]=Scene_Options['prototype']['create'],Scene_Options['prototype'][_0x283c20(0x338)]=function(){const _0x31d1fa=_0x283c20;VisuMZ['CoreEngine'][_0x31d1fa(0x4ec)][_0x31d1fa(0x5d8)](this),this[_0x31d1fa(0x606)]();},Scene_Options[_0x283c20(0x44e)][_0x283c20(0x606)]=function(){const _0x478e4d=_0x283c20;this[_0x478e4d(0x105)]&&this[_0x478e4d(0x105)][_0x478e4d(0x22a)](Scene_Options['layoutSettings'][_0x478e4d(0x733)]);},Scene_Options[_0x283c20(0x44e)][_0x283c20(0x932)]=function(){const _0x58454c=_0x283c20;return Scene_Options[_0x58454c(0x631)][_0x58454c(0x426)][_0x58454c(0x5d8)](this);},Scene_Save['layoutSettings']=VisuMZ['CoreEngine'][_0x283c20(0x914)][_0x283c20(0x85e)][_0x283c20(0x483)],Scene_Save['prototype'][_0x283c20(0x338)]=function(){const _0x44a230=_0x283c20;Scene_File[_0x44a230(0x44e)][_0x44a230(0x338)][_0x44a230(0x5d8)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x283c20(0x44e)][_0x283c20(0x606)]=function(){const _0x4575a6=_0x283c20;this[_0x4575a6(0x8a6)]&&this['_helpWindow'][_0x4575a6(0x22a)](Scene_Save[_0x4575a6(0x631)][_0x4575a6(0x539)]),this['_listWindow']&&this[_0x4575a6(0x1b4)][_0x4575a6(0x22a)](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save[_0x283c20(0x44e)][_0x283c20(0x6e2)]=function(){const _0xa5ad5e=_0x283c20;return Scene_Save[_0xa5ad5e(0x631)]['HelpRect']['call'](this);},Scene_Save[_0x283c20(0x44e)][_0x283c20(0x47c)]=function(){const _0x4aa80a=_0x283c20;return Scene_Save[_0x4aa80a(0x631)][_0x4aa80a(0x63d)][_0x4aa80a(0x5d8)](this);},Scene_Load[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x85e)][_0x283c20(0x673)],Scene_Load[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x1de889=_0x283c20;Scene_File[_0x1de889(0x44e)][_0x1de889(0x338)][_0x1de889(0x5d8)](this),this[_0x1de889(0x606)]();},Scene_Load['prototype'][_0x283c20(0x606)]=function(){const _0x3c5b16=_0x283c20;this[_0x3c5b16(0x8a6)]&&this[_0x3c5b16(0x8a6)][_0x3c5b16(0x22a)](Scene_Load['layoutSettings'][_0x3c5b16(0x539)]),this[_0x3c5b16(0x1b4)]&&this[_0x3c5b16(0x1b4)]['setBackgroundType'](Scene_Load[_0x3c5b16(0x631)][_0x3c5b16(0x523)]);},Scene_Load['prototype'][_0x283c20(0x6e2)]=function(){const _0x4b3a5c=_0x283c20;return Scene_Load[_0x4b3a5c(0x631)]['HelpRect'][_0x4b3a5c(0x5d8)](this);},Scene_Load[_0x283c20(0x44e)][_0x283c20(0x47c)]=function(){const _0x7fae9e=_0x283c20;return Scene_Load['layoutSettings'][_0x7fae9e(0x63d)][_0x7fae9e(0x5d8)](this);},Scene_GameEnd[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x85e)][_0x283c20(0x5eb)],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x48f)]=Scene_GameEnd['prototype'][_0x283c20(0x3d8)],Scene_GameEnd['prototype'][_0x283c20(0x3d8)]=function(){const _0x58d1d3=_0x283c20;Scene_MenuBase[_0x58d1d3(0x44e)][_0x58d1d3(0x3d8)][_0x58d1d3(0x5d8)](this);},Scene_GameEnd[_0x283c20(0x44e)][_0x283c20(0x3d4)]=function(){const _0x1bfea2=_0x283c20,_0x10a8ba=this['commandWindowRect']();this[_0x1bfea2(0x3ce)]=new Window_GameEnd(_0x10a8ba),this[_0x1bfea2(0x3ce)][_0x1bfea2(0x456)](_0x1bfea2(0x8aa),this[_0x1bfea2(0x204)][_0x1bfea2(0x63b)](this)),this[_0x1bfea2(0x690)](this[_0x1bfea2(0x3ce)]),this['_commandWindow'][_0x1bfea2(0x22a)](Scene_GameEnd[_0x1bfea2(0x631)][_0x1bfea2(0x561)]);},Scene_GameEnd[_0x283c20(0x44e)]['commandWindowRect']=function(){const _0x409946=_0x283c20;return Scene_GameEnd[_0x409946(0x631)][_0x409946(0x541)][_0x409946(0x5d8)](this);},Scene_Shop[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)]['Settings']['MenuLayout']['ShopMenu'],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x338)],Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x338)]=function(){const _0x3f64f3=_0x283c20;VisuMZ[_0x3f64f3(0x85a)][_0x3f64f3(0x1de)][_0x3f64f3(0x5d8)](this),this[_0x3f64f3(0x606)]();},Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x606)]=function(){const _0x50acd5=_0x283c20;this[_0x50acd5(0x8a6)]&&this['_helpWindow'][_0x50acd5(0x22a)](Scene_Shop[_0x50acd5(0x631)][_0x50acd5(0x539)]);if(this[_0x50acd5(0x8e8)]){if(_0x50acd5(0x115)===_0x50acd5(0x115))this[_0x50acd5(0x8e8)][_0x50acd5(0x22a)](Scene_Shop['layoutSettings']['GoldBgType']);else return this[_0x50acd5(0x601)]()?this[_0x50acd5(0x666)][_0x50acd5(0x2c0)](_0x4ec5e9):_0x4d9a47[_0x50acd5(0x44e)][_0x50acd5(0x232)][_0x50acd5(0x5d8)](this,_0x2dbd02);}this['_commandWindow']&&this[_0x50acd5(0x3ce)][_0x50acd5(0x22a)](Scene_Shop[_0x50acd5(0x631)][_0x50acd5(0x561)]),this[_0x50acd5(0x7a9)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x50acd5(0x631)][_0x50acd5(0x71f)]),this['_numberWindow']&&(_0x50acd5(0x1ab)===_0x50acd5(0x1ab)?this[_0x50acd5(0x1f0)][_0x50acd5(0x22a)](Scene_Shop[_0x50acd5(0x631)][_0x50acd5(0x61a)]):_0x442f9c[_0x50acd5(0x6f9)](!![])),this['_statusWindow']&&this[_0x50acd5(0x747)][_0x50acd5(0x22a)](Scene_Shop[_0x50acd5(0x631)][_0x50acd5(0x6df)]),this[_0x50acd5(0x8f0)]&&this[_0x50acd5(0x8f0)][_0x50acd5(0x22a)](Scene_Shop['layoutSettings'][_0x50acd5(0x67d)]),this['_categoryWindow']&&this[_0x50acd5(0x446)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x50acd5(0x1ad)]),this[_0x50acd5(0x125)]&&this['_sellWindow'][_0x50acd5(0x22a)](Scene_Shop[_0x50acd5(0x631)]['SellBgType']);},Scene_Shop[_0x283c20(0x44e)]['helpWindowRect']=function(){const _0x230523=_0x283c20;return Scene_Shop[_0x230523(0x631)]['HelpRect'][_0x230523(0x5d8)](this);},Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x41c)]=function(){const _0x38b11f=_0x283c20;return Scene_Shop[_0x38b11f(0x631)][_0x38b11f(0x2c2)]['call'](this);},Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x5f4)]=function(){const _0x34a1a5=_0x283c20;return Scene_Shop[_0x34a1a5(0x631)][_0x34a1a5(0x541)][_0x34a1a5(0x5d8)](this);},Scene_Shop['prototype']['dummyWindowRect']=function(){const _0x448538=_0x283c20;return Scene_Shop[_0x448538(0x631)]['DummyRect']['call'](this);},Scene_Shop[_0x283c20(0x44e)]['numberWindowRect']=function(){const _0x227466=_0x283c20;return Scene_Shop[_0x227466(0x631)][_0x227466(0x6d2)]['call'](this);},Scene_Shop['prototype'][_0x283c20(0x7f9)]=function(){const _0x3fa885=_0x283c20;return Scene_Shop['layoutSettings'][_0x3fa885(0x154)][_0x3fa885(0x5d8)](this);},Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x7b4)]=function(){const _0x5ac36e=_0x283c20;return Scene_Shop[_0x5ac36e(0x631)][_0x5ac36e(0x1a9)][_0x5ac36e(0x5d8)](this);},Scene_Shop[_0x283c20(0x44e)][_0x283c20(0x21c)]=function(){const _0x2e8d21=_0x283c20;return Scene_Shop[_0x2e8d21(0x631)][_0x2e8d21(0x39d)][_0x2e8d21(0x5d8)](this);},Scene_Shop[_0x283c20(0x44e)]['sellWindowRect']=function(){const _0x50a82e=_0x283c20;return Scene_Shop['layoutSettings']['SellRect'][_0x50a82e(0x5d8)](this);},Scene_Name[_0x283c20(0x631)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['MenuLayout']['NameMenu'],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x141)]=Scene_Name['prototype']['create'],Scene_Name['prototype']['create']=function(){const _0x4dfdb4=_0x283c20;VisuMZ[_0x4dfdb4(0x85a)][_0x4dfdb4(0x141)][_0x4dfdb4(0x5d8)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype'][_0x283c20(0x606)]=function(){const _0x16d2b3=_0x283c20;this[_0x16d2b3(0x5f9)]&&(_0x16d2b3(0x294)===_0x16d2b3(0x8ec)?(this['refresh'](),_0x15472c[_0x16d2b3(0x52d)](),this[_0x16d2b3(0x1fd)]==='default'?this[_0x16d2b3(0x623)](0x0):this[_0x16d2b3(0x623)](-0x1)):this['_editWindow'][_0x16d2b3(0x22a)](Scene_Name[_0x16d2b3(0x631)]['EditBgType'])),this[_0x16d2b3(0x2e7)]&&this['_inputWindow'][_0x16d2b3(0x22a)](Scene_Name[_0x16d2b3(0x631)]['InputBgType']);},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name['prototype']['editWindowRect']=function(){const _0x24fd83=_0x283c20;return Scene_Name['layoutSettings'][_0x24fd83(0x4f4)][_0x24fd83(0x5d8)](this);},Scene_Name[_0x283c20(0x44e)][_0x283c20(0x6e9)]=function(){const _0x40d501=_0x283c20;return Scene_Name[_0x40d501(0x631)][_0x40d501(0x625)][_0x40d501(0x5d8)](this);},Scene_Name['prototype'][_0x283c20(0x13c)]=function(){const _0x863f45=_0x283c20;if(!this[_0x863f45(0x2e7)])return![];return VisuMZ['CoreEngine']['Settings'][_0x863f45(0x1f7)]['EnableNameInput'];},Scene_Name[_0x283c20(0x44e)][_0x283c20(0x633)]=function(){const _0x3a5cdc=_0x283c20;if(this[_0x3a5cdc(0x13c)]())return TextManager['getInputButtonString'](_0x3a5cdc(0x677));else{if(_0x3a5cdc(0x292)!==_0x3a5cdc(0x289))return Scene_MenuBase[_0x3a5cdc(0x44e)][_0x3a5cdc(0x633)][_0x3a5cdc(0x5d8)](this);else{_0x3dd773&&_0x4c02fe&&_0x243a08[_0x3a5cdc(0x40d)]&&this[_0x3a5cdc(0x5ca)](_0x51eecc[_0x3a5cdc(0x40d)]);const _0x16ff5a=_0x1efd41[_0x130a79];if(_0x16ff5a){let _0x3e2f6e=_0x28b481[_0x3a5cdc(0x389)](_0x16ff5a['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x3e2f6e);}}}},Scene_Name[_0x283c20(0x44e)][_0x283c20(0x45f)]=function(){const _0x42aff3=_0x283c20;if(this[_0x42aff3(0x13c)]()){if(_0x42aff3(0x33b)===_0x42aff3(0x33b)){const _0x11244c=VisuMZ['CoreEngine'][_0x42aff3(0x914)][_0x42aff3(0x1f7)];if(this[_0x42aff3(0x2e7)][_0x42aff3(0x1fd)]===_0x42aff3(0x1df)){if(_0x42aff3(0x727)===_0x42aff3(0x727))return _0x11244c[_0x42aff3(0x4b7)]||_0x42aff3(0x4b7);else this[_0x42aff3(0x5ca)](_0xe3b21[_0x42aff3(0x40d)]);}else{if(_0x42aff3(0x2e8)===_0x42aff3(0x2e8))return _0x11244c[_0x42aff3(0x2eb)]||_0x42aff3(0x2eb);else _0x39fa21=_0x39a18e(_0x1bb8c1['$1'])*_0x2f4952['width'];}}else return'PTB';}else return Scene_MenuBase[_0x42aff3(0x44e)][_0x42aff3(0x45f)][_0x42aff3(0x5d8)](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x6a3)]=Scene_Name[_0x283c20(0x44e)][_0x283c20(0x6a0)],Scene_Name['prototype'][_0x283c20(0x6a0)]=function(){const _0x3ab35d=_0x283c20;this['doesNameContainBannedWords']()?'FCsUh'!==_0x3ab35d(0x29a)?this[_0x3ab35d(0x8c4)]('default'):this[_0x3ab35d(0x588)]():VisuMZ[_0x3ab35d(0x85a)][_0x3ab35d(0x6a3)]['call'](this);},Scene_Name[_0x283c20(0x44e)]['doesNameContainBannedWords']=function(){const _0x36baf6=_0x283c20,_0x55d3eb=VisuMZ['CoreEngine'][_0x36baf6(0x914)][_0x36baf6(0x1f7)];if(!_0x55d3eb)return![];const _0x222537=_0x55d3eb[_0x36baf6(0x583)];if(!_0x222537)return![];const _0x15126f=this[_0x36baf6(0x5f9)][_0x36baf6(0x3f0)]()['toLowerCase']();for(const _0x52fe32 of _0x222537){if(_0x15126f['includes'](_0x52fe32[_0x36baf6(0x155)]()))return!![];}return![];},Scene_Name[_0x283c20(0x44e)][_0x283c20(0x588)]=function(){const _0x184db1=_0x283c20;SoundManager[_0x184db1(0x129)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x19c)]=Scene_Battle['prototype']['update'],Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x118)]=function(){const _0x5cd7af=_0x283c20;VisuMZ[_0x5cd7af(0x85a)]['Scene_Battle_update'][_0x5cd7af(0x5d8)](this);if($gameTemp[_0x5cd7af(0x5e2)])this[_0x5cd7af(0x317)]();},Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x317)]=function(){const _0x2a31d5=_0x283c20;!BattleManager['isInputting']()&&!this[_0x2a31d5(0x768)]&&!$gameMessage[_0x2a31d5(0x39c)]()&&(this['_playtestF7Looping']=!![],this[_0x2a31d5(0x118)](),SceneManager['updateEffekseer'](),this[_0x2a31d5(0x768)]=![]);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x3de)]=Scene_Battle['prototype'][_0x283c20(0x2d8)],Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x2d8)]=function(){const _0x4849f7=_0x283c20;VisuMZ[_0x4849f7(0x85a)][_0x4849f7(0x3de)][_0x4849f7(0x5d8)](this),SceneManager[_0x4849f7(0x315)]()&&(_0x4849f7(0x325)!==_0x4849f7(0x4e8)?this[_0x4849f7(0x157)]():(_0x48902b[_0x4849f7(0x4f8)][0x23]='end',_0x4c5e07[_0x4849f7(0x4f8)][0x24]='home'));},Scene_Battle['prototype'][_0x283c20(0x157)]=function(){const _0xadc07e=_0x283c20;this[_0xadc07e(0x8be)]['x']=Graphics['boxWidth']+0x4,this[_0xadc07e(0x349)]()?_0xadc07e(0x1bb)===_0xadc07e(0x1bb)?this[_0xadc07e(0x8be)]['y']=Graphics[_0xadc07e(0x5d5)]-this[_0xadc07e(0x7a3)]():(_0x2c295c[_0xadc07e(0x44e)][_0xadc07e(0x7de)][_0xadc07e(0x5d8)](this),!_0x123bf9[_0xadc07e(0x4e0)](_0x5cf698)&&(this[_0xadc07e(0x7e2)]['update'](),this[_0xadc07e(0x11c)][_0xadc07e(0x910)](),this['_windowLayer'][_0xadc07e(0x6d8)]=![],_0x4be6ca['snapForBackground']()),_0x159f11[_0xadc07e(0x7db)](),this[_0xadc07e(0x407)]()):_0xadc07e(0x2ca)===_0xadc07e(0x795)?(_0x132f0c[_0xadc07e(0x85a)]['Scene_Boot_loadSystemImages'][_0xadc07e(0x5d8)](this),this[_0xadc07e(0x291)]()):this[_0xadc07e(0x8be)]['y']=0x0;},VisuMZ['CoreEngine'][_0x283c20(0x168)]=Sprite_Button[_0x283c20(0x44e)]['initialize'],Sprite_Button[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(_0xdc90f5){const _0x3f4dc4=_0x283c20;VisuMZ['CoreEngine'][_0x3f4dc4(0x168)][_0x3f4dc4(0x5d8)](this,_0xdc90f5),this[_0x3f4dc4(0x11f)]();},Sprite_Button[_0x283c20(0x44e)][_0x283c20(0x11f)]=function(){const _0x4210b7=_0x283c20,_0x325d27=VisuMZ[_0x4210b7(0x85a)][_0x4210b7(0x914)]['UI'];this[_0x4210b7(0x35d)]=![];switch(this[_0x4210b7(0x42d)]){case _0x4210b7(0x8aa):this[_0x4210b7(0x35d)]=!_0x325d27[_0x4210b7(0x58b)];break;case _0x4210b7(0x4d3):case _0x4210b7(0x8dd):this[_0x4210b7(0x35d)]=!_0x325d27[_0x4210b7(0x5bb)];break;case _0x4210b7(0x5c2):case'up':case _0x4210b7(0x740):case _0x4210b7(0x3ae):case'ok':this[_0x4210b7(0x35d)]=!_0x325d27[_0x4210b7(0x280)];break;case'menu':this[_0x4210b7(0x35d)]=!_0x325d27['menuShowButton'];break;}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7eb)]=Sprite_Button['prototype']['updateOpacity'],Sprite_Button[_0x283c20(0x44e)][_0x283c20(0x10e)]=function(){const _0x3816f6=_0x283c20;if(SceneManager['areButtonsHidden']()||this[_0x3816f6(0x35d)]){if(_0x3816f6(0x6b7)!==_0x3816f6(0x6b7)){if(this[_0x3816f6(0x1fd)]==='keyboard'&&!_0x4cd750[_0x3816f6(0x218)]())return;if(_0x3f523a[_0x3816f6(0x2aa)]())return;_0x4567c7['CoreEngine']['Window_NameInput_cursorRight'][_0x3816f6(0x5d8)](this,_0x3e90fb),this[_0x3816f6(0x8c4)](_0x3816f6(0x7f5));}else this[_0x3816f6(0x4e5)]();}else VisuMZ[_0x3816f6(0x85a)]['Sprite_Button_updateOpacity'][_0x3816f6(0x5d8)](this);},Sprite_Button[_0x283c20(0x44e)][_0x283c20(0x4e5)]=function(){const _0x510f5=_0x283c20;this[_0x510f5(0x6d8)]=![],this[_0x510f5(0x5cc)]=0x0,this['x']=Graphics[_0x510f5(0x3d3)]*0xa,this['y']=Graphics[_0x510f5(0x753)]*0xa;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x815)]=Sprite_Battler['prototype'][_0x283c20(0x252)],Sprite_Battler[_0x283c20(0x44e)][_0x283c20(0x252)]=function(_0x4f15ab,_0x502dd4,_0x2d62d0){const _0x243ef5=_0x283c20;if(this[_0x243ef5(0x832)]!==_0x4f15ab||this['_targetOffsetY']!==_0x502dd4){if(_0x243ef5(0x3aa)!==_0x243ef5(0x5d3))this[_0x243ef5(0x78c)](_0x243ef5(0x7bf)),this[_0x243ef5(0x4cc)]=_0x2d62d0;else return _0x1ff802;}VisuMZ[_0x243ef5(0x85a)]['Sprite_Battler_startMove'][_0x243ef5(0x5d8)](this,_0x4f15ab,_0x502dd4,_0x2d62d0);},Sprite_Battler[_0x283c20(0x44e)][_0x283c20(0x78c)]=function(_0x240385){this['_moveEasingType']=_0x240385;},Sprite_Battler[_0x283c20(0x44e)][_0x283c20(0x897)]=function(){const _0x1a0e4e=_0x283c20;if(this[_0x1a0e4e(0x786)]<=0x0)return;const _0x2731d3=this[_0x1a0e4e(0x786)],_0x17e7b7=this[_0x1a0e4e(0x4cc)],_0xb8cad9=this['_moveEasingType'];this['_offsetX']=this['applyEasing'](this[_0x1a0e4e(0x580)],this[_0x1a0e4e(0x832)],_0x2731d3,_0x17e7b7,_0xb8cad9),this[_0x1a0e4e(0x233)]=this[_0x1a0e4e(0x3e8)](this[_0x1a0e4e(0x233)],this[_0x1a0e4e(0x250)],_0x2731d3,_0x17e7b7,_0xb8cad9),this[_0x1a0e4e(0x786)]--;if(this[_0x1a0e4e(0x786)]<=0x0)this[_0x1a0e4e(0x23b)]();},Sprite_Battler[_0x283c20(0x44e)][_0x283c20(0x3e8)]=function(_0x30f4a1,_0x3e4e40,_0xcffddc,_0x24d105,_0x17104e){const _0x3e8b39=_0x283c20,_0x377484=VisuMZ[_0x3e8b39(0x2b6)]((_0x24d105-_0xcffddc)/_0x24d105,_0x17104e||'Linear'),_0x11733c=VisuMZ['ApplyEasing']((_0x24d105-_0xcffddc+0x1)/_0x24d105,_0x17104e||'Linear'),_0xc90eba=(_0x30f4a1-_0x3e4e40*_0x377484)/(0x1-_0x377484);return _0xc90eba+(_0x3e4e40-_0xc90eba)*_0x11733c;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x5f3)]=Sprite_Actor[_0x283c20(0x44e)][_0x283c20(0x1bc)],Sprite_Actor[_0x283c20(0x44e)][_0x283c20(0x1bc)]=function(_0x10882d){const _0x1fe68=_0x283c20;if(VisuMZ[_0x1fe68(0x85a)][_0x1fe68(0x914)]['UI'][_0x1fe68(0x2e4)]){if(_0x1fe68(0x630)===_0x1fe68(0x630))this['setActorHomeRepositioned'](_0x10882d);else return _0x87ec17['layoutSettings']['HelpRect'][_0x1fe68(0x5d8)](this);}else VisuMZ['CoreEngine'][_0x1fe68(0x5f3)][_0x1fe68(0x5d8)](this,_0x10882d);},Sprite_Actor[_0x283c20(0x44e)][_0x283c20(0x321)]=function(_0x493c03){const _0x3c9e5c=_0x283c20;let _0x1967b9=Math[_0x3c9e5c(0x4a8)](Graphics[_0x3c9e5c(0x3d3)]/0x2+0xc0);_0x1967b9-=Math['floor']((Graphics[_0x3c9e5c(0x3d3)]-Graphics[_0x3c9e5c(0x4ef)])/0x2),_0x1967b9+=_0x493c03*0x20;let _0x320a71=Graphics['height']-0xc8-$gameParty[_0x3c9e5c(0x128)]()*0x30;_0x320a71-=Math[_0x3c9e5c(0x214)]((Graphics[_0x3c9e5c(0x753)]-Graphics[_0x3c9e5c(0x5d5)])/0x2),_0x320a71+=_0x493c03*0x30,this[_0x3c9e5c(0x43f)](_0x1967b9,_0x320a71);},Sprite_Actor[_0x283c20(0x44e)][_0x283c20(0x1a8)]=function(){const _0x484774=_0x283c20;this[_0x484774(0x252)](0x4b0,0x0,0x78);},Sprite_Animation[_0x283c20(0x44e)][_0x283c20(0x1b2)]=function(_0x48b4cb){const _0x59540d=_0x283c20;this[_0x59540d(0x350)]=_0x48b4cb;},VisuMZ['CoreEngine'][_0x283c20(0x584)]=Sprite_Animation[_0x283c20(0x44e)]['processSoundTimings'],Sprite_Animation[_0x283c20(0x44e)][_0x283c20(0x919)]=function(){const _0x4fe1c2=_0x283c20;if(this[_0x4fe1c2(0x350)])return;VisuMZ[_0x4fe1c2(0x85a)][_0x4fe1c2(0x584)][_0x4fe1c2(0x5d8)](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x6b5)]=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x283c20(0x44e)][_0x283c20(0x1e1)]=function(_0x4017cd){const _0x27100c=_0x283c20;if(this[_0x27100c(0x48a)]())this[_0x27100c(0x77f)](_0x4017cd);else{if(_0x27100c(0x82e)!==_0x27100c(0x558))VisuMZ[_0x27100c(0x85a)]['Sprite_Animation_setViewport']['call'](this,_0x4017cd);else return _0x27100c(0x384);}},Sprite_Animation[_0x283c20(0x44e)]['isAnimationOffsetXMirrored']=function(){const _0x375f1a=_0x283c20;if(!this[_0x375f1a(0x554)])return![];const _0x523e74=this[_0x375f1a(0x554)][_0x375f1a(0x3f0)]||'';if(_0x523e74[_0x375f1a(0x312)](/<MIRROR OFFSET X>/i))return!![];if(_0x523e74['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x375f1a(0x85a)][_0x375f1a(0x914)][_0x375f1a(0x5be)][_0x375f1a(0x6be)];},Sprite_Animation['prototype'][_0x283c20(0x77f)]=function(_0x4e52a0){const _0x75e735=_0x283c20,_0x4d6eae=this[_0x75e735(0x783)],_0x191d21=this[_0x75e735(0x783)],_0xac8f3f=this[_0x75e735(0x554)][_0x75e735(0x29c)]*(this[_0x75e735(0x2c3)]?-0x1:0x1)-_0x4d6eae/0x2,_0x531c27=this['_animation'][_0x75e735(0x6cb)]-_0x191d21/0x2,_0x2ebe3d=this[_0x75e735(0x307)](_0x4e52a0);_0x4e52a0['gl']['viewport'](_0xac8f3f+_0x2ebe3d['x'],_0x531c27+_0x2ebe3d['y'],_0x4d6eae,_0x191d21);},Sprite_Animation[_0x283c20(0x44e)][_0x283c20(0x3d9)]=function(_0x15dee4){const _0x1d099f=_0x283c20;if(_0x15dee4[_0x1d099f(0x90f)]){}const _0xa404d5=this[_0x1d099f(0x554)][_0x1d099f(0x3f0)];let _0x82a098=_0x15dee4[_0x1d099f(0x753)]*_0x15dee4[_0x1d099f(0x53d)]['y'],_0x24b6b3=0x0,_0x2e5282=-_0x82a098/0x2;if(_0xa404d5[_0x1d099f(0x312)](/<(?:HEAD|HEADER|TOP)>/i))_0x2e5282=-_0x82a098;if(_0xa404d5[_0x1d099f(0x312)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2e5282=0x0;if(this['_animation'][_0x1d099f(0x632)])_0x2e5282=0x0;if(_0xa404d5[_0x1d099f(0x312)](/<(?:LEFT)>/i))_0x24b6b3=-_0x15dee4[_0x1d099f(0x3d3)]/0x2;if(_0xa404d5[_0x1d099f(0x312)](/<(?:RIGHT)>/i))_0x24b6b3=_0x15dee4[_0x1d099f(0x3d3)]/0x2;if(_0xa404d5['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x1d099f(0x7b0)!==_0x1d099f(0x7b0)){if(_0x27382c[_0x1d099f(0x28b)]==='')return![];if(_0x48460e[_0x1d099f(0x28b)]==='Subtitle')return![];if(_0x72672a[_0x1d099f(0x463)]==='')return![];if(_0x5a181a[_0x1d099f(0x463)]===_0x1d099f(0x863))return![];return!![];}else _0x24b6b3=Number(RegExp['$1'])*_0x15dee4['width'];}_0xa404d5[_0x1d099f(0x312)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1d099f(0x3dd)!==_0x1d099f(0x608)?_0x2e5282=(0x1-Number(RegExp['$1']))*-_0x82a098:this[_0x1d099f(0x44d)]=!![]);_0xa404d5[_0x1d099f(0x312)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x24b6b3=Number(RegExp['$1'])*_0x15dee4[_0x1d099f(0x3d3)],_0x2e5282=(0x1-Number(RegExp['$2']))*-_0x82a098);if(_0xa404d5[_0x1d099f(0x312)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x24b6b3+=Number(RegExp['$1']);if(_0xa404d5['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2e5282+=Number(RegExp['$1']);_0xa404d5[_0x1d099f(0x312)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x24b6b3+=Number(RegExp['$1']),_0x2e5282+=Number(RegExp['$2']));const _0x2159a3=new Point(_0x24b6b3,_0x2e5282);return _0x15dee4[_0x1d099f(0x7bc)](),_0x15dee4[_0x1d099f(0x2af)][_0x1d099f(0x2fb)](_0x2159a3);},Sprite_AnimationMV[_0x283c20(0x44e)][_0x283c20(0x1e3)]=function(){const _0x233167=_0x283c20;this[_0x233167(0x620)]=VisuMZ[_0x233167(0x85a)][_0x233167(0x914)][_0x233167(0x5be)][_0x233167(0x648)]??0x4,this['setupCustomRateCoreEngine'](),this['_rate']=this[_0x233167(0x620)]['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x283c20(0x44e)][_0x283c20(0x46b)]=function(){const _0x225c65=_0x283c20;if(!this[_0x225c65(0x554)]);const _0x256531=this[_0x225c65(0x554)][_0x225c65(0x3f0)]||'';_0x256531[_0x225c65(0x312)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)[_0x225c65(0x4f9)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x283c20(0x1b2)]=function(_0x25ceb7){const _0x5ae914=_0x283c20;this[_0x5ae914(0x350)]=_0x25ceb7;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x32b)]=Sprite_AnimationMV[_0x283c20(0x44e)][_0x283c20(0x357)],Sprite_AnimationMV['prototype'][_0x283c20(0x357)]=function(_0x4c6e74){const _0x963c7a=_0x283c20;if(this[_0x963c7a(0x350)]){if(_0x963c7a(0x7fb)!==_0x963c7a(0x2b9))_0x4c6e74=JsonEx[_0x963c7a(0x32c)](_0x4c6e74),_0x4c6e74['se']&&('SgdMA'===_0x963c7a(0x7b9)?(_0x1689a8+=_0x38370e,_0x57ee05+='%1〘Choice\x20%2〙\x20%3%1'[_0x963c7a(0x520)](_0x51534f,_0x432d80['parameters'][0x0]+0x1,_0x221622[_0x963c7a(0x263)][0x1])):_0x4c6e74['se']['volume']=0x0);else{if(this[_0x963c7a(0x41f)]===_0x2b96f7)this[_0x963c7a(0x22e)]();if(this['_CoreEngineSettings'][_0x963c7a(0x80f)]===_0x2879fe)this['resetBattleSystem']();this[_0x963c7a(0x41f)][_0x963c7a(0x80f)]=_0x2ad26f;}}VisuMZ[_0x963c7a(0x85a)]['Sprite_AnimationMV_processTimingData'][_0x963c7a(0x5d8)](this,_0x4c6e74);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x1ce)]=Sprite_AnimationMV[_0x283c20(0x44e)][_0x283c20(0x804)],Sprite_AnimationMV[_0x283c20(0x44e)]['updatePosition']=function(){const _0x2c511d=_0x283c20;VisuMZ[_0x2c511d(0x85a)][_0x2c511d(0x1ce)][_0x2c511d(0x5d8)](this);if(this[_0x2c511d(0x554)][_0x2c511d(0x5e8)]===0x3){if(this['x']===0x0)this['x']=Math[_0x2c511d(0x4a8)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x2c511d(0x4a8)](Graphics['height']/0x2);}},Sprite_Damage['prototype'][_0x283c20(0x70e)]=function(_0x52ac14){const _0x2271c7=_0x283c20;let _0x28915c=Math[_0x2271c7(0x568)](_0x52ac14)[_0x2271c7(0x5a9)]();this[_0x2271c7(0x92e)]()&&(_0x28915c=VisuMZ[_0x2271c7(0x10c)](_0x28915c));const _0x15c4d3=this['fontSize'](),_0x5aff32=Math[_0x2271c7(0x214)](_0x15c4d3*0.75);for(let _0x523d1a=0x0;_0x523d1a<_0x28915c[_0x2271c7(0x6a1)];_0x523d1a++){const _0x49dc28=this[_0x2271c7(0x50a)](_0x5aff32,_0x15c4d3);_0x49dc28[_0x2271c7(0x341)][_0x2271c7(0x367)](_0x28915c[_0x523d1a],0x0,0x0,_0x5aff32,_0x15c4d3,'center'),_0x49dc28['x']=(_0x523d1a-(_0x28915c['length']-0x1)/0x2)*_0x5aff32,_0x49dc28['dy']=-_0x523d1a;}},Sprite_Damage[_0x283c20(0x44e)][_0x283c20(0x92e)]=function(){const _0x5cba1f=_0x283c20;return VisuMZ[_0x5cba1f(0x85a)][_0x5cba1f(0x914)][_0x5cba1f(0x5be)][_0x5cba1f(0x37d)];},Sprite_Damage[_0x283c20(0x44e)][_0x283c20(0x7c6)]=function(){const _0x57d92e=_0x283c20;return ColorManager[_0x57d92e(0x915)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x497)]=Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x2f3)],Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x2f3)]=function(){const _0x5be15d=_0x283c20;return VisuMZ[_0x5be15d(0x85a)][_0x5be15d(0x497)][_0x5be15d(0x5d8)](this)['clamp'](0x0,0x1);},VisuMZ[_0x283c20(0x85a)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x283c20(0x44e)]['currentValue'],Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x6ad)]=function(){const _0x53cdf6=_0x283c20;let _0x40b211=VisuMZ[_0x53cdf6(0x85a)][_0x53cdf6(0x723)][_0x53cdf6(0x5d8)](this);return _0x40b211;},Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x3f6)]=function(){const _0x1284f9=_0x283c20;let _0x432099=this['currentValue']();if(this['useDigitGrouping']()){if('cCqbR'!==_0x1284f9(0x638))_0x432099=VisuMZ['GroupDigits'](_0x432099);else{const _0x28ad6e=this['getCombinedScrollingText']();return _0x28ad6e[_0x1284f9(0x312)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x28ad6e):_0x57f865[_0x1284f9(0x85a)]['Game_Interpreter_command105'][_0x1284f9(0x5d8)](this,_0x217a1b);}}const _0x26c419=this['bitmapWidth']()-0x1,_0x4f248b=this['textHeight']?this[_0x1284f9(0x864)]():this[_0x1284f9(0x8e4)]();this[_0x1284f9(0x808)](),this[_0x1284f9(0x341)][_0x1284f9(0x367)](_0x432099,0x0,0x0,_0x26c419,_0x4f248b,_0x1284f9(0x15d));},Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x2e5)]=function(){return 0x3;},Sprite_Gauge[_0x283c20(0x44e)][_0x283c20(0x92e)]=function(){const _0x56d76a=_0x283c20;return VisuMZ[_0x56d76a(0x85a)]['Settings'][_0x56d76a(0x5be)]['DigitGroupingGaugeSprites'];},Sprite_Gauge['prototype'][_0x283c20(0x7c6)]=function(){const _0x22890e=_0x283c20;return ColorManager[_0x22890e(0x88b)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x16d)]=Sprite_Picture[_0x283c20(0x44e)][_0x283c20(0x803)],Sprite_Picture[_0x283c20(0x44e)][_0x283c20(0x803)]=function(){const _0x3ae05d=_0x283c20;this['_pictureName']['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x3ae05d(0x3f5)](Number(RegExp['$1'])):VisuMZ[_0x3ae05d(0x85a)][_0x3ae05d(0x16d)][_0x3ae05d(0x5d8)](this);},Sprite_Picture[_0x283c20(0x44e)][_0x283c20(0x3f5)]=function(_0x21c780){const _0x243bc8=_0x283c20,_0x504457=ImageManager['iconWidth'],_0x414ae1=ImageManager['iconHeight'],_0x52a599=this[_0x243bc8(0x3f4)][_0x243bc8(0x312)](/SMOOTH/i);this[_0x243bc8(0x341)]=new Bitmap(_0x504457,_0x414ae1);const _0x4c887e=ImageManager[_0x243bc8(0x79b)](_0x243bc8(0x29b)),_0x52f57d=_0x21c780%0x10*_0x504457,_0x232257=Math[_0x243bc8(0x214)](_0x21c780/0x10)*_0x414ae1;this[_0x243bc8(0x341)][_0x243bc8(0x4e9)]=_0x52a599,this[_0x243bc8(0x341)][_0x243bc8(0x6d5)](_0x4c887e,_0x52f57d,_0x232257,_0x504457,_0x414ae1,0x0,0x0,_0x504457,_0x414ae1);};function _0xfbd7(_0x29e5ed,_0x31f394){const _0x1e9220=_0x1e92();return _0xfbd7=function(_0xfbd7fd,_0x255068){_0xfbd7fd=_0xfbd7fd-0xfd;let _0x289f80=_0x1e9220[_0xfbd7fd];return _0x289f80;},_0xfbd7(_0x29e5ed,_0x31f394);}function Sprite_TitlePictureButton(){const _0xa449f3=_0x283c20;this[_0xa449f3(0x3a9)](...arguments);}Sprite_TitlePictureButton[_0x283c20(0x44e)]=Object[_0x283c20(0x338)](Sprite_Clickable[_0x283c20(0x44e)]),Sprite_TitlePictureButton['prototype'][_0x283c20(0x7ff)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(_0x478b50){const _0xdbac61=_0x283c20;Sprite_Clickable[_0xdbac61(0x44e)][_0xdbac61(0x3a9)][_0xdbac61(0x5d8)](this),this['_data']=_0x478b50,this['_clickHandler']=null,this[_0xdbac61(0x91f)]();},Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x91f)]=function(){const _0x3bcb89=_0x283c20;this['x']=Graphics['width'],this['y']=Graphics[_0x3bcb89(0x753)],this['visible']=![],this[_0x3bcb89(0x88a)]();},Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x88a)]=function(){const _0x4d657b=_0x283c20;this[_0x4d657b(0x341)]=ImageManager[_0x4d657b(0x842)](this[_0x4d657b(0x7ce)]['PictureFilename']),this[_0x4d657b(0x341)][_0x4d657b(0x6bf)](this['onButtonImageLoad']['bind'](this));},Sprite_TitlePictureButton[_0x283c20(0x44e)]['onButtonImageLoad']=function(){const _0x15fcf4=_0x283c20;this[_0x15fcf4(0x7ce)]['OnLoadJS']['call'](this),this[_0x15fcf4(0x7ce)]['PositionJS'][_0x15fcf4(0x5d8)](this),this[_0x15fcf4(0x859)](this['_data'][_0x15fcf4(0x518)][_0x15fcf4(0x63b)](this));},Sprite_TitlePictureButton['prototype'][_0x283c20(0x118)]=function(){const _0x32daea=_0x283c20;Sprite_Clickable['prototype'][_0x32daea(0x118)]['call'](this),this[_0x32daea(0x10e)](),this[_0x32daea(0x34f)]();},Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x1e7)]=function(){const _0x44262d=_0x283c20;return VisuMZ[_0x44262d(0x85a)][_0x44262d(0x914)][_0x44262d(0x85e)][_0x44262d(0x470)][_0x44262d(0x3e1)];},Sprite_TitlePictureButton[_0x283c20(0x44e)]['updateOpacity']=function(){const _0x2b0eb9=_0x283c20;if(this[_0x2b0eb9(0x81b)]||this[_0x2b0eb9(0x2f8)])_0x2b0eb9(0x513)!==_0x2b0eb9(0x69a)?this[_0x2b0eb9(0x5cc)]=0xff:this[_0x2b0eb9(0x901)](_0xd8d3ef['min'](this['index'](),0x0));else{if(_0x2b0eb9(0x84b)!=='XadwL')return _0x2f6cd1[_0x2b0eb9(0x85a)][_0x2b0eb9(0x914)]['Color'][_0x2b0eb9(0x567)];else this[_0x2b0eb9(0x5cc)]+=this['visible']?this[_0x2b0eb9(0x1e7)]():-0x1*this[_0x2b0eb9(0x1e7)](),this['opacity']=Math['min'](0xc0,this[_0x2b0eb9(0x5cc)]);}},Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x859)]=function(_0x599d33){const _0x1f10bc=_0x283c20;this[_0x1f10bc(0x1b8)]=_0x599d33;},Sprite_TitlePictureButton[_0x283c20(0x44e)][_0x283c20(0x1a2)]=function(){const _0x17c184=_0x283c20;this[_0x17c184(0x1b8)]&&(_0x17c184(0x1e9)===_0x17c184(0x53a)?this[_0x17c184(0x38f)]=0x1:this[_0x17c184(0x1b8)]());},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x482)]=Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x3a9)],Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x12eac3=_0x283c20;VisuMZ[_0x12eac3(0x85a)][_0x12eac3(0x482)][_0x12eac3(0x5d8)](this),this[_0x12eac3(0x562)]();},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x562)]=function(){const _0x369fd3=_0x283c20;this[_0x369fd3(0x4cb)]=[],this['_pointAnimationSprites']=[],this[_0x369fd3(0x50d)]=this[_0x369fd3(0x53d)]['x'],this[_0x369fd3(0x419)]=this[_0x369fd3(0x53d)]['y'];},VisuMZ['CoreEngine'][_0x283c20(0x66c)]=Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x2a1)],Spriteset_Base[_0x283c20(0x44e)]['destroy']=function(_0x46b644){const _0x2d0fa5=_0x283c20;this[_0x2d0fa5(0x704)](),this[_0x2d0fa5(0x8d5)](),VisuMZ[_0x2d0fa5(0x85a)][_0x2d0fa5(0x66c)][_0x2d0fa5(0x5d8)](this,_0x46b644);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x80a)]=Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x118)],Spriteset_Base[_0x283c20(0x44e)]['update']=function(){const _0x219619=_0x283c20;VisuMZ[_0x219619(0x85a)][_0x219619(0x80a)][_0x219619(0x5d8)](this),this[_0x219619(0x23c)](),this[_0x219619(0x5ee)](),this[_0x219619(0x5c3)]();},Spriteset_Base['prototype'][_0x283c20(0x23c)]=function(){const _0x57eefe=_0x283c20;if(!VisuMZ[_0x57eefe(0x85a)][_0x57eefe(0x914)][_0x57eefe(0x5be)][_0x57eefe(0x6a9)])return;if(this[_0x57eefe(0x50d)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x57eefe(0x53d)]['y'])return;this[_0x57eefe(0x336)](),this[_0x57eefe(0x50d)]=this[_0x57eefe(0x53d)]['x'],this[_0x57eefe(0x419)]=this['scale']['y'];},Spriteset_Base[_0x283c20(0x44e)]['adjustPictureAntiZoom']=function(){const _0x1070c7=_0x283c20;if(SceneManager[_0x1070c7(0x4e2)]()&&Spriteset_Map[_0x1070c7(0x75a)])return;else{if(SceneManager[_0x1070c7(0x24e)]()&&Spriteset_Battle[_0x1070c7(0x75a)])return;}this[_0x1070c7(0x53d)]['x']!==0x0&&(this[_0x1070c7(0x8e7)][_0x1070c7(0x53d)]['x']=0x1/this[_0x1070c7(0x53d)]['x'],this[_0x1070c7(0x8e7)]['x']=-(this['x']/this['scale']['x'])),this['scale']['y']!==0x0&&(this['_pictureContainer'][_0x1070c7(0x53d)]['y']=0x1/this[_0x1070c7(0x53d)]['y'],this[_0x1070c7(0x8e7)]['y']=-(this['y']/this[_0x1070c7(0x53d)]['y']));},VisuMZ['CoreEngine'][_0x283c20(0x64d)]=Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x804)],Spriteset_Base[_0x283c20(0x44e)]['updatePosition']=function(){const _0x540fa6=_0x283c20;VisuMZ[_0x540fa6(0x85a)][_0x540fa6(0x64d)]['call'](this),this[_0x540fa6(0x2b8)]();},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x2b8)]=function(){const _0x4f4798=_0x283c20;if(!$gameScreen)return;if($gameScreen[_0x4f4798(0x7d7)]<=0x0)return;this['x']-=Math[_0x4f4798(0x4a8)]($gameScreen[_0x4f4798(0x828)]());const _0x15d33d=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x4f4798(0x1dc)]()){case _0x4f4798(0x73c):this['updatePositionCoreEngineShakeOriginal']();break;case _0x4f4798(0x6d4):this['updatePositionCoreEngineShakeHorz']();break;case _0x4f4798(0x2ce):this[_0x4f4798(0x77e)]();break;default:this[_0x4f4798(0x664)]();break;}},Spriteset_Base[_0x283c20(0x44e)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x1ff258=_0x283c20,_0x66e905=VisuMZ['CoreEngine'][_0x1ff258(0x914)]['ScreenShake'];if(_0x66e905&&_0x66e905['originalJS'])return _0x66e905['originalJS']['call'](this);this['x']+=Math[_0x1ff258(0x4a8)]($gameScreen['shake']());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x55ed7b=_0x283c20,_0x45ccb=VisuMZ[_0x55ed7b(0x85a)][_0x55ed7b(0x914)][_0x55ed7b(0x441)];if(_0x45ccb&&_0x45ccb[_0x55ed7b(0x726)])return _0x45ccb[_0x55ed7b(0x726)]['call'](this);const _0x1a4bb2=$gameScreen[_0x55ed7b(0x5fe)]*0.75,_0x47e198=$gameScreen[_0x55ed7b(0x15f)]*0.6,_0x36c2fa=$gameScreen[_0x55ed7b(0x7d7)];this['x']+=Math['round'](Math[_0x55ed7b(0x35e)](_0x1a4bb2)-Math[_0x55ed7b(0x35e)](_0x47e198))*(Math[_0x55ed7b(0x8f4)](_0x36c2fa,0x1e)*0.5),this['y']+=Math['round'](Math[_0x55ed7b(0x35e)](_0x1a4bb2)-Math['randomInt'](_0x47e198))*(Math['min'](_0x36c2fa,0x1e)*0.5);},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x352)]=function(){const _0x2ad439=_0x283c20,_0x1fa9fa=VisuMZ[_0x2ad439(0x85a)][_0x2ad439(0x914)][_0x2ad439(0x441)];if(_0x1fa9fa&&_0x1fa9fa[_0x2ad439(0x2ad)]){if(_0x2ad439(0x117)!=='vIUrA'){const _0x9b3c3a=_0x43d4f3[_0x2ad439(0x3a7)],_0x515b18=_0xe75467[_0x2ad439(0x1b7)],_0xafa1e7=_0x3d61c0[_0x2ad439(0x3cf)],_0x1242d8=_0x17cda6['Type'],_0x176c2c=new _0x514fe4(_0x2f4330[_0x2ad439(0x461)]);_0x44d872[_0x2ad439(0x85a)][_0x2ad439(0x481)][_0x9b3c3a[_0x2ad439(0x287)]()[_0x2ad439(0x538)]()]=_0x515b18,_0x3dd1c8[_0x2ad439(0x85a)][_0x2ad439(0x5c9)][_0x9b3c3a[_0x2ad439(0x287)]()[_0x2ad439(0x538)]()]=_0xafa1e7,_0x1c07a3[_0x2ad439(0x85a)][_0x2ad439(0x2c6)][_0x9b3c3a[_0x2ad439(0x287)]()[_0x2ad439(0x538)]()]=_0x1242d8,_0x4af4ac[_0x2ad439(0x85a)]['CustomParamAbb'][_0x9b3c3a[_0x2ad439(0x287)]()[_0x2ad439(0x538)]()]=_0x9b3c3a,_0x3a6de8['defineProperty'](_0x3d93b4[_0x2ad439(0x44e)],_0x9b3c3a,{'get'(){const _0x29a330=_0x176c2c['call'](this);return _0x1242d8==='integer'?_0x5d104e['round'](_0x29a330):_0x29a330;}});}else return _0x1fa9fa[_0x2ad439(0x2ad)][_0x2ad439(0x5d8)](this);}const _0x53e0bf=$gameScreen[_0x2ad439(0x5fe)]*0.75,_0x249a48=$gameScreen['_shakeSpeed']*0.6,_0x362da0=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x2ad439(0x35e)](_0x53e0bf)-Math[_0x2ad439(0x35e)](_0x249a48))*(Math[_0x2ad439(0x8f4)](_0x362da0,0x1e)*0.5);},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x77e)]=function(){const _0x4e3810=_0x283c20,_0x326d58=VisuMZ[_0x4e3810(0x85a)][_0x4e3810(0x914)][_0x4e3810(0x441)];if(_0x326d58&&_0x326d58[_0x4e3810(0x8cc)]){if(_0x4e3810(0x843)===_0x4e3810(0x7f2))this[_0x4e3810(0x4e6)](_0x161662);else return _0x326d58[_0x4e3810(0x8cc)][_0x4e3810(0x5d8)](this);}const _0x3e42f6=$gameScreen[_0x4e3810(0x5fe)]*0.75,_0xaea059=$gameScreen['_shakeSpeed']*0.6,_0x5f4cae=$gameScreen[_0x4e3810(0x7d7)];this['y']+=Math[_0x4e3810(0x4a8)](Math['randomInt'](_0x3e42f6)-Math['randomInt'](_0xaea059))*(Math[_0x4e3810(0x8f4)](_0x5f4cae,0x1e)*0.5);},Spriteset_Base['prototype'][_0x283c20(0x5ee)]=function(){const _0x299074=_0x283c20;for(const _0xd396fe of this['_fauxAnimationSprites']){if(!_0xd396fe['isPlaying']()){if('hqbSm'===_0x299074(0x855)){if(this[_0x299074(0x896)]['isForFriend']())return![];return _0x440f95[_0x299074(0x85a)][_0x299074(0x7f6)][_0x299074(0x5d8)](this,_0x571e3d);}else this[_0x299074(0x549)](_0xd396fe);}}this[_0x299074(0x16f)]();},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x16f)]=function(){const _0x2e8abb=_0x283c20;for(;;){const _0x1e01ef=$gameTemp[_0x2e8abb(0x8d9)]();if(_0x1e01ef)this[_0x2e8abb(0x1f6)](_0x1e01ef);else break;}},Spriteset_Base[_0x283c20(0x44e)]['createFauxAnimation']=function(_0x264cf8){const _0x46be99=_0x283c20,_0x4274a4=$dataAnimations[_0x264cf8[_0x46be99(0x3fc)]],_0x5704a5=_0x264cf8[_0x46be99(0x410)],_0x3133bc=_0x264cf8['mirror'],_0x204fdd=_0x264cf8[_0x46be99(0x8cd)];let _0x3bc258=this[_0x46be99(0x68b)]();const _0x1b8dce=this[_0x46be99(0x6fa)]();if(this[_0x46be99(0x59c)](_0x4274a4))for(const _0x1600db of _0x5704a5){this['createFauxAnimationSprite']([_0x1600db],_0x4274a4,_0x3133bc,_0x3bc258,_0x204fdd),_0x3bc258+=_0x1b8dce;}else _0x46be99(0x699)!=='vgAbe'?this[_0x46be99(0x5fd)](_0x5704a5,_0x4274a4,_0x3133bc,_0x3bc258,_0x204fdd):_0x2b5620[_0x46be99(0x91c)]&&(this['_forcedBattleSys']=_0x46be99(0x3af));},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x5fd)]=function(_0x29978a,_0x10c014,_0x54fc13,_0x3df9a3,_0xf0f03a){const _0x24cfe8=_0x283c20,_0x516a65=this[_0x24cfe8(0x553)](_0x10c014),_0x159709=new(_0x516a65?Sprite_AnimationMV:Sprite_Animation)(),_0x5be091=this['makeTargetSprites'](_0x29978a);this[_0x24cfe8(0x2b3)](_0x29978a[0x0])&&(_0x54fc13=!_0x54fc13),_0x159709[_0x24cfe8(0x22d)]=_0x29978a,_0x159709[_0x24cfe8(0x91f)](_0x5be091,_0x10c014,_0x54fc13,_0x3df9a3),_0x159709[_0x24cfe8(0x1b2)](_0xf0f03a),this['_effectsContainer'][_0x24cfe8(0x6fd)](_0x159709),this[_0x24cfe8(0x4cb)][_0x24cfe8(0x163)](_0x159709);},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x549)]=function(_0x1ec8d0){const _0x2caa18=_0x283c20;this[_0x2caa18(0x4cb)][_0x2caa18(0x438)](_0x1ec8d0),this[_0x2caa18(0x21a)][_0x2caa18(0x521)](_0x1ec8d0);for(const _0x230c97 of _0x1ec8d0[_0x2caa18(0x22d)]){if(_0x230c97['endAnimation']){if(_0x2caa18(0x41b)===_0x2caa18(0x222))return _0x3a593d[_0x2caa18(0x631)][_0x2caa18(0x715)][_0x2caa18(0x5d8)](this);else _0x230c97['endAnimation']();}}_0x1ec8d0['destroy']();},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x704)]=function(){const _0x54d3c1=_0x283c20;for(const _0x51a023 of this[_0x54d3c1(0x4cb)]){if(_0x54d3c1(0x4be)!=='bPIap')return _0x3e9f39[_0x54d3c1(0x3b7)]()['canUse'](_0x4d80c9);else this['removeFauxAnimation'](_0x51a023);}},Spriteset_Base['prototype'][_0x283c20(0x7e4)]=function(){const _0x4a000e=_0x283c20;return this['_fauxAnimationSprites'][_0x4a000e(0x6a1)]>0x0;},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x5c3)]=function(){const _0x5d5dbc=_0x283c20;for(const _0x525048 of this[_0x5d5dbc(0x34b)]){!_0x525048[_0x5d5dbc(0x3fd)]()&&this['removePointAnimation'](_0x525048);}this[_0x5d5dbc(0x210)]();},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x210)]=function(){const _0x1ae59e=_0x283c20;for(;;){const _0x4b1a3f=$gameTemp['retrievePointAnimation']();if(_0x4b1a3f){if(_0x1ae59e(0x8ff)!==_0x1ae59e(0x5b4))this[_0x1ae59e(0x913)](_0x4b1a3f);else return _0x1ae59e(0x3af);}else break;}},Spriteset_Base['prototype'][_0x283c20(0x913)]=function(_0x455400){const _0x5ea616=_0x283c20,_0x14e383=$dataAnimations[_0x455400[_0x5ea616(0x3fc)]],_0x2ee612=this[_0x5ea616(0x771)](_0x455400),_0xfee43b=_0x455400[_0x5ea616(0x20b)],_0x460c75=_0x455400[_0x5ea616(0x8cd)];let _0x30412a=this[_0x5ea616(0x68b)]();const _0x1da899=this[_0x5ea616(0x6fa)]();if(this['isAnimationForEach'](_0x14e383))for(const _0x569f25 of _0x2ee612){this[_0x5ea616(0x281)]([_0x569f25],_0x14e383,_0xfee43b,_0x30412a,_0x460c75),_0x30412a+=_0x1da899;}else{if('tDlxH'!==_0x5ea616(0x8ab)){const _0x24bcc0=[_0x5ea616(0x7e8),_0x5ea616(0x2f2),_0x5ea616(0x272),_0x5ea616(0x469),'enemies',_0x5ea616(0x3b5),'parallaxes','pictures',_0x5ea616(0x82c),'sv_enemies',_0x5ea616(0x1aa),'tilesets',_0x5ea616(0x685),_0x5ea616(0x30d)];for(const _0x575032 of _0x24bcc0){const _0x4ba6da=_0x1deda8[_0x5ea616(0x85a)]['Settings'][_0x5ea616(0x4d7)][_0x575032],_0x51ab22=_0x5ea616(0x270)[_0x5ea616(0x520)](_0x575032);for(const _0x3a7e4e of _0x4ba6da){_0x2acf37[_0x5ea616(0x803)](_0x51ab22,_0x3a7e4e);}}}else this[_0x5ea616(0x281)](_0x2ee612,_0x14e383,_0xfee43b,_0x30412a,_0x460c75);}},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x771)]=function(_0xb6d8b4){const _0x29bcf7=_0x283c20,_0x255aac=new Sprite_Clickable();_0x255aac['x']=_0xb6d8b4['x'],_0x255aac['y']=_0xb6d8b4['y'],_0x255aac['z']=0x64;const _0x3824ff=this[_0x29bcf7(0x81a)]();return _0x3824ff[_0x29bcf7(0x6fd)](_0x255aac),[_0x255aac];},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x81a)]=function(){return this;},Spriteset_Map[_0x283c20(0x44e)][_0x283c20(0x81a)]=function(){const _0xad8884=_0x283c20;return this[_0xad8884(0x3df)]||this;},Spriteset_Battle[_0x283c20(0x44e)][_0x283c20(0x81a)]=function(){const _0x3ade0d=_0x283c20;return this[_0x3ade0d(0x70a)]||this;},Spriteset_Base['prototype'][_0x283c20(0x281)]=function(_0x846d84,_0x46b7d5,_0x29193d,_0x51acaa,_0x53830b){const _0x2d66c9=_0x283c20,_0x486525=this[_0x2d66c9(0x553)](_0x46b7d5),_0x50b696=new(_0x486525?Sprite_AnimationMV:Sprite_Animation)();_0x50b696[_0x2d66c9(0x22d)]=_0x846d84,_0x50b696['setup'](_0x846d84,_0x46b7d5,_0x29193d,_0x51acaa),_0x50b696['setMute'](_0x53830b),this[_0x2d66c9(0x21a)]['addChild'](_0x50b696),this[_0x2d66c9(0x34b)][_0x2d66c9(0x163)](_0x50b696);},Spriteset_Base['prototype']['removePointAnimation']=function(_0x27fd05){const _0x32f827=_0x283c20;this['_pointAnimationSprites'][_0x32f827(0x438)](_0x27fd05),this[_0x32f827(0x21a)][_0x32f827(0x521)](_0x27fd05);for(const _0x30f1d9 of _0x27fd05['targetObjects']){_0x30f1d9['endAnimation']&&_0x30f1d9[_0x32f827(0x101)]();const _0x5d2f11=this[_0x32f827(0x81a)]();if(_0x5d2f11)_0x5d2f11[_0x32f827(0x521)](_0x30f1d9);}_0x27fd05['destroy']();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x4f5aeb=_0x283c20;for(const _0xe1a6aa of this[_0x4f5aeb(0x34b)]){this[_0x4f5aeb(0x47d)](_0xe1a6aa);}},Spriteset_Base[_0x283c20(0x44e)][_0x283c20(0x26b)]=function(){const _0x2e3ac2=_0x283c20;return this[_0x2e3ac2(0x34b)]['length']>0x0;},VisuMZ[_0x283c20(0x85a)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base['prototype'][_0x283c20(0x570)],Spriteset_Base[_0x283c20(0x44e)]['isAnimationPlaying']=function(){const _0x350416=_0x283c20;return VisuMZ['CoreEngine'][_0x350416(0x600)][_0x350416(0x5d8)](this)||this[_0x350416(0x26b)]();},Spriteset_Map[_0x283c20(0x75a)]=VisuMZ['CoreEngine'][_0x283c20(0x914)][_0x283c20(0x5be)][_0x283c20(0x51c)]||![],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8a2)]=Scene_Map['prototype']['createSpriteset'],Scene_Map['prototype'][_0x283c20(0x422)]=function(){const _0x47163b=_0x283c20;VisuMZ[_0x47163b(0x85a)][_0x47163b(0x8a2)]['call'](this);if(!Spriteset_Map[_0x47163b(0x75a)])return;const _0x278b11=this[_0x47163b(0x7e2)];if(!_0x278b11)return;this['_pictureContainer']=_0x278b11[_0x47163b(0x8e7)];if(!this[_0x47163b(0x8e7)])return;this[_0x47163b(0x6fd)](this['_pictureContainer']);},Spriteset_Battle[_0x283c20(0x75a)]=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)]['QoL'][_0x283c20(0x5a0)]||![],VisuMZ[_0x283c20(0x85a)][_0x283c20(0x70c)]=Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x422)],Scene_Battle['prototype'][_0x283c20(0x422)]=function(){const _0x2b02f1=_0x283c20;VisuMZ[_0x2b02f1(0x85a)][_0x2b02f1(0x70c)][_0x2b02f1(0x5d8)](this);if(!Spriteset_Battle[_0x2b02f1(0x75a)])return;const _0x4893c1=this[_0x2b02f1(0x7e2)];if(!_0x4893c1)return;this[_0x2b02f1(0x8e7)]=_0x4893c1[_0x2b02f1(0x8e7)];if(!this[_0x2b02f1(0x8e7)])return;this[_0x2b02f1(0x6fd)](this[_0x2b02f1(0x8e7)]);},Spriteset_Battle[_0x283c20(0x44e)][_0x283c20(0x3d8)]=function(){const _0x853ec1=_0x283c20;this['_backgroundFilter']=new PIXI['filters'][(_0x853ec1(0x7e9))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x853ec1(0x8fa)][_0x853ec1(0x341)]=SceneManager[_0x853ec1(0x5f6)](),this[_0x853ec1(0x8fa)][_0x853ec1(0x43e)]=[this[_0x853ec1(0x156)]],this[_0x853ec1(0x2de)][_0x853ec1(0x6fd)](this['_backgroundSprite']);},VisuMZ[_0x283c20(0x85a)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x283c20(0x44e)][_0x283c20(0x7ab)],Spriteset_Battle['prototype'][_0x283c20(0x7ab)]=function(){const _0x59cf19=_0x283c20;this[_0x59cf19(0x764)]()&&(_0x59cf19(0x56e)===_0x59cf19(0x56e)?this[_0x59cf19(0x718)]():(_0x48cc37[_0x59cf19(0x85a)]['Sprite_Button_initialize'][_0x59cf19(0x5d8)](this,_0x2d51cc),this['initButtonHidden']())),VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies'][_0x59cf19(0x5d8)](this);},Spriteset_Battle['prototype'][_0x283c20(0x764)]=function(){const _0x1851dc=_0x283c20,_0x1d3293=VisuMZ['CoreEngine'][_0x1851dc(0x914)][_0x1851dc(0x28c)];if(!_0x1d3293)return![];if(Utils[_0x1851dc(0x8c5)]>='1.3.0'&&!_0x1d3293[_0x1851dc(0x3e5)])return![];return _0x1d3293[_0x1851dc(0x26a)];},Spriteset_Battle['prototype'][_0x283c20(0x718)]=function(){const _0x5c5c96=_0x283c20;for(member of $gameTroop[_0x5c5c96(0x24a)]()){member[_0x5c5c96(0x5f5)]();}},VisuMZ['CoreEngine'][_0x283c20(0x297)]=Window_Base[_0x283c20(0x44e)][_0x283c20(0x3a9)],Window_Base[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(_0xa6e278){const _0x562d7a=_0x283c20;_0xa6e278['x']=Math[_0x562d7a(0x4a8)](_0xa6e278['x']),_0xa6e278['y']=Math[_0x562d7a(0x4a8)](_0xa6e278['y']),_0xa6e278[_0x562d7a(0x3d3)]=Math[_0x562d7a(0x4a8)](_0xa6e278['width']),_0xa6e278[_0x562d7a(0x753)]=Math[_0x562d7a(0x4a8)](_0xa6e278[_0x562d7a(0x753)]),(typeof this['initDigitGrouping'] === 'function' && this['initDigitGrouping']()),VisuMZ[_0x562d7a(0x85a)]['Window_Base_initialize'][_0x562d7a(0x5d8)](this,_0xa6e278),this[_0x562d7a(0x8b0)]();},Window_Base[_0x283c20(0x44e)][_0x283c20(0x3ed)]=function(){const _0x1e3441=_0x283c20;this[_0x1e3441(0x5b8)]=VisuMZ[_0x1e3441(0x85a)][_0x1e3441(0x914)][_0x1e3441(0x5be)]['DigitGroupingStandardText'],this[_0x1e3441(0x14d)]=VisuMZ[_0x1e3441(0x85a)][_0x1e3441(0x914)][_0x1e3441(0x5be)][_0x1e3441(0x53c)];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x261)]=function(){const _0x1aac10=_0x283c20;return VisuMZ['CoreEngine'][_0x1aac10(0x914)]['Window']['LineHeight'];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x774)]=function(){const _0x116db0=_0x283c20;return VisuMZ[_0x116db0(0x85a)][_0x116db0(0x914)][_0x116db0(0x415)]['ItemPadding'];},Window_Base[_0x283c20(0x44e)]['updateBackOpacity']=function(){const _0x135e63=_0x283c20;if($gameSystem[_0x135e63(0x2f7)]){if(_0x135e63(0x26c)!==_0x135e63(0x4b2))this[_0x135e63(0x385)]=$gameSystem['windowOpacity']();else{const _0x2125fa=_0x804580+(this[_0x135e63(0x261)]()-_0x532ee5[_0x135e63(0x50c)])/0x2;this[_0x135e63(0x514)](_0x3b3836,_0x31476d+(_0x82b561-_0x5ee2d2[_0x135e63(0x87d)]),_0x2125fa),_0x97706d-=_0x167515[_0x135e63(0x87d)]+0x4;}}else'UQnix'==='PXDAA'?this[_0x135e63(0x91f)](_0x37f47e[_0x135e63(0x3fe)],0x0):this['backOpacity']=VisuMZ[_0x135e63(0x85a)]['Settings'][_0x135e63(0x415)][_0x135e63(0x2fc)];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x6ce)]=function(){const _0x22136c=_0x283c20;return VisuMZ[_0x22136c(0x85a)]['Settings'][_0x22136c(0x415)][_0x22136c(0x510)];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x23e)]=function(){const _0x59d291=_0x283c20;return VisuMZ[_0x59d291(0x85a)][_0x59d291(0x914)][_0x59d291(0x415)][_0x59d291(0x1cd)];},VisuMZ['CoreEngine']['Window_Base_update']=Window_Base[_0x283c20(0x44e)]['update'],Window_Base[_0x283c20(0x44e)][_0x283c20(0x118)]=function(){const _0x431cbf=_0x283c20;VisuMZ[_0x431cbf(0x85a)][_0x431cbf(0x560)]['call'](this),this['updateCoreEasing']();},Window_Base[_0x283c20(0x44e)][_0x283c20(0x245)]=function(){const _0x1d2ffc=_0x283c20;if(this[_0x1d2ffc(0x870)]){if(_0x1d2ffc(0x388)!=='yzOjC')return _0x141f84['CoreEngine'][_0x1d2ffc(0x914)][_0x1d2ffc(0x113)][_0x1d2ffc(0x4b4)]||_0x1d2ffc(0x1b3);else{this[_0x1d2ffc(0x450)]+=this[_0x1d2ffc(0x23e)]();if(this[_0x1d2ffc(0x909)]()){if(_0x1d2ffc(0x54a)===_0x1d2ffc(0x54a))this[_0x1d2ffc(0x870)]=![];else{const _0x5f5708=this[_0x1d2ffc(0x66d)](_0x33cb77),_0x37e3f4=this[_0x1d2ffc(0x86b)](_0x4d890f),_0x534bbc=this[_0x1d2ffc(0x609)](_0x2ed337);return _0x5f5708*(_0x37e3f4-_0x534bbc);}}}}},Window_Base['prototype'][_0x283c20(0x35b)]=function(){const _0x1ba138=_0x283c20;this[_0x1ba138(0x54f)]&&(this[_0x1ba138(0x450)]-=this[_0x1ba138(0x23e)](),this['isClosed']()&&(this[_0x1ba138(0x54f)]=![]));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x14e)]=Window_Base[_0x283c20(0x44e)][_0x283c20(0x367)],Window_Base[_0x283c20(0x44e)]['drawText']=function(_0x460968,_0x1d22bd,_0x23e5ce,_0xc59d09,_0xca9bf6){const _0x2e90f2=_0x283c20;if(this[_0x2e90f2(0x92e)]())_0x460968=VisuMZ[_0x2e90f2(0x10c)](_0x460968);VisuMZ[_0x2e90f2(0x85a)]['Window_Base_drawText'][_0x2e90f2(0x5d8)](this,_0x460968,_0x1d22bd,_0x23e5ce,_0xc59d09,_0xca9bf6);},Window_Base[_0x283c20(0x44e)][_0x283c20(0x92e)]=function(){return this['_digitGrouping'];},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7c5)]=Window_Base['prototype']['createTextState'],Window_Base['prototype'][_0x283c20(0x4a7)]=function(_0x5fe56d,_0x1b987e,_0x3d7f02,_0x30b5ed){const _0x1f2ffb=_0x283c20;var _0x12a9df=VisuMZ[_0x1f2ffb(0x85a)][_0x1f2ffb(0x7c5)][_0x1f2ffb(0x5d8)](this,_0x5fe56d,_0x1b987e,_0x3d7f02,_0x30b5ed);if(this[_0x1f2ffb(0x799)]())_0x12a9df[_0x1f2ffb(0x7c0)]=VisuMZ['GroupDigits'](_0x12a9df['text']);return _0x12a9df;},Window_Base[_0x283c20(0x44e)]['useDigitGroupingEx']=function(){const _0x2e6198=_0x283c20;return this[_0x2e6198(0x14d)];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x484)]=function(_0x4673d4){this['_digitGrouping']=_0x4673d4;},Window_Base[_0x283c20(0x44e)][_0x283c20(0x722)]=function(_0x14a433){const _0x26eb6d=_0x283c20;this[_0x26eb6d(0x14d)]=_0x14a433;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x3d7)]=Window_Base[_0x283c20(0x44e)]['drawIcon'],Window_Base[_0x283c20(0x44e)][_0x283c20(0x514)]=function(_0x42be80,_0xa99756,_0x577bbc){const _0x584f8e=_0x283c20;_0xa99756=Math[_0x584f8e(0x4a8)](_0xa99756),_0x577bbc=Math[_0x584f8e(0x4a8)](_0x577bbc),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x584f8e(0x5d8)](this,_0x42be80,_0xa99756,_0x577bbc);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x781)]=Window_Base[_0x283c20(0x44e)][_0x283c20(0x1f8)],Window_Base['prototype'][_0x283c20(0x1f8)]=function(_0x8416d4,_0x2eb846,_0x2d4070,_0x4eb74b,_0x302f55,_0x4e1fce){const _0x764d12=_0x283c20;_0x302f55=_0x302f55||ImageManager[_0x764d12(0x645)],_0x4e1fce=_0x4e1fce||ImageManager[_0x764d12(0x857)],_0x2d4070=Math[_0x764d12(0x4a8)](_0x2d4070),_0x4eb74b=Math[_0x764d12(0x4a8)](_0x4eb74b),_0x302f55=Math[_0x764d12(0x4a8)](_0x302f55),_0x4e1fce=Math['round'](_0x4e1fce),VisuMZ[_0x764d12(0x85a)][_0x764d12(0x781)]['call'](this,_0x8416d4,_0x2eb846,_0x2d4070,_0x4eb74b,_0x302f55,_0x4e1fce);},VisuMZ['CoreEngine'][_0x283c20(0x831)]=Window_Base[_0x283c20(0x44e)]['drawCharacter'],Window_Base[_0x283c20(0x44e)][_0x283c20(0x772)]=function(_0x209ab0,_0x1d5a30,_0x863fb2,_0x2bd437){const _0x507630=_0x283c20;_0x863fb2=Math['round'](_0x863fb2),_0x2bd437=Math[_0x507630(0x4a8)](_0x2bd437),VisuMZ[_0x507630(0x85a)][_0x507630(0x831)][_0x507630(0x5d8)](this,_0x209ab0,_0x1d5a30,_0x863fb2,_0x2bd437);},VisuMZ[_0x283c20(0x85a)]['Window_Selectable_itemRect']=Window_Selectable[_0x283c20(0x44e)]['itemRect'],Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x144)]=function(_0x4766c3){const _0x59f407=_0x283c20;let _0x26c1dd=VisuMZ['CoreEngine'][_0x59f407(0x517)][_0x59f407(0x5d8)](this,_0x4766c3);return _0x26c1dd['x']=Math['round'](_0x26c1dd['x']),_0x26c1dd['y']=Math[_0x59f407(0x4a8)](_0x26c1dd['y']),_0x26c1dd[_0x59f407(0x3d3)]=Math['round'](_0x26c1dd[_0x59f407(0x3d3)]),_0x26c1dd[_0x59f407(0x753)]=Math[_0x59f407(0x4a8)](_0x26c1dd['height']),_0x26c1dd;},VisuMZ['CoreEngine'][_0x283c20(0x6f6)]=Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x8ed)],Window_StatusBase[_0x283c20(0x44e)]['drawActorSimpleStatus']=function(_0x45ff35,_0x35c149,_0x2b4f0c){const _0x40809f=_0x283c20;_0x35c149=Math[_0x40809f(0x4a8)](_0x35c149),_0x2b4f0c=Math['round'](_0x2b4f0c),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus'][_0x40809f(0x5d8)](this,_0x45ff35,_0x35c149,_0x2b4f0c);},Window_Base[_0x283c20(0x44e)][_0x283c20(0x8b0)]=function(){const _0x1969ba=_0x283c20;this[_0x1969ba(0x5c7)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x1969ba(0x53d)]['x'],'targetScaleY':this[_0x1969ba(0x53d)]['y'],'targetOpacity':this[_0x1969ba(0x5cc)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x1969ba(0x8d7)]};},Window_Base[_0x283c20(0x44e)][_0x283c20(0x87e)]=function(){const _0xca3a99=_0x283c20;if(!this[_0xca3a99(0x5c7)])return;if(this[_0xca3a99(0x5c7)][_0xca3a99(0x23d)]<=0x0)return;this['x']=this[_0xca3a99(0x2e1)](this['x'],this[_0xca3a99(0x5c7)][_0xca3a99(0x43d)]),this['y']=this[_0xca3a99(0x2e1)](this['y'],this[_0xca3a99(0x5c7)]['targetY']),this[_0xca3a99(0x53d)]['x']=this['applyCoreEasing'](this[_0xca3a99(0x53d)]['x'],this['_coreEasing']['targetScaleX']),this['scale']['y']=this[_0xca3a99(0x2e1)](this['scale']['y'],this[_0xca3a99(0x5c7)]['targetScaleY']),this[_0xca3a99(0x5cc)]=this[_0xca3a99(0x2e1)](this['opacity'],this[_0xca3a99(0x5c7)][_0xca3a99(0x3ad)]),this[_0xca3a99(0x385)]=this[_0xca3a99(0x2e1)](this[_0xca3a99(0x385)],this[_0xca3a99(0x5c7)][_0xca3a99(0x925)]),this['contentsOpacity']=this[_0xca3a99(0x2e1)](this[_0xca3a99(0x8d7)],this[_0xca3a99(0x5c7)]['targetContentsOpacity']),this[_0xca3a99(0x5c7)]['duration']--;},Window_Base[_0x283c20(0x44e)]['applyCoreEasing']=function(_0x25636a,_0x4ab330){const _0x1a4388=_0x283c20;if(!this[_0x1a4388(0x5c7)])return _0x4ab330;const _0x18fde2=this[_0x1a4388(0x5c7)][_0x1a4388(0x23d)],_0x477c13=this['_coreEasing']['wholeDuration'],_0xc8a082=this[_0x1a4388(0x527)]((_0x477c13-_0x18fde2)/_0x477c13),_0xafbdbe=this['calcCoreEasing']((_0x477c13-_0x18fde2+0x1)/_0x477c13),_0x150f4f=(_0x25636a-_0x4ab330*_0xc8a082)/(0x1-_0xc8a082);return _0x150f4f+(_0x4ab330-_0x150f4f)*_0xafbdbe;},Window_Base[_0x283c20(0x44e)]['calcCoreEasing']=function(_0x203fab){const _0x35058a=_0x283c20;if(!this['_coreEasing'])return _0x203fab;return VisuMZ[_0x35058a(0x2b6)](_0x203fab,this[_0x35058a(0x5c7)][_0x35058a(0x147)]||_0x35058a(0x1bf));},Window_Base[_0x283c20(0x44e)][_0x283c20(0x59e)]=function(_0xef6802,_0x13dd84){const _0xc48709=_0x283c20;if(!this[_0xc48709(0x5c7)])return;this['x']=this['_coreEasing']['targetX'],this['y']=this[_0xc48709(0x5c7)]['targetY'],this[_0xc48709(0x53d)]['x']=this[_0xc48709(0x5c7)][_0xc48709(0x895)],this['scale']['y']=this[_0xc48709(0x5c7)][_0xc48709(0x835)],this['opacity']=this[_0xc48709(0x5c7)][_0xc48709(0x3ad)],this[_0xc48709(0x385)]=this[_0xc48709(0x5c7)][_0xc48709(0x925)],this['contentsOpacity']=this[_0xc48709(0x5c7)]['targetContentsOpacity'],this[_0xc48709(0x62b)](_0xef6802,_0x13dd84,this['x'],this['y'],this[_0xc48709(0x53d)]['x'],this[_0xc48709(0x53d)]['y'],this['opacity'],this[_0xc48709(0x385)],this[_0xc48709(0x8d7)]);},Window_Base['prototype'][_0x283c20(0x62b)]=function(_0x3deb22,_0x186aac,_0x11e552,_0x3c7652,_0x4ae112,_0x4616f1,_0x366559,_0x48b4c8,_0x539fa7){const _0x466104=_0x283c20;this[_0x466104(0x5c7)]={'duration':_0x3deb22,'wholeDuration':_0x3deb22,'type':_0x186aac,'targetX':_0x11e552,'targetY':_0x3c7652,'targetScaleX':_0x4ae112,'targetScaleY':_0x4616f1,'targetOpacity':_0x366559,'targetBackOpacity':_0x48b4c8,'targetContentsOpacity':_0x539fa7};},Window_Base[_0x283c20(0x44e)]['drawCurrencyValue']=function(_0x3db830,_0x1c0058,_0x5b7077,_0x46adb2,_0x42211b){const _0x5aec61=_0x283c20;this[_0x5aec61(0x35a)](),this[_0x5aec61(0x666)][_0x5aec61(0x1d2)]=VisuMZ['CoreEngine'][_0x5aec61(0x914)]['Gold'][_0x5aec61(0x729)];const _0x45dd11=VisuMZ['CoreEngine'][_0x5aec61(0x914)][_0x5aec61(0x165)][_0x5aec61(0x226)];if(_0x45dd11>0x0&&_0x1c0058===TextManager[_0x5aec61(0x1a4)]){const _0x515b59=_0x46adb2+(this['lineHeight']()-ImageManager[_0x5aec61(0x50c)])/0x2;this[_0x5aec61(0x514)](_0x45dd11,_0x5b7077+(_0x42211b-ImageManager[_0x5aec61(0x87d)]),_0x515b59),_0x42211b-=ImageManager['iconWidth']+0x4;}else _0x5aec61(0x1fc)===_0x5aec61(0x8f9)?_0x6834d9[_0x5aec61(0x85a)][_0x5aec61(0x914)][_0x5aec61(0x5be)][_0x5aec61(0x4e3)]&&(this['_isPlaytest']=![]):(this[_0x5aec61(0x705)](ColorManager[_0x5aec61(0x89c)]()),this['drawText'](_0x1c0058,_0x5b7077,_0x46adb2,_0x42211b,_0x5aec61(0x15d)),_0x42211b-=this[_0x5aec61(0x232)](_0x1c0058)+0x6);this['resetTextColor']();const _0x51c0f0=this['textWidth'](this[_0x5aec61(0x5b8)]?VisuMZ[_0x5aec61(0x10c)](_0x3db830):_0x3db830);if(_0x51c0f0>_0x42211b){if(_0x5aec61(0x840)!==_0x5aec61(0x840)){this[_0x5aec61(0x1be)]++;let _0x13953b=_0xd78c8['CoreEngine'][_0x5aec61(0x6dc)](_0x4929a4['list']);_0x13953b[_0x5aec61(0x6a1)]>0x0&&(_0x17f34f+=_0x34ac28,_0x311faa+=_0x581cfa,_0x1c82ad+=_0x5aec61(0x82a)[_0x5aec61(0x520)](_0x39cb27['id'],_0x4ffba7[_0x5aec61(0x3f0)]),_0x37a57c+=_0x4da153,_0x176c50+=_0x13953b,_0x743ca4+=_0x59a469,_0x24c1b3+=_0x5aec61(0x15a)[_0x5aec61(0x520)](_0x11637b['id'],_0x586dbc[_0x5aec61(0x3f0)]),_0x55b7b4+=_0x2e06e2),this['_commonEventLayers']--;}else this[_0x5aec61(0x367)](VisuMZ['CoreEngine'][_0x5aec61(0x914)][_0x5aec61(0x165)][_0x5aec61(0x424)],_0x5b7077,_0x46adb2,_0x42211b,_0x5aec61(0x15d));}else{if(_0x5aec61(0x74d)!==_0x5aec61(0x74d)){const _0x4c929f=new _0x3a55f1();_0x4c929f['x']=_0x3758bf['x'],_0x4c929f['y']=_0x3f0c0e['y'],_0x4c929f['z']=0x64;const _0x4203fe=this[_0x5aec61(0x81a)]();return _0x4203fe[_0x5aec61(0x6fd)](_0x4c929f),[_0x4c929f];}else this['drawText'](_0x3db830,_0x5b7077,_0x46adb2,_0x42211b,_0x5aec61(0x15d));}this[_0x5aec61(0x35a)]();},Window_Base['prototype'][_0x283c20(0x2d1)]=function(_0x3a7034,_0x1b9e07,_0x3713cc,_0x5c9f56,_0x3ec4cd){const _0x59223c=_0x283c20,_0x5c628f=ImageManager[_0x59223c(0x79b)]('IconSet'),_0x25f7d5=ImageManager[_0x59223c(0x87d)],_0x4f911e=ImageManager[_0x59223c(0x50c)],_0x1a3fa1=_0x3a7034%0x10*_0x25f7d5,_0x19e2d6=Math[_0x59223c(0x214)](_0x3a7034/0x10)*_0x4f911e,_0x53fb57=_0x5c9f56,_0x975c08=_0x5c9f56;this[_0x59223c(0x666)][_0x59223c(0x49c)][_0x59223c(0x40a)]=_0x3ec4cd,this['contents']['blt'](_0x5c628f,_0x1a3fa1,_0x19e2d6,_0x25f7d5,_0x4f911e,_0x1b9e07,_0x3713cc,_0x53fb57,_0x975c08),this['contents']['_context'][_0x59223c(0x40a)]=!![];},Window_Base[_0x283c20(0x44e)][_0x283c20(0x3c2)]=function(_0x51e2e7,_0x15730b,_0xc4de05,_0x16d3dd,_0xc65dea,_0x417a1d){const _0x38ecdb=_0x283c20,_0x49bfd8=Math[_0x38ecdb(0x214)]((_0xc4de05-0x2)*_0x16d3dd),_0x478034=Sprite_Gauge[_0x38ecdb(0x44e)]['gaugeHeight'][_0x38ecdb(0x5d8)](this),_0x8c3463=_0x15730b+this[_0x38ecdb(0x261)]()-_0x478034-0x2;this[_0x38ecdb(0x666)]['fillRect'](_0x51e2e7,_0x8c3463,_0xc4de05,_0x478034,ColorManager[_0x38ecdb(0x7e5)]()),this[_0x38ecdb(0x666)]['gradientFillRect'](_0x51e2e7+0x1,_0x8c3463+0x1,_0x49bfd8,_0x478034-0x2,_0xc65dea,_0x417a1d);},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x676)]=function(_0x49fd13){const _0xf6d15b=_0x283c20;let _0x1f0613=this[_0xf6d15b(0x526)]();const _0xa8c94b=this[_0xf6d15b(0x8d6)](),_0x3410fe=this[_0xf6d15b(0x862)]();if(this['isUseModernControls']()&&(_0x1f0613<_0xa8c94b||_0x49fd13&&_0x3410fe===0x1)){_0x1f0613+=_0x3410fe;if(_0x1f0613>=_0xa8c94b)_0x1f0613=_0xa8c94b-0x1;this['smoothSelect'](_0x1f0613);}else!this['isUseModernControls']()&&((_0x1f0613<_0xa8c94b-_0x3410fe||_0x49fd13&&_0x3410fe===0x1)&&this[_0xf6d15b(0x901)]((_0x1f0613+_0x3410fe)%_0xa8c94b));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x8fd)]=Window_Selectable[_0x283c20(0x44e)]['cursorDown'],Window_Selectable[_0x283c20(0x44e)]['cursorDown']=function(_0x581066){const _0x550698=_0x283c20;this['isUseModernControls']()&&_0x581066&&this[_0x550698(0x862)]()===0x1&&this[_0x550698(0x526)]()===this[_0x550698(0x8d6)]()-0x1?this[_0x550698(0x901)](0x0):VisuMZ['CoreEngine'][_0x550698(0x8fd)]['call'](this,_0x581066);},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x445)]=function(_0x153b3e){const _0x18a5df=_0x283c20;let _0x1304c1=Math[_0x18a5df(0x861)](0x0,this[_0x18a5df(0x526)]());const _0x13bbee=this['maxItems'](),_0x261641=this[_0x18a5df(0x862)]();if(this[_0x18a5df(0x2f9)]()&&_0x1304c1>0x0||_0x153b3e&&_0x261641===0x1){if(_0x18a5df(0x17f)===_0x18a5df(0x3ef))this[_0x18a5df(0x8c2)]();else{_0x1304c1-=_0x261641;if(_0x1304c1<=0x0)_0x1304c1=0x0;this[_0x18a5df(0x901)](_0x1304c1);}}else{if(!this['isUseModernControls']()){if(_0x18a5df(0x16a)!=='bFoQI'){if(_0x1304c1>=_0x261641||_0x153b3e&&_0x261641===0x1){if(_0x18a5df(0x614)!=='AyQNm'){try{_0x3a86c9(_0x4c8a62);}catch(_0xaa3ee7){_0x1ea1bf[_0x18a5df(0x8bc)]()&&(_0x270c7f[_0x18a5df(0x836)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x30b68b[_0x18a5df(0x836)](_0xaa3ee7));}return!![];}else this['smoothSelect']((_0x1304c1-_0x261641+_0x13bbee)%_0x13bbee);}}else this[_0x18a5df(0x8b6)]=_0x3a3a08;}}},VisuMZ['CoreEngine'][_0x283c20(0x84a)]=Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x445)],Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x445)]=function(_0x9ad1db){const _0x31e0b7=_0x283c20;this[_0x31e0b7(0x2f9)]()&&_0x9ad1db&&this[_0x31e0b7(0x862)]()===0x1&&this[_0x31e0b7(0x526)]()===0x0?this[_0x31e0b7(0x901)](this[_0x31e0b7(0x8d6)]()-0x1):VisuMZ[_0x31e0b7(0x85a)][_0x31e0b7(0x84a)][_0x31e0b7(0x5d8)](this,_0x9ad1db);},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x2f9)]=function(){const _0x17c0db=_0x283c20;return VisuMZ['CoreEngine'][_0x17c0db(0x914)][_0x17c0db(0x5be)][_0x17c0db(0x17c)];},VisuMZ['CoreEngine'][_0x283c20(0x37b)]=Window_Selectable['prototype'][_0x283c20(0x647)],Window_Selectable['prototype']['processCursorMove']=function(){const _0x321bc4=_0x283c20;this[_0x321bc4(0x2f9)]()?(this[_0x321bc4(0x334)](),this[_0x321bc4(0x7e7)]()):VisuMZ[_0x321bc4(0x85a)]['Window_Selectable_processCursorMove'][_0x321bc4(0x5d8)](this);},Window_Selectable[_0x283c20(0x44e)]['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x334)]=function(){const _0x5e05bb=_0x283c20;if(this[_0x5e05bb(0x55b)]()){const _0x27796b=this[_0x5e05bb(0x526)]();if(Input['isRepeated']('down')){if(_0x5e05bb(0x1ee)!==_0x5e05bb(0x1ee))switch(_0x10febb[_0x5e05bb(0x85a)][_0x5e05bb(0x914)][_0x5e05bb(0x5be)][_0x5e05bb(0x697)]){case _0x5e05bb(0x602):return!![];case _0x5e05bb(0x5d7):return![];default:return _0x134d1d[_0x5e05bb(0x85a)][_0x5e05bb(0x6f2)][_0x5e05bb(0x5d8)](this);}else Input[_0x5e05bb(0x4ac)](_0x5e05bb(0x8f2))&&this['allowShiftScrolling']()?this[_0x5e05bb(0x8c2)]():_0x5e05bb(0x176)!==_0x5e05bb(0x176)?_0x13d63d[_0x5e05bb(0x3f0)]=_0x216a7d(_0x577eb1['$2'][_0x5e05bb(0x538)]()):this[_0x5e05bb(0x676)](Input[_0x5e05bb(0x55e)](_0x5e05bb(0x5c2)));}if(Input[_0x5e05bb(0x66f)]('up')){if('JOQhE'!==_0x5e05bb(0x4ae)){if(Input[_0x5e05bb(0x4ac)](_0x5e05bb(0x8f2))&&this[_0x5e05bb(0x235)]()){if(_0x5e05bb(0x32a)!==_0x5e05bb(0x8ce))this['cursorPageup']();else return _0x2fd572[_0x5e05bb(0x85a)][_0x5e05bb(0x914)]['UI'][_0x5e05bb(0x32f)];}else this[_0x5e05bb(0x445)](Input[_0x5e05bb(0x55e)]('up'));}else{if(_0x35864a)_0x328e6d[_0x5e05bb(0x460)](_0x23613e);}}if(Input[_0x5e05bb(0x66f)](_0x5e05bb(0x15d))){if('erMbv'===_0x5e05bb(0x119))this[_0x5e05bb(0x26d)](Input[_0x5e05bb(0x55e)]('right'));else{var _0x49a0d8=_0x4b3a08(_0x2c2cca['$1']);_0x3ae03e*=_0x49a0d8;}}if(Input[_0x5e05bb(0x66f)](_0x5e05bb(0x162))){if(_0x5e05bb(0x6ac)===_0x5e05bb(0x45e)){for(const _0x4d48ec of this[_0x5e05bb(0x4cb)]){!_0x4d48ec[_0x5e05bb(0x3fd)]()&&this['removeFauxAnimation'](_0x4d48ec);}this[_0x5e05bb(0x16f)]();}else this[_0x5e05bb(0x686)](Input[_0x5e05bb(0x55e)](_0x5e05bb(0x162)));}!this[_0x5e05bb(0x571)]('pagedown')&&Input[_0x5e05bb(0x66f)](_0x5e05bb(0x8dd))&&this[_0x5e05bb(0x8c2)](),!this[_0x5e05bb(0x571)](_0x5e05bb(0x4d3))&&Input[_0x5e05bb(0x66f)](_0x5e05bb(0x4d3))&&this[_0x5e05bb(0x474)](),this[_0x5e05bb(0x526)]()!==_0x27796b&&this[_0x5e05bb(0x4d0)]();}},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x7e7)]=function(){const _0xcff0e9=_0x283c20;if(this[_0xcff0e9(0x55b)]()){const _0x1d98db=this[_0xcff0e9(0x526)]();if(Input[_0xcff0e9(0x55e)]('home')){if('nSRss'!=='VFCck')this[_0xcff0e9(0x901)](Math[_0xcff0e9(0x8f4)](this[_0xcff0e9(0x526)](),0x0));else{_0x578181[_0xcff0e9(0x85a)][_0xcff0e9(0x14b)][_0xcff0e9(0x5d8)](this);if(!_0x1444b9[_0xcff0e9(0x83c)])this[_0xcff0e9(0x695)]();}}Input[_0xcff0e9(0x55e)](_0xcff0e9(0x65f))&&this[_0xcff0e9(0x901)](Math[_0xcff0e9(0x861)](this[_0xcff0e9(0x526)](),this[_0xcff0e9(0x8d6)]()-0x1)),this['index']()!==_0x1d98db&&(_0xcff0e9(0x734)===_0xcff0e9(0x734)?this['playCursorSound']():(_0x2a3501[_0xcff0e9(0x85a)][_0xcff0e9(0x560)][_0xcff0e9(0x5d8)](this),this[_0xcff0e9(0x87e)]()));}},VisuMZ['CoreEngine'][_0x283c20(0x50e)]=Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x34f)],Window_Selectable[_0x283c20(0x44e)]['processTouch']=function(){const _0x3bfc0e=_0x283c20;this[_0x3bfc0e(0x2f9)]()?this[_0x3bfc0e(0x43b)]():_0x3bfc0e(0x220)==='vJUPz'?_0x2a4b85+=_0x341ba1/0x2:VisuMZ['CoreEngine'][_0x3bfc0e(0x50e)][_0x3bfc0e(0x5d8)](this);},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x43b)]=function(){const _0x10b960=_0x283c20;VisuMZ[_0x10b960(0x85a)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x283c20(0x44e)]['colSpacing']=function(){const _0x1e66f5=_0x283c20;return VisuMZ[_0x1e66f5(0x85a)][_0x1e66f5(0x914)][_0x1e66f5(0x415)][_0x1e66f5(0x51f)];},Window_Selectable[_0x283c20(0x44e)]['rowSpacing']=function(){const _0x4ba5b3=_0x283c20;return VisuMZ[_0x4ba5b3(0x85a)]['Settings'][_0x4ba5b3(0x415)][_0x4ba5b3(0x61d)];},Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x195)]=function(){const _0x127ecb=_0x283c20;return Window_Scrollable[_0x127ecb(0x44e)][_0x127ecb(0x195)][_0x127ecb(0x5d8)](this)+VisuMZ['CoreEngine']['Settings']['Window'][_0x127ecb(0x598)];;},VisuMZ['CoreEngine'][_0x283c20(0x4a3)]=Window_Selectable['prototype'][_0x283c20(0x85d)],Window_Selectable[_0x283c20(0x44e)][_0x283c20(0x85d)]=function(_0x2e94df){const _0x25f89f=_0x283c20,_0x4557c4=VisuMZ[_0x25f89f(0x85a)][_0x25f89f(0x914)][_0x25f89f(0x415)];if(_0x4557c4[_0x25f89f(0x8bd)]===![])return;_0x4557c4['DrawItemBackgroundJS']?_0x4557c4[_0x25f89f(0x763)]['call'](this,_0x2e94df):VisuMZ[_0x25f89f(0x85a)][_0x25f89f(0x4a3)][_0x25f89f(0x5d8)](this,_0x2e94df);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x436)]=Window_Gold[_0x283c20(0x44e)][_0x283c20(0x661)],Window_Gold['prototype']['refresh']=function(){const _0x8ea6a5=_0x283c20;this[_0x8ea6a5(0x1d8)]()?this[_0x8ea6a5(0x7ec)]():VisuMZ[_0x8ea6a5(0x85a)][_0x8ea6a5(0x436)]['call'](this);},Window_Gold[_0x283c20(0x44e)][_0x283c20(0x1d8)]=function(){const _0x3c36f0=_0x283c20;if(TextManager[_0x3c36f0(0x1a4)]!==this[_0x3c36f0(0x1a4)]())return![];return VisuMZ[_0x3c36f0(0x85a)][_0x3c36f0(0x914)][_0x3c36f0(0x165)][_0x3c36f0(0x769)];},Window_Gold[_0x283c20(0x44e)][_0x283c20(0x7ec)]=function(){const _0x415c02=_0x283c20;this[_0x415c02(0x35a)](),this[_0x415c02(0x666)][_0x415c02(0x5e1)](),this[_0x415c02(0x666)]['fontSize']=VisuMZ[_0x415c02(0x85a)]['Settings'][_0x415c02(0x165)][_0x415c02(0x729)];const _0x4282d0=VisuMZ[_0x415c02(0x85a)][_0x415c02(0x914)][_0x415c02(0x165)]['GoldIcon'],_0x3992ad=this[_0x415c02(0x164)](0x0);if(_0x4282d0>0x0){const _0x515d52=_0x3992ad['y']+(this['lineHeight']()-ImageManager[_0x415c02(0x50c)])/0x2;this[_0x415c02(0x514)](_0x4282d0,_0x3992ad['x'],_0x515d52);const _0x392a58=ImageManager[_0x415c02(0x87d)]+0x4;_0x3992ad['x']+=_0x392a58,_0x3992ad['width']-=_0x392a58;}this[_0x415c02(0x705)](ColorManager[_0x415c02(0x89c)]()),this['drawText'](this['currencyUnit'](),_0x3992ad['x'],_0x3992ad['y'],_0x3992ad['width'],'left');const _0x4dc41f=this[_0x415c02(0x232)](this[_0x415c02(0x1a4)]())+0x6;;_0x3992ad['x']+=_0x4dc41f,_0x3992ad[_0x415c02(0x3d3)]-=_0x4dc41f,this[_0x415c02(0x496)]();const _0x3719aa=this['value'](),_0x4fe83b=this['textWidth'](this[_0x415c02(0x5b8)]?VisuMZ[_0x415c02(0x10c)](this['value']()):this[_0x415c02(0x86d)]());if(_0x4fe83b>_0x3992ad['width'])this[_0x415c02(0x367)](VisuMZ[_0x415c02(0x85a)][_0x415c02(0x914)][_0x415c02(0x165)][_0x415c02(0x424)],_0x3992ad['x'],_0x3992ad['y'],_0x3992ad[_0x415c02(0x3d3)],_0x415c02(0x15d));else{if(_0x415c02(0x136)==='EXVCA')this[_0x415c02(0x367)](this[_0x415c02(0x86d)](),_0x3992ad['x'],_0x3992ad['y'],_0x3992ad[_0x415c02(0x3d3)],_0x415c02(0x15d));else{if(this[_0x415c02(0x526)]()===0x0)return;_0x4edca4[_0x415c02(0x5e1)](),this['refresh'](),_0x2deddc[_0x415c02(0x3f3)](),this['select'](0x0);}}this[_0x415c02(0x35a)]();},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x488)]=function(_0x13de23,_0x4fc89b,_0x320fc9,_0x2d2663,_0x187be5){const _0x5e2dc5=_0x283c20;_0x2d2663=String(_0x2d2663||'')['toUpperCase']();if(VisuMZ['CoreEngine'][_0x5e2dc5(0x914)][_0x5e2dc5(0x7ee)]['DrawIcons']){if('AmhLM'!=='AWpQD'){const _0x4a0699=VisuMZ[_0x5e2dc5(0x6bb)](_0x2d2663);_0x187be5?(this['drawIconBySize'](_0x4a0699,_0x13de23,_0x4fc89b,this[_0x5e2dc5(0x696)]()),_0x320fc9-=this['gaugeLineHeight']()+0x2,_0x13de23+=this['gaugeLineHeight']()+0x2):(this['drawIcon'](_0x4a0699,_0x13de23+0x2,_0x4fc89b+0x2),_0x320fc9-=ImageManager[_0x5e2dc5(0x87d)]+0x4,_0x13de23+=ImageManager[_0x5e2dc5(0x87d)]+0x4);}else _0x130b3e['isOptionValid'](_0x5e2dc5(0x877))&&_0x2792c5['CoreEngine'][_0x5e2dc5(0x914)]['QoL'][_0x5e2dc5(0x121)]?this[_0x5e2dc5(0x473)]():_0x5d544d[_0x5e2dc5(0x85a)][_0x5e2dc5(0x51a)]['call'](this);}const _0x3b2fed=TextManager[_0x5e2dc5(0x508)](_0x2d2663);this[_0x5e2dc5(0x35a)](),this[_0x5e2dc5(0x705)](ColorManager[_0x5e2dc5(0x89c)]()),_0x187be5?(this[_0x5e2dc5(0x666)]['fontSize']=this[_0x5e2dc5(0x7ea)](),this['contents']['drawText'](_0x3b2fed,_0x13de23,_0x4fc89b,_0x320fc9,this[_0x5e2dc5(0x696)](),'left')):this[_0x5e2dc5(0x367)](_0x3b2fed,_0x13de23,_0x4fc89b,_0x320fc9),this[_0x5e2dc5(0x35a)]();},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x7ea)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x92a)]=function(_0x11cb86,_0x5ac074,_0x107f89,_0xedf1a5){const _0x5237f5=_0x283c20;_0xedf1a5=_0xedf1a5||0xa8,this[_0x5237f5(0x496)]();if(VisuMZ[_0x5237f5(0x85a)][_0x5237f5(0x914)]['UI'][_0x5237f5(0x688)])'gObMi'===_0x5237f5(0x5e6)?this[_0x5237f5(0x6b3)](_0x11cb86[_0x5237f5(0x8db)]()[_0x5237f5(0x3f0)],_0x5ac074,_0x107f89,_0xedf1a5):(this[_0x5237f5(0x8e7)][_0x5237f5(0x53d)]['x']=0x1/this[_0x5237f5(0x53d)]['x'],this[_0x5237f5(0x8e7)]['x']=-(this['x']/this['scale']['x']));else{if(_0x5237f5(0x4d4)===_0x5237f5(0x4d4)){const _0x35c782=_0x11cb86[_0x5237f5(0x8db)]()[_0x5237f5(0x3f0)][_0x5237f5(0x243)](/\\I\[(\d+)\]/gi,'');this[_0x5237f5(0x367)](_0x35c782,_0x5ac074,_0x107f89,_0xedf1a5);}else{if(_0x543b69 instanceof _0x57443a)this[_0x5237f5(0x33a)](_0x251f94);else _0x43fc24 instanceof _0x31c757&&_0x1ce4b6[0x0]==='LoadError'?this['catchLoadError'](_0x3a405f):this[_0x5237f5(0x499)](_0x5a380b);this[_0x5237f5(0x702)]();}}},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x169)]=function(_0x4f53cd,_0x2d31d0,_0x1171e2,_0x19be82){const _0x5e4326=_0x283c20;_0x19be82=_0x19be82||0x10e,this['resetTextColor']();if(VisuMZ[_0x5e4326(0x85a)][_0x5e4326(0x914)]['UI'][_0x5e4326(0x1c1)])this[_0x5e4326(0x6b3)](_0x4f53cd[_0x5e4326(0x381)](),_0x2d31d0,_0x1171e2,_0x19be82);else{if(_0x5e4326(0x756)!==_0x5e4326(0x756))return this[_0x5e4326(0x27d)](_0x529f0f);else{const _0x4c2a53=_0x4f53cd[_0x5e4326(0x381)]()[_0x5e4326(0x243)](/\\I\[(\d+)\]/gi,'');this[_0x5e4326(0x367)](_0x4f53cd[_0x5e4326(0x381)](),_0x2d31d0,_0x1171e2,_0x19be82);}}},VisuMZ['CoreEngine'][_0x283c20(0x4c6)]=Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x212)],Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x212)]=function(_0x469552,_0x22a40b,_0x5bae92){const _0x250970=_0x283c20;if(this[_0x250970(0x74b)]())this[_0x250970(0x57f)](_0x469552,_0x22a40b,_0x5bae92);VisuMZ['CoreEngine'][_0x250970(0x4c6)][_0x250970(0x5d8)](this,_0x469552,_0x22a40b,_0x5bae92);},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x74b)]=function(){const _0x2ff4ea=_0x283c20;return VisuMZ[_0x2ff4ea(0x85a)][_0x2ff4ea(0x914)]['UI']['LvExpGauge'];},Window_StatusBase[_0x283c20(0x44e)][_0x283c20(0x57f)]=function(_0x452211,_0x2ac583,_0x1029d1){const _0x18385c=_0x283c20;if(!_0x452211)return;if(!_0x452211[_0x18385c(0x6d3)]())return;const _0x2ff93e=0x80,_0x4ff9fa=_0x452211[_0x18385c(0x2c8)]();let _0x1e5500=ColorManager['expGaugeColor1'](),_0x584ade=ColorManager[_0x18385c(0x38c)]();if(_0x4ff9fa>=0x1){if(_0x18385c(0x199)==='oiRUk')return 0x0;else _0x1e5500=ColorManager[_0x18385c(0x8d3)](),_0x584ade=ColorManager['maxLvGaugeColor2']();}this['drawGauge'](_0x2ac583,_0x1029d1,_0x2ff93e,_0x4ff9fa,_0x1e5500,_0x584ade);},Window_EquipStatus['prototype']['drawAllParams']=function(){const _0x19f0d5=_0x283c20;let _0x2e3458=0x0;for(const _0x3a1fbc of VisuMZ[_0x19f0d5(0x85a)][_0x19f0d5(0x914)][_0x19f0d5(0x7ee)][_0x19f0d5(0x1cc)]){const _0x765f2a=this['itemPadding'](),_0x49ffbc=this['paramY'](_0x2e3458);this['drawItem'](_0x765f2a,_0x49ffbc,_0x3a1fbc),_0x2e3458++;}},Window_EquipStatus[_0x283c20(0x44e)]['drawParamName']=function(_0xd31529,_0x529f93,_0x19c918){const _0x4f592c=_0x283c20,_0x1da4ae=this[_0x4f592c(0x31f)]()-this['itemPadding']()*0x2;this['drawParamText'](_0xd31529,_0x529f93,_0x1da4ae,_0x19c918,![]);},Window_EquipStatus['prototype'][_0x283c20(0x1a1)]=function(_0x1c9e6e,_0x59c1e1,_0x2df73a){const _0x42a764=_0x283c20,_0x3c5454=this[_0x42a764(0x858)]();this[_0x42a764(0x496)](),this[_0x42a764(0x367)](this[_0x42a764(0x57d)][_0x42a764(0x607)](_0x2df73a,!![]),_0x1c9e6e,_0x59c1e1,_0x3c5454,_0x42a764(0x15d));},Window_EquipStatus[_0x283c20(0x44e)]['drawRightArrow']=function(_0x3fa195,_0x546934){const _0x11ce9b=_0x283c20,_0x51b837=this['rightArrowWidth']();this[_0x11ce9b(0x705)](ColorManager[_0x11ce9b(0x89c)]());const _0x420e0d=VisuMZ['CoreEngine'][_0x11ce9b(0x914)]['UI'][_0x11ce9b(0x57e)];this[_0x11ce9b(0x367)](_0x420e0d,_0x3fa195,_0x546934,_0x51b837,_0x11ce9b(0x179));},Window_EquipStatus[_0x283c20(0x44e)][_0x283c20(0x6b4)]=function(_0x28198a,_0x4b3817,_0x1d20b4){const _0x3ffc7e=_0x283c20,_0x3ec78a=this[_0x3ffc7e(0x858)](),_0x3ab126=this[_0x3ffc7e(0x63f)][_0x3ffc7e(0x607)](_0x1d20b4),_0x21dff4=_0x3ab126-this[_0x3ffc7e(0x57d)]['paramValueByName'](_0x1d20b4);this[_0x3ffc7e(0x705)](ColorManager['paramchangeTextColor'](_0x21dff4)),this[_0x3ffc7e(0x367)](this[_0x3ffc7e(0x63f)]['paramValueByName'](_0x1d20b4,!![]),_0x28198a,_0x4b3817,_0x3ec78a,_0x3ffc7e(0x15d));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x32d)]=Window_EquipItem[_0x283c20(0x44e)][_0x283c20(0x5f1)],Window_EquipItem[_0x283c20(0x44e)]['isEnabled']=function(_0x2629a0){const _0x437fa4=_0x283c20;if(_0x2629a0&&this[_0x437fa4(0x57d)]){if(_0x437fa4(0x166)!==_0x437fa4(0x166))this[_0x437fa4(0x3f4)][_0x437fa4(0x312)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](_0x4183e8(_0x4a8acb['$1'])):_0x4f6c7f[_0x437fa4(0x85a)][_0x437fa4(0x16d)][_0x437fa4(0x5d8)](this);else return this[_0x437fa4(0x57d)][_0x437fa4(0x6f7)](_0x2629a0);}else{if(_0x437fa4(0x755)===_0x437fa4(0x755))return VisuMZ[_0x437fa4(0x85a)]['Window_EquipItem_isEnabled'][_0x437fa4(0x5d8)](this,_0x2629a0);else for(const _0x65e574 of _0x1063e6){if(_0x65e574&&_0x65e574['connected'])return!![];}}},Window_StatusParams[_0x283c20(0x44e)][_0x283c20(0x8d6)]=function(){const _0x4aff67=_0x283c20;return VisuMZ['CoreEngine']['Settings'][_0x4aff67(0x7ee)]['DisplayedParams'][_0x4aff67(0x6a1)];},Window_StatusParams['prototype'][_0x283c20(0x258)]=function(_0x35695d){const _0x54fee6=_0x283c20,_0x4528fc=this[_0x54fee6(0x164)](_0x35695d),_0x3a5097=VisuMZ[_0x54fee6(0x85a)][_0x54fee6(0x914)][_0x54fee6(0x7ee)][_0x54fee6(0x1cc)][_0x35695d],_0x8dd82f=TextManager[_0x54fee6(0x508)](_0x3a5097),_0xd6dae7=this[_0x54fee6(0x57d)]['paramValueByName'](_0x3a5097,!![]);this[_0x54fee6(0x488)](_0x4528fc['x'],_0x4528fc['y'],0xa0,_0x3a5097,![]),this[_0x54fee6(0x496)](),this[_0x54fee6(0x367)](_0xd6dae7,_0x4528fc['x']+0xa0,_0x4528fc['y'],0x3c,_0x54fee6(0x15d));};if(VisuMZ['CoreEngine'][_0x283c20(0x914)][_0x283c20(0x1f7)][_0x283c20(0x13c)]){VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x1f7)][_0x283c20(0x495)]&&(Window_NameInput[_0x283c20(0x4c0)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x283c20(0x37a),'OK']);;VisuMZ[_0x283c20(0x85a)][_0x283c20(0x75c)]=Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x3a9)],Window_NameInput['prototype'][_0x283c20(0x3a9)]=function(_0x59c1e4){const _0x3f4607=_0x283c20;this[_0x3f4607(0x1fd)]=this['defaultInputMode'](),VisuMZ['CoreEngine'][_0x3f4607(0x75c)][_0x3f4607(0x5d8)](this,_0x59c1e4),this['_mode']===_0x3f4607(0x7f5)?_0x3f4607(0x547)===_0x3f4607(0x547)?this['select'](0x0):this[_0x3f4607(0x4d6)](_0x11f44c):(Input['clear'](),this[_0x3f4607(0x641)]());},Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x2d3)]=function(){const _0x186de3=_0x283c20;if(Input[_0x186de3(0x7cf)]())return _0x186de3(0x7f5);return VisuMZ['CoreEngine'][_0x186de3(0x914)][_0x186de3(0x1f7)][_0x186de3(0x4fa)]||'keyboard';},VisuMZ['CoreEngine'][_0x283c20(0x885)]=Window_NameInput['prototype']['processHandling'],Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x7b1)]=function(){const _0x433057=_0x283c20;if(!this[_0x433057(0x909)]())return;if(!this[_0x433057(0x339)])return;if(this[_0x433057(0x1fd)]===_0x433057(0x1df)&&Input[_0x433057(0x709)]())this[_0x433057(0x8c4)]('default');else{if(Input['isSpecialCode'](_0x433057(0x61b))){if(_0x433057(0x3bd)!==_0x433057(0x3bd))return![];else Input[_0x433057(0x5e1)](),this[_0x433057(0x7d3)]();}else{if(Input[_0x433057(0x55e)]('tab'))'cGksG'===_0x433057(0x504)?(Input[_0x433057(0x5e1)](),this['_mode']===_0x433057(0x1df)?this[_0x433057(0x8c4)](_0x433057(0x7f5)):this[_0x433057(0x8c4)](_0x433057(0x1df))):_0x3f1a09+=_0x433057(0x44c);else{if(this[_0x433057(0x1fd)]==='keyboard')this[_0x433057(0x25b)]();else{if(Input['isSpecialCode'](_0x433057(0xfe))){if(_0x433057(0x5f0)!==_0x433057(0x306))Input[_0x433057(0x5e1)](),this[_0x433057(0x8c4)]('keyboard');else return _0x36585d[_0x433057(0x85a)][_0x433057(0x42e)]['call'](this,_0x11d0a6);}else _0x433057(0x66e)!==_0x433057(0x66e)?this['cursorRight'](_0x511e03['isTriggered']('right')):VisuMZ[_0x433057(0x85a)][_0x433057(0x885)][_0x433057(0x5d8)](this);}}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x34f)],Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x34f)]=function(){const _0x5a9231=_0x283c20;if(!this[_0x5a9231(0x865)]())return;if(this[_0x5a9231(0x1fd)]===_0x5a9231(0x1df)){if(_0x5a9231(0x569)===_0x5a9231(0x569)){if(TouchInput[_0x5a9231(0x55e)]()&&this[_0x5a9231(0x1b0)]())_0x5a9231(0x3f9)!==_0x5a9231(0x10d)?this[_0x5a9231(0x8c4)](_0x5a9231(0x7f5)):this[_0x5a9231(0x24d)]+=_0xb75ae0['round']((_0x41d98c[_0x5a9231(0x4ef)]-0x330)/0x2);else TouchInput[_0x5a9231(0x70b)]()&&this[_0x5a9231(0x8c4)](_0x5a9231(0x7f5));}else this[_0x5a9231(0x3e2)]=[];}else VisuMZ[_0x5a9231(0x85a)]['Window_NameInput_processTouch'][_0x5a9231(0x5d8)](this);},Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x25b)]=function(){const _0x48cb09=_0x283c20;if(Input[_0x48cb09(0x586)](_0x48cb09(0x183)))Input[_0x48cb09(0x5e1)](),this[_0x48cb09(0x303)]();else{if(Input[_0x48cb09(0x703)]!==undefined){let _0x3d8c76=Input[_0x48cb09(0x703)],_0x52ee53=_0x3d8c76[_0x48cb09(0x6a1)];for(let _0x60c21e=0x0;_0x60c21e<_0x52ee53;++_0x60c21e){this['_editWindow'][_0x48cb09(0x82b)](_0x3d8c76[_0x60c21e])?SoundManager[_0x48cb09(0x52d)]():SoundManager['playBuzzer']();}Input[_0x48cb09(0x5e1)]();}}},Window_NameInput['prototype'][_0x283c20(0x8c4)]=function(_0x20936c){const _0x121f81=_0x283c20;let _0xe379f5=this['_mode'];this[_0x121f81(0x1fd)]=_0x20936c;if(_0xe379f5!==this[_0x121f81(0x1fd)]){if(_0x121f81(0x65e)===_0x121f81(0x65e))this[_0x121f81(0x661)](),SoundManager[_0x121f81(0x52d)](),this[_0x121f81(0x1fd)]===_0x121f81(0x7f5)?_0x121f81(0x807)!==_0x121f81(0x366)?this[_0x121f81(0x623)](0x0):_0x4aca96+='([\x5c+\x5c-]\x5cd+)([%％])>':this['select'](-0x1);else{const _0x3b4564=_0x121f81(0x2dd);this[_0x121f81(0x3f7)]=this[_0x121f81(0x3f7)]||{};if(this[_0x121f81(0x3f7)][_0x3b4564])return this['_colorCache'][_0x3b4564];const _0x295010=_0x2a327f['CoreEngine']['Settings'][_0x121f81(0x113)][_0x121f81(0x1ca)];return this[_0x121f81(0x21e)](_0x3b4564,_0x295010);}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x3d0)]=Window_NameInput['prototype']['cursorDown'],Window_NameInput[_0x283c20(0x44e)]['cursorDown']=function(_0x4d5513){const _0x383005=_0x283c20;if(this[_0x383005(0x1fd)]==='keyboard'&&!Input[_0x383005(0x218)]())return;if(Input[_0x383005(0x2aa)]())return;VisuMZ[_0x383005(0x85a)]['Window_NameInput_cursorDown']['call'](this,_0x4d5513),this[_0x383005(0x8c4)](_0x383005(0x7f5));},VisuMZ['CoreEngine']['Window_NameInput_cursorUp']=Window_NameInput[_0x283c20(0x44e)]['cursorUp'],Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x445)]=function(_0x35029d){const _0x449989=_0x283c20;if(this[_0x449989(0x1fd)]==='keyboard'&&!Input[_0x449989(0x218)]())return;if(Input[_0x449989(0x2aa)]())return;VisuMZ[_0x449989(0x85a)][_0x449989(0x182)][_0x449989(0x5d8)](this,_0x35029d),this[_0x449989(0x8c4)]('default');},VisuMZ['CoreEngine'][_0x283c20(0x4f2)]=Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x26d)],Window_NameInput[_0x283c20(0x44e)]['cursorRight']=function(_0x363705){const _0x50e5c4=_0x283c20;if(this[_0x50e5c4(0x1fd)]===_0x50e5c4(0x1df)&&!Input[_0x50e5c4(0x218)]())return;if(Input[_0x50e5c4(0x2aa)]())return;VisuMZ[_0x50e5c4(0x85a)][_0x50e5c4(0x4f2)][_0x50e5c4(0x5d8)](this,_0x363705),this[_0x50e5c4(0x8c4)](_0x50e5c4(0x7f5));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x70d)]=Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x686)],Window_NameInput['prototype'][_0x283c20(0x686)]=function(_0xe6f2c4){const _0x5c4860=_0x283c20;if(this[_0x5c4860(0x1fd)]==='keyboard'&&!Input[_0x5c4860(0x218)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5c4860(0x85a)][_0x5c4860(0x70d)][_0x5c4860(0x5d8)](this,_0xe6f2c4),this[_0x5c4860(0x8c4)]('default');},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x448)]=Window_NameInput[_0x283c20(0x44e)]['cursorPagedown'],Window_NameInput[_0x283c20(0x44e)]['cursorPagedown']=function(){const _0x364d8f=_0x283c20;if(this['_mode']==='keyboard')return;if(Input[_0x364d8f(0x2aa)]())return;VisuMZ[_0x364d8f(0x85a)][_0x364d8f(0x448)]['call'](this),this[_0x364d8f(0x8c4)]('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']=Window_NameInput[_0x283c20(0x44e)]['cursorPageup'],Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x474)]=function(){const _0x4e2525=_0x283c20;if(this['_mode']==='keyboard')return;if(Input[_0x4e2525(0x2aa)]())return;VisuMZ[_0x4e2525(0x85a)][_0x4e2525(0x330)][_0x4e2525(0x5d8)](this),this['switchModes'](_0x4e2525(0x7f5));},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x881)]=Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x661)],Window_NameInput[_0x283c20(0x44e)][_0x283c20(0x661)]=function(){const _0x4e0d0e=_0x283c20;if(this[_0x4e0d0e(0x1fd)]==='keyboard'){if(_0x4e0d0e(0x8ad)!=='xkhdA')return _0xc7915c[_0x4e0d0e(0x85a)][_0x4e0d0e(0x914)][_0x4e0d0e(0x5be)]['FontWidthFix']??!![];else{this['contents']['clear'](),this[_0x4e0d0e(0x85b)][_0x4e0d0e(0x5e1)](),this['resetTextColor']();let _0x1612c7=VisuMZ[_0x4e0d0e(0x85a)][_0x4e0d0e(0x914)][_0x4e0d0e(0x1f7)][_0x4e0d0e(0x7fa)]['split']('\x0a'),_0x93089e=_0x1612c7[_0x4e0d0e(0x6a1)],_0x10cbc6=(this[_0x4e0d0e(0x5a4)]-_0x93089e*this['lineHeight']())/0x2;for(let _0x2993f0=0x0;_0x2993f0<_0x93089e;++_0x2993f0){let _0x1658e7=_0x1612c7[_0x2993f0],_0x2eba0b=this[_0x4e0d0e(0x577)](_0x1658e7)[_0x4e0d0e(0x3d3)],_0x3a8aa8=Math[_0x4e0d0e(0x214)]((this['contents']['width']-_0x2eba0b)/0x2);this[_0x4e0d0e(0x6b3)](_0x1658e7,_0x3a8aa8,_0x10cbc6),_0x10cbc6+=this[_0x4e0d0e(0x261)]();}}}else _0x4e0d0e(0x4c3)===_0x4e0d0e(0x823)?this[_0x4e0d0e(0x619)][_0x4e0d0e(0x22a)](_0xde63db['layoutSettings'][_0x4e0d0e(0x6c1)]):VisuMZ[_0x4e0d0e(0x85a)]['Window_NameInput_refresh']['call'](this);};}function _0x1e92(){const _0x166efa=['ExtJS','MAT','WIN_OEM_FJ_MASSHOU','DrawItemBackgroundJS','coreEngineRepositionEnemies','tRyWL','style','setColorTone','_playtestF7Looping','ItemStyle','HYPHEN_MINUS','aPqav','Game_Picture_updateMove','levelUp','GRD','dyyLD','RegExp','createPointAnimationTargets','drawCharacter','onKeyDownKeysF6F7','itemPadding','isBottomHelpMode','jgBkE','IicfS','fONwi','usCrw','ItemBackColor2','IconParam3','INOUTCIRC','retrievePointAnimation','updatePositionCoreEngineShakeVert','setViewportCoreEngineFix','BgFilename2','Window_Base_drawFace','getBackgroundOpacity','_viewportSize','drawGameSubtitle','startAnimation','_movementDuration','GsIbB','NUM_LOCK','OUTQUINT','fYhQR','buttonAssistKey2','setMoveEasingType','StatusEquipRect','INOUTBACK','slotWindowRect','vDYqu','uiAreaHeight','enemies','_makeFontNameText','IconParam6','hlqlN','WIN_OEM_BACKTAB','getInputButtonString','playOnceParallelInterpreter','useDigitGroupingEx','_onceParallelInterpreters','loadSystem','playTestF6','DEF','vTYzM','Game_Interpreter_command355','OUTBACK','pages','ColorTPGauge2','buttonAreaHeight','QUOTE','LvExpGauge','_encounterCount','_windowLayer','END','_dummyWindow','Pixelated','createEnemies','mainAreaTop','FjJoZ','createFauxAnimationQueue','PictureEraseAll','sRpBd','processHandling','startNormalGame','command111','buyWindowRect','Scene_MenuBase_mainAreaTop','fbOED','encounterStepsMinimum','Padding','JBXLP','IjTOE','quit','updateTransform','globalAlpha','ColorHPGauge2','Linear','text','_pagedownButton','TCR','WIN_OEM_FJ_TOUROKU','isGamepadButtonPressed','Window_Base_createTextState','valueOutlineColor','WIN_ICO_CLEAR','_hideButtons','isSmartEventCollisionOn','bvaiF','key%1','DigitGroupingLocale','%1〘Choice\x20Cancel〙%1','_data','isGamepadConnected','mpGaugeColor1','mhp','ColorCTGauge1','processBack','gradientFillRect','_opacity','Scene_MenuBase_createPageButtons','_shakeDuration','ProfileRect','none','destroyCoreEngineMarkedBitmaps','clearZoom','MDR','xparamFlat1','terminate','Window_NumberInput_start','MEV','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_spriteset','ExportString','isFauxAnimationPlaying','gaugeBackColor','VvyaY','processCursorHomeEndTrigger','animations','BlurFilter','smallParamFontSize','Sprite_Button_updateOpacity','drawGoldItemStyle','FRuVo','Param','image-rendering','2248044wMiKRR','playTestF7','upKtI','Game_Action_itemEva','pictures','default','BattleManager_checkSubstitute','evaluate','NewGameCommonEventAll','statusWindowRect','NameInputMessage','ZlXWB','ceil','xYHDt','updateData','constructor','#%1','FontShadows','drawGameVersion','loadBitmap','updatePosition','_hideTileShadows','NTViw','hJeXU','setupValueFont','ColorNormal','Spriteset_Base_update','Sprite_Picture_updateOrigin','paramBaseAboveLevel99','SHIFT','ColorManager_loadWindowskin','BattleSystem','_stored_powerUpColor','SOBpa','FmSGG','DimColor2','ivvqk','Sprite_Battler_startMove','VisuMZ_2_BattleSystemSTB','displayName','context','xparamPlus1','getPointAnimationLayer','_pressed','battleSystem','command122','makeCommandList','KVaTe','buttons','IDs','isTpb','zUoww','isOptionValid','loadMapData','contains','dRYtX','shake','ColorHPGauge1','〘Common\x20Event\x20%1:\x20%2〙\x20Start','add','sv_actors','VisuMZ_2_BattleSystemCTB','IybxA','showFauxAnimations','HRG','Window_Base_drawCharacter','_targetOffsetX','windowRect','oDlkv','targetScaleY','log','bgsVolume','_stored_powerDownColor','VisuMZ_2_BattleSystemFTB','WKmIL','CustomParamAbb','_changingClass','qMRJR','_destroyInternalTextures','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','fAarz','exec','loadPicture','kanxY','setupFont','paramFlat','setWindowPadding','ExportCurMapText','process_VisuMZ_CoreEngine_Settings','exportAllTroopStrings','Window_Selectable_cursorUp','XadwL','xdg-open','isMaxLevel','LESS_THAN','_cache','clearStencil','AllTroops','EISU','rgba(0,\x200,\x200,\x200.7)','paramchangeTextColor','pUmit','WIN_OEM_FJ_LOYA','faceHeight','paramWidth','setClickHandler','CoreEngine','contentsBack','vRVWp','drawBackgroundRect','MenuLayout','_menuButton','CRI','max','maxCols','0.00','textHeight','isOpenAndActive','_baseTexture','command105','BattleManager_update','zegtl','HuIMV','subjectHitRate','_backSprite2','value','Flat1','createCustomParameter','_opening','CommandWidth','PDR','Game_Screen_initialize','sparamPlusJS','_margin','AnimationID','test','PLAY','Game_Actor_paramBase','RHpZb','XParamVocab1','eva','iconWidth','updateCoreEasing','Game_Picture_initBasic','WASD','Window_NameInput_refresh','BTB','Enable','_pictureCoordinatesWindow','Window_NameInput_processHandling','clone','SPACE','skillTypeWindowRect','isNwjs','setupButtonImage','outlineColorGauge','WIN_OEM_CLEAR','_createInternalTextures','scaleMode','FINAL','catchException','ScaleY','CancelText','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','isInstanceOfSceneMap','targetScaleX','_action','updateMove','JUNJA','MRF','MRG','DQjvn','systemColor','cfVKT','makeInputButtonString','setSideButtonLayout','_buttonAssistWindow','ALWAYS','Scene_Map_createSpriteset_detach','yxPbW','defineProperty','setTargetAnchor','_helpWindow','CRRRF','advanced','\x5c}❪SHIFT❫\x5c{','cancel','tDlxH','OUTCUBIC','xkhdA','createDimmerSprite','ARRAYEVAL','initCoreEasing','NCGEQ','SParamVocab3','canAttack','PRESERVCONVERSION(%1)','_backSprite','_targetAnchor','BWTfs','HdInw','Game_Picture_y','scaleSprite','bEpFw','isPlaytest','ShowItemBackground','_cancelButton','isGameActive','CLOSE_BRACKET','NUMPAD9','cursorPagedown','outbounce','switchModes','RPGMAKER_VERSION','ojFme','JSDPl','processKeyboardDigitChange','restore','BgType','Troop%1','vertJS','mute','fmYgD','INOUTQUART','SELECT','ShortcutScripts','mainFontSize','maxLvGaugeColor1','redraw','removeAllPointAnimations','maxItems','contentsOpacity','_hp','retrieveFauxAnimation','option','currentClass','createPageButtons','pagedown','KlPWa','Game_Interpreter_PluginCommand','createJsQuickFunction','_stored_mpGaugeColor1','setBattleSystem','FFSLv','bitmapHeight','areButtonsOutsideMainUI','ZJzMd','_pictureContainer','_goldWindow','IconSParam8','buttonAssistOffset2','buttonAssistOk','hyBew','drawActorSimpleStatus','EQUALS','top','_buyWindow','XParamVocab7','shift','_pointAnimationQueue','min','keypress','updatePadding','mainAreaHeight','sDQmC','LMfZY','_backgroundSprite','makeAutoBattleActions','ParseActorNotetags','Window_Selectable_cursorDown','HELP','QfiJF','BACKSPACE','smoothSelect','PAUSE','EREOF','getLastPluginCommandInterpreter','REC','mainAreaHeightSideButtonLayout','yfppe','SystemSetSideView','isOpen','ParseClassNotetags','status','getCustomBackgroundSettings','axySq','Flat2','_mainSprite','hide','clearCachedKeys','updateWaitMode','createPointAnimation','Settings','outlineColorDmg','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','dimColor1','GET','processSoundTimings','actorWindowRect','nTjUF','VisuMZ_2_BattleSystemETB','PA1','centerSprite','setup','BoxMargin','OUTQUART','buttonY','textColor','%1:\x20Exit\x20','targetBackOpacity','_upArrowSprite','batch','getInputMultiButtonStrings','darwin','drawActorClass','sv_enemies','SDTfT','dsTFO','useDigitGrouping','_pollGamepads','COLON','WIN_OEM_ATTN','optionsWindowRect','IconSParam4','pressed','xparamRateJS','MODECHANGE','process_VisuMZ_CoreEngine_RegExp','Scene_Map_initialize','escape','TYsns','send','endAnimation','resetBattleSystem','VariableEvalReference','Wait','_optionsWindow','pointY','sBZew','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_height','_gamepadWait','LevelUpFullHp','GroupDigits','pJbhF','updateOpacity','ExportAllMapText','integer','enemy','object','Color','Game_Event_start','ScLKf','_clientArea','vIUrA','update','erMbv','XyIPr','IVloq','_mapNameWindow','buttonAssistWindowButtonRect','setupNewGame','initButtonHidden','drawTextTopAligned','NewGameBoot','updateMain','setupCoreEngine','KdfZR','_sellWindow','traitsPi','sceneTerminationClearEffects','maxBattleMembers','playBuzzer','zMmnN','onDatabaseLoaded','Scene_Base_terminateAnimationClearBugFix','Upper\x20Left','process_VisuMZ_CoreEngine_jsQuickFunctions','maxTp','Input_clear','xLRsI','pop','VOLUME_UP','CNT','KeyItemProtect','EXVCA','_stored_expGaugeColor1','VisuMZ_1_OptionsCore','_drawTextOutline','PcaBG','Scene_Menu_create','EnableNameInput','FgrEO','INBACK','Scene_MenuBase_createCancelButton','qEIUc','Scene_Name_create','performMiss','dimColor2','itemRect','eventsXyNt','WIN_OEM_AUTO','type','lGrTE','Input_update','OeUQd','Game_Actor_levelUp','bQFhp','_digitGroupingEx','Window_Base_drawText','showPicture','uJZlc','BaseTexture','indexOf','buttonAssistWindowSideRect','StatusRect','toLowerCase','_backgroundFilter','repositionCancelButtonSideButtonLayout','TKcQT','ErELt','〘Common\x20Event\x20%1:\x20%2〙\x20End','Scene_Skill_create','EscapeAlways','right','_onKeyDown','_shakeSpeed','command357','VOLUME_DOWN','left','push','itemLineRect','Gold','rEKUH','SParameterFormula','Sprite_Button_initialize','drawActorNickname','OnDnW','isNormalPriority','itemBackColor1','Sprite_Picture_loadBitmap','Qkuji','processFauxAnimationRequests','URPvF','OTB','IconXParam0','OkText','FiQud','updateDocumentTitle','BEBxD','GQruy','resize','center','Scene_Equip_create','tCZDU','ModernControls','Renderer','NUMPAD4','dVJHy','Game_Picture_calcEasing','Type','Window_NameInput_cursorUp','enter','MIN_SAFE_INTEGER','ActorRect','attackSkillId','goto','MRUGR','process_VisuMZ_CoreEngine_Functions','_stored_normalColor','ParseEnemyNotetags','start','Scene_Battle_createSpriteset','buttonAssistWindowRect','ParseTilesetNotetags','ColorMPGauge1','CEV','BTestArmors','kbipE','REPLACE','itemHeight','TextJS','PositionX','targetY','lAjJs','Sprite_destroy','fillRect','Scene_Battle_update','BexKU','hIkhn','TitleCommandList','paramPlusJS','drawCurrentParam','onClick','measureTextWidth','currencyUnit','Scene_Base_terminate','processKeyboardEnd','GwHdn','retreat','BuyRect','system','IxxJe','VpLxd','CategoryBgType','endAction','PositionY','isTouchedInsideFrame','SceneManager_initialize','setMute','rgba(0,\x200,\x200,\x201.0)','_listWindow','checkSubstitute','playLoad','ParamName','_clickHandler','WIN_OEM_PA1','_realScale','Ehwdz','setActorHome','TextStr','_commonEventLayers','LINEAR','wXbsJ','TextCodeNicknames','Flat','Opacity','Skjmk','updateShadow','Window_NumberInput_processDigitChange','params','processAlwaysEscape','clearForcedGameTroopSettingsCoreEngine','ColorTPCost','loadWindowskin','DisplayedParams','OpenSpeed','Sprite_AnimationMV_updatePosition','calcEasing','ColorExpGauge2','picture','fontSize','bgs','mYumo','CLOSE_PAREN','X:\x20%1','OPEN_BRACKET','isItemStyle','ZZQZk','evade','%1〘Choice\x20%2〙\x20%3%1','getCoreEngineScreenShakeStyle','blendFunc','Scene_Shop_create','keyboard','Input_pollGamepads','setViewport','utcup','setupRate','isForFriend','string','LEFT','fadeSpeed','hpGaugeColor2','wpvvo','uNNOm','NeSfS','TimeProgress','IconSParam9','XwCVK','kyYmL','_numberWindow','subject','UImmY','encounterStep','IconSParam2','Enemy','createFauxAnimation','KeyboardInput','drawFace','Scene_MenuBase_helpAreaTop','erasePicture','isFullDocumentTitle','bcsLK','_mode','WIN_OEM_FJ_ROYA','fINQL','Scene_Unlisted','showDevTools','overrideMimeType','nvFJZ','popScene','missed','mpColor','Game_Event_isCollidedWithEvents','show','ExtractStrFromTroop','ColorPowerUp','mirror','_active','ZdXIm','IconXParam3','printError','processPointAnimationRequests','sparamPlus','drawActorLevel','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','floor','SmartEventCollisionPriority','(\x5cd+)>','_width','isArrowPressed','_stored_ctGaugeColor2','_effectsContainer','description','categoryWindowRect','NUMPAD7','getColorDataFromPluginParameters','skills','ZUJOO','wait','kiKDr','JeaIJ','XParamVocab5','_duration','GoldIcon','Game_Temp_initialize','_animationQueue','_stored_systemColor','setBackgroundType','MULTIPLY','F6key','targetObjects','initCoreEngine','createWindowLayer','_commandList','mainAreaTopSideButtonLayout','textWidth','_offsetY','buttonAssistText%1','allowShiftScrolling','getBattleSystem','_skillTypeWindow','mzzHu','createTitleButtons','_stored_ctGaugeColor1','onMoveEnd','updatePictureAntiZoom','duration','openingSpeed','focus','buttonAssistOffset1','ItemBgType','getCombinedScrollingText','replace','_centerElementCoreEngine','updateOpen','HRHBz','Scene_MenuBase_mainAreaHeight','Game_Action_itemHit','ARRAYSTRUCT','members','pointX','trtom','_screenX','isSceneBattle','connected','_targetOffsetY','EXSEL','startMove','moveMenuButtonSideButtonLayout','children','Conditional\x20Branch\x20Script\x20Error','skipBranch','RequireFocus','drawItem','Subtitle','skillTypes','processKeyboardHandling','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','buttonAssistCancel','maxLvGaugeColor2','ALT','process_VisuMZ_CoreEngine_Notetags','lineHeight','_downArrowSprite','parameters','number','OutlineColorDmg','Scene_Boot_onDatabaseLoaded','StatusParamsBgType','isWindowMaskingEnabled','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','RepositionEnemies','isPointAnimationPlaying','WiSwp','cursorRight','asin','Game_BattlerBase_refresh','img/%1/','titleCommandWindow','battlebacks2','EXR','》Comment《\x0a%1\x0a','iItmv','MenuBg','VhNky','showPointAnimations','ImprovedAccuracySystem','_subject','STRUCT','UGnIX','paramName','random','updateKeyText','numberShowButton','createPointAnimationSprite','SLEEP','IconSParam6','_inputSpecialKeyCode','nextLevelExp','VzTlY','toUpperCase','F20','trsJN','playEscape','subtitle','ScreenResolution','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','setBackgroundOpacity','XParamVocab8','reserveCommonEvent','loadGameImagesCoreEngine','GjdbS','ZOOM','nzrJy','RIGHT','CONTEXT_MENU','Window_Base_initialize','nmCHa','Scene_Item_create','FCsUh','IconSet','offsetX','Show\x20Scrolling\x20Text\x20Script\x20Error','buttonAssistText5','IconXParam4','F23','destroy','WIN_ICO_HELP','Bitmap_fillRect','PTB','createCustomBackgroundImages','Untitled','\x20Origin:\x20%1','IVGCk','normalColor','isNumpadPressed','BeNqb','drawGameTitle','horzJS','terms','worldTransform','SystemLoadImages','IconXParam5','fYikh','animationShouldMirror','FunctionName','pUasx','ApplyEasing','textAlign','updatePositionCoreEngine','zIdoe','Scene_Map_updateScene','INCIRC','paramMax','_stored_pendingColor','Bitmap_resize','Game_Character_processMoveCommand','measureTextWidthNoRounding','jEXMr','GoldRect','_mirror','AccuracyBoost','buttonAssistKey%1','CustomParamType','SwitchToggleOne','expRate','ParseSkillNotetags','oYMzN','CAPSLOCK','pendingColor','dlYub','vertical','BKuof','ExportStrFromAllTroops','drawIconBySize','doesNameContainBannedWords','defaultInputMode','DJGoY','INSINE','sqrt','ParseItemNotetags','createCancelButton','StatusMenu','DOLLAR','PixelateImageRendering','odgCE','_stored_tpCostColor','_baseSprite','BvkGU','ejUGc','applyCoreEasing','WIN_OEM_ENLW','xoDBP','RepositionActors','valueOutlineWidth','Bitmap_drawCircle','_inputWindow','ibzox','cAPgf','ZxnhM','Manual','META','aVCuN','_targetScaleY','BPOht','tpColor','createBuffer','battlebacks1','gaugeRate','XParamVocab0','AOkvs','NUM','windowOpacity','_hovered','isUseModernControls','move','apply','BackOpacity','_itemWindow','CodeJS','KeySHIFT','Unnamed','reserveNewGameCommonEvent','MTeQQ','onNameOk','TGxuh','isKeyItem','kHwYP','targetPosition','IconXParam1','exit','CIRCUMFLEX','createMenuButton','setGuard','titles2','tTGWT','_stored_hpGaugeColor1','Y:\x20%1','VisuMZ_2_BattleSystemOTB','match','xScrollLinkedOffset','sHWDg','isSideButtonLayout','Smooth','updatePlayTestF7','NajbB','KeyTAB','1827108ngABiR','Game_Interpreter_command122','krzsM','fillText','gold','paramX','isEventRunning','setActorHomeRepositioned','application/json','TPB\x20ACTIVE','currentExp','bvlQE','CTB','ColorGaugeBack','NewGameCommonEvent','Script\x20Call\x20Error','EBRlz','Sprite_AnimationMV_processTimingData','makeDeepCopy','Window_EquipItem_isEnabled','tileHeight','FadeSpeed','Window_NameInput_cursorPageup','EVAL','TILDE','Scene_Battle_createSpritesetFix','processCursorMoveModernControls','ProfileBgType','adjustPictureAntiZoom','isItem','create','active','catchNormalError','HJjCG','ALTGR','vUwTh','GoldBgType','Mute','gainGold','bitmap','processKeyboardBackspace','ActorHPColor','F22','ctrl','gnSPW','F7key','Scene_Title_drawGameTitle','isBottomButtonMode','Game_BattlerBase_initMembers','_pointAnimationSprites','strokeRect','wULpq','initBasic','processTouch','_muteSound','mapId','updatePositionCoreEngineShakeHorz','setAction','HIT','Plus1','ParamChange','processTimingData','areButtonsHidden','ONE_MINUS_SRC_ALPHA','resetFontSettings','updateClose','PreserveNumbers','_isButtonHidden','randomInt','WIN_OEM_COPY','IconSParam0','mpGaugeColor2','woRvf','OUTSINE','F12','_forcedTroopView','CDBvz','drawText','F21','ItemMenu','VURBM','code','FTB','uiAreaWidth','hpColor','reduce','gqbhh','requestMotion','processKeyboardDelete','stypeId','sparamRate','NONCONVERT','_repositioned','WIN_ICO_00','getLevel','F18','Page','Window_Selectable_processCursorMove','FMzNM','DigitGroupingDamageSprites','map','Version','tilesets','nickname','ButtonHeight','PERCENT','STB','backOpacity','NUMPAD6','PictureEraseRange','yzOjC','createTroopNote','SwitchActorText','Scene_Map_updateMainMultiply','expGaugeColor2','([\x5c+\x5c-]\x5cd+)>','ONE','_forcedBattleSys','SLASH','_screenY','makeDocumentTitle','DOUBLE_QUOTE','flush','ARRAYSTR','statusEquipWindowRect','Input_onKeyDown','xsFTa','_windowskin','deathColor','brWmJ','isBusy','CategoryRect','Center','ColorExpGauge1','xparamPlus','playMiss','paramPlus','_shouldPreventDefault','checkSmartEventCollision','YsluG','font-smooth','Abbreviation','SlotBgType','initialize','DmVFI','Window_MapName_refresh','markCoreEngineModified','targetOpacity','up2','ETB','Map%1.json','ActorMPColor','repeat','qARtS','VisuMZ_2_BattleSystemBTB','faces','CANCEL','actor','_moveEasingType','isEnemy','YsKfD','ctGaugeColor1','Input_shouldPreventDefault','ZKZRu','onerror','powerUpColor','setValue','VsGOO','drawGauge','PictureCoordinatesMode','SParamVocab1','clearRect','INQUART','endBattlerActions','Bitmap_drawText','toLocaleString','Scene_Map_createSpriteset','xparamPlus2','_profileWindow','framebuffer','_commandWindow','Icon','Window_NameInput_cursorDown','KoOxd','WIN_OEM_JUMP','width','createCommandWindow','TAB','OptionsMenu','Window_Base_drawIcon','createBackground','targetSpritePosition','mQAJs','_paramPlus','ColorMPCost','CMoqP','Scene_Battle_createCancelButton','_tilemap','VtzXb','ButtonFadeSpeed','_fauxAnimationQueue','jbJms','learnings','RepositionEnemies130','WIN_OEM_PA3','exp','applyEasing','Tyzol','ParamMax','gPamE','keyRepeatWait','initDigitGrouping','removeOnceParallelInterpreter','gSaOi','name','BgFilename1','uFXan','playCursor','_pictureName','loadIconBitmap','drawValue','_colorCache','isMapScrollLinked','PzYYW','updateMotion','_targets','animationId','isPlaying','list','ARRAYJSON','ColorSystem','eGAIw','ItemRect','OutlineColor','xparamFlatJS','5udUUuc','_pageupButton','clearOnceParallelInterpreters','IconXParam8','_pictureCoordinatesMode','imageSmoothingEnabled','ADD','PGUP','note','needsUpdate','bFIvc','targets','jGZvT','Game_Interpreter_command111','VbAFt','jsQuickFunc','Window','SystemSetFontSize','dTekR','1326488yKwqbR','_cacheScaleY','TGR','FgQOZ','goldWindowRect','AsgJS','ENTER','_CoreEngineSettings','MDzCO','_lastY','createSpriteset','ATK','GoldOverlap','_coreEasingType','OptionsRect','SParamVocab2','jkWtk','PRINT','%1/','gainItem','MAX_GL_TEXTURES','_buttonType','TextManager_param','_sideButtonLayout','FDR','blEmQ','WIN_OEM_PA2','setMainFontSize','IconXParam7','ParseAllNotetags','Window_Gold_refresh','EVA','remove','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Map%1','processTouchModernControls','turn','targetX','filters','setHome','LaTei','ScreenShake','transform','aAXow','stencilFunc','cursorUp','_categoryWindow','TPB\x20WAIT','Window_NameInput_cursorPagedown','Scene_Base_createWindowLayer','nah','yiiLt','(\x5cd+\x5c.?\x5cd+)>','_customModified','prototype','Game_Picture_show','openness','PHA','SideView','Total','_isWindow','applyForcedGameTroopSettingsCoreEngine','setHandler','SParamVocab6','dXGsY','SwitchRandomizeRange','DamageColor','text%1','numActions','processKeyboardHome','zqhap','buttonAssistText1','ParseArmorNotetags','ValueJS','updatePictureCoordinates','version','loadTitle1','sparamFlat2','PictureShowIcon','Spriteset_Battle_createEnemies','processDigitChange','characters','enable','setupCustomRateCoreEngine','HOME','blockWidth','<%1\x20%2:[\x20]','KtFtj','Title','Game_Map_setup','PueHO','startAutoNewGame','cursorPageup','_registerKeyInput','HUDFc','_statusParamsWindow','inBattle','DocumentTitleFmt','MAXHP','waiting','listWindowRect','removePointAnimation','refreshWithTextCodeSupport','xparamRate1','beesr','CustomParamNames','Spriteset_Base_initialize','SaveMenu','enableDigitGrouping','setLastPluginCommandInterpreter','BAlOZ','keyCode','drawParamText','XOuDi','isAnimationOffsetXMirrored','axjwP','SubfolderParse','Chance','addEventListener','Scene_GameEnd_createBackground','updateAnchor','catchLoadError','maxLevel','HASH','EnableJS','QwertyLayout','resetTextColor','Sprite_Gauge_gaugeRate','buttonAssistOffset4','catchUnknownError','pbxgm','FfDgG','_context','aQwkI','loadTitle2','currentLevelExp','_stored_crisisColor','OS_KEY','Game_Interpreter_updateWaitMode','Window_Selectable_drawBackgroundRect','fillStyle','operand','setAttack','createTextState','round','CommonEventID','_anchor','gNAuX','isPressed','origin','ZHQva','lJElX','Bitmap_blt','initialBattleSystem','bpnGa','en-US','OutlineColorGauge','SEMICOLON','TRAIT_PARAM','Keyboard','ColorMPGauge2','processEscape','IconParam0','BTestWeapons','(\x5cd+)([%％])>','determineSideButtonLayoutValid','bPIap','StartID','LATIN1','buttonAssistText3','sparamPlus2','lPDCd','iLRmZ','paramMaxJS','Window_StatusBase_drawActorLevel','measureText','filterArea','CrisisRate','MAX_SAFE_INTEGER','_fauxAnimationSprites','_movementWholeDuration','_targetY','hit','SkillTypeRect','playCursorSound','MDF','WIN_OEM_FINISH','pageup','nLNXH','UKdmx','renderNoMask','ImgLoad','Bitmap_gradientFillRect','HZaXY','INOUTSINE','runCombinedScrollingTextAsCode','INSERT','_stored_hpGaugeColor2','deflate','hpGaugeColor1','isNextScene','Scene_Status_create','isSceneMap','ForceNoPlayTest','playCancel','hideButtonFromView','setSkill','dDzRy','VLVLU','smooth','mev','MapOnceParallel','Scene_Options_create','numRepeats','XnRsU','boxWidth','15390616GygneF','storeMapData','Window_NameInput_cursorRight','INOUTCUBIC','EditRect','Game_Picture_x','〘Show\x20Text〙\x0a','Rate','keyMapper','clamp','DefaultMode','xparamRate2','substring','iIiQd','Exported_Script_%1.txt','statusParamsWindowRect','oZtox','canUse','AnimationPoint','_storedMapText','cGksG','itemHit','charAt','IconParam2','param','CTqXy','createChildSprite','Control\x20Variables\x20Script\x20Error','iconHeight','_cacheScaleX','Window_Selectable_processTouch','KANA','TranslucentOpacity','KPYwE','setSideView','eICXQ','drawIcon','Game_Troop_setup','IconXParam9','Window_Selectable_itemRect','CallHandlerJS','_battlerName','Scene_Boot_startNormalGame','level','DetachMapPictureContainer','win32','OpenConsole','ColSpacing','format','removeChild','Window_ShopSell_isEnabled','ListBgType','SUBTRACT','forceStencil','index','calcCoreEasing','updateOnceParallelInterpreters','kvDZI','Game_Action_updateLastTarget','anchor','scQES','playOk','SwitchToggleRange','ButtonAssist','BottomHelp','INCUBIC','ColorMaxLvGauge2','hiTkF','SideButtons','_phase','%1\x0a','Game_Interpreter_command105','trim','HelpBgType','Dynam','_stored_maxLvGaugeColor2','DigitGroupingExText','scale','requestPointAnimation','updateCurrentEvent','_stored_maxLvGaugeColor1','CommandRect','DataManager_setupNewGame','YVUDv','Scene_Boot_updateDocumentTitle','Bitmap_initialize','openURL','jZCpM','responseText','removeFauxAnimation','vJXNf','URL','Tilemap_addShadow','moveCancelButtonSideButtonLayout','QlTBV','_closing','isDying','Graphics_centerElement','igMBT','isMVAnimation','_animation','onXhrError','fromCharCode','ColorCrisis','nicWR','NKFNG','isPhysical','isCursorMovable','outlineColor','IconParam4','isTriggered','SceneManager_onKeyDown','Window_Base_update','CommandBgType','initMembersCoreEngine','_updateFilterArea','EncounterRateMinimum','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','SwitchRandomizeOne','DimColor1','abs','xbWQq','StatusEquipBgType','Bitmap_clearRect','meVolume','xparamFlatBonus','bGpyT','INQUAD','isAnimationPlaying','isHandled','UNDERSCORE','_scene','_refreshBack','Speed','adjustSprite','textSizeEx','SlotRect','tdTWN','SceneManager_isGameActive','paramRateJS','rZFhh','_actor','ParamArrow','drawActorExpGauge','_offsetX','TMZAH','amvIY','BannedWords','Sprite_Animation_processSoundTimings','setCommonEvent','isSpecialCode','VMowO','onInputBannedWords','DATABASE','oNbCi','cancelShowButton','originalJS','XZyWJ','font','CLEAR','ParseStateNotetags','traitObjects','Actor','AGI','MCR','updateEffekseer','_targetScaleX','ExtDisplayedParams','ItemHeight','OxLlx','vvZIU','yScrollLinkedOffset','isAnimationForEach','includes','anchorCoreEasing','SnapshotOpacity','DetachBattlePictureContainer','IconParam7','parse','DpVTo','innerHeight','Layer','_isPlaytest','VisuMZ_2_BattleSystemPTB','NnddT','toString','Scene_MenuBase_createBackground','buttonAssistKey3','aBjLq','helpAreaTopSideButtonLayout','operation','qIdjX','_setupEventHandlers','itgWW','writeFile','INQUINT','mKwQg','item','Bitmap_strokeRect','IconXParam6','_digitGrouping','DzIGR','oHLZR','pagedownShowButton','IconSParam3','Bitmap_measureTextWidth','QoL','Game_Party_consumeItem','ConvertParams','data/','down','updatePointAnimations','Max','jqEms','INOUTELASTIC','_coreEasing','setCoreEngineScreenShakeStyle','CustomParamIcons','parseForcedGameTroopSettingsCoreEngine','AoISx','opacity','_logWindow','tpGaugeColor2','_coreEngineShakeStyle','_lastPluginCommandInterpreter','255185pzBrRP','Duration','LaprS','buttonAssistOffset3','boxHeight','_maxDigits','normal','call','processMoveCommand','updateDashToggle','drawBackground','iaRSq','\x5c}❪TAB❫\x5c{','_lastX','STENCIL_BUFFER_BIT','setSize','clear','_playTestFastMode','windowPadding','displayY','Input_setupEventHandlers','gObMi','INELASTIC','position','successRate','yaafO','GameEnd','sparam','isAlive','updateFauxAnimations','ItemBackColor1','PvmnR','isEnabled','ptrPb','Sprite_Actor_setActorHome','commandWindowRect','moveRelativeToResolutionChange','backgroundBitmap','drawCircle','Scene_Map_createMenuButton','_editWindow','aKxvK','IconParam5','inbounce','createFauxAnimationSprite','_shakePower','seVolume','Spriteset_Base_isAnimationPlaying','useFontWidthFix','stretch','profileWindowRect','_dimmerSprite','NUMPAD3','setCoreEngineUpdateWindowBg','paramValueByName','EUAgS','targetEvaRate','PERIOD','ARRAYNUM','PcWQk','isCollidedWithEvents','OPEN_PAREN','pow','concat','command355','LUK','_centerElement','AyQNm','%1%2','background','XParameterFormula','UpdatePictureCoordinates','_actorWindow','NumberBgType','backspace','_targetX','RowSpacing','_scaleX','expGaugeColor1','_rate','INEXPO','_mp','select','xparamFlat2','InputRect','makeEncounterCount','Power','title','powerDownColor','CreateBattleSystemID','setupCoreEasing','setEasingType','stencilOp','_drawTextShadow','altKey','xNmzK','layoutSettings','alignBottom','buttonAssistKey1','VOLUME_MUTE','_index','open','initVisuMZCoreEngine','hkRKF','ExtractStrFromMap','stringKeyMap','bind','WindowLayer_render','ListRect','consumeItem','_tempActor','_blank','deselect','XParamVocab3','SParamVocab7','updateLastTarget','faceWidth','paramRate2','processCursorMove','MvAnimationRate','KeyUnlisted','sparamRateJS','VPPfW','sparamRate1','Spriteset_Base_updatePosition','SceneManager_exit','forceOutOfPlaytest','SParamVocab5','_defaultStretchMode','mainCommandWidth','Scene_Base_create','_lastOrigin','helpAreaTop','FontSize','save','sparamPlus1','Plus2','smssB','gameTitle','onKeyDown','join','pdrhE','end','IconSParam7','refresh','GoldChange','Graphics_printError','updatePositionCoreEngineShakeRand','_target','contents','Scene_Map_createSpritesetFix','Hiwle','isMenuButtonAssistEnabled','button','NoTileShadows','Spriteset_Base_destroy','itemSuccessRate','TFxBx','isRepeated','PLUS','Game_Action_numRepeats','home','LoadMenu','TextFmt','makeFontBigger','cursorDown','tab','paramBase','_number','lqfXT','_backSprite1','_smooth','BuyBgType','toFixed','atbActive','WuNML','Graphics','TYREJ','itemEva','xeNYE','titles1','cursorLeft','Origin','TextCodeClassNames','SCALE_MODES','addCommand','animationBaseDelay','filter','114AjcVgQ','buttonAssistOffset%1','IconSParam1','addWindow','RevertPreserveNumbers','Game_Action_setAttack','F14','_refreshArrows','levelUpRecovery','gaugeLineHeight','AutoStretch','WIN_OEM_WSCTRL','odxRG','PbXbL','xparam','Bitmap_drawTextOutline','KEEP','LoadError','Game_System_initialize','onInputOk','length','isClosed','Scene_Name_onInputOk','setFrame','exportAllMapStrings','evaded','createPointAnimationQueue','CzFhc','AntiZoomPictures','ltRGY','_targetOpacity','YirNr','currentValue','Scene_Boot_loadSystemImages','rgGwl','touchUI','child_process','innerWidth','drawTextEx','drawNewParam','Sprite_Animation_setViewport','isMagical','ltsyG','BACK_QUOTE','render','SCROLL_LOCK','GetParamIcon','loadSystemImages','platform','AnimationMirrorOffset','addLoadListener','WIN_OEM_FJ_JISHO','ActorBgType','FmOpj','DTB','MapNameTextCode','3875410nlBAWi','_addShadow','padding','updateScene','drawSegment','_troopId','offsetY','App','EndingID','translucentOpacity','DTOUI','optSideView','_pauseSignSprite','NumberRect','isActor','horizontal','blt','createButtonAssistWindow','CONVERT','visible','ColorPowerDown','MultiKeyFmt','getButtonAssistLocation','ExtractStrFromList','cos','IconXParam2','StatusBgType','\x0a\x0a\x0a\x0a\x0a','INBOUNCE','helpWindowRect','makeCoreEngineCommandList','Symbol','paramRate1','Game_Actor_changeClass','_slotWindow','_stored_deathColor','inputWindowRect','_currentMap','itemHitImprovedAccuracy','ppFTT','OUTEXPO','parallaxes','eNFEz','PIPE','_stored_tpGaugeColor1','Graphics_defaultStretchMode','LWWwC','_origin','nPMFN','Window_StatusBase_drawActorSimpleStatus','canEquip','zPBOW','ShowDevTools','animationNextDelay','vBLHS','DECIMAL','addChild','NEAREST','TRG','otvpl','SEPARATOR','stop','_inputString','removeAllFauxAnimations','changeTextColor','movePageButtonSideButtonLayout','eRiQP','padZero','isGamepadTriggered','_battleField','isCancelled','Scene_Battle_createSpriteset_detach','Window_NameInput_cursorLeft','createDigits','OUTELASTIC','%2%1%3','itemWindowRect','buttonAssistKey5','registerCommand','ParseWeaponNotetags','StatusParamsRect','Plus','changeClass','repositionEnemiesByResolution','SParamVocab0','ColorDeath','EjJny','setEnemyAction','Key%1','Rate2','DummyBgType','result','isSideView','enableDigitGroupingEx','Sprite_Gauge_currentValue','initCoreEngineScreenShake','checkCacheKey','randomJS','FdXXI','foIif','GoldFontSize','ChjGS','isMaskingEnabled','zRUsC','DOWN','dashToggle','getGamepads','MAXMP','startShake','sin','OptionsBgType','JYDUV','$dataMap','pixelated','Game_Picture_move','INOUTEXPO','PictureID','sparamFlatBonus','onLoad','original','kCAfi','areTileShadowsHidden','_list','down2','CLOSE_CURLY_BRACKET','Rate1','updateOrigin','sWAfo','ShowJS','diEkx','_statusWindow','buttonAssistSwitch','15146469quqsQj','SParamVocab4','isExpGaugeDrawn','INOUTQUINT','bhKtx','rpalZ','_onKeyPress','ExportStrFromAllMaps','LDzRV','QNWiE','height','gainSilentTp','BjRYm','qolfa','bgm','_bitmap','Scene_Map_update','DETACH_PICTURE_CONTAINER','ExportCurTroopText','Window_NameInput_initialize','gldcQ','bgmVolume','reservePlayTestNewGameCommonEvent'];_0x1e92=function(){return _0x166efa;};return _0x1e92();};VisuMZ[_0x283c20(0x85a)][_0x283c20(0x522)]=Window_ShopSell[_0x283c20(0x44e)]['isEnabled'],Window_ShopSell['prototype']['isEnabled']=function(_0x2f3c0b){const _0x22011d=_0x283c20;if(VisuMZ[_0x22011d(0x85a)]['Settings'][_0x22011d(0x5be)][_0x22011d(0x135)]&&DataManager[_0x22011d(0x305)](_0x2f3c0b))return![];else{if(_0x22011d(0x4d9)===_0x22011d(0x92d)){if(_0x4d6190[_0x22011d(0x312)](/backspace/i))return this[_0x22011d(0x284)]===0x8;if(_0x55e53f[_0x22011d(0x312)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x5b5d3a[_0x22011d(0x312)](/escape/i))return this[_0x22011d(0x284)]===0x1b;}else return VisuMZ['CoreEngine'][_0x22011d(0x522)][_0x22011d(0x5d8)](this,_0x2f3c0b);}},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x2f9)]=function(){return![];};VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x1f7)]['EnableNumberInput']&&(VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7df)]=Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x18c)],Window_NumberInput['prototype']['start']=function(){const _0xb557f1=_0x283c20;VisuMZ[_0xb557f1(0x85a)][_0xb557f1(0x7df)]['call'](this),this[_0xb557f1(0x623)](this[_0xb557f1(0x5d6)]-0x1),Input['clear']();},VisuMZ['CoreEngine'][_0x283c20(0x1c6)]=Window_NumberInput[_0x283c20(0x44e)]['processDigitChange'],Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x468)]=function(){const _0x1f3959=_0x283c20;if(!this[_0x1f3959(0x865)]())return;if(Input['isNumpadPressed']())this[_0x1f3959(0x8c8)]();else{if(Input['isSpecialCode'](_0x1f3959(0x61b)))this[_0x1f3959(0x342)]();else{if(Input[_0x1f3959(0x284)]===0x2e)this['processKeyboardDelete']();else{if(Input[_0x1f3959(0x284)]===0x24)this[_0x1f3959(0x45d)]();else{if(Input['_inputSpecialKeyCode']===0x23)this['processKeyboardEnd']();else{if(_0x1f3959(0x20d)!==_0x1f3959(0x20d))return _0x1ef127[_0x1f3959(0x85a)][_0x1f3959(0x914)]['UI'][_0x1f3959(0x7a5)];else VisuMZ[_0x1f3959(0x85a)]['Window_NumberInput_processDigitChange'][_0x1f3959(0x5d8)](this);}}}}}},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x647)]=function(){const _0x298861=_0x283c20;if(!this[_0x298861(0x55b)]())return;if(Input[_0x298861(0x2aa)]())_0x298861(0x4ee)==='XnRsU'?this[_0x298861(0x8c8)]():_0x1759fc['startAnimation']();else{if(_0x298861(0x746)!==_0x298861(0x398))Window_Selectable[_0x298861(0x44e)][_0x298861(0x647)]['call'](this);else return 0x3;}},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x7e7)]=function(){},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x8c8)]=function(){const _0x3f5ada=_0x283c20;if(String(this['_number'])[_0x3f5ada(0x6a1)]>=this[_0x3f5ada(0x5d6)])return;const _0x162dcc=Number(String(this[_0x3f5ada(0x679)])+Input[_0x3f5ada(0x703)]);if(isNaN(_0x162dcc))return;this[_0x3f5ada(0x679)]=_0x162dcc;const _0x4b930c='9'[_0x3f5ada(0x3b2)](this[_0x3f5ada(0x5d6)]);this['_number']=this[_0x3f5ada(0x679)]['clamp'](0x0,_0x4b930c),Input[_0x3f5ada(0x5e1)](),this[_0x3f5ada(0x661)](),SoundManager['playCursor'](),this[_0x3f5ada(0x623)](this[_0x3f5ada(0x5d6)]-0x1);},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x342)]=function(){const _0x5860c0=_0x283c20;this['_number']=Number(String(this[_0x5860c0(0x679)])['slice'](0x0,-0x1)),this['_number']=Math['max'](0x0,this[_0x5860c0(0x679)]),Input['clear'](),this[_0x5860c0(0x661)](),SoundManager[_0x5860c0(0x3f3)](),this[_0x5860c0(0x623)](this[_0x5860c0(0x5d6)]-0x1);},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x372)]=function(){const _0x329348=_0x283c20;this[_0x329348(0x679)]=Number(String(this[_0x329348(0x679)])[_0x329348(0x4fc)](0x1)),this[_0x329348(0x679)]=Math[_0x329348(0x861)](0x0,this['_number']),Input[_0x329348(0x5e1)](),this[_0x329348(0x661)](),SoundManager['playCursor'](),this['select'](this[_0x329348(0x5d6)]-0x1);},Window_NumberInput['prototype'][_0x283c20(0x45d)]=function(){const _0xe91e1e=_0x283c20;if(this['index']()===0x0)return;Input[_0xe91e1e(0x5e1)](),this[_0xe91e1e(0x661)](),SoundManager[_0xe91e1e(0x3f3)](),this[_0xe91e1e(0x623)](0x0);},Window_NumberInput[_0x283c20(0x44e)][_0x283c20(0x1a6)]=function(){const _0x3b1520=_0x283c20;if(this['index']()===this[_0x3b1520(0x5d6)]-0x1)return;Input[_0x3b1520(0x5e1)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);});;VisuMZ['CoreEngine'][_0x283c20(0x3ab)]=Window_MapName['prototype'][_0x283c20(0x661)],Window_MapName[_0x283c20(0x44e)][_0x283c20(0x661)]=function(){const _0x5d9b3a=_0x283c20;if(VisuMZ['CoreEngine']['Settings'][_0x5d9b3a(0x5be)][_0x5d9b3a(0x6c4)]){if(_0x5d9b3a(0x49d)===_0x5d9b3a(0x170)){_0x299bfd=_0x3d6511(_0x41ea77)['toUpperCase']();const _0x1d6035=_0x29a843[_0x5d9b3a(0x85a)][_0x5d9b3a(0x914)][_0x5d9b3a(0x7ee)];if(_0x32807e===_0x5d9b3a(0x47a))return _0x1d6035[_0x5d9b3a(0x4ba)];if(_0x2c0c03==='MAXMP')return _0x1d6035['IconParam1'];if(_0x3b9f67===_0x5d9b3a(0x423))return _0x1d6035[_0x5d9b3a(0x507)];if(_0x20fa3==='DEF')return _0x1d6035['IconParam3'];if(_0x18db9b===_0x5d9b3a(0x761))return _0x1d6035['IconParam4'];if(_0x43bbea==='MDF')return _0x1d6035[_0x5d9b3a(0x5fb)];if(_0x38c4ff===_0x5d9b3a(0x593))return _0x1d6035['IconParam6'];if(_0x4925ea==='LUK')return _0x1d6035['IconParam7'];if(_0x1ba563===_0x5d9b3a(0x354))return _0x1d6035[_0x5d9b3a(0x172)];if(_0x3e40cf===_0x5d9b3a(0x437))return _0x1d6035['IconXParam1'];if(_0x43d92a==='CRI')return _0x1d6035[_0x5d9b3a(0x6de)];if(_0x372565===_0x5d9b3a(0x191))return _0x1d6035[_0x5d9b3a(0x20e)];if(_0x584ba7===_0x5d9b3a(0x7e0))return _0x1d6035[_0x5d9b3a(0x29f)];if(_0x5e7173===_0x5d9b3a(0x899))return _0x1d6035['IconXParam5'];if(_0xcbf05a===_0x5d9b3a(0x134))return _0x1d6035[_0x5d9b3a(0x5b7)];if(_0x2ea93a===_0x5d9b3a(0x830))return _0x1d6035[_0x5d9b3a(0x434)];if(_0x58f375===_0x5d9b3a(0x89a))return _0x1d6035['IconXParam8'];if(_0xf10777===_0x5d9b3a(0x6ff))return _0x1d6035[_0x5d9b3a(0x516)];if(_0x5380c7===_0x5d9b3a(0x41a))return _0x1d6035[_0x5d9b3a(0x360)];if(_0x4be0fb===_0x5d9b3a(0x76e))return _0x1d6035[_0x5d9b3a(0x68f)];if(_0x1088fe===_0x5d9b3a(0x905))return _0x1d6035[_0x5d9b3a(0x1f4)];if(_0x45d85d===_0x5d9b3a(0x451))return _0x1d6035['IconSParam3'];if(_0x5e7c31===_0x5d9b3a(0x594))return _0x1d6035[_0x5d9b3a(0x933)];if(_0x18a37a===_0x5d9b3a(0x7c2))return _0x1d6035['IconSParam5'];if(_0x303f55===_0x5d9b3a(0x872))return _0x1d6035[_0x5d9b3a(0x283)];if(_0xf6aec9==='MDR')return _0x1d6035[_0x5d9b3a(0x660)];if(_0x19af7f===_0x5d9b3a(0x430))return _0x1d6035[_0x5d9b3a(0x8e9)];if(_0x2901a5===_0x5d9b3a(0x273))return _0x1d6035[_0x5d9b3a(0x1ed)];if(_0x24f309['CoreEngine'][_0x5d9b3a(0x5c9)][_0x5ab196])return _0x1b7876[_0x5d9b3a(0x85a)]['CustomParamIcons'][_0x548282]||0x0;return 0x0;}else this['refreshWithTextCodeSupport']();}else VisuMZ[_0x5d9b3a(0x85a)][_0x5d9b3a(0x3ab)]['call'](this);},Window_MapName[_0x283c20(0x44e)]['refreshWithTextCodeSupport']=function(){const _0x238ef8=_0x283c20;this[_0x238ef8(0x666)][_0x238ef8(0x5e1)]();if($gameMap[_0x238ef8(0x817)]()){const _0x590417=this[_0x238ef8(0x6b2)];this[_0x238ef8(0x5db)](0x0,0x0,_0x590417,this['lineHeight']());const _0x4e12b3=this[_0x238ef8(0x577)]($gameMap['displayName']())['width'];this[_0x238ef8(0x6b3)]($gameMap[_0x238ef8(0x817)](),Math['floor']((_0x590417-_0x4e12b3)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x283c20(0x85a)][_0x283c20(0x914)][_0x283c20(0x19f)],Window_TitleCommand['prototype'][_0x283c20(0x81e)]=function(){const _0x36b11f=_0x283c20;this[_0x36b11f(0x6e3)]();},Window_TitleCommand[_0x283c20(0x44e)]['makeCoreEngineCommandList']=function(){const _0x2a1456=_0x283c20;for(const _0x1f823b of Window_TitleCommand['_commandList']){if('UCDYd'!==_0x2a1456(0x11a)){if(_0x1f823b['ShowJS'][_0x2a1456(0x5d8)](this)){const _0x3cabeb=_0x1f823b[_0x2a1456(0x6e4)];let _0x42da55=_0x1f823b[_0x2a1456(0x1bd)];if(['',_0x2a1456(0x2a6)][_0x2a1456(0x59d)](_0x42da55))_0x42da55=_0x1f823b['TextJS'][_0x2a1456(0x5d8)](this);const _0x1fc0a3=_0x1f823b[_0x2a1456(0x494)][_0x2a1456(0x5d8)](this),_0x4af7e1=_0x1f823b[_0x2a1456(0x760)][_0x2a1456(0x5d8)](this);this[_0x2a1456(0x68a)](_0x42da55,_0x3cabeb,_0x1fc0a3,_0x4af7e1),this[_0x2a1456(0x456)](_0x3cabeb,_0x1f823b[_0x2a1456(0x518)][_0x2a1456(0x63b)](this,_0x4af7e1));}}else _0x12b20c=_0xfe6dcb[_0x2a1456(0x861)](_0x1e223e,_0x2e169f(_0x4fc392(_0x33956b)));}},Window_GameEnd[_0x283c20(0x230)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x283c20(0x5eb)]['CommandList'],Window_GameEnd[_0x283c20(0x44e)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x283c20(0x44e)][_0x283c20(0x6e3)]=function(){const _0x2a7364=_0x283c20;for(const _0x32db94 of Window_GameEnd[_0x2a7364(0x230)]){if(_0x2a7364(0x728)!=='uuwMR'){if(_0x32db94[_0x2a7364(0x745)]['call'](this)){if(_0x2a7364(0x751)!==_0x2a7364(0x751))_0x1efb5c[_0x2a7364(0x85a)]['Settings']['UI']['SideButtons']&&(this[_0x2a7364(0x42f)]=_0x57128a);else{const _0x5deb0d=_0x32db94[_0x2a7364(0x6e4)];let _0x496a0b=_0x32db94[_0x2a7364(0x1bd)];if(['',_0x2a7364(0x2a6)][_0x2a7364(0x59d)](_0x496a0b))_0x496a0b=_0x32db94[_0x2a7364(0x196)]['call'](this);const _0x418dc4=_0x32db94[_0x2a7364(0x494)]['call'](this),_0x40e26e=_0x32db94[_0x2a7364(0x760)][_0x2a7364(0x5d8)](this);this[_0x2a7364(0x68a)](_0x496a0b,_0x5deb0d,_0x418dc4,_0x40e26e),this[_0x2a7364(0x456)](_0x5deb0d,_0x32db94['CallHandlerJS']['bind'](this,_0x40e26e));}}}else this[_0x2a7364(0x38f)]=_0x2a7364(0x882);}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x283c20(0x44e)]=Object[_0x283c20(0x338)](Window_Base[_0x283c20(0x44e)]),Window_ButtonAssist[_0x283c20(0x44e)][_0x283c20(0x7ff)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x283c20(0x3a9)]=function(_0x15913f){const _0x5731ac=_0x283c20;this[_0x5731ac(0x7ce)]={},Window_Base['prototype'][_0x5731ac(0x3a9)][_0x5731ac(0x5d8)](this,_0x15913f),this[_0x5731ac(0x22a)](VisuMZ['CoreEngine'][_0x5731ac(0x914)][_0x5731ac(0x52f)][_0x5731ac(0x8ca)]||0x0),this[_0x5731ac(0x661)]();},Window_ButtonAssist['prototype'][_0x283c20(0x675)]=function(){const _0x2f97c4=_0x283c20;this['contents'][_0x2f97c4(0x1d2)]<=0x60&&(_0x2f97c4(0x509)!==_0x2f97c4(0x509)?_0x5ac491[_0x2f97c4(0x85a)]['Settings'][_0x2f97c4(0x5be)]['FontShadows']?this[_0x2f97c4(0x62e)](_0x58255e,_0x32a611,_0x3f92b8,_0xb834ca):_0x4f27ac[_0x2f97c4(0x85a)][_0x2f97c4(0x69c)][_0x2f97c4(0x5d8)](this,_0x250400,_0x5cf80f,_0x3bd255,_0x4fe764):this[_0x2f97c4(0x666)][_0x2f97c4(0x1d2)]+=0x6);},Window_ButtonAssist[_0x283c20(0x44e)]['makeFontSmaller']=function(){const _0x133f53=_0x283c20;this['contents'][_0x133f53(0x1d2)]>=0x18&&(_0x133f53(0x6c2)===_0x133f53(0x6c2)?this[_0x133f53(0x666)][_0x133f53(0x1d2)]-=0x6:this[_0x133f53(0x385)]=_0x395261[_0x133f53(0x85a)][_0x133f53(0x914)][_0x133f53(0x415)][_0x133f53(0x2fc)]);},Window_ButtonAssist['prototype'][_0x283c20(0x118)]=function(){const _0x4b3961=_0x283c20;Window_Base[_0x4b3961(0x44e)]['update']['call'](this),this[_0x4b3961(0x27f)]();},Window_ButtonAssist[_0x283c20(0x44e)][_0x283c20(0x8f6)]=function(){const _0x2b0cef=_0x283c20;this[_0x2b0cef(0x6c7)]=SceneManager[_0x2b0cef(0x573)][_0x2b0cef(0x6db)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x283c20(0x44e)][_0x283c20(0x27f)]=function(){const _0x365c65=_0x283c20,_0x49f0f6=SceneManager[_0x365c65(0x573)];for(let _0x5046ec=0x1;_0x5046ec<=0x5;_0x5046ec++){if(this['_data'][_0x365c65(0x7cb)[_0x365c65(0x520)](_0x5046ec)]!==_0x49f0f6[_0x365c65(0x2c5)['format'](_0x5046ec)]())return this['refresh']();if(this[_0x365c65(0x7ce)][_0x365c65(0x45b)[_0x365c65(0x520)](_0x5046ec)]!==_0x49f0f6['buttonAssistText%1'[_0x365c65(0x520)](_0x5046ec)]()){if(_0x365c65(0x64b)!=='DqtkW')return this[_0x365c65(0x661)]();else _0x17e7bc=_0x3674ad['GroupDigits'](_0xf9bdf1);}}},Window_ButtonAssist[_0x283c20(0x44e)][_0x283c20(0x661)]=function(){const _0x3a6f20=_0x283c20;this[_0x3a6f20(0x666)][_0x3a6f20(0x5e1)]();for(let _0x30e55b=0x1;_0x30e55b<=0x5;_0x30e55b++){_0x3a6f20(0x72c)!==_0x3a6f20(0x72c)?_0x3a8d8a=_0xa7c376[_0x3a6f20(0x85a)][_0x3a6f20(0x247)][_0x3a6f20(0x5d8)](this):this[_0x3a6f20(0x6c9)](_0x30e55b);}},Window_ButtonAssist[_0x283c20(0x44e)][_0x283c20(0x6c9)]=function(_0x504b58){const _0x3b1955=_0x283c20,_0x5155ae=this[_0x3b1955(0x6b2)]/0x5,_0x40b44c=SceneManager[_0x3b1955(0x573)],_0xaf2854=_0x40b44c[_0x3b1955(0x2c5)[_0x3b1955(0x520)](_0x504b58)](),_0x330a33=_0x40b44c[_0x3b1955(0x234)['format'](_0x504b58)]();this['_data'][_0x3b1955(0x7cb)['format'](_0x504b58)]=_0xaf2854,this['_data'][_0x3b1955(0x45b)[_0x3b1955(0x520)](_0x504b58)]=_0x330a33;if(_0xaf2854==='')return;if(_0x330a33==='')return;const _0x1e9102=_0x40b44c[_0x3b1955(0x68e)['format'](_0x504b58)](),_0x1b4513=this[_0x3b1955(0x774)](),_0x26d561=_0x5155ae*(_0x504b58-0x1)+_0x1b4513+_0x1e9102,_0x38521f=VisuMZ[_0x3b1955(0x85a)][_0x3b1955(0x914)]['ButtonAssist'][_0x3b1955(0x674)];this[_0x3b1955(0x6b3)](_0x38521f[_0x3b1955(0x520)](_0xaf2854,_0x330a33),_0x26d561,0x0,_0x5155ae-_0x1b4513*0x2);},VisuMZ['CoreEngine'][_0x283c20(0x4a2)]=Game_Interpreter['prototype'][_0x283c20(0x912)],Game_Interpreter[_0x283c20(0x44e)][_0x283c20(0x912)]=function(){const _0x2e0e7c=_0x283c20;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x2e0e7c(0x85a)]['UpdatePictureCoordinates']();return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x2e0e7c(0x5d8)](this);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x618)]=function(){const _0xd8cc78=_0x283c20,_0x1ae387=$gameTemp[_0xd8cc78(0x409)]||0x0;(_0x1ae387<0x0||_0x1ae387>0x64||TouchInput[_0xd8cc78(0x70b)]()||Input['isTriggered'](_0xd8cc78(0x8aa)))&&(_0xd8cc78(0x2e3)!==_0xd8cc78(0x12a)?($gameTemp[_0xd8cc78(0x409)]=undefined,Input[_0xd8cc78(0x5e1)](),TouchInput[_0xd8cc78(0x5e1)]()):this[_0xd8cc78(0x2fd)][_0xd8cc78(0x22a)](_0x53ed8f[_0xd8cc78(0x631)][_0xd8cc78(0x241)]));const _0x1adf54=$gameScreen[_0xd8cc78(0x1d1)](_0x1ae387);return _0x1adf54&&(_0x1adf54['_x']=TouchInput['_x'],_0x1adf54['_y']=TouchInput['_y']),VisuMZ[_0xd8cc78(0x85a)][_0xd8cc78(0x462)](),$gameTemp[_0xd8cc78(0x409)]!==undefined;},VisuMZ['CoreEngine'][_0x283c20(0x462)]=function(){const _0x48b474=_0x283c20,_0x1437ab=SceneManager[_0x48b474(0x573)];if(!_0x1437ab)return;!_0x1437ab['_pictureCoordinatesWindow']&&(SoundManager[_0x48b474(0x1b6)](),_0x1437ab[_0x48b474(0x884)]=new Window_PictureCoordinates(),_0x1437ab[_0x48b474(0x6fd)](_0x1437ab[_0x48b474(0x884)]));if($gameTemp[_0x48b474(0x409)]===undefined){if(_0x48b474(0x472)!==_0x48b474(0x76f))SoundManager[_0x48b474(0x4e4)](),_0x1437ab[_0x48b474(0x521)](_0x1437ab[_0x48b474(0x884)]),_0x1437ab[_0x48b474(0x884)]=undefined;else return 0x1;}};function Window_PictureCoordinates(){const _0x58af0b=_0x283c20;this[_0x58af0b(0x3a9)](...arguments);}Window_PictureCoordinates[_0x283c20(0x44e)]=Object[_0x283c20(0x338)](Window_Base[_0x283c20(0x44e)]),Window_PictureCoordinates[_0x283c20(0x44e)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x283c20(0x44e)][_0x283c20(0x3a9)]=function(){const _0x2b7cb8=_0x283c20;this[_0x2b7cb8(0x654)]=_0x2b7cb8(0x44a),this['_lastX']='nah',this[_0x2b7cb8(0x421)]=_0x2b7cb8(0x44a);const _0x262752=this[_0x2b7cb8(0x833)]();Window_Base[_0x2b7cb8(0x44e)][_0x2b7cb8(0x3a9)]['call'](this,_0x262752),this[_0x2b7cb8(0x22a)](0x2);},Window_PictureCoordinates['prototype'][_0x283c20(0x833)]=function(){const _0x4051cb=_0x283c20;let _0x5c24de=0x0,_0x51f901=Graphics[_0x4051cb(0x753)]-this['lineHeight'](),_0x38ec02=Graphics[_0x4051cb(0x3d3)],_0x8ee331=this[_0x4051cb(0x261)]();return new Rectangle(_0x5c24de,_0x51f901,_0x38ec02,_0x8ee331);},Window_PictureCoordinates[_0x283c20(0x44e)]['updatePadding']=function(){const _0x2be059=_0x283c20;this[_0x2be059(0x6c7)]=0x0;},Window_PictureCoordinates[_0x283c20(0x44e)][_0x283c20(0x118)]=function(){const _0x29129e=_0x283c20;Window_Base[_0x29129e(0x44e)][_0x29129e(0x118)][_0x29129e(0x5d8)](this),this[_0x29129e(0x7fe)]();},Window_PictureCoordinates[_0x283c20(0x44e)][_0x283c20(0x7fe)]=function(){const _0x2c3e59=_0x283c20;if(!this['needsUpdate']())return;this[_0x2c3e59(0x661)]();},Window_PictureCoordinates[_0x283c20(0x44e)][_0x283c20(0x40e)]=function(){const _0x2e0be2=_0x283c20,_0x2ac27e=$gameTemp[_0x2e0be2(0x409)],_0x474524=$gameScreen[_0x2e0be2(0x1d1)](_0x2ac27e);if(_0x474524){if('solOy'!==_0x2e0be2(0x5a8))return this['_lastOrigin']!==_0x474524[_0x2e0be2(0x6f4)]||this['_lastX']!==_0x474524['_x']||this['_lastY']!==_0x474524['_y'];else this[_0x2e0be2(0x47d)](_0x4e1702);}else return![];},Window_PictureCoordinates['prototype'][_0x283c20(0x661)]=function(){const _0x20f871=_0x283c20;this[_0x20f871(0x666)]['clear']();const _0x47876f=$gameTemp[_0x20f871(0x409)],_0x4f975a=$gameScreen[_0x20f871(0x1d1)](_0x47876f);if(!_0x4f975a)return;this[_0x20f871(0x654)]=_0x4f975a[_0x20f871(0x6f4)],this[_0x20f871(0x5de)]=_0x4f975a['_x'],this[_0x20f871(0x421)]=_0x4f975a['_y'];const _0x1a9b6c=ColorManager[_0x20f871(0x16c)]();this[_0x20f871(0x666)]['fillRect'](0x0,0x0,this[_0x20f871(0x6b2)],this['innerHeight'],_0x1a9b6c);const _0x4b4990=_0x20f871(0x2a7)[_0x20f871(0x520)](_0x4f975a[_0x20f871(0x6f4)]===0x0?_0x20f871(0x12d):_0x20f871(0x39e)),_0x2ff445=_0x20f871(0x1d6)[_0x20f871(0x520)](_0x4f975a['_x']),_0x145fca=_0x20f871(0x310)['format'](_0x4f975a['_y']),_0x3b07cc=_0x20f871(0x924)[_0x20f871(0x520)](TextManager['getInputButtonString'](_0x20f871(0x8aa)));let _0x26cf4b=Math[_0x20f871(0x214)](this['innerWidth']/0x4);this['drawText'](_0x4b4990,_0x26cf4b*0x0,0x0,_0x26cf4b),this[_0x20f871(0x367)](_0x2ff445,_0x26cf4b*0x1,0x0,_0x26cf4b,_0x20f871(0x179)),this[_0x20f871(0x367)](_0x145fca,_0x26cf4b*0x2,0x0,_0x26cf4b,_0x20f871(0x179));const _0x27ea60=this[_0x20f871(0x577)](_0x3b07cc)[_0x20f871(0x3d3)],_0x3e33c3=this[_0x20f871(0x6b2)]-_0x27ea60;this['drawTextEx'](_0x3b07cc,_0x3e33c3,0x0,_0x27ea60);},VisuMZ[_0x283c20(0x6f9)]=function(_0x12d307){const _0x365adf=_0x283c20;if(Utils[_0x365adf(0x824)](_0x365adf(0x877))){var _0x5e42f0=require('nw.gui')[_0x365adf(0x415)]['get']();SceneManager[_0x365adf(0x201)]();if(_0x12d307)setTimeout(_0x5e42f0[_0x365adf(0x23f)]['bind'](_0x5e42f0),0x190);}},VisuMZ['ApplyEasing']=function(_0x1de453,_0xc11936){const _0x424414=_0x283c20;_0xc11936=_0xc11936[_0x424414(0x287)]();var _0x157abc=1.70158,_0x3d62eb=0.7;switch(_0xc11936){case _0x424414(0x1bf):return _0x1de453;case _0x424414(0x2d5):return-0x1*Math[_0x424414(0x6dd)](_0x1de453*(Math['PI']/0x2))+0x1;case _0x424414(0x363):return Math[_0x424414(0x732)](_0x1de453*(Math['PI']/0x2));case _0x424414(0x4da):return-0.5*(Math[_0x424414(0x6dd)](Math['PI']*_0x1de453)-0x1);case _0x424414(0x56f):return _0x1de453*_0x1de453;case'OUTQUAD':return _0x1de453*(0x2-_0x1de453);case'INOUTQUAD':return _0x1de453<0.5?0x2*_0x1de453*_0x1de453:-0x1+(0x4-0x2*_0x1de453)*_0x1de453;case _0x424414(0x531):return _0x1de453*_0x1de453*_0x1de453;case _0x424414(0x8ac):var _0x144de7=_0x1de453-0x1;return _0x144de7*_0x144de7*_0x144de7+0x1;case _0x424414(0x4f3):return _0x1de453<0.5?0x4*_0x1de453*_0x1de453*_0x1de453:(_0x1de453-0x1)*(0x2*_0x1de453-0x2)*(0x2*_0x1de453-0x2)+0x1;case _0x424414(0x3c6):return _0x1de453*_0x1de453*_0x1de453*_0x1de453;case _0x424414(0x921):var _0x144de7=_0x1de453-0x1;return 0x1-_0x144de7*_0x144de7*_0x144de7*_0x144de7;case _0x424414(0x8cf):var _0x144de7=_0x1de453-0x1;return _0x1de453<0.5?0x8*_0x1de453*_0x1de453*_0x1de453*_0x1de453:0x1-0x8*_0x144de7*_0x144de7*_0x144de7*_0x144de7;case _0x424414(0x5b3):return _0x1de453*_0x1de453*_0x1de453*_0x1de453*_0x1de453;case _0x424414(0x789):var _0x144de7=_0x1de453-0x1;return 0x1+_0x144de7*_0x144de7*_0x144de7*_0x144de7*_0x144de7;case _0x424414(0x74c):var _0x144de7=_0x1de453-0x1;return _0x1de453<0.5?0x10*_0x1de453*_0x1de453*_0x1de453*_0x1de453*_0x1de453:0x1+0x10*_0x144de7*_0x144de7*_0x144de7*_0x144de7*_0x144de7;case _0x424414(0x621):if(_0x1de453===0x0)return 0x0;return Math[_0x424414(0x60f)](0x2,0xa*(_0x1de453-0x1));case _0x424414(0x6ed):if(_0x1de453===0x1){if(_0x424414(0x2ef)===_0x424414(0x74e)){const _0x163516=_0x3fed44[_0x5b2cda],_0x681685='%1/'[_0x424414(0x520)](_0xb2df5b);for(const _0x29c60c of _0x163516){_0x3be6eb['createBuffer'](_0x681685,_0x29c60c);}}else return 0x1;}return-Math[_0x424414(0x60f)](0x2,-0xa*_0x1de453)+0x1;case _0x424414(0x738):if(_0x1de453===0x0||_0x1de453===0x1)return _0x1de453;var _0x227936=_0x1de453*0x2,_0x34315e=_0x227936-0x1;if(_0x227936<0x1){if(_0x424414(0x5ea)===_0x424414(0x6a8)){const _0x2abad2=this[_0x424414(0x8db)]()['params'][_0x1ddf6f][0x63],_0x14f34b=this[_0x424414(0x8db)]()[_0x424414(0x1c7)][_0x29d088][0x62];return _0x2abad2+(_0x2abad2-_0x14f34b)*(this[_0x424414(0x51b)]-0x63);}else return 0.5*Math[_0x424414(0x60f)](0x2,0xa*_0x34315e);}return 0.5*(-Math['pow'](0x2,-0xa*_0x34315e)+0x2);case _0x424414(0x2bb):var _0x227936=_0x1de453/0x1;return-0x1*(Math['sqrt'](0x1-_0x227936*_0x1de453)-0x1);case'OUTCIRC':var _0x144de7=_0x1de453-0x1;return Math[_0x424414(0x2d6)](0x1-_0x144de7*_0x144de7);case _0x424414(0x77c):var _0x227936=_0x1de453*0x2,_0x34315e=_0x227936-0x2;if(_0x227936<0x1)return-0.5*(Math[_0x424414(0x2d6)](0x1-_0x227936*_0x227936)-0x1);return 0.5*(Math[_0x424414(0x2d6)](0x1-_0x34315e*_0x34315e)+0x1);case _0x424414(0x13e):return _0x1de453*_0x1de453*((_0x157abc+0x1)*_0x1de453-_0x157abc);case _0x424414(0x7a0):var _0x227936=_0x1de453/0x1-0x1;return _0x227936*_0x227936*((_0x157abc+0x1)*_0x227936+_0x157abc)+0x1;break;case _0x424414(0x78e):var _0x227936=_0x1de453*0x2,_0x53d07a=_0x227936-0x2,_0x1808d2=_0x157abc*1.525;if(_0x227936<0x1)return 0.5*_0x227936*_0x227936*((_0x1808d2+0x1)*_0x227936-_0x1808d2);return 0.5*(_0x53d07a*_0x53d07a*((_0x1808d2+0x1)*_0x53d07a+_0x1808d2)+0x2);case _0x424414(0x5e7):if(_0x1de453===0x0||_0x1de453===0x1)return _0x1de453;var _0x227936=_0x1de453/0x1,_0x34315e=_0x227936-0x1,_0x51d3e2=0x1-_0x3d62eb,_0x1808d2=_0x51d3e2/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x424414(0x60f)](0x2,0xa*_0x34315e)*Math[_0x424414(0x732)]((_0x34315e-_0x1808d2)*(0x2*Math['PI'])/_0x51d3e2));case _0x424414(0x70f):var _0x51d3e2=0x1-_0x3d62eb,_0x227936=_0x1de453*0x2;if(_0x1de453===0x0||_0x1de453===0x1)return'xLRsI'===_0x424414(0x131)?_0x1de453:_0x21716e[_0x424414(0x85a)][_0x424414(0x7f3)][_0x424414(0x5d8)](this,_0x1828af);var _0x1808d2=_0x51d3e2/(0x2*Math['PI'])*Math[_0x424414(0x26e)](0x1);return Math[_0x424414(0x60f)](0x2,-0xa*_0x227936)*Math[_0x424414(0x732)]((_0x227936-_0x1808d2)*(0x2*Math['PI'])/_0x51d3e2)+0x1;case _0x424414(0x5c6):var _0x51d3e2=0x1-_0x3d62eb;if(_0x1de453===0x0||_0x1de453===0x1)return _0x1de453;var _0x227936=_0x1de453*0x2,_0x34315e=_0x227936-0x1,_0x1808d2=_0x51d3e2/(0x2*Math['PI'])*Math[_0x424414(0x26e)](0x1);if(_0x227936<0x1){if('iiemz'!==_0x424414(0x6cf))return-0.5*(Math[_0x424414(0x60f)](0x2,0xa*_0x34315e)*Math[_0x424414(0x732)]((_0x34315e-_0x1808d2)*(0x2*Math['PI'])/_0x51d3e2));else{const _0x13ec36=_0x424414(0x838);this['_colorCache']=this['_colorCache']||{};if(this[_0x424414(0x3f7)][_0x13ec36])return this[_0x424414(0x3f7)][_0x13ec36];const _0x1af6e9=_0x4f04ee[_0x424414(0x85a)]['Settings']['Color'][_0x424414(0x6d9)];return this[_0x424414(0x21e)](_0x13ec36,_0x1af6e9);}}return Math[_0x424414(0x60f)](0x2,-0xa*_0x34315e)*Math['sin']((_0x34315e-_0x1808d2)*(0x2*Math['PI'])/_0x51d3e2)*0.5+0x1;case'OUTBOUNCE':var _0x227936=_0x1de453/0x1;if(_0x227936<0x1/2.75)return 7.5625*_0x227936*_0x227936;else{if(_0x227936<0x2/2.75){var _0x53d07a=_0x227936-1.5/2.75;return 7.5625*_0x53d07a*_0x53d07a+0.75;}else{if(_0x227936<2.5/2.75){if(_0x424414(0x13d)==='FgrEO'){var _0x53d07a=_0x227936-2.25/2.75;return 7.5625*_0x53d07a*_0x53d07a+0.9375;}else{const _0x2506bc=this['innerWidth']/0x5,_0x34ec83=_0x4b9cef[_0x424414(0x573)],_0x1f6500=_0x34ec83[_0x424414(0x2c5)[_0x424414(0x520)](_0x58df97)](),_0x32e333=_0x34ec83[_0x424414(0x234)['format'](_0x58322d)]();this['_data'][_0x424414(0x7cb)[_0x424414(0x520)](_0xe3c011)]=_0x1f6500,this[_0x424414(0x7ce)]['text%1'[_0x424414(0x520)](_0xaf91ad)]=_0x32e333;if(_0x1f6500==='')return;if(_0x32e333==='')return;const _0xc43950=_0x34ec83[_0x424414(0x68e)[_0x424414(0x520)](_0xed83a3)](),_0x27a0ab=this[_0x424414(0x774)](),_0x37e7f5=_0x2506bc*(_0x822745-0x1)+_0x27a0ab+_0xc43950,_0x51f3e8=_0x378248[_0x424414(0x85a)][_0x424414(0x914)][_0x424414(0x52f)][_0x424414(0x674)];this[_0x424414(0x6b3)](_0x51f3e8[_0x424414(0x520)](_0x1f6500,_0x32e333),_0x37e7f5,0x0,_0x2506bc-_0x27a0ab*0x2);}}else{if(_0x424414(0x36a)!=='VURBM')_0x46ddd7=_0x179297[_0x424414(0x610)](_0x36f593);else{var _0x53d07a=_0x227936-2.625/2.75;return 7.5625*_0x53d07a*_0x53d07a+0.984375;}}}}case _0x424414(0x6e1):var _0x43cdfb=0x1-VisuMZ[_0x424414(0x2b6)](0x1-_0x1de453,_0x424414(0x8c3));return _0x43cdfb;case'INOUTBOUNCE':if(_0x1de453<0.5)var _0x43cdfb=VisuMZ['ApplyEasing'](_0x1de453*0x2,_0x424414(0x5fc))*0.5;else var _0x43cdfb=VisuMZ[_0x424414(0x2b6)](_0x1de453*0x2-0x1,_0x424414(0x8c3))*0.5+0.5;return _0x43cdfb;default:return _0x1de453;}},VisuMZ[_0x283c20(0x6bb)]=function(_0xe90b){const _0x27e606=_0x283c20;_0xe90b=String(_0xe90b)[_0x27e606(0x287)]();const _0x503f36=VisuMZ['CoreEngine'][_0x27e606(0x914)]['Param'];if(_0xe90b===_0x27e606(0x47a))return _0x503f36[_0x27e606(0x4ba)];if(_0xe90b===_0x27e606(0x730))return _0x503f36['IconParam1'];if(_0xe90b===_0x27e606(0x423))return _0x503f36[_0x27e606(0x507)];if(_0xe90b===_0x27e606(0x79d))return _0x503f36[_0x27e606(0x77b)];if(_0xe90b===_0x27e606(0x761))return _0x503f36[_0x27e606(0x55d)];if(_0xe90b===_0x27e606(0x4d1))return _0x503f36[_0x27e606(0x5fb)];if(_0xe90b==='AGI')return _0x503f36[_0x27e606(0x794)];if(_0xe90b===_0x27e606(0x612))return _0x503f36[_0x27e606(0x5a1)];if(_0xe90b===_0x27e606(0x354))return _0x503f36['IconXParam0'];if(_0xe90b==='EVA')return _0x503f36[_0x27e606(0x308)];if(_0xe90b===_0x27e606(0x860))return _0x503f36[_0x27e606(0x6de)];if(_0xe90b==='CEV')return _0x503f36[_0x27e606(0x20e)];if(_0xe90b===_0x27e606(0x7e0))return _0x503f36[_0x27e606(0x29f)];if(_0xe90b===_0x27e606(0x899))return _0x503f36[_0x27e606(0x2b1)];if(_0xe90b===_0x27e606(0x134))return _0x503f36['IconXParam6'];if(_0xe90b===_0x27e606(0x830))return _0x503f36['IconXParam7'];if(_0xe90b==='MRG')return _0x503f36[_0x27e606(0x408)];if(_0xe90b===_0x27e606(0x6ff))return _0x503f36[_0x27e606(0x516)];if(_0xe90b==='TGR')return _0x503f36[_0x27e606(0x360)];if(_0xe90b===_0x27e606(0x76e))return _0x503f36[_0x27e606(0x68f)];if(_0xe90b===_0x27e606(0x905))return _0x503f36[_0x27e606(0x1f4)];if(_0xe90b==='PHA')return _0x503f36[_0x27e606(0x5bc)];if(_0xe90b==='MCR')return _0x503f36[_0x27e606(0x933)];if(_0xe90b==='TCR')return _0x503f36['IconSParam5'];if(_0xe90b===_0x27e606(0x872))return _0x503f36[_0x27e606(0x283)];if(_0xe90b===_0x27e606(0x7dc))return _0x503f36[_0x27e606(0x660)];if(_0xe90b===_0x27e606(0x430))return _0x503f36['IconSParam8'];if(_0xe90b===_0x27e606(0x273))return _0x503f36['IconSParam9'];if(VisuMZ[_0x27e606(0x85a)][_0x27e606(0x5c9)][_0xe90b])return VisuMZ['CoreEngine']['CustomParamIcons'][_0xe90b]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x4f7403,_0x505237,_0x44a357){const _0x439b69=_0x283c20;if(_0x44a357===undefined&&_0x4f7403%0x1===0x0)return _0x4f7403;if(_0x44a357!==undefined&&[_0x439b69(0x47a),_0x439b69(0x730),'ATK',_0x439b69(0x79d),_0x439b69(0x761),_0x439b69(0x4d1),_0x439b69(0x593),'LUK'][_0x439b69(0x59d)](String(_0x44a357)[_0x439b69(0x287)]()[_0x439b69(0x538)]()))return _0x4f7403;_0x505237=_0x505237||0x0;if(VisuMZ[_0x439b69(0x85a)][_0x439b69(0x83b)][_0x44a357]){if(VisuMZ[_0x439b69(0x85a)]['CustomParamType'][_0x44a357]===_0x439b69(0x110)){if(_0x439b69(0x5ba)===_0x439b69(0x529)){const _0x18e16b=this[_0x439b69(0x875)],_0x26a7d2=_0x2c1940[_0x439b69(0x861)](0x0,this[_0x439b69(0x217)]-_0x18e16b*0x2),_0x3be9a0=_0x37167a[_0x439b69(0x861)](0x0,this['_height']-_0x18e16b*0x2),_0x35c643=this['_backSprite'],_0x502f05=_0x35c643[_0x439b69(0x254)][0x0];_0x35c643[_0x439b69(0x341)]=this[_0x439b69(0x399)],_0x35c643[_0x439b69(0x6a4)](0x0,0x0,0x60,0x60),_0x35c643[_0x439b69(0x2fa)](_0x18e16b,_0x18e16b),_0x35c643[_0x439b69(0x53d)]['x']=_0x26a7d2/0x60,_0x35c643[_0x439b69(0x53d)]['y']=_0x3be9a0/0x60,_0x502f05['bitmap']=this[_0x439b69(0x399)],_0x502f05[_0x439b69(0x6a4)](0x0,0x60,0x60,0x60),_0x502f05[_0x439b69(0x2fa)](0x0,0x0,_0x26a7d2,_0x3be9a0),_0x502f05['scale']['x']=0x1/_0x35c643[_0x439b69(0x53d)]['x'],_0x502f05[_0x439b69(0x53d)]['y']=0x1/_0x35c643[_0x439b69(0x53d)]['y'],_0x35c643[_0x439b69(0x767)](this['_colorTone']);}else return _0x4f7403;}else return String((_0x4f7403*0x64)['toFixed'](_0x505237))+'%';}return String((_0x4f7403*0x64)[_0x439b69(0x67e)](_0x505237))+'%';},VisuMZ[_0x283c20(0x10c)]=function(_0x273173){const _0x308229=_0x283c20;_0x273173=String(_0x273173);if(!_0x273173)return _0x273173;if(typeof _0x273173!==_0x308229(0x1e5))return _0x273173;const _0xac9b9f=VisuMZ[_0x308229(0x85a)][_0x308229(0x914)][_0x308229(0x5be)][_0x308229(0x7cc)]||_0x308229(0x4b3),_0x4b00c5={'maximumFractionDigits':0x6};_0x273173=_0x273173[_0x308229(0x243)](/\[(.*?)\]/g,(_0x376015,_0x131429)=>{const _0x3d4adb=_0x308229;return _0x3d4adb(0x2cd)===_0x3d4adb(0x2cd)?VisuMZ[_0x3d4adb(0x35c)](_0x131429,'[',']'):!![];}),_0x273173=_0x273173[_0x308229(0x243)](/<(.*?)>/g,(_0xa9fc45,_0x1130eb)=>{const _0x436ee2=_0x308229;if('FLsOL'!==_0x436ee2(0x140))return VisuMZ[_0x436ee2(0x35c)](_0x1130eb,'<','>');else{const _0x11516a=new _0x2b102e(_0x29b897);this[_0x436ee2(0x6fd)](_0x11516a);}}),_0x273173=_0x273173[_0x308229(0x243)](/\{\{(.*?)\}\}/g,(_0x20840b,_0x1f8d85)=>{const _0x572039=_0x308229;return VisuMZ[_0x572039(0x35c)](_0x1f8d85,'','');}),_0x273173=_0x273173[_0x308229(0x243)](/(\d+\.?\d*)/g,(_0x121b16,_0x23d83c)=>{const _0x10c907=_0x308229;if('kIKHW'==='incjp')_0x4b762b[_0x10c907(0x85a)][_0x10c907(0x37b)]['call'](this);else{let _0x69688=_0x23d83c;if(_0x69688[0x0]==='0')return _0x69688;if(_0x69688[_0x69688[_0x10c907(0x6a1)]-0x1]==='.')return Number(_0x69688)[_0x10c907(0x3c9)](_0xac9b9f,_0x4b00c5)+'.';else return _0x69688[_0x69688[_0x10c907(0x6a1)]-0x1]===','?Number(_0x69688)[_0x10c907(0x3c9)](_0xac9b9f,_0x4b00c5)+',':Number(_0x69688)[_0x10c907(0x3c9)](_0xac9b9f,_0x4b00c5);}});let _0xff3610=0x3;while(_0xff3610--){if(_0x308229(0x107)!=='sBZew'){_0x348910[_0x308229(0x52d)]();if(!_0x5247ae[_0x308229(0x889)]()){const _0x29bb1d=_0x630d23['open'](_0x241ead,_0x308229(0x640));}else{const _0x6d125d=_0x58ff89['platform']=='darwin'?_0x308229(0x636):_0x1dd284['platform']==_0x308229(0x51d)?_0x308229(0x18c):_0x308229(0x84c);_0x419ddf(_0x308229(0x6b1))[_0x308229(0x841)](_0x6d125d+'\x20'+_0x47852c);}}else _0x273173=VisuMZ[_0x308229(0x691)](_0x273173);}return _0x273173;},VisuMZ[_0x283c20(0x35c)]=function(_0x5cd42d,_0x227834,_0xcdc62e){const _0x42d638=_0x283c20;return _0x5cd42d=_0x5cd42d[_0x42d638(0x243)](/(\d)/gi,(_0x57be97,_0x4871eb)=>_0x42d638(0x8b4)[_0x42d638(0x520)](Number(_0x4871eb))),_0x42d638(0x710)['format'](_0x5cd42d,_0x227834,_0xcdc62e);},VisuMZ['RevertPreserveNumbers']=function(_0xa29c36){const _0x49d915=_0x283c20;return _0xa29c36=_0xa29c36[_0x49d915(0x243)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x18e03b,_0x5c865a)=>Number(parseInt(_0x5c865a))),_0xa29c36;},VisuMZ[_0x283c20(0x546)]=function(_0x329387){const _0x4eb0fe=_0x283c20;SoundManager['playOk']();if(!Utils[_0x4eb0fe(0x889)]()){if(_0x4eb0fe(0x431)===_0x4eb0fe(0x5f2))this[_0x4eb0fe(0x764)]()&&this[_0x4eb0fe(0x718)](),_0x51edea[_0x4eb0fe(0x85a)][_0x4eb0fe(0x467)][_0x4eb0fe(0x5d8)](this);else{const _0x199c95=window[_0x4eb0fe(0x636)](_0x329387,_0x4eb0fe(0x640));}}else{if(_0x4eb0fe(0x489)===_0x4eb0fe(0x8a3))_0x1e1b81=_0x4a50c0[_0x4eb0fe(0x4a8)](_0x4a3f9c),_0xc62f53=_0x37f68a[_0x4eb0fe(0x4a8)](_0x38873e),_0x192b2c=_0x248ec7[_0x4eb0fe(0x4a8)](_0x1c2852),_0x5dc1cc=_0x33320e[_0x4eb0fe(0x4a8)](_0x115c78),_0x242e5b[_0x4eb0fe(0x85a)][_0x4eb0fe(0x3c8)][_0x4eb0fe(0x5d8)](this,_0x50db1e,_0xfcb69f,_0x25b966,_0x4bbf6f,_0x25a88c,_0x17fc2c),this[_0x4eb0fe(0x3ac)]();else{const _0x227e10=process['platform']==_0x4eb0fe(0x929)?_0x4eb0fe(0x636):process[_0x4eb0fe(0x6bd)]==_0x4eb0fe(0x51d)?_0x4eb0fe(0x18c):_0x4eb0fe(0x84c);require('child_process')[_0x4eb0fe(0x841)](_0x227e10+'\x20'+_0x329387);}}},Game_Picture['prototype'][_0x283c20(0x52b)]=function(){return this['_anchor'];},VisuMZ[_0x283c20(0x85a)]['Game_Picture_initBasic']=Game_Picture['prototype']['initBasic'],Game_Picture[_0x283c20(0x44e)][_0x283c20(0x34e)]=function(){const _0x189182=_0x283c20;VisuMZ['CoreEngine'][_0x189182(0x87f)]['call'](this),this[_0x189182(0x4aa)]={'x':0x0,'y':0x0},this[_0x189182(0x8b6)]={'x':0x0,'y':0x0};},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x76c)]=Game_Picture[_0x283c20(0x44e)][_0x283c20(0x897)],Game_Picture[_0x283c20(0x44e)]['updateMove']=function(){const _0x3685d5=_0x283c20;this[_0x3685d5(0x490)]();const _0x157831=this[_0x3685d5(0x225)];VisuMZ[_0x3685d5(0x85a)]['Game_Picture_updateMove'][_0x3685d5(0x5d8)](this);if(_0x157831>0x0&&this[_0x3685d5(0x225)]<=0x0){this['_x']=this[_0x3685d5(0x61c)],this['_y']=this[_0x3685d5(0x4cd)],this[_0x3685d5(0x61e)]=this[_0x3685d5(0x596)],this['_scaleY']=this[_0x3685d5(0x2ee)],this[_0x3685d5(0x7d5)]=this[_0x3685d5(0x6ab)];if(this[_0x3685d5(0x4aa)]){if(_0x3685d5(0x2df)===_0x3685d5(0x2df))this[_0x3685d5(0x4aa)]['x']=this[_0x3685d5(0x8b6)]['x'],this[_0x3685d5(0x4aa)]['y']=this[_0x3685d5(0x8b6)]['y'];else{const _0x1f03a8=_0x58f39e[_0x3685d5(0x85a)]['Settings']['Window'];if(_0x1f03a8[_0x3685d5(0x8bd)]===![])return;_0x1f03a8[_0x3685d5(0x763)]?_0x1f03a8[_0x3685d5(0x763)][_0x3685d5(0x5d8)](this,_0x26830a):_0x2b2761['CoreEngine'][_0x3685d5(0x4a3)][_0x3685d5(0x5d8)](this,_0x3f29d5);}}}},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x44f)]=Game_Picture['prototype'][_0x283c20(0x208)],Game_Picture[_0x283c20(0x44e)][_0x283c20(0x208)]=function(_0x19415a,_0x960c46,_0x89e109,_0x516f0b,_0x164d6d,_0x1588b0,_0x87466e,_0x2bdeff){const _0x5d0e24=_0x283c20;VisuMZ[_0x5d0e24(0x85a)]['Game_Picture_show'][_0x5d0e24(0x5d8)](this,_0x19415a,_0x960c46,_0x89e109,_0x516f0b,_0x164d6d,_0x1588b0,_0x87466e,_0x2bdeff),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x960c46]||{'x':0x0,'y':0x0});},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x737)]=Game_Picture['prototype'][_0x283c20(0x2fa)],Game_Picture[_0x283c20(0x44e)][_0x283c20(0x2fa)]=function(_0x2646d0,_0x3171cf,_0x22182b,_0x2c19d0,_0x316f2,_0x58c43d,_0xfd112f,_0x453811,_0x926d5){const _0x2a75bb=_0x283c20;VisuMZ[_0x2a75bb(0x85a)]['Game_Picture_move'][_0x2a75bb(0x5d8)](this,_0x2646d0,_0x3171cf,_0x22182b,_0x2c19d0,_0x316f2,_0x58c43d,_0xfd112f,_0x453811,_0x926d5),this[_0x2a75bb(0x8a5)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2646d0]||{'x':0x0,'y':0x0});},Game_Picture[_0x283c20(0x44e)][_0x283c20(0x490)]=function(){const _0x466f22=_0x283c20;this[_0x466f22(0x225)]>0x0&&(this[_0x466f22(0x4aa)]['x']=this[_0x466f22(0x3e8)](this['_anchor']['x'],this['_targetAnchor']['x']),this[_0x466f22(0x4aa)]['y']=this[_0x466f22(0x3e8)](this[_0x466f22(0x4aa)]['y'],this[_0x466f22(0x8b6)]['y']));},Game_Picture[_0x283c20(0x44e)]['setAnchor']=function(_0x3c48b3){const _0x4d9a60=_0x283c20;this[_0x4d9a60(0x4aa)]=_0x3c48b3,this[_0x4d9a60(0x8b6)]=JsonEx['makeDeepCopy'](this[_0x4d9a60(0x4aa)]);},Game_Picture[_0x283c20(0x44e)][_0x283c20(0x8a5)]=function(_0x1996a6){const _0x42e06d=_0x283c20;this[_0x42e06d(0x8b6)]=_0x1996a6;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x80b)]=Sprite_Picture[_0x283c20(0x44e)][_0x283c20(0x743)],Sprite_Picture[_0x283c20(0x44e)][_0x283c20(0x743)]=function(){const _0x394c93=_0x283c20,_0x26912a=this[_0x394c93(0x1d1)]();!_0x26912a[_0x394c93(0x52b)]()?_0x394c93(0x2c1)!==_0x394c93(0x2c1)?(_0x3ce780=_0x5748c9[_0x394c93(0x4a8)](_0x419cf1),_0x33d00c=_0x2a7f46[_0x394c93(0x4a8)](_0x2078e0),_0x1d3720[_0x394c93(0x85a)][_0x394c93(0x831)][_0x394c93(0x5d8)](this,_0x25ff2f,_0x5e4ee7,_0x3d26bb,_0x455a1c)):VisuMZ['CoreEngine'][_0x394c93(0x80b)][_0x394c93(0x5d8)](this):(this[_0x394c93(0x52b)]['x']=_0x26912a[_0x394c93(0x52b)]()['x'],this[_0x394c93(0x52b)]['y']=_0x26912a[_0x394c93(0x52b)]()['y']);},Game_Action[_0x283c20(0x44e)][_0x283c20(0x71c)]=function(_0x17994e){const _0x333f23=_0x283c20;if(_0x17994e){const _0x495290=_0x17994e['skillId'];if(_0x495290===0x1&&this[_0x333f23(0x1f1)]()[_0x333f23(0x186)]()!==0x1)_0x333f23(0x1ac)===_0x333f23(0x1ac)?this['setAttack']():_0x2c9875[_0x333f23(0x311)]&&(this[_0x333f23(0x38f)]=_0x333f23(0x171));else _0x495290===0x2&&this[_0x333f23(0x1f1)]()['guardSkillId']()!==0x2?this[_0x333f23(0x30c)]():_0x333f23(0x3eb)===_0x333f23(0x3eb)?this['setSkill'](_0x495290):this[_0x333f23(0x5e1)]();}else this[_0x333f23(0x5e1)]();},Game_Actor[_0x283c20(0x44e)]['usableSkills']=function(){const _0x290216=_0x283c20;return this[_0x290216(0x21f)]()[_0x290216(0x68c)](_0x2831c0=>this[_0x290216(0x501)](_0x2831c0)&&this[_0x290216(0x25a)]()[_0x290216(0x59d)](_0x2831c0[_0x290216(0x373)]));},Window_Base['prototype'][_0x283c20(0x8ae)]=function(){const _0x4b0c01=_0x283c20;this[_0x4b0c01(0x604)]=new Sprite(),this[_0x4b0c01(0x604)]['bitmap']=new Bitmap(0x0,0x0),this[_0x4b0c01(0x604)]['x']=0x0,this['addChildToBack'](this[_0x4b0c01(0x604)]);},Window_Base[_0x283c20(0x44e)]['refreshDimmerBitmap']=function(){const _0x433839=_0x283c20;if(this[_0x433839(0x604)]){const _0x2d3174=this['_dimmerSprite']['bitmap'],_0x3a5a91=this['width'],_0x3bf9da=this[_0x433839(0x753)],_0x553580=this[_0x433839(0x6c7)],_0x33731b=ColorManager[_0x433839(0x917)](),_0x5cf2c0=ColorManager[_0x433839(0x143)]();_0x2d3174['resize'](_0x3a5a91,_0x3bf9da),_0x2d3174['gradientFillRect'](0x0,0x0,_0x3a5a91,_0x553580,_0x5cf2c0,_0x33731b,!![]),_0x2d3174[_0x433839(0x19b)](0x0,_0x553580,_0x3a5a91,_0x3bf9da-_0x553580*0x2,_0x33731b),_0x2d3174[_0x433839(0x7d4)](0x0,_0x3bf9da-_0x553580,_0x3a5a91,_0x553580,_0x33731b,_0x5cf2c0,!![]),this[_0x433839(0x604)]['setFrame'](0x0,0x0,_0x3a5a91,_0x3bf9da);}},Game_Actor['prototype'][_0x283c20(0x8fb)]=function(){const _0x21f4f9=_0x283c20;for(let _0x3290b1=0x0;_0x3290b1<this['numActions']();_0x3290b1++){if(_0x21f4f9(0x89d)!=='MBzTv'){const _0x3cdcbe=this['makeActionList']();let _0x2b4932=Number[_0x21f4f9(0x184)];this[_0x21f4f9(0x353)](_0x3290b1,_0x3cdcbe[0x0]);for(const _0x2f3597 of _0x3cdcbe){const _0x231b51=_0x2f3597[_0x21f4f9(0x7f7)]();if(_0x231b51>_0x2b4932){if(_0x21f4f9(0x14a)===_0x21f4f9(0x60c)){const _0x491eb7=_0x21f4f9(0x137);this[_0x21f4f9(0x3f7)]=this[_0x21f4f9(0x3f7)]||{};if(this[_0x21f4f9(0x3f7)][_0x491eb7])return this['_colorCache'][_0x491eb7];const _0x5b18fa=_0x26d17d[_0x21f4f9(0x85a)]['Settings'][_0x21f4f9(0x113)][_0x21f4f9(0x39f)];return this['getColorDataFromPluginParameters'](_0x491eb7,_0x5b18fa);}else _0x2b4932=_0x231b51,this[_0x21f4f9(0x353)](_0x3290b1,_0x2f3597);}}}else{var _0x4899ec=_0x46aa38(_0x15ffde['$1'])/0x64;_0x51f597+=_0x4899ec;}}this['setActionState'](_0x21f4f9(0x47b));},Window_BattleItem[_0x283c20(0x44e)][_0x283c20(0x5f1)]=function(_0x1163f5){const _0x2c3d8e=_0x283c20;if(BattleManager[_0x2c3d8e(0x3b7)]()){if(_0x2c3d8e(0x543)!==_0x2c3d8e(0x543))this[_0x2c3d8e(0x450)]-=this[_0x2c3d8e(0x23e)](),this[_0x2c3d8e(0x6a2)]()&&(this[_0x2c3d8e(0x54f)]=![]);else return BattleManager[_0x2c3d8e(0x3b7)]()['canUse'](_0x1163f5);}else return Window_ItemList['prototype'][_0x2c3d8e(0x5f1)][_0x2c3d8e(0x5d8)](this,_0x1163f5);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x667)]=Scene_Map[_0x283c20(0x44e)][_0x283c20(0x422)],Scene_Map[_0x283c20(0x44e)][_0x283c20(0x422)]=function(){const _0x30c6ca=_0x283c20;VisuMZ[_0x30c6ca(0x85a)][_0x30c6ca(0x667)][_0x30c6ca(0x5d8)](this);const _0x16d7ca=this[_0x30c6ca(0x7e2)]['_timerSprite'];if(_0x16d7ca)this[_0x30c6ca(0x6fd)](_0x16d7ca);},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x333)]=Scene_Battle[_0x283c20(0x44e)][_0x283c20(0x422)],Scene_Battle[_0x283c20(0x44e)]['createSpriteset']=function(){const _0x5b062f=_0x283c20;VisuMZ[_0x5b062f(0x85a)][_0x5b062f(0x333)][_0x5b062f(0x5d8)](this);const _0x2d1ea3=this['_spriteset']['_timerSprite'];if(_0x2d1ea3)this['addChild'](_0x2d1ea3);},Sprite_Actor['prototype'][_0x283c20(0x118)]=function(){const _0x1f6f7b=_0x283c20;Sprite_Battler[_0x1f6f7b(0x44e)][_0x1f6f7b(0x118)][_0x1f6f7b(0x5d8)](this),this[_0x1f6f7b(0x1c5)]();if(this[_0x1f6f7b(0x57d)])_0x1f6f7b(0x5b9)!==_0x1f6f7b(0x5b9)?this['_pressed']||this[_0x1f6f7b(0x2f8)]?this[_0x1f6f7b(0x5cc)]=0xff:(this[_0x1f6f7b(0x5cc)]+=this[_0x1f6f7b(0x6d8)]?this[_0x1f6f7b(0x1e7)]():-0x1*this['fadeSpeed'](),this[_0x1f6f7b(0x5cc)]=_0x318981[_0x1f6f7b(0x8f4)](0xc0,this[_0x1f6f7b(0x5cc)])):this[_0x1f6f7b(0x3fa)]();else this[_0x1f6f7b(0x519)]!==''&&(this[_0x1f6f7b(0x519)]='');},Window[_0x283c20(0x44e)][_0x283c20(0x694)]=function(){const _0x4f9f5f=_0x283c20,_0x157503=this[_0x4f9f5f(0x217)],_0x43feeb=this['_height'],_0x3e88ee=0x18,_0x249a1f=_0x3e88ee/0x2,_0xf36f71=0x60+_0x3e88ee,_0x2921fd=0x0+_0x3e88ee;this[_0x4f9f5f(0x262)][_0x4f9f5f(0x341)]=this['_windowskin'],this[_0x4f9f5f(0x262)][_0x4f9f5f(0x52b)]['x']=0.5,this[_0x4f9f5f(0x262)]['anchor']['y']=0.5,this[_0x4f9f5f(0x262)][_0x4f9f5f(0x6a4)](_0xf36f71+_0x249a1f,_0x2921fd+_0x249a1f+_0x3e88ee,_0x3e88ee,_0x249a1f),this['_downArrowSprite'][_0x4f9f5f(0x2fa)](Math[_0x4f9f5f(0x4a8)](_0x157503/0x2),Math['round'](_0x43feeb-_0x249a1f)),this['_upArrowSprite'][_0x4f9f5f(0x341)]=this[_0x4f9f5f(0x399)],this[_0x4f9f5f(0x926)][_0x4f9f5f(0x52b)]['x']=0.5,this[_0x4f9f5f(0x926)]['anchor']['y']=0.5,this[_0x4f9f5f(0x926)]['setFrame'](_0xf36f71+_0x249a1f,_0x2921fd,_0x3e88ee,_0x249a1f),this[_0x4f9f5f(0x926)][_0x4f9f5f(0x2fa)](Math[_0x4f9f5f(0x4a8)](_0x157503/0x2),Math[_0x4f9f5f(0x4a8)](_0x249a1f));},Window[_0x283c20(0x44e)]['_refreshPauseSign']=function(){const _0x331062=_0x283c20,_0x27e942=0x90,_0x4e0221=0x60,_0x444191=0x18;this['_pauseSignSprite'][_0x331062(0x341)]=this[_0x331062(0x399)],this[_0x331062(0x6d1)][_0x331062(0x52b)]['x']=0.5,this[_0x331062(0x6d1)][_0x331062(0x52b)]['y']=0x1,this[_0x331062(0x6d1)][_0x331062(0x2fa)](Math['round'](this['_width']/0x2),this[_0x331062(0x109)]),this[_0x331062(0x6d1)][_0x331062(0x6a4)](_0x27e942,_0x4e0221,_0x444191,_0x444191),this[_0x331062(0x6d1)]['alpha']=0xff;},Window[_0x283c20(0x44e)][_0x283c20(0x563)]=function(){const _0x174a62=_0x283c20,_0x17ef0f=this[_0x174a62(0x116)][_0x174a62(0x2af)][_0x174a62(0x2fb)](new Point(0x0,0x0)),_0x40856c=this[_0x174a62(0x116)][_0x174a62(0x4c8)];_0x40856c['x']=_0x17ef0f['x']+this[_0x174a62(0x4ad)]['x'],_0x40856c['y']=_0x17ef0f['y']+this['origin']['y'],_0x40856c[_0x174a62(0x3d3)]=Math[_0x174a62(0x7fc)](this[_0x174a62(0x6b2)]*this[_0x174a62(0x53d)]['x']),_0x40856c['height']=Math[_0x174a62(0x7fc)](this[_0x174a62(0x5a4)]*this[_0x174a62(0x53d)]['y']);},Window['prototype'][_0x283c20(0x574)]=function(){const _0x3ff128=_0x283c20,_0x44fe49=this[_0x3ff128(0x875)],_0x3207b4=Math['max'](0x0,this['_width']-_0x44fe49*0x2),_0x4e364a=Math[_0x3ff128(0x861)](0x0,this[_0x3ff128(0x109)]-_0x44fe49*0x2),_0x16dcc=this[_0x3ff128(0x8b5)],_0x545b4d=_0x16dcc['children'][0x0];_0x16dcc[_0x3ff128(0x341)]=this[_0x3ff128(0x399)],_0x16dcc[_0x3ff128(0x6a4)](0x0,0x0,0x60,0x60),_0x16dcc['move'](_0x44fe49,_0x44fe49),_0x16dcc['scale']['x']=_0x3207b4/0x60,_0x16dcc[_0x3ff128(0x53d)]['y']=_0x4e364a/0x60,_0x545b4d['bitmap']=this[_0x3ff128(0x399)],_0x545b4d[_0x3ff128(0x6a4)](0x0,0x60,0x60,0x60),_0x545b4d['move'](0x0,0x0,_0x3207b4,_0x4e364a),_0x545b4d[_0x3ff128(0x53d)]['x']=0x1/_0x16dcc['scale']['x'],_0x545b4d[_0x3ff128(0x53d)]['y']=0x1/_0x16dcc[_0x3ff128(0x53d)]['y'],_0x16dcc[_0x3ff128(0x767)](this['_colorTone']);},Game_Temp['prototype'][_0x283c20(0x127)]=function(){const _0x4c45be=_0x283c20;this[_0x4c45be(0x228)]=[],this[_0x4c45be(0x3e2)]=[],this[_0x4c45be(0x8f3)]=[],this['_balloonQueue']=[];},VisuMZ[_0x283c20(0x85a)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x283c20(0x44e)][_0x283c20(0x7de)],Scene_Base[_0x283c20(0x44e)][_0x283c20(0x7de)]=function(){const _0xecf6d9=_0x283c20;if($gameTemp)$gameTemp[_0xecf6d9(0x127)]();VisuMZ[_0xecf6d9(0x85a)][_0xecf6d9(0x12c)][_0xecf6d9(0x5d8)](this);},Bitmap[_0x283c20(0x44e)][_0x283c20(0x2c0)]=function(_0x11b90a){const _0x4bbb25=_0x283c20,_0x1fa39c=this[_0x4bbb25(0x818)];_0x1fa39c[_0x4bbb25(0x657)](),_0x1fa39c[_0x4bbb25(0x58e)]=this[_0x4bbb25(0x793)]();const _0x480e91=_0x1fa39c[_0x4bbb25(0x4c7)](_0x11b90a)['width'];return _0x1fa39c[_0x4bbb25(0x8c9)](),_0x480e91;},Window_Message['prototype'][_0x283c20(0x232)]=function(_0x3ab39d){const _0x5d1c3b=_0x283c20;if(this['useFontWidthFix']()){if('uJZlc'!==_0x5d1c3b(0x150))this['drawGoldItemStyle']();else return this[_0x5d1c3b(0x666)][_0x5d1c3b(0x2c0)](_0x3ab39d);}else return Window_Base['prototype'][_0x5d1c3b(0x232)][_0x5d1c3b(0x5d8)](this,_0x3ab39d);},Window_Message[_0x283c20(0x44e)][_0x283c20(0x601)]=function(){const _0x109fff=_0x283c20;return VisuMZ['CoreEngine'][_0x109fff(0x914)]['QoL']['FontWidthFix']??!![];},VisuMZ['CoreEngine'][_0x283c20(0x671)]=Game_Action[_0x283c20(0x44e)][_0x283c20(0x4ed)],Game_Action['prototype'][_0x283c20(0x4ed)]=function(){const _0x5d7f87=_0x283c20;if(this['item']()){if(_0x5d7f87(0x90d)===_0x5d7f87(0x8f8)){const _0x3018c9=_0xccfda8[_0x5d7f87(0x85a)][_0x5d7f87(0x914)][_0x5d7f87(0x414)];for(const _0x4ed17 of _0x3018c9){const _0x5d517c=_0x4ed17['FunctionName'][_0x5d7f87(0x243)](/[ ]/g,''),_0x21d333=_0x4ed17[_0x5d7f87(0x2fe)];_0x5c4675['CoreEngine']['createJsQuickFunction'](_0x5d517c,_0x21d333);}}else return VisuMZ['CoreEngine'][_0x5d7f87(0x671)][_0x5d7f87(0x5d8)](this);}else return 0x0;},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x692)]=Game_Action[_0x283c20(0x44e)][_0x283c20(0x4a6)],Game_Action['prototype'][_0x283c20(0x4a6)]=function(){const _0x4c0294=_0x283c20;this[_0x4c0294(0x1f1)]()&&this[_0x4c0294(0x1f1)]()[_0x4c0294(0x8b3)]()?VisuMZ['CoreEngine'][_0x4c0294(0x692)][_0x4c0294(0x5d8)](this):_0x4c0294(0x458)!==_0x4c0294(0x458)?(_0x46bc47['prototype'][_0x4c0294(0x118)][_0x4c0294(0x5d8)](this),this[_0x4c0294(0x10e)](),this[_0x4c0294(0x34f)]()):this[_0x4c0294(0x5e1)]();},Sprite_Name[_0x283c20(0x44e)][_0x283c20(0x8e4)]=function(){return 0x24;},Sprite_Name[_0x283c20(0x44e)][_0x283c20(0x8d4)]=function(){const _0x35558d=_0x283c20,_0x19d137=this[_0x35558d(0x3f0)](),_0x31769d=this['bitmapWidth'](),_0x1b18de=this[_0x35558d(0x8e4)]();this[_0x35558d(0x844)](),this['bitmap'][_0x35558d(0x5e1)](),this[_0x35558d(0x341)][_0x35558d(0x120)](_0x19d137,0x0,0x0,_0x31769d,_0x1b18de,'left');},Bitmap[_0x283c20(0x44e)][_0x283c20(0x120)]=function(_0x479101,_0x496327,_0x43d43c,_0x23996d,_0xe1577a,_0x11e498){const _0x2c2d1f=_0x283c20,_0x2eb400=this['context'],_0x5daee8=_0x2eb400[_0x2c2d1f(0x7bd)];_0x23996d=_0x23996d||0xffffffff;let _0x440c3b=_0x496327,_0x4dc1cc=Math['round'](_0x43d43c+0x18/0x2+this['fontSize']*0.35);_0x11e498===_0x2c2d1f(0x179)&&(_0x440c3b+=_0x23996d/0x2),_0x11e498===_0x2c2d1f(0x15d)&&(_0x440c3b+=_0x23996d),_0x2eb400[_0x2c2d1f(0x657)](),_0x2eb400[_0x2c2d1f(0x58e)]=this['_makeFontNameText'](),_0x2eb400[_0x2c2d1f(0x2b7)]=_0x11e498,_0x2eb400['textBaseline']='alphabetic',_0x2eb400[_0x2c2d1f(0x7bd)]=0x1,this[_0x2c2d1f(0x139)](_0x479101,_0x440c3b,_0x4dc1cc,_0x23996d),_0x2eb400[_0x2c2d1f(0x7bd)]=_0x5daee8,this['_drawTextBody'](_0x479101,_0x440c3b,_0x4dc1cc,_0x23996d),_0x2eb400[_0x2c2d1f(0x8c9)](),this[_0x2c2d1f(0x866)][_0x2c2d1f(0x118)]();},VisuMZ[_0x283c20(0x85a)][_0x283c20(0x7f6)]=BattleManager[_0x283c20(0x1b5)],BattleManager[_0x283c20(0x1b5)]=function(_0x2c0189){const _0x4b6aa7=_0x283c20;if(this[_0x4b6aa7(0x896)][_0x4b6aa7(0x1e4)]())return![];return VisuMZ[_0x4b6aa7(0x85a)][_0x4b6aa7(0x7f6)][_0x4b6aa7(0x5d8)](this,_0x2c0189);},BattleManager[_0x283c20(0x1ae)]=function(){const _0x130992=_0x283c20;if(this[_0x130992(0x27a)])this[_0x130992(0x5cd)][_0x130992(0x1ae)](this[_0x130992(0x27a)]);this[_0x130992(0x535)]=_0x130992(0x43c),this[_0x130992(0x27a)]&&this[_0x130992(0x27a)][_0x130992(0x45c)]()===0x0&&(this['endBattlerActions'](this[_0x130992(0x27a)]),this['_subject']=null);};
