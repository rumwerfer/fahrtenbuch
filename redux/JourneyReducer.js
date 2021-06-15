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
        id: 0,
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
        id: 1,
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
        id: 2,
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
  const newSaved = journeys.saved;
  switch(action.type) {

    case ActionTypes.START_JOURNEY:
      return {
        ...journeys,
        ongoing: {
          id: action.payload.time,
          startMileage: action.payload.mileage,
          startTime: action.payload.time,
          vehicleID: action.payload.vehicleID,
          tutorID: action.payload.tutorID,
        },
      };

    case ActionTypes.FINISH_JOURNEY:
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

    case ActionTypes.REMOVE_TUTOR_JOURNEYS:
      return {
        saved: newSaved.filter(
          journey => journey.tutorID !== action.payload.tutorID
        ),
        ongoing:
          journeys.ongoing?.tutorID !== action.payload.tutorID
          ? journeys.ongoing : null,
      };

    case ActionTypes.REMOVE_VEHICLE_JOURNEYS:
      return {
        saved: newSaved.filter(
          journey => journey.vehicleID !== action.payload.vehicleID
        ),
        ongoing:
          journeys.ongoing?.vehicleID !== action.payload.vehicleID
          ? journeys.ongoing : null,
      };

    case ActionTypes.REMOVE_JOURNEY:
      return {
        saved: newSaved.filter(
          journey => journey.id !== action.payload.id
        ),
        ongoing: journeys.ongoing,
      };

    case ActionTypes.EDIT_JOURNEY:
      const journey = newSaved.find(
        journey => journey.id === action.payload.id
      );
      journey.startMileage = action.payload.startMileage;
      journey.endMileage = action.payload.endMileage;
      journey.route = action.payload.route;
      journey.vehicleID = action.payload.vehicleID;
      journey.tutorID = action.payload.tutorID;
      journey.weather = action.payload.weather;
      journey.startTime = action.payload.startTime;
      journey.endTime = action.payload.endTime;
      return {
        saved: newSaved,
        ongoing: journeys.ongoing,
      };

    default:
      return journeys;
  }
};
