const states = require('states');
const MathUtil = require('math.util');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

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
    //extensions.forEach(ext => console.log(ext.structureType));

    //extensions.sort((a, b) => b.store.getFreeCapacity(RESOURCE_ENERGY) - a.store.getFreeCapacity(RESOURCE_ENERGY));

    //console.log(JSON.stringify(extensions));

    let selection = extensions[0];

/*    for( const extens in extensions)
    {
        //console.log('*************************************************');
        //console.log(extensions[extens].store.getFreeCapacity(RESOURCE_ENERGY));

       if(extensions[extens].structureType === STRUCTURE_SPAWN
           && extensions[extens].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
           selection = extensions[extens]; //lets top up the spawn first
       }
    }*/

    return selection;
};

const muleStates = {
    idle: (creep) => {

        //locate a container
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (struct) => struct.structureType === STRUCTURE_CONTAINER
        });

        containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);

        const droppedSources = creep.room.find(FIND_DROPPED_RESOURCES, {
        //todo add filter by amount
        });


        const ext = getExtension(creep);
        //console.log(ext.store.getFreeCapacity(RESOURCE_ENERGY));
        if(ext.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
        {
            creep.moveTo(places.holding[location.x], places.holding[location.y]);
            return;
        } //wait until there is a need

        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        {
            creep.memory.state = states.collectResource;
            creep.memory.target = containers[0].id;
        }
        else {
            creep.memory.state = states.deliverResource;
            creep.memory.target = ext.id;
        }

    },
    collectResource: (creep) => {
        const target = Game.getObjectById(creep.memory.target);

        const withdrawRes = creep.withdraw(target, RESOURCE_ENERGY);

        if(withdrawRes === ERR_NOT_IN_RANGE)
        {
            const moveRes = creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
            //console.log(moveRes);
            //creep.memory.state = states.moveTo;
        }

        if(creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY))
        {
            creep.memory.state = states.selectDeliverTarget;
        }

        if(target.store.getUsedCapacity(RESOURCE_ENERGY) === 0 || withdrawRes === ERR_NOT_ENOUGH_RESOURCES)
        {
            //console.log("yes");
            creep.moveTo(places.holding[0], places.holding[1], {visualizePathStyle: {stroke: '#83ff6b'} });
            creep.memory.state = states.idle;
        }

    },
    selectDeliverTarget: (creep) => {
        const extension = getExtension(creep);

        creep.memory.state = states.deliverResource;
        creep.memory.target = extension.id;

        if(extension.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
        {
            creep.memory.state = states.idle;
            return;
        }

    },
    deliverResource: (creep) => {
        const target = Game.getObjectById(creep.memory.target);
        //console.log('deliver to');
        //console.log(target);

        const transferRres = creep.transfer(target, RESOURCE_ENERGY);

        if(transferRres === OK)
            return;

        if(transferRres === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
        }
        else if(transferRres === ERR_FULL && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        {
            //console.log("selecting another target");
            creep.memory.state = states.selectDeliverTarget;
        }
        else // if(transferRres === ERR_NOT_ENOUGH_ENERGY)
        {
            //console.log("mule going idle");
            creep.memory.state = states.idle;
        }
    }
};

module.exports = muleStates;
