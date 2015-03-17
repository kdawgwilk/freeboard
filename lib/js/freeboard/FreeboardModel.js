// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

function FreeboardModel(datasourcePlugins, widgetPlugins, freeboardUI)
{
    var self = this;

    var SERIALIZATION_VERSION = 1;

    this.version = 0;
    this.isEditing = ko.observable(false);
    this.allow_edit = ko.observable(false);
    this.allow_edit.subscribe(function(newValue) {
        if (newValue) {
            $('#main-header').show();
        } else {
            $('#main-header').hide();
            $('#datasources').hide();
        }
    });

    this.isVisibleDatasources = ko.observable(false);
    this.isVisibleBoardTools = ko.observable(false);

    this.header_image = ko.observable();
    this.plugins = ko.observableArray();
    this.datasources = ko.observableArray();
    this.panes = ko.observableArray();
    this.datasourceData = {};
    this.processDatasourceUpdate = function(datasourceModel, newData) {
        var datasourceName = datasourceModel.name();

        self.datasourceData[datasourceName] = newData;

        _.each(self.panes(), function(pane) {
            _.each(pane.widgets(), function(widget) {
                widget.processDatasourceUpdate(datasourceName);
            });
        });
    };

    this._datasourceTypes = ko.observable();
    this.datasourceTypes = ko.computed({
        read: function() {
            self._datasourceTypes();

            var returnTypes = [];

            _.each(datasourcePlugins, function(datasourcePluginType) {
                var typeName = datasourcePluginType.type_name;
                var displayName = typeName;

                if (!_.isUndefined(datasourcePluginType.display_name))
                    displayName = datasourcePluginType.display_name;

                returnTypes.push({
                    name        : typeName,
                    display_name: displayName
                });
            });

            return returnTypes;
        }
    });

    this._widgetTypes = ko.observable();
    this.widgetTypes = ko.computed({
        read: function() {
            self._widgetTypes();

            var returnTypes = [];

            _.each(widgetPlugins, function(widgetPluginType) {
                var typeName = widgetPluginType.type_name;
                var displayName = typeName;

                if(!_.isUndefined(widgetPluginType.display_name))
                    displayName = widgetPluginType.display_name;

                returnTypes.push({
                    name        : typeName,
                    display_name: displayName
                });
            });

            return returnTypes;
        }
    });

    this.addPluginSource = function(pluginSource) {
        if (pluginSource && self.plugins.indexOf(pluginSource) === -1)
            self.plugins.push(pluginSource);
    };

    this.serialize = function() {
        var panes = [];

        _.each(self.panes(), function(pane) {
            panes.push(pane.serialize());
        });

        var datasources = [];

        _.each(self.datasources(), function(datasource) {
            datasources.push(datasource.serialize());
        });

        return {
            version     : SERIALIZATION_VERSION,
            header_image: self.header_image(),
            allow_edit  : self.allow_edit(),
            plugins     : self.plugins(),
            panes       : panes,
            datasources : datasources,
            columns     : freeboardUI.getUserColumns()
        };
    };

    this.deserialize = function(object, finishedCallback) {
        self.clearDashboard();

        function finishLoad() {
            freeboardUI.setUserColumns(object.columns);

            if (!_.isUndefined(object.allow_edit))
                self.allow_edit(object.allow_edit);
            else
                self.allow_edit(true);

            self.version = object.version || 0;
            self.header_image(object.header_image);

            _.each(object.datasources, function(datasourceConfig) {
                var datasource = new DatasourceModel(self, datasourcePlugins);
                datasource.deserialize(datasourceConfig);
                self.addDatasource(datasource);
            });

            var sortedPanes = _.sortBy(object.panes, function(pane) {
                return freeboardUI.getPositionForScreenSize(pane).row;
            });

            _.each(sortedPanes, function(paneConfig) {
                var pane = new PaneModel(self, widgetPlugins);
                pane.deserialize(paneConfig);
                self.panes.push(pane);
            });

            if (self.allow_edit() && self.panes().length === 0 && self.datasources().length === 0)
                self.setEditing(true);

            if (_.isFunction(finishedCallback))
                finishedCallback();

            freeboardUI.processResize(true, true);
        }

        // This could have been self.plugins(object.plugins), but for some weird reason head.js was causing a function to be added to the list of plugins.
        _.each(object.plugins, function(plugin) {
            self.addPluginSource(plugin);
        });

        // Load any plugins referenced in this definition
        if (_.isArray(object.plugins) && object.plugins.length > 0) {
            head.js(object.plugins, function() {
                finishLoad();
            });
        } else {
            finishLoad();
        }
    };

    this.clearDashboard = function() {
        freeboardUI.removeAllPanes();

        _.each(self.datasources(), function(datasource) {
            datasource.dispose();
        });

        _.each(self.panes(), function(pane) {
            pane.dispose();
        });

        self.plugins.removeAll();
        self.datasources.removeAll();
        self.panes.removeAll();
    };

    this.loadDashboard = function(dashboardData, callback) {
        freeboardUI.showLoadingIndicator(true);
        _.delay(function() {
            self.deserialize(dashboardData, function() {
                if(_.isFunction(callback))
                    callback();

                freeboardUI.showLoadingIndicator(false);

                freeboard.emit('dashboard_loaded');
            });
        }, 50);
    };

    this.loadDashboardFromLocalFile = function() {
        // Check for the various File API support.
        if(window.File && window.FileReader && window.FileList && window.Blob) {
            var input = document.createElement('input');
            input.id = 'myfile';
            input.type = 'file';
            $(input).css({
                'visibility':'hidden'
            });

            $(input).on('change', function(event) {
                var files = event.target.files;

                if(files && files.length > 0) {
                    var file = files[0];
                    var reader = new FileReader();

                    reader.addEventListener('load', function(fileReaderEvent) {

                        var textFile = fileReaderEvent.target;
                        var jsonObject = JSON.parse(textFile.result);


                        self.loadDashboard(jsonObject);
                        self.setEditing(false);
                    });

                    reader.readAsText(file);
                }
                if (head.browser.ie)
                    $('#myfile').remove();
            });

            if (head.browser.ie) {
                document.body.appendChild(input);
                var evt = document.createEvent('MouseEvents');
                evt.initEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
                input.dispatchEvent(evt);
            } else {
                $(input).trigger('click');
            }
        } else {
            alert('Unable to load a file in this browser.');
        }
    };

    this.saveDashboard = function() {
        var contentType = 'application/octet-stream';
        var blob = new Blob([JSON.stringify(self.serialize())], {'type': contentType});
        var file = 'dashboard.json';

        if (head.browser.ie) {
            window.navigator.msSaveBlob(blob, file);
        } else {
            var url = (window.URL || window.webkitURL);
            var data = url.createObjectURL(blob);
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            var a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            a.href = data;
            a.download = file;
            a.dispatchEvent(e);
        }
    };

    this.addDatasource = function(datasource) {
        self.datasources.push(datasource);
    };

    this.deleteDatasource = function(datasource) {
        delete self.datasourceData[datasource.name()];
        datasource.dispose();
        self.datasources.remove(datasource);
    };

    this.createPane = function() {
        var newPane = new PaneModel(self, widgetPlugins);
        self.addPane(newPane);
    };

    this.addGridColumnLeft = function() {
        freeboardUI.addGridColumnLeft();
    };

    this.addGridColumnRight = function() {
        freeboardUI.addGridColumnRight();
    };

    this.subGridColumnLeft = function() {
        freeboardUI.subGridColumnLeft();
    };

    this.subGridColumnRight = function() {
        freeboardUI.subGridColumnRight();
    };

    this.addPane = function(pane) {
        self.panes.push(pane);
    };

    this.deletePane = function(pane) {
        pane.dispose();
        self.panes.remove(pane);
    };

    this.deleteWidget = function(widget) {
        ko.utils.arrayForEach(self.panes(), function(pane) {
            pane.widgets.remove(widget);
        });

        widget.dispose();
    };

    this.updateDatasourceNameRef = function(newDatasourceName, oldDatasourceName) {
        _.each(self.panes(), function(pane) {
            _.each(pane.widgets(), function(widget) {
                widget.updateDatasourceNameRef(newDatasourceName, oldDatasourceName);
            });
        });
    };

    $.fn.transform = function(axis) {
        var ret = 0;
        var elem = this;
        var matrix = elem.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
        if (axis == 'y')
            ret = matrix[13] || matrix[5];
        else if (axis == 'x')
            ret = matrix[12] || matrix[4];
        if (_.isUndefined(ret))
            ret = 0;
        return ret;
    };

    this.setEditing = function(editing, animate) {
        // Don't allow editing if it's not allowed
        if (!self.allow_edit() && editing)
            return;

        self.isEditing(editing);

        if (editing === false) {
            if (self.isVisibleDatasources())
                self.setVisibilityDatasources(false);
            if (self.isVisibleBoardTools())
                self.setVisibilityBoardTools(false);
        }

        var barHeight = $('#admin-bar').outerHeight();
        var headerHeight = $('#main-header').outerHeight();

        if (!editing) {
            freeboardUI.disableGrid();
            $('#toggle-header-icon').addClass('fa-wrench').removeClass('fa-chevron-up');
            $('.gridster .gs_w').css({cursor: 'default'});

            if (head.browser.ie) {
                $('#main-header').css('top', '-' + barHeight + 'px');
                $('#board-content').css('top', '20px');
            } else {
                $('#main-header').css('transform', 'translateY(-' + barHeight + 'px)');
                $('#board-content').css('transform', 'translateY(20px)');
                _.delay(function() {
                    $('#admin-menu').css('display', 'none');
                }, 200);
            }
            $('.sub-section').unbind();
        } else {
            $('#admin-menu').css('display', 'block');
            $('#toggle-header-icon').addClass('fa-chevron-up').removeClass('fa-wrench');
            $('.gridster .gs_w').css({cursor: 'pointer'});

            if (head.browser.ie) {
                $('#main-header').css('top', '0px');
                $('#board-content').css('top', headerHeight + 'px');
            } else {
                $('#main-header').css('transform', 'translateY(0px)');
                $('#board-content').css('transform', 'translateY(' + headerHeight + 'px)');
            }
            freeboardUI.attachWidgetEditIcons($('.sub-section'));
            freeboardUI.enableGrid();
        }

        freeboardUI.showPaneEditIcons(editing, true);
    };

    this.setVisibilityDatasources = function(visibility, animate) {
        // Don't allow editing if it's not allowed
        if(!self.allow_edit())
            return;

        self.isVisibleDatasources(visibility);

        var ds = $('#datasources');
        var width = ds.outerWidth();

        if (visibility === true) {
            ds.css('display', 'block');
            ds.css('transform', 'translateX(-' + width + 'px)');
        } else {
            ds.css('transform', 'translateX(' + width + 'px)');
            _.delay(function() {
                ds.css('display', 'none');
            }, 300);
        }
    };

    this.setVisibilityBoardTools = function(visibility, animate) {
        // Don't allow editing if it's not allowed
        if (!self.allow_edit())
            return;

        self.isVisibleBoardTools(visibility);

        var mh = $('#main-header');
        var bc = $('#board-content');
        var bt = $('#board-tools');

        var mhHeight = mh.outerHeight();
        var width = bt.outerWidth();

        var debounce = _.debounce(function() {
            // media query max-width : 960px
            if ($('#hamburger').css('display') == 'none') {
                self.setVisibilityBoardTools(false);
                $(window).off('resize', debounce);
            }
        }, 500);

        if (visibility === true) {
            $('html').addClass('boardtools-opening');
            $('#board-actions > ul').removeClass('collapse');

            if (head.browser.ie) {
                mh.offset({ top: 0, left: width });
                bc.offset({ top: mhHeight, left: width });
            } else {
                mh.css('transform', 'translate(' + width + 'px, ' + mh.transform('y') + 'px)');
                bc.css('transform', 'translate(' + width + 'px, ' + bc.transform('y') + 'px)');
            }

            $(window).resize(debounce);
        } else {
            $('html').removeClass('boardtools-opening');
            $('#board-actions > ul').addClass('collapse');

            if (head.browser.ie) {
                mh.offset({ top: 0, left: 0 });
                bc.offset({ top: mhHeight, left: 0 });
            } else {
                mh.css('transform', 'translate(0px, ' + mh.transform('y') + 'px)');
                bc.css('transform', 'translate(0px, ' + bc.transform('y') + 'px)');
            }

            $(window).off('resize', debounce);
        }
    };

    this.toggleEditing = function() {
        self.setEditing(!self.isEditing());
    };

    this.toggleDatasources = function() {
        self.setVisibilityDatasources(!self.isVisibleDatasources());
    };

    this.toggleBoardTools = function() {
        self.setVisibilityBoardTools(!self.isVisibleBoardTools());
    };
}
