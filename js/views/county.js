var RecycleMap = RecycleMap || {};
    RecycleMap.Views = RecycleMap.Views || {};
    
    RecycleMap.Views.County = Backbone.View.extend({
        map: null,
        exchangeLayer: null,
        initialize: function(options){
            console.log('RecycleMap.Views.County init');
            if (typeof options != 'undefined') {
                if (typeof options.map != 'undefined') {
                    this.map = options.map;
                }
            }
            this.render();
        },
        render: function(){
            console.log('RecycleMap.Views.County render');
            var that = this;
            jQuery('script').each(function(){
                var src = jQuery(this).attr('src');
                var pattern = /ol\.js/;
                console.log(pattern.test(src));
                if (pattern.test(src)) {
                    that.file_path = src.replace('ol.js','county.json');
                    console.log(that.file_path);
                }
            });
            this.exchangeLayer = new ol.layer.Vector({
                title: 'Counties',
                style: function(feature){
                    var properties = feature.getProperties();
                    var text = properties.name;
                    return [
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(224,160,36,.25)',
                                width: 2
                            })
                        }),
                        new ol.style.Style({
                            text: new ol.style.Text({
                                textAlign: 'center',
                                textBaseline: 'middle',
                                font: '10px Verdana',
                                text: text,
                                fill: new ol.style.Fill({
                                    color: 'rgba(41,74,112,.25)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color:'rgba(0,0,0,.25)'
                                })
                            })
                        })
                    ]
                },
                source: new ol.source.Vector({
                    url: that.file_path,
                    format: new ol.format.GeoJSON()
                })
            });
            this.map.addLayer(this.exchangeLayer);
            return this;
        }
    });