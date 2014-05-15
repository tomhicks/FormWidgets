define(function (require) {

    'use strict';

    var _ = require('underscore');

    var repeaters = _.times(1, function () {
        return {
            id: 'repeater',
            type: 'repeater',
            bindings: {
                value: 'addresses'
            },
            children: [
                {
                    id: 'line1',
                    type: 'text',
                    caption: 'Line 1',
                    bindings: {
                        value: 'line1'
                    }
                },
                {
                    id: 'phones',
                    type: 'repeater',
                    bindings: {
                        value: 'phones'
                    },
                    children: [
                        {
                            id: 'networkName',
                            type: 'text',
                            bindings: {
                                value: 'number'
                            }
                        }
                    ]
                }
            ]
        };
    });

    return {
        id: 'form',
        type: 'form',
        caption: 'Sample Form',
        children: [
            {
                id: 'text',
                type: 'text',
                bindings: {
                    value: 'firstName',
                    caption: 'firstName'
                }
            },
            {
                id: 'text2',
                type: 'text',
                caption: 'Last name',
                bindings: {
                    value: 'lastName'
                }
            },
            {
                id: 'text3',
                type: 'text',
                caption: 'Last name',
                bindings: {
                    value: 'lastName',
                    caption: 'lastName'
                }
            }
        ].concat(repeaters)
    };
});
