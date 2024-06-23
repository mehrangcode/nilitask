import DoDate from "@doolooper/dodate"
import { useEffect } from "react"
import ProjectsContext from "../../../context/ProjectsContext"
import SprintsContext from "../../../context/SprintsContext"
import UserStoriesBox from "../../Sprints/components/UserStoriesBox"
import UserStoriesContext from "../../../context/UserStoriesContext"
import { DeleteOutlined } from "@ant-design/icons"

function SprintBox() {
  const projectsContext = ProjectsContext()
  const sprintsContext = SprintsContext()
  const userStoriesContext = UserStoriesContext()
  const today = DoDate.now()
  useEffect(() => {
    const payload = projectsContext.targetItem?.sprints?.find(x => {
      return new Date(x.start) <= today.getDate() && new Date(x.end) >= today.getDate()
    })
    if (payload) {
      sprintsContext.getById(payload.id)
    }
  }, [projectsContext.targetItem])
  useEffect(() => {
    userStoriesContext.setData(sprintsContext.targetItem?.userStories)
  }, [sprintsContext.targetItem])
  return (
    <div className="targetSprint">
      <div className="sprintListViewBox">
        <div className="sprintCard newSprintButton" onClick={() => {
          sprintsContext.selectItem(undefined)
          sprintsContext.toggleFormModalView(true)
        }}>تعریف اسپرینت جدید</div>
        {projectsContext.targetItem?.sprints?.map(x => <div className={sprintsContext.targetItem?.id === x.id ? "sprintCard active" : "sprintCard"}
          onClick={() => {
            sprintsContext.getById(x.id)
          }}
        >
          <strong>{x.title}</strong>
          <DeleteOutlined className="deleteSprintIcon" onClick={async () => {
            try {
              sprintsContext.deleteItem(x.id)
              projectsContext.getById(projectsContext.targetItem?.id)
            } catch (error) {

            }
          }} />
        </div>)}
      </div>
      <div className="sprintView">
        <h1 className="sprintTitle">{sprintsContext.targetItem?.title || null}</h1>
      </div>
      {sprintsContext.targetItem ? <UserStoriesBox sprintId={sprintsContext.targetItem?.id} /> : null}
    </div>
  )
}

export default SprintBox