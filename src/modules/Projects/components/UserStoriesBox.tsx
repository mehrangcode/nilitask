import { AppstoreAddOutlined, CommentOutlined, FilterOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input, Select, Tooltip } from "antd"
import { useEffect, useMemo, useState } from "react"
import ItemsContext from "../../../context/ItemsContext"
import ProjectsContext from "../../../context/ProjectsContext"
import UserStoriesContext from "../../../context/UserStoriesContext"
import ItemFormModal from "../../Items/components/ItemFormModal"
import UserStoryFormModal from "../../UserStories/components/UserStoryFormModal"
import '../../UserStories/userStory.css'
import UserStoryBoxPopOver from "../../UserStories/components/UserStoryBoxPopOver"
import ItemBoxPopOver from "../../Items/components/ItemBoxPopOver"
import FilterMode from "./FilterMode"
function UserStoriesBox({ projectId }) {
    const [filterValue, setFilterValue] = useState({
        type: 1,
        status: 1,
        title: ""
    })
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
                <div className="taskCardTitle" style={{
                    borderBottom: "5px solid " + (task.type === 1 ? "cornflowerblue" : task.type === 2 ? "red" : "white")
                }}>{task.title} <ItemBoxPopOver item={task} /> </div>
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
    const filterMode = useMemo(() => {
        return filterValue.status !== 1 || filterValue.type !== 1 || filterValue.title !== ""
    }, [filterValue])
    return (
        <div className="userStoriesBox">
            <UserStoryFormModal projectId={projectId} />
            <ItemFormModal projectId={projectId} />
            <div className="filterSection">
                <FilterOutlined />
                <div className="filterItemWrapper">
                    <label htmlFor="type">نوع</label>
                    <Select id="type" style={{ width: 200 }} value={filterValue.type} onChange={(val) => {
                        setFilterValue({
                            ...filterValue,
                            type: +val
                        })
                    }}>
                        <Select.Option key={1} value={1}>همه موارد</Select.Option>
                        <Select.Option key={2} value={2}>تسک</Select.Option>
                        <Select.Option key={3} value={3}>خطا</Select.Option>
                    </Select>
                </div>
                <div className="filterItemWrapper">
                    <label htmlFor="status">وضعیت</label>
                    <Select id="status" style={{ width: 200 }} value={filterValue.status} onChange={(val) => {
                        setFilterValue({
                            ...filterValue,
                            status: +val
                        })
                    }}>
                        <Select.Option key={1} value={1}>همه موارد</Select.Option>
                        <Select.Option key={2} value={2}>تعریف شده</Select.Option>
                        <Select.Option key={3} value={3}>در حال انجام</Select.Option>
                        <Select.Option key={4} value={4}>در حال بررسی</Select.Option>
                        <Select.Option key={5} value={5}>انجام شده</Select.Option>
                    </Select>
                </div>
                <div className="filterItemWrapper">
                    <label htmlFor="title">جستجو</label>
                    <Input id="title" value={filterValue.title} onChange={(e) => {
                        setFilterValue({
                            ...filterValue,
                            title: e.target.value
                        })
                    }} />
                </div>
                {filterMode ? <Button type="primary" onClick={() => {
                    setFilterValue({type: 1, status: 1, title: ""})
                }}>حذف فیلتر</Button> : null}
            </div>
            {!filterMode ? <section className="userStoriesSection">
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
            </section> : <FilterMode project={projectsContext.targetItem} filterValue={filterValue} />}
        </div>
    )
}

export default UserStoriesBox