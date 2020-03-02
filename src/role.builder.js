const states = require('states');
const stateOpt = require('states.builder');


const places = {
    holding: [6,19]
};

const builderFilter = () => {
    return {};
};

const roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        switch (creep.memory.state) {
            case states.idle:
                stateOpt.idle(creep);
                break;
            case states.selectResource:
                stateOpt.selectResource(creep);
                break;
            case states.collectResource:
                stateOpt.collectResource(creep);
                break;
            case states.moveTo:
                stateOpt.moveTo(creep);
                break;
            case states.selectBuildOrRepair:
                stateOpt.selectBuildOrRepair(creep);
                break;
            case states.build:
                stateOpt.build(creep);
                break;
            case states.repair:
                stateOpt.repair(creep);
                break;
        }
    }
};

module.exports = roleBuilder;
