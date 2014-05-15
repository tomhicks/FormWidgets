define(function (require) {
    'use strict';


    var _ = require('underscore');
    var React = require('react');
    var DOM = React.DOM;

    var FormWidget = React.createClass({

        getInitialState: function () {
            return {
                entity: this.props.entity
            };
        },

        getPropValue: function (prop) {
            if (this.props.widgetDefinition.bindings) {
                var keyIntoEntity = this.props.widgetDefinition.bindings[prop];

                if (keyIntoEntity) {
                    return this.props.entity[keyIntoEntity];
                } else {
                    return this.props.widgetDefinition.caption;
                }
            } else {
                return this.props.widgetDefinition.caption;
            }
        },

        render: function () {

            var children = [
                DOM.h2(null, this.getPropValue('caption'))
            ];

            _.each(this.props.widgetDefinition.children, function (widgetDefinition) {
                children.push(this.props.widgetMap[widgetDefinition.type]({
                    widgetDefinition: widgetDefinition,
                    entity: this.state.entity,
                    updateCallback: this.forceUpdate.bind(this),
                    widgetMap: this.props.widgetMap
                }));
            }, this);

            return DOM.form({
                'data-widget-type': 'form',
                className: 'well',
                children: children
            });
        }
    });

    return FormWidget;

});
