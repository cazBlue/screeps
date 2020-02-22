const MathUtil = require('math.util');

const getExtension = (creep) => {
    const extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => (
            struct.structureType === STRUCTURE_EXTENSION ||
            struct.structureType === STRUCTURE_SPAWN ||
            struct.structureType === STRUCTURE_TOWER)
    });

    // console.log(`*****************************`);
    extensions.sort((a,b) => {
        const aNorm = MathUtil.normalize(a.store.getFreeCapacity(RESOURCE_ENERGY), a.store.getCapacity(RESOURCE_ENERGY), 0);
        const bNorm = MathUtil.normalize(b.store.getFreeCapacity(RESOURCE_ENERGY), b.store.getCapacity(RESOURCE_ENERGY), 0);

        // console.log(`A normal: ${aNorm} B Normal: ${bNorm}`);

        return bNorm - aNorm;
    });
    //console.log(`*****************************`);

    return extensions[0];
};

module.exports = {
    getExtension: getExtension
};
