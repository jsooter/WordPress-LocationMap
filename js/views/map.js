var locationMap = locationMap || {};
    locationMap.Views = locationMap.Views || {};

    locationMap.Views.Map = Backbone.View.extend({
        el: '#main',
        lat: null,
        lon: null,
        template: _.template(jQuery('#map_template').html()),
        events: {},
        initialize: function(options){
            console.log('locationMap.Views.Map init');
            if (typeof options != 'undefined') {
                if (typeof options.lat != 'undefined') {
                    this.lat = options.lat;
                }
                if (typeof options.lon != 'undefined') {
                    this.lon = options.lon;
                }
            }
            this.render();
        },
        render: function(){
            console.log('locationMap.Views.Map render');
            jQuery(this.el).empty();
            jQuery(this.el).append(this.template());
            window.user_location = ol.proj.fromLonLat([-113.956522,46.879038]);
            var olview = new ol.View({
                center: ol.proj.fromLonLat([-113.956522,46.879038]),
                //center: ol.proj.fromLonLat([-109.718963,48.558637]),
                zoom: 12,
                maxZoom: 21
            });
            //olview.on('change:center',function(){
            //    var center = ol.proj.transform(olview.getCenter(), 'EPSG:3857', 'EPSG:4326');
            //    var zoom = olview.getZoom();
            //    console.log(center);
            //    console.log(zoom);
            //});
            this.map =new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM({
                            url: 'https://mt.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
                            attributions: [
                                new ol.Attribution({ html: '© Google' }),
                                new ol.Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
                            ]
                        })
                    })
                ],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    dragPan: false,
                    rotate: false
                }).extend([new ol.interaction.DragPan({kinetic: null})]),
                view: olview
            });
            this.map.addControl(new ol.control.FullScreen());
            // this.map.addControl(new ol.control.ScaleLine({units:'us'}));
            // this.counties = new locationMap.Views.County({map:this.map});
            // console.log('came here');


            var geolocation = new ol.Geolocation({
                projection: olview.getProjection(),
                tracking: true
            });
            console.log(location.protocol);
            if (location.protocol === 'https:') {
                var that = this;
                geolocation.once('change', function(){
                    //save position and set map center
                    var pos = geolocation.getPosition();

                    that.map.getView().setCenter(pos);
                    window.user_location = pos;
                    console.log(window.user_location);
                    if(!that.locations){
                        that.locations = new locationMap.Views.Location({map:that.map});
                    }
                });
                var pos = geolocation.getPosition();
                this.map.getView().setCenter(pos);
                console.log('centered on geolocation');

                window.user_location = pos;
                //if(!that.locations){
                //    that.locations = new locationMap.Views.Location({map:this.map});
                //}
            } else {
                this.locations = new locationMap.Views.Location({map:this.map});
            }
            return this;
        }
    });
