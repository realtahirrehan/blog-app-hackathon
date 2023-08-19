import { useState , useContext  } from "react"
import { GlobalContext } from "../../context/Context.js";
import Header from "../../components/header/Header.jsx"
import PageTitle from "../../components/PageTitle/PageTitle.jsx"
import MainSection from "../../components/MainSection/MainSection.jsx"
import "./Dashboard.css"

export default function Dashboard() {

  let { state, dispatch } = useContext(GlobalContext);

  return (
    <div className="dashboard">
      <Header page={"logout"} userName={state.user.displayName}/>
      <PageTitle title={"Dashboard"}/>
      <div className="main">
      <MainSection/>
      </div>
    </div>
  )
}
