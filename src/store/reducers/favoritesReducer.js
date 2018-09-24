import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: [],
    loading: false
}

const fetchFavoritesStart = (state, action) =>{
    return {
        ...state,
        loading: true
        
    };
};

const fetchFavoritesSucess = (state, action) =>{
    return {
        ...state,
        loading: false,
        favorites: action.favorites
    };

};
const fetchFavoritesFail = (state, action) =>{
    return{
        ...state,
        loading:false
    };
};

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.FETCH_FAVORITES_START: return fetchFavoritesStart(state, action);
        case actionTypes.FETCH_FAVORITES_SUCCESS: return fetchFavoritesSucess(state,action);
        case actionTypes.FETCH_FAVORITES_FAIL: return fetchFavoritesFail(state, action);
        default: return state
    }
};

export default reducer;