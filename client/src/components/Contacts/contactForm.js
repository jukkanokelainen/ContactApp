import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contacts/contactContext';
import alarmContext from '../../context/alarm/alarmContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {currentContact, addContact, clearCurrent, updateContact, error, clearError} = contactContext;
    const AlarmContext = useContext(alarmContext);
    const {addAlarm} = AlarmContext;
    
    useEffect(() =>{
        if(currentContact){
            setContact(currentContact)
        }
        else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type: 'professional'
            })
        }
    },[contactContext, currentContact]);//effect callback suoritetaan vain jos nuo muuttuvat

    useEffect(()=>{
        if(error){
            addAlarm({text:error, type:'danger'})
            clearError();
        }
    // eslint-disable-next-line
    }, [error])

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type: 'professional'
    })

    const {name, email, phone, type} = contact;

    function onChange(e){
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    }
    function onSubmit(e){
        e.preventDefault();
        if(currentContact){
            updateContact(contact);
            clearCurrent();
        }else{
            addContact(contact);
            setContact({
                name: '',
                email:'',
                phone:'',
                type: 'personal'
            })
        }
    }

    const clearAll = () =>{
        clearCurrent(); 
    } 

    return (
        <form onSubmit={onSubmit} >
        <h2>{!currentContact ? 'Add Contact' : 'Update Contact'}</h2>
        <input type='text' placeholder='name' name='name' value = {name} onChange= {onChange}></input>
        <input type='text' placeholder='email' name='email' value = {email} onChange= {onChange}></input>
        <input type='text' placeholder='phone' name='phone' value = {phone} onChange= {onChange}></input>
        <h5>Contact Type:</h5>
        <input type='radio' 
            placeholder='type' 
            name='type' 
            value='personal'
            checked={type ==='personal'} 
            onChange= {onChange}/>Personal{'  '}
        <input type='radio' 
            placeholder='type' 
            name='type' 
            value='professional'
            checked={type ==='professional'} 
            onChange= {onChange} />Professional
        <div>
        <input type="submit" 
        value= {!currentContact ? 'Add Contact' : 'Update Contact'}
        className= 'btn btn-primary btn-block' />
        </div>
        {currentContact &&
        <div>
            <button className="btn btn-light btn-block"
            onClick={clearAll}>Clear</button>
        </div>}
        </form>
    )
}

export default ContactForm
