const Roles = require('roles');


/* //https://docs.screeps.com/api/#Constants
    BODYPART_COST
    "move": 50,
    "work": 100,
    "attack": 80,
    "carry": 50,
    "heal": 250,
    "ranged_attack": 150,
    "tough": 10,
    "claim": 600
 */

const states = require('states');

const spawnACreep = (role, skills) => {
    //console.log("Not enough " + role);
    const newName = role + Game.time;
    //console.log('Spawning new harvester: ' + newName);

    Game.spawns['Rome'].spawnCreep(skills, newName, {
        memory: {role: role, state: states.idle},
        directions: [TOP]
    });
};

const updateCounts = (ScreepsList) => {
    for(const name in Game.creeps) {
        switch (Game.creeps[name].memory.role) {
            case Roles.harvest:
                ScreepsList.harvestBot.count++;
                break;
            case Roles.upgrade:
                ScreepsList.upgradeBot.count++;
                break;
            case Roles.builder:
                ScreepsList.builderBot.count++;
                break;
            case Roles.mule:
                ScreepsList.muleBot.count++;
                break;
            case Roles.gavAssist:
                ScreepsList.gavAssist.count++;
                break;
        }
    }
    return ScreepsList;
};

const factory = {
    run: () => {
        let Screeps = {
            harvestBot: {
                target: 2,
                count: 0,
                skills: [WORK, WORK, WORK, MOVE], //100, 100, 100, 50 = 350
                role: Roles.harvest
            },
            upgradeBot: {
                target: 1,
                count: 0,
                skills: [WORK,CARRY,CARRY,MOVE],
                role: Roles.upgrade
            },
            builderBot: {
                target: 2,
                count: 0,
                skills: [WORK, WORK, CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], //100, 100,  50, 50, 50, 50, 50, 50
                role: Roles.builder
            },
            muleBot: {
                target: 2,
                count: 0,
                skills: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                role: Roles.mule
            },
            gavAssist: {
                target: -1,
                count: 0,
                skills: [MOVE,MOVE,MOVE,MOVE,MOVE],
                role: Roles.gavAssist
            }
        };

        //if(Game.spawns['Rome'].spawning != null) //todo add check for resource as well
        //    return;
        //console.log("spawning");

        Screeps = updateCounts(Screeps);
        //console.log(JSON.stringify(Screeps));

        //give replacing harvesters top billing
        let spawnSelected = false;

        if(Screeps.harvestBot.count <= Screeps.harvestBot.target
            && !spawnSelected
            && Screeps.muleBot.count > 0
            )
        {
            spawnACreep(Roles.harvest, Screeps.harvestBot.skills);
            spawnSelected = true;
        }


        if(Screeps.muleBot.count <= Screeps.muleBot.target && !spawnSelected)
        {
            spawnACreep(Roles.mule, Screeps.muleBot.skills);
            spawnSelected = true;
        }

        if(Screeps.upgradeBot.count <= Screeps.upgradeBot.target && !spawnSelected)
        {
            spawnACreep(Roles.upgrade, Screeps.upgradeBot.skills);
            spawnSelected = true;
        }

        if(Screeps.builderBot.count <= Screeps.builderBot.target && !spawnSelected)
        {
            spawnACreep(Roles.builder, Screeps.builderBot.skills);
            spawnSelected = true;
        }

        if(Screeps.gavAssist.count <= Screeps.gavAssist.target && !spawnSelected)
        {
            spawnACreep(Roles.gavAssist, Screeps.gavAssist.skills);
            spawnSelected = true;
        }

    }
};

module.exports = factory;
