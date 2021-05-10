const atoms = {
    name: 'Redis',
    aether: [
        {
            name: 'CurrentFrame',
            flow: 'storage'
        },
        {
            name: 'ObjectBoxes',
            flow: 'storage'
        },
        {
            name: 'RailBoxes',
            flow: 'storage'
        },
        {
            name: 'CropCoors',
            flow: 'storage'
        },
        {
            name: 'base64',
            flow: 'storage'
        },
    ],
    child: [
        {
            name: 'Web',
            aether: [
                {
                    name: 'base64',
                    flow: 'in',
                },
            ]
        },
        {
            name: 'TrackDetector',
            aether: [
                {
                    name: 'CurrentFrame',
                    flow: 'in',
                },
                {
                    name: 'RailBoxes',
                    flow: 'out',
                },
                {
                    name: 'CropCoors',
                    flow: 'out',
                },
            ]
        },
        {
            name: 'CommandProcessor',
            aether: [
                {
                    name: 'CurrentFrame',
                    flow: 'out',
                },
            ]
        },
        {
            name: 'ObjectDetector',
            aether: [
                {
                    name: 'CurrentFrame',
                    flow: 'in',
                },
                {
                    name: 'ObjectBoxes',
                    flow: 'out',
                },
            ]
        }
    ]
}
export default atoms