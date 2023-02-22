import { FunctionComponent, useState } from "react";
import { Button, Checkbox, Form, Input, Tabs } from "antd";
import { apiTokenAuthCreate } from "@/services/ant-design-pro/apiTokenAuth";
import { useRequest } from "@umijs/max";

interface MaterialProps {

}
const onFinish = (values: any) => {
    apiTokenAuthCreate(values).then((data) => {
        console.log(data)
    }).catch((error) => { console.log(error) })
    // console.log(values)
    // const {data} = useRequest(apiTokenAuthCreate(values))
    // console.log(data)
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const Material: FunctionComponent<MaterialProps> = () => {
    const [loginType, setLoginType] = useState('account');
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Tabs
                centered
                activeKey={loginType}
                onChange={(activeKey) => setLoginType(activeKey)}
            >
                <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
                <>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item></>
            )}

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Material;