# Electron Command Palette 
A nice-looking command palette for Electron

[![npm version](https://badge.fury.io/js/electron-command-palette.svg)](https://badge.fury.io/js/electron-command-palette)
[![Build Status](https://travis-ci.org/armaldio/electron-command-palette.svg?branch=master)](https://travis-ci.org/armaldio/electron-command-palette)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Repo Status](https://img.shields.io/badge/status-Maintained-brightgreen.svg)](https://github.com/armaldio/electron-command-palette)

![PRESENTATION GIF](img/Commandpalette.gif)



## Features
 * Searchable
 * Highly customizable *
 * Show **Title** - **Description** - **Shortcut** and **Category**   
 * Register local shortcuts *
 * Register custom actions on click *


\* *planned feature*
 
![FEATURE IMAGE](img/Commandpalette.png)

## Installation
`$ npm install --save electron-command-palette`

## Usage

### Mandatory

**renderer.js** :
```js
const CmdPalette = require("electron-command-palette");

let palette = new CmdPalette();
```

### Add commands
```js
const cmds       = require("./commands.json");

//JSON style
palette.add(cmds);

//inline style
palette.add({
    "title": "New project",
    "category": "Project",
    "description": "Create a new project from scratch",
    "shortcut": "CmdOrCtrl+Shift+N",
    "action": "newproject"
})
```

**commands.json** :
```json
[
  {
    "title": "New project",
    "category": "Project",
    "description": "Create a new project from scratch",
    "shortcut": "CmdOrCtrl+Shift+N",
    "action": "newproject"
  },
  {
      "title": "Title",
      "category": "Optional categoty",
      "description": "optional description",
      "shortcut": "Electron accelerator",
      "action": "Name of the function previously registered"
    }
]
```

### Register functions
**renderer.js**: 
```js
const functions  = require("./functions");

//Module style
palette.register(functions);

//Inline style
palette.register("saveproject", function() {
	Project.save();
});
```

**functions.js**:
```js
module.exports = [
	{
		"key"   : "newproject",
		"action": function () {
			console.log("Save project");
		}
	},
	{
		"key"   : "openproject",
		"action": function () {
			console.log("Open project");
		}
	}
];
```

### Display
```js
palette.show();
palette.hide();
```

## TODO
 * [X] Tidy repo  
 * [X] Register functions
 * [ ] register shortcuts
 * [X] Trigger correct action on click
 * [ ] Fix bad fuzzy search
 * [ ] Customization options (position, CSS classes, themes)

## Contributors
 * [Armaldio](https://github.com/armaldio/)

## License

MIT © [Armaldio](https://armaldio.xyz)
