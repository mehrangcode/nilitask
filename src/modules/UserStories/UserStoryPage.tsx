import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import UserStoriesContext from "../../context/UserStoriesContext"
import { HomeOutlined } from "@ant-design/icons"
import { Button } from "antd"

function UserStoryPage() {
    const userStoriesContext = UserStoriesContext()
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            userStoriesContext.getById(id)
        }
    }, [id])

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
            <Button type="primary" onClick={() => {}}>ایجاد آیتم جدید</Button>
        </div>
    )
}

export default UserStoryPage