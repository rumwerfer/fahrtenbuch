import * as ActionTypes from './ActionTypes';

export const addVehicle = payload => (
  {
    type: ActionTypes.ADD_VEHICLE,
    payload: payload,
  }
);

export const updateVehicle = payload => (
  {
    type: ActionTypes.UPDATE_VEHICLE,
    payload: payload,
  }
);

export const editVehicle = payload => (
  {
    type: ActionTypes.EDIT_VEHICLE,
    payload: payload,
  }
);
