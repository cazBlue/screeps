const Roles = require('roles');
const Tower = require('tower');
//const MathUtil = require('math.util');
const factory = require('factory.ctrl');

const RoleHarvest = require('role.harvest');
const RoleUpgrade = require('role.upgrade');
const RoleBuilder = require('role.builder');
const RoleMule = require('role.mule');
const RoleGav = require('role.gavAssist');

const plan = {
    roomName: 'W7S27',
    //role: Roles.gavAssist
    //source:
};

const Room = {
    spawn: () => {
        factory.run(); //create new creeps when needed
    },
    run: (creep) => {
        //lazy tower addition....
        const tower = Game.getObjectById('5e4dbf28a3d52080467472d5');
        Tower(tower);


        switch (creep.memory.role) {
            case Roles.harvest:
                RoleHarvest.run(creep);
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
            case Roles.gavAssist:
                RoleGav.run(creep);
                break;
        }
    }
};

module.exports = Room;
