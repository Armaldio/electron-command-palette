const fs = require('fs');
const path = require('path');

const $ = require('jquery');
const Fuse = require('fuse.js');
const Mark = require('mark.js');

const accParser = require('./lib/accelerator-parser');

const defaultConfig = {
	position: 'top', // Top, middle
	offsetTop: 0,
	offsetBottom: 0,
	searchResults: 5,
	showResultsOnStart: true,
	placeholder: 'Start typing...',
	registerShortcuts: true
};

module.exports = class {
	constructor() {
		this.commands = [];
		this.actions = [];
		this.config = defaultConfig;

		const paletteCode = fs.readFileSync(path.join(__dirname, 'template', 'palette.html'), 'utf8');

		// Append element to html
		const node = document.createElement('div');
		node.innerHTML = paletteCode;
		node.className = 'command-palette';
		document.body.appendChild(node);

		this.el = node;

		$(document).ready(() => {
			// Search -----------------------------
			const options = {
				shouldSort: true,
				threshold: 0.6,
				location: 0,
				distance: 100,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					'title',
					'category',
					'description'
				]
			};

			$('.palette-input').first().on('input', $el => {
				const fuse = new Fuse(this.commands, options);

				$el = $($el.currentTarget);
				const val = $el.val();

				if (val === '')					{
					this.filter();
				}				else {
					const result = fuse.search(val);
					console.log(result);

					if (result.length === 0) {
						this.filter([{
							title: 'No results found',
							description: 'Try using a different query'
						}]);
					}					else {
						this.filter(result, val);
					}
				}
			});

			// Search -----------------------------

			$('.command').on('click', el => {
				const $el = $(el.currentTarget);
				this.startAction($el.data('action'));
			});
		});
	}

	/**
	 * Show the user only elements passed as arguments
	 * If no argument given, display all the commands (limited by "results" (default = 5))
	 * @private
	 * @param elems
	 * @param query
	 * @returns {boolean}
	 */
	filter(elems = this.commands, query = '') {
		const $list = $(this.el).find('.palette-list').first();
		$list.empty();
		elems.forEach((command, index) => {
			// Limit number of results
			if (index >= this.config.searchResults)				{
				return false;
			}
			if (command === undefined || command.title === undefined)				{
				return false;
			}

			// Append the item list
			$list.append(`
				<div class="command" data-action="${command.action}">
				<div class="left">
					<p class="title">${command.category ? command.category + ' : ' : ''}${command.title}</p>
					<p class="description ${command.description ? '' : 'hide'}">${command.description ? command.description : ''}</p>
				</div>
				<div class="right">
					<p class="shortcut ${command.shortcut ? '' : 'hide'}"><span class="text">${accParser(command.shortcut)}</span></p>
				</div>
				</div>
			`);
		});

		// Highlight query -----------------------
		if (query === '')			{
			return true;
		}
		const instance = new Mark($(this.el).find('.palette-list').first()[0]);
		instance.mark(query);
		// Highlight query -----------------------
	}

	/**
	 * Start the correct action based on the key
	 * @private
	 * @param key
	 */
	startAction(key) {
		// Check if an already defined command exist
		let found = false;
		this.actions.forEach(act => {
			if (key === act.key) {
				act.action();
				found = true;
				return false;
			}
		});
		if (!found)			{
			console.warn(`No action assigned to ${key}`);
		}
	}

	/**
	 * Assign an id to a function
	 * @param action
	 * @param func
	 */
	register(action, func) {
		//
		if (Array.isArray(action)) {
			this.actions.push(...action);
		}		else {
			this.actions.push({
				key: action,
				action: func
			});
		}
	}

	/**
	 * Show the command palette
	 */
	show() {
		this.filter();
		$(this.el).find('.palette').slideDown(() => {
			$('.palette-input').first().focus();
		});
	}

	/**
	 * Hide the command palette
	 */
	hide() {
		$(this.el).find('.palette').slideUp();
	}

	/**
	 * Add a command or an array of commands
	 * @param cmds
	 */
	add(cmds) {
		if (Array.isArray(cmds)) {
			this.commands.push(...cmds);
		} else {
			this.commands.push(cmds);
		}

		// Sort by title alphabetically
		this.commands.sort((a, b) => {
			return (a.title > b.title);
		});
	}
};
