import { Button } from "antd"
import ItemFormModal from "../../Items/components/ItemFormModal"
import ItemsContext from "../../../context/ItemsContext"

function ItemsBox({ userStoryId }) {
    const itemsContext = ItemsContext()
    return (
        <div>
            <ItemFormModal userStoryId={userStoryId} />
            <Button type="primary" onClick={() => { itemsContext.toggleFormModalView(true) }}>ایجاد آیتم جدید</Button>
            <div className="itemsWrapper">
                {itemsContext.data.map(item => {
                    return <div className="itemCard">{item.title}</div>
                })}
            </div>
        </div>
    )
}

export default ItemsBox