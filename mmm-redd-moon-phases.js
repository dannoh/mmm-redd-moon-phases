/* global Log, Module */
/* MMM2 Module */

/* Dan Forsyth
 * Module: Moon Phases
 *
 * By Dan Forsyth https://github.com/dannoh/mmm-redd-moon-phases
 * MIT Licensed.
 */

Module.register("mmm-redd-moon-phases", {
    defaults: {
        retryDelay: 2500,
        size: 150,
        lightColor: 'rgb(255,255,230)',
        shadeColor: 'transparent',
        texturize: true,
        updateHour: 6,
        condensed: false,
        showType: true,
    },

    // Define required scripts.
    getScripts: function () {
        return ["moment.js"];

    },

    getStyles() {
        return ['mmm-redd-moon-phases.css'];
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList.add("redd-moon-phases");
        if (this.config.condensed)
            wrapper.classList.add("condensed");

        if (this.imgmoon) {
            if (this.config.showType) {
                var title = document.createElement("div");
                title.classList.add("redd-moon-phases-title");
                title.classList.add("dimmed");
                title.classList.add("small");
                title.innerHTML = `${this.imgmoon.npWidget}`;
                wrapper.appendChild(title);
            }
            var img = document.createElement("div");
            img.classList.add("redd-moon-phases-img");
            img.innerHTML = this.imgmoon.svg;
            wrapper.appendChild(img);
        }
        return wrapper;
    },

    // Define start sequence.
    start: function () {
        Log.info("Starting module: " + this.name);

        this.loaded = false;
        this.updateMoon();
        this.updateTimer = null;

    },

    updateMoon: function () {
        //TODO:DF Move shadeColor, size, lightColor and texturize into options
        const date = moment();
        if (date.getHours < this.config.updateHour)
            date = date.add(-1, 'd') //If we are before our update time, lets get 'yesterdays' moon because I'm assuming its the moon outside your window still...
        const url = `https://www.icalendar37.net/lunar/api/?lang=en&month=${date.month() + 1}&year=${date.year()}&day=${date.date()}&size=${this.config.size}&lightColor=${this.config.lightColor}&shadeColor=${this.config.shadeColor}&texturize=${this.config.texturize}`;
        Log.info(`Fetching Moon Phases from: ${url}`);
        fetch(url).then(response => response.json()).then(response => {
            Log.info(`Moon phase response: ${JSON.stringify(response)}`);
            this.imgmoon = response.phase[date.date().toString()];
            this.updateDom();
            this.scheduleUpdate();
        }).catch(e => {
            Log.error(e);
            this.imgmoon = undefined;
            this.scheduleUpdate();
        });
    },

    msToNextUpdate: function () {
        //https://stackoverflow.com/a/51521262/807079
        var now = moment();
        var deadline = now.clone().hour(this.config.updateHour).minute(0).second(0);
        if (now.isAfter(deadline)) {
            deadline = moment(new Date()).add(1, 'days').hour(this.config.updateHour).minute(0).second(0);
        }
        const result = deadline.diff(now, "seconds") * 1000;
        Log.info(`Next update at ${deadline.format()} in ${result}ms`);
        return result;
    },

    scheduleUpdate: function () {
        let nextLoad = this.msToNextUpdate()
        var self = this;
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(function () {
            self.updateMoon();
        }, nextLoad);
    },

});
