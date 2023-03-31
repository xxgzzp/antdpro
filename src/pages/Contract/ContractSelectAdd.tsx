import ContractForm from '@/pages/Contract/ContractForm';
import { apiMaterialContractContractSelect } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const ContractSelectAdd: React.FC<{
  mode?: string;
  initialValue?: any;
  onChange?: (value: any) => void;
  bordered?: boolean;
  [key: string]: any;
}> = ({ mode, initialValue, onChange, bordered, ...restProps }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [contractList, setContractList] = useState<
    { value: string | undefined; label: string | undefined }[]
  >([]);
  const { data, error, loading } = useRequest(apiMaterialContractContractSelect);
  const [value, setValue] = useState();

  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (data?.results) {
      const selectOption = data?.results.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setContractList(selectOption);
    }

    console.log(data);
  }, [data]);

  return (
    <div>
      <Select
        loading={loading}
        bordered={bordered}
        style={{ minWidth: '100px' }}
        mode={mode && mode === 'multiple' ? 'multiple' : undefined}
        value={value}
        defaultValue={initialValue}
        onChange={handleChange}
        placeholder="请选择"
        // @ts-ignore
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          // @ts-ignore
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        showSearch
        options={contractList}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                增加合同
              </Button>
            </Space>
          </>
        )}
        {...restProps}
      />
      <ContractForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        // @ts-ignore
        setContractList={setContractList}
      ></ContractForm>
    </div>
  );
};
export default ContractSelectAdd;
