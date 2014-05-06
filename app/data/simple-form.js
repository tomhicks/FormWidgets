define({
    id: 'form',
    type: 'form',
    caption: 'Sample Form',
    children: [
        {
            id: 'subform',
            type: 'form',
            caption: 'nother form',
            children: [
                {
                    id: 'faveColor',
                    type: 'text',
                    caption: 'favourite color',
                    bindings: {
                        value: 'favorites.color'
                    }
                }
            ]
        },
        {
            id: 'repeater',
            type: 'repeater',
            bindings: {
                value: 'addresses'
            },
            children: [
                {
                    id: 'subform',
                    type: 'form',
                    caption: 'subform in repeater',
                    children: [
                        {
                            id: 'x',
                            type: 'text',
                            caption: 'x',
                            bindings: {
                                value: 'location.twoDee.x'
                            }
                        },
                        {
                            id: 'y',
                            type: 'text',
                            caption: 'y',
                            bindings: {
                                value: 'location.twoDee.y'
                            }
                        },
                    ]
                },
                {
                    id: 'line1',
                    type: 'text',
                    caption: 'Line 1',
                    bindings: {
                        value: 'line1'
                    }
                },
                {
                    id: 'button2',
                    type: 'button',
                    caption: 'Line 1',
                    bindings: {
                        caption: 'line1'
                    }
                },
                {
                    id: 'line1copy',
                    type: 'text',
                    caption: 'Line 1 Copy',
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
                        {
                            id: 'phoneTypeName',
                            type: 'text',
                            caption: 'network name',
                            bindings: {
                                value: 'network.name'
                            }
                        },
                        {
                            id: 'phoneTypeName2',
                            type: 'text',
                            caption: 'network name',
                            bindings: {
                                value: 'network.name'
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'button',
            type: 'button',
            caption: 'Click me',
            bindings: {
                caption: 'lastName'
            }
        },
        {
            id: 'text',
            type: 'text',
            caption: 'Text label',
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
        }
    ]
});
