import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext';

function ProjectBoxPopOver({
    project
}) {
    const projectsContext = ProjectsContext()
    const nav = useNavigate()
    function renderContent() {
        return <div>
            <p className='projectMenuOption'
            onClick={() => {
                nav("/projects/" + project.id)
            }}
            ><EyeOutlined className="actionIcon" /> <span>نمایش</span></p>
            <p className='projectMenuOption'
            onClick={() => {
                projectsContext.selectItem(project)
                projectsContext.toggleFormModalView(true)
            }}
            ><EditOutlined className="actionIcon"/> <span>ویرایش</span></p>
            <p className='projectMenuOption'
            onClick={() => {
                projectsContext.deleteItem(project.id)
            }}
            ><DeleteOutlined className="actionIcon" /><span>حذف پروژه</span></p>
        </div>
    }
    return (
        <div>
            <Popover placement="right" trigger="hover" title={null} content={renderContent()}>
                <MoreOutlined className='projectBoxMenu' />
            </Popover>
        </div>
    )
}

export default ProjectBoxPopOver