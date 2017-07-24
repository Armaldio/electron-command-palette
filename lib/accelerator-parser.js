/**
 * Created by Armaldio on 23/07/2017.
 */

	// TODO verbose "Ctrl" or not "^"

const os = require('os');

const IS_MAC = os.platform() === 'darwin';
const CMD_OR_CTRL = IS_MAC ? '\u2318' : '\u2303';

// TODO https://wincent.com/wiki/Unicode_representations_of_modifier_keys
const MODIFIER_MAP = {
	Command: '\u2318',
	Cmd: '\u2318',
	CommandOrControl: CMD_OR_CTRL,
	CmdOrCtrl: CMD_OR_CTRL,
	Super: '\u2318',
	Control: '\u2303',
	Ctrl: '\u2303',
	Shift: '\u21e7',
	Alt: '\u2325',
	Option: '\u2325',
	AltGr: '\u2325',
	Plus: '\'+\'',
	Space: '\u2423', // ␣
	Tab: '\u21E5' // ⇥
};

const formatter = function (accelerator) {
	if (!accelerator) {
		return '';
	}

	return accelerator
		.split('+')
		.map(modifierOrKeyCode => {
			return MODIFIER_MAP[modifierOrKeyCode] || modifierOrKeyCode;
		})
		.join(' + ');
};

module.exports = formatter;
