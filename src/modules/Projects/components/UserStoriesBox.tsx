import { AppstoreAddOutlined, CommentOutlined, UserOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useEffect } from "react"
import ItemsContext from "../../../context/ItemsContext"
import ProjectsContext from "../../../context/ProjectsContext"
import UserStoriesContext from "../../../context/UserStoriesContext"
import ItemFormModal from "../../Items/components/ItemFormModal"
import UserStoryFormModal from "../../UserStories/components/UserStoryFormModal"
import '../../UserStories/userStory.css'
import UserStoryBoxPopOver from "../../UserStories/components/UserStoryBoxPopOver"
import ItemBoxPopOver from "../../Items/components/ItemBoxPopOver"
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


    function drag(ev, payload) {
        ev.dataTransfer.setData("text", payload);
    }

    async function drop(ev, userStoyId, statusMood) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        const [targetStoryId, itemId] = data.split("-")
        console.log("DATA: ", targetStoryId, itemId, userStoyId)
        if (targetStoryId.toString() === userStoyId.toString()) {
            await itemsContext.changeItemStatus(itemId, statusMood)
            setTimeout(async () => {
                await projectsContext.getById(projectId)
            }, 200);
        }
        console.log("DROP", data, statusMood)
        // ev.target.appendChild(document.getElementById(data));
    }

    function renderItems(story, status) {
        return story.items?.filter(t => t.status === status).map(task => {
            return <div className="taskCard" draggable="true" onDragStart={(e) => { drag(e, story.id + "-" + task.id) }}>
                <div className="taskCardTitle">{task.title} <ItemBoxPopOver item={task} /> </div>
                <div className="taskContent">{task.description}</div>
                <div className="taskFooter">
                    {task.user ? <span><UserOutlined /> <span>{task.user.username}</span></span> : <span />}
                    <CommentOutlined onClick={() => {
                        itemsContext.getById(task.id)
                    }} />
                </div>
            </div>
        })
    }
    return (
        <div className="userStoriesBox">
            <UserStoryFormModal projectId={projectId} />
            <ItemFormModal projectId={projectId} />
            <section className="userStoriesSection">
                <div className="storyCard storyBox header">
                    <div
                        className="storyDetails center newUserStoryBtn"
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
                    return <div className="storyCard content">
                        <div className="storyDetails">
                            <UserStoryBoxPopOver userStory={story} />
                            <div className="storyCardTitle">{story.title}</div>
                            {/* <div className="storyCardTitle"><Link to={"/userStory/" + story.id}>{story.title}</Link></div> */}
                            <div className="taskContent">{story.description}</div>
                        </div>
                        <div className="pendingTasks" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { drop(e, story.id, 1) }}>
                            {renderItems(story, 1)}
                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 1
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="inprogressTasks" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { drop(e, story.id, 2) }}>
                            {renderItems(story, 2)}
                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 2
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="reviewTasks" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { drop(e, story.id, 3) }}>
                            {renderItems(story, 3)}

                            <Tooltip title="تعریف تسک جدید"><div className="addNewTask" onClick={() => {
                                itemsContext.selectItem({
                                    ...defaultItemValue,
                                    userStoryId: story.id,
                                    status: 3
                                })
                                itemsContext.toggleFormModalView(true)
                            }}>+</div></Tooltip>
                        </div>
                        <div className="doneTask" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { drop(e, story.id, 4) }}>
                            {renderItems(story, 4)}

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