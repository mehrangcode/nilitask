import { Form, FormProps, Input, Modal } from 'antd';
import { useEffect } from 'react';
import ItemsContext from '../../../context/ItemsContext';
import UserStoriesContext from '../../../context/UserStoriesContext';
type FieldType = {
    title: string;
    description: string;
    businessValue: number;
    type: number;
};

function ItemFormModal({
    userStoryId
}) {
    const userStoriesContext = UserStoriesContext()
    const itemsContext = ItemsContext()
    const [form] = Form.useForm()
    useEffect(() => {
        setTimeout(() => {
            form.resetFields()
        }, 100);
    }, [itemsContext.formModalView, itemsContext.targetItem])
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (itemsContext.targetItem?.id) {
                await itemsContext.updateItem(itemsContext.targetItem.id, {
                    userStoryId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            } else {
                await itemsContext.createItem({
                    userStoryId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            }
            itemsContext.selectItem(undefined)
            itemsContext.toggleFormModalView(false)
            userStoriesContext.getById(userStoryId)
        } catch (error) {

        }
    };
    return (
        <Modal
            open={itemsContext.formModalView}
            title={itemsContext.targetItem?.id ? "ویرایش آیتم" : "آیتم جدید"}
            onCancel={() => {
                itemsContext.selectItem(null)
                itemsContext.toggleFormModalView(false)
            }}
            onOk={async () => {
                try {
                    const values = await form.validateFields()
                    onFinish(values)
                } catch (error) {

                }
            }}
        >
            <Form
                form={form}
                initialValues={itemsContext.targetItem}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item label="عنوان" name={"title"} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="توضیحات تکمیلی" name={"description"} rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <div className='businessValueInput'>
                    <label htmlFor="businessValue">الویت</label>
                    <Form.Item name={"businessValue"}>
                        <Input style={{width: "3rem"}} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default ItemFormModal