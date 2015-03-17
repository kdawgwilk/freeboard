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
