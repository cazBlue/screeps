const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            const sources = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => struct.structureType === STRUCTURE_STORAGE
            });

            //console.log(sources);

            if(sources.length)
            {
                const target = sources[0];

                if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
                }

                //if(target.store[RESOURCE_ENERGY] === 0)
                //    creep.suicide(); //short term solution to remove blocks...
            }
        }
    }
};

module.exports = roleUpgrader;
