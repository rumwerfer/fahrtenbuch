import * as ActionTypes from './ActionTypes';
import Constants from '../res/Constants';

let INITIAL_STATE = { tutors: [] };

if (Constants.debug) {
  INITIAL_STATE = {
    tutors: [
      {
        id: 0,
        nickName: 'Mama',
        fullName: 'Marlene Hinterberger',
      },
      {
        id: 1,
        nickName: 'Papa',
        fullName: 'Franz Hinterberger',
      }
    ],
  };
}

export default tutorReducer = (tutors = INITIAL_STATE, action) => {

  const newTutors = tutors.tutors;

  switch(action.type) {

    case ActionTypes.ADD_TUTOR:
      newTutors.push({
        id: action.payload.id,
        nickName: action.payload.nickName,
        fullName: action.payload.fullName,
      });
      return {
        tutors: newTutors,
      };

    case ActionTypes.EDIT_TUTOR:
      const tutor = newTutors.find(tutor => tutor.id === action.payload.id);
      tutor.fullName = action.payload.fullName;
      tutor.nickName = action.payload.nickName;
      return {
        tutors: newTutors
      };

    default:
      return tutors;
  }
};
