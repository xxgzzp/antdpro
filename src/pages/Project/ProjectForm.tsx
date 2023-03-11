import {
  apiOaProjectCreate,
  apiOaProjectPartialUpdate,
  apiOaUserList,
} from '@/services/ant-design-pro/api';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ProFormInstance, ProFormSelect } from '@ant-design/pro-form';
import { Form } from 'antd';
import React, { Dispatch, SetStateAction, useRef } from 'react';

const ProjectForm: React.FC<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  reload?: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined;
  updateInit?: API.Project | undefined;
  typeAddOrUpdate?: boolean;
  setProjectList?: Dispatch<SetStateAction<any[]>>; // 在Select中，如果添加用户，要把新增的用户set回去
}> = ({ modalOpen, setModalOpen, reload, updateInit, typeAddOrUpdate = true, setProjectList }) => {
  const restFormRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();

  // 如果是新增就重置表单，反之update填补初始数据
  if (typeAddOrUpdate) {
    restFormRef.current?.resetFields();
  } else {
    form.setFieldsValue(updateInit);
  }
  const handleFinish = async (formData: API.Project) => {
    if (typeAddOrUpdate) {
      await apiOaProjectCreate(formData).then((data) => {
        if (setProjectList) {
          setProjectList((prevList) => [
            ...prevList,
            {
              label: formData.name,
              value: data.id,
            },
          ]);
        }
        setModalOpen(false);
        reload?.();
        restFormRef.current?.resetFields();
      });
    } else {
      await apiOaProjectPartialUpdate(
        { id: updateInit?.id } as API.apiOaProjectPartialUpdateParams,
        formData,
      ).then(() => {
        setModalOpen(false);
        reload?.();
        restFormRef.current?.resetFields();
      });
    }
  };

  return (
    <>
      <ModalForm
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
          name="name"
          label="项目名称"
          placeholder="请输入项目名称"
          rules={[
            {
              required: true,
              message: '名称必填',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="address"
          label="项目地址"
          placeholder="请输入项目地址"
          rules={[
            {
              required: true,
              message: '地址必填',
            },
          ]}
        />
        <ProFormSelect
          name="manager"
          label="管理人"
          placeholder="请选择"
          request={async () => {
            const response = await apiOaUserList({ pageSize: 200 });
            const { results } = response;
            return results.map((item) => ({
              value: item.id,
              label: item.name,
            }));
          }}
        ></ProFormSelect>
      </ModalForm>
    </>
  );
};
export default ProjectForm;
