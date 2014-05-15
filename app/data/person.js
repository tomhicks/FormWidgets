define(function (require) {
    'use strict';

    var _ = require('underscore');

    return {
        title: 'Mr',
        firstName: 'Tom',
        lastName: 'Hicks',
        dateOfBirth: '1985-12-09',

        favorites: {
            color: 'red',
            food: 'eggs'
        },

        addresses: _.times(1000, function () {
            return {
                name: 'Home',
                line1: '10 Mogg Street',
                line2: 'St Werburghs',
                phones: [
                    {
                        number: '07980077015',
                        network: {
                            name: 'orange'
                        }
                    }
                ],
                location: {
                    twoDee: {
                        x: 789,
                        y: 234
                    }
                }
            };
        })
    };
});
