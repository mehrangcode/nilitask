import { useEffect } from "react"
import SprintsContext from "../../../context/SprintsContext"
import ProjectsContext from "../../../context/ProjectsContext"
import DoDate from "@doolooper/dodate"

function SprintBox({projectId}) {
    const sprintsContext = SprintsContext()
    const projectsContext = ProjectsContext()
    useEffect(() => {
        sprintsContext.fetchAll(projectId)
    }, [projectId])
    const today = DoDate.now()
  return (
    <div>
        {projectsContext.targetItem?.sprints?.find(x => new Date(x.start) <= today.getDate() && new Date(x.end) >= today.getDate())?.title || null}
    </div>
  )
}

export default SprintBox