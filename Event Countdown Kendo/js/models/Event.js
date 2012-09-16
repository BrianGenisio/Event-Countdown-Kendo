App.Models.Event = Backbone.Model.extend({
    
    formatNumber: function(value)
    {
        value += '';
        var matcher = /(\d+)(\d{3})/;
        while (matcher.test(value)) {
            value = value.replace(matcher, '$1' + ',' + '$2');
        }
        return value;
    },
    
    msAway: function() {
        var dueDate = new Date(this.get("date"));
        var today = new Date();
        return dueDate.getTime() - today.getTime();
    },
    
    calculateUnits: function(msInUnit) {
        return this.formatNumber(Math.ceil(this.msAway() / msInUnit));
    },
    
    daysAway: function() {
        return this.calculateUnits(1000 * 60 * 60 * 24);
    },
    
    hoursAway: function() {
        return this.calculateUnits(1000 * 60 * 60);
    },
    
    minutesAway: function() {
     	return this.calculateUnits(1000 * 60);
    },
    
    secondsAway: function() {
        return this.calculateUnits(1000);
    }
    
});

App.Collections.Events = Backbone.Collection.extend({
    model: App.Models.Event,
    localStorage: new Backbone.LocalStorage("SomeCollection")
});