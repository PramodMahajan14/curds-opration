import React ,{useState,useEffect}from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch,useSelector} from 'react-redux'
import {  onedata,collectdata} from './redux/Action/dataAction';
import axios from 'axios'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltSharpIcon from '@mui/icons-material/SystemUpdateAltSharp';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dataform from './adddataform';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const columns = [
    { field: "id", headerName: 'ID', width:200},
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone No', width: 200 },
    { field: 'hobbies', headerName: 'Hobbies', width: 200 },
    
  ];
  let mssg = "";
const Home =()=>{
    const [load ,setload]  = useState(true)
    const [rows,setdata] = useState([]);
    const mydatabase = useSelector((state)=> state.alldata.allinfo)
    const selectdata = useSelector((state)=> state.getonedata.oneinfo)
    const[deletedialog,setdeletedialog] = useState(false)
    const[Adddialog,setAdddialog] = useState(false)
    const[update1,setupdate1] = useState(false)
    const[update2,setupdate2] = useState(false)
    const[new_email ,setemail] = useState('');
    const[sucess,setsucess] = useState(false)
    const[err,seterr] = useState(false)
    const[send_mail,setsend_mail] = useState(false)
    const dispatch = useDispatch();
    const mydata = async()=>{
      try{
        const res = await axios.get('/api/get_data');
        setdata(res.data)
         const getdata = await res.data;
        console.log(getdata)
        dispatch(collectdata(getdata))
      }catch(err){
        if(err){
          console.log(err)
          }
      }
    }

    useEffect(()=>{
     if(load === true){
       mydata();
       setload(false)
    
     }
    })

    const handleClose = () => {
        setdeletedialog(false);
        setAdddialog(false)
        setupdate1(false)
        setupdate2(false)
        seterr(false)
        setsucess(false)
        setsend_mail(false)
    };
   

    const[updata,setupdata] = useState({
        name:'',email:'',phone:'',hobbies:''
        });
      let name,value;
      const updataInput =(e)=>{
          name = e.target.name;
          value = e.target.value;
          setupdata({...updata,[name]:value})
      }

      const findeEmail=(e,new_email)=>{
         
          if(new_email){ 
            const dataemail = rows.filter((em)=>em.email === new_email);
            
            dispatch(onedata(dataemail))
            
            if(dataemail.length === 0) return mssg="This Email address is Incorrect", seterr(true,),setupdate1(false)
             if(e === "update"){
               setupdate2(true)
             }else if(e === "Delete"){
               setdeletedialog(false)
               DeleteData(new_email);
             }else if(e === "sendmail"){
               SendData(new_email);
               setsend_mail(false);
             }
          }
        setupdate1(false)
    }

    const Updatedata =async()=>{
      try{
          const {name,phone,email,hobbies} = updata;
          if(!hobbies || !email || !phone || !name) return mssg="all fields are mandatory",seterr(true);
          const response = await fetch('/api/update_data',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,phone,email,hobbies,new_email
            })
          });
          console.log(response)
          setupdate2(false)
            if(response.status === 200){
                mssg = "Update Successfully !"
                setsucess(true)
                mydata()
            }
      }catch(err){
          mssg = await err;
          seterr(true)
      }
    }  

    const DeleteData =async(new_email)=>{
      try{
        const response = await fetch('/api/delete_data',{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              new_email
          })
        });
        if(response.status === 200){
          mssg = "Data is Deleted !"
                setsucess(true)
                mydata()    
        }
      }catch(err){
        mssg = await err;
        seterr(true)
      }
    }
    
    const SendData = async(new_email)=>{
      try{
        const response = await fetch('/api/send_mail',{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              new_email
          })
        });
        if(response.status === 200){
          mssg = "Mail Send Successfully !"
                setsucess(true) 
        }
      }catch(err){
        mssg = await err;
        seterr(true)
      }
    }

    return(<>
         <Box sx={{ flexGrow: 1 }}>
               <AppBar position="static">
                  <Toolbar>
                     <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                    >
                     <MenuIcon />
                     </IconButton>
                       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       Simple CRUDS operation performing 
                       </Typography>
                   </Toolbar>
                </AppBar>
          </Box>
{/* ==========================Table====================================== */}
           <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     pageSize={5}
                     rowsPerPageOptions={[5]}
                     checkboxSelection
                   />
           </div>
{/* ================================Send mail================================ */}
<Dialog open={send_mail} onClose={handleClose}>
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Pease enter those email address here. you
            will want send Details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={new_email}
            onChange={(e)=>setemail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>findeEmail("sendmail",new_email)}>Send</Button>
        </DialogActions>
      </Dialog>

{/* ===============================Dialog open for for Delete=========== */}

<Dialog open={deletedialog} onClose={handleClose}>
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Pease enter those email address here. you
            will want delete record.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={new_email}
            onChange={(e)=>setemail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>findeEmail("Delete",new_email)}>Delete</Button>
        </DialogActions>
      </Dialog>
{/* ===========================dialog for Add data ===================================*/}

<Dialog
        open={Adddialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add data"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
         <Dataform/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
{/* ====================================Dialog for update============================= */}
<Dialog open={update1} onClose={handleClose}>
        <DialogTitle>Update Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Pease enter those email address here. you
            will want to Update record.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            value={new_email}
            onChange={(e)=>setemail(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>findeEmail("update",new_email)}>Procede</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={update2}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Update data"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className='container'>
            <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                     <label for="name">Full Name *</label>
                     <input type="text" className="form-control" name="name" placeholder="" id="name"
                       Value={updata.name}  onChange={updataInput}
                     />
                   </div>
               </div>
   

                <div className="col-md-6">
                   <div className="form-group">
                     <label for="email">Email address *</label>
                     <input type="text" className="form-control" name="email" placeholder="" id="email"
                      Value={updata.email} onChange={updataInput}
                     />
                   </div>
               </div>
     
            </div>
            <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                     <label for="phone">Phone No *</label>
                     <input type="number" className="form-control" name="phone" placeholder="" id="phone"
                      Value={updata.phone} onChange={updataInput}
                     />
                   </div>
               </div>
   

                <div className="col-md-6">
                   <div className="form-group">
                     <label for="hobbies">Hobbies *</label>
                     <input type="text" className="form-control" name="hobbies" placeholder="" id="hobbies"
                     Value={updata.hobbies} onChange={updataInput}
                     />
                   </div>
               </div>
            </div>
            <Stack spacing={2} direction="row">
             <Button variant="contained" color="success" onClick={Updatedata}>Submite</Button>
            </Stack>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
{/* ---------------------Menu-------------------------------------------- */}
          <Box >
             <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
               >
                  <SpeedDialAction 
                    key={"Add data"}
                    icon={<NoteAddIcon/>}
                    tooltipTitle={"Add data"}
                    onClick={()=>setAdddialog(true)}
                   />
                  <SpeedDialAction
                     key={"delete"}
                     icon={<DeleteIcon/>}
                     tooltipTitle={"Delete Data"}
                     onClick={()=>setdeletedialog(true)}
                  />
                  <SpeedDialAction
                     key={"Update"}
                     icon={<SystemUpdateAltSharpIcon/>}
                     tooltipTitle={"Update Data"}
                     onClick={()=>setupdate1(true)}
                  />
                  
                   <SpeedDialAction
                     key={"Share"}
                     icon={<ForwardToInboxTwoToneIcon/>}
                     tooltipTitle={"Shara Email"}
                     onClick={()=>setsend_mail(true)}
                  />
              </SpeedDial>
           </Box>


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
export default Home;