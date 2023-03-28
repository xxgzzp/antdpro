import UserForm from '@/pages/User/UserForm';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const UserSelectAdd: React.FC<{
  mode?: string;
  onChange?: (value: any) => void;
  initialValues?: any;
  bordered?: boolean;
  tagRender?: any;
  [key: string]: any;
}> = ({ mode, onChange, initialValues, bordered, tagRender, ...restProps }) => {
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<{ value: string | undefined; label: string }[]>();
  const [value, setValue] = useState<
    { label?: string | undefined; value?: string | undefined }[] | undefined
  >();
  const { userEnum, ready, toggleSelector } = useModel('selector');

  useEffect(() => {
    if (!ready) {
      toggleSelector();
    }
  }, []);

  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    setUserList(userEnum);
  }, [userEnum]);

  return (
    <div>
      <Select
        tagRender={tagRender}
        bordered={bordered}
        style={{ minWidth: '100px' }}
        mode={mode && mode === 'multiple' ? 'multiple' : undefined}
        value={value}
        onChange={handleChange}
        placeholder="请选择"
        // @ts-ignore
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          // @ts-ignore
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={userList}
        showSearch
        defaultValue={initialValues}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => {
                  setUserModalOpen(true);
                }}
              >
                增加用户
              </Button>
            </Space>
          </>
        )}
        {...restProps}
      />
      <UserForm
        modalOpen={userModalOpen}
        setModalOpen={setUserModalOpen}
        setUserList={setUserList}
      ></UserForm>
    </div>
  );
};
export default UserSelectAdd;
