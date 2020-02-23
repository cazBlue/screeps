

const Rooms = require('rooms');
const RoomRome = require('room.rome');
//const RoomRome = require('room.gav');

module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(const room in Rooms)
    {
        switch (Rooms[room]) {
            case Rooms.rome:
                RoomRome.spawn();
                break
        }
    }

    for(const name in Game.creeps) {

        //console.log(Game.creeps[name].room.name);
        const creep = Game.creeps[name];

        switch (creep.room.name) {

            case Rooms.rome:
                RoomRome.run(creep);
                break

        }
    }
};
