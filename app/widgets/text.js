define(function(require) {

    'use strict';
    var React = require('react');

    var TextWidget = React.createClass({

        displayName: 'TextWidget',

        render: function () {
            return React.DOM.div
            (
                {
                    className: 'form-group',
                    'data-widget-type': 'text',
                },
                React.DOM.label(
                    {
                        className: 'widget-caption',
                    },
                    this.getPropValue('caption')
                ),
                React.DOM.input({
                    className: 'form-control',
                    onChange: this.onChange,
                    value: this.getPropValue('value')
                })
            );
        },

        getPropValue: function (prop) {
            var keyIntoEntity = this.props.widgetDefinition.bindings[prop];

            if (keyIntoEntity) {
                return this.props.entity[keyIntoEntity];
            } else {
                return this.props.widgetDefinition.caption;
            }
        },

        onChange: function (e) {
            this.props.entity[this.props.widgetDefinition.bindings.value] = e.target.value;
            this.props.updateCallback();
        }
    });

    return TextWidget;

});
