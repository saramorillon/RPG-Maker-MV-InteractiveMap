# RPG-Maker-MV-Achievements

RPG Maker MV Achievements allows you to create achievements in RPG Maker MV.

# Dependencies

This script needs [TouchInputUpdate](https://github.com/PicusViridis/RPG-Maker-MV-TouchInputUpdate)

# Usage

To open the interactive, use the module command "InteractiveMap open".

![InteractiveMap](https://raw.githubusercontent.com/PicusViridis/RPG-Maker-MV-InteractiveMap/master/Screenshots/Interactive%20Map.png)

Map images must be png files

# InteractiveMap.json

Place a file named InteractiveMap.json under the data directory. InteractiveMap.json must use UTF-8 encoding (you can change encoding when you save it with notepad.exe).

This file must be structured like that :

```json
[
  {
    "id": 1,
    "name": "Airport",
    "image": "airport",
    "x": 382,
    "y": 430,
	"textPosition": "bottom",
	"event": 1
  }
]
```

_If you need documentation about json files structure, please refer to : http://www.w3schools.com/json/_

_If you need to validate your json file (i.e. check that its structure is correct), you can use : https://jsonformatter.curiousconcept.com/_

__id__

Id of the map item.

__name__

Name of the map item.

__image__

Image of the map item.

__x__

X position of the map item.

__y__

Y position of the map item.

__textPosition__

Position of the name (top or bottom).

__event__

ID of the event launched when clicking on the map item.

# Module settings

__Images directory__

Interactive map images directory. Default is img/map.

__Map image__

Background of the interactive map. Default is "map".


# Credits

Feel free to use this script is commercial or non commercial games, but please give credits to Pivert somewhere in your game =)