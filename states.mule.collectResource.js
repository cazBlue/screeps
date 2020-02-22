const states = require('states');
const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const collectResource = (creep) => {
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
        creep.memory.state = states.selectDeliverTarget;
    }

    if(target.store.getUsedCapacity(RESOURCE_ENERGY) === 0 || withdrawRes === ERR_NOT_ENOUGH_RESOURCES)
    {
        //console.log("yes");
        creep.moveTo(places.holding[0], places.holding[1], {visualizePathStyle: {stroke: '#83ff6b'} });
        creep.memory.state = states.idle;
    }

};

module.exports = collectResource;
