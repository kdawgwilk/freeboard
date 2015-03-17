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

    var clockDatasource = function (settings, updateCallback) {
        var self = this;
        var currentSettings = settings;
        var timer;

        function stopTimer() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }

        function updateTimer() {
            stopTimer();
            timer = setInterval(self.updateNow, currentSettings.refresh * 1000);
        }

        this.updateNow = function () {
            var now = moment().tz(currentSettings.timezone);

            var data = {
                numeric_value: now.unix(),
                full_string_value: now.format('YYYY/MM/DD HH:mm:ss'),
                date_string_value: now.format('YYYY/MM/DD'),
                time_string_value: now.format('HH:mm:ss'),
                date_object: now.toDate()
            };

            updateCallback(data);
        };

        this.onDispose = function () {
            stopTimer();
        };

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            if (_.isUndefined(currentSettings.timezone))
                currentSettings.timezone = 'Asia/Tokyo';
            updateTimer();
        };

        updateTimer();
    };

    freeboard.loadDatasourcePlugin({
        type_name: 'clock',
        display_name: $.i18n.t('plugins_ds.clock.display_name'),
        description: $.i18n.t('plugins_ds.clock.description'),
        settings: [
            {
                name: 'timezone',
                display_name: $.i18n.t('plugins_ds.clock.timezone'),
                type: 'option',
                default_value: 'Asia/Tokyo',
                options: [
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Etc/GMT+12'),
                        value: 'Etc/GMT+12'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Etc/GMT+11'),
                        value: 'Etc/GMT+11'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Honolulu'),
                        value: 'Pacific/Honolulu'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Anchorage'),
                        value: 'America/Anchorage'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Santa_Isabel'),
                        value: 'America/Santa_Isabel'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Los_Angeles'),
                        value: 'America/Los_Angeles'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Chihuahua'),
                        value: 'America/Chihuahua'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Phoenix'),
                        value: 'America/Phoenix'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Denver'),
                        value: 'America/Denver'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Guatemala'),
                        value: 'America/Guatemala'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Chicago'),
                        value: 'America/Chicago'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Regina'),
                        value: 'America/Regina'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Mexico_City'),
                        value: 'America/Mexico_City'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Bogota'),
                        value: 'America/Bogota'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Indiana/Indianapolis'),
                        value: 'America/Indiana/Indianapolis'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/New_York'),
                        value: 'America/New_York'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Caracas'),
                        value: 'America/Caracas'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Halifax'),
                        value: 'America/Halifax'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Asuncion'),
                        value: 'America/Asuncion'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/La_Paz'),
                        value: 'America/La_Paz'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Cuiaba'),
                        value: 'America/Cuiaba'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Santiago'),
                        value: 'America/Santiago'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/St_Johns'),
                        value: 'America/St_Johns'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Sao_Paulo'),
                        value: 'America/Sao_Paulo'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Godthab'),
                        value: 'America/Godthab'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Cayenne'),
                        value: 'America/Cayenne'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Argentina/Buenos_Aires'),
                        value: 'America/Argentina/Buenos_Aires'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Montevideo'),
                        value: 'America/Montevideo'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Etc/GMT+2'),
                        value: 'Etc/GMT+2'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Cape_Verde'),
                        value: 'America/Cape_Verde'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Atlantic/Azores'),
                        value: 'Atlantic/Azores'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.America/Casablanca'),
                        value: 'America/Casablanca'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Atlantic/Reykjavik'),
                        value: 'Atlantic/Reykjavik'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/London'),
                        value: 'Europe/London'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Etc/GMT'),
                        value: 'Etc/GMT'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Berlin'),
                        value: 'Europe/Berlin'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Paris'),
                        value: 'Europe/Paris'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Africa/Lagos'),
                        value: 'Africa/Lagos'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Budapest'),
                        value: 'Europe/Budapest'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Warsaw'),
                        value: 'Europe/Warsaw'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Africa/Windhoek'),
                        value: 'Africa/Windhoek'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Istanbul'),
                        value: 'Europe/Istanbul'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Kiev'),
                        value: 'Europe/Kiev'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Africa/Cairo'),
                        value: 'Africa/Cairo'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Damascus'),
                        value: 'Asia/Damascus'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Amman'),
                        value: 'Asia/Amman'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Africa/Johannesburg'),
                        value: 'Africa/Johannesburg'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Jerusalem'),
                        value: 'Asia/Jerusalem'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Beirut'),
                        value: 'Asia/Beirut'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Baghdad'),
                        value: 'Asia/Baghdad'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Minsk'),
                        value: 'Europe/Minsk'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Riyadh'),
                        value: 'Asia/Riyadh'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Africa/Nairobi'),
                        value: 'Africa/Nairobi'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Tehran'),
                        value: 'Asia/Tehran'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Europe/Moscow'),
                        value: 'Europe/Moscow'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Tbilisi'),
                        value: 'Asia/Tbilisi'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Yerevan'),
                        value: 'Asia/Yerevan'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Dubai'),
                        value: 'Asia/Dubai'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Baku'),
                        value: 'Asia/Baku'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Indian/Mauritius'),
                        value: 'Indian/Mauritius'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Kabul'),
                        value: 'Asia/Kabul'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Tashkent'),
                        value: 'Asia/Tashkent'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Karachi'),
                        value: 'Asia/Karachi'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Colombo'),
                        value: 'Asia/Colombo'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Indian/Kolkata'),
                        value: 'Indian/Kolkata'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Kathmandu'),
                        value: 'Asia/Kathmandu'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Almaty'),
                        value: 'Asia/Almaty'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Dhaka'),
                        value: 'Asia/Dhaka'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Yekaterinburg'),
                        value: 'Asia/Yekaterinburg'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Rangoon'),
                        value: 'Asia/Rangoon'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Bangkok'),
                        value: 'Asia/Bangkok'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Novosibirsk'),
                        value: 'Asia/Novosibirsk'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Krasnoyarsk'),
                        value: 'Asia/Krasnoyarsk'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Ulaanbaatar'),
                        value: 'Asia/Ulaanbaatar'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Shanghai'),
                        value: 'Asia/Shanghai'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Perth'),
                        value: 'Australia/Perth'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Singapore'),
                        value: 'Asia/Singapore'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Taipei'),
                        value: 'Asia/Taipei'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Irkutsk'),
                        value: 'Asia/Irkutsk'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Seoul'),
                        value: 'Asia/Seoul'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Tokyo'),
                        value: 'Asia/Tokyo'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Darwin'),
                        value: 'Australia/Darwin'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Adelaide'),
                        value: 'Australia/Adelaide'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Hobart'),
                        value: 'Australia/Hobart'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Yakutsk'),
                        value: 'Asia/Yakutsk'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Brisbane'),
                        value: 'Australia/Brisbane'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Port_Moresby'),
                        value: 'Pacific/Port_Moresby'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Australia/Sydney'),
                        value: 'Australia/Sydney'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Vladivostok'),
                        value: 'Asia/Vladivostok'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Guadalcanal'),
                        value: 'Pacific/Guadalcanal'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Etc/GMT-12'),
                        value: 'Etc/GMT-12'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Fiji'),
                        value: 'Pacific/Fiji'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Asia/Magadan'),
                        value: 'Asia/Magadan'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Auckland'),
                        value: 'Pacific/Auckland'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Tongatapu'),
                        value: 'Pacific/Tongatapu'
                    },
                    {
                        name: $.i18n.t('plugins_ds.clock.timezone_options.Pacific/Apia'),
                        value: 'Pacific/Apia'
                    }
                ]
            },
            {
                name: 'refresh',
                display_name: $.i18n.t('plugins_ds.clock.refresh'),
                validate: 'required,custom[integer],min[1]',
                style: 'width:100px',
                type: 'number',
                suffix: $.i18n.t('plugins_ds.clock.refresh_suffix'),
                default_value: 1
            }
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new clockDatasource(settings, updateCallback));
        }
    });
}());

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

    var jsonDatasource = function (settings, updateCallback) {
        var self = this;
        var PROXY_URL = 'thingproxy.freeboard.io/fetch/';

        var updateTimer = null;
        var currentSettings = settings;
        var errorStage = 0;     // 0 = try standard request
        // 1 = try JSONP
        // 2 = try thingproxy.freeboard.io
        var lockErrorStage = false;

        function updateRefresh(refreshTime) {
            if (updateTimer) {
                clearInterval(updateTimer);
            }

            updateTimer = setInterval(function () {
                self.updateNow();
            }, refreshTime);
        }

        updateRefresh(currentSettings.refresh * 1000);

        this.updateNow = function () {
            if ((errorStage > 1 && !currentSettings.use_thingproxy) || errorStage > 2) // We've tried everything, let's quit
            {
                return; // TODO: Report an error
            }

            var requestURL = currentSettings.url;

            if (errorStage === 2 && currentSettings.use_thingproxy) {
                requestURL = (location.protocol == 'https:' ? 'https:' : 'http:') + '//' + PROXY_URL + encodeURI(currentSettings.url);
            }

            var body = currentSettings.body;

            // Can the body be converted to JSON?
            if (body) {
                try {
                    body = JSON.parse(body);
                }
                catch (e) {
                }
            }

            $.ajax({
                url: requestURL,
                dataType: (errorStage === 1) ? 'JSONP' : 'JSON',
                type: currentSettings.method || 'GET',
                data: body,
                beforeSend: function (xhr) {
                    try {
                        _.each(currentSettings.headers, function (header) {
                            var name = header.name;
                            var value = header.value;

                            if (!_.isUndefined(name) && !_.isUndefined(value)) {
                                xhr.setRequestHeader(name, value);
                            }
                        });
                    }
                    catch (e) {
                    }
                },
                success: function (data) {
                    lockErrorStage = true;
                    updateCallback(data);
                },
                error: function (xhr, status, error) {
                    if (!lockErrorStage) {
                        // TODO: Figure out a way to intercept CORS errors only. The error message for CORS errors seems to be a standard 404.
                        errorStage++;
                        self.updateNow();
                    }
                }
            });
        };

        this.onDispose = function () {
            clearInterval(updateTimer);
            updateTimer = null;
        };

        this.onSettingsChanged = function (newSettings) {
            lockErrorStage = false;
            errorStage = 0;

            currentSettings = newSettings;
            updateRefresh(currentSettings.refresh * 1000);
            self.updateNow();
        };
    };

    freeboard.loadDatasourcePlugin({
        type_name: 'JSON',
        display_name: $.i18n.t('plugins_ds.json.display_name'),
        description: $.i18n.t('plugins_ds.json.description'),
        settings: [
            {
                name: 'url',
                display_name: $.i18n.t('plugins_ds.json.url'),
                validate: 'required,custom[url]',
                type: 'text'
            },
            {
                name: 'use_thingproxy',
                display_name: $.i18n.t('plugins_ds.json.use_thingproxy'),
                description: $.i18n.t('plugins_ds.json.use_thingproxy_desc'),
                type: 'boolean',
                default_value: true
            },
            {
                name: 'refresh',
                display_name: $.i18n.t('plugins_ds.json.refresh'),
                validate: 'required,custom[integer],min[1]',
                style: 'width:100px',
                type: 'number',
                suffix: $.i18n.t('plugins_ds.json.refresh_suffix'),
                default_value: 5
            },
            {
                name: 'method',
                display_name: $.i18n.t('plugins_ds.json.method'),
                type: 'option',
                style: 'width:200px',
                options: [
                    {
                        name: 'GET',
                        value: 'GET'
                    },
                    {
                        name: 'POST',
                        value: 'POST'
                    },
                    {
                        name: 'PUT',
                        value: 'PUT'
                    },
                    {
                        name: 'DELETE',
                        value: 'DELETE'
                    }
                ]
            },
            {
                name: 'body',
                display_name: $.i18n.t('plugins_ds.json.body'),
                type: 'json',
                validate: 'optional,maxSize[2000]',
                description: $.i18n.t('plugins_ds.json.body_desc')
            },
            {
                name: 'headers',
                display_name: $.i18n.t('plugins_ds.json.headers'),
                type: 'array',
                settings: [
                    {
                        name: 'name',
                        display_name: $.i18n.t('plugins_ds.json.headers_name'),
                        type: 'text',
                        validate: 'optional,maxSize[500]'
                    },
                    {
                        name: 'value',
                        display_name: $.i18n.t('plugins_ds.json.headers_value'),
                        type: 'text',
                        validate: 'optional,maxSize[500]'
                    }
                ]
            }
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new jsonDatasource(settings, updateCallback));
        }
    });
}());

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

    var playbackDatasource = function (settings, updateCallback) {
        var self = this;
        var currentSettings = settings;
        var currentDataset = [];
        var currentIndex = 0;
        var currentTimeout;

        function moveNext() {
            if (currentDataset.length > 0) {
                if (currentIndex < currentDataset.length) {
                    updateCallback(currentDataset[currentIndex]);
                    currentIndex++;
                }

                if (currentIndex >= currentDataset.length && currentSettings.loop) {
                    currentIndex = 0;
                }

                if (currentIndex < currentDataset.length) {
                    currentTimeout = setTimeout(moveNext, currentSettings.refresh * 1000);
                }
            }
            else {
                updateCallback({});
            }
        }

        function stopTimeout() {
            currentDataset = [];
            currentIndex = 0;

            if (currentTimeout) {
                clearTimeout(currentTimeout);
                currentTimeout = null;
            }
        }

        this.updateNow = function () {
            stopTimeout();

            $.ajax({
                url: currentSettings.datafile,
                dataType: (currentSettings.is_jsonp) ? 'JSONP' : 'JSON',
                success: function (data) {
                    if (_.isArray(data))
                        currentDataset = data;
                    else
                        currentDataset = [];

                    currentIndex = 0;

                    moveNext();
                },
                error: function (xhr, status, error) {
                }
            });
        };

        this.onDispose = function () {
            stopTimeout();
        };

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            self.updateNow();
        };
    };

    freeboard.loadDatasourcePlugin({
        type_name: 'playback',
        display_name: $.i18n.t('plugins_ds.playback.display_name'),
        description: $.i18n.t('plugins_ds.playback.description'),
        settings: [
            {
                name: 'datafile',
                display_name: $.i18n.t('plugins_ds.playback.datafile'),
                validate: 'required,custom[url]',
                type: 'text',
                description: $.i18n.t('plugins_ds.playback.datafile_desc')
            },
            {
                name: 'is_jsonp',
                display_name: $.i18n.t('plugins_ds.playback.is_jsonp'),
                type: 'boolean'
            },
            {
                name: 'loop',
                display_name: $.i18n.t('plugins_ds.playback.loop'),
                type: 'boolean',
                description: $.i18n.t('plugins_ds.playback.loop_desc'),
            },
            {
                name: 'refresh',
                display_name: $.i18n.t('plugins_ds.playback.refresh'),
                validate: 'required,custom[integer],min[1]',
                style: 'width:100px',
                type: 'number',
                suffix: $.i18n.t('plugins_ds.playback.refresh_suffix'),
                default_value: 5
            }
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new playbackDatasource(settings, updateCallback));
        }
    });
}());
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

    var wsDatasource = function(settings, updateCallback) {
        var self = this;

        var currentSettings = settings;
        var ws;
        var dispose = false;
        var CONNECTION_DELAY = 3000;

        function wsOpen() {
            ws = new WebSocket(currentSettings.uri);

            ws.onopen = function(evt) {
                console.info('WebSocket Connected to %s', ws.url);
            };

            ws.onclose = function(evt) {
                console.info('WebSocket Disconnected from %s', evt.srcElement.url);
                if (dispose === false && currentSettings.reconnect === true) {
                    _.delay(function() {
                        wsOpen();
                    }, CONNECTION_DELAY);
                }
            };

            ws.onmessage = function(evt) {
                try {
                    var obj = JSON.parse(evt.data);
                    updateCallback(obj);
                } catch (e) {
                    console.error('WebSocket Bad parse', evt.data);
                }
            };

            ws.onerror = function(evt) {
                console.error('WebSocket Error', evt);
            };
        }

        function wsClose() {
            if (ws) {
                ws.close();
                ws = null;
            }
        }

        this.updateNow = function() {
        };

        this.onDispose = function() {
            dispose = true;
            wsClose();
        };

        this.onSettingsChanged = function(newSettings) {
            var reconnect = newSettings.reconnect;

            // Set to not reconnect
            currentSettings.reconnect = false;
            wsClose();
            _.delay(function() {
                currentSettings = newSettings;
                currentSettings.reconnect = reconnect;
                wsOpen();
            }, CONNECTION_DELAY);
        };

        wsOpen();
    };

    freeboard.loadDatasourcePlugin({
        type_name: 'websocket',
        display_name: $.i18n.t('plugins_ds.websocket.display_name'),
        description: $.i18n.t('plugins_ds.websocket.description'),
        settings: [
            {
                name: 'uri',
                display_name: $.i18n.t('plugins_ds.websocket.uri'),
                validate: 'required,maxSize[1000]',
                type: 'text',
                description: $.i18n.t('plugins_ds.websocket.uri_desc'),
            },
            {
                name: 'reconnect',
                display_name: $.i18n.t('plugins_ds.websocket.reconnect'),
                type: 'boolean',
                default_value: true
            }
        ],
        newInstance: function(settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new wsDatasource(settings, updateCallback));
        }
    });
}());

// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2014 Hugo Sequeira (https://github.com/hugocore)                                   │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

(function() {
    'use strict';

    var nodeJSDatasource = function(settings, updateCallback) {

        var self = this,
            currentSettings = settings,
            url,
            socket,
            newMessageCallback;

        function onNewMessageHandler(message) {
            var objdata = JSON.parse(message);
            if (_.isObject('object'))
                updateCallback(objdata);
            else
                updateCallback(message);
        }

        function joinRoom(roomName, roomEvent) {
            // Sends request to join the new room
            // (handle event on server-side)
            self.socket.emit(roomEvent, roomName);
            console.info('Joining room "%s" with event "%s"', roomName, roomEvent);
        }

        function discardSocket() {
            // Disconnect datasource websocket
            if (self.socket)
                self.socket.disconnect();
        }

        function connectToServer(url, rooms) {
            // Establish connection with server
            self.url = url;
            self.socket = io.connect(self.url,{'forceNew':true});

            // Join the rooms
            self.socket.on('connect', function() {
                console.info('Connecting to Node.js at: %s', self.url);
            });

            // Join the rooms
            _.each(rooms, function(roomConfig) {
                var roomName = roomConfig.roomName;
                var roomEvent = roomConfig.roomEvent;

                if (!_.isUndefined(roomName) && !_.isUndefined(roomEvent)) {
                    joinRoom(roomName, roomEvent);
                }

            });

            self.socket.on('connect_error', function(object) {
                console.error('It was not possible to connect to Node.js at: %s', self.url);
            });

            self.socket.on('reconnect_error', function(object) {
                console.error('Still was not possible to re-connect to Node.js at: %s', self.url);
            });

            self.socket.on('reconnect_failed', function(object) {
                console.error('Re-connection to Node.js failed at: %s', self.url);
                discardSocket();
            });

        }


        function initializeDataSource() {
            // Reset connection to server
            discardSocket();
            connectToServer(currentSettings.url, currentSettings.rooms);

            // Subscribe to the events
            var newEventName = currentSettings.eventName;
            self.newMessageCallback = onNewMessageHandler;
            _.each(currentSettings.events, function(eventConfig) {
                var event = eventConfig.eventName;
                console.info('Subscribing to event: %s', event);
                self.socket.on(event, function(message) {
                    self.newMessageCallback(message);
                });
            });
        }

        this.updateNow = function() {
            // Just seat back, relax and wait for incoming events
            return;
        };

        this.onDispose = function() {
            // Stop responding to messages
            self.newMessageCallback = function(message) {
                return;
            };
            discardSocket();
        };

        this.onSettingsChanged = function(newSettings) {
            currentSettings = newSettings;
            initializeDataSource();
        };

        initializeDataSource();
    };

    freeboard.loadDatasourcePlugin({
        type_name : 'node_js',
        display_name : $.i18n.t('plugins_ds.node_js.display_name'),
        description : $.i18n.t('plugins_ds.node_js.description'),
        external_scripts : [ 'https://cdn.socket.io/socket.io-1.2.1.js' ],
        settings : [
            {
                name: 'url',
                display_name: $.i18n.t('plugins_ds.node_js.url'),
                validate: 'required,maxSize[1000]',
                type: 'text',
                description: $.i18n.t('plugins_ds.node_js.url_desc')
            },
            {
                name : 'events',
                display_name : $.i18n.t('plugins_ds.node_js.events'),
                description : $.i18n.t('plugins_ds.node_js.events_desc'),
                type : 'array',
                settings : [ {
                    name : 'eventName',
                    display_name : $.i18n.t('plugins_ds.node_js.event_name'),
                    validate: 'optional,maxSize[100]',
                    type: 'text'
                } ]
            },
            {
                name : 'rooms',
                display_name : $.i18n.t('plugins_ds.node_js.rooms'),
                description : $.i18n.t('plugins_ds.node_js.rooms_desc'),
                type : 'array',
                settings : [ {
                    name : 'roomName',
                    display_name : $.i18n.t('plugins_ds.node_js.room_name'),
                    validate: 'optional,maxSize[100]',
                    type: 'text'
                }, {
                    name : 'roomEvent',
                    display_name : $.i18n.t('plugins_ds.node_js.room_event'),
                    validate: 'optional,maxSize[100]',
                    type: 'text'
                } ]
            }
        ],
        newInstance : function(settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new nodeJSDatasource(settings, updateCallback));
        }
    });
}());

// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

(function() {
    'use strict';

    var mqttDatasource = function(settings, updateCallback) {

        var self = this;
        var currentSettings = settings;
        var client;
        var dispose = false;
        var CONNECTION_DELAY = 3000;

        function onConnect(frame) {
            console.info('MQTT Connected to %s', currentSettings.hostname);
            client.subscribe(_.isUndefined(currentSettings.topic) ? '' : currentSettings.topic);
        }

        function onConnectionLost(responseObject) {
            console.info('MQTT ConnectionLost %s %s', currentSettings.hostname, responseObject.errorMessage);
            if (dispose === false) {
                if (dispose === false && currentSettings.reconnect === true) {
                    _.delay(function() {
                        connect();
                    }, CONNECTION_DELAY);
                }
            }
        }

        function onConnectFailure(error) {
            client = null;
            console.error('MQTT Failed Connect to %s', currentSettings.hostname);
        }

        function onMessageArrived(message) {
            console.info('MQTT Received %s from %s', message,  currentSettings.hostname);

            var objdata = JSON.parse(message.payloadString);
            if (_.isObject('object')) {
                updateCallback(objdata);
            } else {
                updateCallback(message.payloadString);
            }
        }

        function disconnect() {
            if (client) {
                client.disconnect();
                client = null;
            }
        }

        function connect() {
            try {
                client = new Paho.MQTT.Client(
                    _.isUndefined(currentSettings.hostname) ? '' : currentSettings.hostname,
                    _.isUndefined(currentSettings.port) ? '' : currentSettings.port,
                    _.isUndefined(currentSettings.clientID) ? '' : currentSettings.clientID);
                client.onConnect = onConnect;
                client.onMessageArrived = onMessageArrived;
                client.onConnectionLost = onConnectionLost;
                client.connect({
                    userName: _.isUndefined(currentSettings.username) ? '' : currentSettings.username,
                    password: _.isUndefined(currentSettings.password) ? '' : currentSettings.password,
                    onSuccess: onConnect,
                    onFailure: onConnectFailure
                });
            } catch (e) {
                console.error(e);
            }
        }

        this.updateNow = function() {
        };

        this.onDispose = function() {
            dispose = true;
            disconnect();
        };

        this.onSettingsChanged = function(newSettings) {
            var reconnect = newSettings.reconnect;

            // Set to not reconnect
            currentSettings.reconnect = false;
            disconnect();
            _.delay(function() {
                currentSettings = newSettings;
                currentSettings.reconnect = reconnect;
                connect();
            }, CONNECTION_DELAY);
        };

        connect();
    };

    freeboard.loadDatasourcePlugin({
        type_name : 'mqtt',
        display_name : $.i18n.t('plugins_ds.mqtt.display_name'),
        description : $.i18n.t('plugins_ds.mqtt.description'),
        external_scripts : [ 'plugins/thirdparty/mqttws31.min.js' ],
        settings : [
            {
                name : 'hostname',
                display_name : $.i18n.t('plugins_ds.mqtt.hostname'),
                validate: 'required,maxSize[1000]',
                type: 'text',
                description: $.i18n.t('plugins_ds.mqtt.hostname_desc'),
            },
            {
                name : 'port',
                display_name : $.i18n.t('plugins_ds.mqtt.port'),
                validate: 'required,custom[integer],min[1]',
                type: 'number',
                style: 'width:100px',
                default_value: 8080
            },
            {
                name : 'clientID',
                display_name : $.i18n.t('plugins_ds.mqtt.clientID'),
                validate: 'required,maxSize[23]',
                type: 'text',
                description: $.i18n.t('plugins_ds.mqtt.clientID_desc'),
                default_value: 'SensorCorpus'
            },
            {
                name : 'topic',
                display_name : $.i18n.t('plugins_ds.mqtt.topic'),
                validate: 'required,maxSize[500]',
                type: 'text',
                description: $.i18n.t('plugins_ds.mqtt.topic_desc'),
                default_value: ''
            },
            {
                name : 'username',
                display_name : $.i18n.t('plugins_ds.mqtt.username'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_ds.mqtt.username_desc')
            },
            {
                name : 'password',
                display_name : $.i18n.t('plugins_ds.mqtt.password'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_ds.mqtt.password_desc'),
            },
            {
                name: 'reconnect',
                display_name: $.i18n.t('plugins_ds.mqtt.reconnect'),
                type: 'boolean',
                default_value: true
            }
        ],
        newInstance : function(settings, newInstanceCallback, updateCallback) {
            newInstanceCallback(new mqttDatasource(settings, updateCallback));
        }
    });
}());

// ┌─────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                │ \\
// ├─────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                       │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                             │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                  │ \\
// ├─────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                  │ \\
// └─────────────────────────────────────────┘ \\

(function() {
    'use strict';

    freeboard.addStyle('.tw-tooltip',
            'position: absolute;' +
            'font-size: 0.7em;' +
            'color: black;' +
            'text-align: center;' +
            'height: 20px;' +
            'padding: 2px 8px 2px 8px;' +
            'background: white;' +
            'opacity: 0.8;' +
            'pointer-events: none;' +
            '-webkit-box-shadow: 0 0 5px #000;' +
            '-moz-box-shadow: 0 0 5px #000;' +
            'box-shadow: 0 0 5px #000;'
            );

    var textWidget = function (settings) {
        var self = this;
        var BLOCK_HEIGHT = 60;
        var PADDING = 10;

        var currentSettings = settings;

        var currentID = _.uniqueId('textwidget_');
        var titleElement = $('<h2 class="section-title"></h2>');
        var widgetElement = $('<div class="text-widget" id="' + currentID + '"></div>');

        var option = {
            class: 'ultralight-text',
            fontColor: '#d3d4d4',
            decimal: 0,
            comma: 0,
            metricPrefix: false,
            transition: {
                enable: true,
                type: 'circle-out',
                duration: 500
            },
            chart: {
                type: 'line',
                margin: { left: 3, right: 3, bottom: 5 },
                xTickcount: 100,
                transition: {
                    type: 'circle-out',
                    duration: 500
                },
                lineWidth: 2,
                spotsize: 3.3,
                color: '#ff9900',
                spotcolor: {
                    def: '#FF0000',
                    max: '#0496ff',
                    min: '#0496ff'
                }
            }
        };

        var d3var = {
            svg: null,
            gText: null,
            gChart: null,
            textValue: null,
            textUnits: null,
            chart: {
                minValIndex: -1,
                maxValIndex: -1,
                highlightIndex: -1,
                height: 0,
                width: 0,
                xScale: null,
                xRevScale: null,
                xBarScale: null,
                yScale: null,
                line: null,
                area: null,
                data: null,
                gTooltip: null,
            }
        };

        function getFontSize() {
            return (currentSettings.size === 'big') ? '4.3em' : '1.95em';
        }

        function getUnitDy() {
            return (currentSettings.size === 'big') ? '1.4em' : '.6em';
        }

        function getTextY(height) {
            if (currentSettings.size === 'big')
                return (currentSettings.chart === true) ? (height/2.5) : height/2;
            else
                return (currentSettings.chart === true) ? (height/4) : height/2;
        }

        function getText(value) {
            var text;
            if (_.isNumber(value)) {
                if (option.metricPrefix) {
                    var prefix = d3.formatPrefix(value);
                    text = prefix.scale(value).toFixed(option.decimal) + prefix.symbol;
                } else {
                    var f;
                    if (option.comma === true)
                        f = d3.format(',.' + option.decimal + 'f');
                    else
                        f = d3.format('.' + option.decimal + 'f');
                    text = f(value);
                }
            } else {
                text = value;
            }
            return text;
        }

        function getChartHeight(rc) {
            return (currentSettings.size === 'big') ? rc.height/3.2 : rc.height/1.8;
        }

        function getChartWidth(rc) {
            return rc.width - (option.chart.margin.left + option.chart.margin.right);
        }

        function getChartTranslateText(rc) {
            var transX = option.chart.margin.left;
            var transY = rc.height - d3var.chart.height - option.chart.margin.bottom;
            return 'translate(' + transX + ', ' + transY + ')';
        }

        function getChartForPath() {
            var chart = null;
            switch (option.chart.type) {
            case 'line':
                chart = d3var.chart.line;
                break;
            case 'area':
                chart = d3var.chart.area;
                break;
            }
            return chart;
        }

        function resize() {
            if (_.isNull(d3var.svg))
                return;

            var rc = widgetElement[0].getBoundingClientRect();

            d3var.svg.attr('height', rc.height);
            d3var.svg.attr('width', rc.width);

            d3var.gText.attr('transform', 'translate(0,' + getTextY(rc.height) + ')');

            if (currentSettings.chart) {
                d3var.chart.height = getChartHeight(rc);
                d3var.chart.width = getChartWidth(rc);

                d3var.chart.xScale.range([0, d3var.chart.width]);
                d3var.chart.yScale.range([d3var.chart.height, 0]);

                d3var.chart.xRevScale.domain(d3var.chart.xScale.range());

                d3var.gChart.attr('transform', getChartTranslateText(rc));

                switch (option.chart.type) {
                case 'line':
                case 'area':
                    d3var.gChart.select('path')
                            .attr('d', getChartForPath())
                            .attr('transform', null);

                    d3var.gChart.select('.overlay')
                            .attr('width', d3var.chart.width)
                            .attr('height', d3var.chart.height);

                    d3var.gChart.selectAll('.spot')
                            .attr('cx', function(d, i) { return d3var.chart.xScale(i); })
                            .attr('cy', function(d, i) { return d3var.chart.yScale(d); });
                    break;
                case 'bar':
                    d3var.chart.xBarScale.rangeRoundBands([0, d3var.chart.width], 0.1);
                    d3var.gChart.selectAll('.bar')
                            .attr('x', function(d, i) { return d3var.chart.xScale(i); })
                            .attr('width', d3var.chart.xBarScale.rangeBand())
                            .attr('y', function(d, i) { return d < 0 ? d3var.chart.yScale(0) : d3var.chart.yScale(d); })
                            .attr('height', function(d, i) { return Math.abs(d3var.chart.yScale(d) - d3var.chart.yScale(0)); });
                    break;
                }
            }
        }

        function showTooltip(x) {
            updateTooltip(x);
            d3var.gChart.gTooltip.style('display', 'inline');

        }

        function hideTooltip() {
            d3var.gChart.gTooltip.style('display', 'none');
        }

        function updateTooltip(x) {
            d3var.chart.highlightIndex = Math.round(d3var.chart.xRevScale(x));
            var val = d3var.chart.data[d3var.chart.highlightIndex];
            d3var.gChart.gTooltip.html(getText(val) + ' ' + currentSettings.units)
                        .style('left', (d3.event.pageX + 10) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
        }

        function highlightSpot(x, show) {
            var _hide = function(idx) {
                if (idx === -1)
                    return;
                if (idx === d3var.chart.minValIndex || idx === d3var.chart.maxValIndex) {
                    var clr = (idx === d3var.chart.minValIndex) ? option.chart.spotcolor.min : option.chart.spotcolor.max;
                    d3.select(d3var.gChart.selectAll('.spot')[0][idx])
                                .attr('fill', clr);
                    return;
                }
                d3.select(d3var.gChart.selectAll('.spot')[0][idx]).style('display', 'none');
            };

            if (show) {
                _hide(d3var.chart.highlightIndex);
                d3var.chart.highlightIndex = Math.round(d3var.chart.xRevScale(x));
                d3.select(d3var.gChart.selectAll('.spot')[0][d3var.chart.highlightIndex])
                            .style('display', 'block')
                            .attr('fill', option.chart.spotcolor.def);
            } else {
                _hide(d3var.chart.highlightIndex);
                d3var.chart.highlightIndex = -1;
            }
        }

        function createChart(rc) {
            destroyChart();

            d3var.chart.height = getChartHeight(rc);
            d3var.chart.width = getChartWidth(rc);

            d3var.chart.data = [];

            d3var.chart.xScale = d3.scale.linear()
                .range([0, d3var.chart.width]);

            d3var.chart.xRevScale = d3.scale.linear()
                .range(d3var.chart.xScale.domain());

            d3var.chart.yScale = d3.scale.linear()
                .range([d3var.chart.height, 0]);

            d3var.gChart = d3var.svg.insert('g', 'g')
                .attr('transform', getChartTranslateText(rc));

            switch (option.chart.type) {
            case 'line':
                d3var.chart.line = d3.svg.line()
                    .interpolate('linear')
                    .x(function(d, i) { return d3var.chart.xScale(i); })
                    .y(function(d, i) { return d3var.chart.yScale(d); });
                d3var.gChart.append('path')
                    .datum(d3var.chart.data)
                    .attr('d', d3var.chart.line)
                    .attr('fill', 'none')
                    .attr('stroke', option.chart.color)
                    .attr('stroke-width', option.chart.lineWidth + 'px');
                break;
            case 'area':
                d3var.chart.area = d3.svg.area()
                    .x(function(d, i) { return d3var.chart.xScale(i); })
                    .y0(function(d, i) { return d3var.chart.yScale(0); })
                    .y1(function(d, i) { return d3var.chart.yScale(d); });
                d3var.gChart.append('path')
                    .datum(d3var.chart.data)
                    .attr('d', d3var.chart.area)
                    .attr('fill', option.chart.color);
                break;
            case 'bar':
                d3var.chart.xBarScale = d3.scale.ordinal()
                    .rangeRoundBands([0, d3var.chart.width], 0.1);
                break;
            }

            switch (option.chart.type) {
            case 'line':
            case 'area':
                // overlay for tooltip
                d3var.gChart.append('rect')
                    .attr('class', 'overlay')
                    .attr('fill', 'none')
                    .attr('pointer-events', 'all')
                    .attr('width', d3var.chart.width)
                    .attr('height', d3var.chart.height)
                    .on('mousemove', function() {
                        var m = d3.mouse(this);
                        highlightSpot(m[0], true);
                        updateTooltip(m[0]);
                    })
                    .on('mouseover', function() {
                        var m = d3.mouse(this);
                        highlightSpot(m[0], true);
                        showTooltip(m[0]);
                    })
                    .on('mouseout', function() {
                        var m = d3.mouse(this);
                        highlightSpot(m[0], false);
                        hideTooltip();
                    });
                break;
            case 'bar':
                freeboard.addStyle('.bar:hover', 'fill: ' + option.chart.spotcolor.def);
                break;
            }

            d3var.gChart.gTooltip = d3.select('body').append('div')
                        .attr('class', 'tw-tooltip')
                        .style('display', 'none');
        }

        function destroyChart() {
            if (_.isNull(d3var.gChart))
                return;
            d3var.chart.data = d3var.chart.line = d3var.chart.area = null;
            d3var.chart.xScale = d3var.chart.xRevScale = d3var.chart.xBarScale = null;
            d3var.chart.minValIndex = d3var.chart.maxValIndex = -1;
            d3var.chart.highlightIndex = -1;
            d3var.gChart.gTooltip.remove();
            d3var.gChart.remove();
            d3var.gChart = null;
        }

        function createWidget() {
            var rc = widgetElement[0].getBoundingClientRect();

            d3var.svg = d3.select('#' + currentID)
                .append('svg')
                .attr('width', rc.width)
                .attr('height', rc.height);

            d3var.gText = d3var.svg.append('g')
                .attr('transform', 'translate(0,' + getTextY(rc.height) + ')');

            d3var.textValue = d3var.gText.append('text')
                .data([{ value: 0 }])
                .text('0')
                .attr('fill', option.fontColor)
                .attr('text-anchor', 'center')
                .attr('dy', '.3em')
                .attr('font-size', getFontSize())
                .attr('class', option.class);

            d3var.textUnits = d3var.gText.append('text')
                .text(currentSettings.units)
                .attr('fill', option.fontColor)
                .attr('text-anchor', 'central')
                .attr('dy', getUnitDy())
                .attr('font-size', '1em')
                .attr('class', option.class);

            moveTextUnits();

            if (currentSettings.chart)
                createChart(rc);
        }

        function moveTextUnits() {
            if (_.isNull(d3var.svg))
                return;
            d3var.textUnits.attr('x', d3var.textValue.node().getBBox().width + 10);
        }

        function valueTransition(val) {
            d3var.textValue.transition()
                .duration(option.transition.duration)
                .ease(option.transition.type)
                .tween('text', function(d) {
                    var i = d3.interpolate(d.value, val);
                    d.value = val;
                    return function(t) {
                        this.textContent = getText(i(t));
                        moveTextUnits();
                    };
                });
        }

        function lineAreaChartTransition(min, max) {
            var _getSpotColor = function(d, i) {
                if (d3var.chart.highlightIndex === i)
                    return option.chart.spotcolor.def;

                if (min === d) {
                    if (d3var.chart.minValIndex > -1) {
                        if (d3var.chart.minValIndex > i)
                            return 'none';
                    }
                    d3var.chart.minValIndex = i;
                    return option.chart.spotcolor.min;
                }

                if (max === d) {
                    if (d3var.chart.maxValIndex > -1) {
                        if (d3var.chart.maxValIndex > i)
                            return 'none';
                    }
                    d3var.chart.maxValIndex = i;
                    return option.chart.spotcolor.max;
                }
                return 'none';
            };

            var _getSpotDisplay = function(d, i) {
                if (d3var.chart.highlightIndex === i)
                    return 'block';
                if (min === max)
                    return 'none';
                if (min === d || max === d)
                    return 'block';
                return 'none';
            };

            d3var.gChart.selectAll('.spot')
                    .data(d3var.chart.data)
                .enter().insert('circle', '.overlay')
                    .attr('class', 'spot')
                    .style('display', 'none')
                    .attr({
                        cx: function(d, i) { return d3var.chart.xScale(i); },
                        cy: function(d, i) { return d3var.chart.yScale(d); },
                        r: option.chart.spotsize,
                        fill: 'none'
                    });

            if (d3var.chart.data.length > option.chart.xTickcount) {
                // remove first circle
                d3var.gChart.select('.spot').remove();
                d3var.chart.minValIndex--;
                d3var.chart.maxValIndex--;

                d3.transition()
                    .duration(option.chart.transition.duration)
                    .ease(option.chart.transition.type)
                    .each(function () {
                        d3var.gChart.select('path')
                                .attr('d', getChartForPath())
                                .attr('transform', null)
                            .transition()
                                .attr('transform', 'translate(' + d3var.chart.xScale(-1) + ')');

                        d3var.gChart.selectAll('.spot')
                                .style('display', function(d, i) { return _getSpotDisplay(d, i); })
                                .attr('fill', function(d, i) { return _getSpotColor(d, i); })
                                .attr('cy', function(d, i) { return d3var.chart.yScale(d); })
                            .transition()
                                .attr('cx', function(d, i) { return d3var.chart.xScale(i); });
                    });

                if (d3var.chart.data.length > option.chart.xTickcount)
                    d3var.chart.data.shift();
            } else {
                d3.transition()
                    .duration(option.chart.transition.duration)
                    .ease(option.chart.transition.type)
                    .each(function () {
                        d3var.gChart.selectAll('.spot')
                                .style('display', function(d, i) { return _getSpotDisplay(d, i); })
                                .attr('fill', function(d, i) { return _getSpotColor(d, i); })
                            .transition()
                                .attr('cx', function(d, i) { return d3var.chart.xScale(i); })
                                .attr('cy', function(d, i) { return d3var.chart.yScale(d); });

                        d3var.gChart.select('path').transition()
                                .attr('d', getChartForPath());
                    });
            }
        }

        function barChartTransition(min, max) {
            var _getBarColor = function(d, i) {
                if (min === max)
                    return option.chart.color;

                if (min === d) {
                    if (d3var.chart.minValIndex > -1) {
                        if (d3var.chart.minValIndex > i)
                            return option.chart.color;
                    }
                    d3var.chart.minValIndex = i;
                    return option.chart.spotcolor.min;
                }

                if (max === d) {
                    if (d3var.chart.maxValIndex > -1) {
                        if (d3var.chart.maxValIndex > i)
                            return option.chart.color;
                    }
                    d3var.chart.maxValIndex = i;
                    return option.chart.spotcolor.max;
                }
                return option.chart.color;
            };

            d3var.chart.xBarScale
                .domain(d3.range(d3var.chart.data.length-1));

            d3var.gChart.selectAll('.bar')
                    .data(d3var.chart.data)
                .enter().append('rect')
                    .attr('class', 'bar')
                    .attr('fill', function(d, i) { return _getBarColor(d, i); })
                    .attr('x', function(d, i) { return d3var.chart.xScale(i); })
                    .attr('width', d3var.chart.xBarScale.rangeBand())
                    .attr('y', function(d, i) { return d < 0 ? d3var.chart.yScale(0) : d3var.chart.yScale(d); })
                    .attr('height', function(d, i) { return Math.abs(d3var.chart.yScale(d) - d3var.chart.yScale(0)); })
                    .on('mousemove', function() { updateTooltip(d3.mouse(this)[0]); })
                    .on('mouseover', function() { showTooltip(d3.mouse(this)[0]); })
                    .on('mouseout', function() { hideTooltip(); });

            // remove first bar
            if (d3var.chart.data.length > option.chart.xTickcount) {
                d3var.gChart.select('.bar').remove();
                d3var.chart.minValIndex--;
                d3var.chart.maxValIndex--;
            }

            d3.transition()
                .duration(option.chart.transition.duration)
                .ease(option.chart.transition.type)
                .each(function () {
                    d3var.gChart.selectAll('.bar')
                        .transition()
                            .attr('fill', function(d, i) { return _getBarColor(d, i); })
                            .attr('x', function(d, i) { return d3var.chart.xScale(i); })
                            .attr('width', d3var.chart.xBarScale.rangeBand())
                            .attr('y', function(d, i) { return d < 0 ? d3var.chart.yScale(0) : d3var.chart.yScale(d); })
                            .attr('height', function(d, i) { return Math.abs(d3var.chart.yScale(d) - d3var.chart.yScale(0)); });
                });

            if (d3var.chart.data.length > option.chart.xTickcount)
                d3var.chart.data.shift();
        }

        function chartTransition(val) {
            d3var.chart.data.push(val);

            var minmax = d3.extent(d3var.chart.data);

            d3var.chart.xScale
                .domain([0, d3var.chart.data.length-1]);
            d3var.chart.yScale
                .domain(minmax)
                .range([d3var.chart.height, 0]);
            d3var.chart.xRevScale
                .range(d3var.chart.xScale.domain());

            switch (option.chart.type) {
            case 'line':
            case 'area':
                lineAreaChartTransition(minmax[0], minmax[1]);
                break;
            case 'bar':
                barChartTransition(minmax[0], minmax[1]);
                break;
            }
        }

        function refresh(value) {
            if (option.transition.enable && _.isNumber(value))
                valueTransition(value);
            else {
                d3var.textValue.text(getText(value));
                moveTextUnits();
            }

            if (!_.isNull(d3var.gChart) && _.isNumber(value))
                chartTransition(value);
        }

        function setBlocks(blocks) {
            if (_.isUndefined(blocks))
                return;
            var titlemargin = (titleElement.css('display') === 'none') ? 0 : titleElement.outerHeight();
            var height = (BLOCK_HEIGHT) * blocks - PADDING - titlemargin;
            widgetElement.css({
                height: height + 'px',
                width: '100%'
            });
            resize();
        }

        this.render = function (element) {
            $(element).append(titleElement).append(widgetElement);
            titleElement.html((_.isUndefined(currentSettings.title) ? '' : currentSettings.title));
            setBlocks(self.getHeight());
            createWidget();
        };

        this.onSettingsChanged = function (newSettings) {
            option.decimal = newSettings.decimal;
            option.comma = newSettings.comma;
            option.metricPrefix = newSettings.metric_prefix;
            option.transition.enable = newSettings.animate;
            option.chart.type = newSettings.chart_type;
            option.chart.color = newSettings.chart_color;
            option.chart.spotcolor.min = option.chart.spotcolor.max = newSettings.chart_minmax_color;

            if (_.isNull(d3var.svg)) {
                currentSettings = newSettings;
                return;
            }

            titleElement.html((_.isUndefined(newSettings.title) ? '' : newSettings.title));
            if (_.isUndefined(newSettings.title) || newSettings.title === '')
                titleElement.css('display', 'none');
            else
                titleElement.css('display', 'block');

            if (currentSettings.chart !== newSettings.chart ||
                currentSettings.chart_type !== newSettings.chart_type) {
                if (newSettings.chart || currentSettings.chart_type !== newSettings.chart_type)
                    createChart(widgetElement[0].getBoundingClientRect());
                else
                    destroyChart();
            }

            var updateCalculate = false;
            if (currentSettings.value != newSettings.value)
                updateCalculate = true;

            currentSettings = newSettings;

            setBlocks(self.getHeight());

            d3var.textUnits.text(currentSettings.units);
            d3var.textUnits.attr('dy', getUnitDy());
            d3var.textValue.attr('font-size', getFontSize());
            moveTextUnits();

            if (currentSettings.chart) {
                var selItem;

                switch (option.chart.type) {
                case 'line':
                    selItem = '.spot';
                    d3var.gChart.select('path').attr('stroke', option.chart.color);
                    break;
                case 'area':
                    selItem = '.spot';
                    d3var.gChart.select('path').attr('fill', option.chart.color);
                    break;
                case 'bar':
                    selItem = '.bar';
                    d3var.gChart.selectAll('.bar').attr('fill', option.chart.color);
                    break;
                }

                if (d3var.chart.minValIndex !== -1) {
                    d3.select(d3var.gChart.selectAll(selItem)[0][d3var.chart.minValIndex])
                                .attr('fill', option.chart.spotcolor.min);
                }
                if (d3var.chart.maxValIndex !== -1) {
                    d3.select(d3var.gChart.selectAll(selItem)[0][d3var.chart.maxValIndex])
                                .attr('fill', option.chart.spotcolor.max);
                }
            }
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName === 'value')
                refresh(newValue);
        };

        this.onSizeChanged = function() {
            resize();
        };

        this.onDispose = function () {
            if (!_.isNull(d3var.svg)) {
                destroyChart();
                d3var.gText.remove();
                d3var.gText = null;
                d3var.svg.remove();
                d3var.svg = null;
            }
        };

        this.getHeight = function () {
            return (currentSettings.size === 'big' || currentSettings.chart === true) ? 2 : 1;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'text_widget',
        display_name: $.i18n.t('plugins_wd.text.display_name'),
        description: $.i18n.t('plugins_wd.text.description'),
        settings: [
            {
                name: 'title',
                display_name: $.i18n.t('plugins_wd.text.title'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_wd.text.title_desc')
            },
            {
                name: 'size',
                display_name: $.i18n.t('plugins_wd.text.size'),
                type: 'option',
                options: [
                    {
                        name: $.i18n.t('plugins_wd.text.size_options.regular'),
                        value: 'regular'
                    },
                    {
                        name: $.i18n.t('plugins_wd.text.size_options.big'),
                        value: 'big'
                    }
                ]
            },
            {
                name: 'value',
                display_name: $.i18n.t('plugins_wd.text.value'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.text.value_desc')
            },
            {
                name: 'decimal',
                display_name: $.i18n.t('plugins_wd.text.decimal'),
                type: 'number',
                validate: 'required,custom[integer],min[0],max[20]',
                style: 'width:100px',
                default_value: 0
            },
            {
                name: 'comma',
                display_name: $.i18n.t('plugins_wd.text.comma'),
                type: 'boolean',
                default_value: false,
            },
            {
                name: 'metric_prefix',
                display_name: $.i18n.t('plugins_wd.text.metric_prefix'),
                type: 'boolean',
                default_value: false,
                description: $.i18n.t('plugins_wd.text.metric_prefix_desc')
            },
            {
                name: 'units',
                display_name: $.i18n.t('plugins_wd.text.units'),
                validate: 'optional,maxSize[20]',
                type: 'text',
                style: 'width:150px',
                description: $.i18n.t('plugins_wd.text.units_desc')
            },
            {
                name: 'animate',
                display_name: $.i18n.t('plugins_wd.text.animate'),
                type: 'boolean',
                default_value: true
            },
            {
                name: 'chart',
                display_name: $.i18n.t('plugins_wd.text.chart'),
                type: 'boolean'
            },
            {
                name: 'chart_type',
                display_name: $.i18n.t('plugins_wd.text.chart_type'),
                type: 'option',
                options: [
                    {
                        name: $.i18n.t('plugins_wd.text.chart_type_options.line'),
                        value: 'line'
                    },
                    {
                        name: $.i18n.t('plugins_wd.text.chart_type_options.area'),
                        value: 'area'
                    },
                    {
                        name: $.i18n.t('plugins_wd.text.chart_type_options.bar'),
                        value: 'bar'
                    }
                ]
            },
            {
                name: 'chart_color',
                display_name: $.i18n.t('plugins_wd.text.chart_color'),
                validate: 'required,custom[hexcolor]',
                type: 'color',
                default_value: '#ff9900',
                description: $.i18n.t('plugins_wd.text.chart_color_desc')
            },
            {
                name: 'chart_minmax_color',
                display_name: $.i18n.t('plugins_wd.text.chart_minmax_color'),
                validate: 'required,custom[hexcolor]',
                type: 'color',
                default_value: '#0496ff',
                description: $.i18n.t('plugins_wd.text.chart_minmax_color_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new textWidget(settings));
        }
    });
}());

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

    freeboard.addStyle('.pointer-widget', 'width:100%;');

    var pointerWidget = function (settings) {
        var self = this;

        var CIRCLE_WIDTH = 3;
        var BLOCK_HEIGHT = 60;
        var PADDING = 10;

        var currentID = _.uniqueId('pointer_');
        var titleElement = $('<h2 class="section-title"></h2>');
        var widgetElement = $('<div class="pointer-widget" id="' + currentID + '"></div>');
        var currentSettings = settings;
        var fontcolor = '#d3d4d4';
        var widgetSize = {
            height: 0,
            width: 0
        };

        // d3 variables
        var svg = null, center = null, pointer = null, textValue = null, textUnits = null, circle = null;

        function setBlocks(blocks) {
            if (_.isUndefined(blocks))
                return;
            var titlemargin = (titleElement.css('display') === 'none') ? 0 : titleElement.outerHeight();
            var height = (BLOCK_HEIGHT) * blocks - PADDING - titlemargin;
            widgetElement.css({
                height: height + 'px',
                width: '100%'
            });
            resize();
        }

        function getWidgetSize(rc) {
            var h, w, aspect;
            if (rc.width > rc.height) {
                h = rc.height;
                w = h * 1.25;
                if (w > rc.width) {
                    aspect = w / rc.width;
                    w = w / aspect;
                    h = h / aspect;
                }
            } else if (rc.width < rc.height) {
                w = rc.width;
                h = w / 1.25;
                if (h > rc.height) {
                    aspect = w / rc.height;
                    h = h / aspect;
                    width = h / aspect;
                }
            } else {
                w = rc.width;
                h = w * 0.75;
            }
            return { height: h, width: w };
        }

        function polygonPath(points) {
            if (!points || points.length < 2)
                return [];
            var path;
            path = 'M'+points[0]+','+points[1];
            for (var i = 2; i < points.length; i += 2) {
                path += 'L'+points[i]+','+points[i+1];
            }
            path += 'Z';
            return path;
        }

        function getCenteringTransform(rc) {
            return 'translate(' + (rc.width/2) + ',' + (rc.height/2) + ')';
        }

        function getRadius(rc) {
            return Math.min(rc.height, rc.width) / 2 - CIRCLE_WIDTH * 2;
        }

        function calcValueFontSize(r) {
            return (5*r/102.5).toFixed(2);
        }

        function calcUnitsFontSize(r) {
            return (1.1*r/102.5).toFixed(2);
        }

        function getPointerPath(r) {
            return polygonPath([0, - r + CIRCLE_WIDTH, 15, -(r-20), -15, -(r-20)]);
        }

        function resize() {
            if (_.isNull(svg))
                return;

            var rc = widgetElement[0].getBoundingClientRect();
            var newSize = getWidgetSize(rc);

            svg.attr('height', rc.height);
            svg.attr('width', rc.width);

            var x = newSize.width / widgetSize.width;
            var y = newSize.height / widgetSize.height;

            center.attr('transform', getCenteringTransform(rc)+',scale('+x+', '+y+')');
        }

        function createWidget() {

            var rc = widgetElement[0].getBoundingClientRect();

            svg = d3.select('#' + currentID)
                .append('svg')
                .attr('width', rc.width)
                .attr('height', rc.height);

            center = svg.append('g')
                .attr('transform', getCenteringTransform(rc));

            widgetSize = getWidgetSize(rc);
            var r = getRadius(widgetSize);
            circle = center.append('circle')
                .attr('r', r)
                .style('fill', 'rgba(0, 0, 0, 0)')
                .style('stroke-width', CIRCLE_WIDTH)
                .style('stroke', currentSettings.circle_color);

            textValue = center.append('text')
                .text('0')
                .style('fill', fontcolor)
                .style('text-anchor', 'middle')
                .attr('dy', '.3em')
                .attr('font-size', calcValueFontSize(r) + 'em')
                .attr('class', 'ultralight-text');

            textUnits = center.append('text')
                .text(currentSettings.units)
                .style('fill', fontcolor)
                .style('text-anchor', 'middle')
                .attr('dy', '2.8em')
                .attr('font-size', calcUnitsFontSize(r) + 'em')
                .attr('class', 'ultralight-text');

            pointer = center.append('path')
                .style('fill', currentSettings.pointer_color)
                .attr('d', getPointerPath(r));
        }

        this.render = function (element) {
            $(element).append(titleElement).append(widgetElement);
            titleElement.html((_.isUndefined(currentSettings.title) ? '' : currentSettings.title));
            setBlocks(currentSettings.blocks);
            createWidget();
        };

        this.onSettingsChanged = function (newSettings) {
            if (_.isNull(svg)) {
                currentSettings = newSettings;
                return;
            }

            titleElement.html((_.isUndefined(newSettings.title) ? '' : newSettings.title));
            if (_.isUndefined(newSettings.title) || newSettings.title === '')
                titleElement.css('display', 'none');
            else
                titleElement.css('display', 'block');

            circle.style('stroke', newSettings.circle_color);
            pointer.style('fill', newSettings.pointer_color);
            textUnits.text((_.isUndefined(newSettings.units) ? '' : newSettings.units));
            setBlocks(newSettings.blocks);

            var updateCalculate = false;
            if (currentSettings.direction != newSettings.direction ||
                currentSettings.value_text != newSettings.value_text)
                updateCalculate = true;
            currentSettings = newSettings;
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (_.isNull(svg))
                return;
            if (settingName === 'direction') {
                pointer.transition()
                    .duration(250)
                    .ease('bounce-out')
                    .attrTween('transform', function(d, i, a) {
                        return d3.interpolateString(a, 'rotate(' + parseInt(newValue) + ', 0, 0)');
                    });
            } else if (settingName === 'value_text') {
                if (_.isUndefined(newValue))
                    return;
                textValue.transition()
                    .duration(500)
                    .ease('circle-out')
                    .tween('text', function() {
                        var i = d3.interpolate(this.textContent, Number(newValue));
                        return function(t) {
                            this.textContent = i(t).toFixed(1);
                        };
                    });
            }
        };

        this.onDispose = function () {
            if (!_.isNull(svg)) {
                center.remove();
                center = null;
                svg.remove();
                svg = null;
            }
        };

        this.onSizeChanged = function () {
            resize();
        };

        this.getHeight = function () {
            return currentSettings.blocks;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'pointer',
        display_name: $.i18n.t('plugins_wd.pointer.display_name'),
        description: $.i18n.t('plugins_wd.pointer.description'),
        settings: [
            {
                name: 'title',
                display_name: $.i18n.t('plugins_wd.pointer.title'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_wd.pointer.title_desc')
            },
            {
                name: 'blocks',
                display_name: $.i18n.t('plugins_wd.pointer.blocks'),
                validate: 'required,custom[integer],min[4],max[10]',
                type: 'number',
                style: 'width:100px',
                default_value: 4,
                description: $.i18n.t('plugins_wd.pointer.blocks_desc')
            },
            {
                name: 'direction',
                display_name: $.i18n.t('plugins_wd.pointer.direction'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.pointer.direction_desc')
            },
            {
                name: 'value_text',
                display_name: $.i18n.t('plugins_wd.pointer.value_text'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.pointer.value_text_desc')
            },
            {
                name: 'units',
                display_name: $.i18n.t('plugins_wd.pointer.units'),
                validate: 'optional,maxSize[20]',
                style: 'width:150px',
                type: 'text',
                description: $.i18n.t('plugins_wd.pointer.units_desc')
            },
            {
                name: 'circle_color',
                display_name: $.i18n.t('plugins_wd.pointer.circle_color'),
                validate: 'required,custom[hexcolor]',
                type: 'color',
                default_value: '#ff9900',
                description: $.i18n.t('plugins_wd.pointer.circle_color_desc')
            },
            {
                name: 'pointer_color',
                display_name: $.i18n.t('plugins_wd.pointer.pointer_color'),
                validate: 'required,custom[hexcolor]',
                type: 'color',
                default_value: '#fff',
                description: $.i18n.t('plugins_wd.pointer.pointer_color_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new pointerWidget(settings));
        }
    });
}());

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

    var gaugeWidget = function (settings) {
        var self = this;
        var BLOCK_HEIGHT = 60;

        var currentID = _.uniqueId('gauge-');
        var gaugeElement = $('<div class="gauge-widget" id="' + currentID + '"></div>');
        var gauge = null;

        var currentSettings = settings;

        function setBlocks(blocks) {
            if (_.isUndefined(blocks))
                return;
            var height = BLOCK_HEIGHT * blocks;
            gaugeElement.css({
                'height': height + 'px',
                'width': '100%'
            });
            if (!_.isNull(gauge))
                gauge.resize();
        }

        function createGauge() {
            if (!_.isNull(gauge)) {
                gauge.destroy();
                gauge = null;
            }

            gaugeElement.empty();

            gauge = new GaugeD3({
                bindto: currentID,
                title: {
                    text: currentSettings.title,
                    color: currentSettings.value_fontcolor,
                    class: 'normal-text'
                },
                value: {
                    val: 0,
                    min: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
                    max: (_.isUndefined(currentSettings.max_value) ? 0 : currentSettings.max_value),
                    color: currentSettings.value_fontcolor,
                    decimal: currentSettings.decimal,
                    comma: currentSettings.comma,
                    metricPrefix: currentSettings.metric_prefix,
                    metricPrefixDecimal: currentSettings.decimal,
                    metricPrefixMinMax: currentSettings.metric_prefix,
                    transition: currentSettings.animate,
                    hideMinMax: currentSettings.show_minmax ? false : true,
                    class: 'ultralight-text'
                },
                gauge: {
                    widthScale: currentSettings.gauge_width/100,
                    color: currentSettings.gauge_color,
                    type: currentSettings.type
                },
                label: {
                    text: currentSettings.units,
                    color: currentSettings.value_fontcolor,
                    class: 'normal-text'
                },
                level: {
                    colors: [ currentSettings.gauge_lower_color, currentSettings.gauge_mid_color, currentSettings.gauge_upper_color ]
                }
            });
        }

        this.render = function (element) {
            $(element).append(gaugeElement);
            setBlocks(currentSettings.blocks);
            createGauge();
        };

        this.onSettingsChanged = function (newSettings) {
            if (_.isNull(gauge)) {
                currentSettings = newSettings;
                return;
            }
            setBlocks(newSettings.blocks);

            var updateCalculate = false;

            if (currentSettings.title != newSettings.title ||
                currentSettings.type != newSettings.type ||
                currentSettings.value != newSettings.value ||
                currentSettings.decimal != newSettings.decimal ||
                currentSettings.comma != newSettings.comma ||
                currentSettings.metric_prefix != newSettings.metric_prefix ||
                currentSettings.animate != newSettings.animate ||
                currentSettings.units != newSettings.units ||
                currentSettings.value_fontcolor != newSettings.value_fontcolor ||
                currentSettings.gauge_upper_color != newSettings.gauge_upper_color ||
                currentSettings.gauge_mid_color != newSettings.gauge_mid_color ||
                currentSettings.gauge_lower_color != newSettings.gauge_lower_color ||
                currentSettings.gauge_color != newSettings.gauge_color ||
                currentSettings.gauge_width != newSettings.gauge_width ||
                currentSettings.show_minmax != newSettings.show_minmax ||
                currentSettings.min_value != newSettings.min_value ||
                currentSettings.max_value != newSettings.max_value) {
                updateCalculate = true;
                currentSettings = newSettings;
                createGauge();
            } else {
                currentSettings = newSettings;
            }
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isNull(gauge))
                gauge.refresh(Number(newValue));
        };

        this.onDispose = function () {
            if (!_.isNull(gauge)) {
                gauge.destroy();
                gauge = null;
            }
        };

        this.onSizeChanged = function () {
            if (!_.isNull(gauge))
                gauge.resize();
        };

        this.getHeight = function () {
            return currentSettings.blocks;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'gauge',
        display_name: $.i18n.t('plugins_wd.gauge.display_name'),
        description: $.i18n.t('plugins_wd.gauge.description'),
        external_scripts : [
            'plugins/thirdparty/gauged3.min.js'
        ],
        settings: [
            {
                name: 'title',
                display_name: $.i18n.t('plugins_wd.gauge.title'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_wd.gauge.title_desc')
            },
            {
                name: 'blocks',
                display_name: $.i18n.t('plugins_wd.gauge.blocks'),
                validate: 'required,custom[integer],min[4],max[10]',
                type: 'number',
                style: 'width:100px',
                default_value: 4,
                description: $.i18n.t('plugins_wd.gauge.blocks_desc')
            },
            {
                name: 'type',
                display_name: $.i18n.t('plugins_wd.gauge.type'),
                type: 'option',
                options: [
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.half'),
                        value: 'half'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.quarter-left-top'),
                        value: 'quarter-left-top'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.quarter-right-top'),
                        value: 'quarter-right-top'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.quarter-left-bottom'),
                        value: 'quarter-left-bottom'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.quarter-right-bottom'),
                        value: 'quarter-right-bottom'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.threequarter-left-top'),
                        value: 'threequarter-left-top'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.threequarter-right-top'),
                        value: 'threequarter-right-top'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.threequarter-left-bottom'),
                        value: 'threequarter-left-bottom'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.threequarter-right-bottom'),
                        value: 'threequarter-right-bottom'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.threequarter-bottom'),
                        value: 'threequarter-bottom'
                    },
                    {
                        name: $.i18n.t('plugins_wd.gauge.type_options.donut'),
                        value: 'donut'
                    }
                ]
            },
            {
                name: 'value',
                display_name: $.i18n.t('plugins_wd.gauge.value'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.gauge.value_desc')
            },
            {
                name: 'decimal',
                display_name: $.i18n.t('plugins_wd.gauge.decimal'),
                type: 'number',
                validate: 'required,custom[integer],min[0],max[4]',
                style: 'width:100px',
                default_value: 0
            },
            {
                name: 'comma',
                display_name: $.i18n.t('plugins_wd.gauge.comma'),
                type: 'boolean',
                default_value: false,
            },
            {
                name: 'metric_prefix',
                display_name: $.i18n.t('plugins_wd.gauge.metric_prefix'),
                type: 'boolean',
                default_value: false,
                description: $.i18n.t('plugins_wd.gauge.metric_prefix_desc'),
            },
            {
                name: 'animate',
                display_name: $.i18n.t('plugins_wd.gauge.animate'),
                type: 'boolean',
                default_value: true
            },
            {
                name: 'units',
                display_name: $.i18n.t('plugins_wd.gauge.units'),
                validate: 'optional,maxSize[20],custom[illegalEscapeChar]',
                style: 'width:150px',
                type: 'text',
                description: $.i18n.t('plugins_wd.gauge.units_desc')
            },
            {
                name: 'value_fontcolor',
                display_name: $.i18n.t('plugins_wd.gauge.value_fontcolor'),
                type: 'color',
                validate: 'required,custom[hexcolor]',
                default_value: '#d3d4d4',
                description: $.i18n.t('plugins_wd.gauge.value_fontcolor_desc')
            },
            {
                name: 'gauge_upper_color',
                display_name: $.i18n.t('plugins_wd.gauge.gauge_upper_color'),
                type: 'color',
                validate: 'required,custom[hexcolor]',
                default_value: '#ff0000',
                description: $.i18n.t('plugins_wd.gauge.gauge_upper_color_desc')
            },
            {
                name: 'gauge_mid_color',
                display_name: $.i18n.t('plugins_wd.gauge.gauge_mid_color'),
                type: 'color',
                validate: 'required,custom[hexcolor]',
                default_value: '#f9c802',
                description: $.i18n.t('plugins_wd.gauge.gauge_mid_color_desc')
            },
            {
                name: 'gauge_lower_color',
                display_name: $.i18n.t('plugins_wd.gauge.gauge_lower_color'),
                type: 'color',
                validate: 'required,custom[hexcolor]',
                default_value: '#a9d70b',
                description: $.i18n.t('plugins_wd.gauge.gauge_lower_color_desc')
            },
            {
                name: 'gauge_color',
                display_name: $.i18n.t('plugins_wd.gauge.gauge_color'),
                type: 'color',
                validate: 'required,custom[hexcolor]',
                default_value: '#edebeb',
                description: $.i18n.t('plugins_wd.gauge.gauge_color_desc')
            },
            {
                name: 'gauge_width',
                display_name: $.i18n.t('plugins_wd.gauge.gauge_width'),
                type: 'number',
                style: 'width:100px',
                validate: 'required,custom[integer],min[0],max[100]',
                default_value: 50,
                description: $.i18n.t('plugins_wd.gauge.gauge_width_desc')
            },
            {
                name: 'show_minmax',
                display_name: $.i18n.t('plugins_wd.gauge.show_minmax'),
                type: 'boolean',
                default_value: true
            },
            {
                name: 'min_value',
                display_name: $.i18n.t('plugins_wd.gauge.min_value'),
                type: 'number',
                style: 'width:100px',
                validate: 'required,custom[number],min[-100000000000],max[100000000000]',
                default_value: 0
            },
            {
                name: 'max_value',
                display_name: $.i18n.t('plugins_wd.gauge.max_value'),
                type: 'number',
                style: 'width:100px',
                validate: 'required,custom[number],min[-100000000000],max[100000000000]',
                default_value: 100,
                description: $.i18n.t('plugins_wd.gauge.max_value_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new gaugeWidget(settings));
        }
    });
}());

// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                                                                      │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                                                        │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                                                        │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function() {
	'use strict';

	var c3jsWidget = function (settings) {
		var self = this;
		var BLOCK_HEIGHT = 60;
		var PADDING = 10;

		var currentID = _.uniqueId('c3js_');
		var titleElement = $('<h2 class="section-title"></h2>');
		var chartElement = $('<div id="' + currentID + '"></div>');
		var currentSettings;
		var chart = null;

		function setBlocks(blocks) {
			if (_.isUndefined(blocks))
				return;

			var titlemargin = (titleElement.css('display') === 'none') ? 0 : titleElement.outerHeight();
			var height = (BLOCK_HEIGHT) * blocks - PADDING - titlemargin;
			chartElement.css({
				'max-height': height + 'px',
				'height': height + 'px',
				'width': '100%'
			});
			if (!_.isNull(chart))
				chart.resize();
		}

		function createWidget(data, chartsettings) {

			var options;

			// No need for the first load
			data = _.omit(data, '_op');

			Function.prototype.toJSON = Function.prototype.toString;

			if (!_.isUndefined(chartsettings.options)) {
				try {
					options = JSON.parse(chartsettings.options.replace(/'/g, '\\\"'), function(k,v) {
						var ret;
						var str = v.toString();
						if (str.indexOf('function') === 0)
							ret = eval('('+v+')');
						else if (str.indexOf('d3.') === 0)
							ret = eval('('+v+')');
						else
							ret = v;
						return ret;
					});
				} catch (e) {
					alert($.i18n.t('plugins_wd.c3js.options_invalid') + e);
					console.error(e);
					return;
				}
			}

			if (!_.isNull(chart)) {
				chartElement.resize(null);
				chart.destroy();
				chart = null;
			}

			var bind = {
				bindto: '#' + currentID,
			};
			options = _.merge(bind, _.merge(data, options));

			try {
				chart = c3.generate(options);
				chart.resize();
			} catch (e) {
				console.error(e);
				return;
			}
		}

		function destroyChart() {
			if (!_.isNull(chart)) {
				chart.destroy();
				chart = null;
			}
		}

		function plotData(data) {
			if (_.isNull(chart))
				return;

			var op = data._op;
			data = _.omit(data, '_op');

			try {
				switch (op) {
				case 'load':
					chart.load(data);
					break;
				case 'unload':
					chart.unload(data);
					break;
				case 'groups':
					chart.groups(data);
					break;
				case 'flow':
					chart.flow(data);
					break;
				case 'data.names':
					chart.data.names(data);
					break;
				case 'data.colors':
					chart.data.colors(data);
					break;
				case 'axis.labels':
					chart.axis.labels(data);
					break;
				case 'axis.max':
					chart.axis.max(data);
					break;
				case 'axis.min':
					chart.axis.min(data);
					break;
				case 'axis.range':
					chart.axis.range(data);
					break;
				case 'xgrids':
					if (!_.isUndefined(data.xgrids))
						chart.xgrids(data.xgrids);
					break;
				case 'xgrids.add':
					if (!_.isUndefined(data.xgrids))
						chart.xgrids.add(data.xgrids);
					break;
				case 'xgrids.remove':
					if (!_.isUndefined(data.xgrids))
						chart.xgrids.remove(data.xgrids);
					else
						chart.xgrids.remove();
					break;
				case 'transform':
					if (!_.isUndefined(data.type)) {
						if (!_.isUndefined(data.name))
							chart.transform(data.type, data.name);
						else
							chart.transform(data.type);
					}
					break;
				default:
					chart.load(data);
					break;
				}
			} catch (e) {
				console.error(e);
			}
		}

		this.render = function (element) {
			$(element).append(titleElement).append(chartElement);
			titleElement.html((_.isUndefined(currentSettings.title) ? '' : currentSettings.title));
			setBlocks(currentSettings.blocks);
		};

		this.onSettingsChanged = function (newSettings) {
			if (titleElement.outerHeight() === 0) {
				currentSettings = newSettings;
				return;
			}

			titleElement.html((_.isUndefined(newSettings.title) ? '' : newSettings.title));
			if (_.isUndefined(newSettings.title) || newSettings.title === '')
				titleElement.css('display', 'none');
			else
				titleElement.css('display', 'block');

			setBlocks(newSettings.blocks);

			var updateCalculate = false;
			if (currentSettings.options != newSettings.options) {
				destroyChart();
				updateCalculate = true;
			}
			if (currentSettings.value != newSettings.value)
				updateCalculate = true;

			currentSettings = newSettings;
			return updateCalculate;
		};

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (!_.isObject(newValue))
				return;

			if (_.isNull(chart))
				createWidget(newValue, currentSettings);
			else
				plotData(newValue);
		};

		this.onDispose = function () {
			destroyChart();
		};

		this.onSizeChanged = function () {
			if (!_.isNull(chart))
				chart.resize();
		};

		this.getHeight = function () {
			return currentSettings.blocks;
		};

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: 'c3js',
		display_name: $.i18n.t('plugins_wd.c3js.display_name'),
		description: $.i18n.t('plugins_wd.c3js.description'),
		external_scripts : [
			'plugins/thirdparty/c3.min.js'
		],
		settings: [
			{
				name: 'title',
				display_name: $.i18n.t('plugins_wd.c3js.title'),
				validate: 'optional,maxSize[100]',
				type: 'text',
				description: $.i18n.t('plugins_wd.c3js.title_desc'),
			},
			{
				name: 'blocks',
				display_name: $.i18n.t('plugins_wd.c3js.blocks'),
				validate: 'required,custom[integer],min[2],max[20]',
				type: 'number',
				style: 'width:100px',
				default_value: 4,
				description: $.i18n.t('plugins_wd.c3js.blocks_desc')
			},
			{
				name: 'value',
				display_name: $.i18n.t('plugins_wd.c3js.value'),
				validate: 'optional,maxSize[5000]',
				type: 'calculated',
				description: $.i18n.t('plugins_wd.c3js.value_desc')
			},
			{
				name: 'options',
				display_name: $.i18n.t('plugins_wd.c3js.options'),
				validate: 'optional,maxSize[5000]',
				type: 'json',
				default_value: '{\n\
	"data": {\n\
		"type": "line"\n\
	}\n\
}',
				description: $.i18n.t('plugins_wd.c3js.options_desc')
			}
		],

		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new c3jsWidget(settings));
		}
	});
}());

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

    freeboard.addStyle('.indicator-light', 'border-radius:50%;width:22px;height:22px;border:2px solid #3d3d3d;margin-top:5px;float:left;background-color:#222;margin-right:10px;');
    freeboard.addStyle('.indicator-light.on', 'background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;');
    freeboard.addStyle('.indicator-text', 'margin-top:10px;');

    var indicatorWidget = function(settings) {
        var self = this;
        var titleElement = $('<h2 class="section-title"></h2>');
        var stateElement = $('<div class="indicator-text"></div>');
        var indicatorElement = $('<div class="indicator-light"></div>');
        var currentSettings = settings;
        var isOn = false;

        function updateState() {
            indicatorElement.toggleClass('on', isOn);

            if (isOn) {
                stateElement.text((_.isUndefined(currentSettings.on_text) ? '' : currentSettings.on_text));
            }
            else {
                stateElement.text((_.isUndefined(currentSettings.off_text) ? '' : currentSettings.off_text));
            }
        }

        this.render = function (element) {
            $(element).append(titleElement).append(indicatorElement).append(stateElement);
        };

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? '' : newSettings.title));
            updateState();
            return true;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName === 'value') {
                isOn = Boolean(newValue);
            }

            updateState();
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
            return 1;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'indicator',
        display_name: $.i18n.t('plugins_wd.indicator.display_name'),
        description: $.i18n.t('plugins_wd.indicator.description.display_name'),
        settings: [
            {
                name: 'title',
                display_name: $.i18n.t('plugins_wd.indicator.title'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_wd.indicator.title_desc')
            },
            {
                name: 'value',
                display_name: $.i18n.t('plugins_wd.indicator.value'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.indicator.value_desc')
            },
            {
                name: 'on_text',
                display_name: $.i18n.t('plugins_wd.indicator.on_text'),
                validate: 'optional,maxSize[500]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.indicator.on_text_desc')
            },
            {
                name: 'off_text',
                display_name: $.i18n.t('plugins_wd.indicator.off_text'),
                validate: 'optional,maxSize[500]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.indicator.off_text_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new indicatorWidget(settings));
        }
    });
}());

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

    freeboard.addStyle('.picture-widget', 'background-size:contain; background-position:center; background-repeat: no-repeat;');

    var pictureWidget = function(settings) {
        var self = this;
        var BLOCK_HEIGHT = 60;
        var PADDING = 10;

        var widgetElement = $('<div class="picture-widget"></div>');
        var titleElement = $('<h2 class="section-title"></h2>');
        var currentSettings;
        var timer;
        var imageURL;

        function setBlocks(blocks) {
            if (_.isUndefined(blocks))
                return;
            var titlemargin = (titleElement.css('display') === 'none') ? 0 : titleElement.outerHeight();
            var height = (BLOCK_HEIGHT) * blocks - PADDING - titlemargin;
            widgetElement.css({
                'height': height + 'px',
                'width': '100%'
            });
        }

        function stopTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function updateImage() {
            if (widgetElement && imageURL) {
                var cacheBreakerURL = imageURL + (imageURL.indexOf('?') === -1 ? '?' : '&') + Date.now();

                $(widgetElement).css({
                    'background-image' :  'url(' + cacheBreakerURL + ')'
                });
            }
        }

        this.render = function(element) {
            $(element).append(titleElement).append(widgetElement);
            titleElement.html((_.isUndefined(currentSettings.title) ? '' : currentSettings.title));
            setBlocks(currentSettings.blocks);
        };

        this.onSettingsChanged = function(newSettings) {
            if (titleElement.outerHeight() === 0) {
                currentSettings = newSettings;
                return;
            }
            stopTimer();

            if (newSettings.refresh && newSettings.refresh > 0)
                timer = setInterval(updateImage, Number(newSettings.refresh) * 1000);

            titleElement.html((_.isUndefined(newSettings.title) ? '' : newSettings.title));
            if (_.isUndefined(newSettings.title) || newSettings.title === '')
                titleElement.css('display', 'none');
            else
                titleElement.css('display', 'block');

            setBlocks(newSettings.blocks);
            var updateCalculate = false;
            if (currentSettings.src != newSettings.src)
                updateCalculate = true;
            currentSettings = newSettings;
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function(settingName, newValue) {
            if (settingName === 'src')
                imageURL = newValue;

            updateImage();
        };

        this.onDispose = function() {
            stopTimer();
        };

        this.getHeight = function() {
            return currentSettings.blocks;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'picture',
        display_name: $.i18n.t('plugins_wd.picture.display_name'),
        description: $.i18n.t('plugins_wd.picture.description'),
        settings: [
            {
                name: 'title',
                display_name: $.i18n.t('plugins_wd.picture.title'),
                validate: 'optional,maxSize[100]',
                type: 'text',
                description: $.i18n.t('plugins_wd.picture.title_desc')
            },
            {
                name: 'blocks',
                display_name: $.i18n.t('plugins_wd.picture.blocks'),
                validate: 'required,custom[integer],min[4],max[20]',
                type: 'number',
                style: 'width:100px',
                default_value: 4,
                description: $.i18n.t('plugins_wd.picture.blocks_desc'),
            },
            {
                name: 'src',
                display_name: $.i18n.t('plugins_wd.picture.src'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.picture.src_desc')
            },
            {
                name: 'refresh',
                display_name: $.i18n.t('plugins_wd.picture.refresh'),
                validate: 'optional,custom[integer],min[1]',
                type: 'number',
                style: 'width:100px',
                suffix: $.i18n.t('plugins_wd.picture.refresh_suffix'),
                description: $.i18n.t('plugins_wd.picture.refresh_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new pictureWidget(settings));
        }
    });
}());

// ┌─────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                │ \\
// ├─────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                       │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                             │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                  │ \\
// ├─────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                  │ \\
// └─────────────────────────────────────────┘ \\

(function() {
    'use strict';

    freeboard.addStyle('.htmlwidget', 'white-space:normal;display:table;');
    freeboard.addStyle('.htmlwidget > *',
        '-moz-box-sizing: border-box;' +
        '-webkit-box-sizing: border-box;' +
        'box-sizing: border-box;');

    var htmlWidget = function (settings) {
        var self = this;
        var BLOCK_HEIGHT = 60;

        var currentID = _.uniqueId('htmlwidget_');
        var htmlElement = $('<div class="htmlwidget" id="' + currentID + '"></div>');
        var currentSettings = settings;

        function setBlocks(blocks) {
            if (_.isUndefined(blocks))
                return;
            var height = BLOCK_HEIGHT * blocks;
            htmlElement.css({
                'height': height + 'px',
                'width': '100%'
            });
        }

        this.render = function (element) {
            $(element).append(htmlElement);
            setBlocks(currentSettings.blocks);
        };

        this.onSettingsChanged = function (newSettings) {
            setBlocks(newSettings.blocks);
            htmlElement.html(newSettings.contents);

            var updateCalculate = false;
            if (currentSettings.value != newSettings.value)
                updateCalculate = true;

            currentSettings = newSettings;
            return updateCalculate;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
        };

        this.onDispose = function () {
            htmlElement.remove();
        };

        this.getHeight = function () {
            return currentSettings.blocks;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: 'html',
        display_name: $.i18n.t('plugins_wd.html.display_name'),
        description: $.i18n.t('plugins_wd.html.description'),
        fill_size: true,
        settings: [
            {
                name: 'contents',
                display_name: $.i18n.t('plugins_wd.html.contents'),
                type: 'htmlmixed',
                validate: 'optional,maxSize[5000]',
                description: $.i18n.t('plugins_wd.html.contents_desc')
            },
            {
                name: 'value',
                display_name: $.i18n.t('plugins_wd.html.value'),
                validate: 'optional,maxSize[2000]',
                type: 'calculated',
                description: $.i18n.t('plugins_wd.html.value_desc')
            },
            {
                name: 'blocks',
                display_name: $.i18n.t('plugins_wd.html.blocks'),
                type: 'number',
                validate: 'required,custom[integer],min[1],max[10]',
                style: 'width:100px',
                default_value: 4,
                description: $.i18n.t('plugins_wd.html.blocks_desc')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new htmlWidget(settings));
        }
    });
}());