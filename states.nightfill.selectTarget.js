const states = require('states');
const MuleUtil = require('mule.util');


const selectDeliverTarget = (creep) => {
    const extension = MuleUtil.getExtension(creep);

    if(!extension)
        return;

    creep.memory.state = states.deliverResource;
    creep.memory.target = extension.id;

};

module.exports = selectDeliverTarget;
