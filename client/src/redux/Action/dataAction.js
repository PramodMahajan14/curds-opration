import { ActioTypes } from '../contants/dataActiontype';


export const collectdata =(res)=>{
    return{
        type:ActioTypes.GET_ALLDATA,
    payload:{
     datainfo:res,
      
    },
  };
};

export const onedata =(res)=>{
  return{
    type:ActioTypes.GET_ONEDATA,
    payload:{
      oneinfo:res,
    }
  }
}