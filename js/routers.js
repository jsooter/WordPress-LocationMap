var RecycleMap = RecycleMap || {};
    RecycleMap.Routers = RecycleMap.Routers || {};
    
    RecycleMap.Routers.Map = Backbone.Router.extend({
        mapView: null,
        routes: {
            "" : "start",
            "*actions" : "defaultRoute"
        },
        start: function(){
            console.log('Init route');
            this.view = new RecycleMap.Views.Map();
        },
        defaultRoute: function(){
            console.log('Router does not handle this route');
        }
    });
    
    RecycleMap.Routers.Location = Backbone.Router.extend({
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
            this.view = new RecycleMap.Views.Location();
        },
        defaultRoute: function(){
            console.log('Router does not handle this route');
        }
    })