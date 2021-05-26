import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import journeyReducer from './JourneyReducer';
import vehicleReducer from './VehicleReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const combinedReducer = combineReducers({
  journeys: journeyReducer,
  vehicles: vehicleReducer
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
}
