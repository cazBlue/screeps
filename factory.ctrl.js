const creepBotCounts = {
    harvestBot: {
        count: 3,
        skills: [WORK, MOVE]
    },
    upgradeBot: {
        count: 3,
        skills: [WORK,CARRY,MOVE]
    },
    builderBot: {
        count: 3,
        skills: [WORK,CARRY,MOVE]
    }
};

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
            builder: 0
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
            }
        }

        if(creepCount.upgrade < creepBotCounts.upgradeBot.count)
        {
            spawnACreep('upgrade', creepBotCounts.upgradeBot.skills);
        }

        if(creepCount.builder < creepBotCounts.builderBot.count)
        {
            spawnACreep('builder', creepBotCounts.builderBot.skills);
        }

        if(creepCount.harvest < creepBotCounts.harvestBot.count)
        {
            spawnACreep('harvest', creepBotCounts.harvestBot.skills);
        }

    }
};

module.exports = factory;
