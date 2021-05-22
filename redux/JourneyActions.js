import * as ActionTypes from './ActionTypes';

export const startJourney = payload => (
  {
    type: ActionTypes.START_JOURNEY,
    payload: payload,
  }
);

export const finishJourney = payload => (
  {
    type: ActionTypes.FINISH_JOURNEY,
    payload: payload,
  }
);

export const saveJourney = () => (
  {
    type: ActionTypes.SAVE_JOURNEY,
  }
)
