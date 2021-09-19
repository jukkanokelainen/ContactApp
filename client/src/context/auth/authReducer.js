import { REGISTER_USER,
REGISTER_SUCCESS,
REGISTER_FAIL,
CLEAR_ERROR,
USER_LOADED,
AUTH_FAILED,
LOGOUT,
LOGIN_SUCCESS,
SET_LOADING } from '../types';
import setAuthToken from '../utils/setAuthToken';

const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS: 
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload);

            return {
                ...state,
                token:action.payload,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_FAILED: 
        case LOGOUT:
            localStorage.removeItem('token');
            setAuthToken();
            return {
                ...state,
                token:null,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case SET_LOADING:
                return {
                    ...state,
                    loading:true
                }
        default:
            throw new Error();
    }
}

export default authReducer;