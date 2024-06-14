import { useEffect } from "react"
import { useParams } from "react-router-dom"
import ProjectsContext from "../../context/ProjectsContext"
import './project.css'
import UserStoriesBox from "./components/UserStoriesBox"

function ProjectsPage() {
  const projectsContext = ProjectsContext()
  const { id } = useParams()
  console.log("ID: ", id)
  useEffect(() => {
    if (id) {
      projectsContext.getById(id)
    }
  }, [id])
  if (!projectsContext.targetItem) {
    return <p>LOADING DATA</p>
  }
  return (
    <div>
      <h1 className="projectTile">{projectsContext.targetItem.title}</h1>
      <p>{projectsContext.targetItem.description}</p>
      <UserStoriesBox projectId={id} />
    </div>
  )
}

export default ProjectsPage