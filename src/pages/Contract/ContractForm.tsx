import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import {
  apiMaterialContractCreate,
  apiMaterialContractUpdate,
} from '@/services/ant-design-pro/api';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ProFormInstance, ProFormItem } from '@ant-design/pro-form';
import { Form } from 'antd';
import React, { Dispatch, SetStateAction, useRef } from 'react';

const ContractForm: React.FC<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  reload: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined;
  updateInit: API.Contract | undefined;
  typeAddOrUpdate: boolean; // true是增加,false是更新
  setContractList?: Dispatch<
    SetStateAction<{ value: string | undefined; label: string | undefined }[] | undefined>
  >;
}> = ({ modalOpen, setModalOpen, reload, updateInit, typeAddOrUpdate = true, setContractList }) => {
  const restFormRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();

  if (typeAddOrUpdate) {
    // 这个方法会使得新建用户中的数据清零。在没加入更新功能前，默认用户关闭模态框后，填写的数据不会清零
    // 如果不加这句的话，将导致用户上一个更新的面板数据留存在新增里面
    restFormRef.current?.resetFields();
  } else {
    // update 时填的默认参数
    form.setFieldsValue(updateInit);
  }

  const handleFinish = async (formData: API.Contract) => {
    if (typeAddOrUpdate) {
      //  TODO:新增合同
      await apiMaterialContractCreate(formData).then(({ id }) => {
        if (setContractList) {
          setContractList((prevList) => [
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
      });
    } else {
      // 注意这里updateUserInit.id时formData获取不到的,formData是更改后的数据
      await apiMaterialContractUpdate(
        //  TODO:更新合同
        { id: updateInit?.id } as API.apiMaterialContractUpdateParams,
        formData,
      ).then(() => {
        // 关闭模态框
        setModalOpen(false);
        // 重新加载页面
        reload?.();
        // 表单重置
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
        <ProFormText width="md" name="name" label="合同名称" placeholder="请输入" />
        <ProFormText width="md" name="category" label="类别" placeholder="请输入" />
        <ProFormItem label="项目" name="project">
          <ProjectSelectAdd></ProjectSelectAdd>
        </ProFormItem>
        <ProFormItem label="供应商" name="supplier">
          <SupplierSelectAdd></SupplierSelectAdd>
        </ProFormItem>
        <ProFormItem label="施工员" name="principal">
          <UserSelectAdd></UserSelectAdd>
        </ProFormItem>
        <ProFormItem label="预算员" name="estimator">
          <UserSelectAdd></UserSelectAdd>
        </ProFormItem>
        <ProFormItem label="拍板人" name="end_by">
          <UserSelectAdd></UserSelectAdd>
        </ProFormItem>
      </ModalForm>
    </>
  );
};
export default ContractForm;
