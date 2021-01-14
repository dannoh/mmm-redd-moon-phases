# Magic Mirror Module: mmm-redd-moon-phases
This [MagicMirror2](https://github.com/MichMich/MagicMirror) module allows you to fetch an image of the moon in its current phase

![Condensed view screenshot](https://github.com/dannoh/mmm-redd-moon-phases/blob/main/images/condensed.png?raw=true)
![Full view screenshot](https://github.com/dannoh/mmm-redd-moon-phases/blob/main/images/full.png?raw=true)
## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
git clone https://github.com/dannoh/mmm-redd-moon-phases.git
````

Configure the module in your `config.js` file.

## Using the module

````javascript
modules: [
        {
                module: 'mmm-redd-moon-phases',
                header: 'Current Moon Phase',
                position: 'top_left',     
                config: {
                }
        },
]
````

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `size` | 150 | Size of the moon image. |
| `lightColor` | 'rgb(255,255,230)' | The width of the image. |
| `shadeColor` | 'transparent' | The width of the image. |
| `texturize` | true | Does the moon image have texture, or just a simple circle. |
| `updaateHour` | 6 | What time should we switch over to the next day.  Trying to have the mirror show what is in the sky currently. |
| `condensed` | false | Show a small sinle line view. |
| `showType` | true | Show the text name of the current phase. |

## Issues? 
Drop me a note in the Issues and I'll take a look.  This is my first MagicMirror module, it works for me.  I selected the API provider [https://www.icalendar37.net/lunar/app/](https://www.icalendar37.net/lunar/app/) because it was simplest and seemed to look best, but I'm open to others.
