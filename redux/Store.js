import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import journeyReducer from './JourneyReducer';
import vehicleReducer from './VehicleReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistCombineReducers(persistConfig, {
  vehicles: vehicleReducer,
  journeys: journeyReducer,
});

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
}
