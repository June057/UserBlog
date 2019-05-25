
import update from 'immutability-helper';

import { ActionTypes } from 'constants/index';


const Posts = (state={},action) =>{

  switch (action.type){
    case ActionTypes.GET_USERS_SUCCESS :
      console.log("*****",action,"actions")
      return update(state,{userLists:{$set: action.data}})
     default:
      return state
  }
};
export default Posts;


