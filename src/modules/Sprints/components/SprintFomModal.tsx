import { Form, FormProps, Input, Modal } from "antd"
import DatePicker from "../../../components/datePicker/DatePicker"
import SprintsContext from "../../../context/SprintsContext"
import ProjectsContext from "../../../context/ProjectsContext";
import { useEffect } from "react";


type FieldType = {
    title: string;
    start: string;
    end: string;
};

function SprintFomModal({ projectId }) {
    const sprintsContext = SprintsContext()
    const projectsContext = ProjectsContext()
    const [form] = Form.useForm()
    useEffect(() => {
        setTimeout(() => {
            form.resetFields()
        }, 100);
    }, [sprintsContext.formModalView, sprintsContext.targetItem])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (sprintsContext.targetItem?.id) {
                await sprintsContext.updateItem(sprintsContext.targetItem.id, {
                    ...values,
                    projectId
                })
            } else {
                await sprintsContext.createItem({
                    ...values,
                    projectId
                })
            }
            // sprintsContext.selectItem(undefined)
            sprintsContext.toggleFormModalView(false)
            projectsContext.getById(projectId)
        } catch (error) {

        }
    };
    return (
        <Modal
            open={sprintsContext.formModalView}
            title="مشخصات اسپرینت"
            onCancel={() => {
                // sprintsContext.selectItem(undefined)
                sprintsContext.toggleFormModalView(false)
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
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="عنوان" name="title" rules={[{required: true}]}><Input /></Form.Item>
                <div className="dates" style={{ display: "flex", gap: "1rem" }}>
                    <Form.Item style={{ width: 120 }} label="تاریخ شروع" name="start" rules={[{required: true}]}><DatePicker /></Form.Item>
                    <Form.Item style={{ width: 120 }} label="تاریخ پایان" name="end" rules={[{required: true}]}><DatePicker /></Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default SprintFomModal