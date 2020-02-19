const factory = require('factory.ctrl');
const RoleHarvest = require('role.harvest');
const RoleUpgrade = require('role.upgrade');
const RoleBuilder = require('role.builder');
const RoleMule = require('role.mule');



module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    factory.run(); //create new creeps when needed


    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        //console.log(Game.creeps[name]);

        //creep.suicide();
        //return;

        switch (creep.memory.role) {
            case 'harvest':
                RoleHarvest.run(creep);
                //creep.suicide();
                break;
            case 'upgrade':
                RoleUpgrade.run(creep);
                break;
            case 'builder':
                RoleBuilder.run(creep);
                break;
            case 'mule':
                RoleMule.run(creep);
                break;
        }

    }
};
