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

    var yahooWeatherDatasource = function (settings, updateCallback) {
        var self = this;
        var updateTimer = null;
        var currentSettings = settings;

        // condition code
        var conditionMap = [
            $.i18n.t('plugins_ds.yahooweather.cond_0'),     // 0   tornado
            $.i18n.t('plugins_ds.yahooweather.cond_1'),     // 1   tropical storm
            $.i18n.t('plugins_ds.yahooweather.cond_2'),     // 2   hurricane
            $.i18n.t('plugins_ds.yahooweather.cond_3'),     // 3   severe thunderstorms
            $.i18n.t('plugins_ds.yahooweather.cond_4'),     // 4   thunderstorms
            $.i18n.t('plugins_ds.yahooweather.cond_5'),     // 5   mixed rain and snow
            $.i18n.t('plugins_ds.yahooweather.cond_6'),     // 6   mixed rain and sleet
            $.i18n.t('plugins_ds.yahooweather.cond_7'),     // 7   mixed snow and sleet
            $.i18n.t('plugins_ds.yahooweather.cond_8'),     // 8   freezing drizzle
            $.i18n.t('plugins_ds.yahooweather.cond_9'),     // 9   drizzle
            $.i18n.t('plugins_ds.yahooweather.cond_10'),    // 10  freezing rain
            $.i18n.t('plugins_ds.yahooweather.cond_11'),    // 11  showers
            $.i18n.t('plugins_ds.yahooweather.cond_12'),    // 12  showers
            $.i18n.t('plugins_ds.yahooweather.cond_13'),    // 13  snow flurries
            $.i18n.t('plugins_ds.yahooweather.cond_14'),    // 14  light snow showers
            $.i18n.t('plugins_ds.yahooweather.cond_15'),    // 15  blowing snow
            $.i18n.t('plugins_ds.yahooweather.cond_16'),    // 16  snow
            $.i18n.t('plugins_ds.yahooweather.cond_17'),    // 17  hail
            $.i18n.t('plugins_ds.yahooweather.cond_18'),    // 18  sleet
            $.i18n.t('plugins_ds.yahooweather.cond_19'),    // 19  dust
            $.i18n.t('plugins_ds.yahooweather.cond_20'),    // 20  foggy
            $.i18n.t('plugins_ds.yahooweather.cond_21'),    // 21  haze
            $.i18n.t('plugins_ds.yahooweather.cond_22'),    // 22  smoky
            $.i18n.t('plugins_ds.yahooweather.cond_23'),    // 23  blustery
            $.i18n.t('plugins_ds.yahooweather.cond_24'),    // 24  windy
            $.i18n.t('plugins_ds.yahooweather.cond_25'),    // 25  cold
            $.i18n.t('plugins_ds.yahooweather.cond_26'),    // 26  cloudy
            $.i18n.t('plugins_ds.yahooweather.cond_27'),    // 27  mostly cloudy (night)
            $.i18n.t('plugins_ds.yahooweather.cond_28'),    // 28  mostly cloudy (day)
            $.i18n.t('plugins_ds.yahooweather.cond_29'),    // 29  partly cloudy (night)
            $.i18n.t('plugins_ds.yahooweather.cond_30'),    // 30  partly cloudy (day)
            $.i18n.t('plugins_ds.yahooweather.cond_31'),    // 31  clear (night)
            $.i18n.t('plugins_ds.yahooweather.cond_32'),    // 32  sunny
            $.i18n.t('plugins_ds.yahooweather.cond_33'),    // 33  fair (night)
            $.i18n.t('plugins_ds.yahooweather.cond_34'),    // 34  fair (day)
            $.i18n.t('plugins_ds.yahooweather.cond_35'),    // 35  mixed rain and hail
            $.i18n.t('plugins_ds.yahooweather.cond_36'),    // 36  hot
            $.i18n.t('plugins_ds.yahooweather.cond_37'),    // 37  isolated thunderstorms
            $.i18n.t('plugins_ds.yahooweather.cond_38'),    // 38  scattered thunderstorms
            $.i18n.t('plugins_ds.yahooweather.cond_39'),    // 39  scattered thunderstorms
            $.i18n.t('plugins_ds.yahooweather.cond_40'),    // 40  scattered showers
            $.i18n.t('plugins_ds.yahooweather.cond_41'),    // 41  heavy snow
            $.i18n.t('plugins_ds.yahooweather.cond_42'),    // 42  scattered snow showers
            $.i18n.t('plugins_ds.yahooweather.cond_43'),    // 43  heavy snow
            $.i18n.t('plugins_ds.yahooweather.cond_44'),    // 44  partly cloudy
            $.i18n.t('plugins_ds.yahooweather.cond_45'),    // 45  thundershowers
            $.i18n.t('plugins_ds.yahooweather.cond_46'),    // 46  snow showers
            $.i18n.t('plugins_ds.yahooweather.cond_47')     // 47  isolated thundershowers
        ];

        function updateRefresh(refreshTime) {
            if (updateTimer) {
                clearInterval(updateTimer);
            }

            updateTimer = setInterval(function () {
                self.updateNow();
            }, refreshTime);
        }

        this.updateNow = function () {
            var units = (currentSettings.units === 'metric') ? 'c' : 'f';
            var query = "select * from weather.bylocation where location='" + currentSettings.location + "' and unit='" + units + "'";
            var uri = 'https://query.yahooapis.com/v1/public/yql?q=' +
                    encodeURIComponent(query) +
                    '&format=json&env=' +
                    encodeURIComponent('store://datatables.org/alltableswithkeys');
            $.ajax({
                url: uri,
                dataType: 'JSONP'
            })
            .done(function (data) {
                if (!_.isObject(data))
                    return;
                if (_.has(data, 'error')) {
                    console.error('Yahoo Weather API error: ' + data.error.description);
                    return;
                }
                if (!_.has(data, 'query') && _.has(data, 'query.results'))
                    return;
                data = data.query.results.weather.rss.channel;
                var easy = {
                    place_name: _.isUndefined(data.location.city) ? '' : data.location.city,
                    latitude: Number(data.item.lat),
                    longitude: Number(data.item.long),
                    sunrise: data.astronomy.sunrise,
                    sunset: data.astronomy.sunset,
                    conditions: conditionMap[data.item.condition.code],
                    current_temp: Number(data.item.condition.temp),
                    high_temp: Number(data.item.forecast[0].high),
                    low_temp: Number(data.item.forecast[0].low),
                    pressure: Number(data.atmosphere.pressure),
                    humidity: Number(data.atmosphere.humidity),
                    wind_speed: Number(data.wind.speed),
                    wind_direction: Number(data.wind.direction)
                };
                updateCallback(_.merge(data, easy));
            })
            .fail(function (xhr, status) {
                console.error('Yahoo Weather API error: ' + status);
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

        updateRefresh(currentSettings.refresh * 1000);
    };

    freeboard.loadDatasourcePlugin({
        type_name: 'yahooweather',
        display_name: $.i18n.t('plugins_ds.yahooweather.display_name'),
        description: $.i18n.t('plugins_ds.yahooweather.description'),
        settings: [
            {
                name: 'location',
                display_name: $.i18n.t('plugins_ds.yahooweather.location'),
                validate: 'required,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_ds.yahooweather.location_desc')
            },
            {
                name: 'units',
                display_name: $.i18n.t('plugins_ds.yahooweather.units'),
                style: 'width:200px',
                type: 'option',
                default_value: 'metric',
                options: [
                    {
                        name: $.i18n.t('plugins_ds.yahooweather.units_metric'),
                        value: 'metric'
                    },
                    {
                        name: $.i18n.t('plugins_ds.yahooweather.units_imperial'),
                        value: 'imperial'
                    }
                ]
            },
            {
                name: 'refresh',
                display_name: $.i18n.t('plugins_ds.yahooweather.refresh'),
                validate: 'required,custom[integer],min[30]',
                style: 'width:100px',
                type: 'number',
                suffix: $.i18n.t('plugins_ds.yahooweather.refresh_suffix'),
                default_value: 30
            }
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new yahooWeatherDatasource(settings, updateCallback));
        }
    });
}());