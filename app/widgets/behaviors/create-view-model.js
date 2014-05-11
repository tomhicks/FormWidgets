define(function (require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    return _.extend({
        initialize: function () {
            // construct the view model
            var entityBindings = this.model.get('bindings');
            var boundKeys = _.keys(entityBindings);
            var boundData = _.reduce(boundKeys, function (memo, key) {
                memo[key] = this.entity.get(this.getBindingPathPrefix() + entityBindings[key]);
                return memo;
            }.bind(this), {});

            this.viewModel = new Backbone.Model(_.extend({}, this.model.toJSON(), boundData));

            this._bindViewModelAndEntity();
        },

        setBindingBasePath: function (bindingBasePath) {
            this.bindingBasePath = bindingBasePath;
            this._bindViewModelAndEntity();
        },

        _bindViewModelAndEntity: function () {
            var entityBindings = this.model.get('bindings');

            // update the view model when the entity is changed
            this.stopListening(this.entity);
            _.each(entityBindings, function (value, key) {
                this.listenTo(this.entity, 'change:' + this.getBindingPathPrefix() + value, function (model, changedValue) {
                    this.viewModel.set(key, changedValue);
                });
            }, this);

            this.stopListening(this.viewModel);
            // update the entity when the view model changes
            this.listenTo(this.viewModel, 'change:value', function (model, value) {
                this.entity.set(this.getBindingPathPrefix() + entityBindings.value, value);
            });

            this.unstickit(this.viewModel);
            this.stickit(this.viewModel);
        }

    }, require('./get-binding-path-prefix'));
});
