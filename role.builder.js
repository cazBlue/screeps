const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {   //return to holding when idle to get out of way
                const repairTarget = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.hits < structure.hitsMax)
                    }
                });

                if(repairTarget.length)
                {
                    repairTarget.sort((a,b) => a.hits - b.hits);

                    const repTarget = repairTarget[0];
                    if(creep.repair(repTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repTarget, {visualizePathStyle: {stroke: '#83ff6b'}});
                    }
                }
                else {
                    creep.moveTo(places.holding[location.x], places.holding[location.y], {visualizePathStyle: {stroke: '#5c60ff'}});
                }
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
};

module.exports = roleBuilder;
