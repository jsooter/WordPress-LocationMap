var RecycleMap = RecycleMap || {};
    RecycleMap.Views = RecycleMap.Views || {};

    RecycleMap.Views.Location = Backbone.View.extend({
        el: '#locations',
        map: null,
        locations: [],
        exchangeLayer: null,
        location_layers: null,
        template: _.template(jQuery('#locations_template').html()),
        events: {
            'change #toggles select' : 'filterPoints'
        },
        initialize: function(options){
            console.log('RecycleMap.Views.Location init');
            if (typeof options != 'undefined') {
                if (typeof options.map != 'undefined') {
                    this.map = options.map;
                }
            }
            var that = this;
            jQuery('script').each(function(){
                var src = jQuery(this).attr('src');
                var pattern = /ol\.js/;
                //console.log(pattern.test(src));
                if (pattern.test(src)) {
                    that.file_path = src.replace('ol.js','locations.csv');
                }
            });
            jQuery.get(this.file_path, function(data){
                csv2geojson.csv2geojson(data, {
                    latfield: 'lat',
                    lonfield: 'lon',
                    delimiter: ','
                }, function(err, data){
                    that.locations = data;
                    that.rows    = [];
                    that.columns = [];
                    _.each(data.features,function(feature){
                        var row = [];
                        if (that.columns.length == 0){
                            keys = Object.keys(feature.properties);
                            that.titles = keys;
                            _.each(keys,function(col){
                                column = {};
                                column['title'] = col;
                                that.columns.push(column);
                            });
                        }
                        _.each(feature.properties, function(value,key){
                            row.push(value);
                        });
                        that.rows.push(row);
                    });
                    // console.log(that.columns);
                    // console.log(that.rows);
                    // console.log(that.titles);
                    that.render();
                });
            });
        },
        render: function(){
            console.log('RecycleMap.Views.Location render');
            jQuery(this.el).empty();
            jQuery(this.el).append(this.template({location_layers:this.titles}));
            //var httpRequest = new XMLHttpRequest();
            var that = this;
            this.locationLayer = new ol.layer.Vector({
                title: 'Locations',
                style: function(feature){
                    var zoom = that.map.getView().getZoom();
                    //console.log(feature);
                    var properties = feature.getProperties();
                    //console.log(properties);
                    var text = properties.name;
                    var styles = [];
                    styles.push(
                        new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    color: 'rgba(127,255,0,1)',
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(127,255,0,1)',
                                })
                            })
                        })
                    );
                    if(zoom >= 12){
                        styles.push(
                            new ol.style.Style({
                                text: new ol.style.Text({
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                    font: '10px Verdana',
                                    text: text,
                                    fill: new ol.style.Fill({
                                        color: 'rgba(41,74,112,1)'
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color:'rgba(0,0,0,1)'
                                    })
                                })
                            })
                        );
                    }
                    return styles;
                },
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON()
                })
            });
            var geoJsonFormat = new ol.format.GeoJSON();
            var features = geoJsonFormat.readFeatures(
                that.locations, {
                    featureProjection: 'EPSG:3857'
                }
            );
            this.locationLayer.getSource().addFeatures(features);
            this.map.addLayer(this.locationLayer);
            var container = jQuery('#popup')[0];
            var content = jQuery('#popup-content')[0];
            var closer = jQuery('#popup-closer')[0];
            var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            }));
            this.map.addOverlay(overlay);
            closer.onclick = function() {
                jQuery(content).html('');
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
            that = this;
            this.clickEvent = this.map.on("click", function(e) {
                console.log('click');
                jQuery(content).html('');
                var coordinate = e.coordinate;
                var sub_here = false;
                that.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                    if (typeof feature != 'undefined') {
                        var layer_properties = layer.getProperties();
                        if (layer_properties.title == 'Locations') {
                            var user_coords = ol.proj.transform(window.user_location, 'EPSG:3857', 'EPSG:4326');
                            var feature_properties = feature.getProperties();
                            var feature_coords = ol.proj.transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
                            // console.log(feature_properties);
                            // console.log(feature_coords);
                            // console.log(user_coords);
                            var name = (feature_properties.name == null) ? 'NA' : feature_properties.name.toString();
                            var address = (feature_properties.address == null) ? 'NA' : feature_properties.address.toString();
                            jQuery(content).append('<p class="uk-text-large"><a href="https://www.google.com/maps/dir/'+user_coords[1]+','+user_coords[0]+'/'+feature_coords[1]+','+feature_coords[0]+'" target="_blank">'+name+'<br>'+address+'</a></p>');
                            sub_here = true;
                        }
                    }
                });
                if (sub_here) {
                    overlay.setPosition(coordinate);
                } else {
                    overlay.setPosition(undefined);
                }
            });
            // this.renderTable();
            this.positionToggles();
            this.renderList();
            return this;
        },
        renderTable: function(){
            console.log(window.user_location);
            that = this;
            this.dataTable = jQuery('#location_table').DataTable( {
                data         : that.rows,
                columns      : that.columns,
                processing   : true,
                scrollY      : function(){
                    var wh = document.body.clientHeight;
                    var h = wh - 250;
                    if(h < 300){
                        return '300px';
                    }
                    return h+'px';
                },
                scrollX      : true,
                paging       : false,
                fixedColumns : true,
                columnDefs: [{
                    render: function(data){
                        if (data == 'yes') {
                            return '<i class="checkmark icon"></i><span style="display:none;">yes</span>';
                        }
                        return data;
                    },
                    // targets: [4,5,6,7,8,9,10,11,12,13,14,15]
                }],
                order: [[3,"asc"]]
            });

            that = this;
            jQuery(window).resize(function () {
                console.log('resize');
                that.positionToggles();
                // that.dataTable.columns.adjust().draw();
            });
            jQuery('#location_table tbody').on('click','tr',function(){
                var data = that.dataTable.row(this).data();
                var coords = data.geometry.coordinates;
                console.log(coords);
                that.map.getView().setCenter(ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857'));
            });
        },
        renderList: function(){
            console.log(this.locations);
            _.each(this.locations.features,function(feature){
                console.log(feature.properties);
                listItem = new RecycleMap.Views.LocationListItem({location:feature.properties});
            });
        },
        positionToggles: function(){
            // .position() uses position relative to the offset parent,
            var pos = jQuery('#map').position();
            // .outerWidth() takes into account border and padding.
            var width = jQuery('#map').outerWidth();
            //show the menu directly over the placeholder
            jQuery("#toggles").css({
                position: "absolute",
                top: (pos.top + 6) + "px",
                // left: (pos.left + width - 150)+ "px"
            }).show();
        },
        filterPoints: function(){
            // TODO create style function set text on zoom
            // returns array of styles based on zoom
            var zoom = this.map.getView().getZoom();
            var layerSourceFeatures = this.locationLayer.getSource().getFeatures();
            var type = jQuery('#toggles select').val();
            for(i=0;i<layerSourceFeatures.length;i++) {
                var feature    = layerSourceFeatures[i];
                var properties = feature.getProperties();
                var emptyImgStyle = new ol.style.Style({ image: '' });
                var circleStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(127,255,0,1)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(127,255,0,1)',
                        })
                    })
                });
                var labelStyle = new ol.style.Style({
                    text: new ol.style.Text({
                        textAlign: 'center',
                        textBaseline: 'middle',
                        font: '10px Verdana',
                        text: properties.name,
                        fill: new ol.style.Fill({
                            color: 'rgba(41,74,112,1)'
                        }),
                        stroke: new ol.style.Stroke({
                            color:'rgba(0,0,0,1)'
                        })
                    })
                });
                feature.setStyle(emptyImgStyle);
                console.log(type,properties[type]);
                if (type == 'all') {
                    feature.setStyle([circleStyle,labelStyle]);
                } else if (properties[type] !== '' && properties[type] !== 'no') {
                    feature.setStyle([circleStyle,labelStyle]);
                } else {
                    feature.setStyle(emptyImgStyle);
                }
            }
            if (type == 'all') {
                // this.dataTable.columns().search('').draw();
            } else {
                // this.dataTable.columns().search('').draw();
                // this.dataTable.columns(this.location_layers[type]).search('.*[\S]+.*',true,false).draw();
            }
        }
    });

    RecycleMap.Views.LocationListItem = Backbone.View.extend({
        el: '#location_list',
        map: null,
        location: null,
        template: _.template(jQuery('#location_list_item_template').html()),
        events: {
            'change #toggles select' : 'filterPoints'
        },
        initialize: function(options){
            console.log(options);
            if(typeof options != 'undefined'){
                if(typeof options.location != 'undefined'){
                    this.location = options.location;
                }
            }
            this.render();
        },
        render: function(){
            // jQuery(this.el).empty();
            jQuery(this.el).append(this.template(this.location));
        },
        drop: function(){
            this.undelegateEvents();
        }
    });
