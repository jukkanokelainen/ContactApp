import React, { useReducer} from 'react'
import axios from 'axios';
import contactContext from './contactContext'
import contactReducer from './contactReducer';
import { ADD_CONTACT,
DELETE_CONTACT,
SELECT_CONTACT,
CLEAR_CURRENT,
UPDATE_CONTACT, 
FILTER_CONTACTS,
CLEAR_FILTERS,
SET_LOADING,
CONTACTS_LOADED,
CONTACT_ERROR,
CLEAR_CONTACTS,
CLEAR_ERROR} from '../types';

const ContactProvider = props => {

    const initialState= {
        contacts : [],
        currentContact:null,
        filteredContacts: null,
        error:null,
        loading:false
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Load Contacts
    const loadContacts = async () => {
        const config = {headers: {
            'Content-Type': 'application/json'
            }
        }
        dispatch({type:SET_LOADING});
        try {
            const res = await axios.get('api/contacts');
            dispatch({type: CONTACTS_LOADED, payload:res.data, config});
        } catch (err) {
            if(err.response && err.response.data && err.response.data.msg){
                dispatch({type: CONTACT_ERROR, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: CONTACT_ERROR, payload:err.response.statusText});
            }
            else{
                dispatch({type: CONTACT_ERROR, payload:'Error'});
            }
    }
}

    //Add Contact
    const addContact = async (contact) => {
        const config = {headers: {
            'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/contacts', contact);
            dispatch({type:ADD_CONTACT, payload:res.data});
        } catch (err) {
            if(err.response && err.response.data && err.response.data.msg){
                dispatch({type: CONTACT_ERROR, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: CONTACT_ERROR, payload:err.response.statusText});
            }
            else{
                dispatch({type: CONTACT_ERROR, payload:'Error'});
            }
    }
}

    //Remove Contact
    const deleteContact = async (contactId) => {
        try {
            const res = await axios.delete('api/contacts/'+contactId);
            dispatch({type:DELETE_CONTACT, payload:contactId});
        } catch (err) {
            if(err.response && err.response.data && err.response.data.msg){
                dispatch({type: CONTACT_ERROR, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: CONTACT_ERROR, payload:err.response.statusText});
            }
            else{
                dispatch({type: CONTACT_ERROR, payload:'Error'});
            }
    }
    }
    //Select Contact
    const selectContact = (contact) => {
        dispatch({type:SELECT_CONTACT, payload:contact});
    }
    //clear current Contact
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
        dispatch({type:CLEAR_FILTERS});
    }
    //Update Contact
    const updateContact = async (contact) => {
        try {
            const res = await axios.put('api/contacts/'+contact._id, contact);
            dispatch({type:UPDATE_CONTACT, payload:res.data});
        } catch (err) {
            if(err.response && err.response.data && err.response.data.msg){
                dispatch({type: CONTACT_ERROR, payload:err.response.data.msg});//backendissä lähetetään json, jossa msg-key
            }else if (err.response.statusText){
                dispatch({type: CONTACT_ERROR, payload:err.response.statusText});
            }
            else{
                dispatch({type: CONTACT_ERROR, payload:'Error'});
            }
        };
    }
    //Filter Contacts
    const filterContacts = (filter) => {
        dispatch({type:FILTER_CONTACTS, payload:filter});
    }
    //Clear Filters
    const clearFilters = () => {
        dispatch({type:CLEAR_FILTERS});
    }
    //Clear Contacts
    //this is done while logout to ensure that the next user does not see contacts even for a moment
    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACTS});
    }
    //Clear Errors
    const clearError = () => {
        dispatch({type:CLEAR_ERROR})
    }

    return (
        <contactContext.Provider 
        value={{
            contacts: state.contacts,
            currentContact: state.currentContact,
            filteredContacts: state.filteredContacts,
            error: state.error,
            loading: state.loading,
            loadContacts,
            addContact,
            deleteContact,
            selectContact,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilters,
            clearContacts,
            clearError
        }
        }>
            {props.children}
        </contactContext.Provider>
    );
}

export default ContactProvider
