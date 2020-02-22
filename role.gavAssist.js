const RoomPlan = require('room.gav');

const roleGavAssist = {
    /** @param {Creep} creep **/
    run: function(creep) {

        const targets = {
            one: [8,17],
            two: [13,9]
        };

        //are we in gavs room?
        const isGavRoom = creep.room.name === RoomPlan.roomName;
        if(isGavRoom)
        {
            //pick some random location and yell at Gav
            creep.say("GAV GAV GAV");
            if(creep.pos.isNearTo(targets.one[0], targets.one[1]) && creep.memory.target === 'one')
            {
                creep.memory.target = 'two';
            }
            else if(creep.pos.isNearTo(targets.two[0], targets.two[1]) && creep.memory.target === 'two')
            {
                creep.memory.target = 'one';
            }

            if(creep.memory.target === 'one')
            {
                creep.moveTo(targets.one[0], targets.one[1], {visualizePathStyle: {stroke: '#ff00c4'}});
            }
            else
            {
                creep.moveTo(targets.two[0], targets.two[1], {visualizePathStyle: {stroke: '#ff00c4'}});
            }

        }
        else
        {
            //not in Gav's room! head over there
            //const exitDir = creep.room.findExitTo(RoomPlan.roomName);
            creep.memory.target = 'one'; //set initial move target
            const gavRoom = new RoomPosition(8, 17, RoomPlan.roomName);
            //const gavRoomTarget = Game.getObjectById('5e4f5909b59f24e086d75ba8');
            creep.moveTo(gavRoom, {visualizePathStyle: {stroke: '#ff00c4'}})
            //console.log();
            //console.log(gavRoom);
        }
    }
};

module.exports = roleGavAssist;
