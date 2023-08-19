import { useState , useEffect } from "react"
import Header from "../../components/header/Header.jsx"
import PageTitle from "../../components/PageTitle/PageTitle.jsx"
import MainSection2 from "../../components/MainSection/MainSection2.jsx"
import "./Dashboard.css"

export default function Dashboard2() {

  let [greet , setGreet] = useState("")

useEffect(() => {
  const greetingMsg = ()=>{

    let myDate = new Date();
    let hrs = myDate.getHours();

    console.log(hrs);

if (hrs < 12){
  setGreet('Good Morning Reader');
}
else if (hrs >= 12 && hrs <= 17){
  setGreet('Good Afternoon Reader');
}
else{
  setGreet('Good Evening Reader');
}

}

greetingMsg();
  
}, [])



  return (
    <div className="dashboard">
      <Header page={"login"} />
      <PageTitle title={greet}/>
      <div className="main">
      <MainSection2/>
      </div>
    </div>
  )
}
