"use strict";
const states = require('src/states');
const StateCollectResource = require('src/states.nightfill.collectResource');
const StateDeliverResource = require('src/states.nightfill.deliverResource');
const selectDeliverTarget = require('src/states.nightfill.selectTarget');
const nightfillStates = {
    idle: (creep) => {
        //console.log("night fill bot");
        const storage = creep.room.find(FIND_STRUCTURES, {
            filter: (struct) => struct.structureType === STRUCTURE_STORAGE
        });
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            //check if another creep is trying to collect from this resource
            creep.memory.state = states.collectResource;
            creep.memory.target = storage[0].id;
        }
    },
    collectResource: (creep) => StateCollectResource(creep),
    //selectCollectTarget: (creep) => selectCollectTarget(creep),
    selectDeliverTarget: (creep) => selectDeliverTarget(creep),
    deliverResource: (creep) => StateDeliverResource(creep)
};
module.exports = nightfillStates;
