import UserForm from '@/pages/User/UserForm';
import { apiOaUserList } from '@/services/ant-design-pro/api';
import { useRequest } from '@@/plugin-request';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const UserSelectAdd: React.FC<{
  mode?: string;
  defaultValue?: any;
}> = ({ mode, defaultValue }) => {
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const { run, loading } = useRequest(apiOaUserList, { manual: false });
  //
  useEffect(() => {
    const fetchData = async () => {
      const response = await run();
      const res = response.results.map((r) => ({
        label: r.name,
        value: r.id,
      }));
      // @ts-ignore
      setUserList(res);
    };
    fetchData();
  }, []);

  return (
    <>
      {/*需要用Skeleton盖一下，因为如果数据还没回来，default是会显示uuid的*/}
      <Skeleton loading={loading} active={true}>
        <Select
          mode={mode && mode === 'multiple' ? 'multiple' : undefined}
          defaultValue={defaultValue ? defaultValue : undefined}
          loading={loading}
          style={{ width: 300 }}
          placeholder="请选择"
          // @ts-ignore
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            // @ts-ignore
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={userList}
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
                    setUserModalOpen(true);
                  }}
                >
                  增加用户
                </Button>
              </Space>
            </>
          )}
        />
      </Skeleton>
      <UserForm
        modalOpen={userModalOpen}
        setModalOpen={setUserModalOpen}
        setUserList={setUserList}
      ></UserForm>
    </>
  );
};
export default UserSelectAdd;
