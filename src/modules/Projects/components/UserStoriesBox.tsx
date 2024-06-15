import { AppstoreAddOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import ProjectsContext from "../../../context/ProjectsContext"
import UserStoriesContext from "../../../context/UserStoriesContext"
import UserStoryFormModal from "../../UserStories/components/UserStoryFormModal"
import '../../UserStories/userStory.css'
import { Tooltip } from "antd"
import ItemsContext from "../../../context/ItemsContext"
import ItemFormModal from "../../Items/components/ItemFormModal"
function UserStoriesBox({ projectId }) {
    const userStoriesContext = UserStoriesContext()
    const projectsContext = ProjectsContext()
    const itemsContext = ItemsContext()
    useEffect(() => {
        if (projectsContext.targetItem) {
            userStoriesContext.setData(projectsContext.targetItem.userStories)
        }
    }, [projectsContext.targetItem])
    const defaultItemValue = {
        title: "",
        description: "",
        status: 1,
        userStoryId: null,
        type: 1,
        businessValue: 1,
        userId: null
    }
    return (
        <div className="userStoriesBox">
            <UserStoryFormModal projectId={projectId} />
            <ItemFormModal projectId={projectId} />
            <section className="userStoriesSection">
                <div className="storyCard storyBox header">
                    <div className="storyDetails center newUserStoryBtn"
                        onClick={() => {
                            userStoriesContext.toggleFormModalView(true)
                        }}>
                        تعریف رویداد جدید
                        <AppstoreAddOutlined className="newUserStoryBtnIcon" />
                    </div>
                    <div className="pendingTasks center">تعریف شده</div>
                    <div className="inprogressTasks center">در حال انجام</div>
                    <div className="reviewTasks center">در حال بررسی</div>
                    <div className="doneTask center">انجام شده</div>
                </div>
                {userStoriesContext.data.map(story => {
                    return <div className="storyCard">
                        <div className="storyDetails">
                            <div className="storyCardTitle"><Link to={"/userStory/" + story.id}>{story.title}</Link></div>
                            <div className="storyCardTitle">{story.description}</div>
                        </div>
                        <div className="pendingTasks">

                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 1
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="inprogressTasks">

                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 2
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="reviewTasks">

                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 3
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="doneTask">

                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 4
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                    </div>
                })}
            </section>
        </div>
    )
}

export default UserStoriesBox