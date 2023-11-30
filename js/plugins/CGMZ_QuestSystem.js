/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/questsystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Creates and manages quests
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R3
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds a powerful quest system to your game. It
 * can handle automatic or manual tracking of quest progress, multiple quest
 * categories which can be sorted, and pinning quests to the top of the list.
 * The player can choose to accept / decline quests, and can track quests.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * This plugin is in *ALPHA* stage, which means it is not feature complete.
 * I plan to add the following features before it reaches *BETA* stage:
 * 1) Toast Integration for objective, start, discover, complete, and fail.
 * 2) Display on HUD for quest tracking
 * 3) Integrations for other CGMZ plugins
 * 4) Tracking for additional objective types (monsters, etc)
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ---------------------------Assumptions--------------------------------------
 * This plugin makes the following assumptions:
 * 1) A quest cannot be both completed AND failed
 * 2) A quest's name is UNIQUE
 * 3) A category's name is UNIQUE
 *
 * Make sure you follow these assumptions when setting up parameters.
 * --------------------------Resource Specs------------------------------------
 * The list window image should be 72 x 72 px
 * The background image should be 460px x 108px if using default resolution
 * ---------------------------Quest Stages-------------------------------------
 * Quests are structured by "stages" which determine where the player is
 * in the overall quest. If the player is on stage 2, then they will need to
 * complete all objectives for stage 2 before the plugin will advance them
 * to stage 3. This process is automatic, but you can advance stages manually
 * before all objectives of a stage have been completed if you wish.
 * ---------------------------Descriptions-------------------------------------
 * Quest descriptions are set up as a list of descriptions, with the first
 * in the list corresponding to the description that will be shown for the
 * first stage of the quest. Once you advance to the next stage, the next
 * description in the list will be used. If a stage does not have a
 * description, the last description in the list will be used.
 * ----------------------------Objectives--------------------------------------
 * Each automatic tracking objective can only track one of the available
 * categories. If you want to track both gold and an item, you will need to
 * make two objectives with one for gold and one for the item.
 *
 * When an objective is automatically tracked, it will potentially auto
 * complete the entire quest if the automatic tracked objective is last needed
 * objective of the last stage. Make sure you have a manual objective last if
 * you want the quest to need to be turned in to a specific NPC.
 *
 * If there are no objectives for a given stage, this plugin assumes that
 * the quest is complete at that point and automatically completes the quest.
 *
 * Once an objective has been completed, it will be saved as completed and
 * will NOT automatically become incomplete if the player no longer meets the
 * requirements of the objective. You can manually set an objective to
 * incomplete if you wish.
 *
 * Objective IDs just need to be unique for each quest. You can re-use the
 * ID in separate quests.
 * -----------------------------Rewards----------------------------------------
 * This plugin will automatically award the gold, items/weapons/armors, and
 * experience rewards. You will need to manually award any custom rewards.
 * ----------------------Drag and Drop Sorting---------------------------------
 * Categories are sorted in the order they are listed in the Category Sort
 * Order list. If you want a certain location to appear above another location,
 * make sure the category is listed in the correct order.
 *
 * Sort options are sorted in the order they are listed in the Sort Options
 * parameter. You can change the order or which options are available to sort
 * by here by either dragging and dropping or deleting sort types.
 * ---------------------------Script Calls-------------------------------------
 * To call the quest scene via JS, use:
 * SceneManager.push(CGMZ_Scene_QuestSystem);
 * -------------------------Plugin Commands------------------------------------
 * This plugin supports the following Plugin Commands:
 * • Call Scene
 * Calls the Quest Log scene which displays discovered quests
 *
 * • Call Accept Scene
 * Calls the scene for accepting a single quest
 *
 * • Call Quest Board Scene
 * Calls the scene for accepting multiple quests
 *
 * • Set Objective Progress
 * Change the progress of an objective that is not being automatically
 * tracked.
 *
 * • Advance Quest Stage
 * Forcibly advances the quest's stage by 1.
 *
 * • Get Quest Stage
 * Puts the current stage of the quest into a variable
 *
 * • Get Quest Status
 * Sets a variable to number based on quest discover/start/completion/fail
 * status.
 * 0 = undiscovered
 * 1 = discovered
 * 2 = started
 * 3 = failed
 * 4 = completed
 *
 * • Discover Quest
 * Discovers the quest but does not start it.
 *
 * • Start Quest
 * Starts the quest. Optionally also discovers it.
 *
 * • Complete Quest
 * Marks a quest as completed.
 *
 * • Fail Quest
 * Marks a quest as failed.
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games. You should be able to add this
 * plugin to a saved game and have it show up with your quests. Other saved
 * game functionality may/may not work as the plugin is still in alpha. Please
 * do your testing with new games, and if issue arises with specifically a
 * saved game only bring the issue to my attention.
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_QuestSystem.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version Alpha R2:
 * - Added an icon parameter to categories, which can show up in various areas
 * - Added optional Legend window to the Quest Board scene
 * - Added a switch parameter to quests that turns on when quest is started
 * - Added parameters to change the header line gradient colors
 * - Added ability to hide gold/exp rewards if they are 0
 * - Added option to enable cancel button in quest accept scene
 * - Fixed bug with text in list window not being limited to the window
 * - Icon parameters now use icon selector in plugin manager
 *
 * Version Alpha R3:
 * - Added toast manager integration (quest discover, start, complete, fail)
 * - Added parameter to objectives to turn a switch ON when completed
 * 
 * @command Call Scene
 * @desc Calls the Quest scene
 * 
 * @command Call Accept Scene
 * @desc Calls the scene to accept / decline a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to accept / decline
 *
 * @arg Decision Switch
 * @type switch
 * @default 0
 * @desc Sets the given switch to true (if accepted) and false (if declined / cancel)
 * 
 * @command Call Quest Board Scene
 * @desc Calls the scene to show a quest board where players can choose from provided quests
 *
 * @arg Window Name
 * @default Quest Board
 * @desc Text to display in a window at the top of the scene. Blank = no window
 *
 * @arg Quest Names
 * @type text[]
 * @desc The name of the quests to offer on the quest board
 *
 * @arg Scene Image
 * @type file
 * @dir img
 * @desc The image to show as the scene background
 *
 * @arg Category Icon Type
 * @desc The category type to display icons for (leave blank for no icons)
	 *
 * @arg Show Legend
 * @type boolean
 * @default false
 * @desc Determines if a legend window appears to explain the category icons shown. No effect if no category icon type.
 * 
 * @command Set Objective Progress
 * @desc Set an objective's progress
 *
 * @arg Quest Name
 * @desc The name of the quest to change objective status
 *
 * @arg id
 * @desc The objective id to change
 *
 * @arg mode
 * @type select
 * @option +
 * @option -
 * @option =
 * @desc Whether to add, subtract, or set
 *
 * @arg amount
 * @type number
 * @default 0
 * @desc The amount to change
 *
 * @arg variable
 * @type variable
 * @default 0
 * @desc Change amount by variable
 * 
 * @command Advance Quest Stage
 * @desc Advance a quest's stage by one
 *
 * @arg Quest Name
 * @desc The name of the quest to change stage of
 * 
 * @command Get Quest Stage
 * @desc Check the stage of the given quest
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Variable to set to quest stage
 * 
 * @command Get Quest Objective
 * @desc Check the objective progress of the given objective
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 *
 * @arg Objective
 * @desc The name of the objective to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Variable to set to objective progress
 * 
 * @command Get Quest Status
 * @desc Check the status of the given quest
 *
 * @arg Quest Name
 * @desc The name of the quest to check
 * 
 * @arg Variable ID
 * @type variable
 * @default 0
 * @desc Sets variable to quest status, see documentation.
 * 
 * @command Discover Quest
 * @desc Discover (or undiscover) a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change discovered status
 *
 * @arg Discover
 * @type boolean
 * @default true
 * @desc Set quest to discovered or undiscovered
 * 
 * @command Start Quest
 * @desc Start (or unstart) a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change started status
 *
 * @arg Start
 * @type boolean
 * @default true
 * @desc Set quest to started or unstarted.
 *
 * @arg Discover
 * @type boolean
 * @default true
 * @desc Also discover the quest?
 * 
 * @command Complete Quest
 * @desc Complete a quest. This will also advance the quest stage to the last stage.
 *
 * @arg Quest Name
 * @desc The name of the quest to change completion status
 * 
 * @command Fail Quest
 * @desc Fail a quest
 *
 * @arg Quest Name
 * @desc The name of the quest to change failed status
 *
 * @param Quests
 * @type struct<Quest>[]
 * @desc Set up quests here
 * @default []
 *
 * @param Categories
 * @type struct<QuestCategory>[]
 * @desc Set up quest categories here
 * @default []
 *
 * @param Quest Options
 *
 * @param Objective Complete Icon
 * @parent Quest Options
 * @type icon
 * @default 164
 * @desc The icon to show in the check box next to the objective if completed.
 *
 * @param Objective Failed Icon
 * @parent Quest Options
 * @type icon
 * @default 162
 * @desc The icon to show in the check box next to the objective if failed.
 *
 * @param Rec Level Positive Colors
 * @parent Quest Options
 * @type text[]
 * @default ["#F3ED84","#F3CB5E","#EE9838","#E46B3E","#DD5D48"]
 * @desc Colors to use for recommended level if higher than average party level
 *
 * @param Rec Level Equal Color
 * @parent Quest Options
 * @default #FFFFFF
 * @desc Color to use for recommended level if equal to average party level
 *
 * @param Rec Level Negative Colors
 * @parent Quest Options
 * @type text[]
 * @default ["#BEF0BD","#8FEA8D","#BDBDBD","#32DA2F","#9E9E9E"]
 * @desc Colors to use for recommended level if lower than average party level
 *
 * @param Completed Quests
 *
 * @param Separate Complete Quests
 * @parent Completed Quests
 * @type boolean
 * @desc Create a separate category for completed quests at bottom of scene?
 * @default true
 *
 * @param Always Show Complete Category
 * @parent Completed Quests
 * @type boolean
 * @desc Show the completed category even if 0 quests are completed?
 * @default true
 *
 * @param Completed Category
 * @parent Completed Quests
 * @type struct<QuestCategory>
 * @desc Set up the Completed Category here
 * @default {"Name":"Completed","Type":"Category","Display Name":"Completed","Description":"\"These are all of the quests you have \\\\c[3]completed\\\\c[0]!\"","Color1":"rgba(24, 171, 109, 1)","Color2":"rgba(31, 107, 75, 0.5)","Text Color":"11","Start Expanded":"true"}
 *
 * @param Failed Quests
 *
 * @param Separate Failed Quests
 * @parent Failed Quests
 * @type boolean
 * @desc Create a separate category for failed quests at bottom of scene?
 * @default true
 *
 * @param Always Show Failed Category
 * @parent Failed Quests
 * @type boolean
 * @desc Show the failed category even if 0 quests are failed?
 * @default true
 *
 * @param Failed Category
 * @parent Failed Quests
 * @type struct<QuestCategory>
 * @desc Set up the Failed Category here
 * @default {"Name":"Failed","Type":"Category","Display Name":"Failed","Description":"\"These are all of the quests that you have \\\\c[2]failed\\\\c[0]!\"","Color1":"rgba(110, 43, 29, 1)","Color2":"rgba(191, 49, 19, 0.5)","Text Color":"10","Start Expanded":"true"}
 *
 * @param Pinned Quests
 *
 * @param Allow Pinned Quests
 * @parent Pinned Quests
 * @type boolean
 * @desc Allow the player to pin / unpin quests?
 * @default true
 *
 * @param Always Show Pinned Category
 * @parent Pinned Quests
 * @type boolean
 * @desc Show the pinned category even if 0 quests are pinned?
 * @default true
 *
 * @param Pinned Category
 * @parent Pinned Quests
 * @type struct<QuestCategory>
 * @desc Set up the Pinned Category here
 * @default {"Name":"Pinned","Type":"Category","Display Name":"Pinned","Description":"\"Quests shown here have been pinned. To pin or unpin a quest, select the quest in the list then press OK to bring up the pin menu.\"","Color1":"rgba(142, 56, 217, 0.5)","Color2":"rgba(104, 47, 153, 0.5)","Text Color":"0","Start Expanded":"true"}
 *
 * @param Scene Options
 *
 * @param Draw Category Info
 * @parent Scene Options
 * @type boolean
 * @desc Whether the display window should draw info about the category
 * @default true
 *
 * @param Quest Info Order
 * @parent Scene Options
 * @type select[]
 * @option Divider - Info
 * @option Completion Date
 * @option Type
 * @option Difficulty
 * @option Length
 * @option Location
 * @option Quest Giver
 * @option Recommended Level
 * @option Divider - Description
 * @option Description
 * @option Divider - Objectives
 * @option Objectives
 * @option Divider - Rewards
 * @option Rewards
 * @desc The categories to allow sorting by
 * @default ["Divider - Info","Completion Date","Type","Difficulty","Length","Location","Quest Giver","Recommended Level","Divider - Description","Description","Divider - Objectives","Objectives","Divider - Rewards","Rewards"]
 *
 * @param Allow Sorting
 * @parent Scene Options
 * @type boolean
 * @desc Whether the player should be able to sort the quests by different category types or not
 * @default true
 *
 * @param Sort Options
 * @parent Scene Options
 * @type select[]
 * @option Category
 * @option Difficulty
 * @option Length
 * @option Location
 * @desc The categories to allow sorting by
 * @default ["Category","Difficulty","Length","Location"]
 *
 * @param Sort Options Text
 * @parent Scene Options
 * @type text[]
 * @desc The text displayed for the categories (in the same order as Sort Options)
 * @default ["Category","Difficulty","Length","Location"]
 *
 * @param Sort Key
 * @parent Scene Options
 * @default s
 * @desc Key that will trigger the sort process while list window is active
 *
 * @param Show Sort Button
 * @parent Scene Options
 * @type boolean
 * @desc Whether to show a sort button for Touch UI next to cancel button
 * @default true
 *
 * @param Sort Button Offset
 * @parent Scene Options
 * @type number
 * @min 0
 * @default 11
 * @desc Sort Button index on the button sheet
 *
 * @param Sort Button Width
 * @parent Scene Options
 * @type number
 * @min 1
 * @default 1
 * @desc Sort Button width (in multiple of 48 pixels)
 *
 * @param Category Sort Order
 * @parent Scene Options
 * @type text[]
 * @desc Type category names here, and the order listed will be the same order in scene
 * @default []
 *
 * @param Always Show Past Objectives
 * @parent Scene Options
 * @type boolean
 * @desc Whether to show previous quest stage objectives always (if false, only after completion)
 * @default true
 *
 * @param Date Format
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying completion date format. See documentation for help. Valid Range: 0-8
 * @default 0
 *
 * @param Date Delimiter
 * @parent Scene Options
 * @desc The character(s) to player between date numbers
 * @default /
 *
 * @param Transparent Windows
 * @parent Scene Options
 * @type boolean
 * @desc Whether the quest windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Scene Options
 * @type file
 * @dir img
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Fade Sprite Opacity
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity to make the black rectangle behind quest name above quest image
 * @default 100
 *
 * @param ScrollSpeed
 * @parent Scene Options
 * @type number
 * @min 0
 * @desc speed at which the quest display window scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Disable Touch UI Space
 * @parent Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Allow Cancel In Accept Scene
 * @parent Scene Options
 * @type boolean
 * @desc If true, the player will be able to cancel out of the quest accept scene (in addition to accept or decline quest)
 * @default true
 *
 * @param Always Show Gold Reward
 * @parent Scene Options
 * @type boolean
 * @desc If true, the gold reward will be drawn even if it is 0
 * @default false
 *
 * @param Always Show Exp Reward
 * @parent Scene Options
 * @type boolean
 * @desc If true, the exp reward will be drawn even if it is 0
 * @default false
 *
 * @param Draw Icon In List
 * @parent Scene Options
 * @type boolean
 * @desc If true, will attempt to draw category icon in list window
 * @default true
 *
 * @param List Window Width
 * @parent Scene Options
 * @type number
 * @min 0
 * @max 100
 * @desc Width as screen % of the quest list window
 * @default 40
 *
 * @param List Window Right
 * @parent Scene Options
 * @type boolean
 * @desc If true, will display the quest list window on the right side of the screen
 * @default false
 *
 * @param List Windowskin
 * @parent Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the List window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Display window. Leave blank to use default.
 *
 * @param Pin Confirm Windowskin
 * @parent Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Pin Confirmation window. Leave blank to use default.
 *
 * @param Sort Windowskin
 * @parent Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Sort window. Leave blank to use default.
 *
 * @param Sort Info Windowskin
 * @parent Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Sort Info window. Leave blank to use default.
 *
 * @param Text Options
 *
 * @param Label Text Color
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The color of the label text
 *
 * @param Updated Text Color
 * @parent Text Options
 * @type color
 * @desc Color to display the updated text in if the quest has been updated since last view
 * @default 14
 *
 * @param Header Gradient Color 1
 * @parent Text Options
 * @type color
 * @default 0
 * @desc The first color for the header line gradient color
 *
 * @param Header Gradient Color 2
 * @parent Text Options
 * @type color
 * @default 1
 * @desc The second color for the header line gradient color
 *
 * @param Updated Text
 * @parent Text Options
 * @desc Text to show when a quest has been updated (on list window)
 * @default !
 *
 * @param Sort Info Text
 * @parent Text Options
 * @desc Text to describe how to sort
 * @default S Key / Sort Icon: Sort
 *
 * @param Pin Text
 * @parent Text Options
 * @desc Text to describe the pin action
 * @default Pin
 *
 * @param Unpin Text
 * @parent Text Options
 * @desc Text to describe the unpin action
 * @default Unpin
 *
 * @param Cancel Text
 * @parent Text Options
 * @desc Text to describe the cancel action
 * @default Cancel
 *
 * @param Completion Text
 * @parent Text Options
 * @desc Text used in the label for the completion date on completed quests
 * @default Completed:
 *
 * @param Category Text
 * @parent Text Options
 * @desc Text used in the label for the category of a quest
 * @default Type:
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text used in the label for the difficulty of a quest
 * @default Difficulty:
 *
 * @param Length Text
 * @parent Text Options
 * @desc Text used in the label for the length of a quest
 * @default Length:
 *
 * @param Location Text
 * @parent Text Options
 * @desc Text used in the label for the location of a quest
 * @default Location:
 *
 * @param Quest Giver Text
 * @parent Text Options
 * @desc Text used in the label for the quest giver of a quest
 * @default Quest Giver:
 *
 * @param Recommended Level Text
 * @parent Text Options
 * @desc Text used in the label for the recommended level of a quest
 * @default Recommended Level:
 *
 * @param Exp Text
 * @parent Text Options
 * @desc Text used in the label for the exp reward
 * @default Experience:
 *
 * @param Gold Text
 * @parent Text Options
 * @desc Text used in the label for the gold reward
 * @default Currency:
 *
 * @param Info Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Info
 * @default Info
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Description
 * @default Description
 *
 * @param Objectives Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Objectives
 * @default Objectives
 *
 * @param Rewards Text
 * @parent Text Options
 * @desc Text used in the divider for Quest Rewards
 * @default Rewards
 *
 * @param New Quest Text
 * @parent Text Options
 * @desc Text used in the display window for accepting a quest before the quest name
 * @default New Quest:
 *
 * @param Accept Text
 * @parent Text Options
 * @desc Text used in the command window for accepting a quest
 * @default Accept
 *
 * @param Decline Text
 * @parent Text Options
 * @desc Text used in the command window for declining a quest
 * @default Decline
 *
 * @param Empty Quest Board Text
 * @parent Text Options
 * @type note
 * @desc Text used when a quest board has no quests to offer.
 * @default "This quest board currently has no listings. Check back later and more might appear."
 *
 * @param Integration Options
 *
 * @param Toast Options
 * @parent Integration Options
 *
 * @param Quest Discover Toast
 * @parent Toast Options
 * @type struct<QuestToast>
 * @default {"Display":"true","Text Line 1":"Quest Discovered:","Text Line 2":"%questname","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Tone":"","Background Style":"Window","Windowskin":"","Width":"0","Height":"0"}
 * @desc The default toast to display when a quest is discovered
 *
 * @param Quest Started Toast
 * @parent Toast Options
 * @type struct<QuestToast>
 * @default {"Display":"true","Text Line 1":"Quest Started:","Text Line 2":"%questname","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Tone":"","Background Style":"Window","Windowskin":"","Width":"0","Height":"0"}
 * @desc The default toast to display when a quest is started
 *
 * @param Quest Completed Toast
 * @parent Toast Options
 * @type struct<QuestToast>
 * @default {"Display":"true","Text Line 1":"Quest Completed:","Text Line 2":"%questname","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Tone":"","Background Style":"Window","Windowskin":"","Width":"0","Height":"0"}
 * @desc The default toast to display when a quest is completed
 *
 * @param Quest Failed Toast
 * @parent Toast Options
 * @type struct<QuestToast>
 * @default {"Display":"true","Text Line 1":"Quest Failed:","Text Line 2":"%questname","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Tone":"","Background Style":"Window","Windowskin":"","Width":"0","Height":"0"}
 * @desc The default toast to display when a quest is failed
 *
 * @param Quest Objective Complete Toast
 * @parent Toast Options
 * @type struct<QuestToast>
 * @default {"Display":"true","Text Line 1":"Objective Completed For:","Text Line 2":"%questname","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Tone":"","Background Style":"Window","Windowskin":"","Width":"0","Height":"0"}
 * @desc The default toast to display when a quest is failed
*/
/*~struct~QuestCategory:
 * @param Name
 * @desc The name of the category used throughout the quest system
 *
 * @param Type
 * @type select
 * @option Category
 * @option Difficulty
 * @option Length
 * @option Location
 * @default Category
 * @desc The type of category this is classified as
 *
 * @param Display Name
 * @desc The display name of the category
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc The icon of the category. Will be ignored if set to 0
 *
 * @param Description
 * @type note
 * @default ""
 * @desc The description of the category
 *
 * @param Color1
 * @default rgba(32, 32, 32, 0.5)
 * @desc The first color to use to represent the category. RGBA format
 *
 * @param Color2
 * @default rgba(0, 0, 0, 0.5)
 * @desc The second color to use to represent the category. RGBA format
 *
 * @param Text Color
 * @type color
 * @default 0
 * @desc The color of the text for the category
 *
 * @param Start Expanded
 * @type boolean
 * @default true
 * @desc Whether the category should be expanded by default
*/
/*~struct~Quest:
 * @param Name
 * @desc The name of the quest (must be unique)
 *
 * @param Difficulty
 * @desc The difficulty of the quest
 *
 * @param Length
 * @desc The length of the quest
 *
 * @param Location
 * @desc The location of the quest
 *
 * @param Quest Giver
 * @desc The person who gives you the quest
 *
 * @param Category
 * @desc The category of the quest (such as main quest, sidequest, etc)
 *
 * @param Recommended Level
 * @type number
 * @default 0
 * @desc The recommended level of the quest (leave 0 if not using)
 *
 * @param List Image
 * @type file
 * @dir img
 * @desc The image of the quest displayed in the list window (recommended dimensions 72x72 px)
 *
 * @param Background Image
 * @type file
 * @dir img
 * @desc The image to show behind the name of the quest (recommended 108px height)
 *
 * @param Accept Scene Image
 * @type file
 * @dir img
 * @desc The image to show as the scene background while the player is accepting the quest
 *
 * @param Unstarted Objective
 * @type note
 * @default "\\c[3]Accept\\c[0] this quest to see its objectives."
 * @desc What to show for objectives if the quest is discovered but not yet started.
 *
 * @param Unstarted Description
 * @type note
 * @default ""
 * @desc The description to show before the quest is accepted
 *
 * @param Board Description
 * @type note
 * @default ""
 * @desc The description to show on the quest board scene
 *
 * @param Board Switch
 * @type switch
 * @default 0
 * @desc Required switch to be ON to appear on quest board scene
 *
 * @param Started Switch
 * @type switch
 * @default 0
 * @desc Turns this switch ON when the quest is started
 *
 * @param Description
 * @type note[]
 * @default []
 * @desc The main description of the quest. See documentation.
 *
 * @param Objectives
 * @type struct<QuestObjective>[]
 * @default []
 * @desc Quest objectives
 *
 * @param Reward Gold
 * @type number
 * @default 0
 * @desc Amount of gold to award upon completion
 *
 * @param Reward Exp
 * @type number
 * @default 0
 * @desc Amount of exp to award the entire party upon completion
 *
 * @param Reward Items
 * @type struct<QuestItem>[]
 * @default []
 * @desc Items to award upon completion
 *
 * @param Reward Weapons
 * @type struct<QuestWeapon>[]
 * @default []
 * @desc Weapons to award upon completion
 *
 * @param Reward Armors
 * @type struct<QuestArmor>[]
 * @default []
 * @desc Armors to award upon completion
 *
 * @param Reward Custom
 * @type text[]
 * @default []
 * @desc Custom rewards to give (not automatically given)
*/
/*~struct~QuestObjective:
 * @param id
 * @desc The id of the objective, can be anything but must be unique and not blank.
 *
 * @param Description
 * @type note
 * @default ""
 * @desc The description of the objective
 *
 * @param Stage
 * @type number
 * @default 1
 * @min 1
 * @desc The stage of the quest where this objective becomes visible (quests start at stage 1)
 *
 * @param Max Progress
 * @type number
 * @default 0
 * @min 0
 * @desc The max progress of the objective if tracking manually or via variable
 *
 * @param Use Automatic Tracking
 * @type boolean
 * @default false
 * @desc Enable this to automatically track the progress if item, weapon, armor, variable, or gold
 *
 * @param Gold Tracking
 * @type number
 * @default 0
 * @min 0
 * @desc The amount of gold to track (leave 0 if no gold needed)
 *
 * @param Item Tracking
 * @type struct<QuestItem>
 * @desc The item to track and amount needed
 *
 * @param Weapon Tracking
 * @type struct<QuestWeapon>
 * @desc The weapon to track and amount needed
 *
 * @param Armor Tracking
 * @type struct<QuestArmor>
 * @desc The armor to track and amount needed
 *
 * @param Variable Tracking
 * @type variable
 * @default 0
 * @desc Automatic tracking for a variable. Uses Max Progress param for tracking
 *
 * @param Objective Switch
 * @type switch
 * @default 0
 * @desc A switch that will be turned on automatically when the objective is marked complete
*/
/*~struct~QuestItem:
 * @param Item
 * @type item
 * @desc The item to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the item to use
*/
/*~struct~QuestWeapon:
 * @param Weapon
 * @type weapon
 * @desc The weapon to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the weapon to use
*/
/*~struct~QuestArmor:
 * @param Armor
 * @type armor
 * @desc The armor to use
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Amount of the armor to use
*/
/*~struct~QuestToast:
 * @param Display
 * @type boolean
 * @default true
 * @desc If this toast displays or not
 *
 * @param Text Line 1
 * @default Quest Discovered:
 * @desc The text to display on the first line of the toast
 *
 * @param Text Line 2
 * @default %questname
 * @desc The text to display on the second line of the toast
 *
 * @param Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sound effect to play when the toast displays
 *
 * @param Tone
 * @type struct<Tone>
 * @desc Tone of the toast window
 *
 * @param Background Style
 * @type select
 * @option Transparent
 * @option Dim
 * @option Window
 * @default Window
 * @desc The background style of the toast
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc The windowskin to use for the toast
 *
 * @param Width
 * @type number
 * @min 0
 * @default 0
 * @desc The width (in pixels) of the toast. Leave 0 to use default
 *
 * @param Height
 * @type number
 * @min 0
 * @default 0
 * @desc The height (in text lines) of the toast. Leave 0 to use default
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc Sound Effect file to play
 *
 * @param Volume
 * @type number
 * @default 90
 * @min 0
 * @max 100
 * @desc Volume of the sound effect
 *
 * @param Pitch
 * @type number
 * @default 100
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect
 *
 * @param Pan
 * @type number
 * @default 0
 * @min -100
 * @max 100
 * @desc Pan of the sound effect
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @default 0
 * @min -256
 * @max 255
 * @desc The red of the tone
 *
 * @param Green
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * @desc The green of the tone
 *
 * @param Blue
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * @desc The blue of the tone
*/
var Imported = Imported || {};
Imported.CGMZ_QuestSystem = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Quest System"] = "Alpha R3";
CGMZ.QuestSystem = {};
CGMZ.QuestSystem.parameters = PluginManager.parameters('CGMZ_QuestSystem');
CGMZ.QuestSystem.LabelTextColor = Number(CGMZ.QuestSystem.parameters["Label Text Color"]);
CGMZ.QuestSystem.ScrollSpeed = Number(CGMZ.QuestSystem.parameters["ScrollSpeed"]);
CGMZ.QuestSystem.ScrollWait = Number(CGMZ.QuestSystem.parameters["ScrollWait"]);
CGMZ.QuestSystem.FadeSpriteOpacity = Number(CGMZ.QuestSystem.parameters["Fade Sprite Opacity"]);
CGMZ.QuestSystem.SortButtonOffset = Number(CGMZ.QuestSystem.parameters["Sort Button Offset"]);
CGMZ.QuestSystem.SortButtonWidth = Number(CGMZ.QuestSystem.parameters["Sort Button Width"]);
CGMZ.QuestSystem.DateFormat = Number(CGMZ.QuestSystem.parameters["Date Format"]);
CGMZ.QuestSystem.ObjectiveCompleteIcon = Number(CGMZ.QuestSystem.parameters["Objective Complete Icon"]);
CGMZ.QuestSystem.ObjectiveFailedIcon = Number(CGMZ.QuestSystem.parameters["Objective Failed Icon"]);
CGMZ.QuestSystem.UpdatedTextColor = Number(CGMZ.QuestSystem.parameters["Updated Text Color"]);
CGMZ.QuestSystem.ListWindowWidth = Number(CGMZ.QuestSystem.parameters["List Window Width"]);
CGMZ.QuestSystem.HeaderGradientColor1 = Number(CGMZ.QuestSystem.parameters["Header Gradient Color 1"]);
CGMZ.QuestSystem.HeaderGradientColor2 = Number(CGMZ.QuestSystem.parameters["Header Gradient Color 2"]);
CGMZ.QuestSystem.ScrollDeceleration = parseFloat(CGMZ.QuestSystem.parameters["Scroll Deceleration"]);
CGMZ.QuestSystem.BackgroundImage = CGMZ.QuestSystem.parameters["Background Image"];
CGMZ.QuestSystem.SortInfoText = CGMZ.QuestSystem.parameters["Sort Info Text"];
CGMZ.QuestSystem.SortKey = CGMZ.QuestSystem.parameters["Sort Key"];
CGMZ.QuestSystem.DateDelimiter = CGMZ.QuestSystem.parameters["Date Delimiter"];
CGMZ.QuestSystem.PinText = CGMZ.QuestSystem.parameters["Pin Text"];
CGMZ.QuestSystem.UnpinText = CGMZ.QuestSystem.parameters["Unpin Text"];
CGMZ.QuestSystem.CancelText = CGMZ.QuestSystem.parameters["Cancel Text"];
CGMZ.QuestSystem.UpdatedText = CGMZ.QuestSystem.parameters["Updated Text"];
CGMZ.QuestSystem.CompletionText = CGMZ.QuestSystem.parameters["Completion Text"];
CGMZ.QuestSystem.CategoryText = CGMZ.QuestSystem.parameters["Category Text"];
CGMZ.QuestSystem.DifficultyText = CGMZ.QuestSystem.parameters["Difficulty Text"];
CGMZ.QuestSystem.LengthText = CGMZ.QuestSystem.parameters["Length Text"];
CGMZ.QuestSystem.LocationText = CGMZ.QuestSystem.parameters["Location Text"];
CGMZ.QuestSystem.QuestGiverText = CGMZ.QuestSystem.parameters["Quest Giver Text"];
CGMZ.QuestSystem.ExpText = CGMZ.QuestSystem.parameters["Exp Text"];
CGMZ.QuestSystem.GoldText = CGMZ.QuestSystem.parameters["Gold Text"];
CGMZ.QuestSystem.InfoText = CGMZ.QuestSystem.parameters["Info Text"];
CGMZ.QuestSystem.DescriptionText = CGMZ.QuestSystem.parameters["Description Text"];
CGMZ.QuestSystem.ObjectivesText = CGMZ.QuestSystem.parameters["Objectives Text"];
CGMZ.QuestSystem.RewardsText = CGMZ.QuestSystem.parameters["Rewards Text"];
CGMZ.QuestSystem.RecommendedLevelText = CGMZ.QuestSystem.parameters["Recommended Level Text"];
CGMZ.QuestSystem.AcceptText = CGMZ.QuestSystem.parameters["Accept Text"];
CGMZ.QuestSystem.DeclineText = CGMZ.QuestSystem.parameters["Decline Text"];
CGMZ.QuestSystem.NewQuestText = CGMZ.QuestSystem.parameters["New Quest Text"];
CGMZ.QuestSystem.RecLvlEqualColor = CGMZ.QuestSystem.parameters["Rec Level Equal Color"];
CGMZ.QuestSystem.ListWindowskin = CGMZ.QuestSystem.parameters["List Windowskin"];
CGMZ.QuestSystem.DisplayWindowskin = CGMZ.QuestSystem.parameters["Display Windowskin"];
CGMZ.QuestSystem.PinConfirmWindowskin = CGMZ.QuestSystem.parameters["Pin Confirm Windowskin"];
CGMZ.QuestSystem.SortWindowskin = CGMZ.QuestSystem.parameters["Sort Windowskin"];
CGMZ.QuestSystem.SortInfoWindowskin = CGMZ.QuestSystem.parameters["Sort Info Windowskin"];
CGMZ.QuestSystem.TransparentWindows = (CGMZ.QuestSystem.parameters["Transparent Windows"] === "true");
CGMZ.QuestSystem.AutoScroll = (CGMZ.QuestSystem.parameters["Auto Scroll"] === "true");
CGMZ.QuestSystem.SeparateCompleteQuests = (CGMZ.QuestSystem.parameters["Separate Complete Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowCompleteCategory = (CGMZ.QuestSystem.parameters["Always Show Complete Category"] === "true");
CGMZ.QuestSystem.SeparateFailedQuests = (CGMZ.QuestSystem.parameters["Separate Failed Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowFailedCategory = (CGMZ.QuestSystem.parameters["Always Show Failed Category"] === "true");
CGMZ.QuestSystem.DrawCategoryInformation = (CGMZ.QuestSystem.parameters["Draw Category Info"] === "true");
CGMZ.QuestSystem.AllowSorting = (CGMZ.QuestSystem.parameters["Allow Sorting"] === "true");
CGMZ.QuestSystem.ShowSortButton = (CGMZ.QuestSystem.parameters["Show Sort Button"] === "true");
CGMZ.QuestSystem.AllowPinnedQuests = (CGMZ.QuestSystem.parameters["Allow Pinned Quests"] === "true");
CGMZ.QuestSystem.AlwaysShowPinnedCategory = (CGMZ.QuestSystem.parameters["Always Show Pinned Category"] === "true");
CGMZ.QuestSystem.AlwaysShowPastObjectives = (CGMZ.QuestSystem.parameters["Always Show Past Objectives"] === "true");
CGMZ.QuestSystem.DisableTouchUISpace = (CGMZ.QuestSystem.parameters["Disable Touch UI Space"] === "true");
CGMZ.QuestSystem.ListWindowRight = (CGMZ.QuestSystem.parameters["List Window Right"] === "true");
CGMZ.QuestSystem.AllowCancelInAcceptScene = (CGMZ.QuestSystem.parameters["Allow Cancel In Accept Scene"] === "true");
CGMZ.QuestSystem.AlwaysShowGoldReward = (CGMZ.QuestSystem.parameters["Always Show Gold Reward"] === "true");
CGMZ.QuestSystem.AlwaysShowExpReward = (CGMZ.QuestSystem.parameters["Always Show Exp Reward"] === "true");
CGMZ.QuestSystem.DrawIconInList = (CGMZ.QuestSystem.parameters["Draw Icon In List"] === "true");
CGMZ.QuestSystem.RecLvlNegativeColors = JSON.parse(CGMZ.QuestSystem.parameters["Rec Level Negative Colors"]);
CGMZ.QuestSystem.RecLvlPositiveColors = JSON.parse(CGMZ.QuestSystem.parameters["Rec Level Positive Colors"]);
CGMZ.QuestSystem.CompleteCategory = JSON.parse(CGMZ.QuestSystem.parameters["Completed Category"]);
CGMZ.QuestSystem.FailedCategory = JSON.parse(CGMZ.QuestSystem.parameters["Failed Category"]);
CGMZ.QuestSystem.PinnedCategory = JSON.parse(CGMZ.QuestSystem.parameters["Pinned Category"]);
CGMZ.QuestSystem.CategorySortOrder = JSON.parse(CGMZ.QuestSystem.parameters["Category Sort Order"]);
CGMZ.QuestSystem.SortOptions = JSON.parse(CGMZ.QuestSystem.parameters["Sort Options"]);
CGMZ.QuestSystem.SortOptionsText = JSON.parse(CGMZ.QuestSystem.parameters["Sort Options Text"]);
CGMZ.QuestSystem.QuestInfoOrder = JSON.parse(CGMZ.QuestSystem.parameters["Quest Info Order"]);
CGMZ.QuestSystem.EmptyQuestBoardText = JSON.parse(CGMZ.QuestSystem.parameters["Empty Quest Board Text"]);
CGMZ.QuestSystem.Quests = JSON.parse(CGMZ.QuestSystem.parameters["Quests"]);
CGMZ.QuestSystem.QuestCategories = JSON.parse(CGMZ.QuestSystem.parameters["Categories"]);
CGMZ.QuestSystem.QuestDiscoverToastParsed = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Discover Toast"], null, "CGMZ Quest System", "Your Quest Discover Toast parameter had invalid JSON and could not be read.");
CGMZ.QuestSystem.QuestStartedToastParsed = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Started Toast"], null, "CGMZ Quest System", "Your Quest Started Toast parameter had invalid JSON and could not be read.");
CGMZ.QuestSystem.QuestCompletedToastParsed = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Completed Toast"], null, "CGMZ Quest System", "Your Quest Completed Toast parameter had invalid JSON and could not be read.");
CGMZ.QuestSystem.QuestFailedToastParsed = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Failed Toast"], null, "CGMZ Quest System", "Your Quest Failed Toast parameter had invalid JSON and could not be read.");
CGMZ.QuestSystem.QuestObjectiveCompleteToastParsed = CGMZ_Utils.parseJSON(CGMZ.QuestSystem.parameters["Quest Objective Complete Toast"], null, "CGMZ Quest System", "Your Quest Objective Complete Toast parameter had invalid JSON and could not be read.");
//=============================================================================
// CGMZ_Quest
//-----------------------------------------------------------------------------
// Data class used to store quest data which is added to save file
//=============================================================================
function CGMZ_Quest() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.initialize = function() {
	this._isDiscovered = false;
	this._isStarted = false;
	this._isCompleted = false;
	this._isFailed = false;
	this._isPinned = false;
	this._isUpdated = false;
	this._completionDate = "";
	this._objectiveProgress = {};
	this._objectivesCompleted = {};
	this._stage = 1;
};
//-----------------------------------------------------------------------------
// Discover quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.discover = function(discovered) {
	this._isDiscovered = discovered;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Start quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.start = function(started, discovered) {
	this._isStarted = started;
	this._isDiscovered = discovered;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Complete quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.complete = function() {
	this._isCompleted = true;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	this._completionDate = $cgmzTemp.createDateText(day, month, year, CGMZ.QuestSystem.DateFormat, CGMZ.QuestSystem.DateDelimiter);
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Fail quest
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.fail = function() {
	this._isFailed = true;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Toggle whether the quest is pinned
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.togglePin = function() {
	this._isPinned = !this._isPinned;
};
//-----------------------------------------------------------------------------
// Is quest in progress (started but not completed/failed) ?
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isInProgress = function() {
	return (this._isStarted && !this._isCompleted && !this._isFailed);
};
//-----------------------------------------------------------------------------
// See the actual progress of an objective (may be undefined)
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.objectiveProgress = function(id) {
	return this._objectiveProgress[id];
};
//-----------------------------------------------------------------------------
// Get objective completed
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.isObjectiveComplete = function(id) {
	return this._objectivesCompleted[id];
};
//-----------------------------------------------------------------------------
// Get objective progress clamped by min/max progress
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.getObjectiveProgress = function(id, maxProgress) {
	if(this.isObjectiveComplete(id)) return maxProgress;
	if(!this._objectiveProgress.hasOwnProperty(id)) {
		this._objectiveProgress[id] = 0;
	}
	return this._objectiveProgress[id].clamp(0, maxProgress);
};
//-----------------------------------------------------------------------------
// Set the objective's progress
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.setObjectiveProgress = function(id, progress) {
	this._objectiveProgress[id] = progress;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Set the objective's completion status
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.setObjectiveComplete = function(id, complete) {
	this._objectivesCompleted[id] = complete;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Progress Stage
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.advanceStage = function() {
	this._stage++;
	this._isUpdated = true;
};
//-----------------------------------------------------------------------------
// Get current stage
//-----------------------------------------------------------------------------
CGMZ_Quest.prototype.currentStage = function() {
	return this._stage;
};
//=============================================================================
// CGMZ_QuestData
//-----------------------------------------------------------------------------
// Data class used to store temporary quest data (not saved)
//=============================================================================
function CGMZ_QuestData() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.initialize = function(quest) {
	this._name = quest.Name;
	this._difficulty = quest.Difficulty;
	this._location = quest.Location;
	this._length = quest.Length;
	this._category = quest.Category;
	this._questGiver = quest["Quest Giver"];
	this._recommendedLevel = Number(quest["Recommended Level"]);
	this._listImage = quest["List Image"];
	this._backgroundImage = quest["Background Image"];
	this._acceptSceneImage = quest["Accept Scene Image"];
	this._unstartedObjective = JSON.parse(quest["Unstarted Objective"]);
	this._unstartedDescription = JSON.parse(quest["Unstarted Description"]);
	this._boardDescription = JSON.parse(quest["Board Description"]);
	this._boardSwitch = Number(quest["Board Switch"]);
	this._startSwitch = Number(quest["Started Switch"]);
	this._descriptions = [];
	for(const json of JSON.parse(quest.Description)) {
		const description = JSON.parse(json);
		this._descriptions.push(description);
	}
	this._rewardExp = Number(quest["Reward Exp"]);
	this._rewardGold = Number(quest["Reward Gold"]);
	this._customRewards = JSON.parse(quest["Reward Custom"]);
	this._autoRewards = [];
	for(const json of JSON.parse(quest["Reward Armors"])) {
		const data = JSON.parse(json);
		const reward = {type: "armor", id: Number(data.Armor), amount: Number(data.Amount)}
		this._autoRewards.push(reward);
	}
	for(const json of JSON.parse(quest["Reward Weapons"])) {
		const data = JSON.parse(json);
		const reward = {type: "weapon", id: Number(data.Weapon), amount: Number(data.Amount)}
		this._autoRewards.push(reward);
	}
	for(const json of JSON.parse(quest["Reward Items"])) {
		const data = JSON.parse(json);
		const reward = {type: "item", id: Number(data.Item), amount: Number(data.Amount)}
		this._autoRewards.push(reward);
	}
	this.setupObjectives(JSON.parse(quest.Objectives));
};
//-----------------------------------------------------------------------------
// Setup Objectives
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.setupObjectives = function(objectives) {
	this._objectives = [];
	for(const jsonObj of objectives) {
		objective = JSON.parse(jsonObj);
		const obj = {};
		obj.stage = Number(objective.Stage);
		obj.id = objective.id;
		obj.description = JSON.parse(objective.Description);
		obj.maxProgress = Number(objective["Max Progress"]);
		obj.autoTrack = (objective["Use Automatic Tracking"] === 'true');
		obj.completeSwitch = Number(objective["Objective Switch"]);
		if(obj.autoTrack) {
			obj.goldTracking = Number(objective["Gold Tracking"]);
			obj.variableTracking = Number(objective["Variable Tracking"]);
			let data;
			if(objective["Item Tracking"]) {
				data = JSON.parse(objective["Item Tracking"])
				obj.otherTracking = {type: "item", id: Number(data.Item), amount: Number(data.Amount)}
			} else if(objective["Weapon Tracking"]) {
				data = JSON.parse(objective["Weapon Tracking"])
				obj.otherTracking = {type: "weapon", id: Number(data.Weapon), amount: Number(data.Amount)}
			} else if(objective["Armor Tracking"]) {
				data = JSON.parse(objective["Armor Tracking"])
				obj.otherTracking = {type: "armor", id: Number(data.Armor), amount: Number(data.Amount)}
			}
		}
		this._objectives.push(obj);
	}
};
//-----------------------------------------------------------------------------
// Get Objective Max Progress
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getMaxProgressForObjective = function(id) {
	const obj = this.getObjectiveById(id);
	if(obj.maxProgress > 0) return obj.maxProgress;
	if(obj.goldTracking > 0 ) return obj.goldTracking;
	if(obj.otherTracking) return obj.otherTracking.amount;
	return 0;
};
//-----------------------------------------------------------------------------
// Get Objective by id
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getObjectiveById = function(id) {
	return this._objectives.find(objective => objective.id === id);
};
//-----------------------------------------------------------------------------
// Get Objectives of Stage x
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.getObjectivesOfStage = function(stage) {
	const objectives = [];
	for(const objective of this._objectives) {
		if(objective.stage === stage) {
			objectives.push(objective);
		}
	}
	return objectives;
};
//-----------------------------------------------------------------------------
// Check if quest should display on board
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.canDisplayOnBoard = function() {
	return (this._boardSwitch) ? $gameSwitches.value(this._boardSwitch) : true;
};
//-----------------------------------------------------------------------------
// Check if quest has rewards
//-----------------------------------------------------------------------------
CGMZ_QuestData.prototype.hasRewards = function() {
	return (this._rewardExp || this._rewardGold || this._customRewards.length > 0 || this._autoRewards.length > 0)
};
//=============================================================================
// CGMZ_QuestCategory
//-----------------------------------------------------------------------------
// Data class for quest category data. Not saved
//=============================================================================
function CGMZ_QuestCategory() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_QuestCategory.prototype.initialize = function(questCategory) {
	this._color1 = questCategory.Color1;
	this._color2 = questCategory.Color2;
	this._textColor = Number(questCategory["Text Color"]);
	this._icon = Number(questCategory.Icon);
	this._name = questCategory.Name;
	this._displayName = questCategory["Display Name"];
	this._description = JSON.parse(questCategory.Description);
	this._type = questCategory.Type;
	this._expanded = (questCategory["Start Expanded"] === 'true');
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handle saved Quest data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize Quest Data
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_QuestSystem_CGMZ_Core_createPluginData.call(this);
	this.initializeQuestData(false);
};
//-----------------------------------------------------------------------------
// Initialize Quest Data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeQuestData = function(reinitialize) {
	if(!this._questData || reinitialize) {
		this._questData = {};
	}
	for(const questJSON of CGMZ.QuestSystem.Quests) {
		const quest = JSON.parse(questJSON);
		if(!this._questData.hasOwnProperty(quest.Name)) {
			this._questData[quest.Name] = new CGMZ_Quest();
		}
	}
};
//-----------------------------------------------------------------------------
// Check if new quests have been added after load
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Core_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_QuestSystem_CGMZ_Core_onAfterLoad.call(this);
	this.initializeQuestData(false);
	$cgmzTemp.populateQuestAutoTracking();
};
//-----------------------------------------------------------------------------
// Get specific quest 
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getQuest = function(name) {
	return this._questData[name];
};
//-----------------------------------------------------------------------------
// Get discovered quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isDiscovered);
};
//-----------------------------------------------------------------------------
// Get started quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getStartedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isStarted);
};
//-----------------------------------------------------------------------------
// Get completed quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getCompletedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isCompleted);
};
//-----------------------------------------------------------------------------
// Get failed quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFailedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isFailed);
};
//-----------------------------------------------------------------------------
// Get in progress quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getInProgressQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key].isInProgress());
};
//-----------------------------------------------------------------------------
// Get pinned quests
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getPinnedQuests = function() {
	return Object.keys(this._questData).filter(key => this._questData[key]._isPinned);
};
//-----------------------------------------------------------------------------
// Discover a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverQuest = function(questName, discover) {
	const quest = this.getQuest(questName);
	if(quest) {
		if(discover) $cgmzTemp.showQuestToast("discover", questName);
		quest.discover(discover);
	}
};
//-----------------------------------------------------------------------------
// Start a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.startQuest = function(questName, start, discover) {
	const quest = this.getQuest(questName);
	if(quest && quest._isStarted !== start) {
		const questTemp = $cgmzTemp.getQuest(questName);
		quest.start(start, discover);
		if(discover) $cgmzTemp.showQuestToast("discover", questName);
		if(start) {
			$cgmzTemp.showQuestToast("start", questName);
			$gameSwitches.setValue(questTemp._startSwitch, true);
		}
		$cgmzTemp.checkAutoTrackingForQuest(questName);
	}
};
//-----------------------------------------------------------------------------
// Complete a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.completeQuest = function(questName) {
	const quest = this.getQuest(questName);
	if(quest && !quest._isCompleted) {
		quest.complete();
		$cgmzTemp.showQuestToast("complete", questName);
		while($cgmzTemp.getQuest(questName).getObjectivesOfStage(quest.currentStage()).length > 0) {
			$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
			quest.advanceStage();
		}
		$cgmzTemp.removeQuestAutoTracking(questName);
		$cgmzTemp.giveQuestRewards(questName);
	}
};
//-----------------------------------------------------------------------------
// Fail a quest
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.failQuest = function(questName) {
	const quest = this.getQuest(questName);
	if(quest && !quest._isFailed) {
		quest.fail();
		$cgmzTemp.showQuestToast("fail", questName);
		$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
		$cgmzTemp.removeQuestAutoTracking(questName);
	}
};
//-----------------------------------------------------------------------------
// Advance a quest's stage. If stage has no objectives, assume completed
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.advanceQuestStage = function(questName) {
	const quest = this.getQuest(questName);
	if(quest) {
		$cgmzTemp.saveQuestObjectiveProgress(questName, quest);
		quest.advanceStage();
		$cgmzTemp.checkAutoTrackingForQuest(questName);
		const objectives = $cgmzTemp.getQuest(questName).getObjectivesOfStage(quest.currentStage());
		if(objectives.length === 0) {
			this.completeQuest(questName, true);
		}
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add temp quest data and handle plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize quest data
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_QuestSystem_CGMZ_Temp_createPluginData.call(this);
	this.initializeQuestData();
};
//-----------------------------------------------------------------------------
// Initialize Quest Temp Data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeQuestData = function() {
	this._currentQuestCategorySortType = "Category";
	this._questData = {};
	this._questBoardSettings = {questList: [], img: "", name: "", categoryIcons: "", legend: false};
	this.initializeQuestToasts();
	this.initializeQuestAutoTracking();
	for(const questJSON of CGMZ.QuestSystem.Quests) {
		const quest = JSON.parse(questJSON);
		this._questData[quest.Name] = new CGMZ_QuestData(quest);
	}
	this._questCategoryData = {};
	this._questCategoryData[CGMZ.QuestSystem.PinnedCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.PinnedCategory);
	this._questCategoryData[CGMZ.QuestSystem.PinnedCategory.Name]._type = "CGMZ_Internal_Category";
	for(const categoryJSON of CGMZ.QuestSystem.QuestCategories) {
		const category = JSON.parse(categoryJSON);
		this._questCategoryData[category.Name] = new CGMZ_QuestCategory(category);
	}
	this._questCategoryData[CGMZ.QuestSystem.CompleteCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.CompleteCategory);
	this._questCategoryData[CGMZ.QuestSystem.CompleteCategory.Name]._type = "CGMZ_Internal_Category";
	this._questCategoryData[CGMZ.QuestSystem.FailedCategory.Name] = new CGMZ_QuestCategory(CGMZ.QuestSystem.FailedCategory);
	this._questCategoryData[CGMZ.QuestSystem.FailedCategory.Name]._type = "CGMZ_Internal_Category";
};
//-----------------------------------------------------------------------------
// Initialize quest generic toasts
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeQuestToasts = function() {
	this._questToasts = {discover: null, start: null, objectiveComplete: null, complete: null, fail: null};
	this._questToasts.discover = this.setupQuestToast(CGMZ.QuestSystem.QuestDiscoverToastParsed);
	this._questToasts.start = this.setupQuestToast(CGMZ.QuestSystem.QuestStartedToastParsed);
	this._questToasts.complete = this.setupQuestToast(CGMZ.QuestSystem.QuestCompletedToastParsed);
	this._questToasts.fail = this.setupQuestToast(CGMZ.QuestSystem.QuestFailedToastParsed);
	this._questToasts.objectiveComplete = this.setupQuestToast(CGMZ.QuestSystem.QuestObjectiveCompleteToastParsed);
};
//-----------------------------------------------------------------------------
// Set up a parsed quest toast
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.setupQuestToast = function(parsedToast) {
	const toast = CGMZ_Utils.setupToast(parsedToast, "CGMZ Quest System");
	if(toast) {
		toast.isQuestToast = true;
		toast.line1 = parsedToast["Text Line 1"];
		toast.line2 = parsedToast["Text Line 2"];
	}
	return toast;
};
//-----------------------------------------------------------------------------
// Initialize auto tracking object
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeQuestAutoTracking = function() {
	this._autoTrackQuests = {"gold": [], "variable": [], "item": []}
};
//-----------------------------------------------------------------------------
// Populate auto tracking object (for use after saved game is loaded)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.populateQuestAutoTracking = function() {
	this.initializeQuestAutoTracking();
	for(const quest of $cgmz.getInProgressQuests()) {
		this.checkAutoTrackingForQuest(quest);
	}
};
//-----------------------------------------------------------------------------
// Check for a quest to be auto tracked after removing existing auto track entries
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutoTrackingForQuest = function(questName) {
	const questState = $cgmz.getQuest(questName);
	const questTemp = this.getQuest(questName);
	const stage = questState.currentStage();
	this.removeQuestAutoTracking(questName);
	for(const objective of questTemp.getObjectivesOfStage(stage)) {
		this.checkQuestObjectiveForAutoTrack(objective, questName);
	}
};
//-----------------------------------------------------------------------------
// Check an individual objective for auto track properties
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkQuestObjectiveForAutoTrack = function(objective, questName) {
	if(objective.autoTrack) {
		if(objective.goldTracking > 0 && !this._autoTrackQuests.gold.includes(questName)) {
			this._autoTrackQuests.gold.push(questName);
		} else if(objective.variableTracking > 0 && !this._autoTrackQuests.variable.includes(questName)) {
			this._autoTrackQuests.variable.push(questName);
		} else if(objective.hasOwnProperty('otherTracking') && !this._autoTrackQuests.item.includes(questName)) {
			this._autoTrackQuests.item.push(questName);
		}
	}
};
//-----------------------------------------------------------------------------
// Remove a quest from auto tracking
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.removeQuestAutoTracking = function(questName) {
	const goldIndex = this._autoTrackQuests.gold.indexOf(questName);
	if(goldIndex >= 0) this._autoTrackQuests.gold.splice(goldIndex, 1);
	const varIndex = this._autoTrackQuests.variable.indexOf(questName);
	if(varIndex >= 0) this._autoTrackQuests.variable.splice(varIndex, 1);
	const itemIndex = this._autoTrackQuests.item.indexOf(questName);
	if(itemIndex >= 0) this._autoTrackQuests.item.splice(itemIndex, 1);
};
//-----------------------------------------------------------------------------
// Check if automatic tracking gold quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticGoldQuests = function() {
	for(let i = this._autoTrackQuests.gold.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.gold[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const gold = $gameParty.gold();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			if(objective.goldTracking > 0) {
				if(gold >= objective.goldTracking) {
					questState.setObjectiveComplete(objective.id, true);
					this.showQuestToast("objectiveComplete", quest);
					if(objective.completeSwitch) $gameSwitches.setValue(questObjective.completeSwitch, true);
					const questStage = questState.currentStage();
					this.checkForQuestStageAdvance(quest, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, gold);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking variable quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticVariableQuests = function() {
	for(let i = this._autoTrackQuests.variable.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.variable[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			const value = $gameVariables.value(objective.variableTracking);
			if(objective.variableTracking > 0) {
				if(value >= objective.maxProgress) {
					questState.setObjectiveComplete(objective.id, true);
					this.showQuestToast("objectiveComplete", quest);
					if(objective.completeSwitch) $gameSwitches.setValue(questObjective.completeSwitch, true);
					const questStage = questState.currentStage();
					this.checkForQuestStageAdvance(quest, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, value);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking item quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAutomaticItemQuests = function() {
	for(let i = this._autoTrackQuests.item.length - 1; i >= 0; i--) {
		const quest = this._autoTrackQuests.item[i];
		const questState = $cgmz.getQuest(quest);
		const questTemp = this.getQuest(quest);
		const stage = questState.currentStage();
		const objectives = questTemp.getObjectivesOfStage(stage);
		for(const objective of objectives) {
			if(questState.isObjectiveComplete(objective.id)) continue;
			if(objective.hasOwnProperty('otherTracking')) {
				const item = this.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
				const amountOwned = $gameParty.numItems(item);
				if(amountOwned >= objective.otherTracking.amount) {
					questState.setObjectiveComplete(objective.id, true);
					this.showQuestToast("objectiveComplete", quest);
					if(objective.completeSwitch) $gameSwitches.setValue(questObjective.completeSwitch, true);
					const questStage = questState.currentStage();
					this.checkForQuestStageAdvance(quest, objectives);
					const newQuestStage = questState.currentStage();
					if(questStage !== newQuestStage) break;
				} else {
					questState.setObjectiveProgress(objective.id, amountOwned);
				}
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check if automatic tracking item quest objective is satisfied, if so
// check the other objectives for that quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkForQuestStageAdvance = function(quest, objectives) {
	const questState = $cgmz.getQuest(quest);
	if(objectives.every(objective => questState.isObjectiveComplete(objective.id))) {
		$cgmz.advanceQuestStage(quest);
	}
};
//-----------------------------------------------------------------------------
// Save the progress made on automatic objectives
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.saveQuestObjectiveProgress = function(questName, questState) {
	const objectives = this.getQuest(questName).getObjectivesOfStage(questState.currentStage());
	for(const objective of objectives) {
		if(objective.autoTrack) {
			if(objective.goldTracking > 0) {
				questState.setObjectiveProgress(objective.id, $gameParty.gold());
			} else if(objective.variableTracking > 0) {
				questState.setObjectiveProgress(objective.id, $gameVariables.value(objective.variableTracking));
			} else if(objective.hasOwnProperty('otherTracking')) {
				const item = $cgmzTemp.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
				questState.setObjectiveProgress(objective.id, $gameParty.numItems(item));
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Show a quest toast
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.showQuestToast = function(type, questName) {
	if(!Imported.CGMZ_ToastManager) return;
	const toast = this._questToasts[type];
	if(!toast) return;
	const toastObject = JSON.parse(JSON.stringify(toast)); // make deep copy of toast object so it can be manipulated
	toastObject.questName = questName;
	this.createNewToast(toastObject);
};
//-----------------------------------------------------------------------------
// Award the rewards from completing a quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.giveQuestRewards = function(questName) {
	const quest = this.getQuest(questName);
	$gameParty.gainGold(quest._rewardGold);
	for(const actor of $gameParty.allMembers()) {
		actor.gainExp(quest._rewardExp);
	}
	for(const itemObj of quest._autoRewards) {
		const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id);
		$gameParty.gainItem(item, itemObj.amount, false);
	}
};
//-----------------------------------------------------------------------------
// Register Quest Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_QuestSystem_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Scene", this.pluginCommandQuestSystemCallScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Accept Scene", this.pluginCommandQuestSystemCallAcceptScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Call Quest Board Scene", this.pluginCommandQuestSystemCallQuestBoardScene);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Set Objective Progress", this.pluginCommandQuestSystemSetObjectiveProgress);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Advance Quest Stage", this.pluginCommandQuestSystemAdvanceQuestStage);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Stage", this.pluginCommandQuestSystemGetQuestStage);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Objective", this.pluginCommandQuestSystemGetQuestObjective);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Get Quest Status", this.pluginCommandQuestSystemGetQuestStatus);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Discover Quest", this.pluginCommandQuestSystemDiscoverQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Start Quest", this.pluginCommandQuestSystemStartQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Complete Quest", this.pluginCommandQuestSystemCompleteQuest);
	PluginManager.registerCommand("CGMZ_QuestSystem", "Fail Quest", this.pluginCommandQuestSystemFailQuest);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallScene = function() {
	SceneManager.push(CGMZ_Scene_QuestSystem);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest accept scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallAcceptScene = function(args) {
	const questName = args["Quest Name"];
	const decisionSwitch = Number(args["Decision Switch"]);
	const quest = $cgmz.getQuest(questName);
	if(quest && !quest._isStarted) {
		const argObj = {quest: questName, gameSwitch: decisionSwitch};
		SceneManager.push(CGMZ_Scene_QuestSystemAcceptQuest);
		SceneManager.prepareNextScene(argObj);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Call quest board scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCallQuestBoardScene = function(args) {
	const questBoardObject = {
		questList: JSON.parse(args["Quest Names"]),
		img: args["Scene Image"],
		name: args["Window Name"],
		categoryIcons: args["Category Icon Type"],
		legend: (args["Show Legend"] === 'true')
	};
	$cgmzTemp._questBoardSettings = questBoardObject;
	SceneManager.push(CGMZ_Scene_QuestSystemQuestBoard);
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemDiscoverQuest = function(args) {
	$cgmz.discoverQuest(args["Quest Name"], args.Discover === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Start quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemStartQuest= function(args) {
	$cgmz.startQuest(args["Quest Name"], args.Start === 'true', args.Discover === 'true');
};
//-----------------------------------------------------------------------------
// Plugin Command - Complete quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemCompleteQuest = function(args) {
	$cgmz.completeQuest(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Fail quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemFailQuest = function(args) {
	$cgmz.failQuest(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set objective progress
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemSetObjectiveProgress = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const questTemp = $cgmzTemp.getQuest(args["Quest Name"]);
	const questObjective = questTemp.getObjectiveById(args.id);
	if(quest && questObjective) {
		const maxProgress = questTemp.getMaxProgressForObjective(args.id);
		let objectiveProgress = quest.getObjectiveProgress(args.id, maxProgress);
		switch(args.mode) {
			case "+": objectiveProgress += Number(args.amount) + $gameVariables.value(Number(args.variable)); break
			case "-": objectiveProgress -= Number(args.amount) + $gameVariables.value(Number(args.variable)); break
			case "=": objectiveProgress = Number(args.amount) + $gameVariables.value(Number(args.variable));
		}
		quest.setObjectiveProgress(args.id, objectiveProgress);
		if(objectiveProgress >= questObjective.maxProgress) {
			if(!quest.isObjectiveComplete(args.id)) $cgmzTemp.showQuestToast("objectiveComplete", args["Quest Name"]);
			quest.setObjectiveComplete(args.id, true);
			if(questObjective.completeSwitch) $gameSwitches.setValue(questObjective.completeSwitch, true);
			const objectives = $cgmzTemp.getQuest(args["Quest Name"]).getObjectivesOfStage(quest.currentStage());
			$cgmzTemp.checkForQuestStageAdvance(args["Quest Name"], objectives);
		}
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Advance a quest's stage by one
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemAdvanceQuestStage = function(args) {
	$cgmz.advanceQuestStage(args["Quest Name"]);
};
//-----------------------------------------------------------------------------
// Plugin Command - Get quest stage
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestStage = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const variableId = Number(args["Variable ID"]);
	if(quest && variableId) {
		$gameVariables.setValue(variableId, quest.currentStage());
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get objective progress
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestObjective = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const questTemp = $cgmzTemp.getQuest(args["Quest Name"]);
	const questObjective = questTemp.getObjectiveById(args.Objective);
	const variableId = Number(args["Variable ID"]);
	if(quest && questObjective) {
		const maxProgress = questTemp.getMaxProgressForObjective(args.Objective);
		const objectiveProgress = quest.getObjectiveProgress(args.Objective, maxProgress);
		$gameVariables.setValue(variableId, objectiveProgress);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get quest status into variable
// 0 = undiscovered
// 1 = discovered
// 2 = started
// 3 = failed
// 4 = completed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandQuestSystemGetQuestStatus = function(args) {
	const quest = $cgmz.getQuest(args["Quest Name"]);
	const variableId = Number(args["Variable ID"]);
	if(quest && variableId) {
		if(quest._isCompleted) {
			$gameVariables.setValue(variableId, 4);
		} else if(quest._isFailed) {
			$gameVariables.setValue(variableId, 3);
		} else if(quest._isStarted) {
			$gameVariables.setValue(variableId, 2);
		} else if(quest._isDiscovered) {
			$gameVariables.setValue(variableId, 1);
		} else {
			$gameVariables.setValue(variableId, 0);
		}
	}
};
//-----------------------------------------------------------------------------
// Get quest board settings
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestBoardSettings = function() {
	return this._questBoardSettings;
};
//-----------------------------------------------------------------------------
// Get specific quest
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuest = function(name) {
	return this._questData[name];
};
//-----------------------------------------------------------------------------
// Get specific quest category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestCategory = function(name) {
	return this._questCategoryData[name];
};
//-----------------------------------------------------------------------------
// Get specific type of quest category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestCategoriesByType = function(type) {
	return Object.keys(this._questCategoryData).filter(key => this._questCategoryData[key]._type === type);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific category
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByCategory = function(category) {
	return Object.keys(this._questData).filter(key => this._questData[key]._category === category);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific difficulty
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByDifficulty = function(difficulty) {
	return Object.keys(this._questData).filter(key => this._questData[key]._difficulty === difficulty);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific length
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByLength = function(length) {
	return Object.keys(this._questData).filter(key => this._questData[key]._length === length);
};
//-----------------------------------------------------------------------------
// Get all quests of a specific location
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getQuestsByLocation = function(location) {
	return Object.keys(this._questData).filter(key => this._questData[key]._location === location);
};
//=============================================================================
// CGMZ_Scene_QuestSystem
//-----------------------------------------------------------------------------
// Handle the quest scene
//=============================================================================
function CGMZ_Scene_QuestSystem() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystem.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystem.prototype.constructor = CGMZ_Scene_QuestSystem;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create reputation windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createListWindow();
	this.createDisplayWindow();
	this.createPinConfirmWindow();
	if(CGMZ.QuestSystem.AllowSorting) {
		this.createSortInfoWindow();
		this.createSortWindow();
	}
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_QuestList(rect);
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('cgmzSort', this.startSort.bind(this));
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.listWindowRect = function() {
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const width = Graphics.boxWidth * (CGMZ.QuestSystem.ListWindowWidth / 100.0);
	const height = Graphics.boxHeight - y - (this.calcWindowHeight(1, false) * CGMZ.QuestSystem.AllowSorting);
	const x = (CGMZ.QuestSystem.ListWindowRight) ? Graphics.boxWidth - width : 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
    this._displayWindow = new CGMZ_Window_QuestDisplay(rect);
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	if(CGMZ.QuestSystem.AllowPinnedQuests) {
		this._displayWindow.setHandler('ok', this.onDisplayOk.bind(this));
	}
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._listWindow.select(0);
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.displayWindowRect = function() {
	const x = (CGMZ.QuestSystem.ListWindowRight) ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create sort info window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortInfoWindow = function() {
	const rect = this.sortInfoWindowRect();
    this._sortInfoWindow = new CGMZ_Window_QuestSortInfo(rect);
    this.addWindow(this._sortInfoWindow);
};
//-----------------------------------------------------------------------------
// Get sort info window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.sortInfoWindowRect = function() {
	const x = this._listWindow.x;
	const y = this._listWindow.y + this._listWindow.height;
	const width = this._listWindow.width;
	const height = this.calcWindowHeight(1, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create sort window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortWindow = function() {
	const rect = this.sortWindowRect();
    this._sortWindow = new CGMZ_Window_QuestSort(rect);
	this._sortWindow.setHandler('ok', this.onSortOk.bind(this));
	this._sortWindow.setHandler('cancel', this.onSortCancel.bind(this));
    this.addWindow(this._sortWindow);
};
//-----------------------------------------------------------------------------
// Get sort window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.sortWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(CGMZ.QuestSystem.SortOptions.length, true);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create pin confirmation window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createPinConfirmWindow = function() {
	const rect = this.pinWindowRect();
    this._pinWindow = new CGMZ_Window_QuestPinConfirm(rect);
	this._pinWindow.setHandler('ok', this.onPinOk.bind(this));
	this._pinWindow.setHandler('cancel', this.onPinCancel.bind(this));
	this._listWindow.setPinWindow(this._pinWindow);
    this.addWindow(this._pinWindow);
};
//-----------------------------------------------------------------------------
// Get pin confirmation window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.pinWindowRect = function() {
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(2, true);
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.hasTouchUI = function() {
	return !CGMZ.QuestSystem.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Start the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.startSort = function() {
	this._listWindow.deactivate();
	this._sortWindow.show();
	this._sortWindow.activate();
	if(this._sortButton) {
		this._sortButton.hide();
	}
};
//-----------------------------------------------------------------------------
// End the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onSortOk = function() {
	$cgmzTemp._currentQuestCategorySortType = this._sortWindow.item();
	this._sortWindow.deactivate();
	this._sortWindow.hide();
	this._listWindow.refresh();
	this._listWindow.select(0);
	this._listWindow.activate();
	if(this._sortButton) {
		this._sortButton.show();
	}
};
//-----------------------------------------------------------------------------
// Cancel the sort process
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onSortCancel = function() {
	this._sortWindow.deactivate();
	this._sortWindow.hide();
	this._listWindow.activate();
	if(this._sortButton) {
		this._sortButton.show();
	}
};
//-----------------------------------------------------------------------------
// On list window OK
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onListOk = function() {
	this._listWindow.deactivate();
	this._displayWindow.activate();
	if(this._sortButton) {
		this._sortButton.hide();
	}
};
//-----------------------------------------------------------------------------
// On display window cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onDisplayCancel = function() {
	this._displayWindow.deactivate();
	this._listWindow.activate();
	if(this._sortButton) {
		this._sortButton.show();
	}
};
//-----------------------------------------------------------------------------
// On display window ok
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onDisplayOk = function() {
	SoundManager.playOk();
	this._displayWindow.deactivate();
	this._pinWindow.activate();
	this._pinWindow.show();
	this._pinWindow.select(0);
};
//-----------------------------------------------------------------------------
// On pin window cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onPinCancel = function() {
	this._pinWindow.deactivate();
	this._pinWindow.hide();
	this._displayWindow.activate();
};
//-----------------------------------------------------------------------------
// On pin window ok
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.onPinOk = function() {
	this._pinWindow.deactivate();
	this._pinWindow.hide();
	const quest = $cgmz.getQuest(this._pinWindow._quest.questName);
	quest.togglePin();
	this._listWindow.refresh();
	this._listWindow.select(0);
	this._listWindow.activate();
	if(this._sortButton) {
		this._sortButton.show();
	}
};
//-----------------------------------------------------------------------------
// Create sort button if needed
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createButtons = function() {
	Scene_MenuBase.prototype.createButtons.call(this);
    if(ConfigManager.touchUI && CGMZ.QuestSystem.ShowSortButton) {
		this.createSortButton();
    }
};
//-----------------------------------------------------------------------------
// Create Sort Button
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystem.prototype.createSortButton = function() {
    this._sortButton = new Sprite_Button("cgmzSort");
    this._sortButton.x = Graphics.boxWidth - this._sortButton.width - 4 - this._cancelButton.width - 4;
    this._sortButton.y = this.buttonY();
	this._sortButton.setClickHandler(this.startSort.bind(this));
    this.addWindow(this._sortButton);
};
//=============================================================================
// CGMZ_Window_QuestSortInfo
//-----------------------------------------------------------------------------
// Window that displays controls for sorting
//=============================================================================
function CGMZ_Window_QuestSortInfo(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestSortInfo.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestSortInfo.prototype.constructor = CGMZ_Window_QuestSortInfo;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSortInfo.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSortInfo.prototype.loadWindowskin = function() {
	if(CGMZ.QuestSystem.SortInfoWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.QuestSystem.SortInfoWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_Base.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSortInfo.prototype.refresh = function() {
    this.drawText(CGMZ.QuestSystem.SortInfoText, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestSort
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestSort(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestSort.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestSort.prototype.constructor = CGMZ_Window_QuestSort;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.initialize = function(rect) {
    CGMZ_Window_Selectable.prototype.initialize.call(this, rect);
	this.select(0);
	this.refresh();
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.loadWindowskin = function() {
	if(CGMZ.QuestSystem.SortWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.QuestSystem.SortWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_Selectable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.maxItems = function() {
    return CGMZ.QuestSystem.SortOptions.length;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.refresh = function() {
    this.makeItemList();
    CGMZ_Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.makeItemList = function() {
	this._data = CGMZ.QuestSystem.SortOptions;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestSort.prototype.drawItem = function(index) {
    const item = CGMZ.QuestSystem.SortOptionsText[index];
    const rect = this.itemRectWithPadding(index);
	this.drawText(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestPinConfirm
//-----------------------------------------------------------------------------
// Selectable window for choosing to pin or unpin a quest
//=============================================================================
function CGMZ_Window_QuestPinConfirm(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPinConfirm.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestPinConfirm.prototype.constructor = CGMZ_Window_QuestPinConfirm;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.initialize = function(rect) {
    CGMZ_Window_Selectable.prototype.initialize.call(this, rect);
	this._quest = null;
	this.deactivate();
	this.hide();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.loadWindowskin = function() {
	if(CGMZ.QuestSystem.PinConfirmWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.QuestSystem.PinConfirmWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_Selectable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Get current selected item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.setItem = function(quest) {
    if(this._quest === quest) return;
	this._quest = quest;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.processOk = function() {
    if (this.index() === 0) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        SoundManager.playCancel();
		this.callCancelHandler();
    }
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.maxItems = function() {
    return (!this._quest || this._quest.isCategory) ? 0 : 2;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.refresh = function() {
    this.makeItemList();
    CGMZ_Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.makeItemList = function() {
	if(!this._quest || this._quest.isCategory) return [];
	this._data = [];
	const quest = $cgmz.getQuest(this._quest.questName);
	(quest._isPinned) ? this._data.push(CGMZ.QuestSystem.UnpinText) : this._data.push(CGMZ.QuestSystem.PinText);
	this._data.push(CGMZ.QuestSystem.CancelText);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPinConfirm.prototype.drawItem = function(index) {
	const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.drawText(item, rect.x, rect.y, rect.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestList
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestList.prototype = Object.create(CGMZ_Window_Selectable.prototype);
CGMZ_Window_QuestList.prototype.constructor = CGMZ_Window_QuestList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.initialize = function(rect) {
    CGMZ_Window_Selectable.prototype.initialize.call(this, rect);
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.loadWindowskin = function() {
	if(CGMZ.QuestSystem.ListWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.QuestSystem.ListWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		CGMZ_Window_Selectable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.update = function() {
	CGMZ_Window_Selectable.prototype.update.call(this);
	if(this.active && $cgmzTemp.isKeyPressed(CGMZ.QuestSystem.SortKey)) {
		this.callHandler('cgmzSort');
	}
};
//-----------------------------------------------------------------------------
// Select - also update updated flag
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
	this.setUpdatedFlag(index);
};
//-----------------------------------------------------------------------------
// Select - also update updated flag
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setUpdatedFlag = function(index) {
    const item = this.item(index);
	if(item && !item.isCategory) {
		const quest = $cgmz.getQuest(item.questName);
		if(quest && quest._isUpdated) {
			quest._isUpdated = false;
			this.redrawItem(index);
		}
	}
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Set new category. Used by individual instances to set category.
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setNewCategory = function(item) {
	this._category = $cgmzTemp.getQuestCategory(item.name);
};
//-----------------------------------------------------------------------------
// Handling for when category is selected and OK press occurs
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.handleCategorySelection = function(item) {
    const category = $cgmzTemp.getQuestCategory(item.name);
	category._expanded = !category._expanded;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.refresh = function() {
    this.makeItemList();
    CGMZ_Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Get included categories
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.getIncludedCategories = function() {
	const categories = [];
	const categoriesByType = $cgmzTemp.getQuestCategoriesByType($cgmzTemp._currentQuestCategorySortType);
	for(const category of CGMZ.QuestSystem.CategorySortOrder) {
		if(categoriesByType.includes(category)) {
			categories.push(category);
		}
	}
    return categories;
};
//-----------------------------------------------------------------------------
// Get included quests
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.getIncludedQuests = function(name) {
	switch($cgmzTemp._currentQuestCategorySortType) {
		case "Category": return $cgmzTemp.getQuestsByCategory(name);
		case "Difficulty": return $cgmzTemp.getQuestsByDifficulty(name);
		case "Length": return $cgmzTemp.getQuestsByLength(name);
		case "Location": return $cgmzTemp.getQuestsByLocation(name);
	}
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.makeItemList = function() {
	this._data = [];
	const discoveredQuests = $cgmz.getDiscoveredQuests();
	const pinnedQuests = $cgmz.getPinnedQuests();
	this.addPinnedCategory(pinnedQuests);
	for(const categoryName of this.getIncludedCategories()) {
		const category = $cgmzTemp.getQuestCategory(categoryName);
		if(!category) {
			const script = "CGMZ_QuestSystem";
			const error = "Could not find Category [" + categoryName + "]";
			const suggestion = "Check that category exists in Categories parameter";
			$cgmzTemp.reportError(error, script, suggestion);
			continue;
		}
		let categoryQuests = this.getIncludedQuests(category._name);
		categoryQuests = categoryQuests.filter(questName => discoveredQuests.includes(questName) && !pinnedQuests.includes(questName));
		if(CGMZ.QuestSystem.SeparateCompleteQuests) {
			const completedQuests = $cgmz.getCompletedQuests();
			categoryQuests = categoryQuests.filter(questName => !completedQuests.includes(questName));
		}
		if(CGMZ.QuestSystem.SeparateFailedQuests) {
			const failedQuests = $cgmz.getFailedQuests();
			categoryQuests = categoryQuests.filter(questName => !failedQuests.includes(questName));
		}
		if(categoryQuests.length > 0) {
			const categoryObj = {level: 0, isCategory: true, name: category._name, amount: categoryQuests.length};
			this._data.push(categoryObj);
		}
		if(category._expanded) {
			for(const quest of categoryQuests) {
				const questObj = {level: 1, isCategory: false, heightMultiplier: 2, questName: quest};
				this._data.push(questObj);
			}
		}
	}
	if(CGMZ.QuestSystem.SeparateCompleteQuests) {
		this.addCompletedCategory(pinnedQuests);
	}
	if(CGMZ.QuestSystem.SeparateFailedQuests) {
		this.addFailedCategory(pinnedQuests);
	}
};
//-----------------------------------------------------------------------------
// Add the pinned category at top
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.addPinnedCategory = function(pinnedQuests) {
	if(pinnedQuests.length > 0 || CGMZ.QuestSystem.AlwaysShowPinnedCategory) {
		const category = $cgmzTemp.getQuestCategory(CGMZ.QuestSystem.PinnedCategory.Name);
		const categoryObj = {level: 0, isCategory: true, name: category._name, amount: pinnedQuests.length};
		this._data.push(categoryObj);
		if(category._expanded) {
			for(const quest of pinnedQuests) {
				const questObj = {level: 1, isCategory: false, heightMultiplier: 2, questName: quest};
				this._data.push(questObj);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Add the completed category at bottom
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.addCompletedCategory = function(pinnedQuests) {
	const completedQuests = $cgmz.getCompletedQuests().filter(quest => !pinnedQuests.includes(quest));
	if(completedQuests.length > 0 || CGMZ.QuestSystem.AlwaysShowCompleteCategory) {
		const category = $cgmzTemp.getQuestCategory(CGMZ.QuestSystem.CompleteCategory.Name);
		const categoryObj = {level: 0, isCategory: true, name: category._name, amount: completedQuests.length};
		this._data.push(categoryObj);
		if(category._expanded) {
			for(const quest of completedQuests) {
				const questObj = {level: 1, isCategory: false, heightMultiplier: 2, questName: quest};
				this._data.push(questObj);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Add the failed category at bottom
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.addFailedCategory = function(pinnedQuests) {
	const failedQuests = $cgmz.getFailedQuests().filter(quest => !pinnedQuests.includes(quest));
	if(failedQuests.length > 0 || CGMZ.QuestSystem.AlwaysShowFailedCategory) {
		const category = $cgmzTemp.getQuestCategory(CGMZ.QuestSystem.FailedCategory.Name);
		const categoryObj = {level: 0, isCategory: true, name: category._name, amount: failedQuests.length};
		this._data.push(categoryObj);
		if(category._expanded) {
			for(const quest of failedQuests) {
				const questObj = {level: 1, isCategory: false, heightMultiplier: 2, questName: quest};
				this._data.push(questObj);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.resetFontSettings();
	if(item.isCategory) {
		const icon = (CGMZ.QuestSystem.DrawIconInList && this._category._icon) ? '\\i[' + this._category._icon + ']' : "";
		const prefix = (this._category._expanded) ? "- " : "+ ";
		const string = '\\c[' + this._category._textColor + ']' + prefix + icon + this._category._displayName + " (" + item.amount + ")" + '\\c[0]';
		this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, 'left');
	} else {
		const quest = $cgmzTemp.getQuest(item.questName);
		const isUpdated = $cgmz.getQuest(item.questName)._isUpdated;
		let xOffset = 0;
		if(quest._listImage) {
			const imageData = $cgmzTemp.getImageData(quest._listImage);
			const bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
			bitmap.addLoadListener(this.bltBitmap.bind(this, bitmap, rect, isUpdated));
			xOffset += 76;
		} else if(isUpdated) {
			this.changeTextColor(ColorManager.textColor(CGMZ.QuestSystem.UpdatedTextColor));
			this.drawText(CGMZ.QuestSystem.UpdatedText, rect.x, rect.y, rect.width, 'left');
			this.changeTextColor(ColorManager.normalColor());
		}
		this.changeTextColorForRecLevel(quest._recommendedLevel);
		this.drawText(quest._recommendedLevel, rect.x + xOffset, rect.y + this.lineHeight() / 2, rect.width, 'left');
		this.changeTextColor(ColorManager.normalColor());
		xOffset += this.textWidth(quest._recommendedLevel) + 4;
		this.contents.fontSize -= 4;
		this.drawText(item.questName, rect.x + xOffset, rect.y, rect.width - xOffset, 'left');
		this.drawText(quest._location, rect.x + xOffset, rect.y + this.lineHeight(), rect.width - xOffset, 'left');
		const lineRect = this.itemRect(index);
		this.contentsBack.fillRect(lineRect.x - 8, lineRect.y, 4, lineRect.height + this.rowSpacing(), this._category._color1, true);
	}
};
//-----------------------------------------------------------------------------
// Draw list image
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.bltBitmap = function(bitmap, rect, isUpdated) {
	this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y + 2);
	if(isUpdated) {
		this.changeTextColor(ColorManager.textColor(CGMZ.QuestSystem.UpdatedTextColor));
		this.drawText(CGMZ.QuestSystem.UpdatedText, rect.x, rect.y, rect.width, 'left');
		this.changeTextColor(ColorManager.normalColor());
	}
};
//-----------------------------------------------------------------------------
// Set text color for recommended level
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.changeTextColorForRecLevel = function(recLevel) {
	const avgLevel = CGMZ_Utils.calcAvgPartyLevel();
	let levelDif = Math.abs(avgLevel - recLevel);
	if(avgLevel === recLevel) {
		this.changeTextColor(CGMZ.QuestSystem.RecLvlEqualColor);
	} else if(avgLevel > recLevel) {
		if(levelDif >= CGMZ.QuestSystem.RecLvlNegativeColors.length) levelDif = CGMZ.QuestSystem.RecLvlNegativeColors.length;
		this.changeTextColor(CGMZ.QuestSystem.RecLvlNegativeColors[levelDif - 1]);
	} else {
		if(levelDif >= CGMZ.QuestSystem.RecLvlPositiveColors.length) levelDif = CGMZ.QuestSystem.RecLvlPositiveColors.length;
		this.changeTextColor(CGMZ.QuestSystem.RecLvlPositiveColors[levelDif - 1]);
	}
};
//-----------------------------------------------------------------------------
// Set Display Window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setDisplayWindow = function(displayWindow) {
	this._displayWindow = displayWindow;
};
//-----------------------------------------------------------------------------
// Set Pin Window
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.setPinWindow = function(pinWindow) {
	this._pinWindow = pinWindow;
};
//-----------------------------------------------------------------------------
// Update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_QuestList.prototype.callUpdateHelp = function() {
	if(this.active && this._displayWindow) this._displayWindow.setItem(this.item());
	if(this.active && this._pinWindow) this._pinWindow.setItem(this.item());
};
//=============================================================================
// CGMZ_Window_QuestDisplay
//-----------------------------------------------------------------------------
// Window displaying quest information
//=============================================================================
function CGMZ_Window_QuestDisplay() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_QuestDisplay.prototype.constructor = CGMZ_Window_QuestDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 15; // maximum of 15 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.QuestSystem.ScrollWait, CGMZ.QuestSystem.ScrollSpeed, CGMZ.QuestSystem.AutoScroll, CGMZ.QuestSystem.ScrollDeceleration);
	this._quest = "";
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
	this._backgroundImage = new Sprite();
	this._backgroundImage.hide();
	this._textBoxBackground = new Sprite(new Bitmap(this.contents.width, this.contents.height));
	this._textBoxBackground.bitmap.paintOpacity = CGMZ.QuestSystem.FadeSpriteOpacity;
	this._textBoxBackground.hide();
	this._textSprite = new Sprite(new Bitmap(this.contents.width, this.lineHeight()));
	this._textSprite.bitmap.fontFace = $gameSystem.mainFontFace();
	this._textSprite.bitmap.fontSize = $gameSystem.mainFontSize();
	this._textSprite.bitmap.fontBold = true;
	this._textSprite.hide();
	this.addInnerChild(this._backgroundImage);
	this.addInnerChild(this._textBoxBackground);
	this.addInnerChild(this._textSprite);
	this.deactivate();
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.loadWindowskin = function() {
	if(CGMZ.QuestSystem.DisplayWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.QuestSystem.DisplayWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		CGMZ_Window_Scrollable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.processHandling = function() {
	CGMZ_Window_Scrollable.prototype.processHandling.call(this);
    if (this.isActive()) {
        if (this.isOkEnabled() && (Input.isRepeated('ok') || (TouchInput.isReleased() && (this._scrollLastTouchY === TouchInput.y || !this._scroll)))) {
            this.processOk();
		}
    }
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.processOk = function() {
    this.updateInputData();
    this.callOkHandler();
};
//-----------------------------------------------------------------------------
// Call Ok Handler
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.callOkHandler = function() {
    this.callHandler('ok');
};
//-----------------------------------------------------------------------------
// Check if ok handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.isOkEnabled = function() {
    return this.isHandled('ok');
};
//-----------------------------------------------------------------------------
// Set the quest to be displayed (do nothing if already being displayed)
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.setItem = function(quest) {
	if(this._quest === quest) return;
	this._quest = quest;
	this.setupWindowForNewEntry();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.refresh = function() {
	if(!this._quest) return;
	this._backgroundImage.hide();
	this._textBoxBackground.hide();
	this._textSprite.hide();
	if(this._quest.isCategory) {
		if(CGMZ.QuestSystem.DrawCategoryInformation) this.drawCategoryInfo();
	} else {
		this.loadQuestImage();
	}
};
//-----------------------------------------------------------------------------
// Draw Category Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCategoryInfo = function() {
	const category = $cgmzTemp.getQuestCategory(this._quest.name);
	this.contents.fontBold = true;
	this.drawText(category._displayName, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	const y = this.CGMZ_drawText(category._description, 0, 0, this.lineHeight(), this.contents.width);
	this._neededHeight = y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Quest Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.loadQuestImage = function() {
	const quest = $cgmzTemp.getQuest(this._quest.questName);
	const questState = $cgmz.getQuest(this._quest.questName);
	if(quest._backgroundImage) {
		const imageData = $cgmzTemp.getImageData(quest._backgroundImage);
		this._backgroundImage.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this._backgroundImage.bitmap.addLoadListener(this.drawQuestInfo.bind(this, quest, questState, true));
	} else {
		this.drawQuestInfo(quest, questState, false);
	}
};
//-----------------------------------------------------------------------------
// Draw Quest Text Info
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawQuestInfo = function(quest, questState, showImage) {
	let y = 0;
	if(showImage) {
		let scale = 1;
		if(this._backgroundImage.width > this.contents.width) {
			scale = this._backgroundImage.width / this.contents.width;
		}
		this._backgroundImage.scale.x = scale;
		this._backgroundImage.show();
		this._textBoxBackground.bitmap.clear();
		const rectY = 0;
		const width = this.textWidth(quest._name) + $gameSystem.windowPadding() * 2;
		const x = this.contents.width / 2 - width / 2;
		const height = this.lineHeight();
		const rect = new Rectangle(x, rectY, width, height);
		this._textBoxBackground.bitmap.fillRect(x, y, width, this.lineHeight(), "#000000");
		this._textBoxBackground.show();
		this._textSprite.bitmap.clear();
		this._textSprite.bitmap.drawText(quest._name, 0, 0, this.contents.width, this.lineHeight(), 'center');
		this._textSprite.show();
		y += this._backgroundImage.height;
	} else {
		this.contents.fontBold = true;
		this.drawText(quest._name, 0, 0, this.contents.width, 'center');
		this.contents.fontBold = false;
		y += this.lineHeight();
	}
	for(const infoType of CGMZ.QuestSystem.QuestInfoOrder) {
		switch(infoType) {
			case "Divider - Info":
				this.CGMZ_drawHeader(CGMZ.QuestSystem.InfoText, y, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2);
				y += this.lineHeight(); break;
			case "Divider - Description":
				this.CGMZ_drawHeader(CGMZ.QuestSystem.DescriptionText, y, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2);
				y += this.lineHeight(); break;
			case "Divider - Objectives":
				this.CGMZ_drawHeader(CGMZ.QuestSystem.ObjectivesText, y, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2);
				y += this.lineHeight(); break;
			case "Divider - Rewards":
				if(quest.hasRewards()) {
					this.CGMZ_drawHeader(CGMZ.QuestSystem.RewardsText, y, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2);
					y += this.lineHeight(); break;
				}
			case "Completion Date":
				const questDate = $cgmz.getQuest(quest._name)._completionDate;
				if(questDate) {
					this.drawCompletionDate(questDate, y);
					y += this.lineHeight();
				}
				break;
			case "Type":
				this.drawCategory(quest._category, y);
				y += this.lineHeight(); break;
			case "Difficulty":
				this.drawDifficulty(quest._difficulty, y);
				y += this.lineHeight(); break;
			case "Length":
				this.drawLength(quest._length, y);
				y += this.lineHeight(); break;
			case "Location":
				this.drawLocation(quest._location, y);
				y += this.lineHeight(); break;
			case "Quest Giver":
				this.drawQuestGiver(quest._questGiver, y);
				y += this.lineHeight(); break;
			case "Recommended Level":
				this.drawRecommendedLevel(quest._recommendedLevel, y);
				y += this.lineHeight(); break;
			case "Description": y += this.drawDescription(quest, questState, y); break;
			case "Objectives": y += this.drawObjectives(quest, questState, y); break;
			case "Rewards":
				if(quest.hasRewards()) {
					y += this.drawRewards(quest, y);
				}
		}
	}
	this._neededHeight = y;
	this._neededHeight += $gameSystem.windowPadding() * 2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Standard Line
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawStandardLine = function(label, string, y) {
	this.changeTextColor(ColorManager.textColor(CGMZ.QuestSystem.LabelTextColor));
	this.drawText(label, 0, y, this.contents.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	const x = this.textWidth(label);
	this.drawText(string, x, y, this.contents.width - x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Completion Date
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCompletionDate = function(date, y) {
	const label = CGMZ.QuestSystem.CompletionText;
	this.drawStandardLine(label, date, y);
};
//-----------------------------------------------------------------------------
// Draw Category
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawCategory = function(category, y) {
	const label = CGMZ.QuestSystem.CategoryText;
	this.drawStandardLine(label, category, y);
};
//-----------------------------------------------------------------------------
// Draw Difficulty
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawDifficulty = function(difficulty, y) {
	const label = CGMZ.QuestSystem.DifficultyText;
	this.drawStandardLine(label, difficulty, y);
};
//-----------------------------------------------------------------------------
// Draw Length
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawLength = function(length, y) {
	const label = CGMZ.QuestSystem.LengthText;
	this.drawStandardLine(label, length, y);
};
//-----------------------------------------------------------------------------
// Draw Location
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawLocation = function(location, y) {
	const label = CGMZ.QuestSystem.LocationText;
	this.drawStandardLine(label, location, y);
};
//-----------------------------------------------------------------------------
// Draw Quest Giver
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawQuestGiver = function(questGiver, y) {
	const label = CGMZ.QuestSystem.QuestGiverText;
	this.drawStandardLine(label, questGiver, y);
};
//-----------------------------------------------------------------------------
// Draw Recommended Level
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawRecommendedLevel = function(recommendedLevel, y) {
	const label = CGMZ.QuestSystem.RecommendedLevelText;
	this.drawStandardLine(label, recommendedLevel, y);
};
//-----------------------------------------------------------------------------
// Draw Description
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawDescription = function(quest, questState, y) {
	let description = quest._descriptions[questState._stage - 1];
	if(!description) description = quest._descriptions[quest._descriptions.length - 1];
	return this.CGMZ_drawText(description, 0, 0, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Rewards
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawRewards = function(quest, y) {
	const startY = y;
	let label = "";
	if(quest._rewardExp > 0 || CGMZ.QuestSystem.AlwaysShowExpReward) {
		label = CGMZ.QuestSystem.ExpText;
		this.drawStandardLine(label, quest._rewardExp.toLocaleString(), y);
		y += this.lineHeight();
	}
	if(quest._rewardGold > 0 || CGMZ.QuestSystem.AlwaysShowGoldReward) {
		label = CGMZ.QuestSystem.GoldText;
		this.drawStandardLine(label, quest._rewardGold.toLocaleString() + " " + TextManager.currencyUnit, y);
		y += this.lineHeight();
	}
	for(const reward of quest._autoRewards) {
		const item = $cgmzTemp.lookupItem(reward.type, reward.id);
		if(item) {
			const string = reward.amount + 'x \\i[' + item.iconIndex + ']' + item.name;
			this.CGMZ_drawTextLine(string, 0, y, this.contents.width);
		}
		y += this.lineHeight();
	}
	for(const customReward of quest._customRewards) {
		y += this.CGMZ_drawText(customReward, 0, 0, y, this.contents.width);
	}
	return y - startY;
};
//-----------------------------------------------------------------------------
// Draw Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjectives = function(quest, questState, y) {
	if(!questState._isStarted) {
		return this.CGMZ_drawText(quest._unstartedObjective, 0, 0, y, this.contents.width);
	}
	const startY = y;
	const stage = questState._stage;
	const isFailed = questState._isFailed;
	let objectives = quest.getObjectivesOfStage(stage);
	y += this.drawObjectivesFromObjectiveArray(objectives, questState, y, false, isFailed);
	if(CGMZ.QuestSystem.AlwaysShowPastObjectives || questState._isCompleted) {
		this.changePaintOpacity(false);
		for(let i = stage - 1; i > 0; i--) {
			objectives = quest.getObjectivesOfStage(i);
			if(objectives.length === 0) break;
			y += this.drawObjectivesFromObjectiveArray(objectives, questState, y, true, isFailed);
		}
		this.changePaintOpacity(true);
	}
	return y - startY;
};
//-----------------------------------------------------------------------------
// Draw Objectives from an array of objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjectivesFromObjectiveArray = function(objectives, questState, y, isPastStage, isFailed) {
	const startY = y;
	for(const objective of objectives) {
		if(objective.autoTrack) {
			const completed = questState.isObjectiveComplete(objective.id);
			y += this.drawAutoTrackObjective(questState, objective, completed, y, isPastStage, isFailed);
		} else {
			y += this.drawManualObjective(questState, objective, y, isPastStage, isFailed);
		}
	}
	return y - startY;
};
//-----------------------------------------------------------------------------
// Draw Manually Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawManualObjective = function(questState, objective, y, isPastStage, isFailed) {
	const maxProgress = objective.maxProgress;
	const progress = questState.getObjectiveProgress(objective.id, maxProgress);
	let progressString = " (" + progress + "/" + maxProgress + ")";
	if(maxProgress <= 1) {
		progressString = "";
	}
	return this.drawObjective(objective.description + progressString, progress >= maxProgress, y, isPastStage, isFailed);
};
//-----------------------------------------------------------------------------
// Draw Automatically Tracked Objectives
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawAutoTrackObjective = function(questState, objective, completed, y, isPastStage, isFailed) {
	if(objective.goldTracking > 0) {
		return this.drawGoldObjective(questState, objective, completed, y, isPastStage, isFailed);
	} else if(objective.variableTracking > 0) {
		return this.drawVariableObjective(questState, objective, completed, y, isPastStage, isFailed);
	} else if(objective.hasOwnProperty('otherTracking')) {
		return this.drawItemObjective(questState, objective, completed, y, isPastStage, isFailed);
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Draw automatic gold objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawGoldObjective = function(questState, objective, completed, y, isPastStage, isFailed) {
	const maxProgress = objective.goldTracking;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameParty.gold();
	const progressString = " (" + progress + "/" + maxProgress + ")";
	return this.drawObjective(objective.description + progressString, progress >= maxProgress, y, isPastStage, isFailed);
};
//-----------------------------------------------------------------------------
// Draw automatic variable objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawVariableObjective = function(questState, objective, completed, y, isPastStage, isFailed) {
	const maxProgress = objective.maxProgress;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameVariables.value(objective.variableTracking);
	const progressString = " (" + progress + "/" + maxProgress + ")";
	return this.drawObjective(objective.description + progressString, progress >= maxProgress, y, isPastStage, isFailed);
};
//-----------------------------------------------------------------------------
// Draw automatic item objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawItemObjective = function(questState, objective, completed, y, isPastStage, isFailed) {
	const item = $cgmzTemp.lookupItem(objective.otherTracking.type, objective.otherTracking.id);
	const maxProgress = objective.otherTracking.amount;
	const progress = (completed) ? maxProgress : (isFailed || isPastStage) ? questState.getObjectiveProgress(objective.id, maxProgress) : $gameParty.numItems(item);
	const progressString = " (" + progress + "/" + maxProgress + ")";
	return this.drawObjective(objective.description + progressString, progress >= maxProgress, y, isPastStage, isFailed);
};
//-----------------------------------------------------------------------------
// Draw an objective
//-----------------------------------------------------------------------------
CGMZ_Window_QuestDisplay.prototype.drawObjective = function(string, complete, y, isPastStage, isFailed) {
	this.contents.strokeRect(2, y + 2, 28, 28, '#FFFFFF');
	if(complete) {
		this.drawIcon(CGMZ.QuestSystem.ObjectiveCompleteIcon, 0, y);
	} else if(isPastStage || isFailed) {
		this.drawIcon(CGMZ.QuestSystem.ObjectiveFailedIcon, 0, y);
	}
	return this.CGMZ_drawText(string, 0, 40, y, this.contents.width);
};
//=============================================================================
// Sprite_Button
//-----------------------------------------------------------------------------
// Add sort button
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. If undefined, check if sort button and return expected results
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_SpriteButton_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
    data = alias_CGMZ_QuestSystem_SpriteButton_buttonData.call(this);
	if(data) {
		return data;
	}
	const CGMZQuestSystemButtonTable = {
		cgmzSort: {x: CGMZ.QuestSystem.SortButtonOffset, w: CGMZ.QuestSystem.SortButtonWidth}
	};
	return CGMZQuestSystemButtonTable[this._buttonType];
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Check automatic quest gold and item objectives when changing gold / items
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also check quest automatic gold objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    alias_CGMZ_QuestSystem_GameParty_gainGold.call(this, amount);
	$cgmzTemp.checkAutomaticGoldQuests();
};
//-----------------------------------------------------------------------------
// Alias. Also check quest automatic item objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMZ_QuestSystem_GameParty_gainItem.call(this, item, amount, includeEquip);
	$cgmzTemp.checkAutomaticItemQuests();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Check automatic quest variable objectives when changing variables
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also check quest automatic variable objectives
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_GameVariables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
	alias_CGMZ_QuestSystem_GameVariables_setValue.call(this, variableId, value);
	$cgmzTemp.checkAutomaticVariableQuests();
};
//=============================================================================
// CGMZ_Scene_QuestSystemAcceptQuest
//-----------------------------------------------------------------------------
// Handle the quest scene where players can accept / decline a single quest
//=============================================================================
function CGMZ_Scene_QuestSystemAcceptQuest() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystemAcceptQuest.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystemAcceptQuest.prototype.constructor = CGMZ_Scene_QuestSystemAcceptQuest;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._quest = "";
	this._switch = 0;
};
//-----------------------------------------------------------------------------
// Prepare the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.prepare = function(obj) {
    this._quest = obj.quest;
	this._switch = obj.gameSwitch;
};
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createDisplayWindow();
	this.createCommandWindow();
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
    this._displayWindow = new CGMZ_Window_QuestPromptDisplay(rect, this._quest);
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.displayWindowRect = function() {
	const width = Graphics.boxWidth * 0.8;
	const height = Graphics.boxHeight  * 0.6;
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2 - this.calcWindowHeight(1, true) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create command window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.createCommandWindow = function() {
	const rect = this.commandWindowRect();
    this._commandWindow = new CGMZ_Window_QuestPromptCommand(rect);
	this._commandWindow.setHandler('accept', this.onAccept.bind(this));
	this._commandWindow.setHandler('decline', this.onDecline.bind(this));
	if(CGMZ.QuestSystem.AllowCancelInAcceptScene) this._commandWindow.setHandler('cancel', this.onDecline.bind(this));
    this.addWindow(this._commandWindow);
};
//-----------------------------------------------------------------------------
// Get command window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.commandWindowRect = function() {
	const width = this._displayWindow.width;
	const height = this.calcWindowHeight(1, true);
	const x = this._displayWindow.x;
	const y = this._displayWindow.y + this._displayWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On quest accept
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.onAccept = function() {
	$cgmz.startQuest(this._quest, true, true);
	$gameSwitches.setValue(this._switch, true);
	this.popScene();
};
//-----------------------------------------------------------------------------
// On quest accept
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.onDecline = function() {
	$cgmz.discoverQuest(this._quest, true);
	$gameSwitches.setValue(this._switch, false);
	this.popScene();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	const quest = $cgmzTemp.getQuest(this._quest);
	if(quest && quest._acceptSceneImage) {
		const imageData = $cgmzTemp.getImageData(quest._acceptSceneImage);
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this.addChild(this._backgroundCustomSprite);
	}
};
//-----------------------------------------------------------------------------
// Do not show cancel button
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemAcceptQuest.prototype.needsCancelButton = function() {
    return CGMZ.QuestSystem.AllowCancelInAcceptScene;
};
//=============================================================================
// CGMZ_Window_QuestPromptCommand
//-----------------------------------------------------------------------------
// Command window for choosing to accept / decline a quest
//=============================================================================
function CGMZ_Window_QuestPromptCommand(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPromptCommand.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_QuestPromptCommand.prototype.constructor = CGMZ_Window_QuestPromptCommand;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.maxCols = function() {
    return 2;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptCommand.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.QuestSystem.AcceptText, 'accept', true);
	this.addCommand(CGMZ.QuestSystem.DeclineText, 'decline', true);
};
//=============================================================================
// CGMZ_Window_QuestPromptDisplay
//-----------------------------------------------------------------------------
// Window displaying quest information during accept / decline scene
//=============================================================================
function CGMZ_Window_QuestPromptDisplay() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestPromptDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_QuestPromptDisplay.prototype.constructor = CGMZ_Window_QuestPromptDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.initialize = function(rect, quest) {
	const heightMultiplier = 15; // maximum of 15 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.QuestSystem.ScrollWait, CGMZ.QuestSystem.ScrollSpeed, CGMZ.QuestSystem.AutoScroll, CGMZ.QuestSystem.ScrollDeceleration);
	this._quest = quest;
	this._neededHeight = 0;
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
	this.deactivate();
	this.setupWindowForNewEntry();
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.refresh = function() {
	const quest = $cgmzTemp.getQuest(this._quest);
	if(!quest) return;
	this.contents.fontBold = true;
	this.drawText(CGMZ.QuestSystem.NewQuestText + quest._name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
	let y = this.lineHeight();
	y += this.CGMZ_drawText(quest._unstartedDescription, 0, 0, y, this.contents.width);
	this.CGMZ_drawHeader(CGMZ.QuestSystem.RewardsText, y, CGMZ.QuestSystem.HeaderGradientColor1, CGMZ.QuestSystem.HeaderGradientColor2);
	y += this.lineHeight();
	y += this.drawRewards(quest, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Standard Line
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.drawStandardLine = function(label, string, y) {
	this.changeTextColor(ColorManager.textColor(CGMZ.QuestSystem.LabelTextColor));
	this.drawText(label, 0, y, this.contents.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	const x = this.textWidth(label);
	this.drawText(string, x, y, this.contents.width - x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Rewards
//-----------------------------------------------------------------------------
CGMZ_Window_QuestPromptDisplay.prototype.drawRewards = function(quest, y) {
	const startY = y;
	let label = CGMZ.QuestSystem.ExpText;
	this.drawStandardLine(label, quest._rewardExp.toLocaleString(), y);
	y += this.lineHeight();
	label = CGMZ.QuestSystem.GoldText;
	this.drawStandardLine(label, quest._rewardGold.toLocaleString() + " " + TextManager.currencyUnit, y);
	y += this.lineHeight();
	for(const reward of quest._autoRewards) {
		const item = $cgmzTemp.lookupItem(reward.type, reward.id);
		if(item) {
			const string = reward.amount + 'x \\i[' + item.iconIndex + ']' + item.name;
			this.CGMZ_drawTextLine(string, 0, y, this.contents.width);
		}
		y += this.lineHeight();
	}
	for(const customReward of quest._customRewards) {
		y += this.CGMZ_drawText(customReward, 0, 0, y, this.contents.width);
	}
	return y - startY;
};
//=============================================================================
// CGMZ_Scene_QuestSystemQuestBoard
//-----------------------------------------------------------------------------
// Handle the quest scene where players can choose from a list of quests which
// ones they want to accept.
//=============================================================================
function CGMZ_Scene_QuestSystemQuestBoard() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_QuestSystemQuestBoard.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_QuestSystemQuestBoard.prototype.constructor = CGMZ_Scene_QuestSystemQuestBoard;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	const settings = $cgmzTemp.getQuestBoardSettings();
	this._questList = settings.questList;
	this._sceneImage = settings.img;
	this._name = settings.name;
	this._categoryIconType = settings.categoryIcons;
	this._showLegend = settings.legend;
};
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createQuestBoardWindow();
	if(this._name) {
		this.createQuestBoardNameWindow();
	}
	if(this._showLegend) {
		this.createQuestBoardLegendWindow();
	}
};
//-----------------------------------------------------------------------------
// Create quest board window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardWindow = function() {
	const rect = this.questBoardWindowRect();
    this._questBoardWindow = new CGMZ_Window_QuestBoardSelectable(rect, this._questList, this._categoryIconType);
	this._questBoardWindow.setHandler('ok', this.onQuestSelect.bind(this));
	this._questBoardWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._questBoardWindow);
};
//-----------------------------------------------------------------------------
// Get quest board window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardWindowRect = function() {
	const showBoth = !!this._name && this._showLegend;
	const width = Graphics.boxWidth * 0.8;
	const height = Graphics.boxHeight * 0.8;
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2 + (!!this._name * this.calcWindowHeight(1, false)) - (showBoth * this.calcWindowHeight(1, false));
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create quest board name window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardNameWindow = function() {
	const rect = this.questBoardNameWindowRect();
    this._questBoardNameWindow = new CGMZ_Window_QuestBoardName(rect, this._name);
    this.addWindow(this._questBoardNameWindow);
};
//-----------------------------------------------------------------------------
// Get quest board window name rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardNameWindowRect = function() {
	const width = this._questBoardWindow.width;
	const height = this.calcWindowHeight(1, false);
	const x = this._questBoardWindow.x;
	const y = this._questBoardWindow.y - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create quest board legend window
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createQuestBoardLegendWindow = function() {
	const rect = this.questBoardLegendWindowRect();
    this._questBoardLegendWindow = new CGMZ_Window_QuestBoardLegend(rect, this._questList, this._categoryIconType);
    this.addWindow(this._questBoardLegendWindow);
};
//-----------------------------------------------------------------------------
// Get quest board legend window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.questBoardLegendWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, false);
	const x = 0;
	const y = Graphics.boxHeight - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On quest select
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.onQuestSelect = function() {
	const argObj = {quest: this._questBoardWindow.item(), gameSwitch: 0};
	SceneManager.push(CGMZ_Scene_QuestSystemAcceptQuest);
	SceneManager.prepareNextScene(argObj);
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_QuestSystemQuestBoard.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(this._sceneImage) {
		const imageData = $cgmzTemp.getImageData(this._sceneImage);
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_QuestBoardName
//-----------------------------------------------------------------------------
// Base window that displays quest board name if exists
//=============================================================================
function CGMZ_Window_QuestBoardName(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardName.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestBoardName.prototype.constructor = CGMZ_Window_QuestBoardName;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardName.prototype.initialize = function(rect, name) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
	this._name = name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardName.prototype.refresh = function() {
	this.contents.clear();
    this.CGMZ_drawTextLine(this._name, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Window_QuestBoardLegend
//-----------------------------------------------------------------------------
// Base window that displays quest board legend
//=============================================================================
function CGMZ_Window_QuestBoardLegend(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardLegend.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_QuestBoardLegend.prototype.constructor = CGMZ_Window_QuestBoardLegend;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.initialize = function(rect, questList, categoryType) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
	this.createLegendEntries(questList, categoryType);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.createLegendEntries = function(questList, categoryType) {
	this._legend = [];
	const categoryNames = [];
    for(const questName of questList) {
		const quest = $cgmzTemp.getQuest(questName);
		const questSave = $cgmz.getQuest(questName);
		if(!quest || !questSave || questSave._isStarted || !quest.canDisplayOnBoard()) continue;
		let category = null;
		switch(categoryType) {
			case 'Category': category = $cgmzTemp.getQuestCategory(quest._category); break;
			case 'Difficulty': category = $cgmzTemp.getQuestCategory(quest._difficulty); break;
			case 'Length': category = $cgmzTemp.getQuestCategory(quest._length); break;
			case 'Location': category = $cgmzTemp.getQuestCategory(quest._location); break;
		}
		if(!category || categoryNames.includes(category._displayName)) continue;
		const categoryString = '\\c[' + category._textColor + ']\\i[' + category._icon + ']' + category._displayName + '\\c[0]';
		categoryNames.push(category._displayName);
		this._legend.push(categoryString);
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardLegend.prototype.refresh = function() {
	this.contents.clear();
	const columns = this._legend.length;
	for(let col = 0; col < this._legend.length; col++) {
		const colSpace = 12;
		const colWidth = (this.contents.width / columns) - colSpace;
		const x = col * (colWidth + colSpace);
		const string = this._legend[col];
		const rect = new Rectangle(x - 4, 0, colWidth + 8, this.lineHeight());
		this.CGMZ_drawBackgroundRectangle(rect, 'rgba(0, 0, 0, 0.2)');
		this.CGMZ_drawTextLine(string, x, 0, colWidth, 'center');
	}
};
//=============================================================================
// CGMZ_Window_QuestBoardSelectable
//-----------------------------------------------------------------------------
// Selectable window for choosing a quest in a list.
//=============================================================================
function CGMZ_Window_QuestBoardSelectable(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_QuestBoardSelectable.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_QuestBoardSelectable.prototype.constructor = CGMZ_Window_QuestBoardSelectable;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.initialize = function(rect, questList, categoryIconType) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.QuestSystem.TransparentWindows));
	this._questList = questList;
	this._categoryIconType = categoryIconType;
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Maximum columns
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.maxCols = function() {
    return 2;
};
//-----------------------------------------------------------------------------
// Height of each item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.itemHeight = function() {
    return this.lineHeight() * 4 + 8;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
	if(this._data.length <= 0) {
		this.CGMZ_drawText(CGMZ.QuestSystem.EmptyQuestBoardText, 0, 0, 0, this.contents.width, 'center');
	} else {
		this.select(0);
	}
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.makeItemList = function() {
	this._data = this._questList.filter(questName => $cgmz.getQuest(questName) && !$cgmz.getQuest(questName)._isStarted && $cgmzTemp.getQuest(questName).canDisplayOnBoard());
};
//-----------------------------------------------------------------------------
// Check if current item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.isCurrentItemEnabled = function() {
	return $cgmzTemp.getQuest(this.item());
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const quest = $cgmzTemp.getQuest(item);
	const categoryIcon = this.getCategoryIcon(index);
	const questNameString = (categoryIcon) ? '\\i[' + categoryIcon + '] ' + item : item;
	this.contents.fontBold = true;
	this.CGMZ_drawTextLine(questNameString, rect.x, rect.y, rect.width, 'center');
	this.contents.fontBold = false;
	this.CGMZ_drawText(quest._boardDescription, rect.x, rect.x, rect.y + this.lineHeight(), rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_QuestBoardSelectable.prototype.getCategoryIcon = function(index) {
	const item = this._data[index];
	const quest = $cgmzTemp.getQuest(item);
	let category = null;
	switch(this._categoryIconType) {
		case 'Category': category = $cgmzTemp.getQuestCategory(quest._category); break;
		case 'Difficulty': category = $cgmzTemp.getQuestCategory(quest._difficulty); break;
		case 'Length': category = $cgmzTemp.getQuestCategory(quest._length); break;
		case 'Location': category = $cgmzTemp.getQuestCategory(quest._location); break;
	}
	return (category) ? category._icon : 0;
};
if(Imported.CGMZ_ToastManager) {
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handling for Quest Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Handle quest toasts
//-----------------------------------------------------------------------------
const alias_CGMZ_QuestSystem_CGMZ_Window_Toast_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_QuestSystem_CGMZ_Window_Toast_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('isQuestToast')) {
		const questName = toastObject.questName;
		const line1 = toastObject.line1.replace("%questname", questName);
		const line2 = toastObject.line2.replace("%questname", questName);
		this.CGMZ_drawTextLine(line1, 0, 0, this.contents.width, 'center');
		this.CGMZ_drawTextLine(line2, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}