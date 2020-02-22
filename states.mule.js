const StateIdle = require('states.mule.idle');
const StateCollectResource = require('states.mule.collectResource');
const StateDeliverResource = require('states.mule.deliverResource');
const StateSelectTarget = require('states.mule.selectTarget');

const location = {x: 0, y: 1};
const places = {
    holding: [6,19]
};

const muleStates = {
    idle: (creep) => StateIdle(creep),
    collectResource: (creep) => StateCollectResource(creep),
    selectDeliverTarget: (creep) => StateSelectTarget(creep),
    deliverResource: (creep) => StateDeliverResource(creep)
};

module.exports = muleStates;
