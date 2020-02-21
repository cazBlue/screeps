const roleGavAssist = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say("MUUST HELP");

/*        const exitDir = creep.room.findExitTo('W8S27');
        console.log(exitDir);
        const exit = creep.pos.findClosestByRange(exitDir);
        console.log(exit);*/
        //creep.moveTo(exit);


        //const target = Game.getObjectById('5bbcac759099fc012e6357d1');
        //console.log(target);

        //creep.moveTo(target);

        //console.log(creep.move(TOP));

        //console.log(creep.transfer(target) == ERR_NOT_IN_RANGE)
            //creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        //}

        //console.log();


/*
        //locate a container
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (struct) => struct.structureType === STRUCTURE_CONTAINER
        });

        containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);

        const target = containers[0];

        const withdrawRes = creep.withdraw(target, RESOURCE_ENERGY);

        if(withdrawRes === ERR_NOT_IN_RANGE)
        {
            const moveRes = creep.moveTo(target, {visualizePathStyle: {stroke: '#83ff6b'} });
            //console.log(moveRes);
            //creep.memory.state = states.moveTo;
        }
*/

    }

};

module.exports = roleGavAssist;
