import { useState , useContext , useEffect  } from "react"
import { GlobalContext } from "../../context/Context.js";
import Header from "../../components/header/Header.jsx"
import PageTitle from "../../components/PageTitle/PageTitle.jsx"
import {signInWithEmailAndPassword ,onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js"

import "./Login.css"

export default function Login() {

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

  const login = async ( e )=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user login successfully",user);
        dispatch({
          type: "USER_LOGIN",
          payload:user,
        });

      })
      .catch((error) => {
        console.log(error);
      });


  }


  return (
    <div className="login">
      <Header page={"Signup"}/>
      <PageTitle title={"Login"}/>

      <div className="formDiv">
          
      <form  id="form1" onSubmit={login}>
           
           <input 
             required
             autoComplete="on"
             placeholder="Enter Email"
             type="email" 
             id="email"
             name="email"
             label="Email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)} />

           <input 
             required
             autoComplete="on"
             placeholder="Enter Password"
             type="password"
             id="password"
             name="password"
             label="Password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}  />

           <button className="loginBtn" type="submit">Sign In</button>

         </form>

      </div>

    </div>
  )
}
