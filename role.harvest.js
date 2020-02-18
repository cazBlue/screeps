const states = require('states');
const stateOpt = require('states.harvester');

const vector = {x: 0, y: 1};
const places = {
    holding: [6,19]
};


const roleHarvest = {
    run: (creep) => {

        switch (creep.memory.state) {
            case states.idle:
                stateOpt.idle(creep);
                break;
            case states.harvest:
                stateOpt.harvest(creep);
                break;
            case states.drop:
                stateOpt.drop(creep);
                break;
        }
    }
};

module.exports = roleHarvest;


/*
const deliverCargo = (creep) => {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(targets.length === 0)
    {
        creep.moveTo(places.holding[vector.x], places.holding[vector.y], {visualizePathStyle: {stroke: '#5c60ff'}});
        return;
    }

    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    }
};
 */
