var LocationMap = LocationMap || {};
    LocationMap.Routers = LocationMap.Routers || {};
    
    LocationMap.Routers.Map = Backbone.Router.extend({
        mapView: null,
        routes: {
            "" : "start",
            "*actions" : "defaultRoute"
        },
        start: function(){
            console.log('Init route');
            this.view = new LocationMap.Views.Map();
        },
        defaultRoute: function(){
            console.log('Router does not handle this route');
        }
    });
    
    LocationMap.Routers.Location = Backbone.Router.extend({
        mapView: null,
        routes: {
            "" : "start",
            
            "location/new"        : "addLocation",
            "location/edit/:line" : "editLocation",
            "location/upload"     : "uploadForm",
            
            "*actions"     : "defaultRoute"
        },
        start: function(){
            console.log('Init route');
            this.view = new LocationMap.Views.Location();
        },
        defaultRoute: function(){
            console.log('Router does not handle this route');
        }
    })