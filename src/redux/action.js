export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_TASKS = 'SET_TASKS';
// i also create an action for the TASK_ID that opens in the task detail page.
export const SET_TASK_ID = 'SET_TASK_ID';

export const GET_MEMBER_DATA = 'GET_MEMBER_DATA';

const API_URL = 'https://mocki.io/v1/3401464f-af43-4d05-83fb-6cdc5a1219a0';

export const getMemberData = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_MEMBER_DATA,
          payload: json,
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setTaskID = taskID => dispatch => {
  dispatch({
    type: SET_TASK_ID,
    payload: taskID,
  });
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setPassword = password => dispatch => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password,
  });
};

export const setTasks = tasks => dispatch => {
  dispatch({
    type: SET_TASKS,
    payload: tasks,
  });
};
