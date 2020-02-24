const states = require('states');

const mineSource = (creep) => {
    const sources = creep.room.find(FIND_SOURCES);

    creep.harvest(sources[creep.memory.sourceID]);

/*    if( creep.store.getFreeCapacity() === 0 )
    {
        creep.memory.state = states.drop;
    }*/
};

const harvesterIdle = {
    idle: (creep) => {
        //console.log("harvester is in idle state");

        creep.moveTo(creep.memory.target.x, creep.memory.target.y, {visualizePathStyle: {stroke: '#ffaa00'}});

        if(creep.pos.isEqualTo(creep.memory.target.x, creep.memory.target.y))
        {
            creep.memory.state = states.harvest;
        }

        //todo check for available sources and assign max 3 per source
        //creep.memory.state = states.harvest;
        //creep.memory.sourceID = 0;
    },
    harvest: mineSource,
    drop: (creep) => {
        creep.drop(); //drop resources straight onto containers
        creep.memory.state = states.harvest; //go back to harvesting
        console.log("dropping state")
    }
};

module.exports = harvesterIdle;
