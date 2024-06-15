import { Col, Form, FormProps, Input, Modal, Row, Select } from 'antd';
import { useEffect } from 'react';
import ItemsContext from '../../../context/ItemsContext';
import ProjectsContext from '../../../context/ProjectsContext';
import AuthContext from '../../../context/AuthContext';
type FieldType = {
    title: string;
    description: string;
    businessValue: number;
    type: number;
};

function ItemFormModal({
    projectId
}) {
    const projectsContext = ProjectsContext()
    const itemsContext = ItemsContext()
    const authContext = AuthContext()
    useEffect(() => {
        authContext.fetchAll()
    }, [])
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
                    userStoryId: itemsContext.targetItem.userStoryId,
                    type: itemsContext.targetItem.type,
                    userId: null,
                    status: itemsContext.targetItem.status,
                    ...values
                })
            } else {
                await itemsContext.createItem({
                    userStoryId: itemsContext.targetItem.userStoryId,
                    type: itemsContext.targetItem.type,
                    userId: null,
                    status: itemsContext.targetItem.status,
                    ...values
                })
            }
            itemsContext.selectItem(undefined)
            itemsContext.toggleFormModalView(false)
            projectsContext.getById(projectId)
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
                <Row gutter={16}>
                    <Col xs={12}>
                        <Form.Item  label="نوع" name={"type"}>
                            <Select>
                                <Select.Option key={1} value={1}>تسک</Select.Option>
                                <Select.Option key={2} value={2}>خطا</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={12}>
                        <Form.Item label="کاربر مرتبط" name={"userId"}>
                            <Select>
                                {authContext.users.map(record => {
                                    return <Select.Option key={record.id} value={record.id}>{record.username}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="عنوان" name={"title"} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="توضیحات تکمیلی" name={"description"} rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ItemFormModal