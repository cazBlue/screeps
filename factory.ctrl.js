const spawnACreep = (role) => {
    //console.log("Not enough " + role);
    const newName = role + Game.time;
    //console.log('Spawning new harvester: ' + newName);

    Game.spawns['Rome'].spawnCreep([WORK,CARRY,MOVE], newName, {
        memory: {role: role},
        directions: [TOP]
    });
};

const factory = {
    run: (creep) => {
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

        if(creepCount.upgrade <= 3)
        {
            spawnACreep('upgrade');
        }

        if(creepCount.builder <= 5)
        {
            spawnACreep('builder');
        }

        if(creepCount.harvest <= 5)
        {
            spawnACreep('harvest');
        }

    }
};

module.exports = factory;
