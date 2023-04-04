import {
  apiMaterialContractContractPermissions,
  apiMaterialContractPermissionPartialUpdate,
} from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Switch, Table } from 'antd';
import { useState } from 'react';

const ContractPermission: React.FC<{
  contract_id: string;
}> = ({ contract_id }) => {
  const { data, error, loading } = useRequest(() =>
    apiMaterialContractContractPermissions({ id: contract_id }),
  );
  const { user } = useModel('user');

  const [perLoading, setPerLoading] = useState(false);
  const handleChange = async (checked: boolean, row: any) => {
    setPerLoading(true);
    await apiMaterialContractPermissionPartialUpdate(
      { id: row?.id },
      { is_permission: checked },
    ).catch(() => {
      console.log(error);
    });
    setPerLoading(false);
  };

  const columns = [
    {
      title: '用户',
      dataIndex: 'user_name',
      key: 'user',
    },
    {
      title: '订单',
      dataIndex: 'order_name',
      key: 'order',
    },
    {
      title: '是否有权限',
      key: 'option',
      dataIndex: 'is_permission',
      render: (is_permission: boolean, row: any) => (
        <Switch
          // disabled={row?.order_user !== user?.id}
          defaultChecked={is_permission}
          onChange={(checked) => {
            handleChange(checked, row);
          }}
        />
      ),
    },
  ];

  return <Table columns={columns} dataSource={data?.results} loading={perLoading} rowKey="id" />;
};
export default ContractPermission;
