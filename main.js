const factory = require('factory.ctrl');
const RoleHarvest = require('role.harvest');
const RoleUpgrade = require('role.upgrade');
const RoleBuilder = require('role.builder');
const RoleMule = require('role.mule');
const Roles = require('roles');
//const RoleGav = require('role.gavAssist');


module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    factory.run(); //create new creeps when needed

    //lazy tower addition....
    const tower = Game.getObjectById('5e4dbf28a3d52080467472d5');
    if(tower) {
/*        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }*/
        //todo add room states for WAR/invader detection
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        //console.log(Game.creeps[name]);

        //creep.suicide();
        //return;

        switch (creep.memory.role) {
            case Roles.harvest:
                RoleHarvest.run(creep);
                //creep.suicide();
                break;
            case Roles.upgrade:
                RoleUpgrade.run(creep);
                break;
            case Roles.builder:
                RoleBuilder.run(creep);
                break;
            case Roles.mule:
                RoleMule.run(creep);
                break;
/*            case "gavassist":
                RoleGav.run(creep);
                break;*/
        }
    }
};
