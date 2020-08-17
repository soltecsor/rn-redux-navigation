import {
    GET_DATA_API_SUCCESS
  } from "../config/redux-action-types/getdata";
const initialState = {
    data:[]
};
export default function authenticate(state = initialState, action = {}) {
    switch (action.type) {
      case GET_DATA_API_SUCCESS: 
        return { 
          ...state
        };
      default:
        return state;
    }
  }