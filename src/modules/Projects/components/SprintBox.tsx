import DoDate from "@doolooper/dodate"
import { useEffect } from "react"
import ProjectsContext from "../../../context/ProjectsContext"
import SprintsContext from "../../../context/SprintsContext"
import UserStoriesBox from "../../Sprints/components/UserStoriesBox"
import UserStoriesContext from "../../../context/UserStoriesContext"
import { DeleteOutlined } from "@ant-design/icons"
import { Tabs } from "antd"
import SprintReport from "../../Sprints/components/SprintReport"

function SprintBox() {
  const projectsContext = ProjectsContext()
  const sprintsContext = SprintsContext()
  const userStoriesContext = UserStoriesContext()
  const today = DoDate.now()
  useEffect(() => {
    if (projectsContext.targetItem) {
      let currentSprint = projectsContext.targetItem?.sprints?.find(x => {
        return new Date(x.start) <= today.getDate() && new Date(x.end) >= today.getDate()
      })
      if (!currentSprint) {
        currentSprint = projectsContext.targetItem?.sprints[0]
      }
      if (currentSprint) {
        sprintsContext.getById(currentSprint.id)
      }
    }
  }, [projectsContext.targetItem])
  useEffect(() => {
    userStoriesContext.setData(sprintsContext.targetItem?.userStories)
  }, [sprintsContext.targetItem])
  return (
    <div className="targetSprint">
      <div className="sprintListViewBox">
        <div className="sprintCard newSprintButton" onClick={() => {
          sprintsContext.selectEditableItem(undefined)
          sprintsContext.toggleFormModalView(true)
        }}>تعریف اسپرینت جدید</div>
        {projectsContext.targetItem?.sprints?.map(x => <div className={sprintsContext.targetItem?.id === x.id ? "sprintCard active" : "sprintCard"}
          onClick={() => {
            sprintsContext.getById(x.id)
          }}
        >
          <strong>{x.title}</strong>
          <DeleteOutlined className="deleteSprintIcon" onClick={async (e) => {
            e.stopPropagation()
            try {
              sprintsContext.deleteItem(x.id)
              setTimeout(() => {
                projectsContext.getById(projectsContext.targetItem?.id)
              }, 200);
            } catch (error) {

            }
          }} />
          <div className="sprintDates">
            <span>{DoDate.parse(x.start).formatJalali("YYYY/MM/DD")}</span>
            <span>{DoDate.parse(x.end).formatJalali("YYYY/MM/DD")}</span>
          </div>
        </div>)}
      </div>
      {sprintsContext.targetItem ?
        <Tabs
          centered
          items={[
            {
              key: "data",
              label: "اطلاعات",
              children: <UserStoriesBox sprintId={sprintsContext.targetItem?.id} />,
            },
            {
              key: "report",
              label: "گزارش اسپرینت",
              children: <SprintReport />,
            },
          ]}
        />
        : null}
    </div>
  )
}

export default SprintBox