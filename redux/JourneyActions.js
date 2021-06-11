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

export const saveJourney = payload => (
  {
    type: ActionTypes.SAVE_JOURNEY,
    payload: payload,
  }
);

export const discardJourney = () => (
  {
    type: ActionTypes.DISCARD_JOURNEY,
  }
);

export const removeTutorJourneys = payload => (
  {
    type: ActionTypes.REMOVE_TUTOR_JOURNEYS,
    payload: payload,
  }
);
