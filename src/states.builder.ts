//import {States} from './states';
const States = require('states');
const MathUtil = require('math.util');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

//export interface CreepMemory extends Memory{ [state: string]: any }
export interface DomCreep extends Creep {
    memory: {
        state: number,
        target: string
    }
}



const builderStates = {
    idle: (creep: DomCreep) => {
        //console.log("builder is in idle state");

        //creep.drop(RESOURCE_ENERGY);

        //todo check repair or build options
        if(creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.say('Collect Resource');
            creep.memory.state = States.selectResource;
        }else
        {
            //creep.findn
            creep.say('Build/Repair');
            creep.memory.state = States.selectBuildOrRepair;
        }
            //
/*        else
            creep.memory.state = states.build;*/

        //creep.moveTo(places.holding[location.x], places.holding[location.y], {visualizePathStyle: {stroke: '#5c60ff'}});
    },
    selectResource: (creep: DomCreep) => {
        //select resource
        //const dropped = creep.room.find(FIND_DROPPED_RESOURCES); //todo find dropped resources
        const sources: any[] = creep.room.find(FIND_STRUCTURES, {
            filter: (struct) => struct.structureType === STRUCTURE_STORAGE
        });

        if(sources.length)
        {
            //select the best source
            sources.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);

            //todo select the closest store

            // if no resources go to holding //todo change change this to state transition
            if(sources[0].store[RESOURCE_ENERGY] === 0)
            {
                creep.moveTo(places.holding[location.x], places.holding[location.y]);
            }

            creep.memory.target = sources[0].id;
            creep.memory.state = States.collectResource;
            //console.log(sources[0].store[RESOURCE_ENERGY]);
        }

/*        if(droppedSources.length)
        {
            creep.memory.target = sources[0].id;
            creep.memory.state = states.collectResource;
        }*/

    },
    moveTo: (creep: DomCreep) => {
        const target: Structure | null = Game.getObjectById(creep.memory.target);

        if(!target)
            return;

        if(creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} }) < 0 )
        {
/*            if(target.structureType === STRUCTURE_CONTAINER)
            {
                creep.memory.state = states.collectResource
            }*/
            creep.memory.state = States.idle;
        }

    },
    collectResource: (creep: DomCreep) => {
        const resourceContainer: StructureContainer | null = Game.getObjectById(creep.memory.target);

        if(!resourceContainer)
            return;

        if(creep.withdraw(resourceContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(resourceContainer, {visualizePathStyle: {stroke: '#83ff6b'} });
            //creep.memory.state = states.moveTo;
            return;
        }

        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
        {
            creep.move(LEFT);
            creep.memory.state = States.idle;
        }

        if(resourceContainer.store[RESOURCE_ENERGY] === 0)
            creep.memory.state = States.idle;

    },
    selectBuildOrRepair: (creep: DomCreep) => {
        //todo improve choice making logic
        const buildTargets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        const repairTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
/*                if(structure.structureType !== STRUCTURE_ROAD)
                    return false;*/

                //const isDamaged = (structure.hits < structure.hitsMax) && structure.hits > (structure.hitsMax *.75);
                //console.log(isDamaged);
                return structure.hits < (structure.hitsMax *.75);
            }
        });

        //console.log(JSON.stringify(buildTargets.length));
        //console.log(JSON.stringify(repairTargets));

        if(buildTargets)
        {
            //clean this up, make sure containers are built first
            //buildTargets.sort((a, b) => a.structureType !== STRUCTURE_CONTAINER);

            creep.memory.state = States.build;
            creep.memory.target = buildTargets.id;
        }
        else if(repairTargets)
        {
            creep.memory.state = States.repair;
            creep.memory.target = repairTargets.id;
        }
    },
    build: (creep: DomCreep) => {
        const target: ConstructionSite | null = Game.getObjectById(creep.memory.target);
        if(!target)
        {
            creep.memory.state = States.idle;
            creep.say('RE-ASSIGN');
            return;
        }
        const buildResult = creep.build(target);

        if(buildResult == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
/*            const start = [10,27];;
            //const end = [19 , 40]
            const newPath = new RoomPosition(10,27,'W7S27').findPathTo(new RoomPosition(19,40,'W7S27'),{maxOps:100000});

            //const path = creep.pos.findPathTo(target);
            const res = creep.moveByPath(newPath, {visualizePathStyle: {stroke: '#69ff75'}});
            if(res === ERR_NOT_FOUND)
                creep.moveTo(start[0], start[1], {visualizePathStyle: {stroke: '#536dff'}});
            console.log(res);
            console.log(JSON.stringify(newPath))*/
        }

        if(creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.memory.state = States.idle; //let idle handle it
        }
    },
    repair: (creep: DomCreep) => {
        const target: Structure | null = Game.getObjectById(creep.memory.target);

        if(!target)
            {creep.memory.state = States.idle; return;}

        const repRes = creep.repair(target) == ERR_NOT_IN_RANGE;

        //console.log(target);
        //console.log(repRes);

        if(repRes) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'}});
        }

        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0 || target.hits >= target.hitsMax)
        {
            creep.memory.state = States.idle; //make sure  repair targets are cycled
        }
    }
};

module.exports = builderStates;
