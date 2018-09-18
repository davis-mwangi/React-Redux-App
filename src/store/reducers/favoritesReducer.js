import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: [],
    loading: false
}

const fetchUsersStart = (state, action) =>{
    return {
        ...state,
        loading: true
        
    };
};

const fetchUsersSucess = (state, action) =>{
    return {
        ...state,
        loading: false,
        favorites: action.favorites
    };

};
const fetchUsersFail = (state, action) =>{
    return{
        ...state,
        loading:false
    };
};

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.FETCH_FAVORITES_START: return fetchUsersStart(state, action);
        case actionTypes.FETCH_FAVORITES_SUCCESS: return fetchUsersSucess(state,action);
        case actionTypes.FETCH_FAVORITES_FAIL: return fetchUsersFail(state, action);
        default: return state
    }
};

export default reducer;