import {DomCreep} from "./states.builder";
import * as _ from 'lodash';
const Roles = require('roles');
const States = require('states');

const rooms = [
    'W6S27',
    'W8S27'
];

export interface LHaulCreep extends Creep {
    memory: {
        state: number,
        targetRoom: string,
        role: string,
    }
}


const maxLongHaulsInRoom = 4;

export const StatesLongHaul = {
    idle: (creep: LHaulCreep) => {
        //pick a room to go to
        let targetSet = false;

        for(let i = 0; i < rooms.length; i++)
        {
            if(targetSet)
                continue;

            const longHaulers: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
                const dCreep: LHaulCreep = creep as LHaulCreep;
                return(dCreep.memory.role == Roles.longHaul && dCreep.memory.targetRoom === rooms[i])
            });

            if(longHaulers.length < maxLongHaulsInRoom)
            {
                targetSet = true;
                creep.memory.targetRoom = rooms[i];
                creep.memory.state = States.collectResource;
            }
        }
    },
    collectResource: (creep: LHaulCreep) => {
        console.log("ready to collect resource!");
    }
};
