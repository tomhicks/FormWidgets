define({
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
            id: 'repeater',
            type: 'repeater',
            caption: 'Addresses',
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
                    id: 'somebutton',
                    type: 'button',
                    bindings: {
                        caption: 'line1'
                    }
                },
                {
                    id: 'line2',
                    type: 'text',
                    caption: 'Line 2',
                    bindings: {
                        value: 'line2',
                        caption: 'line1'
                    }
                },
                {
                    id: 'phoneRepeater',
                    type: 'repeater',
                    caption: 'Phones',
                    bindings: {
                        value: 'phones'
                    },
                    children: [
                        {
                            id: 'phone',
                            type: 'text',
                            caption: 'Phone',
                            bindings: {
                                value: 'number'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
