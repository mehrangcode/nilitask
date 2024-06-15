import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ProjectsContext from '../../../context/ProjectsContext';
import ItemsContext from '../../../context/ItemsContext';

function ItemBoxPopOver({
    item
}) {
    const projectsContext = ProjectsContext()
    const itemsContext = ItemsContext()
    function renderContent() {
        return <div>
            <p className='projectMenuOption'
                onClick={() => {
                    itemsContext.selectItem(item)
                    itemsContext.toggleFormModalView(true)
                }}
            ><EditOutlined className="actionIcon" /> <span>ویرایش</span></p>
            <p className='projectMenuOption'
                onClick={async () => {
                    await itemsContext.deleteItem(item.id)
                    setTimeout(async () => {
                        await projectsContext.getById(item.projectId)
                    }, 100);
                }}
            ><DeleteOutlined className="actionIcon" /><span>حذف آیتم</span></p>
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

export default ItemBoxPopOver