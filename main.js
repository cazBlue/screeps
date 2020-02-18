const factory = require('factory.ctrl');
const RoleHarvest = require('role.harvest');
const RoleUpgrade = require('role.upgrade');
const RoleBuilder = require('role.builder');


module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    factory.run(Game.creeps); //create new creeps when needed

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        //console.log(Game.creeps[name]);

        switch (creep.memory.role) {
            case 'harvest':
                RoleHarvest.run(creep);
                break;
            case 'upgrade':
                RoleUpgrade.run(creep);
                break;
            case 'builder':
                RoleBuilder.run(creep);
                break;
        }


        /*
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
         */
    }
};
