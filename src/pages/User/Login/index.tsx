import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { CaptFieldRef } from '@ant-design/pro-form/lib';
import { history, request, useModel } from '@umijs/max';
import { Card, Space, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import AIWriter from 'react-aiwriter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'umi';
import './index.less';
type LoginType = 'phone' | 'account';

const Index: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<>({});
  const [loginType, setLoginType] = useState<LoginType>('account');
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const { toggleUser } = useModel('user');
  const searchParams = new URLSearchParams(window.location.search);

  const msg = searchParams.get('message');
  const token = searchParams.get('Token');

  useEffect(() => {
    if (token) {
      localStorage.setItem(' Token ', token);
      history.push('/');
    }
  }, [token]);

  // TODO:企业微信扫码登录失效 回显
  useEffect(() => {
    if (msg) {
      toast.error(msg);
    }
  }, [msg]);

  const handleSubmit = async (values: any) => {
    const msg = await request('/api/oa/login/', {
      method: 'POST',
      data: values,
    });
    if (msg.Token !== undefined) {
      localStorage.setItem(' Token ', msg.Token);

      // 获取到Token后就 全局的user 可以请求
      toggleUser();

      // TODO:跳转原来页面
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    }
  };

  // TODO:发送验证码
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
    <div>
      <div className="card-wrapper" style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
        <ProConfigProvider hashed={false}>
          <Card className="card-content">
            <div>
              <LoginForm
                initialValues={{
                  username:'gpnu',
                  password: 'gpnu8888',
                }}
                // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="建筑材料管理平台"
                onFinish={async (values) => {
                  await handleSubmit(values);
                }}
                actions={
                  <Space>
                    其他登录方式
                    <a
                      target="_blank"
                      href="https://login.work.weixin.qq.com/wwlogin/sso/login?login_type=CorpApp&appid=ww43a1b769b5588d58&agentid=1000003&redirect_uri=http%3A%2F%2Fzengzeping.com%2Fapi%2Fwecom%2Flogin"
                    >
                      企业微信
                    </a>
                    {/*<AlipayCircleOutlined style={iconStyles} />*/}
                    <Link to="/register" style={{ marginLeft: '110px' }}>
                      注册用户
                    </Link>
                  </Space>
                }
              >
                <Tabs
                  centered
                  activeKey={loginType}
                  onChange={(activeKey) => {
                    setLoginType(activeKey as LoginType);
                  }}
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
          </Card>
        </ProConfigProvider>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Index;
