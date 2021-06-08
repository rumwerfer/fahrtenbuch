import * as ActionTypes from './ActionTypes';
import Constants from '../res/Constants';

let INITIAL_STATE = {
  saved: [],
  ongoing: null,
};

if (Constants.debug) {
  INITIAL_STATE = {
    saved: [
      {
        startMileage: 19695,
        endMileage: 20000,
        startTime: 1606060606000,
        endTime: 1606065606000,
        vehicleID: 0,
        tutorID: 0,
        weather: 0,
        route: 'Salzburg – Wien',
      },
      {
        startMileage: 29895,
        endMileage: 29917,
        startTime: 1612341234000,
        endTime: 1612342345000,
        vehicleID: 1,
        tutorID: 1,
        weather: 3,
        route: 'Hallein – Salzburg',
      },
      {
        startMileage: 29917,
        endMileage: 30000,
        startTime: 1623232323000,
        endTime: 1623234343000,
        vehicleID: 1,
        tutorID: 0,
        weather: 1,
        route: 'Salzburg – Hintersee – Salzburg',
      },
    ],
    ongoing: null,
  };
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
