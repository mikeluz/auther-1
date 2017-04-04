import axios from 'axios';
import { set } from './users'

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'SET_CURRENT_USER';


/* ------------   ACTION CREATORS     ------------------ */

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER});


/* ------------       REDUCER     ------------------ */

export default function reducer (users = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return users;
  }
}

export const loginUser = (email, password) => dispatch => {
  return axios.post('api/users/login', {email: email, password: password})
    .then(res => {dispatch(setCurrentUser(res.data))})
    .catch(err => console.error(`Login in User unsuccesful`, err))
};

export const logoutUser = () => dispatch => {
  return axios.get('api/users/logout')
    .then(res => dispatch(removeCurrentUser()))
    .catch(err => console.error('Logged out', err));
};
