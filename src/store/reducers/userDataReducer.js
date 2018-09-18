import * as actionTypes from '../actions/actionTypes';



const initialState = {
    loading:false,
    users:[],
    completed:false,
    updateAt:null,
    success:null,
    updatId: null,
    userData: [],
    deleteStatusCode: null,
    isLoaded: false

}
const createUserStart = (state, action)=>{
    return {
        ...state,
        ...{loading:true
           }
    };
};

const createUserSuccess = (state, action)=>{

    return {
        ...state,
        ...{
            loading: false,
            users: state.users.concat(action.userData),
            success: action.successStatus
           
        }
        
    };
};

 const createUserFail = (state,action) =>{
     return {
         ...state,
         ...{loading: false}
         
     };
 };


 const fetchUSersStart = (state, action) =>{
     return{
         ...state,
         ...{
            loading:true
         }
     };
 };
 const fetchUsersSuccess = (state,action) =>{
     return{
        ...state,
        ...{
            users: action.users,
            loading: false,
            success: null,
            deleteStatusCode:null
            }
    
    };
     
 };

 const fetcUsersFail = (state, action) =>{
     return{
         ...state,
         ...{
             loading: false
         }
     }
 }
 const updateUSerStart =(state,action) =>{
     return{
         ...state,
          loading:true
     };
 };
 const updateUSerFail=(state, action)=>{
     return{
         ...state,
         loading:false
     };
 };
 const updateUserSucess= (state, action) =>{
     return{
         ...state,
         ...{updateAt: action.updateAt,
            loading:false}
     }
 }


const deleteStart = (state, action) =>{
      return{
          ...state,
          ...{
            users:  [...state.users.filter(item => item.id !== action.userId)],
            deleteStatusCode: null

          }
      }

    }


 const deleteUserSucess =(state,action)=>{
     return {
        ...state,
        deleteStatusCode: action.status,
        userId: null,
        name: null,
        job:null,
        createdAt: null
     }
 }
   const fetchUserStart = (state,action) =>{
       return{
           ...state,
           loading: true,
       }
   }

 const fetchUserSuccess =(state, action) =>{
  return{
    ...state,
    loading: false,
    userData: action.userData,
    isLoaded: true,
    getSucessCode: action.getSucessCode

  }
 }
 const reducer = (state = initialState, action) =>{
     switch(action.type){
        case actionTypes.USER_DATA_START: return createUserStart(state, action);
        case actionTypes.USER_DATA_SUCESS: return createUserSuccess(state, action);
        case actionTypes.USER_DATA_FAIL: return createUserFail(state,action);
        case actionTypes.FETCH_USERS_START:return fetchUSersStart(state, action);
        case  actionTypes.FETCH_USERS_SUCESS: return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL: return fetcUsersFail(state, action);
        case actionTypes.UPDATE_USER_START: return updateUSerStart(state, action);
        case actionTypes.UPDATE_USER_SUCESS: return updateUserSucess(state, action);
        case actionTypes.UPDATE_USER_FAIL: return updateUSerFail(state,action);
        case actionTypes.DELETE_USER: return deleteUserSucess(state,action);
        case actionTypes.DELETE_START: return deleteStart(state, action);
        case actionTypes.GET_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.GET_USER_START: return fetchUserStart(state, action);
        default: return state;
     }
 }
 export default reducer;