import React, {useContext, Fragment, useEffect} from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group'; //animations
import ContactItem from './ContactItem';
import ContactContext from '../../context/contacts/contactContext';
import AuthContext from '../../context/auth/authContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const {contacts, filteredContacts, loadContacts, loading} = contactContext;
    const authContext = useContext(AuthContext)
    const {isAuthenticated} = authContext;

    useEffect(() => {
        if (isAuthenticated){
            loadContacts();
        }
    // eslint-disable-next-line
    }, [])

    //const nodeRef = React.useRef(null);//hack to make the transitiongroup work without warnings: https://github.com/reactjs/react-transition-group/issues/668
    //const nodeRef2 = React.useRef(null);//with these hacks transitions cause no warning but those does not work in all cases

    if((!contacts || contacts.length === 0) && !loading) {
        return <h4>Please add contacts...</h4>
    } else if (loading){
        return <h4>Loading...</h4>
    }


    //conditional formatting depengind if all or filtered contacts are shown. This could be done cleaner
    //but made it like this while debugging transitiongroup issues.
    if (filteredContacts !== null){
        return (
        <Fragment>
        <TransitionGroup>
                {filteredContacts.map((contact) =>
                <CSSTransition
                timeout={500}
                //nodeRef={nodeRef}//hack to make it work without warnings
                key={contact._id}
                classNames="item">
                <div key={contact._id}>
                    <ContactItem contact= {contact} /> 
                </div>
                </CSSTransition>)}
        </TransitionGroup>
        </Fragment>)
    } else {
        return (
            <Fragment>
            <TransitionGroup>
            {contacts.map((contact) =>
            <CSSTransition
                timeout={500}
                //nodeRef={nodeRef2}//hack to make it work without warnings
                key={contact._id}
                classNames="item">
                <div key={contact._id}>
                    <ContactItem contact= {contact} /> 
                </div>
            </CSSTransition>)}
            </TransitionGroup>
            </Fragment>)
    }
}

export default Contacts
