import {
  SET_USER_NAME,
  SET_USER_PASSWORD,
  SET_TASKS,
  SET_TASK_ID,
  GET_MEMBER_DATA,
} from './action';

// define default values of states.
const initialState = {
  name: '',
  password: '',
  tasks: [],
  taskID: [],
  g_memberData: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_PASSWORD:
      return {...state, password: action.payload};
    case SET_TASKS:
      return {...state, tasks: action.payload};
    case SET_TASK_ID:
      return {...state, taskID: action.payload};
    case GET_MEMBER_DATA:
      return {...state, g_memberData: action.payload};
    default:
      return state;
  }
}
export default userReducer;
