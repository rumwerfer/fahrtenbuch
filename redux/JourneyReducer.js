import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  saved: [],
  ongoing: null,
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
          tutorID: action.payload.tutorID,
        },
      };

    case ActionTypes.FINISH_JOURNEY:
      const newSaved = journeys.saved;
      newSaved.push({
        ...journeys.ongoing,
        endMileage: action.payload.mileage,
        endTime: action.payload.time,
        weather: action.payload.weather,
        route: action.payload.route,
      });
      return {
        ongoing: null,
        saved: newSaved,
      };

    case ActionTypes.DISCARD_JOURNEY:
      return {
        ...journeys,
        ongoing: null,
      };

    default:
      return journeys;
  }
};
