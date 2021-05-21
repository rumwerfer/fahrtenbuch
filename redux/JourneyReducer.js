import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
}

const journeyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'START_JOURNEY':
      const {current} = state; // to not alter state directly
      const startedJourney = { mileage: action.payload };
      current.push(startedJourney);
      const newState = {current};
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  journeys: journeyReducer,
})
