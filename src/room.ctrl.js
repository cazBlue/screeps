const Roles = require('src/roles');
const States = require('src/states');
const Tower = require('src/tower');
//const MathUtil = require('math.util');
const factory = require('src/factory.ctrl');

const RoleHarvest = require('src/role.harvest');
const RoleUpgrade = require('src/role.upgrade');
const RoleBuilder = require('src/role.builder');
const RoleMule = require('src/role.mule');
const RoleGav = require('src/role.gavAssist');
const RoleNightFill = require('src/role.nightfill');

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

const harvesterCheck= (roomPlan, roomObj) => {
    let creepToSpawn = {roleToSpawn: null};

    const harvesters = roomObj.find(  FIND_CREEPS , {
        filter: creep => {
            return (creep.owner.username === 'domitoVita' &&
                creep.memory.role === Roles.harvest)
        }
    });

    //console.log(`${harvesters.length} Harvesters`);

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

    return creepToSpawn;
};


const checkPlan = (roomPlan) => {
    const roomObj = Game.rooms[roomPlan.name];//Game.rooms[roomPlan.name];

/*    console.log(roomPlan.name);
    console.log(roomObj);*/

    containerCheck(roomPlan, roomObj);

    let creepToSpawn = harvesterCheck(roomPlan, roomObj);


    //check mules
    //todo add mule pool ID

    //todo add embedd mule pool collect/deliver targets


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

        const towerTwo = Game.getObjectById('5e5783e474988d3f08a32f7d');
        Tower(towerTwo);

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
            case Roles.nightFill:
                RoleNightFill.run(creep);
                break;
        }
    }
};

module.exports = Room;
