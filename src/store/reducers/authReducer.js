import * as actionTypes  from '../actions/actionTypes';

const initialState = {
    token: null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const loginStart = (state,action)=>{
    return{
           ...state,
           ...{error:null, loading:true}
        };
};

const loginSuccess = (state,action)=>{
    return {
        ...state,
        ...{token:action.idToken,
           error:null,
           loading:false,
           statusCode: action.statusCode}
    };
};

const loginFail = (state, action)=>{
    return{
        ...state,
        ...{error:action.error,
           loading:false}
    };
};

const logoutUser = (state,action) =>{
    return {
        ...state,
        ...{token:null,
           userId:null}
    };
};

const setAuthRedirectPath = (state,action) => {
    return {
        ...state,
        ...{authRedirectPath: action.path}
    };
};

const reducer = (state = initialState, action) => {
  switch(action.type){
      case actionTypes.LOGIN_START: return loginStart(state,action);
      case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);
      case actionTypes.LOGIN_FAIL: return loginFail(state,action);
      case actionTypes.INITIATE_LOGOUT: return logoutUser(state,action);
      case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
      default:
          return state;

  }
};

export default reducer;