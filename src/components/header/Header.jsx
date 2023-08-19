import "./Header.css"
import { useState , useContext  } from "react"
import { GlobalContext } from "../../context/Context.js";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js"

export default function Header(props) {

  let { state, dispatch } = useContext(GlobalContext);

  const logout = ()=>{
    if (props.page === "logout") {

      signOut(auth).then(() => {
          
        dispatch({
          type: "USER_LOGOUT",
        });
            
     
       }).catch((error) => {
         console.log("fail to log out");
       });
     }
    else{
      return
    }

  }



  return (
    <div className="header">
      <div className="subHeader bold">Personal Blog App</div>
      <div className="subHeader"><Link to="/profile" className="light ">{props.userName}</Link> &nbsp;&nbsp; <Link onClick={logout} className="link" to={`/${props.page}`}>{props.page}</Link></div>
    </div>
  )
}
