const states = require('src/states');
const stateOpt = require('src/states.harvester');

const roleHarvest = {
    run: (creep) => {

        switch (creep.memory.state) {
            case states.idle:
                stateOpt.idle(creep);
                break;
            case states.harvest:
                stateOpt.harvest(creep);
                break;
            case states.drop:
                stateOpt.drop(creep);
                break;
        }
    }
};

module.exports = roleHarvest;
