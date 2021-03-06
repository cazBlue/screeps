const states = require('states');
const MuleUtil = require('mule.util');


const selectCollectTarget = (creep) => {
    const extension = MuleUtil.getExtension(creep);

    if(!extension)
        return;

    creep.memory.state = states.deliverResource;
    creep.memory.target = extension.id;


    if(extension.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
    {
        creep.memory.state = states.idle;
        return;
    }
};

module.exports = selectCollectTarget;
