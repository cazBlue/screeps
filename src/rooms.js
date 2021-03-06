const Footings = {
    peace: 1,
    war: 2,
    invade: 3,
    friend: 4
};

const rooms = {
    rome: {
        active: true,
        footing: Footings.peace,
        name: 'W7S27',
        plan: {
            source:
            [
                {
                    locations: [
                        [11, 19],
                        [11, 20],
                        [11, 21]
                        ]
                },
                {
                    locations: [
                        [18, 40],
                        [19, 40],
                        [20, 40]
                    ]
                }
            ],
            tower: [
                [6, 21]
            ]
        },
        muleRun: [
            {
                max: 3,
                collectLocations: [
                    [
                        [11, 19],
                        [11, 20],
                        [11, 21],
                        [13, 27]
                    ]
                ],
                deliverTargets:
                    [
                    STRUCTURE_SPAWN,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_TOWER
                    ]
            },
            {
                max: 3,
                collectLocations: [
                    [
                        [18, 40],
                        [19, 40],
                        [20, 40]
                    ]
                ],
                deliverTargets:
                    [
                        STRUCTURE_STORAGE
                    ]
            }
        ]
    },
    gav: {
        active: false,
        footing: Footings.friend,
        name: 'W7S28',
        source: []
    },
    antioch: {
        active: false,
        footing: Footings.invade,
        name: 'W6S27',
        source: []
    }
};

module.exports = rooms;
