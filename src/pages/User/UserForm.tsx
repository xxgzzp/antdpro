import {
  apiOaDepartmentList,
  apiOaProjectList,
  apiOaUserCreate,
  apiOaUserPartialUpdate,
} from '@/services/ant-design-pro/api';
import { ModalForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { ProForm, ProFormDependency, ProFormInstance, ProFormSelect } from '@ant-design/pro-form';
import { Form, Select } from 'antd';
import React, { Dispatch, SetStateAction, useRef } from 'react';

const UserForm: React.FC<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  reload?: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined;
  updateUserInit?: API.User | undefined;
  typeAddOrUpdate?: boolean; // true是增加,false是更新
  setUserList?: Dispatch<
    SetStateAction<{ value: string | undefined; label: string }[] | undefined>
  >; // 在Select中，如果添加用户，要把新增的用户set回去
}> = ({ modalOpen, setModalOpen, reload, updateUserInit, typeAddOrUpdate = true, setUserList }) => {
  const restFormRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();

  if (typeAddOrUpdate) {
    // 这个方法会使得新建用户中的数据清零。在没加入更新功能前，默认用户关闭模态框后，填写的数据不会清零
    // 如果不加这句的话，将导致用户上一个更新的面板数据留存在新增里面
    restFormRef.current?.resetFields();
  } else {
    // update user时填的默认参数
    form.setFieldsValue(updateUserInit);
  }

  const handleFinish = async (formData: API.User) => {
    if (typeAddOrUpdate) {
      await apiOaUserCreate(formData)
        .then(({ id }) => {
          // 在Select中，如果添加用户，要把新增的用户set回去
          if (setUserList) {
            setUserList((prevList) => [
              ...(prevList ?? []),
              {
                label: formData.name,
                value: id,
              },
            ]);
          }
          // 关闭模态框
          setModalOpen(false);
          // 重新加载页面
          reload?.();
          // 表单重置
          restFormRef.current?.resetFields();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response?.code === 400) {
            const errorData = error.response;
            const errorFields = Object.keys(errorData).filter(
              (key) => key !== 'code' && key !== 'message' && key !== 'success',
            );
            // 遍历错误字段，逐一进行提示
            errorFields.forEach((field) => {
              const errorMsgs = errorData[field];
              restFormRef?.current?.setFields([
                {
                  name: field,
                  errors: errorMsgs,
                },
              ]);
            });
          }
        });
    } else {
      // 注意这里updateUserInit.id时formData获取不到的,formData是更改后的数据
      await apiOaUserPartialUpdate(
        { id: updateUserInit?.id } as API.apiOaUserUpdateParams,
        formData,
      )
        .then(() => {
          // 关闭模态框
          setModalOpen(false);
          // 重新加载页面
          reload?.();
          // 表单重置
          restFormRef.current?.resetFields();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response?.code === 400) {
            const errorData = error.response;
            const errorFields = Object.keys(errorData).filter(
              (key) => key !== 'code' && key !== 'message' && key !== 'success',
            );
            // 遍历错误字段，逐一进行提示
            errorFields.forEach((field) => {
              const errorMsgs = errorData[field];
              restFormRef?.current?.setFields([
                {
                  name: field,
                  errors: errorMsgs,
                },
              ]);
            });
          }
        });
    }
  };
  // 手机号和用户名保持一致，并且用户名可更改
  const handleMobilePhoneChange = (e: { target: { value: any } }) => {
    const mobilePhone = e.target.value;
    form.setFieldsValue({
      username: mobilePhone,
    });
  };
  // 数据校验
  const validateUsername = (rule: any, value: any) => {
    if (!value) {
      return Promise.reject('用户名必填');
    }
    if (value.length > 150) {
      return Promise.reject('用户名不能超过150个字符');
    }
    const reg = /^[a-zA-Z0-9@\-_.]+$/;
    if (!reg.test(value)) {
      return Promise.reject('用户名只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”');
    }
    return Promise.resolve();
  };
  return (
    <>
      <ModalForm
        // title="用户表单"
        open={modalOpen}
        formRef={restFormRef}
        onOpenChange={setModalOpen}
        form={form}
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            resetText: '重置',
          },
          resetButtonProps: {
            onClick: () => {
              restFormRef.current?.resetFields();
            },
          },
        }}
      >
        <ProFormText
          width="md"
          name="mobile_phone"
          label="手机号"
          placeholder="请输入手机号"
          // @ts-ignore
          onChange={handleMobilePhoneChange}
        />
        <ProFormGroup>
          <ProFormText
            label="用户名"
            name="username"
            width="md"
            rules={[
              {
                required: false,
                message: '请输入用户名',
              },
              { validator: validateUsername },
            ]}
          ></ProFormText>
          {/*注意，disabled={!editPassword}的意思是，新增用户能为他设置密码，更新用户不能更改他的密码*/}
          <ProFormText width="md" name="password" label="密码" disabled={!typeAddOrUpdate} />
        </ProFormGroup>
        <ProFormText width="md" name="name" label="真实姓名" placeholder="请输入真实姓名" />
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
        <ProFormSelect
          name="now_project"
          label="项目"
          placeholder="请选择"
          request={async () => {
            const response = await apiOaProjectList({ pageSize: 200 });
            const { results } = response;
            return results.map((item) => ({
              value: item.id,
              label: item.name,
            }));
          }}
        ></ProFormSelect>
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
      </ModalForm>
    </>
  );
};
export default UserForm;
