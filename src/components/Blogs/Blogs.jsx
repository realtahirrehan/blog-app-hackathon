import "./Blogs.css";
import * as React from 'react';
import { useState , useContext , useEffect } from "react"
import { GlobalContext } from "../../context/Context.js";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {  collection, updateDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.js"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  
export default function Blogs() {


let { state, dispatch } = useContext(GlobalContext);
const [open, setOpen] = React.useState(false);
let [posts , setPosts] = useState([]);

const handleOpen = (id , title , description) => {

  setOpen(true)

  setEditing({
    ...editing,
    editingId: id,
    editingTitle: title,
    editingDescription: description,
  })

};

const handleClose = () => setOpen(false);


let unsubscribe;

  // useEffect

  useEffect(() => {

    // getting real time data from firebase
    let unsubscribe = null;
    const getRealtimeData = async () => {

      const q = query(collection(db, "user"), orderBy("createdOn"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });

        });

        setPosts(posts);
      });

    }
    getRealtimeData();

    return () => {
      console.log("Cleanup function");
      unsubscribe();
    }

  }, [state.user.uid])


    let [editing, setEditing] = useState({
      editingId: null,
      editingTitle: "",
      editingDescription: ""
    })

    const deletePost = async (id)=>{

      await deleteDoc(doc(db, "user", id));

    }

    const updateData = async (e) => {

      e.preventDefault();
      const update = doc(db, "user", editing.editingId);
      await updateDoc(update, {
        title: editing.editingTitle,
        description: editing.editingDescription,
        createdOn: new Date().getTime()
      });
  
      setEditing({
        editingId: null,
        editingTitle: "",
        editingDescription: "",
      })
  
    }
  

 
  return (

    <>
 {   posts.map((elem , i)=>(
        
           <Card key={i} style={{width:"70%" , boxShadow:"0px 0px 5px 0px grey", marginTop:"20px"}}>
           <CardHeader
             avatar={
               <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                 R
               </Avatar>
             }
             title="elem.displayName"
             subheader="elem.createdOn"
                 />
           <CardContent>
     
             <Typography gutterBottom variant="h5" component="div">
               {"elem.title"}
             </Typography>
     
             <Typography variant="body2" color="text.secondary">
              {"elem.description"}
             </Typography>

           </CardContent>
      
{   
   (state.isLogin === false || null )? <p> </p> :

            <CardActions>
            <Button size="small" color="primary" onClick={()=>{handleOpen(elem.id , elem.title , elem.description)}}>
                Edit
            </Button>
             <Button size="small" color="error" onClick={()=>{deletePost(elem.id)}}>
                delete
            </Button>
          </CardActions> }

         </Card>
    ))}


<div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
              <form id="submitbox2" onSubmit={updateData}>

           <input 
             placeholder="Enter Blog Title"
             type="text" 
             id="title"
             name="title"
             label="title"
             value={editing.editingTitle}
             onChange={(e)=>setEditing(e.target.value)} />
           <textarea 
             className="discription"
             placeholder="Enter Blog Description"
             name="discription"
             label="discription"
             rows={5}
             value={editing.editingDescription}
             onChange={(e)=>editing.editingDescription(e.target.value)} />

        <div className="full">
        <button className="submitBtn" type="submit">Edit Blog</button>
        </div>
    </form>

        </Box>
      </Modal>
 </div>

 </>
 
  );
}