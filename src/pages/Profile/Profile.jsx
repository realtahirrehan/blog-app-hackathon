import {useState} from "react"
import dp from "./dp.jpg"
import Header from "../../components/header/Header.jsx"
import PageTitle from "../../components/PageTitle/PageTitle.jsx"
import "./Profile.css"

export default function Profile() {

  let [old , setOld] = useState("")
  let [newPass , setNewPass] = useState("")
  let [confirmPass , setConfirmPass] = useState("")

  const changePass = ()=>{

  }

  return (
    <div className="profile">
      <Header page={"logout"} userName={"zayan"}/>
      <PageTitle title={"Profile"}/>
      <div className="main">


      <form  id="form3" onSubmit={changePass}>
           <div className="full">
        <img src={dp} className="dp" alt="" />
        </div>
           <input 
             autoComplete="on"
             placeholder="Enter old password"
             type="password" 
             id="oldpass"
             name="oldpass"
             label="oldpass"
             value={old}
             onChange={(e)=>setOld(e.target.value)} />
        
           <input 
             autoComplete="on"
             placeholder="Enter new password"
             type="password" 
             id="newPassword"
             name="newPassword"
             label="newPassword"
             value={newPass}
             onChange={(e)=>setNewPass(e.target.value)} />
             
              <input 
             autoComplete="on"
             placeholder="Re-enter new password "
             type="password" 
             id="confirmPassword"
             name="confirmPassword"
             label="confirmPassword"
             value={confirmPass}
             onChange={(e)=>setConfirmPass(e.target.value)} />

              <button className="submitBtn" type="submit">Change Password</button>

             </form>


    </div>

    </div>
  )
}
