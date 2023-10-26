# MMM-Homeassistant

## Installation
1. Navigate to your local `MagicMirror/modules` directory
2. run `git clone https://github.com/eigger/MMM-Homeassistant.git`

## Configuration

It is very simple to set up this module, a sample configuration looks like this:

## Configuration Options

| Option           | Description                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `prettyName`     | Pretty print the name of each JSON key (remove camelCase and underscores). <br><br> **Default:** `true`       |
| `stripName`      | Removes all keys before the printed key. <br><br>**Example:** `a.b.c` will print `c`.<br> **Default:** `true` |
| `title`          | Title to display at the top of the module. <br><br> **Default:** `Home Assistant`                             |
| `url`            | The url of the home assistant instance. <br><br> **Default:** `REQUIRED http://homeassistant.local:8123`      |
| `token`          | The long lived token. <br><br> **Default:** `REQUIRED`                                                        |
| `updateInterval` | The time between updates (In milliseconds). <br><br> **Default:** `300000 (5 minutes)`                        |
| `entities`       | Specify specific values from the json feed to only show what you need (entity_id).                            |

## values option

| Option           | Description                                                                                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `entity_id` from Home Assistant. Please have a look at the states pages for the unique `entity_id` of your id                                                                                           |
| `name`           | The name of the value to display. If you omit this, `friendly_name` from Home Assistant will be displayed.                                                                                                  |
| `alertThreshold` | As soon as the measured value of the sensor exceeds the configured threshold, the entry will begin to 'blink'. <br><br> **Default:** `off`                                                                  |
| `attributes`     | Array of sensor attributes to show. If not set, only show sensor state. If set, you can add as many attributes as you want, if you want to show the state as well add `'state'`. <br><br> **Default:** `[]` |
| `icons`          | Icons object for the on/off status of sensor. see: [Material Design Icons]([https://fontawesome.com/](https://pictogrammers.com/library/mdi/))                                                             |

## icons option

| Option         | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `default`      | Default icon of the sensor. In case there is no on/off status, like processor use. |

Here is an example of an entry in `config.js`

```
modules: [{
		module: 'MMM-Homeassistant',
		position: 'top_left',
		config: {
			url: "YOUR_HASS_URL",
			token: "YOUR_LONG_LIVED_HASS_TOKEN",
			prettyName: false,
			stripName: false,
			debuglogging: false,
			entities: [{
					id: "sensor.processor_use",
					alertThreshold: 50,
					icons: [{
							"default": "chip"
						}
					]
				}, {
					id: "binary_sensor.sensor",
					name: "Hallway Sensor",
					icons: [{
							"off": "run",
							"on": "run-fast"
						}
					]
				}, {
					id: "switch.reception_spot",
					icons: [{
							"off": "lightbulb-outline",
							"on": "lightbulb-on-outline"
						}
					]
				}
			]

		}
	}
]
```
