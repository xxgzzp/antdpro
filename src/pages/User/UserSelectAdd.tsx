import { apiOaUserList} from "@/services/ant-design-pro/api";
import React, { useEffect, useState } from "react";
import { Button, Divider,  Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "@@/plugin-request";
import ProjectForm from "@/pages/Project/ProjectForm";

const UserSelectAdd:React.FC= () => {
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
      <Select
        loading={loading}
        style={{ width: 300 }}
        placeholder="用户"
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
      <ProjectForm modalOpen={userModalOpen} setModalOpen={setUserModalOpen}></ProjectForm>
    </>
  );
};
export default UserSelectAdd;
