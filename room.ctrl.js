const Roles = require('roles');
const States = require('states');
const Tower = require('tower');
//const MathUtil = require('math.util');
const factory = require('factory.ctrl');

const RoleHarvest = require('role.harvest');
const RoleUpgrade = require('role.upgrade');
const RoleBuilder = require('role.builder');
const RoleMule = require('role.mule');
const RoleGav = require('role.gavAssist');

const containerCheck = (roomPlan, roomObj) => {
    //container check
    for(let i = 0; i < roomPlan.plan.source.length; i++)
    {
        for(let j = 0; j < roomPlan.plan.source[i].locations.length; j++)
        {
            const loc = roomPlan.plan.source[i].locations[j];
            const structuresOnPos = roomObj.lookForAt( LOOK_STRUCTURES ,loc[0], loc[1])
                .filter(struct => struct.structureType === STRUCTURE_CONTAINER);

            const constructionOnPos = roomObj.lookForAt(LOOK_CONSTRUCTION_SITES, loc[0], loc[1]);

            //create a construction site for container
            if(structuresOnPos.length === 0 && constructionOnPos.length === 0)
            {
                //console.log(`Uh oh no container on expected location: ${loc[0]},${loc[1]}`);
                const createContainer = roomObj.createConstructionSite(loc[0], loc[1], STRUCTURE_CONTAINER);
                //console.log(createContainer);
            }
        }
    }
};


const checkPlan = (roomPlan) => {
    const roomObj = Game.rooms['W7S27'];//Game.rooms[roomPlan.name];

    containerCheck(roomPlan, roomObj);

    const harvesters = roomObj.find(  FIND_CREEPS , {
        filter: creep => {
            return (creep.owner.username === 'domitoVita' &&
            creep.memory.role === Roles.harvest)
        }
    });

    //console.log(`${harvesters.length} Harvesters`);

    let creepToSpawn = {roleToSpawn: null};

    for(let i = 0; i < roomPlan.plan.source.length; i++) {
        for (let j = 0; j < roomPlan.plan.source[i].locations.length; j++) {
            if(creepToSpawn.roleToSpawn)
                continue;

            const loc = roomPlan.plan.source[i].locations[j];

            //check if a harvester is heading to the target location
            const hasHarvester = harvesters.find(harv =>
                harv.memory.target.x === loc[0] &&
                harv.memory.target.y === loc[1] );

            if(hasHarvester === undefined)
            {
                //console.log('no harvester found!');
                creepToSpawn = {
                    roleToSpawn: Roles.harvest,
                    target: {x: loc[0], y: loc[1]},
                    sourceID: i
                }
            }
        }
    }

    //console.log(JSON.stringify(creepToSpawn));

    return creepToSpawn;
};

const Room = {
    checkPlan: (roomPlan) => checkPlan(roomPlan),
    spawn: (creepToSpawn) => {
        factory.run(creepToSpawn); //create new creeps when needed
    },
    tower: () => {
        //lazy tower addition....
        const tower = Game.getObjectById('5e4dbf28a3d52080467472d5');
        Tower(tower);
    },
    run: (creep, roomPlan) => {

        //console.log('yes');

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
