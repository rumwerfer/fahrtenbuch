import { combineReducers } from 'redux';
import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  saved: [],
  ongoing: null,
  finished: null,
}

export default journeyReducer = (journeys = INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.START_JOURNEY:
      return {
        ...journeys,
        ongoing: {
          startMileage: action.payload.mileage,
          startTime: action.payload.time,
          vehicleID: action.payload.vehicleID,
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
      newSaved.push({
        ...journeys.finished,
        route: action.payload.route,
        weather: action.payload.weather,
      });
      return {
        ...journeys,
        saved: newSaved,
        finished: null,
      };

    default:
      return journeys;
  }
};
