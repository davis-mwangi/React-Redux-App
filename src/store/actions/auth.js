import axios from 'axios';

import * as actionTypes  from './actionTypes';

export const login_start = () =>{
    return{
        type:actionTypes.LOGIN_START
    };
};

export const login_sucess = (token, status) =>{
    return{
        type: actionTypes.LOGIN_SUCCESS,
        idToken: token,
        statusCode: status
    };
};

export const login_fail= (error)=>{
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () =>{
    localStorage.removeItem('token');
    return {
        type: actionTypes.INITIATE_LOGOUT
    };
};

export const auth = (email, password,isSignup)=>{
    return dispatch =>{
        dispatch(login_start());
        const  userData = {
            email: email,
            password: password
        };

        let url = 'https://reqres.in/api/register';
        if(!isSignup){
            
         url = 'https://reqres.in/api/login';
        }
        axios.post(url,userData)          
            .then(response =>{
                console.log(response.status);
                //store the token in local storage so a s to avoid 
                //loosing the state once the page is reloaded
                localStorage.setItem('token',response.data.token);
                dispatch(login_sucess(response.data.token, response.status));

            })
            .catch(err=>{
                console.log(err.response.data.error);
                dispatch(login_fail(err.response.data.error));
            });
    };

};

export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const authCheckState = () =>{
    return dispatch =>{
        const token =  localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            dispatch(login_sucess(token));
        }
    };
};