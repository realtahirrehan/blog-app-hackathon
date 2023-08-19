import SubmitBox from "../SubmitBox/SubmitBox.jsx"
import Blogs from "../Blogs/Blogs.jsx"
import "./MainSection.css"

export default function MainSection2() {
  return (
    <div className="mainSection">
      <div className="full"><h1 className="bold p-l">All Blogs</h1></div>
      <Blogs/>
    </div>
  )
}
