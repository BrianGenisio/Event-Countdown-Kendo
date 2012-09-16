App.Views.EventDetail = Backbone.View.extend({
    
    events: {
        "click #removeEvent": "remove"
    },
    
    initialize: function(options) {
        this.collection = options.collection;
        
        _.bindAll(this, "updateModel", "render");
     	this.event_aggregator.bind("selectEvent", this.updateModel);
    },
    
    getHeader: function() {
      	switch(this.model.get('type')) {
        	case "birthday": return "Happy birthday";
            case "holiday": return "Happy holiday";
            case "party": return "Party time";
        }
        
        return "The event";
    },
    
    render: function() {
        this.$(".view-title").html(this.model.get('title'));
        this.$("#detail-background").attr("src", "images/" + this.model.get('type') + ".jpg");
        this.$("#detail-header").html(this.getHeader());
        this.$("#event-date").html(this.model.get("date"));
        this.$("#days-away").html(this.model.daysAway());
        this.$("#hours-away").html(this.model.hoursAway());
        this.$("#minutes-away").html(this.model.minutesAway());
        this.$("#seconds-away").html(this.model.secondsAway());
        this.$("#event-has-past").toggle(this.model.msAway() < 0);
        
        setTimeout(this.render, 1000);	
        
        return this;
    },
    
    updateModel: function(newModel) {
        this.model = newModel;
        this.render();
    },
    
    remove: function() {
        this.model.destroy();
        this.collection.remove(this.model);
    }
    
});