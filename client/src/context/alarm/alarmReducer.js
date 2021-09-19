import { ADD_ALARM,
    CLEAR_ALARM } from '../types';

const alarmReducer = (state, action) => {
    switch(action.type) {
        case ADD_ALARM: 
            return  {
                ...state,
                items:[...state.items, action.payload]
            }
        case CLEAR_ALARM: 
            return {
                ...state,
                items: state.items.filter(item => item.id!==action.payload)
            }
                
        default:
            throw new Error();
    }
}

export default alarmReducer;