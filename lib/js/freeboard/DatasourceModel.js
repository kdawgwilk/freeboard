// ┌────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                                              │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)                                     │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)                                           │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)                                │ \\
// ├────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                                                │ \\
// └────────────────────────────────────────────────┘ \\

DatasourceModel = function(theFreeboardModel, datasourcePlugins) {
    'use strict';

    var self = this;

    function disposeDatasourceInstance()
    {
        if(!_.isUndefined(self.datasourceInstance))
        {
            if(_.isFunction(self.datasourceInstance.onDispose))
            {
                self.datasourceInstance.onDispose();
            }

            self.datasourceInstance = undefined;
        }
    }

    this.isEditing = ko.observable(false); // editing by PluginEditor
    this.name = ko.observable();
    this.latestData = ko.observable();
    this.settings = ko.observable({});
    this.settings.subscribe(function(newValue) {
        if(!_.isUndefined(self.datasourceInstance) && _.isFunction(self.datasourceInstance.onSettingsChanged))
        {
            self.datasourceInstance.onSettingsChanged(newValue);
        }
    });

    this.updateCallback = function(newData) {
        theFreeboardModel.processDatasourceUpdate(self, newData);

        self.latestData(newData);

        self.last_updated(moment().format('HH:mm:ss'));
    };

    this.type = ko.observable();
    this.type.subscribe(function(newValue)
    {
        disposeDatasourceInstance();

        if((newValue in datasourcePlugins) && _.isFunction(datasourcePlugins[newValue].newInstance))
        {
            var datasourceType = datasourcePlugins[newValue];

            var finishLoad = function() {
                datasourceType.newInstance(self.settings(), function(datasourceInstance)
                {

                    self.datasourceInstance = datasourceInstance;
                    datasourceInstance.updateNow();

                }, self.updateCallback);
            };

            // Do we need to load any external scripts?
            if(datasourceType.external_scripts)
                head.js(datasourceType.external_scripts.slice(0), finishLoad); // Need to clone the array because head.js adds some weird functions to it
            else
                finishLoad();
        }
    });

    this.last_updated = ko.observable('never');
    this.last_error = ko.observable();

    this.serialize = function()
    {
        return {
            name    : self.name(),
            type    : self.type(),
            settings: self.settings()
        };
    };

    this.deserialize = function(object)
    {
        self.settings(object.settings);
        self.name(object.name);
        self.type(object.type);
    };

    this.getDataRepresentation = function(dataPath)
    {
        var valueFunction = new Function('data', 'return ' + dataPath + ';');
        return valueFunction.call(undefined, self.latestData());
    };

    this.updateNow = function()
    {
        if(!_.isUndefined(self.datasourceInstance) && _.isFunction(self.datasourceInstance.updateNow))
        {
            self.datasourceInstance.updateNow();
        }
    };

    this.dispose = function()
    {
        disposeDatasourceInstance();
    };
};
