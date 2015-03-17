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