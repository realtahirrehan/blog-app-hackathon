import { useState , useContext  } from "react"
import { GlobalContext } from "../../context/Context.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.js"
import "./SubmitBox.css"

export default function SubmitBox() {

    let [title , setTitle ] = useState("");
    let [description , setDescription ] = useState("");
    let { state, dispatch } = useContext(GlobalContext);

    const submitHandler = async (e) =>{

        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, "user"), {
            title: title,
            UserId: state.user.uid,
            createdOn: new Date().getTime(),
            name:state.user.displayName,
            description: description
          });
          console.log("Document written with ID: ", docRef.id);

        }

        catch (e) {
          console.error("Error adding document: ", e);
        }


    } 

  return (

    <form id="submitbox" onSubmit={submitHandler}>

           <input 
            required
             placeholder="Enter Blog Title"
             type="text" 
             id="title"
             name="title"
             label="title"
             value={title}
             onChange={(e)=>setTitle(e.target.value)} />
           <textarea 
             required
             className="discription"
             placeholder="Enter Blog Description"
             name="discription"
             label="discription"
             rows={5}
             value={description}
             onChange={(e)=>setDescription(e.target.value)} />

        <div className="full">
        <button className="submitBtn" type="submit">Published Blog</button>
        </div>
    </form>
  )
}
