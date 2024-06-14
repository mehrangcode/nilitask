import { Button, Col, Form, Input, Row } from 'antd';
import { FormProps } from 'antd/es/form/Form';
import './auth.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '../../context/AuthContext';
import LOGO from '../../assets/logo.png'
type FieldType = {
    userName: string;
    password: string;
};

function AuthPage() {
    const [form] = Form.useForm()
    const authContext = AuthContext()

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        authContext.userLogin(values)
    };
    const onRegisterUserHandler: FormProps<FieldType>['onFinish'] = (values) => {
        authContext.userRegister(values)
    };

    return (
        <div className='authPage'>
            <div className="heroSection" />
            <div className="authForm">
                <img src={LOGO} alt="LOGO" className='loginLogo' />
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="userName" label="نام کاربری" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="رمز عبور" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col>
                            <Button htmlType='submit' loading={authContext.loading} icon={<LockOutlined />} type='primary'>ورود به سیستم</Button>
                        </Col>
                        <Col>
                            <Button loading={authContext.loading} icon={<UserOutlined />}
                                onClick={async () => {
                                    try {
                                        const values = await form.validateFields()
                                        onRegisterUserHandler({
                                            ...values,
                                            email: "mail@mail.com"
                                        })
                                    } catch (error) {

                                    }
                                }}
                            >ثبت نام</Button>
                        </Col>
                    </Row>

                </Form>
            </div>
        </div>
    )
}

export default AuthPage