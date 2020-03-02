const StateIdle = require('states.mule.idle');
const StateCollectResource = require('states.mule.collectResource');
const StateDeliverResource = require('states.mule.deliverResource');
const selectDeliverTarget = require('states.mule.selectTarget');
const selectCollectTarget = require('states.mule.selectCollectTarget');

const muleStates = {
    idle: (creep) => StateIdle(creep),
    collectResource: (creep) => StateCollectResource(creep),
    //selectCollectTarget: (creep) => selectCollectTarget(creep),
    selectDeliverTarget: (creep) => selectDeliverTarget(creep),
    deliverResource: (creep) => StateDeliverResource(creep)
};

module.exports = muleStates;
