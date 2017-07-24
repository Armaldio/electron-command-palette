# Electron Command Palette 
A very early-stage command palette for Electron

[![npm version](https://badge.fury.io/js/electron-command-palette.svg)](https://badge.fury.io/js/electron-command-palette)
[![Build Status](https://travis-ci.org/armaldio/electron-command-palette.svg?branch=master)](https://travis-ci.org/armaldio/electron-command-palette)

![PRESENTATION GIF](img/Commandpalette.gif)

## Features
 * Title
 * Description
 * Electron Accelerator
 * Action (function executed on click) *
 * Category
 
![FEATURE IMAGE](img/Commandpalette.png)

## Installation
`$ npm install --save electron-command-palette`

## Usage

**renderer.js** :
```js
const CmdPalette = require("electron-command-palette");
const cmds       = require("./commands.json");

let palette = new CmdPalette();

/*palette.register("saveproject", function() {
	Project.save();
});*/

palette.add(cmds);
palette.show();
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

## TODO
 * [ ] Tidy repo  
 * [ ] Register functions
 * [ ] register shortcuts
 * [ ] Trigger correct action on click
 * [ ] Fix bad fuzzy search
 * [ ] Customization options (position, CSS classes, themes)

## Contributors
 * [Armaldio](https://github.com/armaldio/)

## License

MIT © [Armaldio](https://armaldio.xyz)