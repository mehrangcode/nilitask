import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ProjectsContext from '../../../context/ProjectsContext';
import UserStoriesContext from '../../../context/UserStoriesContext';

function UserStoryBoxPopOver({
    userStory
}) {
    const projectsContext = ProjectsContext()
    const userStoriesContext = UserStoriesContext()
    function renderContent() {
        return <div>
            <p className='projectMenuOption'
                onClick={() => {
                    userStoriesContext.selectItem(userStory)
                    userStoriesContext.toggleFormModalView(true)
                }}
            ><EditOutlined className="actionIcon" /> <span>ویرایش</span></p>
            <p className='projectMenuOption'
                onClick={async () => {
                    await userStoriesContext.deleteItem(userStory.id)
                    setTimeout(async () => {
                        await projectsContext.getById(userStory.projectId)
                    }, 100);
                }}
            ><DeleteOutlined className="actionIcon" /><span>حذف رویداد</span></p>
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

export default UserStoryBoxPopOver