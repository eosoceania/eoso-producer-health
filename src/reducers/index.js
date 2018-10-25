import {combineReducers} from 'redux';
import producers from './reducer_producers';
import producersDetails from './reducer_producers_details'


const rootReducer = combineReducers({
    producers: producers,
    producersDetails: producersDetails,
    //producersDetails: producersDetails
});

export default rootReducer;
