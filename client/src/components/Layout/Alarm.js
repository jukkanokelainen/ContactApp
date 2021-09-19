import React, {useContext, Fragment} from 'react'
import alarmContext from '../../context/alarm/alarmContext'

const Alarm = () => {
    const AlarmContext = useContext(alarmContext);
    const {alarms} = AlarmContext;
    return (
        <Fragment>
        {alarms && (
        alarms.map((item) =>
         <div key={item.id} className={`alert alert-${item.type}`}>{item.text}</div>))}
        </Fragment>
    )
}

export default Alarm
