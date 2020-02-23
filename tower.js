const MathUtil = require('math.util');

const Tower = (tower) => {
    if(tower) {
        const closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax &&
                    structure.structureType === STRUCTURE_WALL ||
                    structure.structureType === STRUCTURE_RAMPART ||
                    structure.structureType === STRUCTURE_CONTAINER
            }
        });

        closestDamagedStructure.sort((a,b) => {
            const aNorm = MathUtil.normalize(a.hits, a.hitsMax, 0);
            const bNorm = MathUtil.normalize(b.hits, b.hitsMax, 0);
            //console.log(`A normal: ${aNorm} B Normal: ${bNorm}`);

            return aNorm - bNorm;
        });

        if(closestDamagedStructure.length &&
            tower.store.getUsedCapacity(RESOURCE_ENERGY) > tower.store.getCapacity(RESOURCE_ENERGY) * .75)
        {   //repair if tower reserves > 75% so there is always ammo to shoot
            {tower.repair(closestDamagedStructure[0]);}
        }

        //todo add room states for WAR/invader detection
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
};

module.exports = Tower;
