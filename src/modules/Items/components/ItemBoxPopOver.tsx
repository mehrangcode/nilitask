import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ItemsContext from '../../../context/ItemsContext';
import SprintsContext from '../../../context/SprintsContext';

function ItemBoxPopOver({
    item
}) {
    const sprintsContext = SprintsContext()
    const itemsContext = ItemsContext()
    function renderContent() {
        return <div>
            <p className='projectMenuOption'
                onClick={() => {
                    itemsContext.selectItem({
                        ...item,
                        userId: item?.user?.id
                    })
                    itemsContext.toggleFormModalView(true)
                }}
            ><EditOutlined className="actionIcon" /> <span>ویرایش</span></p>
            <p className='projectMenuOption'
                onClick={async () => {
                    await itemsContext.deleteItem(item.id)
                    setTimeout(async () => {
                        await sprintsContext.getById(sprintsContext.targetItem?.id)
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