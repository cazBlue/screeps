//import {States} from './states';
const States = require('states');
import {DomCreep} from "./states.builder";
const stateOpt = require('states.builder');


const places = {
    holding: [6,19]
};

const builderFilter = () => {
    return {};
};

const roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep: DomCreep) {
        switch (creep.memory.state) {
            case States.idle:
                stateOpt.idle(creep);
                break;
            case States.selectResource:
                stateOpt.selectResource(creep);
                break;
            case States.collectResource:
                stateOpt.collectResource(creep);
                break;
            case States.moveTo:
                stateOpt.moveTo(creep);
                break;
            case States.selectBuildOrRepair:
                stateOpt.selectBuildOrRepair(creep);
                break;
            case States.build:
                stateOpt.build(creep);
                break;
            case States.repair:
                stateOpt.repair(creep);
                break;
        }
    }
};

module.exports = roleBuilder;
