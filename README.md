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
| `host`           | The hostname or ip adress of the home assistant instance. <br><br> **Default:** `REQUIRED hassio.local`       |
| `port`           | port of homeassistant e.g. 443 for SSL. <br><br> **Default:** `8321`                                          |
| `https`          | is SSL enabled on home assistant (true/false) <br><br> **Default:** `REQUIRED false`                          |
| `token`          | The long lived token. <br><br> **Default:** `REQUIRED`                                                        |
| `updateInterval` | The time between updates (In milliseconds). <br><br> **Default:** `300000 (5 minutes)`                        |
| `entities`         | Specify specific values from the json feed to only show what you need (entity_id).                            |

## values option

| Option           | Description                                                                                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `entity_id` from Home Assistant. Please have a look at the states pages for the unique `entity_id` of your id                                                                                           |
| `name`           | The name of the value to display. If you omit this, `friendly_name` from Home Assistant will be displayed.                                                                                                  |
| `alertThreshold` | As soon as the measured value of the sensor exceeds the configured threshold, the entry will begin to 'blink'. <br><br> **Default:** `off`                                                                  |
| `attributes`     | Array of sensor attributes to show. If not set, only show sensor state. If set, you can add as many attributes as you want, if you want to show the state as well add `'state'`. <br><br> **Default:** `[]` |
| `icons`          | Icons object for the on/off status of sensor. see: [Fontawesome](https://fontawesome.com/)                                                                                                  |

## icons option

| Option         | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `default`      | Default icon of the sensor. In case there is no on/off status, like processor use. |
| `state_on`     | On status icon of the sensor                                                       |
| `state_off`    | Off status icon of the sensor                                                      |
| `state_open`   | Open status icon of the sensor                                                     |
| `state_closed` | Closed status icon of the sensor                                                   |

Here is an example of an entry in `config.js`

```
modules: [{
		module: 'MMM-Homeassistant',
		position: 'top_left',
		config: {
			host: "YOUR_HASS_HOST",
			port: "8123",
			https: false,
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
							"state_off": "run",
							"state_on": "run-fast"
						}
					]
				}, {
					id: "switch.reception_spot",
					icons: [{
							"state_off": "lightbulb-outline",
							"state_on": "lightbulb-on-outline"
						}
					]
				}
			]

		}
	}
]
```
