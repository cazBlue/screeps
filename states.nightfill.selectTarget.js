const states = require('states');
const MuleUtil = require('mule.util');
const Roles = require('roles');

const selectDeliverTarget = (creep) => {
    const extension = MuleUtil.getExtension(creep);

    if(!extension)
        return;

    //check that nothing else has this target...
    const others = _.filter(Game.creeps, (creep) => {

        return(creep.memory.role == Roles.nightFill &&
                                        (creep.memory.target.x === extension.pos.x && creep.memory.target.y === extension.pos.y))
    });

    //temp measure to stop two screeps going to same target
    if(others.length)
    {
        console.log(others);

        creep.memory.state = states.idle;
        //creep.memory.target = extension.id;
        return;
    }

    creep.memory.state = states.deliverResource;
    creep.memory.target = extension.id;

};

module.exports = selectDeliverTarget;
