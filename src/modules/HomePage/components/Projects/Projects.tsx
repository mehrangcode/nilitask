import { Button, Tooltip } from "antd"
import { useEffect } from "react"
import ProjectsContext from "../../../../context/ProjectsContext"
import ProjectBoxPopOver from "./ProjectBoxPopOver"
import ProjectForm from "./ProjectForm"
import { BookOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

function Projects() {
    const projectsContext = ProjectsContext()
    useEffect(() => {
        projectsContext.fetchAll()
    }, [])
    return (
        <div>
            <ProjectForm />
            <Tooltip title="ساخت پروژه جدید" placement="right"><Button type="primary" className="newProjectBtn" onClick={() => {
                projectsContext.selectItem(null)
                setTimeout(() => {
                    projectsContext.toggleFormModalView(true)
                }, 100);
            }}>+</Button></Tooltip>
            <section className="projectsSection">
                {projectsContext.data.map(project => {
                    return <div className="projectCard">
                        <p className="projectTitle"><Link to={"/projects/" + project.id}>{project.title}</Link></p>
                        <ProjectBoxPopOver project={project} />
                        <div className="projctCardInfo">
                            {project.users?.length > 0 && <span><span className="payloadAmount">{project.users?.length}</span><UserOutlined /></span>}
                            {project.userStories?.length > 0 && <span><span className="payloadAmount">{project.userStories?.length}</span><BookOutlined /></span>}
                        </div>
                    </div>
                })}
            </section>
        </div>
    )
}

export default Projects