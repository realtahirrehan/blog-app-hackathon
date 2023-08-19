import { useState , useContext , useEffect  } from "react"
import { GlobalContext } from "../../context/Context.js";
import Header from "../../components/header/Header.jsx"
import PageTitle from "../../components/PageTitle/PageTitle.jsx"
import { createUserWithEmailAndPassword ,updateProfile ,onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase.js"
import "./Signup.css"

export default function Signup() {

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email  , setEmail ] = useState("");
  let [password  , setPassword ] = useState("");
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(()=>{
  
    // firebase login check

    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "USER_LOGIN",
          payload:user,
        });
      } else {
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    });

    return ()=>{
      unSubscribe()
    }
},[dispatch])

  const signup = ( e )=>{

    e.preventDefault();
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 

      updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName,
      }).then(() => {
      }).catch((error) => {
      });

    })
    .catch((error) => {
      console.log("error in updateProfile");
    });

  }


  return (
    <div className="login">
      <Header page={"Login"}/>
      <PageTitle title={"Signup"}/>

      <div className="formDiv">
          
      <form  id="form2" onSubmit={signup}>
           
           <input 
             required
             autoComplete="on"
             placeholder="Enter Fisrt Name"
             type="text" 
             id="firstName"
             name="firstName"
             label="firstName"
             value={firstName}
             onChange={(e)=>setFirstName(e.target.value)} />
           <input 
             req
             autoComplete="on"
             placeholder="Enter Last Name"
             type="text" 
             id="lastName"
             pattern="[A-Za-z]{3}" title="last name must be atleast 3 words long"
             name="lastName"
             label="lastName"
             value={lastName}
             onChange={(e)=>setLastName(e.target.value)} />


           <input 
             req
             autoComplete="on"
             placeholder="Enter Email"
             type="email" 
             id="email"
             name="email"
             pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
             label="Email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)} />

           <input 
             req
             autoComplete="on"
             placeholder="Enter Password"
             pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
             title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
             id="password"
             type="password"
             name="password"
             label="Password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}  />

           <button className="loginBtn" type="submit">Sign-Up</button>

         </form>

      </div>

    </div>
  )
}
