define({
    title: 'Mr',
    firstName: 'Tom',
    lastName: 'Hicks',
    dateOfBirth: '1985-12-09',

    favorites: {
        color: 'red',
        food: 'eggs'
    },

    addresses: [
        {
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
        },
        {
            name: 'Work',
            line1: 'ADP',
            line2: '1 Friary',
            line3: 'Bristol',
            phones: [
                {
                    number: '12345',
                    network: {
                        name: 'bt'
                    }
                },
                {
                    number: '12345',
                    network: {
                        name: 'ee'
                    }
                }
            ],
            location: {
                twoDee: {
                    x: 123,
                    y: 456
                }
            }
        }
    ]
});
