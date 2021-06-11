import * as ActionTypes from './ActionTypes';

export const addTutor = payload => (
  {
    type: ActionTypes.ADD_TUTOR,
    payload: payload,
  }
);

export const editTutor = payload => (
  {
    type: ActionTypes.EDIT_TUTOR,
    payload: payload,
  }
);

export const removeTutor = payload => (
  {
    type: ActionTypes.REMOVE_TUTOR,
    payload: payload,
  }
);
