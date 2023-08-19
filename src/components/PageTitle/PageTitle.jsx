import "./PageTitle.css"

export default function PageTitle(props) {
  return (
    <h1 className="PageTitle">
      {props.title}
    </h1>
  )
}
