import { ActioTypes} from "../contants/dataActiontype";


const initializedata = {
    allinfo:[],

}

export const collectalldata = (state=initializedata,action)=>{
    switch(action.type){
        case ActioTypes.GET_ALLDATA:
            return{
                ...state,allinfo:action.payload
            }
        
        default:
            return state; 
    }
}
const initialize= {
   
    onedata:{}
}
export const Onedata = (state=initialize,action)=>{
    switch(action.type){
        case ActioTypes.GET_ALLDATA:
            return{
                ...state,onedata:action.payload
            }
        
        default:
            return state; 
    }
}