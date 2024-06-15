import { Form, FormProps, Input, Modal } from "antd"
import ProjectsContext from "../../../../context/ProjectsContext"
import './project.css'
import { useEffect } from "react";
type FieldType = {
    title: string;
    description: string;
};

function ProjectForm() {
    const projectContext = ProjectsContext()
    const [form] = Form.useForm()
    useEffect(() => {
        setTimeout(() => {
            form.resetFields()
        }, 100);
    }, [projectContext.formModalView, projectContext.targetItem])
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (projectContext.targetItem?.id) {
                await projectContext.updateItem(projectContext.targetItem.id, values)
            } else {
                await projectContext.createItem(values)
            }
            projectContext.selectItem(undefined)
            projectContext.toggleFormModalView(false)
        } catch (error) {

        }
    };
    return (
        <Modal
            open={projectContext.formModalView}
            title={projectContext.targetItem?.id ? "ویرایش پروژه" : "پروژه جدید"}
            onCancel={() => {
                projectContext.selectItem(null)
                projectContext.toggleFormModalView(false)
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
                initialValues={projectContext.targetItem}
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

export default ProjectForm