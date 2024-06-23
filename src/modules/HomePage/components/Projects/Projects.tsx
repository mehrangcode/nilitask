import { Button, Tooltip } from "antd"
import { useEffect } from "react"
import ProjectsContext from "../../../../context/ProjectsContext"
import ProjectBoxPopOver from "./ProjectBoxPopOver"
import ProjectForm from "./ProjectForm"
import { BookOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import PROJECT_BG1 from '../../../../assets/images/projectBG1.png'
import PROJECT_BG2 from '../../../../assets/images/projectBG2.png'
import PROJECT_BG3 from '../../../../assets/images/projectBG3.png'
import PROJECT_BG4 from '../../../../assets/images/projectBG4.png'
function Projects() {
    const projectsContext = ProjectsContext()
    useEffect(() => {
        projectsContext.fetchAll()
    }, [])
    const projectBGs = [
        PROJECT_BG1,
        PROJECT_BG2,
        PROJECT_BG3,
        PROJECT_BG4,
    ]
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
                {projectsContext.data.map((project, index) => {
                    return <div className="projectCard">
                        <p className="projectTitle"><Link to={"/projects/" + project.id}>{project.title}</Link></p>
                        <ProjectBoxPopOver project={project} />
                        <img src={projectBGs[Math.floor(index % projectBGs.length)]} alt="project" className="projectBg" />
                        <div className="projctCardInfo">
                            {project.users?.length > 0 && <span><span className="payloadAmount">{project.users?.length}</span><UserOutlined /></span>}
                            {project.sprints?.length > 0 && <span><span className="payloadAmount">{project.sprints?.length}</span><BookOutlined /></span>}
                        </div>
                    </div>
                })}
            </section>
        </div>
    )
}

export default Projects