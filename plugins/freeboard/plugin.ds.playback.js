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