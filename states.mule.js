const states = require('states');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const getExtension = (creep) => {
    const extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => (
            struct.structureType === STRUCTURE_EXTENSION ||
            struct.structureType === STRUCTURE_SPAWN ||
            struct.structureType === STRUCTURE_TOWER)
    });

    extensions.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);

    //console.log(extensions);

    let selection = extensions[0];

    for( const extens in extensions)
    {
       if(extensions[extens].structureType === STRUCTURE_SPAWN
           && extensions[extens].store.getFreeCapacity(RESOURCE_ENERGY) > 0)

           selection = extensions[extens]; //lets top up the spawn first
    }

    return selection;
};

const builderStates = {
    idle: (creep) => {

        //locate a container
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (struct) => struct.structureType === STRUCTURE_CONTAINER
        });

        const droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
        //todo add filter by amount
        });


        containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);

        const ext = getExtension(creep);
        //console.log(ext.store.getFreeCapacity(RESOURCE_ENERGY));
        if(ext.store.getFreeCapacity(RESOURCE_ENERGY) === 0 &&
            containers[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0
        )
        {
            creep.moveTo(places.holding[location.x], places.holding[location.y]);
            return;
        } //wait until there is a need


        creep.memory.state = states.collectResource;
        creep.memory.target = containers[0].id;

    },
    collectResource: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        const withdrawRes = creep.withdraw(target, RESOURCE_ENERGY);

        if(withdrawRes === ERR_NOT_IN_RANGE)
        {
            const moveRes = creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
            //console.log(moveRes);
            //creep.memory.state = states.moveTo;
        }

        if(creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY))
        {
            creep.memory.state = states.deliverResource;
        }

        if(target.store.getFreeCapacity(RESOURCE_ENERGY) === 0 || withdrawRes === ERR_NOT_ENOUGH_RESOURCES)
        {
            creep.moveTo(places.holding[0], places.holding[1]);
            creep.memory.state = states.idle;
        }

    },
    deliverResource: (creep) => {
        const extension = getExtension(creep);

        const transferRres = creep.transfer(extension, RESOURCE_ENERGY);

        if(transferRres === OK)
            return;

        if(transferRres === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(extension);
        }

        if(transferRres === ERR_FULL)
        {
            creep.memory.state = states.idle;
            creep.moveTo(places.holding[0], places.holding[1]);
        }

        if(transferRres === ERR_NOT_ENOUGH_ENERGY)
        {
            creep.memory.state = states.idle;
        }
    }
};

module.exports = builderStates;
