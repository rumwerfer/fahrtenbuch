import { createStore } from 'redux';
import journeyReducer from './JourneyReducer';

export const store = createStore(journeyReducer);
