import React, {useContext, Fragment} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import contactContext from '../../context/contacts/contactContext';

const Navbar = ({title, icon}) => {
    const AuthContext = useContext(authContext);
    const {isAuthenticated, logout} = AuthContext;

    const ContactContext = useContext(contactContext);
    const {clearContacts} = ContactContext;

    const AuthSelections = 
        <Fragment>
            <ul>
                <li>
                    <Link to='/'>Contacts</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <a href='#' 
                    onClick={() => {
                    clearContacts(); 
                    logout()}}>
                    <i class="fas fa-sign-out-alt" /> Logout </a>
                </li>
            </ul>
        </Fragment>
    
    const nonAuthSelections = 
        <Fragment>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </Fragment>

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className ={icon}/> {title}
            </h1>
            {isAuthenticated ? AuthSelections : nonAuthSelections}
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;