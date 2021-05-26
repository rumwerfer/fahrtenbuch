import * as ActionTypes from './ActionTypes';

export const addVehicle = payload => (
  {
    type: ActionTypes.ADD_VEHICLE,
    payload: payload,
  }
);
