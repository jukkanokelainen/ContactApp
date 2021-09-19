import React, {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import alarmContext from './alarmContext';
import alarmReducer from './alarmReducer';
import { ADD_ALARM,
CLEAR_ALARM } from '../types';

const AlarmProvider = props => {
    const initialState = {
        items:[]
    }

    const [state, dispatch] = useReducer(alarmReducer, initialState);

    //Add Alarm
    const addAlarm = ({text, type, duration=5000}) => {
        const id = uuidv4();
        dispatch({type: ADD_ALARM, payload: {text:text, type:type, id:id}})
        
        setTimeout(() => {
            dispatch({type:CLEAR_ALARM, payload:id})
        },duration)
    }

    return (
        <alarmContext.Provider value={{
            alarms: state.items,
            addAlarm
        }}>
            {props.children}
        </alarmContext.Provider>
    )
}

export default AlarmProvider