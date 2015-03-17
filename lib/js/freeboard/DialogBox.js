// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

function DialogBox(contentElement, title, okTitle, cancelTitle, closeCallback) {
    'use strict';

    var modal_width = 900;

    // Initialize our modal overlay
    var overlay = $('<div id="modal_overlay"></div>');

    var modalDialog = $('<div class="modal"></div>');

    function closeModal()
    {
        if (head.browser.ie) {
            overlay.remove();
        } else {
            overlay.removeClass('show').addClass('hide');
            _.delay(function() {
                overlay.remove();
            }, 300);
        }
    }

    // Create our header
    modalDialog.append('<header><h2 class="title">' + title + "</h2></header>");

    $('<section></section>').appendTo(modalDialog).append(contentElement);

    // Create our footer
    var footer = $('<footer></footer>').appendTo(modalDialog);

    if(okTitle)
    {
        $('<span id="dialog-ok" class="text-button">' + okTitle + '</span>').appendTo(footer).click(function()
        {
            var hold = false;

            if (!$('#plugin-editor').validationEngine('validate'))
                return false;

            if(_.isFunction(closeCallback))
                hold = closeCallback('ok');

            if(!hold)
                closeModal();
        });
    }

    if(cancelTitle)
    {
        $('<span id="dialog-cancel" class="text-button">' + cancelTitle + '</span>').appendTo(footer).click(function()
        {
            closeCallback('cancel');
            closeModal();
        });
    }

    overlay.append(modalDialog);
    $('body').append(overlay);
    if (!head.browser.ie)
        overlay.removeClass('hide').addClass('show');

    // ValidationEngine initialize
    $.validationEngine.defaults.autoPositionUpdate = true;
    // media query max-width : 960px
    $.validationEngine.defaults.promptPosition = ($('#hamburger').css('display') == 'none') ? 'topRight' : 'topLeft';
    $('#plugin-editor').validationEngine();
}
