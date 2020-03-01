const states = require('states');
const MathUtil = require('math.util');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const builderStates = {
    idle: (creep) => {
        //console.log("builder is in idle state");

        //creep.drop(RESOURCE_ENERGY);

        //todo check repair or build options
        if(creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.say('Collect Resource');
            creep.memory.state = states.selectResource;
        }else
        {
            //creep.findn
            creep.say('Build/Repair');
            creep.memory.state = states.selectBuildOrRepair;
        }
            //
/*        else
            creep.memory.state = states.build;*/

        //creep.moveTo(places.holding[location.x], places.holding[location.y], {visualizePathStyle: {stroke: '#5c60ff'}});
    },
    selectResource: (creep) => {
        //select resource
        //const dropped = creep.room.find(FIND_DROPPED_RESOURCES); //todo find dropped resources
        const sources = creep.room.find(FIND_STRUCTURES, {
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
            creep.memory.state = states.collectResource;
            //console.log(sources[0].store[RESOURCE_ENERGY]);
        }

/*        if(droppedSources.length)
        {
            creep.memory.target = sources[0].id;
            creep.memory.state = states.collectResource;
        }*/

    },
    moveTo: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        if(creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} }) < 0 )
        {
/*            if(target.structureType === STRUCTURE_CONTAINER)
            {
                creep.memory.state = states.collectResource
            }*/
            creep.state = states.idle;
        }

    },
    collectResource: (creep) => {
        const resourceContainer = Game.getObjectById(creep.memory.target);

        if(creep.withdraw(resourceContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(resourceContainer, {visualizePathStyle: {stroke: '#83ff6b'} });
            //creep.memory.state = states.moveTo;
            return;
        }

        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
        {
            creep.move('LEFT');
            creep.memory.state = states.idle;
        }

        if(resourceContainer.store[RESOURCE_ENERGY] === 0)
            creep.memory.state = states.idle;

    },
    selectBuildOrRepair: (creep) => {
        //todo improve choice making logic
        const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES, {});

        const repairTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                if(structure.structureType !== STRUCTURE_ROAD)
                    return false;

                const isDamaged = (structure.hits < structure.hitsMax) && structure.hits > (structure.hitsMax *.75);
                //console.log(isDamaged);
                return isDamaged;
            }
        });

        //console.log(JSON.stringify(buildTargets.length));
        //console.log(JSON.stringify(repairTargets));

        if(repairTargets)
        {
            creep.memory.state = states.repair;
            creep.memory.target = repairTargets.id;
        }
        else if(buildTargets.length > 0)
        {
            //clean this up, make sure containers are built first
            buildTargets.sort((a, b) => a.structureType !== STRUCTURE_CONTAINER);

            creep.memory.state = states.build;
            creep.memory.target = buildTargets[0].id;
        }
    },
    build: (creep) => {
        const target = Game.getObjectById(creep.memory.target);
        if(!target)
        {
            creep.memory.state = states.idle;
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
            creep.memory.state = states.idle; //let idle handle it
        }
    },
    repair: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        if(!target)
            {creep.memory.state = states.idle;}

        const repRes = creep.repair(target) == ERR_NOT_IN_RANGE;

        //console.log(target);
        //console.log(repRes);

        if(repRes) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'}});
        }

        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0 || target.hits >= target.hitsMax)
        {
            creep.memory.state = states.idle; //make sure  repair targets are cycled
        }
    }
};

module.exports = builderStates;
