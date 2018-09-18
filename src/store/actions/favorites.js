import axios from 'axios';

import * as actionTypes  from './actionTypes';

export const fetchfavoritesStart = ()=>{
    return {
        type: actionTypes.FETCH_FAVORITES_START
    };
};

export const fetchFavoriteFail = (error) =>{
    return{
        type: actionTypes.FETCH_FAVORITES_FAIL,
        error: error
    };
};

export const fetchFavoritesSuccess = (favorites) =>{
    return{
        type: actionTypes.FETCH_FAVORITES_SUCCESS,
        favorites: favorites
    };
};

export const fetchfavorites = () =>{
    return dispatch =>{
        dispatch(fetchfavoritesStart());
        axios.get('https://reqres.in/api/unknown')
          .then(response =>{
              console.log(response);
              dispatch(fetchFavoritesSuccess(response.data.data));
          })
          .catch(error =>{
              dispatch(fetchFavoriteFail(error))
          })
    }
}