const StateIdle = require('src/states.mule.idle');
const StateCollectResource = require('src/states.mule.collectResource');
const StateDeliverResource = require('src/states.mule.deliverResource');
const selectDeliverTarget = require('src/states.mule.selectTarget');
const selectCollectTarget = require('src/states.mule.selectCollectTarget');

const muleStates = {
    idle: (creep) => StateIdle(creep),
    collectResource: (creep) => StateCollectResource(creep),
    //selectCollectTarget: (creep) => selectCollectTarget(creep),
    selectDeliverTarget: (creep) => selectDeliverTarget(creep),
    deliverResource: (creep) => StateDeliverResource(creep)
};

module.exports = muleStates;
