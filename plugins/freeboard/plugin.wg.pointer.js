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
