window.App = {
    Models: {},
    Collections: {},
    Templates: {},
    Views: {},
    Routers: {}
};

var event_aggregator = _.extend({}, Backbone.Events);
_.each([Backbone.Model, Backbone.Collection, Backbone.View, Backbone.Router], 
       function (klass) { klass.prototype.event_aggregator = event_aggregator; });

var onDeviceReady = function() {
    var model = new App.Collections.Events();
    var homeView = new App.Views.Home({model: model, el: $('#home')});
    homeView.render();
    
    
    App.eventDetailView = new App.Views.EventDetail({el: $('#eventDetail'), collection: model});
    App.newEventView = new App.Views.NewEvent({el: $('#newEvent'), collection: model});
    
    model.fetch();
    
}

function show() {
    App.newEventView.pageShown();
}

document.addEventListener("deviceready", onDeviceReady, false);