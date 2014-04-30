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
                firstName: 'value',
                title: 'caption'
            }
        },
        {
            id: 'date',
            type: 'date',
            caption: 'Date of birth',
            bindings: {
                dateOfBirth: 'value'
            }
        },
        {
            id: 'text2',
            type: 'text',
            caption: 'Last name',
            bindings: {
                lastName: 'value'
            }
        },
        {
            id: 'repeater',
            type: 'repeater',
            allowAdd: true,
            allowDelete: true,
            bindings: {
                addresses: 'model'
            },
            children: [
                {
                    id: 'line1',
                    type: 'text',
                    caption: 'Line 1',
                    bindings: {
                        line1: 'value'
                    }
                }
            ]
        }
    ]
});
