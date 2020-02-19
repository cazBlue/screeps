const states = require('states');
const stateOpt = require('states.mule');

const roleMule = {
    run: (creep) => {

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
        }
    }
};

module.exports = roleMule;
