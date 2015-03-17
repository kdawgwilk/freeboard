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
