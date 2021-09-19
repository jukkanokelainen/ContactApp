import React, {useReducer, useContext} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR,
    USER_LOADED,
    AUTH_FAILED,
    LOGOUT,
    LOGIN_SUCCESS,
    SET_LOADING
} from '../types';
import axios from 'axios';

const AuthProvider = props => {
    const initialState = {
        loading: true,
        isAuthenticated: false,
        token: localStorage.getItem('token'),
        user: null,
        error: null
    }

    const [state, dispatch] =useReducer(authReducer, initialState);

    //Register user
    const registerUser = async (formData) => {
        const config = {headers: {
            'Content-Type': 'application/json'
            }
        }
        dispatch({type:SET_LOADING});

        try {
            const res = await axios.post('api/users', formData, config);
            dispatch({type: REGISTER_SUCCESS, payload:res.data.token});
            loadUser();
        } catch (err) {
            if(err.response.data.msg){
                dispatch({type: REGISTER_FAIL, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: REGISTER_FAIL, payload:err.response.statusText});
            }
            else{
                dispatch({type: REGISTER_FAIL, payload:'Error'});
            }
        }
    }
    //Load User
    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        dispatch({type:SET_LOADING});
        try {
            const res = await axios.get('api/auth');
            dispatch({type: USER_LOADED, payload:res.data});
        } catch (err) {
            if(err.response.data.msg){
                dispatch({type: AUTH_FAILED, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: AUTH_FAILED, payload:err.response.statusText});
            }
            else{
                dispatch({type: AUTH_FAILED, payload:'Error'});
            }
        }
    }
    //Login
    const login = async (formData) => {
        try {

        const config = {headers: {
            'Content-Type': 'application/json'
            }
        }
        dispatch({type:SET_LOADING});

        const res = await axios.post('api/auth', formData, config);
    
        dispatch({type:LOGIN_SUCCESS, payload:res.data.token});

        //now token has been received and stored -> load user and set isAuthenticated.
        loadUser();

        } catch (err) {
            if(err.response.data.msg){
                dispatch({type: AUTH_FAILED, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: AUTH_FAILED, payload:err.response.statusText});
            }
            else{
                dispatch({type: AUTH_FAILED, payload:'Error'});
            }
        }
    }

    //Logout
    const logout = () => {
        dispatch({type: LOGOUT});
    }

    //Clear Errors
    const clearError = () => {
        dispatch({type:CLEAR_ERROR})
    }

    return (
        <authContext.Provider value={{
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            token: state.token,
            user: state.user,
            error: state.error,
            registerUser,
            loadUser,
            login,
            logout,
            clearError
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthProvider