import { HomeOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import ItemsContext from "../../context/ItemsContext"
import UserStoriesContext from "../../context/UserStoriesContext"
import ItemsBox from "./components/ItemsBox"

function UserStoryPage() {
    const userStoriesContext = UserStoriesContext()
    const itemsContext = ItemsContext()
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            userStoriesContext.getById(id)
        }
    }, [id])
    useEffect(() => {
        if (userStoriesContext.targetItem) {
            itemsContext.setData(userStoriesContext.targetItem.items)
        }
    }, [userStoriesContext.targetItem])

    if (!userStoriesContext.targetItem) {
        return <p>LOADING DATA</p>
    }
    return (
        <div className="rootElement">
            <div className="appBeardCamp">
                <Link to="/"><HomeOutlined /></Link> / <Link to={"/projects/" + userStoriesContext.targetItem?.projectId}>پروژه</Link> / {userStoriesContext.targetItem?.title}
            </div>
            
            <div className="infoSection">
                <h1>{userStoriesContext.targetItem.title}</h1>
                <p>{userStoriesContext.targetItem.description}</p>
            </div>
            <ItemsBox userStoryId={userStoriesContext.targetItem?.id} />
        </div>
    )
}

export default UserStoryPage