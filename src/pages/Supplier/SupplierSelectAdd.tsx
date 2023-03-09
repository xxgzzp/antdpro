import SupplierForm from '@/pages/Supplier/SupplierForm';
import { apiOaSupplierList } from '@/services/ant-design-pro/api';
import { useRequest } from '@@/plugin-request';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const UserSelectAdd: React.FC<{
  mode?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
}> = ({ mode, defaultValue, onChange }) => {
  const [supplierModalOpen, setSupplierModalOpen] = useState<boolean>(false);
  const [supplierList, setSupplierList] = useState([]);
  const { run, loading } = useRequest(apiOaSupplierList, { manual: true });
  const [value, setValue] = useState(defaultValue);
  const handleChange = (value: any) => {
    setValue(value);
    onChange && onChange(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await run();
      const res = response.results.map((r) => ({
        label: r.name,
        value: r.id,
      }));
      // @ts-ignore
      setSupplierList(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Select
          bordered={false}
          mode={mode && mode === 'multiple' ? 'multiple' : undefined}
          // defaultValue={defaultValue ? defaultValue : undefined}
          value={value}
          loading={loading}
          style={{ minWidth: '100px' }}
          placeholder="请选择"
          onChange={handleChange}
          // @ts-ignore
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            // @ts-ignore
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={supplierList}
          showSearch
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setSupplierModalOpen(true);
                  }}
                >
                  增加供应商
                </Button>
              </Space>
            </>
          )}
        />
      )}
      <SupplierForm
        modalOpen={supplierModalOpen}
        setModalOpen={setSupplierModalOpen}
        setSupplierList={setSupplierList}
      ></SupplierForm>
    </div>
  );
};
export default UserSelectAdd;
