import SubmitBox from "../SubmitBox/SubmitBox.jsx"
import Blogs from "../Blogs/Blogs.jsx"
import "./MainSection.css"

export default function MainSection() {
  return (
    <div className="mainSection">
      <SubmitBox/>
      <div className="full"><h1 className="bold p-l">My Blogs</h1></div>
      <Blogs/>
    </div>
  )
}
