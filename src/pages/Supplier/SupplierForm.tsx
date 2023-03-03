import {ProForm, ProFormInstance, ProFormItem} from "@ant-design/pro-form";
import React, {Dispatch, SetStateAction, useRef} from "react";
import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Form, Select} from "antd";
import {
  apiOaSupplierCreate, apiOaSupplierUpdate,
} from "@/services/ant-design-pro/api";
import UserSelectAdd from "@/pages/User/UserSelectAdd";

const SupplierForm: React.FC<{
  modalOpen:boolean
  setModalOpen:Dispatch<SetStateAction<boolean>>
  reload:((resetPageIndex?: (boolean | undefined)) => Promise<void>) | undefined
  updateInit:API.Supplier | undefined
  typeAddOrUpdate:boolean // true是增加,false是更新
}> = ({modalOpen, setModalOpen, reload,updateInit,typeAddOrUpdate=true}) => {

  const restFormRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();

  if(typeAddOrUpdate){
    // 这个方法会使得新建用户中的数据清零。在没加入更新功能前，默认用户关闭模态框后，填写的数据不会清零
    // 如果不加这句的话，将导致用户上一个更新的面板数据留存在新增里面
    restFormRef.current?.resetFields();
  }else {
    // update 时填的默认参数
    form.setFieldsValue(updateInit)
  }

  const handleFinish =async (formData: API.Supplier) => {
    if (typeAddOrUpdate) {
      await apiOaSupplierCreate(formData).then(() => {
        // 关闭模态框
        setModalOpen(false)
        // 重新加载页面
        reload?.()
        // 表单重置
        restFormRef.current?.resetFields();
      })
    } else {
      // 注意这里updateUserInit.id时formData获取不到的,formData是更改后的数据
      await apiOaSupplierUpdate({id: updateInit?.id} as API.apiOaSupplierUpdateParams,formData).then(() => {
        // 关闭模态框
        setModalOpen(false)
        // 重新加载页面
        reload?.()
        // 表单重置
        restFormRef.current?.resetFields();
      })
    }
  }

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
        <ProFormText width="md" name="name" label="供应商名称" placeholder="请输入"/>
        <ProFormText width="md" name="service" label="经营业务" placeholder="请输入"/>
        <ProFormText width="md" name="phone" label="公司联系电话" placeholder="请输入"/>
        <ProForm.Item label="类别" name="category" initialValue={"其他"}>
          <Select
            /*注意,这里的默认值是值默认显示的，不会默认发送表单，上面的那个默认才会*/
            defaultValue={"其他"}
          >
            <Select.Option value={"消防"}>消防</Select.Option>
            <Select.Option value={"土建"}>土建</Select.Option>
            <Select.Option value={"电缆"}>电缆</Select.Option>
            <Select.Option value={"其他"}>其他</Select.Option>
          </Select>
        </ProForm.Item>
        <ProFormItem
          label="联系人"
        >
          <UserSelectAdd></UserSelectAdd>
        </ProFormItem>


      </ModalForm>
    </>
  )



};
export default SupplierForm;
