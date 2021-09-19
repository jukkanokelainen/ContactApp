import React, {useContext, useEffect, useState} from 'react'
import ContactContext from '../../context/contacts/contactContext';

const Filter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts, clearFilters, filteredContacts} = contactContext;
    const [filterText, setFilterText] = useState('');

    useEffect(()=>{
        if (filteredContacts === null){
            setFilterText('');
        }
    }, [contactContext, filteredContacts])

    const onChange = (e) => {
        setFilterText(e.target.value);
        if(e.target.value !== '') {
            filterContacts(e.target.value);
        }else{
            clearFilters();
        }
    }

    return (
        <form>
            <input type="text" 
            value={filterText} 
            placeholder= 'Filter contacts...'
            onChange={onChange}/>
        </form>
    )
}

export default Filter
