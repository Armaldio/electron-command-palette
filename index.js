const fs        = require("fs");
const $         = require("jquery");
const accParser = require("./acceleratorParser");
const Fuse      = require("fuse.js");
const Mark      = require("mark.js");

let defaultConfig = {
	position    : "top", //top, middle
	offsetTop   : 0,
	offsetBottom: 0,
	results     : 5,
};

module.exports = class {
	constructor () {
		this.commands = [];
		this.config   = defaultConfig;

		let paletteCode = fs.readFileSync("./electron-command-palette/palette.html", "utf8");

		//Append element to html
		let node       = document.createElement("div");
		node.innerHTML = paletteCode;
		node.className = "command-palette";
		document.body.appendChild(node);

		this.el = node;

		$(document).ready(() => {

			//Search -----------------------------
			const options = {
				shouldSort        : true,
				threshold         : 0.6,
				location          : 0,
				distance          : 100,
				maxPatternLength  : 32,
				minMatchCharLength: 1,
				keys              : [
					"title",
					"category",
					"description"
				]
			};

			$(".palette-input").first().on("input", ($el) => {
				const fuse = new Fuse(this.commands, options);

				$el     = $($el.currentTarget);
				let val = $el.val();

				if (val === "")
					this.filter();
				else {
					const result = fuse.search(val);
					console.log(result);

					if (result.length === 0) {
						//TODO show no result
					}
					else {
						this.filter(result, val);
					}
				}

			});

			//Search -----------------------------
		});

	}

	filter (elems = this.commands, query = "") {

		let $list = $(this.el).find(".palette-list").first();
		$list.empty();
		elems.forEach((command, index) => {
			//Limit number of results
			if (index >= this.config.results)
				return false;

			//Append the item list
			$list.append(`
				<div class="command">
				<div class="left">
					<p class="title">${command.category ? command.category + " : " : ""}${command.title}</p>
					<p class="description ${command.description ? "" : "hide"}">${command.description ? command.description : ""}</p>
				</div>
				<div class="right">
					<p class="shortcut"><span class="text">${accParser(command.shortcut)}</span></p>
				</div>
				</div>
			`);
		});

		// Highlight query -----------------------
		if (query === "")
			return true;
		const instance = new Mark($(this.el).find(".palette-list").first()[0]);
		instance.mark(query);
		// Highlight query -----------------------
	}

	show () {
		this.filter();
		$(this.el).find(".palette").slideDown();
	}

	hide () {
		$(this.el).find(".palette").slideUp();
	}

	add (cmds) {
		if (Array.isArray(cmds)) {
			this.commands.push(...cmds);
		} else {
			this.commands.push(cmds);
		}

		//Sort by title alphabetically
		this.commands.sort((a, b) => {
			return (a.title > b.title);
		});
	}
};