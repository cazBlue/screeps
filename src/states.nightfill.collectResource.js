const states = require('src/states');
const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const withdrawFromContainer = (creep, target) => {
    const withdrawRes = creep.withdraw(target, RESOURCE_ENERGY);
    //console.log(withdrawRes);

    if(withdrawRes === ERR_NOT_IN_RANGE)
    {
        const moveRes = creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
        //console.log(moveRes);
        //creep.memory.state = states.moveTo;
    }

    if(creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY))
    {
        creep.memory.state = states.selectDeliverTarget;
        return;
    }

    if(target.store.getUsedCapacity(RESOURCE_ENERGY) === 0 || withdrawRes === ERR_NOT_ENOUGH_RESOURCES)
    {
        //console.log("yes");
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        {
            creep.memory.state = states.selectDeliverTarget;
        }
        else {
            creep.moveTo(places.holding[0], places.holding[1], {visualizePathStyle: {stroke: '#83ff6b'}});
            creep.memory.state = states.idle;
        }
    }
};

const collectResource = (creep) => {
    const target = Game.getObjectById(creep.memory.target);

    if(!target)
    {
        creep.memory.state = states.idle;
        return;
    }

    withdrawFromContainer(creep, target);

};

module.exports = collectResource;
