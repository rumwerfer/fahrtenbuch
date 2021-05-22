import { combineReducers } from 'redux';
import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  saved: [],
  ongoing: null,
  finished: null,
}

const journeyReducer = (journeys = INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.START_JOURNEY:
      return {
        ...journeys,
        ongoing: {
          startMileage: action.payload.mileage,
          startTime: action.payload.time,
        },
      };

    case ActionTypes.FINISH_JOURNEY:
      return {
        ...journeys,
        finished: {
          ...journeys.ongoing,
          endMileage: action.payload.mileage,
          endTime: action.payload.time,
        },
        ongoing: null,
      };

    case ActionTypes.SAVE_JOURNEY:
      const newSaved = journeys.saved;
      newSaved.push(journeys.finished);
      return {
        ...journeys,
        saved: newSaved,
        finished: null,
      };

    default:
      return journeys;
  }
};

export default combineReducers({
  journeys: journeyReducer,
})
