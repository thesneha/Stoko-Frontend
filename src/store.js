import { createStore } from "redux";

const initialState = {
  
    user:null
  };
  
function reducer(state=initialState, action) {
    if(action.type==='login'){
        state.user =action.payload;
    }
    if(action.type==='logout'){
        state.user =null;
    }
	return state;
}
export const store = createStore(reducer);