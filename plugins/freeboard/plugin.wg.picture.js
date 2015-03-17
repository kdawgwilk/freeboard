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
