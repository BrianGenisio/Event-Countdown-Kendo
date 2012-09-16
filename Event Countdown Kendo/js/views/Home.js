
App.Templates.HomeList = '<ul data-role="listview"></ul>';

App.Views.Home = Backbone.View.extend({ 
    template: _.template(App.Templates.HomeList),
    
    initialize: function() {
        _.bindAll(this, "renderItem", "render");
        this.model.bind("reset", this.render);
        this.model.bind("add", this.render);
        this.model.bind("remove", this.render);
    },
    
    render: function() {
        this.$(".nav", this.el).html(this.template());
        this.model.each(this.renderItem);
        this.$(".nav ul", this.el).kendoMobileListView();
        return this;
    },
    
    renderItem: function(item) {
    	var newView = new App.Views.HomeItem({model: item});
        this.$(".nav ul", this.el).append(newView.render().el);
    }
    
});



App.Templates.HomeItem = '<a href="#eventDetail" data-transition="slide" class="eventItem" data-id="<%= id %>">' +
                            '<div class="title"><%= title %></div>' +
                            '<div class="date"><%= daysAway %></div>' +
                         '</a>';

App.Views.HomeItem = Backbone.View.extend({
    tagName: 'li',
    template: _.template(App.Templates.HomeItem),
    
    events: {
        "click": "selected"
    },
    
    dateDisplay: function() {
        var daysAway = this.model.daysAway();
        var daysString = Math.abs(daysAway) > 1 ? "days" : "day";
        
        if(daysAway < 0) return Math.abs(daysAway) + " " + daysString + " ago";
        if(daysAway == 0) return "today";
        return daysAway + " " + daysString + " away";
    },
    
    render: function() {
        var data = this.model.toJSON();
        data.daysAway = this.dateDisplay();
        
        this.$el.append(this.template(data));
        
        return this;
    },
    
    selected: function() {
        this.event_aggregator.trigger("selectEvent", this.model);
    }
});