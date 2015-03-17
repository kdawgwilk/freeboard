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
