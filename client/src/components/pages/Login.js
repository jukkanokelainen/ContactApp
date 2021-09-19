import React, {Fragment, useState, useContext, useEffect} from 'react'
import authContext from '../../context/auth/authContext';
import alarmContext from '../../context/alarm/alarmContext';


const Login = (props) => {
    const AuthContext = useContext(authContext);
    const {login, clearError, error, isAuthenticated} = AuthContext;
    const AlarmContext = useContext(alarmContext);
    const {addAlarm} = AlarmContext;

    useEffect(()=>{
        if(error){
            addAlarm({text:error, type:'danger'})
            clearError();
        }
        if(isAuthenticated){
            props.history.push('/');
        }
    // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value}
        )
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password ==='') {
            addAlarm({text:'Please fill all fields', type:'danger', duration:10000})
        }else {
            login(formData);
        }
    }
    return (
        <Fragment>
        <h2>Login <span className="text-primary">User</span></h2>
        <form className="form-container card bg-light" onSubmit={onSubmit}>
        <label htmlFor="email" className="form-group">Email</label>
        <input type="email" name="email" value= {email} onChange={onChange} required/>
        <label htmlFor="pasword" className="form-group">Password</label>
        <input type="password" name="password" value= {password} onChange={onChange} required minLength="6"/>
        <input type="submit" className="btn btn-primary btn-block" value="Login"/>
        </form>
        </Fragment>
    )
}

export default Login
