

const Rooms = require('rooms');
const RoomCtrl = require('room.ctrl');
//const RoomRome = require('room.gav');

module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(const name in Game.creeps) {

        //console.log(Game.creeps[name].room.name);
        const creep = Game.creeps[name];

        switch (creep.room.name) {

            case Rooms.rome.name:
                RoomCtrl.spawn({});
                RoomCtrl.run(creep, {});
                break

        }
    }
};
