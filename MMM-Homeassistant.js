"use strict";

Module.register("MMM-Homeassistant", {
    responseArray: {}, 
    defaults: {
        prettyName: true,
        stripName: true,
        title: "Home Assistant",
        url: "http://homeassistant.local:8123",
        token: "",
        updateInterval: 300000,
        displaySymbol: true,
        debuglogging: false,
        entities: []
    },

    getStyles: function() {
        return [
            "MMM-Homeassistant.css"
        ];
    },

    start: function() {
        this.getStates();
        this.scheduleUpdate();
    },

    isEmpty: function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    getDom: function() {
        const wrapper = document.createElement("ticker");
        wrapper.className = "dimmed small";

        const dataArray = this.responseArray;
        const statElement = document.createElement("header");
        statElement.innerHTML = this.config.title;
        wrapper.appendChild(statElement);
    
        if (dataArray === undefined || dataArray.length === 0) {
            const error = document.createElement("span");
            error.innerHTML = "Error fetching states.";
            wrapper.appendChild(error);
            return wrapper;
        }

        const tableElement = document.createElement("table");
        for (const entity of this.config.entities) {
            if (dataArray[entity.id] === undefined) continue;
            const icons = entity.icons;
            const value = this.getValue(dataArray[entity.id], entity);
            const name = this.getName(dataArray[entity.id], entity);
            const unit = this.getUnit(dataArray[entity.id], entity);
            const alertThreshold = entity.alertThreshold;

            if (value) {
                tableElement.appendChild(
                    this.addValue(name, value, unit, icons, alertThreshold)
                );
            }
        }
        wrapper.appendChild(tableElement);
        return wrapper;
    },

    getValue: function(data, entity) {
        const item = data;
        if (entity.attributes === undefined) {
            return item.state;
        }
        const values = entity.attributes.map(attr => {
            if (attr === 'state') {
                return item.state;
            }
            return item.attributes[attr] !== undefined ? item.attributes[attr] : null;
        }).filter(Boolean);
        return values.join(' | ');
    },

    getUnit: function(data, entity) {
        const item = data;
        return item && item.attributes.unit_of_measurement ? item.attributes.unit_of_measurement : "";
    },

    getName: function(data, entity) {
        if (entity.name && entity.name !== "") {
            return entity.name;
        }
        const item = data;
        return item ? item.attributes.friendly_name : null;
    },

    addValue: function(name, value, unit, icons, alertThreshold) {
        const newrow = document.createElement("tr");
        if (!isNaN(alertThreshold) && alertThreshold < value) {
            newrow.className += "blink";
        }
        name = this.processName(name);
    
        // icons
        const iconCell = newrow.insertCell(0);
        iconCell.className = "icon";
        this.setIconCell(iconCell, value, icons);
    
        // Name
        const nameCell = newrow.insertCell(1);
        nameCell.className = "name";
        nameCell.appendChild(document.createTextNode(name));
    
        // Value
        const valueCell = newrow.insertCell(2);
        valueCell.className = "value";
        valueCell.appendChild(document.createTextNode(value));
    
        // Unit
        const unitCell = newrow.insertCell(3);
        unitCell.className = "unit";
        unitCell.appendChild(document.createTextNode(unit));
    
        return newrow;
    },

    processName: function(name) {
        if (this.config.stripName) {
            const split = name.split(".");
            name = split[split.length - 1];
        }
    
        if (this.config.prettyName) {
            name = name
                .replace(/([A-Z])/g, "_$1").toLowerCase()
                .split("_").join(" ")
                .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
        
        return name;
    },

    setIconCell: function(cell, value, icons) {
        if (!this.config.displaySymbol) return;
        console.log(icons);
        let iconName = icons.default;
        console.log(iconName);
        if (icons[value] !== undefined) {
            iconName = icons[value];
        }
        if (iconName) {
            const iconElement = document.createElement("i");
            iconElement.className = "fa fa-" + iconName;
            cell.appendChild(iconElement);
        }
    },

    scheduleUpdate: function(delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }
        var self = this;
        setInterval(function() {
            self.getStates();
        }, nextLoad);
    },

    getStates: function() {
        this.sendSocketNotification("GET_STATES", this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "STATES_RESPONSE") {
            if (payload.entity_id !== undefined)
            {
                this.responseArray[payload.entity_id] = payload;
                var lastEntity = this.config.entities[this.config.entities.length - 1];
                if (lastEntity.id == payload.entity_id)
                {
                    var fade = 500;
                    this.updateDom(fade);
                }
            }
        }
    }
});
