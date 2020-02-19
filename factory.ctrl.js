const creepBotCounts = {
    harvestBot: {
        count: 3,
        skills: [WORK, WORK, MOVE] //100, 100, 100, 50 = 350
    },
    upgradeBot: {
        count: 6,
        skills: [WORK,CARRY,CARRY,MOVE]
    },
    builderBot: {
        count: 4,
        skills: [WORK,CARRY,CARRY,MOVE]
    },
    muleBot: {
        count: 3,
        skills: [CARRY,CARRY,MOVE,MOVE]
    }
};

/*
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

const factory = {
    run: () => {
        if(Game.spawns['Rome'].spawning != null) //todo add check for resource as well
            return;

        let creepCount = {
            harvest: 0,
            upgrade: 0,
            builder: 0,
            mule:    0
        };

        for(const name in Game.creeps) {
            switch (Game.creeps[name].memory.role) {
                case 'harvest':
                    creepCount.harvest++;
                    break;
                case 'upgrade':
                    creepCount.upgrade++;
                    break;
                case 'builder':
                    creepCount.builder++;
                    break;
                case 'mule':
                    creepCount.mule++;
                    break;
            }
        }

        //give replacing harvesters top billing
        if(creepCount.harvest < creepBotCounts.harvestBot.count)
        {
            spawnACreep('harvest', creepBotCounts.harvestBot.skills);
        }
        else
        {
            if(creepCount.upgrade < creepBotCounts.upgradeBot.count)
            {
                spawnACreep('upgrade', creepBotCounts.upgradeBot.skills);
            }

            if(creepCount.builder < creepBotCounts.builderBot.count)
            {
                spawnACreep('builder', creepBotCounts.builderBot.skills);
            }

            if(creepCount.mule < creepBotCounts.muleBot.count)
            {
                spawnACreep('mule', creepBotCounts.muleBot.skills);
            }
        }
    }
};

module.exports = factory;
