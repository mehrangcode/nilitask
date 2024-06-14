import { useEffect } from "react"
import UserStoriesContext from "../../../context/UserStoriesContext"
import { Button } from "antd"
import UserStoryFormModal from "../../UserStories/components/UserStoryFormModal"
import ProjectsContext from "../../../context/ProjectsContext"
import '../../UserStories/userStory.css'
import { Link } from "react-router-dom"
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
            <Button
                style={{ margin: "0 1rem" }}
                type="primary"
                onClick={() => {
                    userStoriesContext.toggleFormModalView(true)
                }}>تعریف رویداد جدید</Button>
            <section className="userStoriesSection">
                {userStoriesContext.data.map(story => {
                    return <div className="storyCard">
                        <div className="storyCardTitle"><Link to={"/userStory/" + story.id}>{story.title}</Link></div>
                    </div>
                })}
            </section>
        </div>
    )
}

export default UserStoriesBox