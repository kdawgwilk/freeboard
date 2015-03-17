// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

PluginEditor = function(jsEditor, valueEditor) {
    'use strict';

    function _removeSettingsRows() {
        if ($('#setting-row-instance-name').length)
            $('#setting-row-instance-name').nextAll().remove();
        else
            $('#setting-row-plugin-types').nextAll().remove();
    }

    function _toValidateClassString(validate, type) {
        var ret = '';
        if (!_.isUndefined(validate)) {
            var types = '';
            if (!_.isUndefined(type))
                types = ' ' + type;
            ret = 'validate[' + validate + ']' + types;
        }
        return ret;
    }

    function _isNumerical(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _appendCalculatedSettingRow(valueCell, newSettings, settingDef, currentValue, includeRemove) {
        var input = $('<textarea></textarea>').addClass(_toValidateClassString(settingDef.validate, 'text-input')).attr('style', settingDef.style);

        if(settingDef.multi_input) {
            input.change(function() {
                var arrayInput = [];
                $(valueCell).find('textarea').each(function() {
                    var thisVal = $(this).val();
                    if(thisVal)
                        arrayInput = arrayInput.concat(thisVal);
                });
                newSettings.settings[settingDef.name] = arrayInput;
            });
        } else {
            input.change(function() {
                newSettings.settings[settingDef.name] = $(this).val();
            });
        }

        if(currentValue)
            input.val(currentValue);

        valueEditor.createValueEditor(input);

        var datasourceToolbox = $('<ul class="board-toolbar datasource-input-suffix"></ul>');
        var wrapperDiv = $('<div class="calculated-setting-row"></div>');

        wrapperDiv.append(input).append(datasourceToolbox);

        var datasourceTool = $('<li><i class="fa-w fa-plus"></i><label>' + $.i18n.t('PluginEditor.datasource_tool') + '</label></li>')
            .mousedown(function(e) {
                e.preventDefault();
                $(input).val('').focus().insertAtCaret('datasources[\"').trigger('freeboard-eval');
            });
        datasourceToolbox.append(datasourceTool);

        var jsEditorTool = $('<li><i class="fa-w fa-edit"></i><label>.JS EDITOR</label></li>')
            .mousedown(function(e) {
                e.preventDefault();
                jsEditor.displayJSEditor(input.val(), 'javascript', function(result) {
                    input.val(result);
                    input.change();
                });
            });
        datasourceToolbox.append(jsEditorTool);

        if(includeRemove) {
            var removeButton = $('<li class="remove-setting-row"><i class="fa-w fa-minus"></i><label></label></li>')
                .mousedown(function(e) {
                    e.preventDefault();
                    wrapperDiv.remove();
                    $(valueCell).find('textarea:first').change();
            });
            datasourceToolbox.prepend(removeButton);
        }

        $(valueCell).append(wrapperDiv);
    }

    function createSettingRow(form, name, displayName) {
        var tr = $('<div id="setting-row-' + name + '" class="form-row"></div>').appendTo(form);

        tr.append('<div class="form-label"><label class="control-label">' + displayName + '</label></div>');
        return $('<div id="setting-value-container-' + name + '" class="form-value"></div>').appendTo(tr);
    }

    function appendArrayCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        var subTableDiv = $('<div class="form-table-value-subtable"></div>').appendTo(valueCell);

        var subTable = $('<table class="table table-condensed sub-table"></table>').appendTo(subTableDiv);
        var subTableHead = $('<thead></thead>').hide().appendTo(subTable);
        var subTableHeadRow = $('<tr></tr>').appendTo(subTableHead);
        var subTableBody = $('<tbody></tbody>').appendTo(subTable);

        var currentSubSettingValues = [];

        // Create our headers
        _.each(settingDef.settings, function(subSettingDef) {
            var subsettingDisplayName = subSettingDef.name;

            if(!_.isUndefined(subSettingDef.display_name))
                subsettingDisplayName = subSettingDef.display_name;

            $('<th>' + subsettingDisplayName + '</th>').appendTo(subTableHeadRow);
        });

        if(settingDef.name in currentSettingsValues)
            currentSubSettingValues = currentSettingsValues[settingDef.name];

        var processHeaderVisibility = function() {
            (newSettings.settings[settingDef.name].length > 0) ? subTableHead.show() : subTableHead.hide();
        };

        var createSubsettingRow = function(subsettingValue) {
            var subsettingRow = $('<tr></tr>').appendTo(subTableBody);

            var newSetting = {};

            if(!_.isArray(newSettings.settings[settingDef.name]))
                newSettings.settings[settingDef.name] = [];

            newSettings.settings[settingDef.name].push(newSetting);

            _.each(settingDef.settings, function(subSettingDef) {
                var subsettingCol = $('<td></td>').appendTo(subsettingRow);
                var subsettingValueString = '';

                if(!_.isUndefined(subsettingValue[subSettingDef.name]))
                    subsettingValueString = subsettingValue[subSettingDef.name];

                newSetting[subSettingDef.name] = subsettingValueString;

                $('<input class="table-row-value" type="text">')
                        .addClass(_toValidateClassString(subSettingDef.validate, 'text-input'))
                        .attr('style', settingDef.style)
                        .appendTo(subsettingCol).val(subsettingValueString).change(function() {
                    newSetting[subSettingDef.name] = $(this).val();
                });
            });

            subsettingRow.append($('<td class="table-row-operation"></td>').append($('<ul class="board-toolbar"></ul>').append($('<li></li>').append($('<i class="fa-w fa-trash"></i>').click(function() {
                                    var subSettingIndex = newSettings.settings[settingDef.name].indexOf(newSetting);

                                    if(subSettingIndex !== -1) {
                                        newSettings.settings[settingDef.name].splice(subSettingIndex, 1);
                                        subsettingRow.remove();
                                        processHeaderVisibility();
                                    }
                                })))));

            subTableDiv.scrollTop(subTableDiv[0].scrollHeight);

            processHeaderVisibility();
        };

        $('<div class="table-operation text-button">' + $.i18n.t('PluginEditor.table_operation') + '</div>').appendTo(valueCell).click(function() {
            var newSubsettingValue = {};

            _.each(settingDef.settings, function(subSettingDef) {
                newSubsettingValue[subSettingDef.name] = '';
            });

            createSubsettingRow(newSubsettingValue);
        });

        // Create our rows
        _.each(currentSubSettingValues, function(currentSubSettingValue, subSettingIndex) {
            createSubsettingRow(currentSubSettingValue);
        });
    }

    function appendBooleanCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        newSettings.settings[settingDef.name] = currentSettingsValues[settingDef.name];

        var onOffSwitch = $('<div class="onoffswitch"><label class="onoffswitch-label" for="' + settingDef.name + '-onoff"><div class="onoffswitch-inner"><span class="on">' + $.i18n.t('global.yes') + '</span><span class="off">' + $.i18n.t('global.no') + '</span></div><div class="onoffswitch-switch"></div></label></div>').appendTo(valueCell);

        var input = $('<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + settingDef.name + '-onoff">').prependTo(onOffSwitch).change(function() {
            newSettings.settings[settingDef.name] = this.checked;
        });

        if(settingDef.name in currentSettingsValues)
            input.prop('checked', currentSettingsValues[settingDef.name]);
    }

    function appendOptionCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        var defaultValue = currentSettingsValues[settingDef.name];

        var input = $('<select></select>')
                            .addClass(_toValidateClassString(settingDef.validate))
                            .attr('style', settingDef.style)
                            .appendTo($('<div class="styled-select"></div>')
                            .appendTo(valueCell)).change(function() {
            newSettings.settings[settingDef.name] = $(this).val();
        });

        _.each(settingDef.options, function(option) {
            var optionName;
            var optionValue;

            if (_.isObject(option)) {
                optionName = option.name;
                optionValue = option.value;
            } else {
                optionName = option;
            }

            if (_.isUndefined(optionValue))
                optionValue = optionName;

            if (_.isUndefined(defaultValue))
                defaultValue = optionValue;

            $('<option></option>').text(optionName).attr('value', optionValue).appendTo(input);
        });

        newSettings.settings[settingDef.name] = defaultValue;

        if(settingDef.name in currentSettingsValues)
            input.val(currentSettingsValues[settingDef.name]);
    }

    function appendColorCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        var curColorPickerID = _.uniqueId('picker-');
        var thisColorPickerID = '#' + curColorPickerID;
        var defaultValue = currentSettingsValues[settingDef.name];
        var input = $('<input id="' + curColorPickerID + '" type="text">').addClass(_toValidateClassString(settingDef.validate, 'text-input')).appendTo(valueCell);

        newSettings.settings[settingDef.name] = defaultValue;

        $(thisColorPickerID).css({
            'border-right':'30px solid green',
            'width':'80px'
        });

        $(thisColorPickerID).css('border-color', defaultValue);

        var defhex = defaultValue;
        defhex.replace('#', '');

        $(thisColorPickerID).colpick({
            layout:'hex',
            colorScheme:'dark',
            color: defhex,
            submit:0,
            onChange:function(hsb,hex,rgb,el,bySetColor) {
                $(el).css('border-color','#'+hex);
                newSettings.settings[settingDef.name] = '#'+hex;
                if(!bySetColor) {
                    $(el).val('#'+hex);
                }
            }
        }).keyup(function(){
            $(this).colpickSetColor(this.value);
        });

        if(settingDef.name in currentSettingsValues) {
            input.val(currentSettingsValues[settingDef.name]);
        }
    }

    function appendJsonCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        newSettings.settings[settingDef.name] = currentSettingsValues[settingDef.name];

        var input = $('<textarea class="calculated-value-input" style="z-index: 3000"></textarea>')
                .addClass(_toValidateClassString(settingDef.validate, 'text-input'))
                .attr('style', settingDef.style)
                .appendTo(valueCell).change(function() {
            newSettings.settings[settingDef.name] = $(this).val();
        });

        if(settingDef.name in currentSettingsValues)
            input.val(currentSettingsValues[settingDef.name]);

        valueEditor.createValueEditor(input);

        var datasourceToolbox = $('<ul class="board-toolbar datasource-input-suffix"></ul>');

        var jsEditorTool = $('<li><i class="fa-w fa-edit"></i><label>.JSON EDITOR</label></li>').mousedown(function(e) {
            e.preventDefault();

            jsEditor.displayJSEditor(input.val(), 'json', function(result){
                input.val(result);
                input.change();
            });
        });

        $(valueCell).append(datasourceToolbox.append(jsEditorTool));
    }

    function appendHtmlMixedCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        newSettings.settings[settingDef.name] = currentSettingsValues[settingDef.name];

        var input = $('<textarea class="calculated-value-input" style="z-index: 3000"></textarea>')
                .addClass(_toValidateClassString(settingDef.validate, 'text-input'))
                .attr('style', settingDef.style)
                .appendTo(valueCell).change(function() {
            newSettings.settings[settingDef.name] = $(this).val();
        });

        if(settingDef.name in currentSettingsValues)
            input.val(currentSettingsValues[settingDef.name]);

        valueEditor.createValueEditor(input);

        var datasourceToolbox = $('<ul class="board-toolbar datasource-input-suffix"></ul>');

        var jsEditorTool = $('<li><i class="fa-w fa-edit"></i><label>.HTML EDITOR</label></li>').mousedown(function(e) {
            e.preventDefault();

            jsEditor.displayJSEditor(input.val(), 'htmlmixed', function(result){
                input.val(result);
                input.change();
            });
        });

        $(valueCell).append(datasourceToolbox.append(jsEditorTool));
    }

    function appendTextCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        newSettings.settings[settingDef.name] = currentSettingsValues[settingDef.name];

        var input = $('<input type="text">')
                            .addClass(_toValidateClassString(settingDef.validate, 'text-input'))
                            .attr('style', settingDef.style)
                            .appendTo(valueCell).change(function() {
            if (settingDef.type == 'number')
                newSettings.settings[settingDef.name] = Number($(this).val());
            else
                newSettings.settings[settingDef.name] = $(this).val();
        });

        if (settingDef.name in currentSettingsValues)
            input.val(currentSettingsValues[settingDef.name]);
    }

    function appendCalculatedCell(form, valueCell, settingDef, currentSettingsValues, newSettings) {
        newSettings.settings[settingDef.name] = currentSettingsValues[settingDef.name];

        if (settingDef.name in currentSettingsValues) {
            var currentValue = currentSettingsValues[settingDef.name];
            if(settingDef.multi_input && _.isArray(currentValue)) {
                var includeRemove = false;
                for(var i = 0; i < currentValue.length; i++) {
                    _appendCalculatedSettingRow(valueCell, newSettings, settingDef, currentValue[i], includeRemove);
                    includeRemove = true;
                }
            } else {
                _appendCalculatedSettingRow(valueCell, newSettings, settingDef, currentValue, false);
            }
        } else {
            _appendCalculatedSettingRow(valueCell, newSettings, settingDef, null, false);
        }

        if (settingDef.multi_input) {
            var inputAdder = $('<ul class="board-toolbar"><li class="add-setting-row"><i class="fa-w fa-plus"></i><label>' + $.i18n.t('PluginEditor.tableOperation') + '</label></li></ul>')

                .mousedown(function(e) {
                    e.preventDefault();
                    _appendCalculatedSettingRow(valueCell, newSettings, settingDef, null, true);
                });
            $(valueCell).siblings('.form-label').append(inputAdder);
        }
    }

    function createPluginEditor(title, pluginTypes, currentTypeName, currentSettingsValues, settingsSavedCallback, cancelCallback) {
        var newSettings = {
            type    : currentTypeName,
            settings: {}
        };

        var selectedType;
        var form = $('<form id="plugin-editor"></form>');

        var pluginDescriptionElement = $('<div id="plugin-description"></div>').hide();
        form.append(pluginDescriptionElement);

        function createSettingsFromDefinition(settingsDefs) {

            _.each(settingsDefs, function(settingDef) {
                // Set a default value if one doesn't exist
                if(!_.isUndefined(settingDef.default_value) && _.isUndefined(currentSettingsValues[settingDef.name]))
                    currentSettingsValues[settingDef.name] = settingDef.default_value;

                var displayName = settingDef.name;

                if(!_.isUndefined(settingDef.display_name))
                    displayName = settingDef.display_name;

                settingDef.style = _.isUndefined(settingDef.style) ? '' : settingDef.style;

                // modify required field name
                if(!_.isUndefined(settingDef.validate)) {
                    if (settingDef.validate.indexOf('required') != -1) {
                        displayName = '* ' + displayName;
                    }
                }

                // unescape text value
                if (settingDef.type === 'text')
                    currentSettingsValues[settingDef.name] = _.unescape(currentSettingsValues[settingDef.name]);

                var valueCell = createSettingRow(form, settingDef.name, displayName);
                var input, defaultValue;

                switch (settingDef.type) {
                    case 'array':
                        appendArrayCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'boolean':
                        appendBooleanCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'option':
                        appendOptionCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'color':
                        appendColorCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'htmlmixed':
                        appendHtmlMixedCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'json':
                        appendJsonCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'text':
                        appendTextCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    case 'calculated':
                        appendCalculatedCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                    default:
                        appendTextCell(form, valueCell, settingDef, currentSettingsValues, newSettings);
                        break;
                }

                if (!_.isUndefined(settingDef.suffix))
                    valueCell.append($('<div class="input-suffix">' + settingDef.suffix + '</div>'));

                if (!_.isUndefined(settingDef.description))
                    valueCell.append($('<div class="setting-description">' + settingDef.description + '</div>'));
            });
        }

        var db = new DialogBox(form, title, $.i18n.t('PluginEditor.dialog.yes'), $.i18n.t('PluginEditor.dialog.no'), function(okcancel) {
            if (okcancel === 'ok') {
                // escape text value
                _.each(selectedType.settings, function(def) {
                    if (def.type === 'text')
                        newSettings.settings[def.name] = _.escape(newSettings.settings[def.name]);
                });

                if (_.isFunction(settingsSavedCallback))
                    settingsSavedCallback(newSettings);
            } else if (okcancel === 'cancel') {
                if (_.isFunction(cancelCallback))
                    cancelCallback();
            }
            // Remove colorpick dom objects
            $('[id^=collorpicker]').remove();
        });

        // Create our body
        var pluginTypeNames = _.keys(pluginTypes);
        var typeSelect;

        if (pluginTypeNames.length > 1) {
            var typeRow = createSettingRow(form, 'plugin-types', $.i18n.t('PluginEditor.type'));
            typeSelect = $('<select></select>').appendTo($('<div class="styled-select"></div>').appendTo(typeRow));

            typeSelect.append($('<option>'+$.i18n.t('PluginEditor.first_option')+'</option>').attr('value', 'undefined'));

            _.each(pluginTypes, function(pluginType) {
                typeSelect.append($('<option></option>').text(pluginType.display_name).attr('value', pluginType.type_name));
            });

            typeSelect.change(function() {
                newSettings.type = $(this).val();
                newSettings.settings = {};

                // Remove all the previous settings
                _removeSettingsRows();

                selectedType = pluginTypes[typeSelect.val()];

                if (_.isUndefined(selectedType)) {
                    $('#setting-row-instance-name').hide();
                    $('#dialog-ok').hide();
                } else {
                    $('#setting-row-instance-name').show();

                    if(selectedType.description && selectedType.description.length > 0)
                        pluginDescriptionElement.html(selectedType.description).show();
                    else
                        pluginDescriptionElement.hide();

                    $('#dialog-ok').show();
                    createSettingsFromDefinition(selectedType.settings);
                }
            });
        } else if (pluginTypeNames.length === 1) {
            selectedType = pluginTypes[pluginTypeNames[0]];
            newSettings.type = selectedType.type_name;
            newSettings.settings = {};
            createSettingsFromDefinition(selectedType.settings);
        }

        if (typeSelect) {
            if (_.isUndefined(currentTypeName)) {
                $('#setting-row-instance-name').hide();
                $('#dialog-ok').hide();
            } else {
                $('#dialog-ok').show();
                typeSelect.val(currentTypeName).trigger('change');
            }
        }
    }

    // Public API
    return {
        createPluginEditor : function(
                    title,
                    pluginTypes,
                    currentInstanceName,
                    currentTypeName,
                    currentSettingsValues,
                    settingsSavedCallback) {
            createPluginEditor(title, pluginTypes, currentInstanceName, currentTypeName, currentSettingsValues, settingsSavedCallback);
        }
    };
};