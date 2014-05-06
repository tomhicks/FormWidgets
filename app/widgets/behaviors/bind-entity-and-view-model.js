define(function (require) {

    'use strict';

    var _ = require('underscore');

    return {
        initialize: function () {
            var modelBindings = this.model.get('bindings');

            // update the view model when the entity is changed
            _.each(modelBindings, function (value, key) {
                this.listenTo(this.entity, 'change:' + this.bindingBasePath + (this.bindingBasePath ? '.' : '') + value, function (model, changedValue) {
                    this.viewModel.set(key, changedValue);
                });
            }.bind(this));

            // update the entity when the view model changes
            this.listenTo(this.viewModel, 'change:value', function (model, value) {
                this.entity.set(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + modelBindings.value, value);
            });
        }
    };

});
