import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
  tutors: [],
};

export default tutorReducer = (tutors = INITIAL_STATE, action) => {

  const newTutors = tutors.tutors;

  switch(action.type) {

    case ActionTypes.ADD_TUTOR:
      newTutors.push({
        id: action.payload.id,
        name: action.payload.name,
      });
      return {
        tutors: newTutors,
      };

    default:
      return tutors;
  }
};
