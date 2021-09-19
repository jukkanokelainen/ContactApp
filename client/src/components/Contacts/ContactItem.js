import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contacts/contactContext';

const ContactItem = (props) => {
    const contactContext = useContext(ContactContext);
    const {selectContact, deleteContact, clearCurrent} = contactContext;
    const {_id, name, email, phone, type} = props.contact;

    const handleDeleteClick= e => {
        deleteContact(_id);
        clearCurrent();
    }
    const handleEditClick= e => {
        selectContact(props.contact);
    }
    return (
        <div className= "card bg-light">
            <strong>{name}</strong>
            <span style= {{float:'right', width:"120px"}} 
            className= {'badge ' + (type==='professional' ? "badge-success" : "badge-primary")}>
            {type.charAt(0).toUpperCase() + type.slice(1)+' '}
            {type==='professional' ? <i className="fas fa-user-tie"/> : <i className="far fa-laugh-wink"/>}
            </span>
            {phone &&
            <p>
                <i className="fas fa-phone-alt"></i>{' '}
                <strong>Phone: </strong>
                {phone}
            </p>}
            {email &&
            <p>
                <i className="far fa-envelope"></i>{' '}
                <strong>Email: </strong>
                {email}
            </p>}
            <button className='btn btn-dark btn-sm'
            onClick={handleEditClick}>Edit</button>
            <button className='btn btn-danger btn-sm'
            onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}
    ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
