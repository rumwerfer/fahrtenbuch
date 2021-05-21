import { combineReducers } from 'redux';
import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  finished: [],
  ongoing: null,
  enteringDetails: null,
}

const journeyReducer = (journeys = INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.START_JOURNEY:
      return {
        ...journeys,
        ongoing: { startMileage: action.payload },
      };

    case ActionTypes.FINISH_JOURNEY:
      return {
        ...journeys,
        finished: {
          ...journeys.ongoing,
          endMileage: action.payload,
        },
        ongoing: null,
      };

    default:
      return journeys;
  }
};

export default combineReducers({
  journeys: journeyReducer,
})
