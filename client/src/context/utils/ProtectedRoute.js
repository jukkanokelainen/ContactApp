import React, {useContext, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom';
import authContext from '../auth/authContext';
import ContactContext from '../contacts/contactContext';
import Login from '../../components/pages/Login';


const ProtectedRoute = ({ component: Component, ...rest}) => {
    const AuthContext = useContext(authContext);
    const {isAuthenticated, isLoading, loadUser} = AuthContext;
    const contactContext = useContext(ContactContext)
    const {loadContacts} = contactContext;

    //without this reloading home pageredirected to login because loaduser was run only
    //if user ended up in home
    useEffect(() => {
        loadUser();
    // eslint-disable-next-line
    }, [])
    
        return ( <Route {...rest} 
        render= {props => !isAuthenticated && !isLoading ? 
        (<Redirect to='/login' />) 
        : ( <Component {...props} />) } />
        )
    
}

export default ProtectedRoute
