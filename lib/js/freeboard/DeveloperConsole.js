// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

DeveloperConsole = function(theFreeboardModel) {
    'use strict';

    function showDeveloperConsole()
    {
        var pluginScriptsInputs = [];
        var container = $('<div></div>');
        var addScript = $('<div class="table-operation text-button">ADD</div>');
        var table = $('<table class="table table-condensed sub-table"></table>');

        table.append($('<thead style=""><tr><th>Plugin Script URL</th></tr></thead>'));

        var tableBody = $("<tbody></tbody>");

        table.append(tableBody);

        container.append($("<p>Here you can add references to other scripts to load datasource or widget plugins.</p>"))
            .append(table)
            .append(addScript)
            .append('<p>To learn how to build plugins for freeboard, please visit <a target="_blank" href="http://freeboard.github.io/freeboard/docs/plugin_example.html">http://freeboard.github.io/freeboard/docs/plugin_example.html</a></p>');

        function refreshScript(scriptURL)
        {
            $('script[src="' + scriptURL + '"]').remove();
        }

        function addNewScriptRow(scriptURL)
        {
            var tableRow = $('<tr></tr>');
            var tableOperations = $('<ul class="board-toolbar"></ul>');
            var scriptInput = $('<input class="table-row-value" style="width:100%;" type="text">');
            var deleteOperation = $('<li><i class="fa-w fa-trash"></i></li>').click(function(e){
                pluginScriptsInputs = _.without(pluginScriptsInputs, scriptInput);
                tableRow.remove();
            });

            pluginScriptsInputs.push(scriptInput);

            if(scriptURL)
            {
                scriptInput.val(scriptURL);
            }

            tableOperations.append(deleteOperation);
            tableBody
                .append(tableRow
                .append($('<td></td>').append(scriptInput))
                .append($('<td class="table-row-operation">').append(tableOperations)));
        }

        _.each(theFreeboardModel.plugins(), function(pluginSource){

            addNewScriptRow(pluginSource);

        });

        addScript.click(function(e)
        {
            addNewScriptRow();
        });

        var db = new DialogBox(container, 'Developer Console', 'OK', null, function(okcancel){
            if (okcancel === 'ok') {
                // Unload our previous scripts
                _.each(theFreeboardModel.plugins(), function(pluginSource){

                    $('script[src^="' + pluginSource + '"]').remove();

                });

                theFreeboardModel.plugins.removeAll();

                _.each(pluginScriptsInputs, function(scriptInput){

                    var scriptURL = scriptInput.val();

                    if(scriptURL && scriptURL.length > 0)
                    {
                        theFreeboardModel.addPluginSource(scriptURL);

                        // Load the script with a cache buster
                        head.js(scriptURL + '?' + Date.now());
                    }
                });
            }
        });
    }

    // Public API
    return {
        showDeveloperConsole : function()
        {
            showDeveloperConsole();
        }
    };
};
