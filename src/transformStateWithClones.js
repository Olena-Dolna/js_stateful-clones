'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  for (let i = 0, currentState = { ...state }; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        states.push({ ...currentState, ...actions[i].extraData });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete currentState[key];
        }

        states.push(currentState);
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        states.push(currentState);
        break;
    }

    currentState = { ...states[i] };
  }

  return states;
}

module.exports = transformStateWithClones;
