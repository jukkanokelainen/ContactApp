import React, {Fragment, useState, useContext, useEffect} from 'react'
import authContext from '../../context/auth/authContext';
import alarmContext from '../../context/alarm/alarmContext';


const Register = (props) => {
    const AuthContext = useContext(authContext);
    const {registerUser, clearError, error, isAuthenticated} = AuthContext;

    const AlarmContext = useContext(alarmContext);
    const {addAlarm} = AlarmContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error){
            addAlarm({text:error, type:'danger'})
            clearError();
        }
    // eslint-disable-next-line
    }, [error, isAuthenticated])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value}
        )
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== password2) {
            addAlarm({text:'passwords does not match', type:'danger', duration:10000})
        }
        else {
            registerUser({
                name,
                email,
                password
            });
        }
    }
    return (
        <Fragment>
        <h2>Register <span className="text-primary">User</span></h2>
        <form className="form-container card bg-light" onSubmit={onSubmit}>
        <label htmlFor="name" className="form-group">Name</label>
        <input type="text" name="name" value= {name} onChange={onChange} required/>
        <label htmlFor="email" className="form-group">Email</label>
        <input type="email" name="email" value= {email} onChange={onChange} required/>
        <label htmlFor="pasword" className="form-group">Password</label>
        <input type="password" name="password" value= {password} onChange={onChange} required minLength="6"/>
        <label htmlFor="pasword" className="form-group">Confirm Password</label>
        <input type="password" name="password2" value= {password2} onChange={onChange} required minLength="6"/>
        <input type="submit" className="btn btn-primary btn-block" value="Register"/>
        </form>
        </Fragment>
    )
}

export default Register
