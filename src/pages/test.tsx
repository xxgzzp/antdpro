import { ProFormSelect } from "@ant-design/pro-components";
import {apiOaProjectList} from "@/services/ant-design-pro/api";
import React, {useState} from "react";
import {Button, Divider, Input, Select, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import UserForm from "@/pages/User/UserForm";
import {useRequest} from "@@/plugin-request";


const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [data,setData]=useState()
  const {run,loading} = useRequest(apiOaProjectList,{manual: true});
  const handleClick =async () => {
    run().then((r) => {console.log(r);})
    await apiOaProjectList().then((r) => {
      const res = r.results.map(r => ({
        label: r.name,
        value: r.id,
      }))
      setData(res)
    })

  }
  return (
    <>
    <ProFormSelect.SearchSelect
      name="userQuery"
      label="查询选择器 - request"
      fieldProps={{
        labelInValue: true,
        style: {
          minWidth: 140,
        },
      }}
      debounceTime={300}
      request={async ({ keyWords = '' }) => {
        // @ts-ignore
        await apiOaProjectList({"search": keyWords}).then(r => {
          const res = r.results.map(r => ({
            label: r.name,
            value: r.id,
          }))
          setData(res)
        })
        return data
      }
      }
    />
  <Select
    loading={loading}
    style={{ width: 300 }}
    placeholder="custom dropdown render"
    onClick={handleClick}
    dropdownRender={(menu) => (
      <>
        {menu}
        <Divider style={{ margin: '8px 0' }} />
        <Space style={{ padding: '0 8px 4px' }}>
          <Input
            placeholder="Please enter item"
          />
          <Button type="text" icon={<PlusOutlined />} onClick={() => {setUserModalOpen(true)}}>
            Add item
          </Button>
        </Space>
      </>
    )}
    options={data}
  />
      <UserForm
        modalOpen={userModalOpen}
        setModalOpen={setUserModalOpen}
      />

    </>


  );
};
export default InfoCard;
