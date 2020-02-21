const Roles = require('roles');

let Screeps = {
    harvestBot: {
        target: 3,
        count: 0,
        skills: [WORK, WORK, WORK, MOVE], //100, 100, 100, 50 = 350
        role: Roles.harvest
    },
    upgradeBot: {
        target: 4,
        count: 0,
        skills: [WORK,CARRY,CARRY,MOVE],
        role: Roles.upgrade
    },
    builderBot: {
        target: 2,
        count: 0,
        skills: [WORK,CARRY,CARRY,MOVE],
        role: Roles.builder
    },
    muleBot: {
        target: 3,
        count: 0,
        skills: [CARRY,CARRY,MOVE,MOVE],
        role: Roles.mule
    },
    gavAssist: {
        target: 0,
        count: 0,
        skills: [CARRY,CARRY,MOVE,MOVE,MOVE],
        role: Roles.gavAssist
    }
};

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

const updateCounts = () => {
    for(const name in Game.creeps) {
        switch (Game.creeps[name].memory.role) {
            case Roles.harvest:
                Screeps.harvestBot.count++;
                break;
            case Roles.upgrade:
                Screeps.upgradeBot.count++;
                break;
            case Roles.builder:
                Screeps.builderBot.count++;
                break;
            case Roles.mule:
                Screeps.muleBot.count++;
                break;
            case Roles.gavAssist:
                Screeps.gavAssist.count++;
                break;
        }
    }
};

const factory = {
    run: () => {
        if(Game.spawns['Rome'].spawning != null) //todo add check for resource as well
            return;

        updateCounts();
        //console.log(JSON.stringify(Screeps));

        //give replacing harvesters top billing
        if(Screeps.harvestBot.count < Screeps.harvestBot.target)
        {
            spawnACreep(Roles.harvest, Screeps.harvestBot.skills);
        }
        else
        {
            if(Screeps.upgradeBot.count < Screeps.upgradeBot.target)
            {
                spawnACreep(Roles.upgrade, Screeps.upgradeBot.skills);
            }

            if(Screeps.builderBot.count < Screeps.builderBot.target)
            {
                spawnACreep(Roles.builder, Screeps.builderBot.skills);
            }

            if(Screeps.muleBot.count < Screeps.muleBot.target)
            {
                spawnACreep(Roles.mule, Screeps.muleBot.skills);
            }

            if(Screeps.gavAssist.count < Screeps.gavAssist.target)
            {
                spawnACreep(Roles.gavAssist, Screeps.gavAssist.skills);
            }
        }
    }
};

module.exports = factory;
