import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  vehicles: [],
};

export default vehicleReducer = (vehicles = INITIAL_STATE, action) => {

  const newVehicles = vehicles.vehicles;

  switch(action.type) {

    case ActionTypes.ADD_VEHICLE:
      newVehicles.push({
        id: action.payload.id,
        name: action.payload.name,
        numberPlate: action.payload.numberPlate,
        mileage: 0,
      });
      return {
        vehicles: newVehicles,
      };

    case ActionTypes.UPDATE_VEHICLE:
      newVehicles.find(vehicle => vehicle.id === action.payload.id)
        .mileage = action.payload.newMileage;
      return {
        vehicles: newVehicles,
      };

    default:
      return vehicles;
  }
};
