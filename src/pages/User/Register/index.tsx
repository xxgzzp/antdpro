import React, {useEffect, useRef, useState} from 'react';
import type { FormInstance } from 'antd';
import {Card, Result, Descriptions, Divider, Alert, Select,Image } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  StepsForm
} from '@ant-design/pro-form';
import styles from './style.less';
import {apiOaDepartmentList, apiOaUserCreate} from "@/services/ant-design-pro/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProjectSelectAdd from "@/pages/Project/ProjectSelectAdd";
import {LockOutlined, MobileOutlined} from "@ant-design/icons";
import {ProFormCaptcha} from "@ant-design/pro-components";
import {request} from "@@/exports";




export type CurrentTypes = 'base' | 'confirm' | 'result';

const StepDescriptions: React.FC<{
  user : API.User | undefined
  bordered?: boolean
  [key: string]: any; // allow any other prop
}> = ({ user,bordered,...props }) => {
  return (
    <Descriptions column={1} {...props} bordered={bordered} labelStyle={{width: '30%'}} contentStyle={{width: '70%'}}>
      <Descriptions.Item label="姓名">{user?.name}</Descriptions.Item>
      <Descriptions.Item label="账号">{user?.username}</Descriptions.Item>
      <Descriptions.Item label="项目">{user?.project_name}</Descriptions.Item>
      <Descriptions.Item label="部门">{user?.department_name}</Descriptions.Item>
    </Descriptions>
  );
};


const StepForm: React.FC<Record<string, any>> = () => {
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();
  const [user,setUser] = useState<API.User>()
  const [qrcode, setQrcode] = useState();

  useEffect(() => {
    request("/api/wecom/get_join_qrcode",{skipErrorHandler:true}).then(
      (res) => {
        setQrcode(res?.qrcode)
      }
    )
  },[])

  const handleCreateUser =async (formData: API.User) => {
    await apiOaUserCreate(formData).then((res) => {
      setUser(res?.data)
      setCurrent(1)
      return true;
    }).catch((error) => {
      console.log(error.response);
      if (error.response?.code === 400) {
        const errorData = error.response
        const errorFields = Object.keys(errorData).filter((key) => key !== 'code' && key !== 'message' && key !== 'success');
        // 遍历错误字段，逐一进行提示
        errorFields.forEach((field) => {
          const errorMsgs = errorData[field];
          formRef?.current?.setFields([
            {
              name: field,
              errors: errorMsgs,
            },
          ]);
        });
      }

      return false;
    })
  }

  const handleSendCaptcha = async (phone: string) => {
    const result = await request('/api/oa/sendsms/', {
      method: 'POST',
      data: { phone: `${phone}`,username: user?.username },
    });
    if (!result) {
      return;
    };
  }

  const handleUserBinding = async (data:{phone:string,code:string}) => {
    await request(`/api/oa/binding/`, {method: 'POST',data:{username:user?.username,phone:data.phone,code:data.code}}).then(
      () => {
        setCurrent(2)
        return true
      }
    ).catch(() => {return false})
  }


  return (
    <PageContainer >
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >

          <StepsForm.StepForm
            autoFocusFirstInput={true}
            formRef={formRef}
            title="基本信息"
            onFinish={handleCreateUser}
          >
            <ProFormText
              label="姓名"
              width="md"
              name="name"
              rules={[{ required: true, message: '真实姓名' }]}
            />

            <ProForm.Group  size={8}>
              <ProFormText
                label="账号"
                name="username"
                rules={[{ required: true, message: '账号' },]}
              />
              <ProFormText.Password label="密码" name="password" />
            </ProForm.Group>

            <ProForm.Item label="身份/职位" name="identity" initialValue={14}>
              <Select
                /*注意,这里的默认值是值默认显示的，不会默认发送表单，上面的那个默认才会*/
                defaultValue={14}
              >
                <Select.Option value={1}>总经理</Select.Option>
                <Select.Option value={2}>副总经理</Select.Option>
                <Select.Option value={3}>总施工</Select.Option>
                <Select.Option value={4}>副总施工</Select.Option>
                <Select.Option value={5}>总监</Select.Option>
                <Select.Option value={6}>副总监</Select.Option>
                <Select.Option value={7}>项目经理</Select.Option>
                <Select.Option value={8}>项目副经理</Select.Option>
                <Select.Option value={10}>项目技术总监</Select.Option>
                <Select.Option value={11}>项目采购员</Select.Option>
                <Select.Option value={12}>预算员</Select.Option>
                <Select.Option value={13}>财务</Select.Option>
                <Select.Option value={14}>公司员工</Select.Option>
                <Select.Option value={15}>分包</Select.Option>
                <Select.Option value={16}>大班</Select.Option>
                <Select.Option value={17}>工人</Select.Option>
                <Select.Option value={18}>其他</Select.Option>
              </Select>
            </ProForm.Item>
            <ProForm.Item label='项目' name='now_project'>
              <ProjectSelectAdd></ProjectSelectAdd>
            </ProForm.Item>
            {/*project选完才能选department*/}
            <ProFormDependency name={['now_project']}>
              {({ now_project }) => {
                if (!now_project) return null;
                return (
                  <ProFormSelect
                    name="department"
                    label="部门"
                    request={async () => {
                      const response = await apiOaDepartmentList({ project: now_project });
                      const { results } = response;
                      return results.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }));
                    }}
                  ></ProFormSelect>
                );
              }}
            </ProFormDependency>
          </StepsForm.StepForm>

          <StepsForm.StepForm title="绑定手机号" onFinish={handleUserBinding}>
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="绑定手机号，方便找回密码"
                style={{ marginBottom: 24 }}
              />
              <StepDescriptions user={user} bordered={true}></StepDescriptions>
              <Divider style={{ margin: '24px 0' }} />
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
              >
              </ProFormText>

              <ProFormCaptcha
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
            </div>
          </StepsForm.StepForm>

          <StepsForm.StepForm title="完成">
            <Alert
              closable
              showIcon
              message="请用微信扫码，加入企业微信"
              style={{ marginBottom: 24 }}
            />
            <div className={styles.result} style={{paddingLeft: '100px'}}>
              <Image src={qrcode}></Image>
            </div>
          </StepsForm.StepForm>

          {/*<StepsForm.StepForm title="完成">*/}
          {/*  <div className={styles.result}>*/}
          {/*    <Result*/}
          {/*      status="success"*/}
          {/*      title="用户创建成功"*/}
          {/*      className={styles.result}*/}
          {/*    >*/}
          {/*    </Result>*/}
          {/*    <StepDescriptions user={user} style={{paddingLeft:'100px'}}/>*/}
          {/*  </div>*/}
          {/*</StepsForm.StepForm>*/}

        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />

        <div className={styles.desc}>
          <h3>感谢您注册本站</h3>
        </div>
      </Card>
      <ToastContainer />
    </PageContainer>
  );
};

export default StepForm;
