define(function(require) {

    'use strict';

    var _ = require('underscore');
    var React = require('react');
    var DOM = React.DOM;

    var repeaterItem = React.createClass({
        displayName: 'RepeaterItem',

        render: function () {
            var children = [];

            _.each(this.props.widgetDefinition.children, function (widgetDefinition) {
                children.push(this.props.widgetMap[widgetDefinition.type]({
                    widgetDefinition: widgetDefinition,
                    entity: this.props.entity,
                    updateCallback: this.props.updateCallback,
                    widgetMap: this.props.widgetMap
                }));
            }, this);

            return DOM.div({
                'data-widget-type': 'repeater-item',
                children: children
            });
        }
    });

    var repeater = React.createClass({
        displayName: 'Repeater',

        render: function () {
            var children = _.map(this.props.entity[this.props.widgetDefinition.bindings.value], function (arrayElement) {
                return repeaterItem({
                    entity: arrayElement,
                    widgetDefinition: this.props.widgetDefinition,
                    updateCallback: this.props.updateCallback,
                    widgetMap: this.props.widgetMap
                });
            }, this);

            children.push(DOM.button({
                className: 'btn btn-primary',
                type: 'button',
                onClick: this.addAnother
            }, 'Add'));

            return DOM.div({
                'data-widget-type': 'repeater',
                className: 'well',
                children: children
            });
        },

        addAnother: function () {
            this.props.entity[this.props.widgetDefinition.bindings.value].push({});
            this.props.updateCallback();
        }
    });

    return repeater;

});
