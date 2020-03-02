//import * as Screep from 'screeps';


const Rooms = require('rooms');
const RoomCtrl = require('room.ctrl');
//const RoomRome = require('room.gav');

export const loop = () => {
    //console.log(`Current game tick is ${Game.time}`);
    //console.log("Donkey Kong");

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(const creepsKey in Game.creeps) {

        //console.log(Game.creeps[name].room.name);
        const creep = Game.creeps[creepsKey];

        switch (creep.room.name) {
            case Rooms.rome.name:
                RoomCtrl.run(creep, Rooms.rome.plan);
                break
        }
    }

    for(const room in Rooms)
    {
        if(!Rooms[room].active)
            continue;

        const creepToSpawn = RoomCtrl.checkPlan(Rooms[room]);
        RoomCtrl.tower();
        RoomCtrl.spawn(creepToSpawn);
    }

};
