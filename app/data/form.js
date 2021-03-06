define({
    id: 'form',
    type: 'form',
    caption: 'Sample Form',
    children: [
        {
            id: 'button',
            type: 'button',
            caption: 'Click me'
        },
        {
            id: 'text',
            type: 'text',
            caption: 'Text label',
            bindings: {
                value: 'firstName',
                caption: 'title'
            }
        },
        {
            id: 'date',
            type: 'date',
            caption: 'Date of birth',
            bindings: {
                value: 'dateOfBirth'
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
            id: 'repeater',
            type: 'repeater',
            allowAdd: true,
            allowDelete: true,
            bindings: {
                value: 'addresses'
            },
            children: [
                {
                    id: 'line1',
                    type: 'text',
                    caption: 'Line 1',
                    bindings: {
                        line1: 'value'
                    }
                },
                {
                    id: 'line2',
                    type: 'text',
                    caption: 'Line 2',
                    bindings: {
                        line2: 'value'
                    }
                }
            ]
        }
    ]
});
