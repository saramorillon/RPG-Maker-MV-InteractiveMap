/*jslint vars: true, nomen: true, plusplus: true, eqeq: true */
/*globals console*/
/*globals Scene_Map*/
/*globals Graphics, Sprite, Bitmap, TouchInput, Game_Interpreter, PluginManager, ImageManager, SceneManager */
/*globals $gameMap, $gameSwitches */
//=============================================================================
// Menu.js
//=============================================================================

/*:
 * @plugindesc Pivert Interactive map.
 * @author Pivert
 *
 * @param Images directory
 * @desc The directory where map images are stored
 * @default img/map
 *
 * @param Font size
 * @desc The font size of map texts
 * @default 16
 *
 */

(function () {

    "use strict";

    var parameters = PluginManager.parameters('InteractiveMap');

    var imageDirectory = String(parameters['Images directory'] || 'img/map');
    var fontSize = Number(parameters['Font size'] || 16);

    var map;

    //=============================================================================
    // Interactive Map
    //=============================================================================
    var Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        Scene_Map_update.call(this);

        if (this._showMap) {

            var i, x, y, w, h;

            var tX = TouchInput._cursorX;
            var tY = TouchInput._cursorY;

            document.body.style.cursor = 'inherit';

            for (i = 0; i < map.length; i++) {
                x = map[i].x;
                y = map[i].y;
                w = map[i].image.width;
                h = map[i].image.height;

                if (!map[i].trigger || $gameSwitches.value(map[i].trigger)) {
                    this._sprites[map[i].id].visible = true;
                }

                if (tX >= x && tX <= x + w && tY >= y && tY <= y + h) {

                    if (!map[i].trigger || $gameSwitches.value(map[i].trigger)) {
                        document.body.style.cursor = 'pointer';
                        this._texts[map[i].id].visible = true;
                    }

                    if (TouchInput.isTriggered() && (!map[i].trigger || $gameSwitches.value(map[i].trigger))) {
                        var event = $gameMap.event(map[i].event);
                        if (event) {
                            event.start();
                            break;
                        }
                    }
                } else {
                    this._texts[map[i].id].visible = false;
                }
            }
        }
    };

    Scene_Map.prototype.initSprites = function () {
        var i, x, y, w, h;

        this._sprites = {};
        this._texts = {};

        // Image
        for (i = 0; i < map.length; i++) {
            x = map[i].x;
            y = map[i].y;
            w = map[i].image.width;
            h = map[i].image.height;

            var imageSprite = new Sprite(map[i].image);
            imageSprite.x = x;
            imageSprite.y = y;
            imageSprite.visible = !map[i].trigger || $gameSwitches.value(map[i].trigger);
            this.addChild(imageSprite);
            this._sprites[map[i].id] = imageSprite;
        }

        // Text
        for (i = 0; i < map.length; i++) {
            x = map[i].x;
            y = map[i].y;
            w = map[i].image.width;
            h = map[i].image.height;

            var offset = Graphics.boxWidth - (x + w) - 5;
            x -= offset;
            w += 2 * offset;
            if (map[i].textPosition === 'top') {
                y -= 40;
            } else if (map[i].textPosition === 'bottom') {
                y += h;
            }

            var bitmap = new Bitmap(w, 50);
            bitmap.fontSize = fontSize;
            bitmap.drawText(map[i].name, 0, 6, w, 20, 'center');

            var textSprite = new Sprite(bitmap);
            textSprite.x = x;
            textSprite.y = y;
            textSprite.visible = false;
            this.addChild(textSprite);
            this._texts[map[i].id] = textSprite;
        }
    };

    Scene_Map.prototype.showMap = function () {
        this._showMap = true;
        if (!this._init) {
            this._init = true;
            this.initSprites();
        }
    };

    var loadMaps = function () {

        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', 'data/InteractiveMap.json');

        xhr.onload = function () {
            if (xhr.status < 400) {
                try {
                    map = JSON.parse(xhr.responseText);
                    var i;
                    for (i = 0; i < map.length; i++) {
                        map[i].image = ImageManager.loadBitmap(imageDirectory + '/', map[i].image);
                    }
                } catch (e) {
                    console.error('Could not load script');
                    console.error(e);
                }
            } else {
                console.error('File data/InteractiveMap.json not found');
            }
        };

        xhr.onerror = function (e) {
            console.error('Error while fetching data/InteractiveMap.json');
            console.error(e);
        };

        xhr.send();
    };

    loadMaps();

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'InteractiveMap' && args[0] === 'open' && map) {
            SceneManager._scene.showMap();
        }
    };

}());
