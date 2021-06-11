import * as ActionTypes from './ActionTypes';
import Constants from '../res/Constants';

let INITIAL_STATE = { vehicles: [] };

if (Constants.debug) {
  INITIAL_STATE = {
    vehicles: [
      {
        id: 0,
        name: 'Toyota',
        numberPlate: 'SL-123RT',
        mileage: 20000,
      },
      {
        id: 1,
        name: 'Golf',
        numberPlate: 'SL-456UV',
        mileage: 30000,
      },
    ],
  };
}

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

    case ActionTypes.EDIT_VEHICLE:
      const vehicle = newVehicles.find(
        vehicle => vehicle.id === action.payload.id
      );
      vehicle.numberPlate = action.payload.numberPlate;
      vehicle.name = action.payload.name;
      return {
        vehicles: newVehicles
      };

    case ActionTypes.REMOVE_VEHICLE:
    return {
      vehicles: newVehicles.filter(vehicle => vehicle.id !== action.payload.id)
    };

    default:
      return vehicles;
  }
};
