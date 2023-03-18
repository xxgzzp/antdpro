import { formatDate } from '@/components/Utils/formatDate';
import ProjectSelectAdd from '@/pages/Project/ProjectSelectAdd';
import SupplierSelectAdd from '@/pages/Supplier/SupplierSelectAdd';
import UserSelectAdd from '@/pages/User/UserSelectAdd';
import { apiMaterialContractRead } from '@/services/ant-design-pro/api';
import { KeepAliveContext, useLocation } from '@@/exports';
import { useRequest } from 'ahooks';
import { Descriptions, Form, Input, Skeleton } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useEffect } from 'react';

const ContractTop: React.FC<{
  contractForm: FormInstance<any> | undefined;
  contract_id: string | undefined;
}> = ({ contractForm, contract_id }) => {
  // 加载远程数据
  const {
    data: contractDetail,
    loading: contractDetailLoading,
    run: getContractDetail,
  } = useRequest(apiMaterialContractRead, {
    manual: true,
  });

  // 更改标签页标题
  const location = useLocation();
  const { updateTab } = React.useContext(KeepAliveContext);

  useEffect(() => {
    // 加载远程的
    getContractDetail({ id: contract_id! });
  }, []);
  useEffect(() => {
    contractForm?.setFieldsValue({
      name: contractDetail?.name,
      created_by: contractDetail?.created_by,
      supplier: contractDetail?.supplier,
      project: contractDetail?.project,
      category: contractDetail?.category,
      estimator: contractDetail?.estimator,
      principal: contractDetail?.principal,
      end_by: contractDetail?.end_by,
    });
    // 更改标签页标题
    updateTab(location.pathname, {
      name: contractDetail?.name,
      closable: true,
    });
  }, [contractDetail]);
  return (
    <Skeleton loading={contractDetailLoading} active={true}>
      <Form form={contractForm}>
        <Descriptions bordered size="small" column={4}>
          <Descriptions.Item label="标题">
            <Form.Item name="name">
              <Input placeholder="请输入" bordered={false} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="创建者">
            <Form.Item name="created_by">
              <UserSelectAdd
                bordered={false}
                initialValues={contractDetail?.created_by}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="预算员">
            <Form.Item name="estimator">
              <UserSelectAdd
                bordered={false}
                initialValues={contractDetail?.estimator}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="施工员">
            <Form.Item name="principal">
              <UserSelectAdd
                bordered={false}
                initialValues={contractDetail?.principal}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="拍板人">
            <Form.Item name="end_by">
              <UserSelectAdd
                bordered={false}
                initialValues={contractDetail?.end_by}
              ></UserSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="供应商">
            <Form.Item name="supplier">
              <SupplierSelectAdd
                bordered={false}
                initialValue={contractDetail?.supplier}
              ></SupplierSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="项目">
            <Form.Item name="project">
              <ProjectSelectAdd
                bordered={false}
                initialValue={contractDetail?.project}
              ></ProjectSelectAdd>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="类别">
            <Form.Item name="category">
              <Input placeholder="请输入" bordered={false} />
            </Form.Item>
          </Descriptions.Item>
          {contractDetail?.created_time && (
            <Descriptions.Item label="创建时间">
              {contractDetail?.created_time ? formatDate(contractDetail?.created_time) : null}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Form>
    </Skeleton>
  );
};
export default ContractTop;
