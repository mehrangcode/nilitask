import { Form, FormProps, Input, Modal } from 'antd';
import { useEffect } from 'react';
import UserStoriesContext from '../../../context/UserStoriesContext';
import ProjectsContext from '../../../context/ProjectsContext';
type FieldType = {
    title: string;
    description: string;
    businessValue: number;
};

function UserStoryFormModal({
    projectId
}) {
    const userStoriesContext = UserStoriesContext()
    const projectsContext = ProjectsContext()
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
                    projectId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            } else {
                await userStoriesContext.createItem({
                    projectId,
                    userId: "2",
                    status: 1,
                    ...values
                })
            }
            userStoriesContext.selectItem(undefined)
            userStoriesContext.toggleFormModalView(false)
            projectsContext.getById(projectId)
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