import * as ActionTypes from './ActionTypes';

export const startJourney = startMileage => (
  {
    type: ActionTypes.START_JOURNEY,
    payload: startMileage,
  }
);

export const finishJourney = endMileage => (
  {
    type: ActionTypes.FINISH_JOURNEY,
    payload: endMileage,
  }
);
