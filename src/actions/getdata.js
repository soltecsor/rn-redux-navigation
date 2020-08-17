import { GET_DATA_API_SUCCESS } from "../config/redux-action-types/getdata";

export function getdata() { 
    return async dispatch => {
      dispatch(); 
      let myHeaders = new Headers();
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMDk1IiwibmJmIjoxNTk2ODE5MTc4LCJleHAiOjE1OTc0MjM5NzgsImlhdCI6MTU5NjgxOTE3OH0.84Ud_bUwku0bh9QswVvtwgzkZuRHVhEpL4s4Ipykwow");
            myHeaders.append("Content-Type", "application/json");
          
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };
      return fetch(`https://demo5875204.mockable.io/marketplace/previapedido`,requestOptions)
      .then(response => dispatch(getDataSuccess(response.data)))
   }
  } 

  function getDataSuccess(payload) {
      console.log('@@@',payload)
    return {
      type: GET_DATA_API_SUCCESS,
      data: {
        payload: payload
      }
    };
  }