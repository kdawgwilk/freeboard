// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

JSEditor = function() {
    'use strict';

    var assetRoot = '';

    function setAssetRoot(_assetRoot) {
        assetRoot = _assetRoot;
    }

    function displayJSEditor(value, mode, callback) {

        var exampleText;
        var codeWindow = $('<div class="code-window"></div>');
        var codeMirrorWrapper = $('<div class="code-mirror-wrapper"></div>');
        var codeWindowFooter = $('<div class="code-window-footer"></div>');
        var codeWindowHeader = $('<div class="code-window-header cm-s-ambiance"></div>');
        var config = {};

        switch (mode) {
            case 'javascript':
                exampleText = $.i18n.t('JSEditor.javascript.exampleText');
                codeWindowHeader = $('<div class="code-window-header cm-s-ambiance">' + $.i18n.t('JSEditor.javascript.codeWindowHeader') + '</div>');

                // If value is empty, go ahead and suggest something
                if (!value)
                    value = exampleText;

                config = {
                    value: value,
                    mode: 'javascript',
                    theme: 'ambiance',
                    indentUnit: 4,
                    lineNumbers: true,
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true
                };
                break;
            case 'json':
                exampleText = $.i18n.t('JSEditor.json.exampleText');
                codeWindowHeader = $('<div class="code-window-header cm-s-ambiance">' + $.i18n.t('JSEditor.json.codeWindowHeader') + '</div>');

                config = {
                    value: value,
                    mode: 'application/json',
                    theme: 'ambiance',
                    indentUnit: 4,
                    lineNumbers: true,
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true
                };
                break;
            case 'htmlmixed':
                exampleText = '';
                codeWindowHeader = $('<div class="code-window-header cm-s-ambiance">' + $.i18n.t('JSEditor.htmlmixed.codeWindowHeader') + '</div>');

                config = {
                    value: value,
                    mode: 'htmlmixed',
                    theme: 'ambiance',
                    indentUnit: 4,
                    lineNumbers: true,
                    matchBrackets: true,
                    autoCloseBrackets: true
                };
                break;
        }

        codeWindow.append([codeWindowHeader, codeMirrorWrapper, codeWindowFooter]);

        $('body').append(codeWindow);

        var codeMirrorEditor = CodeMirror(codeMirrorWrapper.get(0), config);

        var closeButton = $('<span id="dialog-cancel" class="text-button">' + $.i18n.t('JSEditor.cancel') + '</span>').click(function () {
            if (callback) {
                var newValue = codeMirrorEditor.getValue();

                if (newValue === exampleText)
                    newValue = '';

                var error = null;
                switch (mode) {
                    case 'json':
                        if (JSHINT.errors.length > 0) {
                            alert($.i18n.t('JSEditor.json.error'));
                            return;
                        }
                        break;
                }
                callback(newValue);
                codeWindow.remove();
            }
        });

        codeWindowFooter.append(closeButton);
    }

    // Public API
    return {
        displayJSEditor: function (value, mode, callback) {
            displayJSEditor(value, mode, callback);
        },
        setAssetRoot: function (assetRoot) {
            setAssetRoot(assetRoot);
        }
    };
};