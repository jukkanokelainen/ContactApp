import React,{useContext, useEffect} from 'react'
import authContext from '../../context/auth/authContext';

const About = () => {
    const AuthContext = useContext(authContext);
    const {loadUser, clearError, error} = AuthContext;
    
    //kun ladataan homepage, ladataan user, jotta ollaan edelleen isAuthenticated
    useEffect(() => {
        loadUser();
    //eslint-disable-next-line
    },[]);

    useEffect(() => {
        clearError();
    //eslint-disable-next-line
    },[error]);

    return (
        <div>
        <h1>About this app</h1>
        <p className='my-1'>
            This is a full stack React app for keeping contacts
        </p>
        <p className = "bg-dark p">
            <strong>Version:</strong> 1.0.0
        </p>
            
        </div>
    )
}

export default About
