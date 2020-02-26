const states = require('states');
const stateOpt = require('states.mule');

const roleMule = {
    run: (creep) => {

        //creep.memory.state = states.idle;

        switch (creep.memory.state) {
            case states.idle:
                stateOpt.idle(creep);
                break;
            case states.collectResource:
                stateOpt.collectResource(creep);
                break;
            case states.deliverResource:
                stateOpt.deliverResource(creep);
                break;
            case states.selectDeliverTarget:
                stateOpt.selectDeliverTarget(creep);
                break;
            case states.selectCollectTarget:
                stateOpt.selectCollectTarget(creep);
                break;
        }
    }
};

module.exports = roleMule;
