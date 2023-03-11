import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { CaptFieldRef } from '@ant-design/pro-form/lib';
import { history, request, useIntl, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LoginType = 'phone' | 'account';

export default () => {
  // const [userLoginState, setUserLoginState] = useState<>({});
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      const msg = await request('/api/oa/login/', {
        method: 'POST',
        data: values,
      });
      console.log(`${msg}123123`);
      if (msg.Token !== undefined) {
        localStorage.setItem(' Token ', msg.Token);
        // 获取到Token后就获取用户信息
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const handleSendCaptcha = async (phone: string) => {
    const result = await request('/api/oa/sendsms/', {
      method: 'POST',
      data: { phone: `${phone}` },
    });
    if (!result) {
      return;
    }
    // 可以这样去停掉计时
    // if (){
    //   captchaRef.current?.endTiming();
    // }
  };

  // const { status, type: loginType } = userLoginState;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="建筑材料管理平台"
            // onFinish={(values)=>login({values: values})}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
            // subTitle="建筑材料管理平台"
            // actions={
            //   <Space>
            //     其他登录方式
            //     <AlipayCircleOutlined style={iconStyles} />
            //     <TaobaoCircleOutlined style={iconStyles} />
            //     <WeiboCircleOutlined style={iconStyles} />
            //   </Space>
            // }
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名:gpnu'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'密码:gpnu8888'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'phone' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="phone"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldRef={captchaRef}
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  phoneName="phone"
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={handleSendCaptcha}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
      <ToastContainer />
    </div>
  );
};
