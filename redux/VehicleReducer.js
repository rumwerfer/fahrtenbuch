import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  vehicles: [],
};

export default vehicleReducer = (vehicles = INITIAL_STATE, action) => {
  switch(action.type) {

    case ActionTypes.ADD_VEHICLE:
      const newVehicles = vehicles.vehicles;
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
      vehicles.vehicles.find(vehicle => vehicle.id === action.payload.id)
        .mileage = action.payload.newMileage;
      return vehicles;

    default:
      return vehicles;
  }
};
