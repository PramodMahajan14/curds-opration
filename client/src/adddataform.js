import React,{useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var mssg ='';
const Dataform = ()=>{
  const[sucess,setsucess] = useState(false)
  const[err,seterr] = useState(false)

  const handleClose = () => {
    seterr(false)
    setsucess(false)
  };
    const[data,setdata] = useState({
        name:'',email:'',phone:'',hobbies:''
        });
      let name,value;
      const dataInput =(e)=>{
          name = e.target.name;
          value = e.target.value;
          setdata({...data,[name]:value})
      }
      const AddData=async()=>{
        try{
          const {name,phone,email,hobbies} = data;
          if(!hobbies || !email || !phone || !name) return mssg="all fields are mandatory",seterr(true);
          const response = await fetch('/api/post_data',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,phone,email,hobbies
            })
          });
          
            if(response.status === 200){
                mssg = "Data Added Successfully !"
                setsucess(true)
            }
            window.location.reload()
        }catch(err){

        }
      }
    return(<><div className='container'>
            <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                     <label for="name">Full Name *</label>
                     <input type="text" className="form-control" name="name" placeholder="" id="name"
                       value={data.name}  onChange={dataInput}
                     />
                   </div>
               </div>
   

                <div className="col-md-6">
                   <div className="form-group">
                     <label for="email">Email address *</label>
                     <input type="text" className="form-control" name="email" placeholder="" id="email"
                       value={data.email} onChange={dataInput}
                     />
                   </div>
               </div>
     
            </div>
            <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                     <label for="phone">Phone No *</label>
                     <input type="number" className="form-control" name="phone" placeholder="" id="phone"
                       value={data.phone}  onChange={dataInput}
                     />
                   </div>
               </div>
   

                <div className="col-md-6">
                   <div className="form-group">
                     <label for="hobbies">Hobbies *</label>
                     <input type="text" className="form-control" name="hobbies" placeholder="" id="hobbies"
                       value={data.hobbies} onChange={dataInput}
                     />
                   </div>
               </div>
            </div>
            <Stack spacing={2} direction="row">
             <Button variant="contained" color="success" onClick={AddData}>Submite</Button>
            </Stack>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={sucess} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {mssg}
      </Alert>
     </Snackbar>

     <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {mssg}
      </Alert>
     </Snackbar>
     </Stack>
    </>)
}
export default Dataform;