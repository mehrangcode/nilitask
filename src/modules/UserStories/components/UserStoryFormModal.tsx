import { Form, FormProps, Input, Modal } from 'antd';
import { useEffect } from 'react';
import SprintsContext from '../../../context/SprintsContext';
import UserStoriesContext from '../../../context/UserStoriesContext';
type FieldType = {
    title: string;
    description: string;
    businessValue: number;
};

function UserStoryFormModal({
    sprintId
}) {
    const userStoriesContext = UserStoriesContext()
    const sprintsContext = SprintsContext()
    const [form] = Form.useForm()
    useEffect(() => {
        setTimeout(() => {
            form.resetFields()
        }, 100);
    }, [userStoriesContext.formModalView, userStoriesContext.targetItem])
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (userStoriesContext.targetItem?.id) {
                await userStoriesContext.updateItem(userStoriesContext.targetItem.id, {
                    sprintId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            } else {
                await userStoriesContext.createItem({
                    sprintId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            }
            userStoriesContext.selectItem(undefined)
            userStoriesContext.toggleFormModalView(false)
            sprintsContext.getById(sprintId)
        } catch (error) {

        }
    };
    return (
        <Modal
            open={userStoriesContext.formModalView}
            title={userStoriesContext.targetItem?.id ? "ویرایش رویداد" : "رویداد جدید"}
            onCancel={() => {
                userStoriesContext.selectItem(null)
                userStoriesContext.toggleFormModalView(false)
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
                initialValues={userStoriesContext.targetItem}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item label="عنوان" name={"title"} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="توضیحات تکمیلی" name={"description"}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserStoryFormModal