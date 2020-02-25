const MuleUtil = require('mule.util');
const states = require('states');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const idle = (creep) => {

    //locate a container
    const containers = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => struct.structureType === STRUCTURE_CONTAINER
    });

    containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);

    const droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
        //todo add filter by amount
        filter: (resource) => resource.resourceType === RESOURCE_ENERGY
    });

    //console.log(JSON.stringify(droppedSources));
    //snap up all dropped resources, will cover if the container decays/blows up + invader corpses
    if(droppedSources.length && droppedSources[0].amount > containers[0].store.getUsedCapacity(RESOURCE_ENERGY))
    {
        creep.memory.state = states.collectResource;
        creep.memory.target = droppedSources[0].id;
        return;
    }

    const ext = MuleUtil.getExtension(creep);

    if(!ext)
        return;

    //console.log(ext.store.getFreeCapacity(RESOURCE_ENERGY));
    if(ext.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
    {
        creep.moveTo(places.holding[location.x], places.holding[location.y]);
        return;
    } //wait until there is a need

    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
    {
        creep.memory.state = states.collectResource;
        creep.memory.target = containers[0].id;
    }
    else {
        creep.memory.state = states.deliverResource;
        creep.memory.target = ext.id;
    }
};

module.exports = idle;
