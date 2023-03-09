import SupplierForm from '@/pages/Supplier/SupplierForm';
import { useModel } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const SupplierSelectAdd: React.FC<{
  mode?: string;
  defaultValue?: {
    label?: string;
    value?: string;
  }[];
  onChange?: (value: any) => void;
}> = ({ mode, defaultValue, onChange }) => {
  const [supplierModalOpen, setSupplierModalOpen] = useState<boolean>(false);
  const [supplierList, setSupplierList] = useState([]);
  const [value, setValue] = useState(defaultValue);
  const supplierSelectList = useModel('supplierSelectList');
  const handleChange = (value: any) => {
    setValue(value);
    onChange && onChange(value);
  };
  useEffect(() => {
    setSupplierList(supplierSelectList);
  }, []);

  return (
    <div>
      <Select
        bordered={false}
        mode={mode && mode === 'multiple' ? 'multiple' : undefined}
        value={value}
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
      <SupplierForm
        modalOpen={supplierModalOpen}
        setModalOpen={setSupplierModalOpen}
        setSupplierList={setSupplierList}
      ></SupplierForm>
    </div>
  );
};
export default SupplierSelectAdd;
