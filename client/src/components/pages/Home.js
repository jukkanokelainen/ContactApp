import React,{useContext} from 'react'
import Contacts from '../Contacts/Contacts'
import ContactForm from '../Contacts/contactForm';
import Filter from '../Contacts/Filter';

const Home = () => {

    return (
        <div className= " grid-2">
        {/* {// Left pane} */}
        <div className = 'card bg-light'>
            <ContactForm/>
        </div>
        {/* // Right pane} */}
        <div>
            <Filter />
            <Contacts />
        </div>
        </div>
    )
}

export default Home
