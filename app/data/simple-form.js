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
                        },
                    ]
                }
            ]
        }
    ]
});
