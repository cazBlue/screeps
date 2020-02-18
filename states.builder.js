const states = require('states');

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
            filter: (struct) => struct.structureType === STRUCTURE_CONTAINER
        });

        if(sources.length)
        {
            //select the best source
            sources.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);

            //todo select the closest store

            creep.memory.target = sources[0].id;
            creep.memory.state = states.collectResource;
            console.log(sources[0].store[RESOURCE_ENERGY]);
        }

    },
    moveTo: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        if(creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} }) < 0 )
        {
/*            if(target.structureType === STRUCTURE_CONTAINER)
            {
                creep.memory.state = states.collectResource
            }*/
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

        if(creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY))
            creep.memory.state = states.idle;


    },
    selectBuildOrRepair: (creep) => {
        //todo improve choice making logic
        const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES, {});

        const repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ( structure.hits < structure.hitsMax)
            }
        });

        //give build priority for now
        if(buildTargets.length)
        {
            creep.memory.state = states.build;
            creep.memory.target = buildTargets[0].id;
        }
        else if(repairTargets.length)
        {
            repairTargets.sort((a,b) => a.hits - b.hits);
            creep.memory.state = states.repair;
            creep.memory.target = repairTargets[0].id;
        }
    },
    build: (creep) => {
        const target = Game.getObjectById(creep.memory.target);
        const buildResult = creep.build(target);

        if(buildResult == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }

        if(creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.memory.state = states.idle; //let idle handle it
        }
    },
    repair: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'}});
        }

        if(creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.memory.state = states.idle; //let idle handle it
        }
    }
};

module.exports = builderStates;
