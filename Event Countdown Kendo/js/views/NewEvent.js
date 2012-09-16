App.Views.NewEvent = Backbone.View.extend({
    
    events: {
       "click #saveNewEvent": "save"
    },
    
    initialize: function(options) {
        this.collection = options.collection; 
        
        _.bindAll(this, "pageShown");
        
        $(document).on("pageshow", '[data-role=page]', this.pageShown);
    },
   
    pageShown: function(e, ui) {
        this.$("form").each(function(){this.reset();});
    },
    
    save: function() {
        var data = {
            title: this.$("#input-title").val(),
            type: this.$("#input-type").val(),
            date: this.$("#input-date").val()
        };
        
        this.collection.create(data, {wait: true});
    }
    
});