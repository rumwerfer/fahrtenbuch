import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  vehicles: [],
};

export default vehicleReducer = (vehicles = INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.ADD_VEHICLE:
      const newVehicles = vehicles.vehicles;
      newVehicles.push({
        name: action.payload.name,
        numberPlate: action.payload.numberPlate,
        mileage: 0,
      });
      return {
        vehicles: newVehicles,
      };

    default:
      return vehicles;
  }
};
