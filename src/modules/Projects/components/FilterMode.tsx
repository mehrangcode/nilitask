import { useEffect, useState } from "react"
import ItemBoxPopOver from "../../Items/components/ItemBoxPopOver"
import { CommentOutlined, UserOutlined } from "@ant-design/icons"
import ItemsContext from "../../../context/ItemsContext"

function FilterMode({ project, filterValue }) {
    const [data, setData] = useState([])
    const itemsContext = ItemsContext()
    useEffect(() => {
        const res = []
        project.userStories.map(story => {
            console.log(story)
            story.items.forEach(x => {
                const typeCondition = filterValue.type === 1 || x.type === (filterValue.type - 1)
                const statusCondition = filterValue.status === 1 || x.status === (filterValue.status - 1)
                const titleCondition = filterValue.title === "" || x.title.includes(filterValue.title) || x.description?.includes(filterValue.title)
                if (typeCondition && statusCondition && titleCondition) {
                    res.push(x)
                }
            })
            // console.log("ITEMS: ", items)
            // res.concat(items)
        })
        console.log("RES: ", res)
        setData(res)
    }, [project, filterValue])
    console.log("DATA: ", data)
    return (
        <div className="filterMode">
            {data.map(task => {
                return (
                    <div className="taskCard">
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
                )
            })}
        </div>
    )
}

export default FilterMode