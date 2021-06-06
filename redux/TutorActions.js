import * as ActionTypes from './ActionTypes';

export const addTutor = payload => (
  {
    type: ActionTypes.ADD_TUTOR,
    payload: payload,
  }
);
