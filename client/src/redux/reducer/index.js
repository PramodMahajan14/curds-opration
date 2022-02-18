import { combineReducers } from 'redux';
import { collectalldata ,Onedata} from './datareducer';

const reducers = combineReducers({
    alldata : collectalldata,
    getonedata : Onedata
 });
 
 export default reducers;