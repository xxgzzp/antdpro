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
  [key: string]: any;
}> = ({ mode, initialValue, onChange, bordered, ...restProps }) => {
  const [supplierModalOpen, setSupplierModalOpen] = useState<boolean>(false);
  const [supplierList, setSupplierList] =
    useState<{ value: string | undefined; label: string }[]>();
  const [value, setValue] = useState<
    { label?: string | undefined; value?: string | undefined }[] | undefined
  >();
  const { supplierEnum, ready, toggleSelector } = useModel('selector');
  // 如果还没请求就先请求
  useEffect(() => {
    if (!ready) {
      toggleSelector();
    }
  }, [ready, toggleSelector]);

  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  useEffect(() => {
    setSupplierList(supplierEnum);
  }, [supplierEnum]);

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
        {...restProps}
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
