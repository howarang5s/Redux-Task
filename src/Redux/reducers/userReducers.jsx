// src/redux/reducers/userReducer.js
import { ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/userAction';

const initialState = {
    users: [],
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case 'UPDATE_USER':
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      case 'DELETE_USER':
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload),
        };
      
      case 'CLEAR_USERS':
        return {
          ...state,
          users: [], 
        };
      default:
        return state;
    }
  }
  
  export default userReducer;
  
