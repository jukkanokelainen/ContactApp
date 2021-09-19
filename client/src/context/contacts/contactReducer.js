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
CLEAR_ERROR } from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
          return {
              ...state,//palautetaan koko muu state
                contacts: [action.payload, ...state.contacts]//...lisäksi concatseissa arrayssa koko olemassa oleva state ja lisäksi payload
            };
        case DELETE_CONTACT:
          return {
              ...state,//palautetaan koko muu state
                contacts: state.contacts.filter((contact) => contact._id !== action.payload)//https://www.robinwieruch.de/react-remove-item-from-list
            };
        case SELECT_CONTACT:
          return {
                ...state,
                currentContact: action.payload
            };
        case CLEAR_CURRENT:
                return {
                    ...state,
                    currentContact: null
                };
        case UPDATE_CONTACT:
            return {
                ...state,//palautetaan koko muu state
                    contacts: state.contacts.map((item) => (
                       item=(item._id === action.payload._id ? action.payload : item) 
                    ))
                };
        case FILTER_CONTACTS:
            return {
                ...state,
                filteredContacts: state.contacts.filter(
                    (contact) => {
                    const regex = new RegExp(`${action.payload}`,'gi');//ei väliä capital/ei capital
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex)
                    })
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filteredContacts: null
            };
        case CONTACTS_LOADED:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filteredContacts: null,
                currentContact: null
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
          throw new Error();
      }
}

export default contactReducer
