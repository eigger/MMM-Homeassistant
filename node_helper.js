var NodeHelper = require('node_helper');
var got = require('got');

module.exports = NodeHelper.create({
	start: function () {
		if(config.debuglogging) { console.log('MMM-Homeassistant helper started...') };
	},

	getStates: function (config) {
		var self = this;
		for (const entity of config.entities) {
			var url = config.url + '/api/states/' + entity.id;
			var instance = got.extend({
			hooks: {
				beforeRequest: [
					options => {
						if (!options.context || !options.context.token) {
							throw new Error('Long Lived Token required');
						}
						json: true;
						options.headers = {'Authorization' : 'Bearer ' + options.context.token}
					}
				]
			}
			});
			(async () => {
				var context = {
					token: config.token
				};

				try {
					var response = await instance(url, {context});
					if (response.statusCode == 200) {
						if(config.debuglogging) { console.log('MMM-Homeassistant response successfull. calling STATES_RESPONSE') };
						self.sendSocketNotification('STATES_RESPONSE', JSON.parse(response.body));
					}
					if(config.debuglogging) {
						console.log('MMM-Homeassistant Body:', response.body);
						console.log('MMM-Homeassistant statusCode:', response.statusCode);
					}
				} catch (error) {
					console.log('MMM-Homeassistant - Connection Failed: ' + error.response.body);
				}
			})();
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_STATES') {
			this.getStates(payload);
		}
	}
});
