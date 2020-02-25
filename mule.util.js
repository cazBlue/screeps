const MathUtil = require('math.util');

const getExtension = (creep) => {
    const extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => (
            (
            struct.structureType === STRUCTURE_EXTENSION ||
            struct.structureType === STRUCTURE_SPAWN ||
            struct.structureType === STRUCTURE_TOWER
            )
            && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        )
    });

  //   console.log(`*****************************`);
    extensions.sort((a,b) => {
        //const aNorm = MathUtil.normalize(a.store.getFreeCapacity(RESOURCE_ENERGY), a.store.getCapacity(RESOURCE_ENERGY), 0);
        //const bNorm = MathUtil.normalize(b.store.getFreeCapacity(RESOURCE_ENERGY), b.store.getCapacity(RESOURCE_ENERGY), 0);

        // console.log(`A normal: ${aNorm} B Normal: ${bNorm}`);

        const aRange = creep.pos.getRangeTo(a);
        const bRange = creep.pos.getRangeTo(b);
/*        console.log(`*****************************`);
        console.log('a range: ' + aRange);
        console.log('b range: ' + bRange);
        console.log(aRange < bRange && a.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        console.log('capacity: ' + a.store.getFreeCapacity(RESOURCE_ENERGY));
        console.log(`*****************************`);*/

/*        if (aRange === bRange)
            return 0;*/

        //top of towers last
        if(a.structureType === STRUCTURE_TOWER){return 1;}

        if(aRange < bRange )
            return -1;

        if(aRange > bRange )
            return 1;

        return 0;

        //const

        //return bNorm - aNorm;
    });


/*    console.log(`*****************************`);
    console.log(JSON.stringify(extensions[0].store.getUsedCapacity(RESOURCE_ENERGY)));
    console.log(`*****************************`);*/

    return extensions[0];
};

module.exports = {
    getExtension: getExtension
};
