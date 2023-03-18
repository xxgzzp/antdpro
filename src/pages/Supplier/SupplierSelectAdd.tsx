import SupplierForm from '@/pages/Supplier/SupplierForm';
import { useModel } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const SupplierSelectAdd: React.FC<{
  mode?: string;
  initialValue?: any;
  onChange?: (value: any) => void;
  bordered?: boolean;
}> = ({ mode, initialValue, onChange, bordered }) => {
  const [supplierModalOpen, setSupplierModalOpen] = useState<boolean>(false);
  const [supplierList, setSupplierList] =
    useState<{ value: string | undefined; label: string }[]>();
  const [value, setValue] = useState<
    { label?: string | undefined; value?: string | undefined }[] | undefined
  >();
  const { supplierEnum } = useModel('selector');
  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  useEffect(() => {
    setSupplierList(supplierEnum);
  }, []);

  return (
    <div>
      <Select
        bordered={bordered}
        mode={mode && mode === 'multiple' ? 'multiple' : undefined}
        value={value}
        style={{ minWidth: '100px' }}
        placeholder="请选择"
        defaultValue={initialValue}
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
