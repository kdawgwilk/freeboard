// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

(function () {
    'use strict';

    var openWeatherMapDatasource = function (settings, updateCallback) {
        var self = this;
        var updateTimer = null;
        var currentSettings = settings;

        function updateRefresh(refreshTime) {
            if (updateTimer) {
                clearInterval(updateTimer);
            }

            updateTimer = setInterval(function () {
                self.updateNow();
            }, refreshTime);
        }

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        updateRefresh(currentSettings.refresh * 1000);

        this.updateNow = function () {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(currentSettings.location) + "&units=" + currentSettings.units,
                dataType: "JSONP",
            })
            .done(function (data) {
                // Rejigger our data into something easier to understand
                var easy = {
                    place_name: data.name,
                    latitude: data.coord.lat,
                    longitude: data.coord.lon,
                    sunset: moment.unix(data.sys.sunset * 1000).format('HH:mm:ss'), // Bug value the opposite
                    sunrise: moment.unix(data.sys.sunrise * 1000).format('HH:mm:ss'),
                    conditions: toTitleCase(data.weather[0].description),
                    current_temp: data.main.temp,
                    high_temp: data.main.temp_max,
                    low_temp: data.main.temp_min,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    wind_direction: data.wind.deg
                };
                updateCallback(_.merge(data, easy));
            })
            .fail(function (xhr, status) {
                console.error('Open Weather Map API error: ' + status);
            });
        };

        this.onDispose = function () {
            clearInterval(updateTimer);
            updateTimer = null;
        };

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            self.updateNow();
            updateRefresh(currentSettings.refresh * 1000);
        };
    };

    freeboard.loadDatasourcePlugin({
        type_name: "openweathermap",
        display_name: $.i18n.t('plugins_ds.owm.display_name'),
        description: $.i18n.t('plugins_ds.owm.description'),
        settings: [
            {
                name: "location",
                display_name: $.i18n.t('plugins_ds.owm.location'),
                validate: "required,maxSize[200]",
                type: "text",
                description: $.i18n.t('plugins_ds.owm.location_desc')
            },
            {
                name: "units",
                display_name: $.i18n.t('plugins_ds.owm.units'),
                style: "width:200px",
                type: "option",
                default_value: "metric",
                options: [
                    {
                        name: $.i18n.t('plugins_ds.owm.units_metric'),
                        value: "metric"
                    },
                    {
                        name: $.i18n.t('plugins_ds.owm.units_imperial'),
                        value: "imperial"
                    }
                ]
            },
            {
                name: "refresh",
                display_name: $.i18n.t('plugins_ds.owm.refresh'),
                validate: "required,custom[integer],min[5]",
                style: "width:100px",
                type: "number",
                suffix: $.i18n.t('plugins_ds.owm.refresh_suffix'),
                default_value: 5
            }
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new openWeatherMapDatasource(settings, updateCallback));
        }
    });
}());