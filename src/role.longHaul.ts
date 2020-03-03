const States = require('states');
import {LHaulCreep, StatesLongHaul} from './states.longHaul';

export const LongHaul = {
    run : (creep: LHaulCreep) => {
        switch (creep.memory.state) {
            case States.idle:
                StatesLongHaul.idle(creep);
                break
            case States.collectResource:
                StatesLongHaul.idle(creep);
                break
        }
    }
};
