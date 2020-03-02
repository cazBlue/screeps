"use strict";
const states = require('src/states');
const MuleUtil = require('src/mule.util');
const selectDeliverTarget = (creep) => {
    //const extension = MuleUtil.getExtension(creep);
    const extension = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => (struct.structureType === STRUCTURE_STORAGE && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
    });
    if (!extension[0])
        return;
    creep.memory.state = states.deliverResource;
    creep.memory.target = extension[0].id;
};
module.exports = selectDeliverTarget;
