import { useEffect } from "react"
import UserStoriesContext from "../../../context/UserStoriesContext"
import { Button } from "antd"
import UserStoryFormModal from "../../UserStories/components/UserStoryFormModal"
import ProjectsContext from "../../../context/ProjectsContext"
import  '../../UserStories/userStory.css'
function UserStoriesBox({ projectId }) {
    const userStoriesContext = UserStoriesContext()
    const projectsContext = ProjectsContext()
    useEffect(() => {
        if (projectsContext.targetItem) {
            userStoriesContext.setData(projectsContext.targetItem.userStories)
        }
    }, [projectsContext.targetItem])
    return (
        <div>
            <UserStoryFormModal projectId={projectId} />
            <Button type="primary" onClick={() => {
                userStoriesContext.toggleFormModalView(true)
            }}>تعریف رویداد جدید</Button>
            {userStoriesContext.data.map(story => {
                return <div className="storuCard">
                    <div className="storyCardTitle">{story.title}</div>
                </div>
            })}
        </div>
    )
}

export default UserStoriesBox