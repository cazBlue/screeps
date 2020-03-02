"use strict";
const states = require('src/states');
const muleDeliver = (creep) => {
    const target = Game.getObjectById(creep.memory.target);
    //console.log('deliver to');
    if (!target)
        creep.memory.state = states.idle;
    //console.log(target);
    if (target.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        creep.memory.state = states.selectDeliverTarget;
        return;
    }
    const transferRres = creep.transfer(target, RESOURCE_ENERGY);
    if (transferRres === OK)
        return;
    if (transferRres === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#83ff6b' } });
    }
    else if (transferRres === ERR_FULL && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        //console.log("selecting another target");
        creep.memory.state = states.selectDeliverTarget;
    }
    else // if(transferRres === ERR_NOT_ENOUGH_ENERGY)
     {
        //console.log("mule going idle");
        creep.memory.state = states.idle;
    }
};
module.exports = muleDeliver;
