// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

(function() {
    'use strict';

    freeboard.addStyle('.gm-style-cc a', 'text-shadow:none;');

    var googleMapWidget = function (settings) {
        var self = this;
        var BLOCK_HEIGHT = 60;

        var currentSettings = settings;
        var map = null,
            marker = null,
            poly = null;
        var mapElement = $('<div></div>');
        var currentPosition = {};

        function updatePosition() {
            if (!_.isNull(map) && !_.isNull(marker) && currentPosition.lat && currentPosition.lon) {
                var newLatLon = new google.maps.LatLng(currentPosition.lat, currentPosition.lon);
                marker.setPosition(newLatLon);
                if (currentSettings.drawpath)
                    poly.getPath().push(newLatLon);
                map.panTo(newLatLon);
            }
        }

        function setBlocks(blocks) {
            if (_.isUndefined(mapElement) || _.isUndefined(blocks))
                return;
            var height = BLOCK_HEIGHT * blocks;
            mapElement.css({
                'height': height + 'px',
                'width': '100%'
            });
            if (!_.isNull(map)) {
                google.maps.event.trigger(mapElement[0], 'resize');
                updatePosition();
            }
        }

        function createWidget() {
            if (_.isUndefined(mapElement))
                return;

            function initializeMap() {
                var mapOptions = {
                    zoom: 13,
                    center: new google.maps.LatLng(37.235, -115.811111),
                    disableDefaultUI: true,
                    draggable: false
                };

                map = new google.maps.Map(mapElement[0], mapOptions);

                var polyOptions = {
                    strokeColor: '#0091D1',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                };

                poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);

                google.maps.event.addDomListener(mapElement[0], 'mouseenter', function (e) {
                    e.cancelBubble = true;
                    if (!map.hover) {
                        map.hover = true;
                        map.setOptions({zoomControl: true});
                    }
                });

                google.maps.event.addDomListener(mapElement[0], 'mouseleave', function (e) {
                    if (map.hover) {
                        map.setOptions({zoomControl: false});
                        map.hover = false;
                    }
                });

                marker = new google.maps.Marker({map: map});

                updatePosition();
            }

            if (window.google && window.google.maps) {
                initializeMap();
            } else {
                window.gmap_initialize = initializeMap;
                head.js('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=gmap_initialize');
            }
        }

        this.render = function (element) {
            $(element).append(mapElement);
            setBlocks(currentSettings.blocks);
            createWidget();
        };

        this.onSettingsChanged = function (newSettings) {
            if (_.isNull(map)) {
                currentSettings = newSettings;
                return;
            }

            var updateCalculate = false;
            if (currentSettings.blocks != newSettings.blocks)
                setBlocks(newSettings.blocks);
            if (!newSettings.drawpath)
                poly.getPath().clear();

            if (currentSettings.lat != newSettings.lat || currentSettings.lon != newSettings.lon)
                updateCalculate = true;
            currentSettings = newSettings;
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName === 'lat')
                currentPosition.lat = newValue;
            else if (settingName === 'lon')
                currentPosition.lon = newValue;

            updatePosition();
        };

        this.onDispose = function () {
            // for memoryleak
            map = marker = poly = null;
        };

        this.onSizeChanged = function () {
            if (!_.isNull(map)) {
                google.maps.event.trigger(mapElement[0], 'resize');
                updatePosition();
            }
        };

        this.getHeight = function () {
            return currentSettings.blocks;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'google_map',
        display_name: $.i18n.t('plugins_wd.gmap.display_name'),
        description: $.i18n.t('plugins_wd.gmap.description'),
        fill_size: true,
        settings: [
            {
                name: 'blocks',
                display_name: $.i18n.t('plugins_wd.gmap.blocks'),
                validate: 'required,custom[integer],min[4],max[20]',
                type: 'number',
                style: 'width:100px',
                default_value: 4,
                description: $.i18n.t('plugins_wd.gmap.blocks_desc')
            },
            {
                name: 'lat',
                display_name: $.i18n.t('plugins_wd.gmap.lat'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.gmap.lat_desc')
            },
            {
                name: 'lon',
                display_name: $.i18n.t('plugins_wd.gmap.lon'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.gmap.lon_desc')
            },
            {
                name: 'drawpath',
                display_name: $.i18n.t('plugins_wd.gmap.drawpath'),
                type: 'boolean',
                default_value: false
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new googleMapWidget(settings));
        }
    });
}());
